<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# [slug]

## Purpose
Dynamic route `/brands/[slug]` — renders one brand's product list. Statically pre-rendered for every brand in `data/brands` via `generateStaticParams`.

## Key Files
| File | Description |
|------|-------------|
| `page.tsx` | Resolves brand by slug, calls `notFound()` if missing, renders `<ProductListingPage title={brand.name} products={getProductsByBrandSlug(slug)} />` |

## For AI Agents

### Working In This Directory
- `params` is a `Promise<{ slug: string }>` (Next 16); `await` it before reading `slug`.
- `generateStaticParams` returns every brand slug — a new brand in `data/brands` auto-creates its page at build time, no edit here needed.
- A brand with zero products renders the "No products found." empty state from `ProductGrid` — this is intentional.

## Dependencies

### Internal
- `data/brands` — `brands`, `getBrandBySlug`
- `lib/filters` — `getProductsByBrandSlug`
- `components/product/ProductListingPage`

### External
- `next/navigation` — `notFound`

<!-- MANUAL: -->
