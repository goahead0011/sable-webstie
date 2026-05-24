"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/components/layout/SearchOverlay.module.css";

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      // Remember the trigger so focus can return to it on close.
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      const timer = window.setTimeout(() => inputRef.current?.focus(), 40);
      return () => window.clearTimeout(timer);
    }

    // Closing: return focus to whatever opened the overlay (e.g. the Search button).
    previouslyFocused.current?.focus?.();
    return undefined;
  }, [open]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = query.trim();

    if (!nextQuery) {
      return;
    }

    router.push(`/search?q=${encodeURIComponent(nextQuery)}`);
    onClose();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") {
      return;
    }

    const focusables = overlayRef.current?.querySelectorAll<HTMLElement>(
      'button, input, [href], [tabindex]:not([tabindex="-1"])'
    );

    if (!focusables || focusables.length === 0) {
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onKeyDown={handleKeyDown}
    >
      <form className={styles.bar} onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className={styles.input}
          placeholder="search..."
          aria-label="Search products, brands, or categories"
        />
        <button className={styles.submit} type="submit" aria-label="Search">
          <svg className={styles.icon} viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.2" />
            <line x1="11.6" y1="11.6" x2="16.5" y2="16.5" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
        <button className={styles.close} type="button" onClick={onClose} aria-label="Close search">
          <svg className={styles.icon} viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <line x1="3.5" y1="3.5" x2="14.5" y2="14.5" stroke="currentColor" strokeWidth="1.2" />
            <line x1="14.5" y1="3.5" x2="3.5" y2="14.5" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
      </form>
      <button className={styles.backdrop} type="button" onClick={onClose} aria-label="Close search" />
    </div>
  );
}
