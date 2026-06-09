"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAccount } from "@/components/account/AccountProvider";
import AddressSearch from "@/components/account/AddressSearch";
import { EMPTY_ADDRESS, INITIAL_SIGNUP_POINTS, type AddressSearchResult, type ShippingAddress } from "@/lib/account";
import { formatPhone, formatPrice } from "@/lib/format";
import styles from "@/app/login/login.module.css";

export default function RegisterClient() {
  const router = useRouter();
  const { register } = useAccount();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState<ShippingAddress>(EMPTY_ADDRESS);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function updateAddress(nextAddress: Partial<ShippingAddress>) {
    setAddress((current) => ({ ...current, ...nextAddress }));
  }

  function selectAddress(result: AddressSearchResult) {
    updateAddress({
      postalCode: result.postalCode,
      addressLine1: result.roadAddress || result.jibunAddress,
      label: "home"
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setSubmitting(true);

    try {
      await register({
        email,
        password,
        name,
        phone,
        birthDate,
        address
      });
      router.push("/account");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Account creation failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={`${styles.form} ${styles.wideForm}`} onSubmit={handleSubmit}>
      <div className={styles.fieldGrid}>
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
            minLength={6}
            placeholder="6 characters or more"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <label>
          Name
          <input value={name} onChange={(event) => setName(event.target.value)} required />
        </label>
        <label>
          Phone
          <input
            value={phone}
            onChange={(event) => setPhone(formatPhone(event.target.value))}
            inputMode="numeric"
            placeholder="010-0000-0000"
            required
          />
        </label>
        <label>
          Birth date
          <input
            type="date"
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
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
            <input value={address.postalCode} onChange={(event) => updateAddress({ postalCode: event.target.value })} />
          </label>
          <label>
            Address
            <input
              value={address.addressLine1}
              onChange={(event) => updateAddress({ addressLine1: event.target.value })}
              required
            />
          </label>
          <label className={styles.fullField}>
            Detail
            <input
              value={address.addressLine2}
              onChange={(event) => updateAddress({ addressLine2: event.target.value })}
              placeholder="Apartment, suite, floor, etc."
            />
          </label>
        </div>
      </div>

      <p className={styles.pointNote}>
        First account balance: {formatPrice(INITIAL_SIGNUP_POINTS)} / Welcome coupon 10% / Birthday coupon by tier.
      </p>
      <button type="submit" disabled={submitting}>
        {submitting ? "Creating account" : "Create account"}
      </button>
      {message ? <p className={styles.message}>{message}</p> : null}
      <p className={styles.switchText}>
        Already registered? <Link href="/login">Login</Link>
      </p>
    </form>
  );
}
