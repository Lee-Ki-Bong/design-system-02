import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium cursor-pointer transition-all',
  {
    variants: {
      variant: {
        emphasis: 'btn-emphasis',
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        ghost: 'btn-ghost',
        destructive: 'btn-destructive',
        icon: 'btn-icon',
      },
      size: {
        sm: 'h-9 px-4 text-xs rounded-lg',
        md: 'h-11 px-5 text-sm rounded-xl',
        lg: 'h-13 px-6 text-sm rounded-xl',
      },
    },
    compoundVariants: [
      { variant: 'icon', size: 'sm', className: 'h-9 w-9 px-0' },
      { variant: 'icon', size: 'md', className: 'h-11 w-11 px-0' },
      { variant: 'icon', size: 'lg', className: 'h-13 w-13 px-0' },
    ],
    defaultVariants: {
      variant: 'emphasis',
      size: 'md',
    },
  },
);

// Tailwind can't resolve CSS variables in classes, so we use inline styles for token colors
const variantStyles: Record<string, React.CSSProperties> = {
  emphasis: {
    backgroundColor: 'var(--color-emphasis)',
    color: 'var(--color-on-emphasis)',
    boxShadow: 'var(--shadow-md)',
  },
  primary: {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-on-emphasis)',
  },
  secondary: {
    backgroundColor: 'var(--color-surface-raised)',
    color: 'var(--color-text)',
    boxShadow: 'var(--shadow-sm)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--color-text)',
    boxShadow: 'inset 0 0 0 1.5px var(--color-border-strong)',
  },
  destructive: {
    backgroundColor: 'var(--color-destructive-bg)',
    color: 'var(--color-destructive)',
  },
  icon: {
    backgroundColor: 'var(--color-surface-raised)',
    color: 'var(--color-text)',
    boxShadow: 'var(--shadow-sm)',
  },
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export function Button({
  variant = 'emphasis',
  size = 'md',
  loading = false,
  disabled,
  className,
  children,
  style,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={isDisabled}
      style={{
        ...variantStyles[variant ?? 'emphasis'],
        ...(isDisabled ? { opacity: 'var(--opacity-disabled)', cursor: 'not-allowed' } : {}),
        transition: 'var(--token-transition-fast)',
        ...style,
      }}
      {...props}
    >
      {loading ? (
        <span
          className="h-4 w-4 animate-spin rounded-full"
          style={{ border: '2px solid currentColor', borderTopColor: 'transparent' }}
        />
      ) : null}
      {children}
    </button>
  );
}

export { buttonVariants };
