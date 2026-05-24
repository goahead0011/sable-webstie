import Link from "next/link";
import { brands } from "@/data/brands";
import styles from "@/components/brand/BrandDirectory.module.css";

export default function BrandDirectory() {
  return (
    <section className="page-content" aria-labelledby="brand-directory-title">
      <h1 id="brand-directory-title" className="sr-only">
        Brands
      </h1>
      <div className={styles.grid}>
        {brands.map((brand) => (
          <Link key={brand.id} href={`/brands/${brand.slug}`}>
            {brand.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
