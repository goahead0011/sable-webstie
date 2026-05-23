<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# editorial

## Purpose
Grid components for the magazine and styling/lookbook indexes. Both render a list of placeholder-image cards that link to detail routes.

## Key Files
| File | Description |
|------|-------------|
| `ArticleGrid.tsx` | Server component taking `articles: Article[]`; links each card to `/magazine/[slug]`; renders category + formatted date |
| `ArticleGrid.module.css` | Article grid layout |
| `LookbookGrid.tsx` | Server component taking `stories: StylingStory[]`; links each card to `/styling/[slug]`; renders title + season |
| `LookbookGrid.module.css` | Lookbook grid layout |

## For AI Agents

### Working In This Directory
- Both components are pure presentational server components — they accept their list as a prop, not via direct data import. Routes (`/magazine`, `/styling`) are responsible for sourcing the data.
- Each card uses `<PlaceholderImage>` for the visual — no real images yet.
- `ArticleGrid` always forces `tone="light"`; `LookbookGrid` uses `story.placeholderTone` (which can be `undefined`, falling back to the component default of `"medium"`).
- Dates are formatted via `lib/format.formatDate` (Intl `en` short).

## Dependencies

### Internal
- `components/ui/PlaceholderImage`
- `lib/format` — `formatDate` (article only)
- `types/domain` — `Article`, `StylingStory`

### External
- `next/link`

<!-- MANUAL: -->
