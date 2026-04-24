'use client';

import { cn } from '@/lib/cn';
import { Badge } from '@/components/atoms/Badge';

export interface NavItemProps {
  icon?: React.ReactNode;
  label: string;
  badge?: number;
  active?: boolean;
  depth?: number;
  href?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const baseStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--gap-sm)',
  padding: '9px var(--gap-md)',
  borderRadius: 'var(--radius-lg)',
  fontSize: 'var(--font-size-body-sm)',
  fontWeight: 'var(--font-weight-medium)',
  fontFamily: 'var(--font-sans)',
  color: 'var(--color-text-secondary)',
  cursor: 'pointer',
  transition: 'all var(--token-transition-fast)',
  border: 'none',
  background: 'transparent',
  width: '100%',
  textAlign: 'left' as const,
  textDecoration: 'none',
};

const activeStyle: React.CSSProperties = {
  background: 'var(--color-surface-sunken)',
  color: 'var(--color-text)',
  fontWeight: 'var(--font-weight-semibold)',
};

export function NavItem({
  icon,
  label,
  badge: badgeCount,
  active = false,
  depth = 0,
  href,
  onClick,
  className,
  style,
}: NavItemProps) {
  const isChild = depth > 0;
  const computedStyle: React.CSSProperties = {
    ...baseStyle,
    ...(isChild
      ? {
          paddingLeft: `${12 + depth * 16}px`,
          fontSize: 'var(--font-size-caption)',
          color: 'var(--color-text-tertiary)',
        }
      : {}),
    ...(active
      ? isChild
        ? { color: 'var(--color-text)', fontWeight: 'var(--font-weight-semibold)' }
        : activeStyle
      : {}),
    ...style,
  };

  const content = (
    <>
      {icon && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '20px',
            height: '20px',
            flexShrink: 0,
          }}
        >
          {icon}
        </span>
      )}
      <span
        style={{
          flex: 1,
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
      {badgeCount != null && badgeCount > 0 && (
        <Badge variant="emphasis" size="sm">
          {badgeCount}
        </Badge>
      )}
    </>
  );

  const defaultColor = isChild ? 'var(--color-text-tertiary)' : 'var(--color-text-secondary)';
  const hoverColor = isChild ? 'var(--color-text-secondary)' : 'var(--color-text)';

  const hoverHandlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      if (!active) {
        e.currentTarget.style.background = 'var(--color-surface)';
        e.currentTarget.style.color = hoverColor;
      }
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      if (!active) {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = defaultColor;
      }
    },
  };

  if (href) {
    return (
      <a
        href={href}
        className={cn('ds-nav-item', className)}
        style={computedStyle}
        aria-current={active ? 'page' : undefined}
        {...hoverHandlers}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={cn('ds-nav-item', className)}
      style={computedStyle}
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
      {...hoverHandlers}
    >
      {content}
    </button>
  );
}
