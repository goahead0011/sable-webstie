"use client";

import Link from "next/link";
import AccountDashboard from "@/components/account/AccountDashboard";
import { useAccount } from "@/components/account/AccountProvider";
import styles from "@/app/login/login.module.css";

export default function AccountClient() {
  const { ready, profile } = useAccount();

  if (!ready) {
    return <p className="utility-copy">Loading account information.</p>;
  }

  if (!profile) {
    return (
      <div className={styles.accountPanel}>
        <p className={styles.message}>Login or create an account to view membership benefits and coupons.</p>
        <div className={styles.actions}>
          <Link className={styles.secondaryAction} href="/login?next=/account">
            Login
          </Link>
          <Link className={styles.secondaryAction} href="/register">
            Create account
          </Link>
        </div>
      </div>
    );
  }

  return <AccountDashboard />;
}
