"use client";

import Link from "next/link";
import { products, getProductById } from "@/data/products";
import { getBrandById } from "@/data/brands";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/format";
import styles from "@/components/cart/CartView.module.css";

export default function CartView() {
  const { items, removeItem, updateQuantity } = useCart();

  const lines = items
    .map((item) => {
      const product = getProductById(item.productId);
      const brand = product ? getBrandById(product.brandId) : undefined;
      return product && brand ? { item, product, brand } : null;
    })
    .filter((line): line is NonNullable<typeof line> => Boolean(line));

  const total = lines.reduce((sum, line) => sum + line.product.price * line.item.quantity, 0);

  if (lines.length === 0) {
    return (
      <section className="utility-page">
        <h1 className="utility-title">Cart</h1>
        <p className="utility-copy">Your cart is empty.</p>
        <Link className={styles.textLink} href="/new-in">
          Continue browsing
        </Link>
      </section>
    );
  }

  return (
    <section className="utility-page">
      <h1 className="utility-title">Cart</h1>
      <div className={styles.layout}>
        <div className={styles.lines}>
          {lines.map(({ item, product, brand }) => (
            <article key={`${item.productId}-${item.size}`} className={styles.line}>
              <div>
                <Link href={`/products/${product.slug}`} className={styles.productName}>
                  {product.name}
                </Link>
                <p>{brand.name}</p>
                <p>Size {item.size}</p>
              </div>
              <div className={styles.quantity}>
                <button type="button" onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}>
                  +
                </button>
              </div>
              <p>{formatPrice(product.price * item.quantity)}</p>
              <button className={styles.remove} type="button" onClick={() => removeItem(item.productId, item.size)}>
                Remove
              </button>
            </article>
          ))}
        </div>
        <aside className={styles.summary}>
          <p>
            <span>Subtotal</span>
            <strong>{formatPrice(total)}</strong>
          </p>
          <p className={styles.note}>Checkout uses your account points balance.</p>
          <Link className={styles.checkout} href="/checkout">
            Checkout
          </Link>
        </aside>
      </div>
      <p className={styles.catalogCount}>{products.length} products available in local data.</p>
    </section>
  );
}
