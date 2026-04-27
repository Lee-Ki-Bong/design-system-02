'use client';

import { cn } from '@/lib/cn';

/* ─── types ─── */

export interface FormLayoutProps extends React.FormHTMLAttributes<HTMLFormElement> {
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: number | string;
}

export interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface FormRowProps {
  children: React.ReactNode;
  columns?: number;
  className?: string;
  style?: React.CSSProperties;
}

export interface FormActionsProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── FormLayout ─── */

export function FormLayout({
  title,
  children,
  actions,
  maxWidth = 480,
  className,
  style,
  ...props
}: FormLayoutProps) {
  return (
    <form
      className={cn('ds-form-layout', className)}
      style={{
        maxWidth,
        background: 'var(--color-surface-raised)',
        borderRadius: 'var(--radius-2xl)',
        boxShadow: 'var(--shadow-md)',
        padding: 'var(--pad-2xl)',
        ...style,
      }}
      {...props}
    >
      {title && (
        <div
          style={{
            fontSize: 'var(--font-size-h3)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-text)',
            marginBottom: 'var(--gap-2xl)',
          }}
        >
          {title}
        </div>
      )}
      {children}
      {actions}
    </form>
  );
}

/* ─── FormField ─── */

export function FormField({
  label,
  required,
  error,
  hint,
  children,
  className,
  style,
}: FormFieldProps) {
  return (
    <div
      className={cn('ds-form-field', className)}
      style={{ marginBottom: 'var(--gap-xl)', ...style }}
    >
      {label && (
        <label
          style={{
            display: 'block',
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-text)',
            marginBottom: 'var(--gap-xs)',
          }}
        >
          {label}
          {required && (
            <span style={{ color: 'var(--color-error)', marginLeft: '2px' }}>*</span>
          )}
        </label>
      )}
      {children}
      {error && (
        <div
          style={{
            fontSize: 'var(--font-size-caption)',
            color: 'var(--color-error)',
            marginTop: 'var(--gap-xs)',
          }}
        >
          {error}
        </div>
      )}
      {!error && hint && (
        <div
          style={{
            fontSize: 'var(--font-size-caption)',
            color: 'var(--color-text-tertiary)',
            marginTop: 'var(--gap-xs)',
          }}
        >
          {hint}
        </div>
      )}
    </div>
  );
}

/* ─── FormRow ─── */

export function FormRow({ children, columns = 2, className, style }: FormRowProps) {
  return (
    <div
      className={cn('ds-form-row', className)}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 'var(--gap-lg)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── FormActions ─── */

export function FormActions({ children, className, style }: FormActionsProps) {
  return (
    <div
      className={cn('ds-form-actions', className)}
      style={{
        display: 'flex',
        gap: 'var(--gap-sm)',
        justifyContent: 'flex-end',
        marginTop: 'var(--gap-2xl)',
        paddingTop: 'var(--gap-xl)',
        borderTop: '1px solid var(--color-border-subtle)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
