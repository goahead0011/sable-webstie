<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# styles

## Purpose
Project-wide CSS — design tokens, base resets, utility classes, and reduced-motion handling. Imported once at the root layout (`@/styles/globals.css`). All other styling lives in component-local CSS Modules.

## Key Files
| File | Description |
|------|-------------|
| `globals.css` | `:root` custom properties (colors, header height, content max-width, page gutter, fonts, motion timings), element resets, `.page-content`, `.sr-only`, `.utility-page` / `.utility-title` / `.utility-copy`, `.article-hero`, responsive overrides at 1179px / 767px, `prefers-reduced-motion` block |

## For AI Agents

### Working In This Directory
- Design tokens (`--color-*`, `--header-height`, `--content-max`, `--page-gutter`, `--font-sans`, `--motion-*`) are defined here and consumed throughout component modules. Add new tokens here rather than hardcoding values in component CSS.
- Utility classes (`.utility-page`, `.utility-title`, `.utility-copy`, `.sr-only`, `.page-content`, `.article-hero`) are used by routes and components — renaming them requires updating every callsite.
- Two breakpoint adjustments exist: ≤1179px (reduced page gutter) and ≤767px (mobile header height, full-bleed content, square-aspect article hero). Mirror these breakpoints in component modules for consistency.
- The base font size is `14px` and the brand uses Pretendard (with system fallbacks). Pretendard is not bundled — it loads via the system font stack only.
- The `prefers-reduced-motion` block forces near-instant transitions globally; do not add motion that bypasses it.

## Dependencies

### Internal
- Imported by `app/layout.tsx`

### External
- None (Pretendard relies on the user's installed font)

<!-- MANUAL: -->
