"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { formatPrice } from "@/lib/format";
import type { Brand, Product } from "@/types/domain";
import styles from "@/components/product/ProductDetail.module.css";

type ProductDetailProps = {
  product: Product;
  brand: Brand;
};

export default function ProductDetail({ product, brand }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "One size");
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  function handleAdd() {
    addItem(product.id, selectedSize);
    setAdded(true);
  }

  return (
    <section className={styles.detail}>
      {product.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.image} src={product.image} alt={product.name} />
      ) : (
        <PlaceholderImage tone={product.placeholderTone} label={product.name} className={styles.image} />
      )}
      <div className={styles.info}>
        <Link href={`/brands/${brand.slug}`} className={styles.brand}>
          {brand.name}
        </Link>
        <h1>{product.name}</h1>
        <p className={styles.price}>{formatPrice(product.price)}</p>
        <p className={styles.description}>{product.description}</p>

        <fieldset className={styles.sizes}>
          <legend>Size</legend>
          <div className={styles.sizeOptions}>
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                className={selectedSize === size ? styles.selectedSize : ""}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </fieldset>

        <button className={styles.addButton} type="button" onClick={handleAdd}>
          Add to cart
        </button>
        <p className={styles.feedback} aria-live="polite">
          {added ? "Added to cart." : ""}
        </p>
      </div>
    </section>
  );
}
