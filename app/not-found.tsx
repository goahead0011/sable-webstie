import Link from "next/link";

export default function NotFound() {
  return (
    <section className="utility-page">
      <h1 className="utility-title">Page not found</h1>
      <p className="utility-copy">The page you requested is not available in this MVP.</p>
      <Link href="/">Return home</Link>
    </section>
  );
}
