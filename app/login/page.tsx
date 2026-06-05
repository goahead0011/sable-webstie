import { Suspense } from "react";
import LoginClient from "@/app/login/LoginClient";
import styles from "@/app/login/login.module.css";

export default function LoginPage() {
  return (
    <section className="utility-page">
      <h1 className="utility-title">Login</h1>
      <p className="utility-copy">Sign in with the email and password used at registration.</p>
      <Suspense fallback={<div className={styles.form}>Loading</div>}>
        <LoginClient />
      </Suspense>
    </section>
  );
}
