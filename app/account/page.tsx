import AccountClient from "@/app/account/AccountClient";

export default function AccountPage() {
  return (
    <section className="utility-page">
      <h1 className="utility-title">Account</h1>
      <p className="utility-copy">Review your profile, membership tier, coupons, points, and order history.</p>
      <AccountClient />
    </section>
  );
}
