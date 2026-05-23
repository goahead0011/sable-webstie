<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# data

## Purpose
Single source of truth for all catalogue content in the MVP. Every module exports a typed array plus small lookup helpers. There is no API or database — pages and components import these arrays directly. Adding/removing entries here automatically flows into static params, listings, search, and the brand mega-menu.

## Key Files
| File | Description |
|------|-------------|
| `products.ts` | `Product[]` (12 entries) + `getProductBySlug`, `getProductById` |
| `brands.ts` | `Brand[]` (~29 entries, some `featured`) + `getBrandById`, `getBrandBySlug` |
| `articles.ts` | `Article[]` magazine entries + `getArticleBySlug` |
| `styling.ts` | `StylingStory[]` lookbook entries (each holds `relatedProductIds`) + `getStylingStoryBySlug` |

## For AI Agents

### Working In This Directory
- All entries must satisfy the types in `types/domain.ts`. Add fields there first if a new attribute is needed.
- `id` and `slug` are both strings; they must be unique within each array. Slugs are kebab-case and used directly in URLs.
- `Product.brandId` must match an existing `Brand.id` — `ProductGrid` silently drops products whose brand cannot be resolved.
- `Product.relatedProductIds` and `StylingStory.relatedProductIds` reference `Product.id` (not slug).
- `Product.price` and `compareAtPrice` are integer KRW (won). The UI assumes no fractional currency.
- `Product.isNew` controls the `/new-in` collection; `Product.isSale` controls `/sale`. `audience` ("women" | "men" | "life" | "unisex") controls the gendered/life collections — note that "unisex" items are NOT included in `women`/`men`/`life` filters (see `lib/filters.ts`).
- After adding a brand/product/article/story, no other change is required — `generateStaticParams` in the corresponding route picks it up at build time.

### Common Patterns
- Lookup helpers use `Array.prototype.find` — fine at this scale; do not prematurely index.
- Exported arrays are mutable in type but should be treated as read-only.

## Dependencies

### Internal
- `types/domain` — all type definitions

### External
- None

<!-- MANUAL: -->
