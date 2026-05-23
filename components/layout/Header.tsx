"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { brands } from "@/data/brands";
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
            sable
          </Link>

          <nav className={styles.desktopNav} aria-label="Primary">
            <BrandMegaMenu triggerClassName={styles.navButton} />
            {navItems.map((item) => (
              <Link key={item.key} href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            ))}
            <button className={styles.navButton} type="button" onClick={() => setSearchOpen(true)}>
              search
            </button>
            <Link className={styles.navLink} href="/login">
              login
            </Link>
            <Link className={styles.navLink} href="/cart">
              cart{cartCount > 0 ? ` ${cartCount}` : ""}
            </Link>
          </nav>

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
          <Link className={styles.drawerLogo} href="/" onClick={() => setDrawerOpen(false)}>
            sable
          </Link>
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
            {brands.map((brand) => (
              <Link key={brand.id} href={`/brands/${brand.slug}`} onClick={() => setDrawerOpen(false)}>
                {brand.name}
              </Link>
            ))}
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
