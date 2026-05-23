<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# layout

## Purpose
Persistent chrome rendered above every page: the responsive header with desktop nav + brands mega-menu, the mobile drawer, and the full-screen search overlay.

## Key Files
| File | Description |
|------|-------------|
| `Header.tsx` | `"use client"` site header. Renders the logo, primary nav, brands hover-mega-menu, mobile drawer with accordion brands list, and the cart count. Listens for Escape to close all panels; toggles `body.style.overflow` while the drawer or search overlay is open. Mounts the `SearchOverlay`. |
| `Header.module.css` | Header, mega-menu, drawer, and mobile-actions styles |
| `SearchOverlay.tsx` | `"use client"` full-screen search dialog with autofocus; submits to `/search?q=...` via `router.push` |
| `SearchOverlay.module.css` | Overlay, search bar, backdrop styles |

## For AI Agents

### Working In This Directory
- `Header` is the single client boundary that owns ALL nav state (`brandsOpen`, `drawerOpen`, `mobileBrandsOpen`, `searchOpen`). Lift any new nav state here rather than introducing a parallel store.
- The primary nav order is hard-coded in the `navItems` array at the top of `Header.tsx`. The Brands entry is special-cased (mouse/focus opens the mega-menu); other entries are plain links.
- The mega-menu and mobile drawer both iterate `data/brands` directly — keep them in sync with the directory page if filtering is ever added.
- Header uses `useCart()`; this is why `app/layout.tsx` must wrap children in `<CartProvider>` before `<Header>`. Do not move the header out of the provider.
- `SearchOverlay` autofocuses its input via `setTimeout(40ms)` after `open` becomes true — the delay lets the dialog mount before focus moves. Don't drop the timeout.
- The mobile drawer uses the `inert` attribute when closed for correct a11y focus management. Keep that and the `aria-hidden` pairing.
- Header height is exposed via the `--header-height` token in `styles/globals.css` so `<main>` can compute its min-height — coordinate any header resize with that token.

## Dependencies

### Internal
- `data/brands` — mega-menu + drawer brand list
- `components/cart/CartProvider` — `useCart` for the cart count badge

### External
- `react` (hooks), `next/link`, `next/navigation` (`useRouter` in `SearchOverlay`)

<!-- MANUAL: -->
