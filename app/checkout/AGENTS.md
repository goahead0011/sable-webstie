<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# checkout

## Purpose
The `/checkout` route — a mock. No payment, no auth, no order submission. Exists to give the cart's "Checkout" link a destination.

## Key Files
| File | Description |
|------|-------------|
| `page.tsx` | Thin server component that returns `<CheckoutMock />` |

## For AI Agents

### Working In This Directory
- If real checkout is ever wired up, replace `<CheckoutMock />` rather than adding logic here — keep the route shell minimal.
- `CheckoutMock` reuses `CartView.module.css`; if you migrate to a real checkout, decouple the stylesheets.

## Dependencies

### Internal
- `components/cart/CheckoutMock`

<!-- MANUAL: -->
