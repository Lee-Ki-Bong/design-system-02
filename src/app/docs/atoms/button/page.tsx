import Link from 'next/link';

const props = [
  {
    name: 'variant',
    type: "'primary' | 'secondary' | 'ghost' | 'destructive'",
    default: "'primary'",
  },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'" },
  { name: 'disabled', type: 'boolean', default: 'false' },
  { name: 'loading', type: 'boolean', default: 'false' },
  { name: 'className', type: 'string', default: '-' },
];

const tokens = [
  '--color-emphasis',
  '--color-emphasis-hover',
  '--color-primary',
  '--color-primary-hover',
  '--color-on-emphasis',
  '--color-surface-raised',
  '--color-border',
  '--color-text',
  '--color-text-disabled',
  '--color-destructive',
  '--radius-lg',
  '--height-sm',
  '--height-md',
  '--height-lg',
  '--pad-md',
  '--pad-lg',
  '--token-transition-fast',
];

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

      {/* Preview */}
      <section className="mt-8">
        <h2
          className="text-sm font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          Preview
        </h2>
        <div
          className="mt-3 grid grid-cols-2 gap-0 overflow-hidden rounded-2xl"
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
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="w-12 text-xs" style={{ color: 'var(--color-text-disabled)' }}>
                  sm
                </span>
                <div
                  className="h-9 px-4 rounded-lg flex items-center text-xs font-medium"
                  style={{
                    backgroundColor: 'var(--color-emphasis)',
                    color: 'var(--color-on-emphasis)',
                  }}
                >
                  Primary
                </div>
                <div
                  className="h-9 px-4 rounded-lg flex items-center text-xs font-medium"
                  style={{
                    backgroundColor: 'var(--color-surface-raised)',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  Secondary
                </div>
                <div
                  className="h-9 px-4 rounded-lg flex items-center text-xs font-medium"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Ghost
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 text-xs" style={{ color: 'var(--color-text-disabled)' }}>
                  md
                </span>
                <div
                  className="h-11 px-5 rounded-xl flex items-center text-sm font-medium"
                  style={{
                    backgroundColor: 'var(--color-emphasis)',
                    color: 'var(--color-on-emphasis)',
                  }}
                >
                  Primary
                </div>
                <div
                  className="h-11 px-5 rounded-xl flex items-center text-sm font-medium"
                  style={{
                    backgroundColor: 'var(--color-surface-raised)',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  Secondary
                </div>
                <div
                  className="h-11 px-5 rounded-xl flex items-center text-sm font-medium"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Ghost
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 text-xs" style={{ color: 'var(--color-text-disabled)' }}>
                  lg
                </span>
                <div
                  className="h-13 px-6 rounded-xl flex items-center font-medium"
                  style={{
                    backgroundColor: 'var(--color-emphasis)',
                    color: 'var(--color-on-emphasis)',
                  }}
                >
                  Primary
                </div>
                <div
                  className="h-13 px-6 rounded-xl flex items-center font-medium"
                  style={{
                    backgroundColor: 'var(--color-surface-raised)',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  Secondary
                </div>
                <div
                  className="h-13 px-6 rounded-xl flex items-center font-medium"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Ghost
                </div>
              </div>
            </div>
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
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="w-12 text-xs" style={{ color: 'var(--color-text-disabled)' }}>
                  sm
                </span>
                <div
                  className="h-9 px-4 rounded-lg flex items-center text-xs font-medium"
                  style={{
                    backgroundColor: 'var(--color-emphasis)',
                    color: 'var(--color-on-emphasis)',
                  }}
                >
                  Primary
                </div>
                <div
                  className="h-9 px-4 rounded-lg flex items-center text-xs font-medium"
                  style={{
                    backgroundColor: 'var(--color-surface-raised)',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  Secondary
                </div>
                <div
                  className="h-9 px-4 rounded-lg flex items-center text-xs font-medium"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Ghost
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 text-xs" style={{ color: 'var(--color-text-disabled)' }}>
                  md
                </span>
                <div
                  className="h-11 px-5 rounded-xl flex items-center text-sm font-medium"
                  style={{
                    backgroundColor: 'var(--color-emphasis)',
                    color: 'var(--color-on-emphasis)',
                  }}
                >
                  Primary
                </div>
                <div
                  className="h-11 px-5 rounded-xl flex items-center text-sm font-medium"
                  style={{
                    backgroundColor: 'var(--color-surface-raised)',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  Secondary
                </div>
                <div
                  className="h-11 px-5 rounded-xl flex items-center text-sm font-medium"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Ghost
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 text-xs" style={{ color: 'var(--color-text-disabled)' }}>
                  lg
                </span>
                <div
                  className="h-13 px-6 rounded-xl flex items-center font-medium"
                  style={{
                    backgroundColor: 'var(--color-emphasis)',
                    color: 'var(--color-on-emphasis)',
                  }}
                >
                  Primary
                </div>
                <div
                  className="h-13 px-6 rounded-xl flex items-center font-medium"
                  style={{
                    backgroundColor: 'var(--color-surface-raised)',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  Secondary
                </div>
                <div
                  className="h-13 px-6 rounded-xl flex items-center font-medium"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Ghost
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* States */}
      <section className="mt-10">
        <h2
          className="text-sm font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          States
        </h2>
        <div
          className="mt-3 flex gap-4 rounded-2xl p-6"
          style={{
            backgroundColor: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border-subtle)',
          }}
        >
          {['Default', 'Hover', 'Active', 'Disabled', 'Loading'].map((state) => (
            <div key={state} className="flex flex-col items-center gap-2">
              <div
                className="h-11 px-5 rounded-xl flex items-center text-sm font-medium"
                style={{
                  backgroundColor:
                    state === 'Disabled' ? 'var(--color-surface-sunken)' : 'var(--color-emphasis)',
                  color:
                    state === 'Disabled'
                      ? 'var(--color-text-disabled)'
                      : 'var(--color-on-emphasis)',
                  opacity: state === 'Disabled' ? 0.6 : 1,
                }}
              >
                {state === 'Loading' ? '...' : 'Button'}
              </div>
              <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                {state}
              </span>
            </div>
          ))}
        </div>
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
