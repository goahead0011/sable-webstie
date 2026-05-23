<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# app

## Purpose
Next.js App Router tree. Each subdirectory is a route segment; route files are named `page.tsx` (and optionally `layout.tsx`, `not-found.tsx`). Most route components are thin wrappers that pull data from `data/` (or filter via `lib/filters`) and delegate rendering to a component from `components/`.

## Key Files
| File | Description |
|------|-------------|
| `layout.tsx` | Root layout — wraps every page in `<CartProvider>` and renders the persistent `<Header>`; sets `metadata` and `viewport` |
| `page.tsx` | Home page (`/`) — renders an empty video placeholder area |
| `page.module.css` | Home page styling (video placeholder block) |
| `not-found.tsx` | Global 404 — uses `.utility-page` styles from `globals.css` |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `brands/` | Brand directory + per-brand product listing (see `brands/AGENTS.md`) |
| `cart/` | Cart page (see `cart/AGENTS.md`) |
| `checkout/` | Mock checkout page (see `checkout/AGENTS.md`) |
| `information/` | Static info page (see `information/AGENTS.md`) |
| `life/` | "Life" collection listing (see `life/AGENTS.md`) |
| `login/` | Mock login form (see `login/AGENTS.md`) |
| `magazine/` | Editorial index + article detail (see `magazine/AGENTS.md`) |
| `men/` | "Men" collection listing (see `men/AGENTS.md`) |
| `new-in/` | "New in" collection listing (see `new-in/AGENTS.md`) |
| `products/` | Product detail route (see `products/AGENTS.md`) |
| `sale/` | "Sale" collection listing (see `sale/AGENTS.md`) |
| `search/` | Product search results (see `search/AGENTS.md`) |
| `styling/` | Lookbook index + styling story detail (see `styling/AGENTS.md`) |
| `women/` | "Women" collection listing (see `women/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- Dynamic route params are `Promise<{ ... }>` and must be `await`-ed (Next 16). Existing pages model this — match them.
- Provide `generateStaticParams()` on dynamic segments so the static catalogue gets pre-rendered. Source it from the relevant `data/` array.
- Most collection pages are 4-line wrappers around `ProductListingPage`. Don't bloat them — add logic in `lib/` if needed.
- Call `notFound()` from `next/navigation` for missing slugs; do not return null or render an empty shell.
- Use the `.utility-page` / `.utility-title` / `.utility-copy` classes from `styles/globals.css` for plain text pages (login, information, 404, cart-empty, article detail).

### Testing Requirements
- `npm run lint` and `npm run typecheck` after route changes.
- `npm run dev` and visit the route in a browser for UI changes.

### Common Patterns
- Server components by default; opt into `"use client"` only for stateful UI (cart, header, search overlay, product card image-tap behavior, product detail size selector).
- Page-level CSS Modules co-locate with `page.tsx` (e.g. `login/login.module.css`, `styling/[slug]/styling-detail.module.css`).

## Dependencies

### Internal
- `components/` — every page delegates rendering to a component
- `data/` — content source for slugs and listings
- `lib/filters`, `lib/search` — collection/search logic
- `styles/globals.css` — utility classes used by static pages

### External
- `next` (App Router, `next/link`, `next/navigation`)
- `react`

<!-- MANUAL: -->
