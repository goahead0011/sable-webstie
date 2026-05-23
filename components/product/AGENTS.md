<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# product

## Purpose
Product surface components: a tappable card, the grid that lays them out, a thin listing-page wrapper used by every collection route, and the full product detail view with size selector and add-to-cart.

## Key Files
| File | Description |
|------|-------------|
| `ProductCard.tsx` | `"use client"` card. On mobile (`(max-width: 767px)`) the first tap on the image expands the card; the second tap navigates. On desktop, the image button navigates immediately. Renders product name, brand name, and price. |
| `ProductCard.module.css` | Card layout including the expanded-state class |
| `ProductGrid.tsx` | Server component. Maps products → `ProductCard`, resolves each `brandId` via `getBrandById`; skips products whose brand cannot be resolved. Renders "No products found." when the list is empty. |
| `ProductGrid.module.css` | Grid layout and empty-state styles |
| `ProductListingPage.tsx` | Server component wrapper used by every collection route (`/women`, `/men`, `/life`, `/sale`, `/new-in`, `/search`, `/brands/[slug]`). Takes `title` (rendered `.sr-only`) and `products`. |
| `ProductDetail.tsx` | `"use client"` PDP. Size selector with `product.sizes[0]` as default (falling back to `"One size"`), brand link, add-to-cart that calls `useCart().addItem` and flips a polite `aria-live` confirmation. |
| `ProductDetail.module.css` | PDP layout (image + info column, size buttons, add button, feedback line) |

## For AI Agents

### Working In This Directory
- `ProductCard` is the only place in the codebase that branches on viewport via `window.matchMedia` at click time. Preserve the two-tap mobile pattern unless the task explicitly removes it; the desktop path uses `router.push(href)`.
- `ProductGrid` silently drops a product whose `brandId` does not resolve. If you change the data model so brands could be optional, decide explicitly whether to render the orphan or keep skipping it.
- `ProductListingPage` exists so every collection route stays a 4-line file. Don't duplicate its wrapper markup inside routes — extend this component instead.
- `ProductDetail` selects `product.sizes[0]` on mount; if `sizes` ever becomes empty, the fallback `"One size"` is what gets added to the cart. Validate `sizes.length > 0` upstream if needed.
- The "Added to cart." feedback never clears — it's a one-shot confirmation. If you want it to toast/dismiss, refactor explicitly.

## Dependencies

### Internal
- `data/brands` — `getBrandById` (grid)
- `components/cart/CartProvider` — `useCart` (detail)
- `components/ui/PlaceholderImage`
- `lib/format` — `formatPrice`
- `types/domain` — `Product`, `Brand`

### External
- `react` (hooks), `next/link`, `next/navigation` (`useRouter` in card)

<!-- MANUAL: -->
