import type { CartItem } from "@/types/domain";

export const INITIAL_SIGNUP_POINTS = 3_000_000;

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
  address: ShippingAddress;
  points: number;
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
  address: ShippingAddress;
};

export type CheckoutOrderPayload = {
  items: CartItem[];
  total: number;
  shippingAddress: ShippingAddress;
};

export type CheckoutOrderResult = {
  orderId: string;
  profile: AccountProfile;
  order: AccountOrder;
};

export type AccountOrder = {
  id: string;
  createdAt: string;
  total: number;
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
