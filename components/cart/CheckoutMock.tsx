"use client";

import Link from "next/link";
import { getProductById } from "@/data/products";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/format";
import styles from "@/components/cart/CartView.module.css";

export default function CheckoutMock() {
  const { items } = useCart();
  const total = items.reduce((sum, item) => {
    const product = getProductById(item.productId);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);

  return (
    <section className="utility-page">
      <h1 className="utility-title">Checkout</h1>
      <p className="utility-copy">
        This is a checkout mock. No payment, authentication, or order submission is connected.
      </p>
      <div className={styles.mockPanel}>
        <p>
          <span>Mock total</span>
          <strong>{formatPrice(total)}</strong>
        </p>
        <Link className={styles.checkout} href="/cart">
          Back to cart
        </Link>
      </div>
    </section>
  );
}
