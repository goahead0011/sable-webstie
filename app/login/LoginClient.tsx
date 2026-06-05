"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAccount } from "@/components/account/AccountProvider";
import AddressSearch from "@/components/account/AddressSearch";
import { getProductById } from "@/data/products";
import { EMPTY_ADDRESS, type AddressSearchResult, type ShippingAddress } from "@/lib/account";
import { formatDate, formatPhone, formatPrice } from "@/lib/format";
import styles from "@/app/login/login.module.css";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { ready, profile, orders, signIn, signOut, updateProfile } = useAccount();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Editable account details (seeded once per signed-in account).
  const [seededEmail, setSeededEmail] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState<ShippingAddress>(EMPTY_ADDRESS);
  const [profileMessage, setProfileMessage] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  // Seed the editable fields once per signed-in account. Adjusting state while
  // rendering (guarded by a changed key) is React's recommended alternative to a
  // setState-in-effect when deriving state from a changing prop.
  if (profile && profile.email !== seededEmail) {
    setSeededEmail(profile.email);
    setEditName(profile.name);
    setEditPhone(formatPhone(profile.phone));
    setEditAddress(profile.address);
  }

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

  function updateEditAddress(nextAddress: Partial<ShippingAddress>) {
    setEditAddress((current) => ({ ...current, ...nextAddress }));
  }

  function selectAddress(result: AddressSearchResult) {
    updateEditAddress({
      postalCode: result.postalCode,
      addressLine1: result.roadAddress || result.jibunAddress,
      label: "home"
    });
  }

  async function handleProfileSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!profile) {
      return;
    }

    if (!editName.trim() || !editPhone.trim() || !editAddress.addressLine1.trim()) {
      setProfileMessage("Enter your name, phone, and shipping address.");
      return;
    }

    setProfileMessage("");
    setSavingProfile(true);

    try {
      await updateProfile({
        ...profile,
        name: editName.trim(),
        phone: editPhone.trim(),
        address: {
          ...editAddress,
          postalCode: editAddress.postalCode.trim(),
          addressLine1: editAddress.addressLine1.trim(),
          addressLine2: editAddress.addressLine2.trim(),
          label: editAddress.label.trim() || "home"
        }
      });
      setProfileMessage("Account details saved.");
    } catch (error) {
      setProfileMessage(error instanceof Error ? error.message : "Could not save your changes.");
    } finally {
      setSavingProfile(false);
    }
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
            <dt>Points</dt>
            <dd>{formatPrice(profile.points)}</dd>
          </div>
        </dl>

        <form className={styles.editForm} onSubmit={handleProfileSave}>
          <p className={styles.sectionTitle}>Account details</p>
          <div className={styles.fieldGrid}>
            <label>
              Name
              <input value={editName} onChange={(event) => setEditName(event.target.value)} required />
            </label>
            <label>
              Phone
              <input
                value={editPhone}
                onChange={(event) => setEditPhone(formatPhone(event.target.value))}
                inputMode="numeric"
                placeholder="010-0000-0000"
                required
              />
            </label>
          </div>

          <div className={styles.sectionBlock}>
            <p className={styles.sectionTitle}>Shipping address</p>
            <AddressSearch onSelect={selectAddress} />
            <div className={styles.fieldGrid}>
              <label>
                Postal code
                <input
                  value={editAddress.postalCode}
                  onChange={(event) => updateEditAddress({ postalCode: event.target.value })}
                />
              </label>
              <label>
                Address
                <input
                  value={editAddress.addressLine1}
                  onChange={(event) => updateEditAddress({ addressLine1: event.target.value })}
                  required
                />
              </label>
              <label className={styles.fullField}>
                Detail
                <input
                  value={editAddress.addressLine2}
                  onChange={(event) => updateEditAddress({ addressLine2: event.target.value })}
                  placeholder="Apartment, suite, floor, etc."
                />
              </label>
            </div>
          </div>

          <button type="submit" disabled={savingProfile}>
            {savingProfile ? "Saving" : "Save changes"}
          </button>
          {profileMessage ? <p className={styles.message}>{profileMessage}</p> : null}
        </form>

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
