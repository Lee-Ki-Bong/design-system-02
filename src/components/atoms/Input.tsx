import { cn } from '@/lib/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export function Input({
  label,
  error,
  hint,
  iconLeft,
  iconRight,
  disabled,
  className,
  style,
  id,
  ...props
}: InputProps) {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const hasError = !!error;

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium"
          style={{ color: 'var(--color-text)' }}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {iconLeft && (
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            {iconLeft}
          </span>
        )}
        <input
          id={inputId}
          disabled={disabled}
          className={cn(
            'w-full rounded-xl text-sm outline-none',
            iconLeft ? 'pl-10' : 'pl-4',
            iconRight ? 'pr-10' : 'pr-4',
          )}
          style={{
            height: 'var(--height-lg)',
            backgroundColor: 'var(--color-surface-sunken)',
            color: 'var(--color-text)',
            border: `var(--border-width-thin) solid ${hasError ? 'var(--color-error)' : 'var(--color-border)'}`,
            transition: 'var(--token-transition-fast)',
            ...(disabled
              ? { opacity: 'var(--opacity-disabled)', cursor: 'not-allowed' }
              : {}),
            ...style,
          }}
          {...props}
        />
        {iconRight && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            {iconRight}
          </span>
        )}
      </div>
      {(error || hint) && (
        <span
          className="text-xs"
          style={{ color: error ? 'var(--color-error)' : 'var(--color-text-tertiary)' }}
        >
          {error || hint}
        </span>
      )}
    </div>
  );
}
