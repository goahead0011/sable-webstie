# Ralplan: sable Figma-first UI Rebuild + Brands Modal FSM

> **Status:** `pending approval` — planning only, no code changes.
> **Date:** 2026-05-23
> **Revision:** v2 (post Architect + Critic)
> **Scope:** UI rebuild against Figma + Brands mega-menu duplicate-modal bug fix.

---

## 0. CRITICAL INPUT GAP & ESCALATION PATH

**No Figma URL was provided** despite "Figma link를 최우선 기준으로" being stated. The figma MCP tools (`get_design_context`, `get_screenshot`, `get_metadata`, `get_variable_defs`) are configured but need a `figma.com/design/<fileKey>/...?node-id=...` URL.

**Path matrix — pick one before implementation begins:**

| Path | What happens | When to choose |
|---|---|---|
| **A. Provide Figma URL(s)** (preferred) | Each phase reads design tokens, dimensions, and screenshots from Figma via MCP. Highest fidelity. | URL available within ~24h. |
| **B. Provide screenshots only** | Manually attach exported PNGs; implementation works from those + text specs. | Designer can export but not share file access. |
| **C. Text spec only** | Implementation uses only the brief's text constraints. Lowest fidelity. | Acceptable for the Brands bug fix; risky for the rebuild. |
| **D. ESCALATION — ship bug fix first, rebuild later** | Promote Option B from §RALPLAN-DR to active plan: PR1 = Brands FSM fix only (no Figma needed); PR2 = Figma rebuild once URL is available. | **If no Figma input arrives within 24h.** Reduces failure isolation risk. |

The plan below is structured so Phase 0 swaps cleanly between A/B/C/D. **Phase 0 does NOT block planning approval; it blocks implementation.**

---

## RALPLAN-DR Summary

### Principles
1. **Figma is the source of truth on desktop.** Text specs in the brief supplement design tokens; they do not override Figma when both exist.
2. **One active interaction surface per behavior.** Desktop and mobile may render different brand-nav components; only one is interactive at any viewport.
3. **Behavior is a finite state machine with complete transitions.** Every event class (pointer, keyboard, focus, navigation) maps to a named transition. A missing transition is a bug.
4. **Preserve non-UI invariants.** `data/`, `lib/`, `types/`, route shells, `CartProvider` semantics, `localStorage` key & shape — untouched.
5. **Desktop matches Figma; mobile/tablet are principled extensions.** Mobile rules must be derivable from desktop tone — no invented patterns.

### Decision Drivers
1. Fix the Brands duplicate-DOM bug correctly (FSM with `pinned > hover > closed`) with zero a11y/keyboard regression.
2. Achieve Figma fidelity on the listed desktop frames.
3. Keep implementation cost bounded; keep failure isolation possible (Path D safety valve).

### Viable Options

**Option A (RECOMMENDED if Figma URL arrives within 24h) — Targeted UI rewrite + extracted `BrandMegaMenu` FSM**
- Keep all `data/`, `lib/`, `types/`, route shells, `CartProvider`.
- Rewrite per-component CSS modules against Figma.
- Extract Brands menu out of `Header.tsx` into a new `components/layout/BrandMegaMenu.tsx` with an explicit FSM.
- Pros: Bounded blast radius; bug fix + rebuild collapse into one structured task.
- Cons: CSS surface large; visual regression risk on routes not manually QA'd; bug fix held hostage by rebuild QA cycle.

**Option B (RECOMMENDED if Figma URL is delayed) — Bug-fix PR first, rebuild PR later**
- PR1 (no Figma input needed): extract `BrandMegaMenu.tsx`, implement FSM, swap Header to use it. ~3-5 files touched. Ships immediately, fixes the user-visible bug.
- PR2 (Figma input required): full UI rewrite per Option A's remaining scope (tokens, push-down hover, search overlay, mobile drawer restyle).
- Pros: Bug fix unblocked from rebuild QA; failure isolation; small reviewable PR.
- Cons: ~30 lines of mega-menu CSS get rewritten in PR2 (the FSM logic survives intact); two PRs to coordinate.

**Option C — Strip & rebuild entire UI layer including tokens & primitives**
- Pros: Cleanest match; no legacy baggage.
- Cons: Throws away working keyboard nav, drawer focus management, `inert` handling; high regression risk when the actual misalignment is CSS + state.

### Why A or B (not C)
A and B are the same FSM + the same eventual rebuild. The choice between them is **failure-isolation strategy**:
- A if you trust the bundle and have Figma input.
- B if Figma is delayed or you want the user-visible bug fixed before any rebuild risk.

C is rejected: discards working a11y plumbing for marginal benefit.

---

## 1. 유지할 부분 (Keep — do not touch)

| Path | Reason |
|---|---|
| `data/products.ts`, `data/brands.ts`, `data/articles.ts`, `data/styling.ts` | Content & shapes are correct. |
| `types/domain.ts` | Type contracts power data + lib + components. |
| `lib/cart.ts` | Cart persistence logic correct. |
| `lib/filters.ts` | Collection logic correct. |
| `lib/search.ts` | Search matching correct. **Confirmed unchanged even though SearchOverlay (its caller) is rewritten in Phase 4.** |
| `lib/format.ts` | Formatting helpers correct. |
| `components/cart/CartProvider.tsx` | Microtask hydration + ready-flag gating is deliberate; do not "simplify." |
| All `app/**/page.tsx` route shells | Routing + `generateStaticParams` correct. Only the components they render get rewritten. |
| `app/layout.tsx` shell | Keep `<CartProvider><Header /><main>{children}</main>` structure; `Header` internals change, the shell does not. |
| `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `package.json` | Stable. |

---

## 2. 삭제 / 재작성할 UI 컴포넌트

| Path | Action | Notes |
|---|---|---|
| `components/layout/Header.tsx` | **Rewrite** | Trim to top bar layout + state for drawer/search coordination. Brands mega-menu extracted out. **The existing `handleHeaderBlur` (Header.tsx:51-55) is removed** — `BrandMegaMenu` now owns focus closure. |
| `components/layout/Header.module.css` | **Rewrite from Figma** | New token-driven layout. |
| `components/layout/SearchOverlay.tsx` | **Rewrite** | Compact top-bar pattern (§6). |
| `components/layout/SearchOverlay.module.css` | **Rewrite from Figma** | |
| `components/layout/BrandMegaMenu.tsx` | **NEW** | Owns the FSM (§4). One DOM instance per active viewport. |
| `components/layout/BrandMegaMenu.module.css` | **NEW** | |
| `lib/hooks/useIsDesktop.ts` | **NEW** | `matchMedia("(min-width: 1024px)")` hook for conditional mount (see §4 invariant 6). |
| `components/brand/BrandDirectory.tsx` + CSS | **CSS rewrite, minimal TSX** | |
| `components/product/ProductCard.tsx` + CSS | **Rewrite** | Push-down hover via `grid-template-rows: 0fr → 1fr` (§5); decide mobile tap pattern (5a vs 5b). |
| `components/product/ProductGrid.tsx` + CSS | **CSS rewrite** | 3-col × 320×400 × 20px gap; row push-down. |
| `components/product/ProductDetail.tsx` + CSS | **Light restyle** | Component logic mostly correct; CSS rewrite gated on Figma PDP frame. |
| `components/product/ProductListingPage.tsx` | **Keep** | |
| `components/editorial/ArticleGrid.tsx` + CSS | **CSS rewrite** | |
| `components/editorial/LookbookGrid.tsx` + CSS | **CSS rewrite** | |
| `components/ui/PlaceholderImage.tsx` + CSS | **Keep, possibly retone** | |
| `components/cart/CartView.tsx` + CSS | **Light restyle** | |
| `components/cart/CheckoutMock.tsx` | **Keep**; optional: own CSS module | |
| `styles/globals.css` | **Token rewrite split into 1a + 1b** | See §8. |
| `app/page.module.css`, `app/login/login.module.css`, `app/styling/[slug]/styling-detail.module.css` | **Restyle** | Token updates only unless Figma frames supplied. |

---

## 3. Figma-first 새 컴포넌트 구조

```
components/
├── layout/
│   ├── Header.tsx            # Top bar + drawer/search coordination
│   ├── BrandMegaMenu.tsx     # NEW — FSM, desktop-only via useIsDesktop
│   └── SearchOverlay.tsx     # Compact top-bar variant
├── brand/BrandDirectory.tsx
├── product/
│   ├── ProductCard.tsx       # Push-down hover (grid-row-fr technique)
│   ├── ProductGrid.tsx
│   ├── ProductListingPage.tsx
│   └── ProductDetail.tsx
├── editorial/{ArticleGrid,LookbookGrid}.tsx
├── cart/{CartProvider,CartView,CheckoutMock}.tsx   # CartProvider UNCHANGED
└── ui/PlaceholderImage.tsx                          # UNCHANGED

lib/hooks/useIsDesktop.ts    # NEW
```

Optional `DesktopNav.tsx` / `MobileDrawer.tsx` splits if `Header.module.css` balloons; not mandated.

---

## 4. Brands Modal 상태 관리 설계 (THE BUG FIX)

### Root cause

`Header.tsx:67-82` makes the Brands nav entry a `<Link href="/brands">` whose hover opens the mega-menu. The menu (lines 110–122) renders every Header render with its own `mouseenter`/`mouseleave` handlers and a visibility class. Clicking the Brands link **navigates to `/brands`**, triggering a full route transition. The new page mounts, Header re-renders, the cursor is still over the trigger area, `onMouseEnter` fires again — what looks like a "second modal" is actually the same panel re-opening on the post-navigation Header instance.

Whatever the exact UI symptom (one panel re-firing, or a transient double-render flicker, or a stuck panel), the underlying error is constant: **clicking the trigger has no defined transition into a pinned state.** Click means "navigate"; hover means "open"; "pin" does not exist.

### The fix: explicit FSM with complete transitions

```ts
type MenuMode = "closed" | "hover" | "pinned";
```

#### Transition table (revised — includes focus and route events)

| From | Event | To | Notes |
|---|---|---|---|
| `closed` | `mouseenter` on container | `hover` | container = trigger + panel as a single hover region |
| `closed` | `focus` on trigger | `hover` | wired via `onFocus` on the button |
| `closed` | `click` on trigger | `pinned` | first click pins directly |
| `hover` | `mouseleave` from container **AND** focus is NOT inside container | `closed` | focus-aware: do not close if user tabbed in |
| `hover` | `mouseleave` from container **AND** focus IS inside container | `hover` | no-op; menu stays open while focus is inside |
| `hover` | `focusout` from container with `relatedTarget` outside container | `closed` | user tabbed away from panel |
| `hover` | `click` on trigger | `pinned` | **the bug fix** — upgrades same DOM instance |
| `hover` | `Escape` | `closed` | |
| `pinned` | `mouseleave` | `pinned` | **ignored** |
| `pinned` | `focusout` | `pinned` | ignored — pinned doesn't care about focus drift |
| `pinned` | `click` on trigger | `closed` | toggle |
| `pinned` | `click` outside container (document `mousedown`) | `closed` | listener bound only in `pinned` |
| `pinned` | `Escape` | `closed` | focus returns to trigger |
| any | route change (`usePathname` value differs from previous) | `closed` | covers in-panel link clicks before next page renders |

#### Component contract (revised)

```tsx
// components/layout/BrandMegaMenu.tsx — pseudocode
"use client";

type MenuMode = "closed" | "hover" | "pinned";

export default function BrandMegaMenu() {
  const isDesktop = useIsDesktop();              // matchMedia gate — see §4 invariant 6
  const [mode, setMode] = useState<MenuMode>("closed"); // deterministic SSR init
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  // Route change → closed
  useEffect(() => {
    if (prevPath.current !== pathname) {
      setMode("closed");
      prevPath.current = pathname;
    }
  }, [pathname]);

  // Hover entry (pointer or keyboard)
  const handleEnter = () => setMode((m) => (m === "closed" ? "hover" : m));
  const handleFocus = () => setMode((m) => (m === "closed" ? "hover" : m));

  // Focus-aware mouseleave — does NOT close if user tabbed in
  const handleMouseLeave = () => {
    setMode((m) => {
      if (m !== "hover") return m;
      if (containerRef.current?.contains(document.activeElement)) return m;
      return "closed";
    });
  };

  // Focus leaves container — close if leaving entirely (relatedTarget outside)
  const handleFocusOut = (e: React.FocusEvent<HTMLDivElement>) => {
    if (mode !== "hover") return;
    const next = e.relatedTarget as Node | null;
    if (next && containerRef.current?.contains(next)) return;
    setMode("closed");
  };

  // Trigger click toggles pinned
  const handleTriggerClick = () =>
    setMode((m) => (m === "pinned" ? "closed" : "pinned"));

  // Outside click — pinned only
  useEffect(() => {
    if (mode !== "pinned") return;
    const onDocDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setMode("closed");
    };
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, [mode]);

  // Escape — any open state
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mode !== "closed") {
        setMode("closed");
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode]);

  if (!isDesktop) return null;  // mobile uses MobileDrawer accordion

  const isOpen = mode !== "closed";

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleMouseLeave}
      onBlur={handleFocusOut}
      data-mode={mode}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="brand-mega-menu-panel"
        data-pinned={mode === "pinned"}
        onClick={handleTriggerClick}
        onFocus={handleFocus}
      >
        Brands
      </button>
      <div
        id="brand-mega-menu-panel"
        role="region"
        aria-label="Brands"
        hidden={!isOpen}
      >
        <Link href="/brands">All brands</Link>
        {brands.map((b) => (
          <Link key={b.id} href={`/brands/${b.slug}`}>{b.name}</Link>
        ))}
      </div>
    </div>
  );
}
```

```ts
// lib/hooks/useIsDesktop.ts
"use client";
import { useEffect, useState } from "react";

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);   // false on SSR
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsDesktop(mql.matches);
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);
  return isDesktop;
}
```

### Critical invariants (revised)

1. **One DOM instance per active viewport, deterministic SSR.** `mode` initializes to `"closed"` on both server and client. `useIsDesktop()` returns `false` during SSR and initial client render, so `BrandMegaMenu` renders `null`. Once the matchMedia effect runs on the client, desktop users see the menu mount with `mode = "closed"`; the panel renders with `hidden={true}` and all `brands.map(...)` children present. No hydration mismatch — server and first client render both produce `null` for the menu.
2. **Brands trigger is a `<button>`, not a `<Link>`.** Click no longer navigates. "All brands" link lives inside the panel. **Behavioral change worth user awareness** — concrete mitigation decided in §11.
3. **Outside-click only listens in `pinned`.** Avoids spurious closes during normal hover.
4. **`aria-expanded` reflects `isOpen`** (hover ∨ pinned). `data-pinned` distinguishes pinned for CSS-only differentiation.
5. **Focus management:** Escape from `pinned` returns focus to trigger. Hover entry does NOT move focus into the panel (would scroll-jack).
6. **Desktop-only via JS `matchMedia`**, not CSS `display: none`. `useIsDesktop()` conditionally mounts; on mobile no listeners attach, no panel HTML ships, no FOUC risk.
7. **Header no longer carries `handleHeaderBlur`.** Focus closure is fully owned by `BrandMegaMenu`'s `handleFocusOut`. Remove `Header.tsx:51-55` during Phase 3.
8. **Prefetch decision:** with the trigger as a `<button>`, Next.js no longer prefetches `/brands`. **Accept the regression** — the panel's "All brands" link is a real `<Link>` and IT prefetches on hover. The trigger's job is the panel, not navigation.

---

## 5. Product Hover Push-Down 구현 방식

### Required behavior
> Product hover 시 metadata가 이미지 아래 normal flow로 펼쳐지고, 아래 row가 밀려야 한다.

### Mechanism — `grid-template-rows: 0fr → 1fr` technique

`max-height: 0 → 80px` transitions cannot animate variable content smoothly (Critic finding) and trip CLS budgets. The modern alternative uses fractional grid rows: a child wrapped in `display: grid; grid-template-rows: 0fr` collapses to zero height; transitioning to `1fr` reveals its natural content height smoothly without a fixed cap.

```css
/* ProductGrid.module.css */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 320px);
  gap: 20px;
  grid-auto-rows: min-content;
  align-items: start;
  justify-content: center;
}
@media (max-width: 1023px) { .grid { grid-template-columns: repeat(2, minmax(260px, 320px)); } }
@media (max-width: 767px)  { .grid { grid-template-columns: minmax(0, 320px); } }
```

```css
/* ProductCard.module.css */
.card {
  display: flex;
  flex-direction: column;
  width: 320px;
}
.image { width: 320px; height: 400px; }

.metaWrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--motion-medium) ease;
}
.card:hover .metaWrap,
.card:focus-within .metaWrap {
  grid-template-rows: 1fr;
}
.meta {
  overflow: hidden;        /* required: child of 0fr row must clip */
  opacity: 0;
  transition: opacity var(--motion-fast) ease var(--motion-fast);
}
.card:hover .meta,
.card:focus-within .meta {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .metaWrap, .meta { transition: none; }
}
```

**Why this works**
- The `.metaWrap` row goes 0fr → 1fr smoothly; the child's intrinsic height drives the final size.
- Row growth propagates to the grid's row sizing because `grid-auto-rows: min-content` and `align-items: start` let each row independently size to its tallest cell.
- Hovering one card grows that card → grows its row → subsequent rows shift down.

**Sibling alignment caveat**: cards in the same row as the hovered card stay top-aligned (`align-items: start`); the row's empty space appears below them. **Confirm against Figma Product Card Hover State before implementation.** If Figma shows siblings bottom-extending, switch to per-card row isolation (each card in its own grid row via `grid-column: span N`).

**Browser support floor:** Safari 14+, Chromium 89+. Stated for clarity (no IE; no Safari < 14).

### Mobile / touch behavior

| Option | Description | Default |
|---|---|---|
| **5a** | Mobile cards always show metadata. Single tap navigates. | **Default unless Figma Mobile Card frame shows collapsed state.** |
| **5b** | Two-tap: first expands, second navigates (status quo). | Use only if Figma dictates. |

Default: **5a**, swap to **5b** at Phase 5 if Figma frame disagrees.

---

## 6. Search Overlay 구현 방식

### Behavior
> Search overlay는 Figma의 compact top bar 구조를 따른다.

A bar occupying the header strip, overlaying nav while open. Submit → `/search?q=...` and close.

```tsx
// components/layout/SearchOverlay.tsx — pseudocode
"use client";
export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus on open — use rAF chain instead of setTimeout(40)
  useLayoutEffect(() => {
    if (!open) return;
    let cancelled = false;
    const id1 = requestAnimationFrame(() => {
      if (cancelled) return;
      const id2 = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id2);
    });
    return () => { cancelled = true; cancelAnimationFrame(id1); };
  }, [open]);

  // Escape close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;   // Intentional: input value is NOT preserved across open/close cycles
                            // (matches user expectation that each search session starts fresh).

  return (
    <div role="search" className={styles.bar}>
      <form onSubmit={(e) => {
        e.preventDefault();
        const q = inputRef.current?.value.trim();
        if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
        onClose();
      }}>
        <input ref={inputRef} type="search" aria-label="Search products" placeholder="search..." />
        <button type="submit">Search</button>
        <button type="button" onClick={onClose} aria-label="Close search">×</button>
      </form>
    </div>
  );
}
```

```css
.bar {
  position: fixed;
  inset: 0 0 auto 0;
  height: var(--header-height);
  background: var(--color-page);
  border-bottom: 1px solid var(--color-line);
  display: flex;
  align-items: center;
  padding: 0 var(--page-gutter);
  z-index: 60;   /* above header */
}
```

---

## 7. Mobile / Tablet 대응 방식

| Breakpoint | Layout |
|---|---|
| Desktop (`≥1024px`) | Figma reference. 3-col product grid; full nav with hover/pin Brands menu (`BrandMegaMenu` mounted via `useIsDesktop`); search compact top bar. |
| Tablet (`768–1023px`) | 2-col product grid. Nav collapses to burger drawer (default — safer than guessing inline). |
| Mobile (`<768px`) | 1-col product grid (or 2 narrow per Figma Mobile Grid). Burger drawer + Brands accordion. Search occupies full-width bar. |

`MobileDrawer` (inline in Header for now) preserves working a11y: `inert` while closed, `body.style.overflow = "hidden"` while open, Escape closes, Brands accordion via `aria-expanded` on the toggle button.

`BrandMegaMenu` is desktop-only by `useIsDesktop()` JS gate, **not** CSS `display: none`. Mobile renders nothing for it; no panel HTML, no listeners.

---

## 8. 구현 순서 (Implementation Order — revised)

> **Shippable column:** ❌ = intermediate state may have visual regressions; only ✅ phases are deploy-safe.
> Phase 0 is BLOCKING. Phase 1 split into **1a (additive)** + **1b (subtractive)** for token safety.

| # | Phase | Outputs | Verify | Shippable |
|---|---|---|---|---|
| **0** | **Figma context acquisition** | URL → MCP pulls of named frames + `get_variable_defs`. If no URL within 24h → escalate to Path D (§0). | Tokens table in working notes (uncommitted). | — |
| 1a | **Additive token pass** | `styles/globals.css` — add new `--color-fg-*`, `--space-*`, `--type-*` tokens **alongside** existing ones. No deletions. | `npm run dev` — old components unchanged. | ✅ |
| 2 | `BrandMegaMenu` + `useIsDesktop` | New `components/layout/BrandMegaMenu.tsx` + CSS; `lib/hooks/useIsDesktop.ts`. Header NOT yet swapped. | Mount-test in isolation (not user-facing yet). | ✅ (no behavior change) |
| 3 | **Header rewrite — bug fix lands here** | Header mounts `<BrandMegaMenu />`; drops old Brands `<Link>` + mega-menu DIV; removes `handleHeaderBlur`. | Full §10 manual walkthrough. **App fully functional.** | ✅ (**Path D candidate ship**) |
| 4 | Search overlay rewrite | `SearchOverlay.tsx` compact top bar. | `/search?q=shirt` end-to-end. | ✅ |
| 5 | Product grid + card push-down | `ProductGrid.module.css`, `ProductCard.tsx` + CSS. | Hover row 1 card on `/new-in`; row 2 shifts down. | ✅ |
| 6 | Product detail polish | `ProductDetail.tsx` + CSS. | `/products/nova-2995-coat`. | ✅ |
| 7 | Editorial + Brand directory CSS | `ArticleGrid`, `LookbookGrid`, `BrandDirectory`. | `/magazine`, `/styling`, `/brands`. | ✅ |
| 8 | Mobile drawer rewrite | `MobileDrawer` (inline or split). | Resize 390px; drawer + Brands accordion. | ✅ |
| 9 | Cart / Checkout / Login / Information light restyle | Token sweep. | All routes. | ✅ |
| 10 | Responsive QA pass | None — bug fixes only. | 1280 / 834 / 390 walkthrough. | ✅ |
| **1b** | **Subtractive token pass** | Remove old `--color-*` tokens superseded in 1a. Final globals.css cleanup. | Full route walk. | ✅ |
| 11 | Lint + typecheck + build | None. | `npm run lint && npm run typecheck && npm run build`. | ✅ |

**Path D shortcut:** Phase 3 alone fixes the Brands bug. If Figma is unavailable, ship after Phase 3 (skipping 1b until Phase 11 of PR2).

---

## 9. 수용 기준 Checklist (expanded)

### Brands modal — bug fix (the critical surface)
- [ ] **Original bug repro is fixed.** Navigate to `/brands`. Hover Brands in header. Click Brands. Count `#brand-mega-menu-panel` elements in DOM: stays at exactly 1.
- [ ] Desktop hover over Brands opens the mega-menu.
- [ ] Click on Brands while hover-open: same DOM instance transitions to pinned (verified: 1 panel element, `[data-mode="pinned"]` on container, `aria-expanded="true"`, `data-pinned="true"` on trigger).
- [ ] In `pinned`: moving mouse outside panel does NOT close it.
- [ ] In `pinned`: clicking Brands again closes it.
- [ ] In any open state: Escape closes; focus returns to trigger.
- [ ] In `pinned`: clicking outside container closes (via document `mousedown` listener).
- [ ] **Keyboard: Tab into trigger → `aria-expanded` becomes true → Tab into panel → links focusable.**
- [ ] **Focus-within + mouseleave: Tab into panel, then move mouse away → panel stays open** (because `document.activeElement` is inside container).
- [ ] **Focusout from container: Tab from last panel link to next header item → panel closes.**
- [ ] **Tab out of last panel link does NOT trap focus** — moves to next header item naturally.
- [ ] **Rapid hover → click → hover → click within 500ms** lands deterministically on `closed` with no orphan listeners (verify via React DevTools: only one `mousedown` listener while pinned, zero while closed).
- [ ] **Pinned + click panel link → menu closes before next page renders** (covered by `usePathname` effect).
- [ ] **Navigate while pinned → document `mousedown` listener is cleaned up** (React DevTools / `getEventListeners(document).mousedown` after navigation).
- [ ] **Mobile (`<1024px`): `BrandMegaMenu` is NOT mounted** (verify via `document.getElementById("brand-mega-menu-panel") === null`). Brands accordion in drawer is the only path.
- [ ] **No React hydration warnings in console** on initial load at any viewport.

### Design fidelity (Phase 0 path A or B)
- [ ] Background `#fbfbfb`, text `#191919`, Pretendard stack.
- [ ] Header height ~69px on desktop.
- [ ] Home shows video-shaped placeholder matching Home Default frame.
- [ ] Product grid: 3 cols × 320×400 × 20px gap at desktop.
- [ ] Product card hover: metadata expands in normal flow; following row pushes down (top row hover with bottom row populated).
- [ ] Search overlay: compact top-bar appearance (not full-screen).
- [ ] Nav label is `Men`, never `Man`.
- [ ] Mobile drawer + Brands accordion structurally match Mobile Menu Open / Mobile Brands Accordion Open frames if provided.

### Functional preservation
- [ ] All routes from prior MVP plan resolve (Home, Brands, Brand detail, New in, Women, Men, Life, Sale, Styling, Styling detail, Magazine, Article detail, Product detail, Search, Login, Cart, Checkout, Information, 404).
- [ ] Cart persists across reload (key `sable-cart-v1` unchanged).
- [ ] Cart add / remove / quantity ± functional.
- [ ] Search submits to `/search?q=`; matches name, brand, audience, categories.
- [ ] `prefers-reduced-motion`: hover transitions reduced (globals.css block preserved + per-component `@media (prefers-reduced-motion)` overrides).

### Code quality gates
- [ ] `npm run lint` passes (`--max-warnings=0`).
- [ ] `npm run typecheck` passes.
- [ ] `npm run build` succeeds.
- [ ] No new runtime dependencies.
- [ ] No `any` introduced.
- [ ] AGENTS.md files updated **whenever the file list in §Key Files changes** (concrete trigger, not subjective).

---

## 10. 검증 방법 (Verification — expanded)

### Automated
```bash
npm run lint
npm run typecheck
npm run build
```

### Manual — Brands FSM scripted walkthrough (desktop, ≥1024px)

1. Load `/`. DevTools → Elements. Confirm `#brand-mega-menu-panel` exists exactly once with `hidden=""`.
2. Hover Brands. **Assert:** panel visible; exactly 1 panel element; `aria-expanded="true"`.
3. **Original bug repro:** Navigate to `/brands`. Hover Brands link in header. Click Brands link. **Assert:** panel count stays at 1; `data-mode="pinned"`; no second panel mounted.
4. Move mouse off Brands and panel. **Assert:** panel still visible (pinned ignores mouseleave).
5. Click Brands again. **Assert:** panel hidden; `aria-expanded="false"`.
6. Hover Brands → Escape. **Assert:** panel hidden; `document.activeElement.textContent === "Brands"`.
7. Hover Brands → click → click on `<main>`. **Assert:** panel hidden.
8. Tab from logo until trigger focused. **Assert:** panel opens (`hover`). Press Enter. **Assert:** `pinned`. Tab. **Assert:** focus on first panel link.
9. **Focus-within test:** Tab into panel, move mouse anywhere outside container. **Assert:** panel stays open.
10. **Focusout test:** Tab from last panel link forward. **Assert:** focus on next header element; panel closed.
11. **In-panel link click:** open via hover, click "All brands". **Assert:** navigation completes; new page renders with panel closed.
12. **Listener cleanup test:** open pinned. In DevTools console: `getEventListeners(document).mousedown?.length` — note value. Close panel. Re-check. **Assert:** value decreased by 1.
13. **Rapid sequence:** hover → click → hover → click within 500ms (use Playwright or fast manual). **Assert:** final `data-mode` is `closed`; no console errors.
14. **Hydration:** hard reload `/brands`. **Assert:** no React hydration warnings in console.

### Manual — Mobile (`<1024px`)
- Resize to 390px. **Assert:** `document.getElementById("brand-mega-menu-panel") === null`.
- Open burger drawer. Tap Brands. Accordion expands. Tap brand link. Navigate.

### Manual — Layout & hover
- `/new-in` at 1280px: hover row 1 card with row 2 populated. **Assert:** row 2 shifts down visibly; no overlap; transition smooth (no jank).
- `/new-in` at 834px: 2-col grid; same hover behavior.
- `/new-in` at 390px: 1-col grid; cards readable.

### Manual — Search
- Click Search. Compact bar overlays header. Type "shirt". Enter. Lands on `/search?q=shirt`. Bar closed.
- Escape from bar closes without navigating.
- Reopen search. **Assert:** input is empty (intentional reset per §6).

### Manual — Cart
- Add from PDP. Refresh. Badge persists.
- Remove from `/cart`. Badge updates.

---

## 11. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| **No Figma URL** | Phase 0 gates. If unavailable in 24h, escalate to Path D (§0): ship Phase 3 as PR1, defer rebuild. |
| **Brands trigger no longer navigates** — middle-click, ctrl-click, right-click "open in new tab" on Brands stop working. | **Accept regression.** Rationale: the trigger's job is the panel; "All brands" link inside the panel is a real `<Link>` supporting all click modifiers. Document in `BrandMegaMenu.tsx` JSDoc and in §12 Consequences. |
| **Prefetch loss on Brands trigger** (button doesn't prefetch). | **Accept.** "All brands" panel link prefetches on its own hover; users opening the panel get prefetch on the route they actually click. |
| **Push-down hover causes CLS or jank.** | Use `grid-template-rows: 0fr → 1fr` (not `max-height`) — smooth across variable content, no CLS budget violation. `prefers-reduced-motion` disables transition. Phase 5 verify includes "transition smooth" assertion. |
| **`useEffect` re-binds on every mode change** (outside-click listener). | Acceptable: effect deps are `[mode]` and the listener only attaches in `pinned`. Re-binding happens only on `closed ⇄ pinned` transitions (~1-2/session). Verified by §10 step 12 listener-count test. |
| **SSR/hydration mismatch from `useIsDesktop`.** | `useIsDesktop()` returns `false` on SSR and initial client render; `BrandMegaMenu` renders `null` on both. The matchMedia check runs after hydration. **No mismatch.** Verified by §9 "no hydration warnings" criterion. |
| **FOUC risk: desktop user sees no menu for one frame after hydration.** | Acceptable: the desktop user sees the rest of the header immediately; the Brands button appears within one effect tick. Alternative (CSS `display: none`) was rejected for the mobile-listener-pollution cost. |
| **Mobile drawer regression during Header rewrite.** | Phase 8 is dedicated; preserve `inert`, `aria-hidden`, `body.style.overflow` from current implementation. |
| **CartProvider hydration bug introduced by accident.** | `CartProvider` is explicitly in §1 keep list — do not touch. |
| **Token rewrite breaks intermediate-phase components.** | Phase 1 split into **1a (additive)** + **1b (subtractive after Phase 10)**. Old tokens remain until every component migrates. |
| **Sibling cards in same row look unbalanced during hover** (empty space below un-hovered cards while row grew). | Verify against Figma Product Card Hover State at Phase 5. If Figma shows different alignment, switch to per-card grid-row isolation. |

---

## 12. ADR

### Decision
Rewrite the UI layer of sable against Figma desktop frames using Option A (targeted rewrite + extracted `BrandMegaMenu` FSM), preserving `data/`, `lib/`, `types/`, `CartProvider`, and route shells. **Escalation path: if Figma URL is unavailable within 24h of plan approval, switch to Option B — ship Phase 3 (the FSM) as PR1, defer rebuild to PR2.**

### Drivers
1. Current implementation diverges from Figma (CSS gap).
2. Brands modal has a duplicate-DOM bug requiring a state model change, not just CSS.
3. Time-bounded rebuild; non-UI infrastructure already works.
4. Failure isolation matters more than bundle convenience — Path D exists for a reason.

### Alternatives Considered
- **Option B (bug fix first, rebuild later):** Promoted from "rejected" to "escalation default" — viable parallel track when Figma is delayed.
- **Option C (strip entire UI + tokens):** Rejected; throws away working a11y plumbing.

### Why Chosen
A localizes risk; B is a clean fallback when A's Figma input is missing. Existing accessibility scaffolding (`inert`, `aria-expanded`, Escape handling, focus return) is preserved across both. The FSM revision (focus events + `usePathname`) addresses correctness bugs found in Architect/Critic review.

### Consequences
- **Brands desktop trigger becomes a `<button>`.** Click no longer navigates. Middle-click, ctrl-click, and right-click "open in new tab" on the trigger stop working. "All brands" panel link is the navigation path.
- **Brands trigger loses Next.js prefetch.** Panel "All brands" link still prefetches on hover.
- Mobile card behavior may drop two-tap pattern (default 5a) — confirm at Phase 5 if Figma frame disagrees.
- All component-level CSS modules touched; visual regressions possible on routes not manually QA'd.
- Token rewrite split (1a/1b) adds one extra commit but eliminates intermediate-state breakage.
- `Header.tsx:51-55` (`handleHeaderBlur`) is removed; FSM owns focus closure.

### Follow-ups
- Side-by-side Figma vs shipped UI parity review after implementation.
- Consider native `<details>` no-JS fallback for Brands (deferred).
- Revisit §7 tablet inline-nav decision if Tablet frame is later supplied.
- Consider re-adding native link semantics to Brands trigger if right-click-to-open user feedback emerges (e.g., dual-element: visually-hidden `<a>` alongside button).

---

## Verdicts

- **Planner (v2):** APPROVE (this document).
- **Architect (v1):** APPROVE_WITH_CHANGES → addressed in v2 (FSM focus events, SSR contract, `useIsDesktop`, Path D escalation, phase split, link mitigation).
- **Critic (v1):** ITERATE → addressed in v2 (focus-within, route-change transition, `grid-template-rows` push-down, rAF focus, listener cleanup, expanded acceptance criteria, hydration assertion).
- **Architect (v2):** pending.
- **Critic (v2):** pending.
- **Status:** `pending approval` until v2 review loop completes and user confirms execution path.
