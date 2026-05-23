<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# sable-website

## Purpose
A quiet select-shop MVP built on Next.js 16 (App Router) and React 19. The site browses brands, product collections, styling lookbooks, and editorial articles backed entirely by in-repo static data — no database, no commerce backend, no authentication. The cart is client-side and persisted to `localStorage`; checkout is a mock.

## Key Files
| File | Description |
|------|-------------|
| `package.json` | Next 16.2.6, React 19, scripts: `dev`, `build`, `lint`, `typecheck` |
| `next.config.ts` | Minimal config; allows `127.0.0.1` as dev origin |
| `tsconfig.json` | Strict TS, `bundler` resolution, `@/*` path alias to project root |
| `eslint.config.mjs` | Flat config extending `eslint-config-next` (vitals + typescript); ignores `.next` and `node_modules` |
| `next-env.d.ts` | Next.js TS shims (auto-generated) |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `app/` | Next.js App Router routes and root layout (see `app/AGENTS.md`) |
| `components/` | Reusable UI grouped by feature (see `components/AGENTS.md`) |
| `data/` | Hardcoded TypeScript fixtures for products, brands, articles, styling (see `data/AGENTS.md`) |
| `lib/` | Pure helper functions for cart, filters, search, formatting (see `lib/AGENTS.md`) |
| `styles/` | Global CSS variables, base resets, utility classes (see `styles/AGENTS.md`) |
| `types/` | Shared domain TypeScript types (see `types/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- Use the `@/*` path alias (resolves to project root) for all internal imports — see existing files.
- TypeScript strict mode is enforced; do not introduce `any`.
- ESLint runs with `--max-warnings=0`; warnings break the build script.
- This is an MVP — there is no real backend. Do not invent API routes, auth flows, or DB calls unless the user asks for them. New content goes into `data/`.
- Prices are stored as integer KRW (won) and rendered via `formatPrice` in `lib/format.ts` (`₩ 1,234,000` using `ko-KR` locale).
- The site is content-driven by the four arrays in `data/`. Adding a product requires only an entry there; routes for `/products/[slug]`, `/brands/[slug]`, etc. pick it up via `generateStaticParams`.

### Testing Requirements
- No test framework is set up. Verify changes with `npm run lint` and `npm run typecheck` before reporting done.
- For UI changes, run `npm run dev` and exercise the affected route in a browser.

### Common Patterns
- Server components by default; client components opt in with `"use client"` at the top (used by `Header`, `SearchOverlay`, `CartProvider`, `CartView`, `CheckoutMock`, `ProductCard`, `ProductDetail`).
- Dynamic route params are `Promise`-wrapped (Next 16 convention): `params: Promise<{ slug: string }>`, then `const { slug } = await params`.
- CSS Modules co-located with their component/page (`Foo.tsx` + `Foo.module.css`). Global tokens live in `styles/globals.css`.
- Placeholder visuals via `components/ui/PlaceholderImage` — production imagery is intentionally absent.

## Dependencies

### External
- `next@16.2.6` — App Router framework
- `react@19.0.0` / `react-dom@19.0.0` — UI runtime
- `typescript@^5.8.3`, `eslint@^9.28.0`, `eslint-config-next@16.2.6` — dev tooling

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->
