'use client';

import { cn } from '@/lib/cn';

type DividerOrientation = 'horizontal' | 'vertical';
type DividerVariant = 'subtle' | 'strong';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  label?: string;
}

const colorMap: Record<DividerVariant, string> = {
  subtle: 'var(--color-border-subtle)',
  strong: 'var(--color-border)',
};

export function Divider({
  orientation = 'horizontal',
  variant = 'subtle',
  label,
  className,
  style,
  ...props
}: DividerProps) {
  const color = colorMap[variant];

  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn('ds-divider shrink-0', className)}
        style={{
          width: '1px',
          height: '24px',
          backgroundColor: color,
          ...style,
        }}
        {...props}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        className={cn('ds-divider flex items-center', className)}
        style={{ gap: 'var(--gap-md)', ...style }}
        {...props}
      >
        <span className="flex-1" style={{ height: '1px', backgroundColor: color }} />
        <span
          className="shrink-0 text-[length:11px] font-medium uppercase tracking-widest"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          {label}
        </span>
        <span className="flex-1" style={{ height: '1px', backgroundColor: color }} />
      </div>
    );
  }

  return (
    <div
      role="separator"
      className={cn('ds-divider', className)}
      style={{
        height: '1px',
        backgroundColor: color,
        ...style,
      }}
      {...props}
    />
  );
}
