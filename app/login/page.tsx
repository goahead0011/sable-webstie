import styles from "@/app/login/login.module.css";

export default function LoginPage() {
  return (
    <section className="utility-page">
      <h1 className="utility-title">Login</h1>
      <p className="utility-copy">This is a mock login screen. Authentication is not connected in the MVP.</p>
      <form className={styles.form}>
        <label>
          Email
          <input type="email" placeholder="name@example.com" />
        </label>
        <label>
          Password
          <input type="password" placeholder="password" />
        </label>
        <button type="button">Login mock</button>
      </form>
    </section>
  );
}
