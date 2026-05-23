<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# components

## Purpose
Reusable React components organized by feature area. Server components by default; client components declare `"use client"` and own all interactive state (cart, search overlay, mobile drawer, size selector, product-card image tap).

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `brand/` | Brand directory grid (see `brand/AGENTS.md`) |
| `cart/` | Cart context provider, cart view, mock checkout (see `cart/AGENTS.md`) |
| `editorial/` | Article and lookbook grids (see `editorial/AGENTS.md`) |
| `layout/` | Header, mobile drawer, search overlay (see `layout/AGENTS.md`) |
| `product/` | Product card, grid, detail, listing-page wrapper (see `product/AGENTS.md`) |
| `ui/` | Generic primitives — currently just `PlaceholderImage` (see `ui/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- One component per file. Filename is PascalCase and matches the default-exported component.
- Co-locate styles as `ComponentName.module.css` in the same folder.
- Props types are declared inline above the component (e.g. `type ProductCardProps = { ... }`); there is no shared `props.ts`.
- Internal imports use the `@/*` alias — never relative `../../`.
- Mark a component `"use client"` only when it needs hooks, browser APIs, or event handlers that cannot run on the server. Listing/detail pages mix server containers with client leaves.

### Common Patterns
- Visual placeholders use `<PlaceholderImage tone="light|medium" label="..." />` from `components/ui`. There is no real `<Image>` usage in this MVP.
- Currency rendering goes through `formatPrice` (`lib/format.ts`); dates through `formatDate`.
- Cart interactions go through the `useCart()` hook from `components/cart/CartProvider`.

## Dependencies

### Internal
- `data/` — components read static fixtures when needed (e.g. `Header` reads `brands` for the mega-menu, `CartView` resolves products by id)
- `lib/format` — price/date formatting
- `types/domain` — shared `Product`, `Brand`, `Article`, `StylingStory`, `CartItem` types

### External
- `react`, `next/link`, `next/navigation`

<!-- MANUAL: -->
