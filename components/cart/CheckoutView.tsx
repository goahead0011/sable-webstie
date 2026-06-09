"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useAccount } from "@/components/account/AccountProvider";
import AddressSearch from "@/components/account/AddressSearch";
import CouponSelect, { type CouponSelectOption } from "@/components/account/CouponSelect";
import { useCart } from "@/components/cart/CartProvider";
import { getBrandById } from "@/data/brands";
import { getProductById } from "@/data/products";
import { EMPTY_ADDRESS, type ShippingAddress } from "@/lib/account";
import { formatPhone, formatPrice } from "@/lib/format";
import { calculateMembershipOrder, getMembershipCoupons, getMembershipTier, formatMembershipRate } from "@/lib/membership";
import styles from "@/components/cart/CartView.module.css";

export default function CheckoutView() {
  const { items, clearCart } = useCart();
  const { ready, profile, orders, placeOrder } = useAccount();
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(EMPTY_ADDRESS);
  const [addressEdited, setAddressEdited] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState("");
  const [message, setMessage] = useState("");
  const [orderId, setOrderId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const lines = useMemo(
    () =>
      items
        .map((item) => {
          const product = getProductById(item.productId);
          const brand = product ? getBrandById(product.brandId) : undefined;
          return product && brand ? { item, product, brand } : null;
        })
        .filter((line): line is NonNullable<typeof line> => Boolean(line)),
    [items]
  );

  const coupons = profile ? getMembershipCoupons(profile, orders) : [];
  const effectiveCouponId = coupons.some((coupon) => coupon.id === selectedCouponId && coupon.available)
    ? selectedCouponId
    : "";
  const couponOptions: CouponSelectOption[] = [
    { value: "", label: "No coupon" },
    ...coupons.map((coupon) => ({
      value: coupon.id,
      label: coupon.label,
      disabled: !coupon.available,
      hint: coupon.available ? undefined : coupon.reason ?? "Unavailable"
    }))
  ];
  const breakdown = profile
    ? calculateMembershipOrder(
        profile,
        orders,
        lines.map(({ item, product }) => ({
          price: product.price,
          quantity: item.quantity,
          isSale: product.isSale
        })),
        effectiveCouponId
      )
    : null;
  const total = breakdown?.total ?? 0;
  const remainingPoints = profile && breakdown ? profile.points - breakdown.total + breakdown.earnedPoints : 0;
  const canSubmit = Boolean(profile && breakdown && lines.length > 0 && breakdown.total > 0 && profile.points >= breakdown.total && !submitting);
  const currentShippingAddress = addressEdited ? shippingAddress : profile?.address ?? EMPTY_ADDRESS;

  function updateAddress(nextAddress: Partial<ShippingAddress>) {
    setAddressEdited(true);
    setShippingAddress({ ...currentShippingAddress, ...nextAddress });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setOrderId("");

    if (!currentShippingAddress.addressLine1.trim()) {
      setMessage("Enter your shipping address.");
      return;
    }

    setSubmitting(true);

    try {
      const result = await placeOrder({
        items,
        total,
        shippingAddress: currentShippingAddress,
        couponId: effectiveCouponId || undefined
      });
      clearCart();
      setOrderId(result.orderId);
      setMessage("Order completed.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Order could not be processed.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!ready) {
    return (
      <section className="utility-page">
        <h1 className="utility-title">Checkout</h1>
        <p className="utility-copy">Loading account information.</p>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="utility-page">
        <h1 className="utility-title">Checkout</h1>
        <p className="utility-copy">Login or create an account to continue with saved points and shipping details.</p>
        <div className={styles.checkoutActions}>
          <Link className={styles.checkout} href="/login?next=/checkout">
            Login
          </Link>
          <Link className={styles.checkout} href="/register">
            Create account
          </Link>
        </div>
      </section>
    );
  }

  if (orderId) {
    const tierLabel = getMembershipTier(profile.totalPurchased).label;

    return (
      <section className="utility-page">
        <h1 className="utility-title">Checkout</h1>
        <div className={styles.resultPanel}>
          <p>
            <span>Order</span>
            <strong>{orderId ? orderId.slice(0, 8) : "complete"}</strong>
          </p>
          <p>
            <span>Remaining points</span>
            <strong>{formatPrice(profile.points)}</strong>
          </p>
          {tierLabel ? (
            <p>
              <span>Membership</span>
              <strong>{tierLabel}</strong>
            </p>
          ) : null}
          <Link className={styles.checkout} href="/new-in">
            Continue browsing
          </Link>
        </div>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section className="utility-page">
        <h1 className="utility-title">Checkout</h1>
        <p className="utility-copy">Your cart is empty.</p>
        <Link className={styles.textLink} href="/new-in">
          Continue browsing
        </Link>
      </section>
    );
  }

  return (
    <section className="utility-page">
      <h1 className="utility-title">Checkout</h1>
      <form className={styles.checkoutGrid} onSubmit={handleSubmit}>
        <div className={styles.checkoutForm}>
          <section className={styles.checkoutSection}>
            <h2>Shipping</h2>
            <AddressSearch
              onSelect={(result) =>
                updateAddress({
                  postalCode: result.postalCode,
                  addressLine1: result.roadAddress || result.jibunAddress
                })
              }
            />
            <div className={styles.fieldGrid}>
              <label>
                Name
                <input value={profile.name} readOnly />
              </label>
              <label>
                Phone
                <input value={formatPhone(profile.phone)} readOnly />
              </label>
              <label>
                Postal code
                <input
                  value={currentShippingAddress.postalCode}
                  onChange={(event) => updateAddress({ postalCode: event.target.value })}
                />
              </label>
              <label>
                Address
                <input
                  value={currentShippingAddress.addressLine1}
                  onChange={(event) => updateAddress({ addressLine1: event.target.value })}
                  required
                />
              </label>
              <label className={styles.fullField}>
                Detail
                <input
                  value={currentShippingAddress.addressLine2}
                  onChange={(event) => updateAddress({ addressLine2: event.target.value })}
                />
              </label>
            </div>
          </section>

          <section className={styles.checkoutSection}>
            <h2>Payment</h2>
            <label className={styles.paymentOption}>
              <input type="radio" checked readOnly />
              Points
            </label>
          </section>

          {breakdown ? (
            <section className={styles.checkoutSection}>
              <h2>Membership</h2>
              <div className={styles.membershipPanel}>
                <p>
                  <span>Tier</span>
                  <strong>{breakdown.tier.label}</strong>
                </p>
                <p>
                  <span>Earn rate</span>
                  <strong>{formatMembershipRate(breakdown.tier.pointRate)}</strong>
                </p>
                <p>
                  <span>Regular item discount</span>
                  <strong>{formatMembershipRate(breakdown.tier.regularDiscountRate)}</strong>
                </p>
              </div>
              <div className={styles.fullField}>
                <CouponSelect
                  label="Coupon"
                  options={couponOptions}
                  value={effectiveCouponId}
                  onChange={setSelectedCouponId}
                />
              </div>
              <p className={styles.note}>
                생일 쿠폰은 등록된 생년월일 기준 생일 월에 표시됩니다. 무료 배송 혜택은 배송비 항목이 추가되면 자동
                적용됩니다.
              </p>
            </section>
          ) : null}
        </div>

        <aside className={styles.summary}>
          <div className={styles.orderLines}>
            {lines.map(({ item, product, brand }) => (
              <p key={`${item.productId}-${item.size}`}>
                <span>
                  {brand.name} / {product.name} / {item.size} x {item.quantity}
                </span>
                <strong>{formatPrice(product.price * item.quantity)}</strong>
              </p>
            ))}
          </div>
          <p>
            <span>Subtotal</span>
            <strong>{formatPrice(breakdown?.subtotal ?? total)}</strong>
          </p>
          {breakdown && breakdown.regularDiscount > 0 ? (
            <p>
              <span>Member discount</span>
              <strong>-{formatPrice(breakdown.regularDiscount)}</strong>
            </p>
          ) : null}
          {breakdown && breakdown.couponDiscount > 0 ? (
            <p>
              <span>Coupon</span>
              <strong>-{formatPrice(breakdown.couponDiscount)}</strong>
            </p>
          ) : null}
          <p className={styles.summaryTotal}>
            <span>Total</span>
            <strong>{formatPrice(breakdown?.total ?? total)}</strong>
          </p>
          <p>
            <span>Available points</span>
            <strong>{formatPrice(profile.points)}</strong>
          </p>
          {breakdown ? (
            <p>
              <span>Earned points</span>
              <strong>+{formatPrice(breakdown.earnedPoints)}</strong>
            </p>
          ) : null}
          <p className={profile.points < total ? styles.warning : undefined}>
            <span>After order</span>
            <strong>{formatPrice(Math.max(0, remainingPoints))}</strong>
          </p>
          {profile.points < total ? <p className={styles.note}>You do not have enough points.</p> : null}
          {message ? <p className={styles.note}>{message}</p> : null}
          <button className={styles.checkout} type="submit" disabled={!canSubmit}>
            {submitting ? "Processing" : "Place order"}
          </button>
        </aside>
      </form>
    </section>
  );
}
