import type { CartItem } from "@/types/domain";

export const CART_STORAGE_KEY = "sable-cart-v1";

export function normalizeCartItems(items: CartItem[]): CartItem[] {
  return items
    .filter((item) => item.productId && item.size && Number.isFinite(item.quantity))
    .map((item) => ({
      ...item,
      quantity: Math.max(1, Math.floor(item.quantity))
    }));
}

export function getCartLineId(item: Pick<CartItem, "productId" | "size">) {
  return `${item.productId}:${item.size}`;
}
