'use client';

import Link from 'next/link';

interface PropDef {
  name: string;
  type: string;
  default: string;
}

interface AtomDocPageProps {
  name: string;
  description: string;
  props: PropDef[];
  tokens: string[];
  children: React.ReactNode;
}

export function AtomDocPage({ name, description, props, tokens, children }: AtomDocPageProps) {
  return (
    <div>
      {/* Breadcrumb */}
      <div
        className="flex items-center gap-2 text-sm"
        style={{ color: 'var(--color-text-tertiary)' }}
      >
        <Link href="/docs/atoms" className="hover:opacity-75">
          Atoms
        </Link>
        <span>/</span>
        <span style={{ color: 'var(--color-text)' }}>{name}</span>
      </div>

      {/* Title + Description */}
      <h1 className="mt-4 text-2xl font-bold" style={{ color: 'var(--color-emphasis)' }}>
        {name}
      </h1>
      <p className="mt-2" style={{ color: 'var(--color-text-secondary)' }}>
        {description}
      </p>

      {/* Custom sections (Preview, States, etc.) */}
      {children}

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

export function DocSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2
        className="text-sm font-semibold uppercase tracking-widest"
        style={{ color: 'var(--color-text-tertiary)' }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
