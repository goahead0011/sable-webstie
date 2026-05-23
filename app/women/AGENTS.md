<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# women

## Purpose
The `/women` collection route — lists products with `audience === "women"`.

## Key Files
| File | Description |
|------|-------------|
| `page.tsx` | `<ProductListingPage title="Women" products={getProductsByCollection("women")} />` |

## For AI Agents

### Working In This Directory
- Sibling of `men/`, `life/`, `new-in/`, `sale/` — keep them parallel.
- `getProductsByCollection("women")` matches `audience` exactly; "unisex" items are not included.

## Dependencies

### Internal
- `components/product/ProductListingPage`
- `lib/filters` — `getProductsByCollection`

<!-- MANUAL: -->
