'use client';

import { cn } from '@/lib/cn';

type EmptyStateVariant = 'default' | 'dashed';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  variant?: EmptyStateVariant;
  className?: string;
  style?: React.CSSProperties;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  variant = 'default',
  className,
  style,
}: EmptyStateProps) {
  const isDashed = variant === 'dashed';

  return (
    <div
      className={cn(
        'ds-empty-state flex flex-col items-center justify-center text-center',
        className,
      )}
      style={{
        backgroundColor: isDashed ? 'transparent' : 'var(--color-surface-raised)',
        borderRadius: 'var(--radius-2xl)',
        padding: '48px 28px',
        boxShadow: isDashed ? 'none' : 'var(--shadow-sm)',
        gap: 'var(--gap-md)',
        ...(isDashed ? { border: '2px dashed var(--color-border-strong)' } : {}),
        ...style,
      }}
    >
      {icon && (
        <div
          className="grid place-items-center"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-surface-sunken)',
            color: 'var(--color-text-tertiary)',
          }}
        >
          {icon}
        </div>
      )}
      <div
        style={{
          fontSize: '16px',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-text)',
        }}
      >
        {title}
      </div>
      {description && (
        <div
          style={{
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
            maxWidth: '260px',
            lineHeight: 1.55,
          }}
        >
          {description}
        </div>
      )}
      {action && <div style={{ marginTop: '4px' }}>{action}</div>}
    </div>
  );
}
