'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export function Checkbox({
  label,
  checked: controlledChecked,
  defaultChecked = false,
  disabled,
  onChange,
  className,
  id,
  ...props
}: CheckboxProps) {
  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = isControlled ? controlledChecked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalChecked(e.target.checked);
    onChange?.(e);
  };

  return (
    <label
      className={cn(
        'ds-checkbox inline-flex items-center gap-[var(--pad-sm)] text-[length:var(--font-size-body-sm)] select-none',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
      style={{
        color: 'var(--color-text)',
        ...(disabled ? { opacity: 'var(--opacity-disabled)' } : {}),
      }}
    >
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        className="sr-only"
        {...props}
      />
      <span
        className="ds-checkbox-box inline-flex items-center justify-center shrink-0"
        style={{
          width: '22px',
          height: '22px',
          borderRadius: 'var(--radius-xs)',
          border: `1.5px solid ${isChecked ? 'var(--color-emphasis)' : 'var(--color-border-strong)'}`,
          backgroundColor: isChecked ? 'var(--color-emphasis)' : 'var(--color-surface-raised)',
          boxShadow: 'var(--shadow-xs)',
          transition: 'all var(--token-transition)',
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-on-emphasis)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            opacity: isChecked ? 1 : 0,
            transition: 'opacity var(--token-transition-fast)',
          }}
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
