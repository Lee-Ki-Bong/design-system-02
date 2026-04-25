'use client';

import { cn } from '@/lib/cn';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';
type AlertType = 'inline' | 'banner';

export interface AlertProps {
  variant?: AlertVariant;
  type?: AlertType;
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const iconPaths: Record<AlertVariant, string> = {
  info: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 8.01V8M12 11v5',
  success: 'M4.5 12.75l6 6 9-13.5',
  warning:
    'M10.3 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.7 3.86a2 2 0 00-3.4 0zM12 9v4M12 17.01V17',
  error: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 8v5M12 16.01V16',
};

const colorMap: Record<AlertVariant, { bg: string; stroke: string }> = {
  info: { bg: 'var(--color-info-bg)', stroke: 'var(--color-info)' },
  success: { bg: 'var(--color-success-bg)', stroke: 'var(--color-success)' },
  warning: { bg: 'var(--color-warning-bg)', stroke: 'var(--color-warning)' },
  error: { bg: 'var(--color-error-bg)', stroke: 'var(--color-error)' },
};

function AlertIcon({ variant, size }: { variant: AlertVariant; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={colorMap[variant].stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, marginTop: 2 }}
    >
      <path d={iconPaths[variant]} />
    </svg>
  );
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="닫기"
      style={{
        background: 'none',
        border: 0,
        cursor: 'pointer',
        padding: 'var(--gap-xs)',
        color: 'var(--color-text-tertiary)',
        display: 'grid',
        placeItems: 'center',
        flexShrink: 0,
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}

export function Alert({
  variant = 'info',
  type = 'inline',
  title,
  children,
  onClose,
  className,
}: AlertProps) {
  const colors = colorMap[variant];

  if (type === 'banner') {
    return (
      <div
        role="alert"
        className={cn('ds-alert-banner', className)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--pad-sm) var(--pad-lg)',
          borderRadius: 'var(--radius-lg)',
          fontSize: 'var(--font-size-body-sm)',
          fontWeight: 'var(--font-weight-medium)',
          color: 'var(--color-text)',
          background: colors.bg,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-sm)' }}>
          <AlertIcon variant={variant} size={16} />
          {children}
        </div>
        {onClose && <CloseButton onClick={onClose} />}
      </div>
    );
  }

  return (
    <div
      role="alert"
      className={cn('ds-alert-inline', className)}
      style={{
        display: 'flex',
        gap: 'var(--gap-md)',
        padding: 'var(--pad-md) var(--pad-lg)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-sm)',
        fontSize: 'var(--font-size-body-sm)',
        background: colors.bg,
      }}
    >
      <AlertIcon variant={variant} size={20} />
      <div style={{ flex: 1 }}>
        {title && (
          <div
            style={{
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text)',
              marginBottom: 2,
            }}
          >
            {title}
          </div>
        )}
        <div style={{ color: 'var(--color-text-secondary)' }}>{children}</div>
      </div>
    </div>
  );
}
