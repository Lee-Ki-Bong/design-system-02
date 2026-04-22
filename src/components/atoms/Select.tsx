import { cn } from '@/lib/cn';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({
  label,
  error,
  hint,
  options,
  placeholder,
  disabled,
  className,
  style,
  id,
  ...props
}: SelectProps) {
  const selectId =
    id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const hasError = !!error;

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium"
          style={{ color: 'var(--color-text)' }}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          disabled={disabled}
          className="w-full appearance-none rounded-xl text-sm outline-none px-4 pr-10"
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
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {/* Chevron icon */}
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
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
