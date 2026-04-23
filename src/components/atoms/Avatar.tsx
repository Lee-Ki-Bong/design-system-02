'use client';

import { cn } from '@/lib/cn';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  color?: string;
  size?: number;
  ring?: boolean;
  badge?: number | string;
}

export function Avatar({
  src,
  alt = '',
  color = 'var(--accent-blue)',
  size = 44,
  ring = false,
  badge,
  className,
  style,
  children,
  ...props
}: AvatarProps) {
  const fontSize =
    size <= 24
      ? 'var(--font-size-overline)'
      : size <= 32
        ? 'var(--font-size-caption)'
        : size <= 44
          ? 'var(--font-size-body-sm)'
          : 'var(--pad-lg)';

  return (
    <div className={cn('ds-avatar relative inline-flex', className)} style={style} {...props}>
      <div
        className="inline-flex items-center justify-center rounded-full shrink-0 overflow-hidden"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: src ? undefined : color,
          color: 'var(--color-on-surface)',
          fontWeight: 'var(--font-weight-semibold)' as string,
          fontSize,
          ...(ring ? { boxShadow: '0 0 0 3px var(--color-surface-raised)' } : {}),
        }}
      >
        {src ? <img src={src} alt={alt} className="h-full w-full object-cover" /> : children}
      </div>
      {badge !== undefined && (
        <span
          className="absolute inline-flex items-center justify-center rounded-full"
          style={{
            bottom: '-4px',
            right: '-4px',
            width: 'var(--pad-lg)',
            height: 'var(--pad-lg)',
            backgroundColor: 'var(--color-error)',
            color: 'var(--color-on-surface)',
            fontSize: 'var(--font-size-overline)',
            fontWeight: 'var(--font-weight-semibold)' as string,
            border: '2px solid var(--color-surface-raised)',
          }}
        >
          {badge}
        </span>
      )}
    </div>
  );
}
