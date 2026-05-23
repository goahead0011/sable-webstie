<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# products

## Purpose
Container for the product detail dynamic route. There is no `/products` index page — the route only exists under `[slug]/`. Collection-style listing is handled by `/new-in`, `/women`, `/men`, `/life`, `/sale`, `/search`, and `/brands/[slug]`.

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `[slug]/` | Product detail page (see `[slug]/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- Do not add a `page.tsx` here unless you intend to introduce a `/products` index. The directory exists solely as a route-segment container.

<!-- MANUAL: -->
