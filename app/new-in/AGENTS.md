<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# new-in

## Purpose
The `/new-in` collection route — lists products with `isNew === true`.

## Key Files
| File | Description |
|------|-------------|
| `page.tsx` | `<ProductListingPage title="New in" products={getProductsByCollection("new-in")} />` |

## For AI Agents

### Working In This Directory
- "New in" is an `isNew` flag on individual products in `data/products.ts`, not a date computation. Toggle the flag to manage the collection.
- The cart's empty-state "Continue browsing" link points here, so this page should always remain reachable.

## Dependencies

### Internal
- `components/product/ProductListingPage`
- `lib/filters` — `getProductsByCollection`

<!-- MANUAL: -->
