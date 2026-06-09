"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "@/components/account/CouponSelect.module.css";

export type CouponSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
  hint?: string;
};

type CouponSelectProps = {
  label?: string;
  options: CouponSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function CouponSelect({ label, options, value, onChange, placeholder = "No coupon" }: CouponSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selected = options.find((option) => option.value === value);
  const triggerLabel = selected?.label ?? placeholder;

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function handleSelect(option: CouponSelectOption) {
    if (option.disabled) {
      return;
    }

    onChange(option.value);
    setOpen(false);
  }

  return (
    <div className={styles.field}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <div className={styles.wrap} ref={wrapRef}>
        <button
          type="button"
          className={styles.trigger}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((current) => !current)}
        >
          <span className={selected ? undefined : styles.placeholder}>{triggerLabel}</span>
          <svg
            className={`${styles.caret} ${open ? styles.caretOpen : ""}`}
            width="11"
            height="11"
            viewBox="0 0 11 11"
            aria-hidden="true"
          >
            <path d="M1.5 3.75 5.5 7.75 9.5 3.75" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
        {open ? (
          <ul className={styles.menu} role="listbox" id={listId} aria-label={label}>
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <li key={option.value} role="option" aria-selected={isSelected} aria-disabled={option.disabled}>
                  <button
                    type="button"
                    className={`${styles.option} ${isSelected ? styles.optionSelected : ""}`}
                    onClick={() => handleSelect(option)}
                    disabled={option.disabled}
                  >
                    <span>{option.label}</span>
                    {option.hint ? <small>{option.hint}</small> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
