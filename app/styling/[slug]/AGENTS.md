<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# [slug]

## Purpose
Dynamic route `/styling/[slug]` — renders one styling story with its hero placeholder, copy block, and a related-products grid. Statically pre-rendered for every story via `generateStaticParams`.

## Key Files
| File | Description |
|------|-------------|
| `page.tsx` | Resolves story by slug, calls `notFound()` if missing, filters `products` by `story.relatedProductIds`, renders hero + copy + `<ProductGrid />` |
| `styling-detail.module.css` | Page-specific layout (hero, copy column, related-products section) |

## For AI Agents

### Working In This Directory
- `params` is `Promise<{ slug: string }>` (Next 16); `await` it.
- Related products are resolved by `Product.id` (not slug). Make sure `relatedProductIds` entries match existing products in `data/products`.
- The related grid reuses `<ProductGrid />` directly (not `<ProductListingPage />`) because the page already provides its own heading/layout shell.
- Hero placeholder tone comes from `story.placeholderTone` (optional; falls back to the component default).

## Dependencies

### Internal
- `data/products` — full product array for the related filter
- `data/styling` — `stylingStories`, `getStylingStoryBySlug`
- `components/ui/PlaceholderImage`
- `components/product/ProductGrid`

### External
- `next/navigation` — `notFound`
- `next/link`

<!-- MANUAL: -->
