"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  EMPTY_ADDRESS,
  INITIAL_SIGNUP_POINTS,
  isValidEmail,
  normalizeEmail,
  normalizePoints,
  type AccountOrder,
  type AccountProfile,
  type AccountSession,
  type CheckoutOrderPayload,
  type CheckoutOrderResult,
  type RegisterPayload
} from "@/lib/account";

const SESSION_STORAGE_KEY = "sable-account-session-v1";
const LOCAL_ACCOUNTS_STORAGE_KEY = "sable-local-accounts-v1";
const LOCAL_ORDERS_STORAGE_KEY = "sable-local-orders-v1";

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

type LocalAccount = {
  password: string;
  profile: AccountProfile;
};

type LocalAccounts = Record<string, LocalAccount>;
type LocalOrders = Record<string, AccountOrder[]>;

type AccountContextValue = {
  ready: boolean;
  session: AccountSession | null;
  profile: AccountProfile | null;
  orders: AccountOrder[];
  signIn: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profile: AccountProfile) => Promise<void>;
  refreshOrders: () => Promise<void>;
  placeOrder: (payload: CheckoutOrderPayload) => Promise<CheckoutOrderResult>;
};

const AccountContext = createContext<AccountContextValue | undefined>(undefined);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "") ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

function authHeaders(accessToken?: string) {
  return {
    apikey: supabaseAnonKey,
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
  };
}

function profileFromRow(row: SupabaseProfileRow, fallbackEmail: string): AccountProfile {
  return {
    id: row.id,
    email: row.email || fallbackEmail,
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

function rowFromProfile(profile: AccountProfile): SupabaseProfileRow {
  return {
    id: profile.id,
    email: profile.email,
    name: profile.name,
    phone: profile.phone,
    postal_code: profile.address.postalCode,
    address_line1: profile.address.addressLine1,
    address_line2: profile.address.addressLine2,
    address_label: profile.address.label,
    points: profile.points
  };
}

function createEmptyProfile(id: string, email: string): AccountProfile {
  return {
    id,
    email,
    name: "",
    phone: "",
    address: EMPTY_ADDRESS,
    points: INITIAL_SIGNUP_POINTS
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

function readLocalAccounts(): LocalAccounts {
  try {
    const raw = window.localStorage.getItem(LOCAL_ACCOUNTS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LocalAccounts) : {};
  } catch {
    window.localStorage.removeItem(LOCAL_ACCOUNTS_STORAGE_KEY);
    return {};
  }
}

function writeLocalAccounts(accounts: LocalAccounts) {
  window.localStorage.setItem(LOCAL_ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
}

function readLocalOrders(): LocalOrders {
  try {
    const raw = window.localStorage.getItem(LOCAL_ORDERS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LocalOrders) : {};
  } catch {
    window.localStorage.removeItem(LOCAL_ORDERS_STORAGE_KEY);
    return {};
  }
}

function writeLocalOrders(orders: LocalOrders) {
  window.localStorage.setItem(LOCAL_ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

function createLocalSession(profile: AccountProfile): AccountSession {
  return {
    accessToken: `local-${profile.id}`,
    refreshToken: `local-refresh-${profile.id}`,
    user: {
      id: profile.id,
      email: profile.email
    }
  };
}

async function fetchProfile(session: AccountSession) {
  if (!hasSupabaseConfig) {
    const account = readLocalAccounts()[session.user.email];
    return account?.profile ?? null;
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/profiles?id=eq.${encodeURIComponent(session.user.id)}&select=*&limit=1`,
    { headers: authHeaders(session.accessToken) }
  );
  const rows = await parseJsonResponse<SupabaseProfileRow[]>(response);

  if (rows[0]) {
    return profileFromRow(rows[0], session.user.email);
  }

  return createEmptyProfile(session.user.id, session.user.email);
}

async function fetchOrders(session: AccountSession) {
  if (!hasSupabaseConfig) {
    return readLocalOrders()[session.user.email] ?? [];
  }

  const response = await fetch("/api/orders", {
    headers: {
      Authorization: `Bearer ${session.accessToken}`
    }
  });
  return parseJsonResponse<AccountOrder[]>(response);
}

async function saveProfile(profile: AccountProfile, session: AccountSession) {
  if (!hasSupabaseConfig) {
    const accounts = readLocalAccounts();
    const existing = accounts[profile.email];
    accounts[profile.email] = {
      password: existing?.password ?? "",
      profile
    };
    writeLocalAccounts(accounts);
    return profile;
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${encodeURIComponent(profile.id)}`, {
    method: "PATCH",
    headers: {
      ...authHeaders(session.accessToken),
      Prefer: "return=representation"
    },
    body: JSON.stringify(rowFromProfile(profile))
  });
  const rows = await parseJsonResponse<SupabaseProfileRow[]>(response);
  return profileFromRow(rows[0] ?? rowFromProfile(profile), profile.email);
}

async function insertProfile(profile: AccountProfile, session: AccountSession) {
  if (!hasSupabaseConfig) {
    const accounts = readLocalAccounts();
    const existing = accounts[profile.email];
    accounts[profile.email] = {
      password: existing?.password ?? "",
      profile
    };
    writeLocalAccounts(accounts);
    return profile;
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/profiles`, {
    method: "POST",
    headers: {
      ...authHeaders(session.accessToken),
      Prefer: "return=representation"
    },
    body: JSON.stringify(rowFromProfile(profile))
  });
  const rows = await parseJsonResponse<SupabaseProfileRow[]>(response);
  return profileFromRow(rows[0] ?? rowFromProfile(profile), profile.email);
}

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<AccountSession | null>(null);
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [orders, setOrders] = useState<AccountOrder[]>([]);

  useEffect(() => {
    queueMicrotask(() => {
      const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) {
        setReady(true);
        return;
      }

      try {
        const savedSession = JSON.parse(raw) as AccountSession;
        setSession(savedSession);
        void Promise.all([fetchProfile(savedSession), fetchOrders(savedSession)])
          .then(([nextProfile, nextOrders]) => {
            setProfile(nextProfile);
            setOrders(nextOrders);
          })
          .finally(() => setReady(true));
      } catch {
        window.localStorage.removeItem(SESSION_STORAGE_KEY);
        setReady(true);
      }
    });
  }, []);

  const persistSession = useCallback((nextSession: AccountSession | null) => {
    setSession(nextSession);

    if (nextSession) {
      window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(nextSession));
    } else {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, []);

  const signIn = useCallback(async (emailValue: string, password: string) => {
    const email = normalizeEmail(emailValue);

    if (!isValidEmail(email)) {
      throw new Error("Email must include @.");
    }

    if (!password) {
      throw new Error("Enter your password.");
    }

    if (!hasSupabaseConfig) {
      const account = readLocalAccounts()[email];
      if (!account || account.password !== password) {
        throw new Error("The account information does not match.");
      }

      const nextSession = createLocalSession(account.profile);
      persistSession(nextSession);
      setProfile(account.profile);
      setOrders(await fetchOrders(nextSession));
      return;
    }

    type SignInResponse = {
      access_token: string;
      refresh_token: string;
      user: { id: string; email?: string };
    };

    const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ email, password })
    });
    const data = await parseJsonResponse<SignInResponse>(response);
    const nextSession: AccountSession = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      user: {
        id: data.user.id,
        email: data.user.email ?? email
      }
    };
    const nextProfile = await fetchProfile(nextSession);
    const nextOrders = await fetchOrders(nextSession);
    persistSession(nextSession);
    setProfile(nextProfile);
    setOrders(nextOrders);
  }, [persistSession]);

  const register = useCallback(async (payload: RegisterPayload) => {
    const email = normalizeEmail(payload.email);

    if (!isValidEmail(email)) {
      throw new Error("Email must include @.");
    }

    if (payload.password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    if (!payload.name.trim() || !payload.phone.trim() || !payload.address.addressLine1.trim()) {
      throw new Error("Enter your name, phone, and default shipping address.");
    }

    if (!hasSupabaseConfig) {
      const accounts = readLocalAccounts();
      if (accounts[email]) {
        throw new Error("This email is already registered.");
      }

      const profileId = crypto.randomUUID();
      const nextProfile: AccountProfile = {
        id: profileId,
        email,
        name: payload.name.trim(),
        phone: payload.phone.trim(),
        address: {
          postalCode: payload.address.postalCode.trim(),
          addressLine1: payload.address.addressLine1.trim(),
          addressLine2: payload.address.addressLine2.trim(),
          label: payload.address.label.trim() || "home"
        },
        points: INITIAL_SIGNUP_POINTS
      };
      accounts[email] = {
        password: payload.password,
        profile: nextProfile
      };
      writeLocalAccounts(accounts);
      const nextSession = createLocalSession(nextProfile);
      persistSession(nextSession);
      setProfile(nextProfile);
      setOrders([]);
      return;
    }

    type SignUpResponse = {
      access_token?: string;
      refresh_token?: string;
      session?: {
        access_token: string;
        refresh_token: string;
      } | null;
      user: { id: string; email?: string };
    };

    const response = await fetch(`${supabaseUrl}/auth/v1/signup`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        email,
        password: payload.password,
        data: {
          name: payload.name,
          phone: payload.phone
        }
      })
    });
    const data = await parseJsonResponse<SignUpResponse>(response);
    const accessToken = data.session?.access_token ?? data.access_token;
    const refreshToken = data.session?.refresh_token ?? data.refresh_token;

    if (!accessToken || !refreshToken) {
      throw new Error("Email confirmation must be disabled in Supabase Auth to sign in immediately.");
    }

    const nextSession: AccountSession = {
      accessToken,
      refreshToken,
      user: {
        id: data.user.id,
        email: data.user.email ?? email
      }
    };
    const nextProfile = await insertProfile(
      {
        id: data.user.id,
        email,
        name: payload.name.trim(),
        phone: payload.phone.trim(),
        address: {
          postalCode: payload.address.postalCode.trim(),
          addressLine1: payload.address.addressLine1.trim(),
          addressLine2: payload.address.addressLine2.trim(),
          label: payload.address.label.trim() || "home"
        },
        points: INITIAL_SIGNUP_POINTS
      },
      nextSession
    );

    persistSession(nextSession);
    setProfile(nextProfile);
    setOrders([]);
  }, [persistSession]);

  const signOut = useCallback(async () => {
    if (hasSupabaseConfig && session?.accessToken) {
      await fetch(`${supabaseUrl}/auth/v1/logout`, {
        method: "POST",
        headers: authHeaders(session.accessToken)
      }).catch(() => undefined);
    }

    persistSession(null);
    setProfile(null);
    setOrders([]);
  }, [persistSession, session]);

  const updateProfile = useCallback(async (nextProfile: AccountProfile) => {
    if (!session) {
      throw new Error("Login is required.");
    }

    const saved = await saveProfile(nextProfile, session);
    setProfile(saved);
  }, [session]);

  const refreshOrders = useCallback(async () => {
    if (!session) {
      setOrders([]);
      return;
    }

    setOrders(await fetchOrders(session));
  }, [session]);

  const placeOrder = useCallback(async (payload: CheckoutOrderPayload): Promise<CheckoutOrderResult> => {
    if (!session || !profile) {
      throw new Error("Login is required.");
    }

    if (payload.total <= 0 || payload.items.length === 0) {
      throw new Error("Your cart is empty.");
    }

    if (profile.points < payload.total) {
      throw new Error("You do not have enough points.");
    }

    if (!hasSupabaseConfig) {
      const order: AccountOrder = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        total: payload.total,
        items: payload.items,
        shippingAddress: payload.shippingAddress,
        paymentMethod: "points"
      };
      const nextProfile = {
        ...profile,
        points: profile.points - payload.total,
        address: payload.shippingAddress
      };
      const localOrders = readLocalOrders();
      const nextOrders = [order, ...(localOrders[profile.email] ?? [])];
      localOrders[profile.email] = nextOrders;
      writeLocalOrders(localOrders);
      await saveProfile(nextProfile, session);
      setProfile(nextProfile);
      setOrders(nextOrders);
      return {
        orderId: order.id,
        profile: nextProfile,
        order
      };
    }

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`
      },
      body: JSON.stringify(payload)
    });
    const result = await parseJsonResponse<CheckoutOrderResult>(response);
    setProfile(result.profile);
    setOrders((current) => [result.order, ...current.filter((order) => order.id !== result.order.id)]);
    return result;
  }, [profile, session]);

  const value = useMemo(
    () => ({
      ready,
      session,
      profile,
      orders,
      signIn,
      register,
      signOut,
      updateProfile,
      refreshOrders,
      placeOrder
    }),
    [ready, session, profile, orders, signIn, register, signOut, updateProfile, refreshOrders, placeOrder]
  );

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const context = useContext(AccountContext);

  if (!context) {
    throw new Error("useAccount must be used within AccountProvider");
  }

  return context;
}
