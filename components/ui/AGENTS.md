<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# ui

## Purpose
Generic UI primitives shared across features. Currently holds only the placeholder block that stands in for product/article/lookbook imagery throughout the MVP.

## Key Files
| File | Description |
|------|-------------|
| `PlaceholderImage.tsx` | Renders a `<div role="img">` with one of two tone classes (`light` | `medium`, default `medium`) and an accessible label |
| `PlaceholderImage.module.css` | Tone-color classes (driven by `--color-placeholder`-ish tokens from `globals.css`) |

## For AI Agents

### Working In This Directory
- `PlaceholderImage` is used everywhere a product photo, article hero, or lookbook image would go. When real imagery lands, this is the swap point — replacing it consistently across `ProductCard`, `ProductDetail`, `ArticleGrid`, `LookbookGrid`, magazine detail, and styling detail covers all visual surfaces.
- The component accepts an optional `className` that is concatenated after the base + tone classes — callers pass their layout sizing this way (e.g. `styles.image`, `styles.hero`, `"article-hero"`).
- `aria-label` falls back to `"Image placeholder"` if no `label` is provided.
- Keep this directory reserved for cross-feature primitives. Feature-specific components belong in `components/{feature}/`.

## Dependencies

### Internal
- None

### External
- None

<!-- MANUAL: -->
