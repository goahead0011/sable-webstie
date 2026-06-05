import RegisterClient from "@/app/register/RegisterClient";

export default function RegisterPage() {
  return (
    <section className="utility-page">
      <h1 className="utility-title">Create account</h1>
      <p className="utility-copy">Complete your profile once so checkout can use your saved shipping details.</p>
      <RegisterClient />
    </section>
  );
}
