<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# cart

## Purpose
The `/cart` route — renders the client-side cart view. All state lives in `CartProvider` (mounted at the root layout).

## Key Files
| File | Description |
|------|-------------|
| `page.tsx` | Thin server component that returns `<CartView />` |

## For AI Agents

### Working In This Directory
- This page intentionally does no data fetching — `CartView` is `"use client"` and reads `useCart()` plus resolves lines against `data/products` itself.
- The empty-cart state is rendered by `CartView`, not here.

## Dependencies

### Internal
- `components/cart/CartView`

<!-- MANUAL: -->
