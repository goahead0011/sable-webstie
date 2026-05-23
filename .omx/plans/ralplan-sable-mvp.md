# Ralplan: sable MVP

## Verdict

- Planner: APPROVE
- Architect: APPROVE
- Critic: APPROVE
- Recommended follow-up: `$ultragoal` for durable implementation tracking, with `$team` optional if parallel delivery is desired.
- Current boundary: planning only. No application code has been implemented.

## ADR

### Decision

Build `sable` as a static local-data MVP using Next.js App Router, TypeScript, CSS Modules, and global CSS. Do not use a UI library. Implement the Figma desktop tone first, then infer tablet/mobile layouts with the same minimalist visual language.

### Drivers

1. Deliver the browsing, search, product-detail, and cart mock flows quickly.
2. Preserve a clean route/component/data boundary for later CMS/Supabase/auth/payment extension.
3. Match the Figma tone through disciplined CSS rather than introducing a design system library.

### Alternatives Considered

- Static local-data MVP with reusable route templates: chosen for speed, clarity, and low risk.
- Mock API routes now: rejected as unnecessary backend-shaped complexity for the MVP.
- Richer commerce shell with deeper auth/payment mocks: rejected because real auth/payment are explicit non-goals.

### Consequences

- Local data and localStorage keep the MVP lean but are not production commerce architecture.
- Strong TypeScript data boundaries are required so future CMS/API migration is not painful.
- CSS structure must be disciplined because there is no UI library safety net.

## Scope

### In Scope

- Home, Brands, New in, Women, Men, Life, Sale, Styling, Magazine, Information, Search, Login, Cart, Checkout.
- `/products/[slug]` for product details.
- `/brands/[slug]` for brand details.
- `/styling/[slug]` for lookbook details.
- localStorage cart with add, remove, and quantity changes.
- Search overlay and `/search?q=` results.
- Desktop, tablet, and mobile responsiveness.

### Out of Scope

- Real authentication.
- Real payment.
- Backend, CMS, Supabase, database, or API layer.
- Real product images.
- UI libraries.

## Routing

```txt
/
/brands
/brands/[slug]
/new-in
/women
/men
/life
/sale
/styling
/styling/[slug]
/magazine
/magazine/[slug]
/information
/search?q=
/login
/cart
/checkout
/products/[slug]
```

## Architecture

```txt
app/          route pages, route layouts, route-specific loading/not-found if needed
components/   reusable UI components
data/         local typed seed data
lib/          pure search, filter, cart, formatting helpers
styles/       global CSS, tokens, reset, shared layout primitives
types/        exported domain types or shared unions if not colocated
```

Client-only boundary:

- `localStorage` cart logic, search overlay open state, mobile drawer, accordion state, and tap-to-expand product cards must be client components.
- Server components must not directly access `window` or `localStorage`.

## Components

- Layout: `Header`, `DesktopNav`, `MobileDrawer`, `BrandsMegaMenu`, `SearchOverlay`.
- Product: `ProductGrid`, `ProductCard`, `ProductDetail`, `SizeSelector`, `AddToCartButton`.
- Brand: `BrandIndex`, `BrandList`, `BrandDetail`.
- Styling: `LookbookGrid`, `LookbookCard`, `LookbookDetail`.
- Magazine: `ArticleGrid`, `ArticleCard`, `ArticleDetail`.
- Cart: `CartProvider` or cart hook, `CartLineItem`, `QuantityStepper`, `CartSummary`.
- UI: `Button`, `IconButton`, `PlaceholderImage`.

## Data Model

```ts
type Audience = 'women' | 'men' | 'life' | 'unisex';
type ProductCategory = 'outerwear' | 'tops' | 'bottoms' | 'shoes' | 'bags' | 'accessories' | 'home';

type Product = {
  id: string;
  slug: string;
  name: string;
  brandId: string;
  categories: ProductCategory[];
  audience: Audience;
  price: number;
  compareAtPrice?: number;
  isNew?: boolean;
  isSale?: boolean;
  description: string;
  sizes: string[];
  placeholderTone?: 'light' | 'medium';
  relatedProductIds?: string[];
};
```

Brand, article, and styling records should be slug-based. Styling must include `relatedProductIds` as a future hook, even if the MVP only displays mock related-product placeholders.

## Responsive Plan

- Mobile: `< 768px`
- Tablet: `768px - 1023px`
- Desktop: `>= 1024px`
- Figma reference: `1280px`

Desktop keeps the 3-column, 320x400 image-card rhythm. Tablet uses 2 columns. Mobile should start with 1 column for clarity; if density feels too low, product-list pages may use 2 compact columns only after visual QA.

## Interaction And Animation

- Header item hover/focus: bold text.
- Brands desktop: hover and keyboard focus open mega menu.
- Brands mobile: drawer accordion with `aria-expanded`.
- Product desktop/tablet pointer layouts: metadata expands in normal document flow, not as an overlay, so lower cards intentionally move down.
- Product mobile: first tap expands metadata; tapping title/detail area navigates. Fallback: show metadata by default on mobile if tap-to-expand feels fussy.
- Search overlay: owns open/close/input state only; submit navigates to `/search?q=term`.
- `/search` page owns query parsing, filtering, result rendering, and empty state.
- Motion should be CSS-only, about 120-220ms, with `prefers-reduced-motion` support.

## Implementation Phases

1. Scaffold Next.js App Router + TypeScript, CSS Modules, global styles, tokens, and base layout.
2. Add typed seed data and pure helpers for filtering, search, formatting, and cart storage.
3. Build header, desktop nav, mobile drawer, Brands mega menu, and Search overlay.
4. Build Home and shared product grid/card/detail flows.
5. Build Brands, product category pages, and brand detail pages.
6. Build Styling lookbook list/detail separately from Magazine article components.
7. Build Login, Cart, and Checkout mock flows with localStorage cart behavior.
8. Polish responsive behavior, accessibility, hover/focus states, and visual spacing.
9. Verify routes, search, cart persistence, and desktop/tablet/mobile layouts.

## Acceptance Criteria

- All planned routes render.
- Nav uses `Men`, never `Man`.
- Logo navigates home.
- Header items bold on hover/focus.
- Desktop Brands mega menu opens on hover/focus and links to brand detail pages.
- Mobile drawer exposes all nav items and Brands accordion.
- Product placeholders are gray.
- Product card metadata expands in flow on hover/focus and does not overlay the image.
- Mobile product metadata is accessible through tap-to-expand or default visibility.
- Product detail includes image placeholder, brand, name, price, description, size selection, and add-to-cart.
- Search submits to `/search?q=` and matches product name, brand name, and category.
- Cart persists through refresh and supports add, remove, and quantity changes.
- Login and Checkout remain mock-only with no real auth/payment.
- Styling is a lookbook grid/detail flow, not a product grid.
- Desktop, tablet, and mobile layouts are usable.

## Verification

- Run typecheck and lint if configured.
- Start the dev server.
- Check `/`, `/brands`, `/brands/[slug]`, `/new-in`, `/women`, `/men`, `/life`, `/sale`, `/products/[slug]`, `/styling`, `/styling/[slug]`, `/magazine`, `/information`, `/search?q=shirt`, `/login`, `/cart`, `/checkout`.
- Test viewports around 1280px, 834px, and 390px.
- Test search overlay open, close, Enter submit, and empty state.
- Test cart add/remove/quantity and persistence after reload.
- Confirm no real auth/payment calls exist.

## Risks

- Hover push-down can look like layout shift if transition timing is sloppy; card structure must make expansion intentional.
- Mobile product tap-to-expand may be less clear than always-visible metadata; keep fallback available.
- Local data is fine for MVP but should stay typed and slug-based for future CMS migration.
- No UI library means accessibility states and controls need explicit care.
