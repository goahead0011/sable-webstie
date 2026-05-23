<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# sale

## Purpose
The `/sale` collection route — lists products with `isSale === true`.

## Key Files
| File | Description |
|------|-------------|
| `page.tsx` | `<ProductListingPage title="Sale" products={getProductsByCollection("sale")} />` |

## For AI Agents

### Working In This Directory
- "Sale" membership is the `isSale` flag in `data/products.ts`. Sale products typically also set `compareAtPrice`, but the UI does not currently render a strike-through — only the (sale) `price` is shown.

## Dependencies

### Internal
- `components/product/ProductListingPage`
- `lib/filters` — `getProductsByCollection`

<!-- MANUAL: -->
