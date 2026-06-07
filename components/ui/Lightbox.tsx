"use client";

import { useCallback, useEffect, useRef } from "react";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import styles from "@/components/ui/Lightbox.module.css";

export type LightboxItem = {
  src?: string;
  alt: string;
  tone?: "light" | "medium";
};

type LightboxProps = {
  items: LightboxItem[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

export default function Lightbox({ items, index, onIndexChange, onClose }: LightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const hasMultiple = items.length > 1;

  const showPrevious = useCallback(() => {
    onIndexChange(index === 0 ? items.length - 1 : index - 1);
  }, [index, items.length, onIndexChange]);

  const showNext = useCallback(() => {
    onIndexChange(index === items.length - 1 ? 0 : index + 1);
  }, [index, items.length, onIndexChange]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft" && hasMultiple) {
        showPrevious();
      } else if (event.key === "ArrowRight" && hasMultiple) {
        showNext();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [hasMultiple, onClose, showNext, showPrevious]);

  function handleTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: React.TouchEvent) {
    if (touchStartX.current === null || !hasMultiple) return;
    const deltaX = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    const swipeThreshold = 40;
    if (deltaX <= -swipeThreshold) {
      showNext();
    } else if (deltaX >= swipeThreshold) {
      showPrevious();
    }
    touchStartX.current = null;
  }

  const current = items[index];
  if (!current) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      onClick={onClose}
    >
      <button className={styles.closeButton} type="button" onClick={onClose} aria-label="Close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6 18 18M18 6 6 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </button>

      <figure
        className={styles.figure}
        onClick={(event) => event.stopPropagation()}
        onTouchStart={hasMultiple ? handleTouchStart : undefined}
        onTouchEnd={hasMultiple ? handleTouchEnd : undefined}
      >
        {current.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.image} src={current.src} alt={current.alt} />
        ) : (
          <span className={styles.placeholderFrame}>
            <PlaceholderImage tone={current.tone} label={current.alt} />
          </span>
        )}
      </figure>

      {hasMultiple ? (
        <>
          <button
            className={`${styles.navButton} ${styles.previousButton}`}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M11.25 3.5 5.75 9l5.5 5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M6.75 3.5 12.25 9l-5.5 5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className={styles.indicators} onClick={(event) => event.stopPropagation()}>
            {items.map((item, itemIndex) => (
              <button
                key={`lightbox-indicator-${item.alt}-${itemIndex}`}
                type="button"
                className={`${styles.indicator} ${index === itemIndex ? styles.indicatorActive : ""}`}
                onClick={() => onIndexChange(itemIndex)}
                aria-label={`Go to image ${itemIndex + 1}`}
                aria-current={index === itemIndex}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
