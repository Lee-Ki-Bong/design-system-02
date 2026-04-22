const sections = [
  {
    id: 'color',
    title: 'Color',
    description: 'Emphasis, Primary, Surface, Text, Status, Border, Semantic',
  },
  { id: 'typography', title: 'Typography', description: 'Scale, Weight, Line Height' },
  {
    id: 'spacing',
    title: 'Spacing & Sizing',
    description: 'Space Scale, Gap, Padding, Component Height',
  },
  { id: 'shape', title: 'Shape', description: 'Radius, Shadow' },
  { id: 'motion', title: 'Motion', description: 'Duration, Easing' },
  { id: 'zindex', title: 'Z-index', description: 'Layer Stack' },
];

function ColorSwatch({ name, variable }: { name: string; variable: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="h-14 w-14 rounded-xl"
        style={{
          backgroundColor: `var(${variable})`,
          border: '1px solid var(--color-border-subtle)',
        }}
      />
      <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
        {name}
      </span>
      <span className="text-xs" style={{ color: 'var(--color-text-disabled)' }}>
        {variable}
      </span>
    </div>
  );
}

function ThemeSplit({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-4 grid grid-cols-2 gap-0 overflow-hidden rounded-2xl"
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

function ColorSection() {
  return (
    <section id="color">
      <h2 className="text-xl font-bold" style={{ color: 'var(--color-emphasis)' }}>
        Color
      </h2>
      <p className="mt-1 text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
        Emphasis, Primary, Surface, Text, Status, Border, Semantic
      </p>

      <h3 className="mt-8 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        Emphasis
      </h3>
      <ThemeSplit>
        <div className="flex gap-6">
          <ColorSwatch name="Base" variable="--color-emphasis" />
          <ColorSwatch name="Hover" variable="--color-emphasis-hover" />
          <ColorSwatch name="Active" variable="--color-emphasis-active" />
          <ColorSwatch name="On" variable="--color-on-emphasis" />
        </div>
      </ThemeSplit>

      <h3 className="mt-8 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        Primary
      </h3>
      <ThemeSplit>
        <div className="flex gap-6">
          <ColorSwatch name="Base" variable="--color-primary" />
          <ColorSwatch name="Hover" variable="--color-primary-hover" />
          <ColorSwatch name="Active" variable="--color-primary-active" />
          <ColorSwatch name="Subtle" variable="--color-primary-subtle" />
        </div>
      </ThemeSplit>

      <h3 className="mt-8 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        Surface
      </h3>
      <ThemeSplit>
        <div className="flex gap-6">
          <ColorSwatch name="BG" variable="--color-bg" />
          <ColorSwatch name="Surface" variable="--color-surface" />
          <ColorSwatch name="Raised" variable="--color-surface-raised" />
          <ColorSwatch name="Sunken" variable="--color-surface-sunken" />
        </div>
      </ThemeSplit>

      <h3 className="mt-8 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        Text
      </h3>
      <ThemeSplit>
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
            Text — 기본 본문 텍스트
          </span>
          <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Secondary — 보조 설명
          </span>
          <span className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
            Tertiary — 힌트, 캡션
          </span>
          <span className="text-sm" style={{ color: 'var(--color-text-disabled)' }}>
            Disabled — 비활성
          </span>
        </div>
      </ThemeSplit>

      <h3 className="mt-8 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        Status
      </h3>
      <ThemeSplit>
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-2">
            <div
              className="h-14 w-14 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-success-bg)' }}
            >
              <div
                className="h-6 w-6 rounded-full"
                style={{ backgroundColor: 'var(--color-success)' }}
              />
            </div>
            <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
              Success
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="h-14 w-14 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-warning-bg)' }}
            >
              <div
                className="h-6 w-6 rounded-full"
                style={{ backgroundColor: 'var(--color-warning)' }}
              />
            </div>
            <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
              Warning
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="h-14 w-14 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-error-bg)' }}
            >
              <div
                className="h-6 w-6 rounded-full"
                style={{ backgroundColor: 'var(--color-error)' }}
              />
            </div>
            <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
              Error
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="h-14 w-14 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-info-bg)' }}
            >
              <div
                className="h-6 w-6 rounded-full"
                style={{ backgroundColor: 'var(--color-info)' }}
              />
            </div>
            <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
              Info
            </span>
          </div>
        </div>
      </ThemeSplit>

      <h3 className="mt-8 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        Border
      </h3>
      <ThemeSplit>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="h-0 flex-1" style={{ borderTop: '1px solid var(--color-border)' }} />
            <span className="text-xs shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>
              border
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="h-0 flex-1"
              style={{ borderTop: '1px solid var(--color-border-subtle)' }}
            />
            <span className="text-xs shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>
              subtle
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="h-0 flex-1"
              style={{ borderTop: '1px solid var(--color-border-strong)' }}
            />
            <span className="text-xs shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>
              strong
            </span>
          </div>
        </div>
      </ThemeSplit>

      <h3 className="mt-8 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        Semantic
      </h3>
      <ThemeSplit>
        <div className="flex gap-6">
          <ColorSwatch name="Interactive" variable="--color-interactive" />
          <ColorSwatch name="Destructive" variable="--color-destructive" />
          <ColorSwatch name="Destruct BG" variable="--color-destructive-bg" />
          <ColorSwatch name="On Surface" variable="--color-on-surface" />
        </div>
      </ThemeSplit>

      <h3 className="mt-8 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        Avatar / Decorative Accents
      </h3>
      <ThemeSplit>
        <div className="flex gap-6">
          <ColorSwatch name="Blue" variable="--accent-blue" />
          <ColorSwatch name="Rose" variable="--accent-rose" />
          <ColorSwatch name="Amber" variable="--accent-amber" />
          <ColorSwatch name="Teal" variable="--accent-teal" />
          <ColorSwatch name="Violet" variable="--accent-violet" />
        </div>
      </ThemeSplit>

      <h3 className="mt-8 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        Overlay & Focus Ring
      </h3>
      <ThemeSplit>
        <div className="flex gap-8">
          <div className="flex flex-col items-center gap-2">
            <div
              className="h-14 w-14 rounded-xl"
              style={{ backgroundColor: 'var(--color-overlay)' }}
            />
            <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
              Overlay
            </span>
            <span className="text-xs" style={{ color: 'var(--color-text-disabled)' }}>
              --color-overlay
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="h-14 w-14 rounded-xl"
              style={{
                backgroundColor: 'var(--color-surface-raised)',
                border: '1px solid var(--color-border-subtle)',
                boxShadow: 'var(--ring)',
              }}
            />
            <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
              Ring
            </span>
            <span className="text-xs" style={{ color: 'var(--color-text-disabled)' }}>
              --ring
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="h-14 w-14 rounded-xl"
              style={{
                backgroundColor: 'var(--color-surface-raised)',
                border: '1px solid var(--color-border-subtle)',
                boxShadow: 'var(--ring-emphasis)',
              }}
            />
            <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
              Ring Emphasis
            </span>
            <span className="text-xs" style={{ color: 'var(--color-text-disabled)' }}>
              --ring-emphasis
            </span>
          </div>
        </div>
      </ThemeSplit>
    </section>
  );
}

function PlaceholderSection({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) {
  return (
    <section id={id}>
      <h2 className="text-xl font-bold" style={{ color: 'var(--color-emphasis)' }}>
        {title}
      </h2>
      <p className="mt-1 text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
        {description}
      </p>
      <div
        className="mt-4 rounded-2xl p-8"
        style={{
          backgroundColor: 'var(--color-surface-raised)',
          border: '1px solid var(--color-border-subtle)',
          minHeight: '200px',
        }}
      >
        <span className="text-sm" style={{ color: 'var(--color-text-disabled)' }}>
          {title} preview
        </span>
      </div>
    </section>
  );
}

export default function TokensPage() {
  return (
    <div className="flex gap-12">
      <div className="flex-1 flex flex-col gap-16">
        <ColorSection />
        {sections.slice(1).map((s) => (
          <PlaceholderSection key={s.id} id={s.id} title={s.title} description={s.description} />
        ))}
      </div>

      <nav className="hidden xl:block w-40 shrink-0 sticky top-8 self-start">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          On this page
        </p>
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="block py-1 text-sm transition-colors hover:opacity-75"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {s.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
