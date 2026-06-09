"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import AccountDashboard from "@/components/account/AccountDashboard";
import { useAccount } from "@/components/account/AccountProvider";
import styles from "@/app/login/login.module.css";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { ready, profile, signIn } = useAccount();
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
      router.push(searchParams.get("next") ?? "/account");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!ready) {
    return <p className="utility-copy">Loading account information.</p>;
  }

  if (profile) {
    return <AccountDashboard />;
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
