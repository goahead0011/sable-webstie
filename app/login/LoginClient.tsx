"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAccount } from "@/components/account/AccountProvider";
import { getProductById } from "@/data/products";
import { formatDate, formatPrice } from "@/lib/format";
import styles from "@/app/login/login.module.css";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { ready, profile, orders, signIn, signOut } = useAccount();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setSubmitting(true);

    try {
      await signIn(email, password);
      router.push(searchParams.get("next") ?? "/");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSignOut() {
    await signOut();
    setMessage("Signed out.");
  }

  if (!ready) {
    return <p className="utility-copy">Loading account information.</p>;
  }

  if (profile) {
    return (
      <div className={styles.accountPanel}>
        <dl className={styles.accountList}>
          <div>
            <dt>Email</dt>
            <dd>{profile.email}</dd>
          </div>
          <div>
            <dt>Name</dt>
            <dd>{profile.name || "-"}</dd>
          </div>
          <div>
            <dt>Points</dt>
            <dd>{formatPrice(profile.points)}</dd>
          </div>
          <div>
            <dt>Shipping</dt>
            <dd>
              {profile.address.addressLine1 ? (
                <>
                  {profile.address.addressLine1}
                  {profile.address.addressLine2 ? `, ${profile.address.addressLine2}` : ""}
                </>
              ) : (
                "-"
              )}
            </dd>
          </div>
        </dl>
        <div className={styles.actions}>
          <Link className={styles.secondaryAction} href="/cart">
            Cart
          </Link>
          <button type="button" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
        {message ? <p className={styles.message}>{message}</p> : null}
        <section className={styles.historySection}>
          <h2>Order history</h2>
          {orders.length === 0 ? (
            <p className={styles.message}>No orders yet.</p>
          ) : (
            <div className={styles.historyList}>
              {orders.map((order) => (
                <article key={order.id} className={styles.historyItem}>
                  <div className={styles.historyTop}>
                    <p>
                      <span>Order</span>
                      <strong>{order.id.slice(0, 8)}</strong>
                    </p>
                    <p>
                      <span>Date</span>
                      <strong>{formatDate(order.createdAt)}</strong>
                    </p>
                    <p>
                      <span>Total</span>
                      <strong>{formatPrice(order.total)}</strong>
                    </p>
                  </div>
                  <ul className={styles.historyProducts}>
                    {order.items.map((item) => {
                      const product = getProductById(item.productId);
                      return (
                        <li key={`${order.id}-${item.productId}-${item.size}`}>
                          {product?.name ?? "Unavailable product"} / {item.size} x {item.quantity}
                        </li>
                      );
                    })}
                  </ul>
                </article>
              ))}
            </div>
          )}
        </section>
        <section className={styles.historySection}>
          <h2>Payment history</h2>
          {orders.length === 0 ? (
            <p className={styles.message}>No point payments yet.</p>
          ) : (
            <div className={styles.paymentList}>
              {orders.map((order) => (
                <p key={`payment-${order.id}`}>
                  <span>{formatDate(order.createdAt)} / Points</span>
                  <strong>-{formatPrice(order.total)}</strong>
                </p>
              ))}
            </div>
          )}
        </section>
      </div>
    );
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={submitting}>
          {submitting ? "Signing in" : "Login"}
        </button>
        {message ? <p className={styles.message}>{message}</p> : null}
      </form>
      <p className={styles.switchText}>
        New here? <Link href="/register">Create account</Link>
      </p>
    </>
  );
}
