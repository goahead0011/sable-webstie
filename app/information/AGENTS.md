<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-06-09 -->

# information

## Purpose
The `/information` route — store policy content (Offline Store, Returns & Exchanges, Terms of Service, Privacy Policy) presented as a 4-item TOC tab interface. Each tab shows only its own section (English + Korean), with the top tab (Offline Store) active by default and a fade/slide animation on switch.

## Key Files
| File | Description |
|------|-------------|
| `page.tsx` | Server component: exports route `metadata` and renders `<InformationClient />` |
| `InformationClient.tsx` | `"use client"` — holds all EN/KO content, the four panel components, and the tab state machine (WAI-ARIA tablist: roving tabindex + arrow/Home/End keys) |
| `information.module.css` | TOC layout (`.layout`/`.nav`/`.navItem`), panel `@keyframes panelIn` animation, and the mobile 2x2 nav grid |

## For AI Agents

### Working In This Directory
- Interactivity lives in `InformationClient.tsx` (`use client`); keep `page.tsx` a thin server wrapper.
- The active panel is remounted via `key={activeId}` so the CSS `panelIn` keyframe replays on each tab switch. `styles/globals.css` already neutralizes animation under `prefers-reduced-motion`, so no per-component media query is needed.
- Content uses the shared `.utility-page` / `.utility-title` / `.utility-copy` classes from `styles/globals.css` plus the local module classes (`.section`, `.list`, `.term`, `.address`, `.languageDivider`).
- Desktop nav is a sticky vertical list beside the content; mobile collapses to a 2x2 grid above the content (all four items visible, no horizontal scroll).
- To add or edit a section, update the matching panel component and (if it is a new tab) the `TABS` array.

## Dependencies

### Internal
- `styles/globals.css` (utility classes, reduced-motion handling)

### External
- `next` — `Metadata` type
- `react` — `useState`, `useRef`

<!-- MANUAL: -->
