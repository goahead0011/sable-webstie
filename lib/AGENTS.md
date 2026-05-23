<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# lib

## Purpose
Pure helper functions shared between routes and components. No React, no side-effects beyond what each file declares. Keeps page components thin and centralizes the catalogue-querying logic that would otherwise duplicate across collection pages.

## Key Files
| File | Description |
|------|-------------|
| `cart.ts` | `CART_STORAGE_KEY` (`"sable-cart-v1"`), `normalizeCartItems` (drops invalid lines, clamps quantity ≥1), `getCartLineId` (`productId:size`) |
| `filters.ts` | `getProductsByCollection(key)` for new-in/sale/women/men/life, `getProductsByBrandSlug`, `getFeaturedProducts`, `isAudience` type guard |
| `format.ts` | `formatPrice` (`₩ ` + `ko-KR` thousands), `formatDate` (Intl `en` short month) |
| `search.ts` | `searchProducts(query)` — lowercase substring match across product name, brand name, audience, categories; `getSearchLabel` |

## For AI Agents

### Working In This Directory
- Functions here are pure and must remain framework-agnostic (no React imports, no `window` access). `cart.ts` uses the storage key but does not touch `localStorage` — `CartProvider` does that.
- `CollectionKey` in `filters.ts` is the closed set "new-in" | "women" | "men" | "life" | "sale". When adding a new collection, update the union and add a branch — don't fall through to audience match by accident.
- `getProductsByCollection("women"|"men"|"life")` matches `product.audience` exactly, so "unisex" items are intentionally excluded from those collections.
- `searchProducts` returns `[]` for an empty/whitespace query — `SearchPage` relies on this to render an empty state.
- Bump `CART_STORAGE_KEY` (e.g. `-v2`) if the persisted cart shape ever changes incompatibly; `normalizeCartItems` will discard malformed lines but cannot migrate them.

### Common Patterns
- Lookups via `Array.prototype.find` / `filter`; data sets are tiny.
- Imports use the `@/*` alias.

## Dependencies

### Internal
- `data/products`, `data/brands` — catalogue source
- `types/domain` — `Product`, `Brand`, `Audience`, `CartItem`

### External
- None

<!-- MANUAL: -->
