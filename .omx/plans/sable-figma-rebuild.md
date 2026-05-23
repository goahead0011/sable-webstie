# Plan — sable: Figma-First UI Rebuild + Brands Mega-Menu Fix

**Status:** `pending approval` (planning only — no code changed)
**Mode:** ralplan consensus (Planner → Architect → Critic; corrections folded in as binding decisions)
**Repo:** `/Users/fredogden/Desktop/sable-website` — Next.js 16.2.6 / React 19 / TS strict / CSS Modules
**Date:** 2026-05-23

---

## ⚠️ Two hard realities baked into this plan

1. **Figma MCP is disconnected this session.** The design-reading tools are unavailable, so exact tokens/measurements cannot be pulled now. The plan proceeds on the **written design spec + the existing `styles/globals.css` tokens** as the authoritative baseline, and defers a *values-only* Figma sync to a later `/visual-verdict` pass when MCP reconnects. Execution is **not** blocked on Figma.
2. **This is NOT a git repository** (`git rev-parse` fails; environment confirms `Is a git repository: false`). There is no commit to revert to. **Rollback = manual file backup** taken before any rewrite (see Step -1). Do not assume `git revert` anywhere.

---

## Step -1 (BLOCKING PREREQUISITE) — Verify the "duplicate modal" symptom & take a backup

The committed `Header.tsx:110-122` renders **exactly one** mega-menu DOM node. The reported "clicking Brands creates a second modal" symptom is **not present in committed code** — it may be uncommitted WIP, or a misread of the `/brands` page rendering beneath the still-open hover panel.

**Git-free verification (must run before architecting a "de-duplication" fix):**
1. `npm run dev`, open desktop header, hover **Brands**.
2. In DevTools console: `document.querySelectorAll('[class*="brandMega"], #brand-mega').length`
   - **=== 1** → the duplicate-DOM bug is a **phantom**. Remove "no duplicate modal DOM" from active scope; the single-instance guarantee becomes a *design invariant we preserve*, not a bug we fix. The real work is the hover→pin state model.
   - **> 1** → capture the second node's source `file:line` before proceeding; that is the actual defect.
3. Click **Brands** and observe whether the apparent "second modal" is just navigation to the `/brands` route (BrandDirectory grid) showing behind the open hover panel. If so, the fix is the state model + relocating navigation, not de-duplication.

**Backup:** copy the files slated for rewrite to a `*.bak` set (or a `_backup/` folder) so there is a restore path in this non-git repo.

---

## 1. Parts of current code to KEEP (unchanged)

| Area | Files | Why |
|---|---|---|
| Data layer | `data/products.ts`, `data/brands.ts`, `data/articles.ts`, `data/styling.ts` + helpers | Functional structure, not design |
| Domain types | `types/domain.ts` | Contracts |
| Pure helpers | `lib/cart.ts` (`CART_STORAGE_KEY="sable-cart-v1"`, `normalizeCartItems`, `getCartLineId`), `lib/filters.ts`, `lib/format.ts` (`formatPrice` → `"₩ 1,234,000"`), `lib/search.ts` | No design surface |
| Cart context | `components/cart/CartProvider.tsx` + `useCart()` + localStorage | Working behavior — preserve verbatim |
| Routes | All App Router segments, `/search?q=` contract, `/brands/[slug]`, collection routes | Route structure kept |
| Server data flow | `ProductGrid.tsx` (server) → `ProductCard`, `getBrandById` resolution, skip-unresolved, "No products found." empty state; `ProductListingPage.tsx` wrapper | Logic kept; only CSS rewritten |
| Layout composition | `app/layout.tsx`: `<CartProvider>` → `<Header/>` → `<main>`; metadata title "sable" | Kept |
| Nav set + label policy | nav item order; render **"Men"** (already `"Men"` at `Header.tsx:14`; do not regress to "Man") | Kept |
| SearchOverlay contract | `{ open, onClose }` props, submit → `router.push('/search?q=...')` | Public API kept; internals/CSS rewritten |
| Reduced-motion guard | `styles/globals.css:128-137` | Already neutralizes transitions to ~1ms — keep; new components must inherit it, not bypass |

**No files are deleted.** Blast radius = restyle + one new extracted component.

---

## 2. UI components to DELETE / REWRITE

All "rewrite" = markup + CSS rewritten to Figma; **file path & data/prop contracts preserved.**

| File | Action |
|---|---|
| `components/layout/Header.tsx` | REWRITE. Extract mega-menu into new component; Brands trigger `<Link>` → `<button>`; remove inline mega state (moves into new component, see §4) |
| `components/layout/Header.module.css` | REWRITE to Figma desktop nav |
| **NEW** `components/layout/BrandMegaMenu.tsx` + `.module.css` | NEW client component — single shared instance, owns hover/pin state |
| `components/product/ProductCard.tsx` | REWRITE markup/CSS to Figma; **keep `{product, brand}` props (serializable) and routing behavior**. Push-down: see §5 (default = keep existing reveal mechanism) |
| `components/product/ProductCard.module.css` | REWRITE to Figma card (320×400, hover reveal) |
| `components/product/ProductGrid.module.css` | REWRITE grid CSS (3 col, 320×400, 20px gap, `align-items:start`, auto rows). `ProductGrid.tsx` logic unchanged |
| `components/layout/SearchOverlay.tsx` + `.module.css` | REWRITE to compact top bar; **add focus trap + focus return** (fixes latent a11y bug, §6) |
| `app/page.tsx` + `app/page.module.css` | REWRITE home video-placeholder to Figma `Home Default` |
| `styles/globals.css` | EXTEND token set (do not remove tokens still referenced) |
| `components/ui/PlaceholderImage.tsx` | KEEP API (`tone`,`label`,`className`); restyle only if Figma changes placeholder look |

**DELETE outright:** nothing.

---

## 3. Figma-first new component structure

```
app/layout.tsx                          (kept: CartProvider > Header > main)
└─ components/layout/Header.tsx          (rewrite; composes nav, renders ONE <BrandMegaMenu>)
   ├─ components/layout/BrandMegaMenu.tsx   (NEW, "use client"; owns hover/pin reducer + listeners + focus)
   ├─ components/layout/SearchOverlay.tsx   (rewrite; compact top bar + focus trap)
   └─ mobile drawer + Brands accordion      (KEEP inline in Header; restyle only — defer extraction unless Figma mobile frames demand it)
app/page.tsx                             (rewrite; Figma Home Default)
components/product/ProductListingPage.tsx (kept wrapper)
└─ components/product/ProductGrid.tsx     (server, kept logic; rewrite grid CSS)
   └─ components/product/ProductCard.tsx  ("use client", kept props; rewrite markup/CSS)
```

**RSC boundary (verified):** `BrandMegaMenu` must be `"use client"` (state/listeners/focus). `Header` and `ProductCard` already are. `ProductGrid` **stays a server component** — the push-down is CSS-only, so **no new client components are introduced** beyond `BrandMegaMenu`. Keep `ProductGrid → ProductCard` props serializable (`product`, `brand` only — no handlers passed from server).

**Token-first CSS:** all design values live as custom properties in `styles/globals.css`; component modules consume them. This makes the deferred Figma sync a values-only edit, never a structural rewrite.

---

## 4. Brands modal state-management design (BINDING)

**Owner:** the new `BrandMegaMenu.tsx` owns its own state (NOT the already-181-line Header). Header passes only `brands` (and optionally an `onNavigate`). This keeps Header's job "compose nav" and makes the menu independently testable.

**State model (CHOSEN — `useReducer` with two orthogonal facts):**
```
state = { visible: boolean, pinned: boolean }   // isOpen = visible || pinned
```
The linear enum `closed|hover|pinned` is **rejected**: it cannot represent the concurrent "pinned AND pointer-inside" condition, which is exactly what's needed to decide whether a `mouseleave` is ignored — that lossiness is what produces close-races. Two booleans driven by a reducer with **named events** is the binding choice.

**Events → transitions:**

| Event | Source | Effect |
|---|---|---|
| `POINTER_ENTER` | trigger or panel `onMouseEnter` | clear close-timer; `visible=true` |
| `POINTER_LEAVE` | trigger or panel `onMouseLeave` | start **120ms** close-timer; on fire, if `!pinned` → `visible=false` |
| `CLICK_TRIGGER` | Brands button `onClick` | if `pinned` → close (`visible=false, pinned=false`); else `pinned=true, visible=true` + move focus to first brand link |
| `FOCUS_OUT` | panel/trigger `onBlur` (relatedTarget outside) | **synchronous (0ms)** close — no timeout |
| `OUTSIDE` | `document` pointerdown (only bound while `pinned`) | if target outside panel **and** trigger → close |
| `ESCAPE` | keydown Escape | close + **return focus to trigger** |
| `NAVIGATE` | brand/All-brands link click | clear timer + close (route change unmounts listeners) |

**Trigger change:** Brands becomes `<button type="button">` (a `<Link>` cannot "pin instead of navigate" without preventDefault hacks). Navigation to the full directory relocates to an **"All brands" link inside the mega menu** (header/footer of the panel, → `/brands`).

**One DOM instance:** `Header` renders exactly one `<BrandMegaMenu>`; hover and pinned are two states of the *same* node — a second modal is impossible by construction. (Preserves the invariant Step -1 confirmed.)

**Outside-click vs in-panel-click race (the genuinely hard part — BINDING algorithm):**
- `document` `pointerdown` (or `mousedown`) listener is bound **only while `pinned`**, torn down when `pinned` flips false **and** on unmount.
- Handler **must early-return** if `panelRef.current?.contains(e.target) || triggerRef.current?.contains(e.target)`.
- Brand links and "All brands" must navigate normally (**no `preventDefault`**); the `NAVIGATE` event closes the menu after the click.
- Acceptance (testable): clicking "All brands" → URL becomes `/brands`; clicking a brand → URL becomes `/brands/[slug]`; clicking empty space outside → menu closes, URL unchanged.

**Timer cleanup safety (BINDING):** store timer id in a `ref`; `clearTimeout` on every `POINTER_ENTER`, on `CLICK_TRIGGER`-pin, on `NAVIGATE`, and in the effect cleanup; never `setState`/dispatch after unmount.

**Focus / a11y (BINDING decisions — no open questions):**
- **Do NOT use `role="menu"`** (it obligates roving tabindex + arrow-key nav and makes AT suppress Tab). Use a plain **`<nav aria-label="Brands">`** containing a list of `<Link>`s.
- Trigger: `aria-haspopup="true"`, `aria-expanded={isOpen}`, `aria-controls="brand-mega"`. Panel: `id="brand-mega"`.
- On `CLICK_TRIGGER`-pin → move focus to first brand link. On `ESCAPE` → close and **return focus to trigger** (guard the `onFocus`→open path so the programmatic return does not immediately reopen).
- **Preserve a synchronous focus-out close:** the current `handleHeaderBlur` (`Header.tsx:51-55`) is today the *only* keyboard focus-out close. It may be removed **only** when replaced by the `FOCUS_OUT` event above (immediate, not the 120ms timer). Removing it without replacement is an a11y regression (stuck-open menu for keyboard users).

**Mobile:** no hover/pin machine on touch. Keep the hamburger drawer Brands accordion (`mobileBrandsOpen` tap toggle), drawer keeps `inert` when closed + Escape-to-close; restyle only.

---

## 5. Product hover push-down (BINDING)

**Requirement:** on hover, metadata expands BELOW the image in **normal flow** and pushes the row below down (not an absolute overlay).

**Chosen approach: KEEP the existing `max-height` reveal** (`ProductCard.module.css:29-43`, `0 → 52px` on `:hover`/`:focus-within`, with mobile `expanded`-class override at `:76-98`). It already satisfies the requirement: it expands in normal flow, pushes rows down (grid rows are `auto`), works for keyboard (`:focus-within`), mobile tap, and degrades under reduced-motion via globals.
- `ProductGrid` keeps `align-items:start` + auto rows so an expanding card does not stretch siblings.
- **Switch to `grid-template-rows: 0fr→1fr` ONLY IF** Figma (when reconnected) specifies a variable-height meta block that a fixed 52px cap cannot hold. (That pattern is proven in-repo at `Header.module.css:172-188` / `drawerBrands`; if used, copy its `overflow:hidden` + `min-height:0` inner-wrapper template exactly.) Default = no rewrite of working code.
- Confirm against the `Product Card Hover State` frame whether base meta (name/brand/price) stays visible and only an *extra* row reveals, or all meta is hidden until hover. Default assumption: base visible, extra row reveals.

---

## 6. Search overlay (compact top bar)

- Rewrite `SearchOverlay` to a **top-anchored compact bar** (input + submit + close) over a dimmed backdrop, per the Figma `Search Overlay` frame.
- **Keep contract:** `{open, onClose}`, autofocus (existing 40ms timeout pattern is fine), submit → `router.push('/search?q=' + encodeURIComponent(query.trim()))`, empty query no-op.
- **Fix latent a11y bugs during the rewrite** (current overlay has `role="dialog" aria-modal="true"` but no focus management): add a **focus trap** (Tab cycles within the dialog) and **return focus to the Search trigger** on close. Escape closes (Header already wires it). Backdrop click closes.
- **Body-scroll-lock parity:** `Header.tsx:44-49` already locks `document.body.style.overflow` when `searchOpen`. The rewrite must **not double-manage or drop** this — keep a single owner of the lock.
- Replace the `X` text close with the Figma close affordance; keep `aria-label="Close search"`.

---

## 7. Mobile / tablet handling

- **Desktop-first:** match Figma desktop, then extend tablet/mobile in the same tone.
- **Breakpoints:** keep existing `1179px` / `767px` unless Figma mobile frames dictate otherwise.
- **Brands on touch:** no hover/pin; hamburger drawer accordion (tap toggle), reusing existing drawer markup + `inert`/Escape; restyle only.
- **Product card on mobile:** keep two-tap behavior (first tap expands meta via `expanded` class, second navigates) — the reveal CSS applies on `.expanded` for touch instead of `:hover`.
- **Search:** compact top bar must stay usable at mobile widths; existing mobile "Search"/"Menu" text buttons stay.
- **Tablet (768–1179px):** inherit desktop; reduce grid to 2 columns only if Figma tablet frames imply it (else keep 3 with reduced gutters).

---

## 8. Implementation order

1. **Step -1 (blocking):** verify duplicate-DOM symptom (git-free DevTools check) + take manual file backup. Adjust scope per result.
2. **Step 0 (operationalized):** proceed on current `globals.css` tokens (`--motion-fast:160ms`, `--motion-medium:220ms`, colors, 69px header) as visual baseline. Record assumptions; defer values-only Figma sync to a `/visual-verdict` pass when MCP reconnects. **No hard dependency on Figma.**
3. **Tokens & globals:** establish/extend CSS custom properties (type ramp, spacing, modal/search dimensions). No component changes yet.
4. **Brands modal fix (highest value/risk):** new `BrandMegaMenu.tsx` (`useReducer {visible,pinned}`, events, outside-click with in-panel guard, timer ref cleanup, focus move/return, `<nav aria-label>` + `aria-expanded`/`aria-controls`, "All brands" link). Functional correctness before styling.
5. **Header rewrite + styling:** desktop nav to Figma, wire the single `<BrandMegaMenu>`, restyle mobile drawer/accordion.
6. **Product grid + card:** restyle grid (3col/320×400/20px gap, `align-items:start`); keep `max-height` reveal (or grid-rows only if Figma requires).
7. **Search overlay rewrite:** compact top bar + focus trap + focus return + single scroll-lock owner.
8. **Home page:** video-placeholder to Figma `Home Default`.
9. **Tablet/mobile polish.**
10. **Verification pass (§10).**

---

## 9. Acceptance-criteria checklist (observable assertions)

**Brands modal**
- [ ] Hover Brands (desktop) → panel visible (`isOpen` true).
- [ ] `document.querySelectorAll('[class*="brandMega"], #brand-mega').length === 1` while open (single instance).
- [ ] Click Brands while hovering → `pinned=true`, still exactly **1** node; no second modal.
- [ ] Pinned + pointer leaves trigger & panel → panel **stays** (no close).
- [ ] Pinned + click Brands again → closes.
- [ ] Pinned + click empty space outside → closes, **URL unchanged**.
- [ ] Pinned + click "All brands" → navigates, **URL = `/brands`**; click a brand → **URL = `/brands/[slug]`**.
- [ ] Any open state + Escape → closes AND `document.activeElement === ` Brands trigger with a visible focus ring.
- [ ] Trigger has `aria-haspopup`, `aria-expanded` toggling, `aria-controls="brand-mega"`; panel is `<nav aria-label="Brands">` (NOT `role="menu"`).
- [ ] Keyboard: Tab from trigger reaches brand links; tabbing out the far side fires synchronous `FOCUS_OUT` close (no perceptible delay).
- [ ] Mobile (≤767px): hover/pin inert; Brands accordion in drawer taps open/closed.

**UI rebuild**
- [ ] Background `#fbfbfb`, text `#191919`, Pretendard stack, header ~69px (computed styles match tokens).
- [ ] Home renders Figma `Home Default` video placeholder.
- [ ] Grid = 3 columns, card 320×400, gap 20px (measured in DevTools at desktop width).
- [ ] Hovering a card → meta expands below image in normal flow; the card directly below visibly shifts down (not an overlay).
- [ ] Search overlay = compact top bar; submit → `/search?q=...`; **Tab cycles within dialog (focus trap)**; close returns focus to Search trigger.
- [ ] Nav renders **"Men"** (not "Man").

**Preserved function**
- [ ] Add-to-cart → reload → cart count persists (`localStorage["sable-cart-v1"]`).
- [ ] All collection routes + `/search` still work.
- [ ] New components inherit the reduced-motion guard (no transition bypasses `globals.css:128-137`).

---

## 10. Post-implementation verification

- **Typecheck:** `npm run typecheck` (`tsc --noEmit`) — zero errors (strict).
- **Lint:** `npm run lint` (`eslint . --max-warnings=0`) — zero warnings (warnings break build).
- **Build smoke:** `npm run build` (`next build`) — succeeds (catches RSC/`"use client"` boundary issues from the Header refactor).
- **Dev manual checks (`npm run dev`) — exact click sequence:**
  1. Desktop ≥1180px: hover Brands → opens. Click → pins (verify `length === 1` in console). Move mouse away → stays. Click → closes. Reopen, click outside → closes. Reopen, Escape → closes + focus ring on trigger. Tab through brand links. Click "All brands" → `/brands`.
  2. Hover a product card → meta expands below image; card below moves down. Tab to card → `:focus-within` expands.
  3. Open Search → compact bar, autofocus, type + submit → `/search?q=...`. Tab stays trapped in dialog. Escape/backdrop close → focus back on Search trigger.
  4. Add to cart → reload → count persists.
  5. ≤767px: Brands hover inert; hamburger → Brands accordion taps; product two-tap (expand then navigate).
- **Visual QA:** screenshot Home / Product Grid / Brands-hover / Brands-pinned / Search; compare to written-spec tokens now, and to Figma frames via `/visual-verdict` once MCP reconnects.
- **A11y spot-check:** keyboard-only pass of modal + search; verify `aria-expanded`/`aria-controls`, focus trap, focus return.

---

## ADR (Architecture Decision Record)

- **Decision:** Rebuild the visual layer to the Figma spec while preserving all functional structure; fix the Brands menu via a single client `BrandMegaMenu` component owning a `useReducer({visible, pinned})` state machine; keep the existing `max-height` product-card reveal.
- **Drivers:** (1) correctness of the explicit Brands acceptance criteria; (2) Figma MCP disconnected → must not block; (3) don't regress cart/search/routes; (4) non-git repo → backup-based rollback.
- **Alternatives considered:**
  - *State:* linear enum `closed|hover|pinned` — **rejected** (loses concurrent pointer-inside bit → close-races); two-boolean reducer **chosen**.
  - *Push-down:* CSS `grid-template-rows 0fr→1fr` rewrite — **deferred** (existing `max-height` reveal already works; switch only if Figma needs variable height).
  - *a11y role:* `role="menu"` — **rejected** (obligates roving tabindex/arrow keys); plain `<nav>` + links **chosen**.
  - *State owner:* Header — **rejected** (already 181 lines, 4 states); state moved into `BrandMegaMenu`.
- **Why chosen:** maximizes correctness of the modal criteria by construction, minimizes blast radius (one new component, no deletions), avoids rewriting working code, and stays executable despite the disconnected Figma MCP.
- **Consequences:** Header shrinks; one new `"use client"` component; design values are tokenized for cheap later Figma sync; rollback is manual backup, not git.
- **Follow-ups:** (a) re-extract exact Figma tokens via MCP when reconnected; (b) confirm card hover reveals base+extra vs all-meta; (c) confirm tablet 2-col vs 3-col.

---

## RALPLAN-DR summary

**Principles:** Figma is the design source of truth (existing design is not); preserve working function; one modal / one state owner; token-first CSS; minimal blast radius.
**Drivers:** modal correctness; Figma MCP disconnected; no regression to cart/search/routes; non-git rollback.
**Consensus:** Planner draft → Architect (caught: phantom duplicate-DOM, enum lossiness, focus-out regression, working max-height, in-panel-click race, SearchOverlay missing focus trap) → Critic ITERATE with 8 required changes (all folded in above, incl. non-git rollback). All Architect/Critic claims were independently code-verified.

**This is a planning document only. No source files were created or modified.** (This artifact lives at `.omx/plans/sable-figma-rebuild.md`.)
