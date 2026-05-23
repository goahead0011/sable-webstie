# Execution-Ready Spec: sable MVP

## Metadata

- Source: deep-interview
- Context type: greenfield
- Profile: standard
- Final ambiguity: 0.16
- Threshold: 0.20
- Context snapshot: `.omx/context/sable-mvp-20260521T141930Z.md`
- Transcript: `.omx/interviews/sable-mvp-20260521T141930Z.md`

## Intent

Create a refined but lean MVP for `sable`, a minimalist fashion/select-shop site, so the core browsing, discovery, search, product-detail, and cart mock flows can be validated before real imagery, CMS, authentication, and payment are introduced.

## Desired Outcome

A Next.js App Router site whose desktop experience follows the supplied Figma references closely, while tablet and mobile layouts preserve the same quiet editorial tone with practical responsive adaptations.

## In Scope

- Next.js App Router + TypeScript setup.
- CSS Modules and global CSS styling; no UI library.
- Shared layout and header.
- Desktop Brands mega menu on hover/focus.
- Mobile drawer navigation with Brands accordion.
- Home page with large gray video placeholder.
- Product/listing data stored locally.
- Product-grid pages for Brands, New in, Women, Men, Life, and Sale where relevant.
- Lookbook grid for Styling and mock lookbook detail pages.
- Product detail pages.
- Search overlay and `/search?q=` result page.
- Mock Login, Cart, and Checkout pages.
- localStorage cart with add/remove/quantity changes.
- Desktop, tablet, and mobile responsive behavior.

## Out of Scope

- Real authentication.
- Real payment.
- Backend API, Supabase, CMS, or database.
- Real product images.
- UI component libraries.
- Pixel-perfect tablet/mobile design, because Figma only provides desktop references.

## Constraints

- Implement `Men`; do not preserve Figma's `Man` label.
- Use gray placeholders for product imagery.
- Keep the Figma tone: minimal, white/near-white, sparse, 14px Pretendard-like typography.
- Product hover metadata must expand in document flow so lower cards are pushed down naturally.
- Search must support product name, brand name, and category.

## Decision Boundaries

Allowed without additional confirmation:

- Exact seed data values and slugs.
- Responsive breakpoints and grid counts.
- Mobile product-card behavior fallback from tap-to-expand to always-visible metadata if QA shows the interaction is too complex.
- CSS variable naming and module organization.
- Mock copy for login/cart/checkout/information.

Requires confirmation:

- Adding non-standard dependencies or UI libraries.
- Introducing backend/CMS/auth/payment.
- Changing desktop visual direction away from Figma.
- Replacing placeholder images with production image strategy.

## Testable Acceptance Criteria

- All listed routes render without 404.
- Header logo routes to `/`.
- Navigation hover/focus bolding works.
- Brands desktop mega menu appears on hover/focus and contains brand links.
- Mobile drawer exposes all menu items and expandable Brands links.
- Product-list cards reveal metadata on hover/focus and push following rows down.
- Mobile product cards reveal metadata on first tap or show metadata by default if fallback is selected.
- Product detail supports size selection and local add-to-cart.
- Cart state persists across reloads and supports add/remove/quantity changes.
- Search overlay submits to `/search?q=` and results match product name, brand, or category.
- Checkout communicates mock/no-payment behavior.
- Layout is usable at desktop, tablet, and mobile widths.

## Technical Context

The workspace is currently empty, so the implementation can use a clean App Router structure without migration concerns.
