"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useReducer, useRef } from "react";
import type { CategoryMenuItem } from "@/lib/filters";
import styles from "@/components/layout/CollectionMegaMenu.module.css";

// Hover/pin behaviour mirrors BrandMegaMenu so the Women/Men category menu
// feels identical to the Brands modal:
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
      return state.pinned ? state : { ...state, visible: false };
    case "TOGGLE_PIN":
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

type CollectionMegaMenuProps = {
  label: string;
  baseHref: string;
  categories: readonly CategoryMenuItem[];
  /** True when the current route is this collection's listing page. */
  isActiveCollection?: boolean;
  /** Active `?category=` value, only meaningful when isActiveCollection is true. */
  activeCategory?: string;
  triggerClassName?: string;
};

const HOVER_CLOSE_DELAY = 120;

export default function CollectionMegaMenu({
  label,
  baseHref,
  categories,
  isActiveCollection = false,
  activeCategory,
  triggerClassName
}: CollectionMegaMenuProps) {
  const [state, dispatch] = useReducer(reducer, CLOSED);
  const isOpen = state.visible || state.pinned;
  const panelId = useId();
  const activeKey = !isActiveCollection
    ? null
    : activeCategory && categories.some((item) => item.key === activeCategory)
      ? activeCategory
      : "all";

  const triggerRef = useRef<HTMLAnchorElement>(null);
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

  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  useEffect(() => {
    if (state.pinned && !prevPinned.current) {
      panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    }
    prevPinned.current = state.pinned;
  }, [state.pinned]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
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
      <Link
        ref={triggerRef}
        href={baseHref}
        className={triggerClassName}
        data-label={label}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onMouseEnter={handlePointerEnter}
        onMouseLeave={scheduleHoverClose}
        onFocus={handlePointerEnter}
        onClick={handleNavigate}
        onBlur={handleBlur}
      >
        {label}
      </Link>

      <nav
        id={panelId}
        ref={panelRef}
        aria-label={label}
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
        aria-hidden={!isOpen}
        inert={!isOpen}
        onMouseEnter={handlePointerEnter}
        onMouseLeave={scheduleHoverClose}
        onBlur={handleBlur}
      >
        <div className={styles.inner}>
          {categories.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`${styles.categoryLink} ${item.key === activeKey ? styles.categoryLinkActive : ""}`}
              aria-current={item.key === activeKey ? "page" : undefined}
              onClick={handleNavigate}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
