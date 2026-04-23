'use client';

import { cn } from '@/lib/cn';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'emphasis';
type BadgeSize = 'sm' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
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

export function Badge({
  variant = 'default',
  size = 'sm',
  dot = false,
  className,
  style,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'ds-badge inline-flex items-center font-[var(--font-weight-medium)]',
        size === 'sm'
          ? 'gap-[var(--pad-xs)] px-[var(--gap-md)] py-[var(--gap-xs)] text-[length:var(--font-size-caption)]'
          : 'gap-[var(--pad-xs)] px-[var(--pad-md)] py-[var(--gap-sm)] text-[length:var(--font-size-body-sm)]',
        className,
      )}
      style={{
        borderRadius: 'var(--radius-full)',
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    >
      {dot && (
        <span
          className="shrink-0 rounded-full"
          style={{
            width: '6px',
            height: '6px',
            backgroundColor: 'currentColor',
          }}
        />
      )}
      {children}
    </span>
  );
}
