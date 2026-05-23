<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# magazine

## Purpose
The editorial section. `/magazine` lists every article via `<ArticleGrid />`; `/magazine/[slug]` renders an individual article entry.

## Key Files
| File | Description |
|------|-------------|
| `page.tsx` | `/magazine` index — renders `<ArticleGrid articles={articles} />` |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `[slug]/` | Article detail route (see `[slug]/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- The index passes the full `articles` array — there's no pagination or filtering.
- All article content lives in `data/articles.ts` (title, excerpt, date, category). There is no MDX/markdown pipeline.

## Dependencies

### Internal
- `components/editorial/ArticleGrid`
- `data/articles`

<!-- MANUAL: -->
