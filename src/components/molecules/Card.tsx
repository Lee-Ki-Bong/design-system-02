'use client';

import { cn } from '@/lib/cn';

type CardVariant = 'default' | 'elevated' | 'flat';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: string;
}

const variantStyles: Record<CardVariant, React.CSSProperties> = {
  default: {
    backgroundColor: 'var(--color-surface-raised)',
    boxShadow: 'var(--shadow-md)',
  },
  elevated: {
    backgroundColor: 'var(--color-surface-raised)',
    boxShadow: 'var(--shadow-lg)',
  },
  flat: {
    backgroundColor: 'var(--color-surface)',
    boxShadow: 'none',
  },
};

export function Card({
  variant = 'default',
  padding = 'var(--pad-lg)',
  className,
  style,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn('ds-card', className)}
      style={{
        borderRadius: 'var(--radius-2xl)',
        padding,
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  style,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('ds-card-header', className)}
      style={{
        paddingBottom: 'var(--pad-md)',
        borderBottom: '1px solid var(--color-border-subtle)',
        marginBottom: 'var(--pad-md)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardBody({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('ds-card-body', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  style,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('ds-card-footer flex items-center gap-[var(--gap-sm)]', className)}
      style={{
        paddingTop: 'var(--pad-md)',
        borderTop: '1px solid var(--color-border-subtle)',
        marginTop: 'var(--pad-md)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
