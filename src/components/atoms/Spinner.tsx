'use client';

import { cn } from '@/lib/cn';

type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type SpinnerVariant = 'default' | 'onEmphasis' | 'primary';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
}

const sizeMap: Record<SpinnerSize, { wh: string; border: string }> = {
  xs: { wh: '14px', border: '1.5px' },
  sm: { wh: 'var(--pad-lg)', border: '2px' },
  md: { wh: 'var(--gap-2xl)', border: '2.5px' },
  lg: { wh: 'var(--height-sm)', border: '3px' },
  xl: { wh: 'var(--height-lg)', border: '3px' },
};

const variantStyles: Record<SpinnerVariant, { borderColor: string; topColor: string }> = {
  default: {
    borderColor: 'var(--color-border)',
    topColor: 'var(--color-emphasis)',
  },
  onEmphasis: {
    borderColor: 'rgba(255,255,255,0.25)',
    topColor: 'var(--color-on-emphasis)',
  },
  primary: {
    borderColor: 'var(--color-primary-subtle)',
    topColor: 'var(--color-primary)',
  },
};

export function Spinner({
  size = 'md',
  variant = 'default',
  className,
  style,
  ...props
}: SpinnerProps) {
  const s = sizeMap[size];
  const v = variantStyles[variant];

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn('ds-spinner inline-block shrink-0 rounded-full', className)}
      style={{
        width: s.wh,
        height: s.wh,
        borderWidth: s.border,
        borderStyle: 'solid',
        borderColor: v.borderColor,
        borderTopColor: v.topColor,
        animation: 'spin 0.8s linear infinite',
        ...style,
      }}
      {...props}
    />
  );
}
