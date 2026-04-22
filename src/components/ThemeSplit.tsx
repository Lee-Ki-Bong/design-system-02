'use client';

interface ThemeSplitProps {
  children: React.ReactNode;
  cols?: 1 | 2;
}

export function ThemeSplit({ children, cols = 2 }: ThemeSplitProps) {
  return (
    <div
      className={`mt-4 grid gap-0 overflow-hidden rounded-2xl ${cols === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}
      style={{ border: '1px solid var(--color-border-subtle)' }}
    >
      <div
        data-theme="light"
        className="p-6"
        style={{ backgroundColor: 'var(--color-surface-raised)' }}
      >
        <span
          className="text-xs font-semibold uppercase tracking-widest mb-4 block"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          Light
        </span>
        {children}
      </div>
      <div
        data-theme="dark"
        className="p-6"
        style={{ backgroundColor: 'var(--color-surface-raised)' }}
      >
        <span
          className="text-xs font-semibold uppercase tracking-widest mb-4 block"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          Dark
        </span>
        {children}
      </div>
    </div>
  );
}
