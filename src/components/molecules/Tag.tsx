'use client';

import { cn } from '@/lib/cn';

type TagVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'emphasis';
type TagSize = 'sm' | 'lg';

export interface TagProps {
  variant?: TagVariant;
  size?: TagSize;
  onRemove?: () => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const variantStyles: Record<TagVariant, React.CSSProperties> = {
  default: {
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text-secondary)',
  },
  success: {
    backgroundColor: 'var(--color-success-bg)',
    color: 'var(--color-success)',
  },
  warning: {
    backgroundColor: 'var(--color-warning-bg)',
    color: 'var(--color-warning)',
  },
  error: {
    backgroundColor: 'var(--color-error-bg)',
    color: 'var(--color-error)',
  },
  info: {
    backgroundColor: 'var(--color-info-bg)',
    color: 'var(--color-info)',
  },
  emphasis: {
    backgroundColor: 'var(--color-emphasis)',
    color: 'var(--color-on-emphasis)',
  },
};

export function Tag({
  variant = 'default',
  size = 'sm',
  onRemove,
  disabled = false,
  className,
  style,
  children,
}: TagProps) {
  return (
    <span
      className={cn(
        'ds-tag inline-flex items-center font-[var(--font-weight-medium)]',
        size === 'sm'
          ? 'gap-[var(--gap-xs)] px-[var(--gap-md)] py-[var(--gap-xs)] text-[length:var(--font-size-caption)]'
          : 'gap-[var(--gap-sm)] px-[var(--pad-md)] py-[var(--gap-sm)] text-[length:var(--font-size-body-sm)]',
        disabled && 'pointer-events-none',
        className,
      )}
      style={{
        borderRadius: 'var(--radius-full)',
        opacity: disabled ? 'var(--opacity-disabled)' : undefined,
        ...variantStyles[variant],
        ...style,
      }}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          disabled={disabled}
          aria-label="Remove"
          className="inline-flex shrink-0 items-center justify-center rounded-full"
          style={{
            width: size === 'sm' ? '14px' : '18px',
            height: size === 'sm' ? '14px' : '18px',
            color: 'currentColor',
            opacity: 0.6,
            background: 'none',
            border: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            padding: 0,
            transition: 'opacity var(--token-transition-fast)',
          }}
          onMouseEnter={(e) => {
            if (!disabled) e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            if (!disabled) e.currentTarget.style.opacity = '0.6';
          }}
        >
          <svg
            width={size === 'sm' ? '10' : '12'}
            height={size === 'sm' ? '10' : '12'}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
}
