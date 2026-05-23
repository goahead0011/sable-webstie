<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# brand

## Purpose
Components for browsing the brand catalogue. Currently a single directory-grid component used by the `/brands` route.

## Key Files
| File | Description |
|------|-------------|
| `BrandDirectory.tsx` | Server component rendering every brand from `data/brands` as a link to `/brands/[slug]` |
| `BrandDirectory.module.css` | Grid layout for the directory |

## For AI Agents

### Working In This Directory
- `BrandDirectory` reads the full `brands` array — it does not filter or paginate. With the current ~29 brands this is intentional.
- The visible page heading is `.sr-only` (visually hidden); the brand grid itself is the page's visual identity. Preserve this if restyling.
- The brand mega-menu in `components/layout/Header.tsx` also iterates the same `brands` array — visual consistency between the two is expected.

## Dependencies

### Internal
- `data/brands`

### External
- `next/link`

<!-- MANUAL: -->
