<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# [slug]

## Purpose
Dynamic route `/magazine/[slug]` — renders one article. Statically pre-rendered for every article via `generateStaticParams`.

## Key Files
| File | Description |
|------|-------------|
| `page.tsx` | Resolves article by slug, calls `notFound()` if missing, renders hero placeholder + category/date + title + excerpt + mock body copy + back link |

## For AI Agents

### Working In This Directory
- `params` is a `Promise<{ slug: string }>` (Next 16); `await` it.
- Body content is currently a single hard-coded paragraph ("This magazine page is a mock editorial entry…"). Real article bodies would require a new field on `Article` (or a content pipeline).
- Hero uses `<PlaceholderImage tone="light" className="article-hero" />` — the `.article-hero` utility class is defined in `styles/globals.css` and has its own responsive aspect-ratio override at ≤767px.

## Dependencies

### Internal
- `data/articles` — `articles`, `getArticleBySlug`
- `components/ui/PlaceholderImage`
- `lib/format` — `formatDate`
- `styles/globals.css` — `.article-hero`, `.utility-*` classes

### External
- `next/navigation` — `notFound`
- `next/link`

<!-- MANUAL: -->
