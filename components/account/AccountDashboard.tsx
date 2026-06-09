"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import AddressSearch from "@/components/account/AddressSearch";
import { useAccount } from "@/components/account/AccountProvider";
import { getProductById } from "@/data/products";
import { EMPTY_ADDRESS, type AddressSearchResult, type ShippingAddress } from "@/lib/account";
import { formatDate, formatPhone, formatPrice } from "@/lib/format";
import {
  MEMBERSHIP_TIERS,
  formatMembershipRate,
  getMembershipCoupons,
  getMembershipTier,
  getNextMembershipTier
} from "@/lib/membership";
import styles from "@/app/login/login.module.css";

export default function AccountDashboard() {
  const { profile, orders, signOut, updateProfile } = useAccount();
  const [seededEmail, setSeededEmail] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editBirthDate, setEditBirthDate] = useState("");
  const [editAddress, setEditAddress] = useState<ShippingAddress>(EMPTY_ADDRESS);
  const [message, setMessage] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  if (profile && profile.email !== seededEmail) {
    setSeededEmail(profile.email);
    setEditName(profile.name);
    setEditPhone(formatPhone(profile.phone));
    setEditBirthDate(profile.birthDate);
    setEditAddress(profile.address);
  }

  if (!profile) {
    return null;
  }

  const tier = getMembershipTier(profile.totalPurchased);
  const nextTier = getNextMembershipTier(profile.totalPurchased);
  const coupons = getMembershipCoupons(profile, orders);
  const remainingForNextTier = nextTier ? Math.max(0, nextTier.threshold - profile.totalPurchased) : 0;
  const tierProgress = nextTier
    ? Math.min(100, Math.max(0, ((profile.totalPurchased - tier.threshold) / (nextTier.threshold - tier.threshold)) * 100))
    : 100;

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

  async function handleSignOut() {
    await signOut();
    setMessage("Signed out.");
  }

  async function handleProfileSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!profile) {
      return;
    }

    if (!editName.trim() || !editPhone.trim() || !editBirthDate || !editAddress.addressLine1.trim()) {
      setMessage("Enter your name, phone, birth date, and shipping address.");
      return;
    }

    setMessage("");
    setSavingProfile(true);

    try {
      await updateProfile({
        ...profile,
        name: editName.trim(),
        phone: editPhone.trim(),
        birthDate: editBirthDate,
        address: {
          ...editAddress,
          postalCode: editAddress.postalCode.trim(),
          addressLine1: editAddress.addressLine1.trim(),
          addressLine2: editAddress.addressLine2.trim(),
          label: editAddress.label.trim() || "home"
        }
      });
      setMessage("Account details saved.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save your changes.");
    } finally {
      setSavingProfile(false);
    }
  }

  return (
    <div className={styles.accountPanel}>
      <dl className={styles.accountList}>
        <div>
          <dt>Email</dt>
          <dd>{profile.email}</dd>
        </div>
        <div>
          <dt>Membership</dt>
          <dd>{tier.label}</dd>
        </div>
        <div>
          <dt>Total purchase</dt>
          <dd>{formatPrice(profile.totalPurchased)}</dd>
        </div>
        <div>
          <dt>Points</dt>
          <dd>{formatPrice(profile.points)}</dd>
        </div>
        <div>
          <dt>Birth date</dt>
          <dd>{profile.birthDate || "Not registered"}</dd>
        </div>
      </dl>

      <section className={styles.membershipSection}>
        <div className={styles.membershipHeader}>
          <h2>Membership benefits</h2>
          {nextTier ? (
            <p>
              {formatPrice(remainingForNextTier)} to {nextTier.label}
            </p>
          ) : (
            <p>Top tier</p>
          )}
        </div>
        <div className={styles.tierProgress} aria-hidden="true">
          <span className={styles.tierProgressFill} style={{ width: `${tierProgress}%` }} />
        </div>
        <div className={styles.membershipSummary}>
          <p>
            <span>Purchase earn</span>
            <strong>{formatMembershipRate(tier.pointRate)}</strong>
          </p>
          <p>
            <span>Regular item discount</span>
            <strong>{formatMembershipRate(tier.regularDiscountRate)}</strong>
          </p>
          <p>
            <span>Birthday coupon</span>
            <strong>{formatMembershipRate(tier.birthdayCouponRate)}</strong>
          </p>
        </div>
        <ul className={styles.benefitList}>
          {tier.benefits.map((benefit, index) => (
            <li key={benefit} style={{ animationDelay: `${index * 40}ms` }}>
              {benefit}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.membershipSection}>
        <h2>Coupons</h2>
        <div className={styles.couponList}>
          {coupons.map((coupon, index) => (
            <p
              key={coupon.id}
              className={coupon.available ? undefined : styles.disabledCoupon}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span>{coupon.label}</span>
              <strong>{coupon.available ? "Available" : coupon.reason ?? "Unavailable"}</strong>
            </p>
          ))}
        </div>
      </section>

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
          <label>
            Birth date
            <input type="date" value={editBirthDate} onChange={(event) => setEditBirthDate(event.target.value)} required />
          </label>
        </div>

        <div className={styles.sectionBlock}>
          <p className={styles.sectionTitle}>Shipping address</p>
          <AddressSearch onSelect={selectAddress} />
          <div className={styles.fieldGrid}>
            <label>
              Postal code
              <input value={editAddress.postalCode} onChange={(event) => updateEditAddress({ postalCode: event.target.value })} />
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
        <h2>Point history</h2>
        {orders.length === 0 ? (
          <p className={styles.message}>No point payments yet.</p>
        ) : (
          <div className={styles.paymentList}>
            {orders.map((order) => (
              <p key={`payment-${order.id}`}>
                <span>
                  {formatDate(order.createdAt)} / Points
                  {order.coupon ? ` / ${order.coupon.label}` : ""}
                </span>
                <strong>
                  -{formatPrice(order.total)}
                  {order.earnedPoints ? ` / +${formatPrice(order.earnedPoints)}` : ""}
                </strong>
              </p>
            ))}
          </div>
        )}
      </section>

      <section className={styles.historySection}>
        <h2>All tiers</h2>
        <div className={styles.tierList}>
          {MEMBERSHIP_TIERS.map((membershipTier, index) => (
            <p
              key={membershipTier.id}
              className={membershipTier.id === tier.id ? styles.currentTier : undefined}
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <span>{membershipTier.label}</span>
              <strong>{formatPrice(membershipTier.threshold)}</strong>
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
