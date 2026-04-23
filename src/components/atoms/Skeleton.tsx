'use client';

import { cn } from '@/lib/cn';

type SkeletonVariant = 'line' | 'circle' | 'block' | 'bar';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string;
  height?: string;
}

const variantDefaults: Record<SkeletonVariant, { h: string; radius: string }> = {
  line: { h: 'var(--gap-md)', radius: 'var(--radius-xs)' },
  circle: { h: 'var(--pad-3xl)', radius: '50%' },
  block: { h: '100px', radius: 'var(--radius-lg)' },
  bar: { h: '6px', radius: 'var(--radius-full)' },
};

export function Skeleton({
  variant = 'line',
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps) {
  const defaults = variantDefaults[variant];

  return (
    <div
      aria-hidden="true"
      className={cn('ds-skeleton shrink-0', className)}
      style={{
        width: width ?? (variant === 'circle' ? defaults.h : '100%'),
        height: height ?? defaults.h,
        borderRadius: defaults.radius,
        backgroundColor: 'var(--color-surface-sunken)',
        backgroundImage:
          'linear-gradient(90deg, var(--color-surface-sunken) 0px, var(--color-surface) 40px, var(--color-surface-sunken) 80px)',
        backgroundSize: '200px 100%',
        animation: 'shimmer 1.6s ease-in-out infinite',
        ...style,
      }}
      {...props}
    />
  );
}
