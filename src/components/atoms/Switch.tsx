'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export function Switch({
  label,
  checked: controlledChecked,
  defaultChecked = false,
  disabled,
  onChange,
  className,
  id,
  ...props
}: SwitchProps) {
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
        'ds-switch inline-flex items-center gap-[var(--pad-sm)] text-[length:var(--font-size-body-sm)] select-none',
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
        role="switch"
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        className="sr-only"
        {...props}
      />
      <span
        className="ds-switch-track relative shrink-0"
        style={{
          width: '48px',
          height: '26px',
          padding: '3px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: isChecked ? 'var(--color-emphasis)' : 'var(--color-border-strong)',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.06)',
          transition: 'background-color var(--token-transition)',
        }}
      >
        <span
          className="ds-switch-thumb block"
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-surface-raised)',
            boxShadow: 'var(--shadow-sm)',
            transform: isChecked ? 'translateX(var(--pad-xl))' : 'translateX(0)',
            transition: 'transform var(--token-transition)',
          }}
        />
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
