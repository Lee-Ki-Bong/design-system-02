'use client';

import { cn } from '@/lib/cn';
import { Icon } from '@/components/atoms/Icon';
import { Spinner } from '@/components/atoms/Spinner';
import { useRef } from 'react';

export interface SearchInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  loading?: boolean;
  onClear?: () => void;
}

export function SearchInput({
  loading = false,
  onClear,
  value,
  disabled,
  className,
  style,
  ...props
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasValue = value !== undefined && value !== '';

  const handleClear = () => {
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <div className={cn('ds-search-input relative', className)}>
      <style>{`
        .ds-search-input input[type="search"]::-webkit-search-cancel-button,
        .ds-search-input input[type="search"]::-webkit-search-decoration {
          -webkit-appearance: none;
          appearance: none;
          display: none;
        }
      `}</style>
      {/* search icon */}
      <span
        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: 'var(--color-text-tertiary)' }}
      >
        <Icon name="search" size={18} />
      </span>

      <input
        ref={inputRef}
        type="search"
        value={value}
        disabled={disabled}
        className={cn(
          'w-full rounded-full text-sm outline-none',
          'pl-10',
          hasValue || loading ? 'pr-10' : 'pr-4',
        )}
        style={{
          height: 'var(--height-lg)',
          backgroundColor: 'var(--color-surface-sunken)',
          color: 'var(--color-text)',
          border: 'var(--border-width-thin) solid var(--color-border)',
          transition: 'var(--token-transition-fast)',
          // hide native search cancel button
          WebkitAppearance: 'none',
          ...(disabled ? { opacity: 'var(--opacity-disabled)', cursor: 'not-allowed' } : {}),
          ...style,
        }}
        {...props}
      />

      {/* right slot: spinner or clear */}
      {(loading || hasValue) && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
          {loading ? (
            <Spinner size="xs" />
          ) : (
            <button
              type="button"
              onClick={handleClear}
              disabled={disabled}
              aria-label="Clear search"
              className="flex items-center justify-center rounded-full"
              style={{
                width: 18,
                height: 18,
                color: 'var(--color-text-tertiary)',
                background: 'none',
                border: 'none',
                cursor: disabled ? 'not-allowed' : 'pointer',
                padding: 0,
                transition: 'color var(--token-transition-fast)',
              }}
              onMouseEnter={(e) => {
                if (!disabled) e.currentTarget.style.color = 'var(--color-text)';
              }}
              onMouseLeave={(e) => {
                if (!disabled) e.currentTarget.style.color = 'var(--color-text-tertiary)';
              }}
            >
              <Icon name="x" size={16} strokeWidth={2.2} />
            </button>
          )}
        </span>
      )}
    </div>
  );
}
