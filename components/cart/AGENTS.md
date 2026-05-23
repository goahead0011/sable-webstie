<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# cart

## Purpose
Client-side cart implementation: a React context provider that persists to `localStorage`, plus the cart and mock-checkout views. There is no server-side cart, no payment integration, no order submission.

## Key Files
| File | Description |
|------|-------------|
| `CartProvider.tsx` | `"use client"` context exporting `useCart()` — `{ items, addItem, removeItem, updateQuantity, clearCart }`. Hydrates from `localStorage` in a microtask after mount, then persists on every change once `ready` |
| `CartView.tsx` | `"use client"` cart page UI — resolves each `CartItem` against `data/products` + `data/brands`, renders quantity steppers and per-line subtotals, links to `/checkout` |
| `CheckoutMock.tsx` | `"use client"` mock checkout — shows the total and a "back to cart" link; no form, no submission |
| `CartView.module.css` | Shared styles for both `CartView` and `CheckoutMock` (the mock reuses `.checkout`, `.mockPanel`, `.textLink`) |

## For AI Agents

### Working In This Directory
- `CartProvider` wraps the entire app in `app/layout.tsx`. Calling `useCart()` outside of it throws — keep the provider mounted at root.
- Hydration runs inside `queueMicrotask` and gates persistence on a `ready` flag. This is deliberate: it avoids overwriting persisted state with the empty initial array during the first effect tick. Don't simplify it away.
- Storage key is `lib/cart.CART_STORAGE_KEY` — bump the version suffix there if the persisted shape ever changes.
- Cart lines are uniquely identified by `${productId}:${size}` (`getCartLineId`). Adding the same product in a different size creates a separate line; adding the same product/size increments quantity.
- `updateQuantity` with `quantity <= 0` delegates to `removeItem` — preserve this if refactoring.
- `CheckoutMock` imports styles from `CartView.module.css` (`.mockPanel`, `.checkout`). Keep those classes if you split the stylesheets later.
- The cart count badge in the header derives from `items.reduce((t, i) => t + i.quantity, 0)` — keep `quantity` as the source of truth.

## Dependencies

### Internal
- `lib/cart` — storage key, normalization, line-id helper
- `lib/format` — `formatPrice`
- `data/products`, `data/brands` — line resolution
- `types/domain` — `CartItem`

### External
- `react`, `next/link`

<!-- MANUAL: -->
