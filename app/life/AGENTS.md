<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# life

## Purpose
The `/life` collection route — lists products with `audience === "life"`.

## Key Files
| File | Description |
|------|-------------|
| `page.tsx` | `<ProductListingPage title="Life" products={getProductsByCollection("life")} />` |

## For AI Agents

### Working In This Directory
- One of five collection routes (`women`, `men`, `life`, `new-in`, `sale`) that share the same shape — keep them parallel.
- Note that `getProductsByCollection("life")` matches `audience` exactly, so "unisex" items are not included here.

## Dependencies

### Internal
- `components/product/ProductListingPage`
- `lib/filters` — `getProductsByCollection`

<!-- MANUAL: -->
