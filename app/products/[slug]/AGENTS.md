<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# [slug]

## Purpose
Dynamic route `/products/[slug]` — the product detail page (PDP). Statically pre-rendered for every product via `generateStaticParams`.

## Key Files
| File | Description |
|------|-------------|
| `page.tsx` | Resolves product by slug, resolves the brand by `product.brandId`, calls `notFound()` if either is missing, renders `<ProductDetail product brand />` |

## For AI Agents

### Working In This Directory
- `params` is `Promise<{ slug: string }>` (Next 16); `await` it.
- The PDP requires BOTH a valid product AND a resolvable brand — a product with a dangling `brandId` 404s rather than rendering a partial page. Keep both checks.
- All add-to-cart and size-selection logic lives in the client `<ProductDetail>` component, not here.

## Dependencies

### Internal
- `data/products` — `products`, `getProductBySlug`
- `data/brands` — `getBrandById`
- `components/product/ProductDetail`

### External
- `next/navigation` — `notFound`

<!-- MANUAL: -->
