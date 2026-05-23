<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# brands

## Purpose
The `/brands` route — a directory of every brand in `data/brands`, plus a dynamic per-brand product listing under `[slug]/`.

## Key Files
| File | Description |
|------|-------------|
| `page.tsx` | `/brands` — renders `<BrandDirectory />` (server component) |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `[slug]/` | Per-brand listing route (see `[slug]/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- The index page has no styling of its own; `BrandDirectory` owns the grid and the visually-hidden heading.
- The same `brands` array also feeds the desktop mega-menu and mobile drawer in the header — changes to brand visibility ripple to those.

## Dependencies

### Internal
- `components/brand/BrandDirectory`

<!-- MANUAL: -->
