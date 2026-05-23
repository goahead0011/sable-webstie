<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# search

## Purpose
The `/search` route — renders product results for the `q` query parameter submitted by the header search overlay.

## Key Files
| File | Description |
|------|-------------|
| `page.tsx` | Reads `searchParams` (a `Promise` in Next 16), normalizes `q` to a string, calls `searchProducts(query)`, renders `<ProductListingPage />` |

## For AI Agents

### Working In This Directory
- `searchParams` is `Promise<{ q?: string }>` (Next 16); `await` it before reading `q`.
- `q` is defensively normalized (`Array.isArray(q) ? q[0] ?? "" : q`) even though the type narrows to `string | undefined` — keep that defense if you accept multi-value params.
- An empty query produces an empty result set and a `"Search"` title; a non-empty query produces `"Search: <query>"`. `ProductGrid` shows the "No products found." empty state.
- Matching is a simple case-insensitive substring scan over name + brand name + audience + categories — see `lib/search.ts`.

## Dependencies

### Internal
- `lib/search` — `searchProducts`
- `components/product/ProductListingPage`

<!-- MANUAL: -->
