"use client";

import Link from "next/link";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { getBrandById } from "@/data/brands";
import styles from "@/components/layout/BrandMegaMenu.module.css";

// Curated display set + column layout taken from the Brands mega-menu Figma
// frame (node 22:20). The mega menu mirrors the frame exactly — it is not the
// full directory (that lives at /brands). Each entry is a brand id resolved to
// its real slug so links stay intact; column order is the frame's reading order.
//
// Brands are bucketed by leading initial: items in a group sit tight together,
// and the blank line the frame shows whenever the initial changes is rendered
// as margin between groups (see .brandGroup in the stylesheet) — not <br />.
type BrandGroup = { initial: string; brandIds: readonly string[] };

const MENU_COLUMNS: readonly (readonly BrandGroup[])[] = [
  [
    { initial: "A", brandIds: ["abelia-edoward-goucha", "av-vattev"] },
    { initial: "C", brandIds: ["commission"] },
    { initial: "E", brandIds: ["edward-cuming"] },
    { initial: "G", brandIds: ["gabriela-coll-garments", "gimaguas"] }
  ],
  [
    { initial: "H", brandIds: ["helmut-lang", "hodakova"] },
    { initial: "J", brandIds: ["johanna-parv"] },
    { initial: "K", brandIds: ["kiko-kostadinov"] },
    { initial: "L", brandIds: ["lea-boberg"] }
  ],
  [
    { initial: "M", brandIds: ["mainline", "meta-campania-collective"] },
    { initial: "N", brandIds: ["natasha-zinko"] },
    { initial: "P", brandIds: ["paloma-wool"] }
  ],
  [
    { initial: "S", brandIds: ["super-yaya"] },
    { initial: "U", brandIds: ["umber-postpast"] }
  ]
];

// Two orthogonal facts so "pinned AND pointer-inside" is representable:
// - visible: opened by hover (pointer)
// - pinned:  opened by an explicit click (sticky; ignores mouseleave)
// isOpen = visible || pinned
type State = { visible: boolean; pinned: boolean };

type Action =
  | { type: "POINTER_ENTER" }
  | { type: "HOVER_CLOSE" }
  | { type: "TOGGLE_PIN" }
  | { type: "FOCUS_OUT" }
  | { type: "OUTSIDE" }
  | { type: "ESCAPE" }
  | { type: "NAVIGATE" };

const CLOSED: State = { visible: false, pinned: false };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "POINTER_ENTER":
      return { ...state, visible: true };
    case "HOVER_CLOSE":
      // Pointer left the trigger/panel. Pinned menus stay open.
      return state.pinned ? state : { ...state, visible: false };
    case "TOGGLE_PIN":
      // Click toggles the sticky state; unpinning fully closes.
      return state.pinned ? CLOSED : { visible: true, pinned: true };
    case "FOCUS_OUT":
    case "OUTSIDE":
    case "ESCAPE":
    case "NAVIGATE":
      return CLOSED;
    default:
      return state;
  }
}

type BrandMegaMenuProps = {
  triggerClassName?: string;
};

const PANEL_ID = "brand-mega";
const HOVER_CLOSE_DELAY = 120;

export default function BrandMegaMenu({ triggerClassName }: BrandMegaMenuProps) {
  const [state, dispatch] = useReducer(reducer, CLOSED);
  const isOpen = state.visible || state.pinned;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | null>(null);
  const prevPinned = useRef(false);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleHoverClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => {
      closeTimer.current = null;
      dispatch({ type: "HOVER_CLOSE" });
    }, HOVER_CLOSE_DELAY);
  }, [clearCloseTimer]);

  // Clear any pending timer on unmount so we never dispatch after teardown.
  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  // Move focus into the panel when it becomes pinned (keyboard access).
  useEffect(() => {
    if (state.pinned && !prevPinned.current) {
      panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    }
    prevPinned.current = state.pinned;
  }, [state.pinned]);

  // Outside-click + Escape are only relevant while the menu is open.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      // In-panel and trigger clicks are handled locally — let links navigate.
      if (triggerRef.current?.contains(target) || panelRef.current?.contains(target)) {
        return;
      }
      dispatch({ type: "OUTSIDE" });
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        dispatch({ type: "ESCAPE" });
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handlePointerEnter = useCallback(() => {
    clearCloseTimer();
    dispatch({ type: "POINTER_ENTER" });
  }, [clearCloseTimer]);

  const handleTriggerClick = useCallback(() => {
    clearCloseTimer();
    dispatch({ type: "TOGGLE_PIN" });
  }, [clearCloseTimer]);

  const handleNavigate = useCallback(() => {
    clearCloseTimer();
    dispatch({ type: "NAVIGATE" });
  }, [clearCloseTimer]);

  const handleBlur = useCallback((event: React.FocusEvent) => {
    const next = event.relatedTarget as Node | null;
    if (triggerRef.current?.contains(next) || panelRef.current?.contains(next)) {
      return;
    }
    dispatch({ type: "FOCUS_OUT" });
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={triggerClassName}
        data-label="brands"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
        onMouseEnter={handlePointerEnter}
        onMouseLeave={scheduleHoverClose}
        onClick={handleTriggerClick}
        onBlur={handleBlur}
      >
        brands
      </button>

      <nav
        id={PANEL_ID}
        ref={panelRef}
        aria-label="Brands"
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
        aria-hidden={!isOpen}
        inert={!isOpen}
        onMouseEnter={handlePointerEnter}
        onMouseLeave={scheduleHoverClose}
        onBlur={handleBlur}
      >
        <div className={styles.inner}>
          {MENU_COLUMNS.map((column) => (
            <div key={column[0].initial} className={styles.brandColumn}>
              {column.map((group) => (
                <div key={group.initial} className={styles.brandGroup}>
                  {group.brandIds.map((id) => {
                    const brand = getBrandById(id);
                    if (!brand) {
                      return null;
                    }
                    return (
                      <Link
                        key={brand.id}
                        href={`/brands/${brand.slug}`}
                        className={styles.brandLink}
                        onClick={handleNavigate}
                      >
                        {brand.name}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}
