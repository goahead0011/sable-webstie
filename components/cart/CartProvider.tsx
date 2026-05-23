"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CART_STORAGE_KEY, getCartLineId, normalizeCartItems } from "@/lib/cart";
import type { CartItem } from "@/types/domain";

type CartContextValue = {
  items: CartItem[];
  addItem: (productId: string, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const raw = window.localStorage.getItem(CART_STORAGE_KEY);
        if (raw) {
          setItems(normalizeCartItems(JSON.parse(raw) as CartItem[]));
        }
      } catch {
        window.localStorage.removeItem(CART_STORAGE_KEY);
        setItems([]);
      } finally {
        setReady(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const addItem = useCallback((productId: string, size: string) => {
    setItems((current) => {
      const lineId = getCartLineId({ productId, size });
      const existing = current.find((item) => getCartLineId(item) === lineId);

      if (existing) {
        return current.map((item) =>
          getCartLineId(item) === lineId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...current, { productId, size, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: string, size: string) => {
    setItems((current) =>
      current.filter((item) => getCartLineId(item) !== getCartLineId({ productId, size }))
    );
  }, []);

  const updateQuantity = useCallback((productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, size);
      return;
    }

    setItems((current) =>
      current.map((item) =>
        getCartLineId(item) === getCartLineId({ productId, size })
          ? { ...item, quantity: Math.max(1, Math.floor(quantity)) }
          : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQuantity, clearCart }),
    [items, addItem, removeItem, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
