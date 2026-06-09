import type { CartItem } from "@/types/domain";

export const INITIAL_SIGNUP_POINTS = 3_000_000;
export const DEFAULT_TOTAL_PURCHASED = 0;

export type ShippingAddress = {
  postalCode: string;
  addressLine1: string;
  addressLine2: string;
  label: string;
};

export type AccountProfile = {
  id: string;
  email: string;
  name: string;
  phone: string;
  birthDate: string;
  address: ShippingAddress;
  points: number;
  totalPurchased: number;
};

export type AccountSession = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
  };
};

export type RegisterPayload = {
  email: string;
  password: string;
  name: string;
  phone: string;
  birthDate: string;
  address: ShippingAddress;
};

export type CheckoutOrderPayload = {
  items: CartItem[];
  total: number;
  shippingAddress: ShippingAddress;
  couponId?: string;
};

export type CheckoutOrderResult = {
  orderId: string;
  profile: AccountProfile;
  order: AccountOrder;
};

export type AccountOrder = {
  id: string;
  createdAt: string;
  subtotal?: number;
  total: number;
  discountTotal?: number;
  earnedPoints?: number;
  coupon?: {
    id: string;
    kind: "welcome" | "birthday";
    label: string;
    discountRate: number;
    discountAmount: number;
  };
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: "points";
};

export type AddressSearchResult = {
  id: string;
  title: string;
  roadAddress: string;
  jibunAddress: string;
  postalCode: string;
};

export const EMPTY_ADDRESS: ShippingAddress = {
  postalCode: "",
  addressLine1: "",
  addressLine2: "",
  label: "home"
};

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function isValidEmail(value: string) {
  const email = normalizeEmail(value);
  const atIndex = email.indexOf("@");
  return atIndex > 0 && atIndex < email.length - 1 && !email.includes(" ");
}

export function normalizePoints(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
}

export function normalizeBirthDate(value: unknown) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : "";
}

export function normalizeAccountProfile(
  profile: Partial<AccountProfile> & Pick<AccountProfile, "id" | "email">
): AccountProfile {
  return {
    id: profile.id,
    email: profile.email,
    name: typeof profile.name === "string" ? profile.name : "",
    phone: typeof profile.phone === "string" ? profile.phone : "",
    birthDate: normalizeBirthDate(profile.birthDate),
    address: {
      postalCode: typeof profile.address?.postalCode === "string" ? profile.address.postalCode : "",
      addressLine1: typeof profile.address?.addressLine1 === "string" ? profile.address.addressLine1 : "",
      addressLine2: typeof profile.address?.addressLine2 === "string" ? profile.address.addressLine2 : "",
      label: typeof profile.address?.label === "string" && profile.address.label ? profile.address.label : "home"
    },
    points: normalizePoints(profile.points),
    totalPurchased: normalizePoints(profile.totalPurchased)
  };
}

export function getOrdersTotalPurchased(orders: AccountOrder[]) {
  return orders.reduce((sum, order) => sum + normalizePoints(order.total), DEFAULT_TOTAL_PURCHASED);
}

export function hydrateProfilePurchases(profile: AccountProfile, orders: AccountOrder[]) {
  return {
    ...profile,
    totalPurchased: Math.max(profile.totalPurchased, getOrdersTotalPurchased(orders))
  };
}
