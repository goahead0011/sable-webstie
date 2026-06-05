import { NextResponse } from "next/server";
import { getProductById } from "@/data/products";
import {
  normalizePoints,
  type AccountOrder,
  type AccountProfile,
  type CheckoutOrderPayload,
  type CheckoutOrderResult,
  type ShippingAddress
} from "@/lib/account";
import { normalizeCartItems } from "@/lib/cart";
import type { CartItem } from "@/types/domain";

type SupabaseUserResponse = {
  id: string;
  email?: string;
};

type SupabaseProfileRow = {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  postal_code: string | null;
  address_line1: string | null;
  address_line2: string | null;
  address_label: string | null;
  points: number | null;
};

type SupabaseOrderRow = {
  id: string;
  total: number;
  items: unknown;
  shipping_address: unknown;
  payment_method: string | null;
  created_at: string;
};

function env() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "") ?? "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return { supabaseUrl, anonKey, serviceRoleKey };
}

function serviceHeaders(serviceRoleKey: string) {
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json"
  };
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  const data = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) {
    const errorPayload = data && typeof data === "object" ? (data as { message?: unknown; error_description?: unknown }) : {};
    const message =
      typeof errorPayload.error_description === "string"
        ? errorPayload.error_description
        : typeof errorPayload.message === "string"
          ? errorPayload.message
          : "Request failed.";
    throw new Error(message);
  }

  return data as T;
}

function profileFromRow(row: SupabaseProfileRow): AccountProfile {
  return {
    id: row.id,
    email: row.email,
    name: row.name ?? "",
    phone: row.phone ?? "",
    address: {
      postalCode: row.postal_code ?? "",
      addressLine1: row.address_line1 ?? "",
      addressLine2: row.address_line2 ?? "",
      label: row.address_label ?? "home"
    },
    points: normalizePoints(row.points)
  };
}

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Partial<CartItem>;
  return typeof item.productId === "string" && typeof item.size === "string" && typeof item.quantity === "number";
}

function isShippingAddress(value: unknown): value is ShippingAddress {
  if (!value || typeof value !== "object") {
    return false;
  }

  const address = value as Partial<ShippingAddress>;
  return (
    typeof address.postalCode === "string" &&
    typeof address.addressLine1 === "string" &&
    typeof address.addressLine2 === "string" &&
    typeof address.label === "string"
  );
}

function parsePayload(value: unknown): CheckoutOrderPayload {
  if (!value || typeof value !== "object") {
    throw new Error("Invalid order payload.");
  }

  const payload = value as Partial<CheckoutOrderPayload>;

  if (!Array.isArray(payload.items) || !payload.items.every(isCartItem)) {
    throw new Error("Invalid cart items.");
  }

  if (!isShippingAddress(payload.shippingAddress)) {
    throw new Error("Enter your shipping address.");
  }

  return {
    items: normalizeCartItems(payload.items),
    total: typeof payload.total === "number" ? payload.total : 0,
    shippingAddress: payload.shippingAddress
  };
}

function orderFromRow(row: SupabaseOrderRow): AccountOrder {
  return {
    id: row.id,
    createdAt: row.created_at,
    total: row.total,
    items: Array.isArray(row.items) && row.items.every(isCartItem) ? normalizeCartItems(row.items) : [],
    shippingAddress: isShippingAddress(row.shipping_address)
      ? row.shipping_address
      : {
          postalCode: "",
          addressLine1: "",
          addressLine2: "",
          label: "home"
        },
    paymentMethod: "points"
  };
}

function calculateTotal(items: CartItem[]) {
  return items.reduce((sum, item) => {
    const product = getProductById(item.productId);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);
}

export async function POST(request: Request) {
  const { supabaseUrl, anonKey, serviceRoleKey } = env();

  if (!supabaseUrl || !anonKey || !serviceRoleKey) {
    return NextResponse.json({ message: "Checkout is not configured." }, { status: 500 });
  }

  const authorization = request.headers.get("authorization");
  const accessToken = authorization?.startsWith("Bearer ") ? authorization.slice("Bearer ".length) : "";

  if (!accessToken) {
    return NextResponse.json({ message: "Login is required." }, { status: 401 });
  }

  try {
    const payload = parsePayload(await request.json());
    const total = calculateTotal(payload.items);

    if (payload.items.length === 0 || total <= 0) {
      return NextResponse.json({ message: "Your cart is empty." }, { status: 400 });
    }

    const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${accessToken}`
      }
    });
    const user = await parseJsonResponse<SupabaseUserResponse>(userResponse);

    const profileResponse = await fetch(
      `${supabaseUrl}/rest/v1/profiles?id=eq.${encodeURIComponent(user.id)}&select=*&limit=1`,
      { headers: serviceHeaders(serviceRoleKey) }
    );
    const profileRows = await parseJsonResponse<SupabaseProfileRow[]>(profileResponse);
    const profileRow = profileRows[0];

    if (!profileRow) {
      return NextResponse.json({ message: "Account information could not be found." }, { status: 404 });
    }

    const profile = profileFromRow(profileRow);

    if (profile.points < total) {
      return NextResponse.json({ message: "You do not have enough points." }, { status: 400 });
    }

    const nextPoints = profile.points - total;
    const orderResponse = await fetch(`${supabaseUrl}/rest/v1/orders`, {
      method: "POST",
      headers: {
        ...serviceHeaders(serviceRoleKey),
        Prefer: "return=representation"
      },
      body: JSON.stringify({
        user_id: user.id,
        total,
        items: payload.items,
        shipping_address: payload.shippingAddress,
        payment_method: "points"
      })
    });
    const orderRows = await parseJsonResponse<SupabaseOrderRow[]>(orderResponse);

    const updateResponse = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${encodeURIComponent(user.id)}`, {
      method: "PATCH",
      headers: {
        ...serviceHeaders(serviceRoleKey),
        Prefer: "return=representation"
      },
      body: JSON.stringify({
        points: nextPoints,
        postal_code: payload.shippingAddress.postalCode,
        address_line1: payload.shippingAddress.addressLine1,
        address_line2: payload.shippingAddress.addressLine2,
        address_label: payload.shippingAddress.label
      })
    });
    const updatedRows = await parseJsonResponse<SupabaseProfileRow[]>(updateResponse);
    const updatedProfile = profileFromRow(updatedRows[0] ?? { ...profileRow, points: nextPoints });
    const order = orderRows[0]
      ? orderFromRow(orderRows[0])
      : {
          id: "",
          createdAt: new Date().toISOString(),
          total,
          items: payload.items,
          shippingAddress: payload.shippingAddress,
          paymentMethod: "points" as const
        };
    const result: CheckoutOrderResult = {
      orderId: order.id,
      profile: updatedProfile,
      order
    };

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Order submission failed." },
      { status: 400 }
    );
  }
}

export async function GET(request: Request) {
  const { supabaseUrl, anonKey, serviceRoleKey } = env();

  if (!supabaseUrl || !anonKey || !serviceRoleKey) {
    return NextResponse.json({ message: "Orders are not configured." }, { status: 500 });
  }

  const authorization = request.headers.get("authorization");
  const accessToken = authorization?.startsWith("Bearer ") ? authorization.slice("Bearer ".length) : "";

  if (!accessToken) {
    return NextResponse.json({ message: "Login is required." }, { status: 401 });
  }

  try {
    const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${accessToken}`
      }
    });
    const user = await parseJsonResponse<SupabaseUserResponse>(userResponse);
    const ordersResponse = await fetch(
      `${supabaseUrl}/rest/v1/orders?user_id=eq.${encodeURIComponent(user.id)}&select=*&order=created_at.desc`,
      { headers: serviceHeaders(serviceRoleKey) }
    );
    const rows = await parseJsonResponse<SupabaseOrderRow[]>(ordersResponse);

    return NextResponse.json(rows.map(orderFromRow));
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Order history could not be loaded." },
      { status: 400 }
    );
  }
}
