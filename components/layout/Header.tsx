"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { brandMenuOrder, getBrandById } from "@/data/brands";
import { useCart } from "@/components/cart/CartProvider";
import BrandMegaMenu from "@/components/layout/BrandMegaMenu";
import SearchOverlay from "@/components/layout/SearchOverlay";
import styles from "@/components/layout/Header.module.css";

const navItems = [
  { label: "new in", href: "/new-in", key: "new-in" },
  { label: "women", href: "/women", key: "women" },
  { label: "men", href: "/men", key: "men" },
  { label: "life", href: "/life", key: "life" },
  { label: "sale", href: "/sale", key: "sale" },
  { label: "styling", href: "/styling", key: "styling" },
  { label: "magazine", href: "/magazine", key: "magazine" },
  { label: "information", href: "/information", key: "information" }
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileBrandsOpen, setMobileBrandsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { items } = useCart();
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDrawerOpen(false);
        setSearchOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen, searchOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link className={styles.logo} href="/" aria-label="sable home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.logoMark} src="/sable-logo.svg" alt="sable" width={104} height={20} />
          </Link>

          {/* main nav (left group) — plain div, not <nav>, so the BrandMegaMenu
              panel's <nav aria-label="Brands"> is the header's only nav landmark
              and the absolute panel stays anchored to .header (mainNav is static). */}
          <div className={styles.mainNav}>
            <BrandMegaMenu triggerClassName={styles.navButton} />
            {navItems.map((item) => (
              <Link key={item.key} href={item.href} className={styles.navLink} data-label={item.label}>
                {item.label}
              </Link>
            ))}
          </div>

          {/* utility nav (right group) — pushed to the content edge via margin-left:auto */}
          <div className={styles.utilityNav}>
            <button className={styles.navButton} type="button" data-label="search" onClick={() => setSearchOpen(true)}>
              search
            </button>
            <Link className={styles.navLink} href="/login" data-label="login">
              login
            </Link>
            <Link className={styles.navLink} href="/cart" data-label={`cart${cartCount > 0 ? ` ${cartCount}` : ""}`}>
              cart{cartCount > 0 ? ` ${cartCount}` : ""}
            </Link>
          </div>

          <div className={styles.mobileActions}>
            <button className={styles.mobileTextButton} type="button" onClick={() => setSearchOpen(true)}>
              search
            </button>
            <button
              className={styles.mobileTextButton}
              type="button"
              aria-expanded={drawerOpen}
              aria-controls="mobile-navigation"
              onClick={() => setDrawerOpen(true)}
            >
              menu
            </button>
          </div>
        </div>
      </header>

      <div className={`${styles.drawerBackdrop} ${drawerOpen ? styles.drawerBackdropOpen : ""}`} />
      <aside
        id="mobile-navigation"
        className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ""}`}
        aria-hidden={!drawerOpen}
        inert={!drawerOpen}
      >
        <div className={styles.drawerTop}>
          <button className={styles.closeButton} type="button" onClick={() => setDrawerOpen(false)}>
            close
          </button>
        </div>
        <nav className={styles.drawerNav} aria-label="Mobile primary">
          <Link href="/" onClick={() => setDrawerOpen(false)}>
            home
          </Link>
          <button
            className={styles.drawerAccordion}
            type="button"
            aria-expanded={mobileBrandsOpen}
            onClick={() => setMobileBrandsOpen((open) => !open)}
          >
            brands
          </button>
          <div className={`${styles.drawerBrands} ${mobileBrandsOpen ? styles.drawerBrandsOpen : ""}`}>
            <Link href="/brands" onClick={() => setDrawerOpen(false)}>
              all brands
            </Link>
            {brandMenuOrder.map((id) => {
              const brand = getBrandById(id);
              if (!brand) {
                return null;
              }
              return (
                <Link key={brand.id} href={`/brands/${brand.slug}`} onClick={() => setDrawerOpen(false)}>
                  {brand.name}
                </Link>
              );
            })}
          </div>
          {navItems.map((item) => (
            <Link key={item.key} href={item.href} onClick={() => setDrawerOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setDrawerOpen(false)}>
            login
          </Link>
          <Link href="/cart" onClick={() => setDrawerOpen(false)}>
            cart{cartCount > 0 ? ` ${cartCount}` : ""}
          </Link>
        </nav>
      </aside>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
