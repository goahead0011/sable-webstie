"use client";

import { useState } from "react";
import Lightbox from "@/components/ui/Lightbox";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import styles from "@/components/ui/ZoomableHero.module.css";

type ZoomableHeroProps = {
  alt: string;
  src?: string;
  tone?: "light" | "medium";
  className?: string;
};

export default function ZoomableHero({ alt, src, tone, className = "" }: ZoomableHeroProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={`${styles.trigger} ${className}`}
        onClick={() => setIsOpen(true)}
        aria-label={`Enlarge ${alt}`}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.media} src={src} alt={alt} />
        ) : (
          <PlaceholderImage tone={tone} label={alt} />
        )}
      </button>
      {isOpen ? (
        <Lightbox
          items={[{ src, alt, tone }]}
          index={0}
          onIndexChange={() => {}}
          onClose={() => setIsOpen(false)}
        />
      ) : null}
    </>
  );
}
