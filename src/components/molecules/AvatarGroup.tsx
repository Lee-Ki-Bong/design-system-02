'use client';

import { cn } from '@/lib/cn';
import { Avatar } from '@/components/atoms/Avatar';

export interface AvatarGroupItem {
  src?: string;
  alt?: string;
  color?: string;
  label?: string;
}

export interface AvatarGroupProps {
  items: AvatarGroupItem[];
  max?: number;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function AvatarGroup({ items, max = 4, size = 36, className, style }: AvatarGroupProps) {
  const visible = items.slice(0, max);
  const overflow = items.length - max;
  const overlap = Math.round(size * 0.3);

  return (
    <div className={cn('ds-avatar-group inline-flex items-center', className)} style={style}>
      {visible.map((item, i) => (
        <div
          key={i}
          style={{
            marginLeft: i === 0 ? 0 : `-${overlap}px`,
            zIndex: visible.length - i,
            position: 'relative',
          }}
        >
          <Avatar src={item.src} alt={item.alt || ''} color={item.color} size={size} ring>
            {item.label}
          </Avatar>
        </div>
      ))}
      {overflow > 0 && (
        <div
          className="inline-flex items-center justify-center rounded-full shrink-0"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            marginLeft: `-${overlap}px`,
            position: 'relative',
            zIndex: 0,
            backgroundColor: 'var(--color-surface-sunken)',
            color: 'var(--color-text-tertiary)',
            fontSize: size <= 28 ? 'var(--font-size-overline)' : 'var(--font-size-caption)',
            fontWeight: 'var(--font-weight-semibold)',
            boxShadow: '0 0 0 3px var(--color-surface-raised)',
          }}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
