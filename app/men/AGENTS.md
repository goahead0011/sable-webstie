<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# men

## Purpose
The `/men` collection route — lists products with `audience === "men"`.

## Key Files
| File | Description |
|------|-------------|
| `page.tsx` | `<ProductListingPage title="Men" products={getProductsByCollection("men")} />` |

## For AI Agents

### Working In This Directory
- Sibling of `women/`, `life/`, `new-in/`, `sale/` — keep them parallel.
- `getProductsByCollection("men")` matches `audience` exactly; "unisex" items are not included.

## Dependencies

### Internal
- `components/product/ProductListingPage`
- `lib/filters` — `getProductsByCollection`

<!-- MANUAL: -->
