<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-05-23 | Updated: 2026-05-23 -->

# login

## Purpose
The `/login` route — a mock login form. No authentication backend; the submit is a `type="button"` that does nothing.

## Key Files
| File | Description |
|------|-------------|
| `page.tsx` | Email + password inputs inside a `<form>`, with a "Login mock" button |
| `login.module.css` | Form layout styles |

## For AI Agents

### Working In This Directory
- The submit control is intentionally a `<button type="button">` so accidental Enter-key submissions don't bubble into a real form action. Preserve that until auth is actually wired.
- Uses `.utility-page` shell from `styles/globals.css`.

## Dependencies

### Internal
- `styles/globals.css`

<!-- MANUAL: -->
