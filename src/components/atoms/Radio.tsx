'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export function Radio({
  label,
  checked: controlledChecked,
  defaultChecked = false,
  disabled,
  onChange,
  className,
  id,
  ...props
}: RadioProps) {
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
        'ds-radio inline-flex items-center gap-[var(--pad-sm)] text-[length:var(--font-size-body-sm)] select-none',
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
        type="radio"
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        className="sr-only"
        {...props}
      />
      <span
        className="ds-radio-box inline-flex items-center justify-center shrink-0"
        style={{
          width: '22px',
          height: '22px',
          borderRadius: 'var(--radius-full)',
          border: `2px solid ${isChecked ? 'var(--color-emphasis)' : 'var(--color-border-strong)'}`,
          backgroundColor: 'var(--color-surface-raised)',
          transition: 'border-color var(--token-transition-fast)',
        }}
      >
        <span
          className="ds-radio-dot"
          style={{
            width: '10px',
            height: '10px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: isChecked ? 'var(--color-emphasis)' : 'transparent',
            transition: 'background-color var(--token-transition-fast)',
          }}
        />
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
