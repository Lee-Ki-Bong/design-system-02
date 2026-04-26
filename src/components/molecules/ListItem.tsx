'use client';

import { cn } from '@/lib/cn';

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  leading?: React.ReactNode;
  title: string;
  description?: string;
  meta?: string;
  trailing?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  href?: string;
}

export function ListItem({
  leading,
  title,
  description,
  meta,
  trailing,
  active = false,
  disabled = false,
  href,
  className,
  style,
  onClick,
  ...props
}: ListItemProps) {
  const isClickable = !!onClick || !!href;

  const content = (
    <>
      {leading && <span className="shrink-0">{leading}</span>}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium" style={{ color: 'var(--color-text)' }}>
            {title}
          </p>
          {meta && (
            <span className="shrink-0 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
              {meta}
            </span>
          )}
        </div>
        {description && (
          <p className="mt-0.5 truncate text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
            {description}
          </p>
        )}
      </div>
      {trailing && <span className="shrink-0">{trailing}</span>}
    </>
  );

  const sharedClass = cn(
    'ds-list-item flex items-center gap-3 rounded-xl',
    isClickable && !disabled && 'cursor-pointer',
    disabled && 'pointer-events-none',
    className,
  );

  const sharedStyle: React.CSSProperties = {
    padding: 'var(--pad-sm) var(--pad-md)',
    backgroundColor: active ? 'var(--color-surface-sunken)' : 'transparent',
    transition: 'var(--token-transition-fast)',
    opacity: disabled ? 'var(--opacity-disabled)' : undefined,
    ...style,
  };

  if (href && !disabled) {
    return (
      <a
        href={href}
        className={sharedClass}
        style={{ ...sharedStyle, textDecoration: 'none', color: 'inherit' }}
        {...(props as React.HTMLAttributes<HTMLElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className={sharedClass}
      style={sharedStyle}
      onClick={!disabled ? onClick : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable && !disabled ? 0 : undefined}
      onKeyDown={
        isClickable && !disabled
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
              }
            }
          : undefined
      }
      {...props}
    >
      {content}
    </div>
  );
}
