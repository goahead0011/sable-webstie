<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# types

## Purpose
Shared domain TypeScript definitions. Single source of truth for the shapes consumed by `data/`, `lib/`, and the React components.

## Key Files
| File | Description |
|------|-------------|
| `domain.ts` | `Audience`, `ProductCategory`, `Product`, `Brand`, `Article`, `StylingStory`, `CartItem` |

## For AI Agents

### Working In This Directory
- `Audience` is the closed union `"women" | "men" | "life" | "unisex"`. `lib/filters.isAudience` is the matching runtime guard — update both together.
- `ProductCategory` is similarly closed (`outerwear`, `tops`, `bottoms`, `shoes`, `bags`, `accessories`, `home`). Adding a category here does not automatically surface it in any UI; check `lib/search.ts` (joins categories for search) and any future filter UI.
- `Product.compareAtPrice` is optional and only meaningful when `isSale` is true (UI does not currently render the strike-through, but the field is reserved).
- `CartItem` is the minimal persisted shape (`productId`, `size`, `quantity`) — full product info is resolved at render time via `getProductById`. Keep it minimal so `localStorage` payloads stay small and migration-friendly.
- All other modules import from this file; widening or narrowing a type can cascade. Run `npm run typecheck` after edits here.

## Dependencies

### Internal
- None (root of the type graph)

### External
- None

<!-- MANUAL: -->
