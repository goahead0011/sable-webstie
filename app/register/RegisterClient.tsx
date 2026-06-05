"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAccount } from "@/components/account/AccountProvider";
import { EMPTY_ADDRESS, INITIAL_SIGNUP_POINTS, type AddressSearchResult, type ShippingAddress } from "@/lib/account";
import { formatPrice } from "@/lib/format";
import styles from "@/app/login/login.module.css";

type AddressSearchResponse = {
  results: AddressSearchResult[];
  message?: string;
};

export default function RegisterClient() {
  const router = useRouter();
  const { register } = useAccount();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState<ShippingAddress>(EMPTY_ADDRESS);
  const [addressQuery, setAddressQuery] = useState("");
  const [addressResults, setAddressResults] = useState<AddressSearchResult[]>([]);
  const [message, setMessage] = useState("");
  const [addressMessage, setAddressMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [searching, setSearching] = useState(false);

  function updateAddress(nextAddress: Partial<ShippingAddress>) {
    setAddress((current) => ({ ...current, ...nextAddress }));
  }

  async function handleAddressSearch() {
    if (addressQuery.trim().length < 2) {
      setAddressMessage("Enter at least two characters.");
      return;
    }

    setSearching(true);
    setAddressMessage("");

    try {
      const response = await fetch(`/api/address-search?query=${encodeURIComponent(addressQuery.trim())}`);
      const data = (await response.json()) as AddressSearchResponse;
      setAddressResults(data.results);
      setAddressMessage(data.message ?? (data.results.length === 0 ? "No results found. You can enter the address manually." : ""));
    } catch {
      setAddressResults([]);
      setAddressMessage("Address search failed. You can enter the address manually.");
    } finally {
      setSearching(false);
    }
  }

  function selectAddress(result: AddressSearchResult) {
    updateAddress({
      postalCode: result.postalCode,
      addressLine1: result.roadAddress || result.jibunAddress,
      label: "home"
    });
    setAddressResults([]);
    setAddressQuery(result.roadAddress || result.jibunAddress);
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
        address
      });
      router.push("/login");
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
          <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="010-0000-0000" required />
        </label>
      </div>

      <div className={styles.sectionBlock}>
        <p className={styles.sectionTitle}>Shipping address</p>
        <div className={styles.inlineSearch}>
          <input
            value={addressQuery}
            onChange={(event) => setAddressQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                void handleAddressSearch();
              }
            }}
            placeholder="Road name, building, or place"
          />
          <button type="button" onClick={handleAddressSearch} disabled={searching}>
            {searching ? "Searching" : "Search"}
          </button>
        </div>
        {addressResults.length > 0 ? (
          <div className={styles.results}>
            {addressResults.map((result) => (
              <button key={result.id} type="button" onClick={() => selectAddress(result)}>
                <span>{result.title}</span>
                {(() => {
                  const detail =
                    result.jibunAddress && result.jibunAddress !== result.title
                      ? result.jibunAddress
                      : result.roadAddress && result.roadAddress !== result.title
                        ? result.roadAddress
                        : "";
                  const secondary = [result.postalCode ? `우 ${result.postalCode}` : "", detail].filter(Boolean).join(" · ");
                  return secondary ? <small>{secondary}</small> : null;
                })()}
              </button>
            ))}
          </div>
        ) : null}
        {addressMessage ? <p className={styles.message}>{addressMessage}</p> : null}
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

      <p className={styles.pointNote}>First account balance: {formatPrice(INITIAL_SIGNUP_POINTS)}</p>
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
