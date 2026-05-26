"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/domain";
import styles from "@/components/product/ProductCard.module.css";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const href = `/products/${product.slug}`;

  function handleImageClick() {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (isMobile && !expanded) {
      setExpanded(true);
      return;
    }

    router.push(href);
  }

  return (
    <article className={`${styles.card} ${expanded ? styles.expanded : ""}`}>
      <button className={styles.imageButton} type="button" onClick={handleImageClick} aria-label={`View ${product.name}`}>
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.image} src={product.image} alt={product.name} loading="lazy" />
        ) : (
          <PlaceholderImage tone={product.placeholderTone} label={product.name} className={styles.image} />
        )}
      </button>
      <div className={styles.meta}>
        <Link className={styles.name} href={href}>
          {product.name}
        </Link>
        <span className={styles.price}>{formatPrice(product.price)}</span>
      </div>
    </article>
  );
}
