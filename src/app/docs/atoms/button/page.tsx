'use client';

import Link from 'next/link';
import { Button } from '@/components/atoms/Button';

const variants = ['emphasis', 'primary', 'secondary', 'ghost', 'destructive'] as const;
const sizes = ['sm', 'md', 'lg'] as const;

const props = [
  {
    name: 'variant',
    type: "'emphasis' | 'primary' | 'secondary' | 'ghost' | 'destructive' | 'icon'",
    default: "'emphasis'",
  },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'" },
  { name: 'disabled', type: 'boolean', default: 'false' },
  { name: 'loading', type: 'boolean', default: 'false' },
  { name: 'className', type: 'string', default: '-' },
];

const tokens = [
  '--color-emphasis',
  '--color-emphasis-hover',
  '--color-on-emphasis',
  '--color-primary',
  '--color-primary-hover',
  '--color-surface-raised',
  '--color-border-strong',
  '--color-text',
  '--color-text-disabled',
  '--color-destructive',
  '--color-destructive-bg',
  '--radius-lg',
  '--radius-xl',
  '--height-sm',
  '--height-md',
  '--height-lg',
  '--shadow-sm',
  '--shadow-md',
  '--token-transition-fast',
];

function ThemeSplit({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-3 grid grid-cols-1 gap-0 overflow-hidden rounded-2xl"
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

export default function ButtonPage() {
  return (
    <div>
      <div
        className="flex items-center gap-2 text-sm"
        style={{ color: 'var(--color-text-tertiary)' }}
      >
        <Link href="/docs/atoms" className="hover:opacity-75">
          Atoms
        </Link>
        <span>/</span>
        <span style={{ color: 'var(--color-text)' }}>Button</span>
      </div>

      <h1 className="mt-4 text-2xl font-bold" style={{ color: 'var(--color-emphasis)' }}>
        Button
      </h1>
      <p className="mt-2" style={{ color: 'var(--color-text-secondary)' }}>
        가장 기본적인 인터랙션 요소. 6 variants, 3 sizes, loading/disabled 상태.
      </p>

      {/* Variant × Size Matrix */}
      <section className="mt-8">
        <h2
          className="text-sm font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          Preview
        </h2>
        <ThemeSplit>
          <div className="overflow-x-auto">
            <table className="border-separate" style={{ borderSpacing: '12px 8px' }}>
              <thead>
                <tr>
                  <th />
                  {variants.map((v) => (
                    <th
                      key={v}
                      className="text-xs font-medium text-left pb-1"
                      style={{ color: 'var(--color-text-disabled)' }}
                    >
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </th>
                  ))}
                  <th
                    className="text-xs font-medium text-left pb-1"
                    style={{ color: 'var(--color-text-disabled)' }}
                  >
                    Icon+Text
                  </th>
                  <th
                    className="text-xs font-medium text-left pb-1"
                    style={{ color: 'var(--color-text-disabled)' }}
                  >
                    Icon
                  </th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((size) => (
                  <tr key={size}>
                    <td className="text-xs pr-2" style={{ color: 'var(--color-text-disabled)' }}>
                      {size}
                    </td>
                    {variants.map((variant) => (
                      <td key={variant}>
                        <Button variant={variant} size={size}>
                          Button
                        </Button>
                      </td>
                    ))}
                    <td>
                      <Button variant="emphasis" size={size}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                        Add
                      </Button>
                    </td>
                    <td>
                      <Button variant="icon" size={size} aria-label="Add">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ThemeSplit>
      </section>

      {/* States */}
      <section className="mt-10">
        <h2
          className="text-sm font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          States
        </h2>
        <ThemeSplit>
          <div className="flex gap-4 flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <Button>Default</Button>
              <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                Default
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button disabled>Disabled</Button>
              <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                Disabled
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button loading>Loading</Button>
              <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                Loading
              </span>
            </div>
          </div>
        </ThemeSplit>
      </section>

      {/* Props */}
      <section className="mt-10">
        <h2
          className="text-sm font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          Props
        </h2>
        <div
          className="mt-3 overflow-hidden rounded-2xl"
          style={{ border: '1px solid var(--color-border-subtle)' }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: 'var(--color-surface-sunken)' }}>
                <th
                  className="px-4 py-3 text-left font-semibold"
                  style={{ color: 'var(--color-text)' }}
                >
                  Prop
                </th>
                <th
                  className="px-4 py-3 text-left font-semibold"
                  style={{ color: 'var(--color-text)' }}
                >
                  Type
                </th>
                <th
                  className="px-4 py-3 text-left font-semibold"
                  style={{ color: 'var(--color-text)' }}
                >
                  Default
                </th>
              </tr>
            </thead>
            <tbody>
              {props.map((p) => (
                <tr key={p.name} style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                  <td
                    className="px-4 py-3 font-medium"
                    style={{
                      color: 'var(--color-text)',
                      backgroundColor: 'var(--color-surface-raised)',
                    }}
                  >
                    {p.name}
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{
                      color: 'var(--color-text-secondary)',
                      backgroundColor: 'var(--color-surface-raised)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--font-size-caption)',
                    }}
                  >
                    {p.type}
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{
                      color: 'var(--color-text-tertiary)',
                      backgroundColor: 'var(--color-surface-raised)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--font-size-caption)',
                    }}
                  >
                    {p.default}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tokens Used */}
      <section className="mt-10">
        <h2
          className="text-sm font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          Tokens Used
        </h2>
        <div
          className="mt-3 flex flex-wrap gap-2 rounded-2xl p-6"
          style={{
            backgroundColor: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border-subtle)',
          }}
        >
          {tokens.map((t) => (
            <span
              key={t}
              className="rounded-lg px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: 'var(--color-surface-sunken)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
