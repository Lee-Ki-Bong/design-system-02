import { cn } from '@/lib/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({
  label,
  error,
  hint,
  disabled,
  className,
  style,
  id,
  rows = 4,
  ...props
}: TextareaProps) {
  const textareaId =
    id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const hasError = !!error;

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={textareaId}
          className="text-sm font-medium"
          style={{ color: 'var(--color-text)' }}
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        disabled={disabled}
        rows={rows}
        className="w-full rounded-xl text-sm outline-none px-4 py-3 resize-y"
        style={{
          backgroundColor: 'var(--color-surface-sunken)',
          color: 'var(--color-text)',
          border: `var(--border-width-thin) solid ${hasError ? 'var(--color-error)' : 'var(--color-border)'}`,
          transition: 'var(--token-transition-fast)',
          ...(disabled ? { opacity: 'var(--opacity-disabled)', cursor: 'not-allowed' } : {}),
          ...style,
        }}
        {...props}
      />
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
