"use client";

import { useRef, useState } from "react";
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const galleryImages = product.images ?? (product.image ? [product.image] : []);
  const hasMultipleImages = galleryImages.length > 1;
  const touchStartX = useRef<number | null>(null);

  function handleAdd() {
    addItem(product.id, selectedSize);
    setAdded(true);
  }

  function showPreviousImage() {
    setCurrentImageIndex((currentIndex) =>
      currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1
    );
  }

  function showNextImage() {
    setCurrentImageIndex((currentIndex) =>
      currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1
    );
  }

  function handleTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const deltaX = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    const swipeThreshold = 40;
    if (deltaX <= -swipeThreshold) {
      showNextImage();
    } else if (deltaX >= swipeThreshold) {
      showPreviousImage();
    }
    touchStartX.current = null;
  }

  return (
    <section className={styles.detail}>
      <div className={styles.gallery} aria-label={`${product.name} images`}>
        {galleryImages.length > 0 ? (
          <div
            className={styles.viewport}
            onTouchStart={hasMultipleImages ? handleTouchStart : undefined}
            onTouchEnd={hasMultipleImages ? handleTouchEnd : undefined}
          >
            <div className={styles.track} style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
              {galleryImages.map((image, index) => (
                <div className={styles.slide} key={`${image}-${index}`} aria-hidden={currentImageIndex !== index}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={styles.image}
                    src={image}
                    alt={currentImageIndex === index ? `${product.name} image ${index + 1}` : ""}
                  />
                </div>
              ))}
            </div>
            {hasMultipleImages ? (
              <>
                <button
                  className={`${styles.navButton} ${styles.previousButton}`}
                  type="button"
                  onClick={showPreviousImage}
                  aria-label="Previous image"
                >
                  <svg
                    className={styles.navIcon}
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M11.25 3.5 5.75 9l5.5 5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  className={`${styles.navButton} ${styles.nextButton}`}
                  type="button"
                  onClick={showNextImage}
                  aria-label="Next image"
                >
                  <svg
                    className={styles.navIcon}
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M6.75 3.5 12.25 9l-5.5 5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            ) : null}
          </div>
        ) : (
          <div className={styles.viewport}>
            <PlaceholderImage tone={product.placeholderTone} label={product.name} className={styles.image} />
          </div>
        )}
        {hasMultipleImages ? (
          <div
            className={styles.imageStatus}
            role="group"
            aria-label={`Image ${currentImageIndex + 1} of ${galleryImages.length}`}
          >
            {galleryImages.map((image, index) => (
              <button
                key={`indicator-${image}-${index}`}
                type="button"
                className={`${styles.indicator} ${currentImageIndex === index ? styles.indicatorActive : ""}`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`Go to image ${index + 1}`}
                aria-current={currentImageIndex === index}
              />
            ))}
          </div>
        ) : null}
      </div>
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
