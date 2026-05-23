<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# styling

## Purpose
The lookbook section. `/styling` shows every styling story via `<LookbookGrid />`; `/styling/[slug]` shows a single story with its related products.

## Key Files
| File | Description |
|------|-------------|
| `page.tsx` | `/styling` index — renders `<LookbookGrid stories={stylingStories} />` |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `[slug]/` | Styling story detail (see `[slug]/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- All lookbook content lives in `data/styling.ts`. Each story carries a `relatedProductIds` array consumed by the detail page.

## Dependencies

### Internal
- `components/editorial/LookbookGrid`
- `data/styling`

<!-- MANUAL: -->
