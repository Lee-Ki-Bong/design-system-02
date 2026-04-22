'use client';

import { ThemeSplit } from '@/components/ThemeSplit';

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
  { id: 'opacity', title: 'Opacity', description: 'Disabled, Hover, Overlay' },
  { id: 'border-width', title: 'Border Width', description: 'Thin, Thick' },
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

const typeScale = [
  { name: 'Display', variable: '--font-size-display', sample: '디자인 시스템' },
  { name: 'H1', variable: '--font-size-h1', sample: '페이지 제목' },
  { name: 'H2', variable: '--font-size-h2', sample: '섹션 제목' },
  { name: 'H3', variable: '--font-size-h3', sample: '소제목 Heading' },
  { name: 'Body LG', variable: '--font-size-body-lg', sample: '본문 큰 텍스트 Large body text' },
  { name: 'Body', variable: '--font-size-body', sample: '기본 본문 텍스트 Default body text' },
  { name: 'Body SM', variable: '--font-size-body-sm', sample: '작은 본문 메타 정보 Small meta' },
  { name: 'Caption', variable: '--font-size-caption', sample: '캡션 텍스트 Caption text' },
  { name: 'Overline', variable: '--font-size-overline', sample: 'OVERLINE LABEL 오버라인' },
];

const fontWeights = [
  { name: 'Light', variable: '--font-weight-light', value: 300 },
  { name: 'Regular', variable: '--font-weight-regular', value: 400 },
  { name: 'Medium', variable: '--font-weight-medium', value: 500 },
  { name: 'SemiBold', variable: '--font-weight-semibold', value: 600 },
  { name: 'Bold', variable: '--font-weight-bold', value: 700 },
];

const lineHeights = [
  { name: 'Tight', variable: '--line-height-tight', desc: '1.15 — Display, Heading' },
  { name: 'Snug', variable: '--line-height-snug', desc: '1.3 — H2, H3, Caption' },
  { name: 'Body', variable: '--line-height-body', desc: '1.55 — 본문' },
  { name: 'Loose', variable: '--line-height-loose', desc: '1.7 — 여유 있는 본문' },
];

function TypographySection() {
  return (
    <section id="typography">
      <h2 className="text-xl font-bold" style={{ color: 'var(--color-emphasis)' }}>
        Typography
      </h2>
      <p className="mt-1 text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
        Font Family, Scale, Weight, Line Height, Letter Spacing
      </p>

      <h3 className="mt-8 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        Font Family
      </h3>
      <ThemeSplit>
        <div className="flex flex-col gap-4">
          <div>
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              Sans
            </span>
            <p
              className="mt-1"
              style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text)' }}
            >
              Pretendard 프리텐다드 0123456789
            </p>
          </div>
          <div>
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              Mono
            </span>
            <p
              className="mt-1"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text)' }}
            >
              monospace 코드 0123456789
            </p>
          </div>
        </div>
      </ThemeSplit>

      <h3 className="mt-8 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        Type Scale
      </h3>
      <ThemeSplit>
        <div className="flex flex-col gap-4">
          {typeScale.map((t) => (
            <div key={t.variable} className="flex items-baseline gap-4">
              <span
                className="shrink-0 w-20 text-xs"
                style={{ color: 'var(--color-text-disabled)' }}
              >
                {t.name}
              </span>
              <span
                style={{
                  fontSize: `var(${t.variable})`,
                  color: 'var(--color-text)',
                  lineHeight: 1.3,
                }}
              >
                {t.sample}
              </span>
            </div>
          ))}
        </div>
      </ThemeSplit>

      <h3 className="mt-8 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        Font Weight
      </h3>
      <ThemeSplit>
        <div className="flex flex-col gap-3">
          {fontWeights.map((w) => (
            <div key={w.variable} className="flex items-baseline gap-4">
              <span
                className="shrink-0 w-20 text-xs"
                style={{ color: 'var(--color-text-disabled)' }}
              >
                {w.value}
              </span>
              <span
                style={{
                  fontWeight: w.value,
                  color: 'var(--color-text)',
                  fontSize: 'var(--font-size-body-lg)',
                }}
              >
                {w.name} — 다람쥐 헌 쳇바퀴에 타고파
              </span>
            </div>
          ))}
        </div>
      </ThemeSplit>

      <h3 className="mt-8 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        Line Height
      </h3>
      <ThemeSplit>
        <div className="flex flex-col gap-6">
          {lineHeights.map((lh) => (
            <div key={lh.variable}>
              <span className="text-xs" style={{ color: 'var(--color-text-disabled)' }}>
                {lh.name} — {lh.desc}
              </span>
              <p
                className="mt-1 text-sm max-w-xs"
                style={{
                  color: 'var(--color-text)',
                  lineHeight: `var(${lh.variable})`,
                  backgroundColor: 'var(--color-surface-sunken)',
                  padding: 'var(--pad-sm)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                디자인 시스템은 일관된 UI를 만들기 위한 토큰과 컴포넌트의 집합입니다. Design systems
                provide consistent UI.
              </p>
            </div>
          ))}
        </div>
      </ThemeSplit>

      <h3 className="mt-8 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        Letter Spacing
      </h3>
      <ThemeSplit>
        <div className="flex flex-col gap-3">
          <div>
            <span className="text-xs" style={{ color: 'var(--color-text-disabled)' }}>
              Display/Heading — -0.025em ~ -0.01em (tight)
            </span>
            <p
              className="mt-1 text-xl font-bold"
              style={{ color: 'var(--color-text)', letterSpacing: '-0.025em' }}
            >
              타이트한 제목 Tight Heading
            </p>
          </div>
          <div>
            <span className="text-xs" style={{ color: 'var(--color-text-disabled)' }}>
              Body — 0 (normal)
            </span>
            <p className="mt-1 text-sm" style={{ color: 'var(--color-text)', letterSpacing: '0' }}>
              기본 본문 텍스트 Normal body text
            </p>
          </div>
          <div>
            <span className="text-xs" style={{ color: 'var(--color-text-disabled)' }}>
              Overline — 0.14em (wide)
            </span>
            <p
              className="mt-1 text-xs font-semibold uppercase"
              style={{ color: 'var(--color-text)', letterSpacing: '0.14em' }}
            >
              Wide Overline Label
            </p>
          </div>
        </div>
      </ThemeSplit>
    </section>
  );
}

const spaceScale = [
  { name: '1', variable: '--space-1' },
  { name: '2', variable: '--space-2' },
  { name: '3', variable: '--space-3' },
  { name: '4', variable: '--space-4' },
  { name: '5', variable: '--space-5' },
  { name: '6', variable: '--space-6' },
  { name: '7', variable: '--space-7' },
  { name: '8', variable: '--space-8' },
  { name: '10', variable: '--space-10' },
  { name: '12', variable: '--space-12' },
  { name: '16', variable: '--space-16' },
  { name: '20', variable: '--space-20' },
  { name: '24', variable: '--space-24' },
];

const gapScale = [
  { name: 'xs', variable: '--gap-xs', value: '4px' },
  { name: 'sm', variable: '--gap-sm', value: '8px' },
  { name: 'md', variable: '--gap-md', value: '12px' },
  { name: 'lg', variable: '--gap-lg', value: '16px' },
  { name: 'xl', variable: '--gap-xl', value: '20px' },
  { name: '2xl', variable: '--gap-2xl', value: '24px' },
  { name: '3xl', variable: '--gap-3xl', value: '32px' },
];

const padScale = [
  { name: 'xs', variable: '--pad-xs', value: '6px' },
  { name: 'sm', variable: '--pad-sm', value: '10px' },
  { name: 'md', variable: '--pad-md', value: '14px' },
  { name: 'lg', variable: '--pad-lg', value: '18px' },
  { name: 'xl', variable: '--pad-xl', value: '22px' },
  { name: '2xl', variable: '--pad-2xl', value: '28px' },
  { name: '3xl', variable: '--pad-3xl', value: '40px' },
];

const heightScale = [
  { name: 'xs', variable: '--height-xs', value: '28px', desc: 'small badge, icon button' },
  { name: 'sm', variable: '--height-sm', value: '36px', desc: 'small button' },
  { name: 'md', variable: '--height-md', value: '44px', desc: 'default button, nav item' },
  { name: 'lg', variable: '--height-lg', value: '48px', desc: 'input, select' },
  { name: 'xl', variable: '--height-xl', value: '52px', desc: 'large button' },
];

function SpacingSection() {
  return (
    <section id="spacing">
      <h2 className="text-xl font-bold" style={{ color: 'var(--color-emphasis)' }}>
        Spacing & Sizing
      </h2>
      <p className="mt-1 text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
        Space Scale, Gap, Padding, Component Height, Layout
      </p>

      <h3 className="mt-8 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        Space Scale
      </h3>
      <div
        className="mt-4 rounded-2xl p-6"
        style={{
          backgroundColor: 'var(--color-surface-raised)',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <div className="flex flex-col gap-2">
          {spaceScale.map((s) => (
            <div key={s.variable} className="flex items-center gap-4">
              <span
                className="shrink-0 w-12 text-xs text-right"
                style={{ color: 'var(--color-text-disabled)' }}
              >
                {s.name}
              </span>
              <div
                className="h-3 rounded-sm"
                style={{
                  width: `var(${s.variable})`,
                  backgroundColor: 'var(--color-primary)',
                  minWidth: '2px',
                }}
              />
              <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                {s.variable}
              </span>
            </div>
          ))}
        </div>
      </div>

      <h3 className="mt-8 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        Gap
      </h3>
      <div
        className="mt-4 rounded-2xl p-6"
        style={{
          backgroundColor: 'var(--color-surface-raised)',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <div className="flex flex-col gap-2">
          {gapScale.map((g) => (
            <div key={g.variable} className="flex items-center gap-4">
              <span
                className="shrink-0 w-12 text-xs text-right"
                style={{ color: 'var(--color-text-disabled)' }}
              >
                {g.name}
              </span>
              <div className="flex" style={{ gap: `var(${g.variable})` }}>
                <div
                  className="h-6 w-6 rounded-sm"
                  style={{ backgroundColor: 'var(--color-primary-subtle)' }}
                />
                <div
                  className="h-6 w-6 rounded-sm"
                  style={{ backgroundColor: 'var(--color-primary-subtle)' }}
                />
                <div
                  className="h-6 w-6 rounded-sm"
                  style={{ backgroundColor: 'var(--color-primary-subtle)' }}
                />
              </div>
              <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                {g.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <h3 className="mt-8 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        Padding
      </h3>
      <div
        className="mt-4 rounded-2xl p-6"
        style={{
          backgroundColor: 'var(--color-surface-raised)',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <div className="flex flex-wrap gap-4">
          {padScale.map((p) => (
            <div key={p.variable} className="flex flex-col items-center gap-2">
              <div
                className="rounded-lg"
                style={{
                  padding: `var(${p.variable})`,
                  backgroundColor: 'var(--color-primary-subtle)',
                }}
              >
                <div
                  className="h-4 w-4 rounded-sm"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                />
              </div>
              <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
                {p.name}
              </span>
              <span className="text-xs" style={{ color: 'var(--color-text-disabled)' }}>
                {p.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <h3 className="mt-8 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        Component Height
      </h3>
      <div
        className="mt-4 rounded-2xl p-6"
        style={{
          backgroundColor: 'var(--color-surface-raised)',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <div className="flex flex-col gap-3">
          {heightScale.map((h) => (
            <div key={h.variable} className="flex items-center gap-4">
              <span
                className="shrink-0 w-12 text-xs text-right"
                style={{ color: 'var(--color-text-disabled)' }}
              >
                {h.name}
              </span>
              <div
                className="rounded-lg flex items-center px-4"
                style={{
                  height: `var(${h.variable})`,
                  backgroundColor: 'var(--color-surface-sunken)',
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  {h.value} — {h.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3 className="mt-8 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        Layout
      </h3>
      <div
        className="mt-4 rounded-2xl p-6"
        style={{
          backgroundColor: 'var(--color-surface-raised)',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <span className="shrink-0 w-28 text-xs" style={{ color: 'var(--color-text-disabled)' }}>
              --container-max
            </span>
            <span className="text-sm" style={{ color: 'var(--color-text)' }}>
              1240px
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="shrink-0 w-28 text-xs" style={{ color: 'var(--color-text-disabled)' }}>
              --gutter
            </span>
            <span className="text-sm" style={{ color: 'var(--color-text)' }}>
              40px (반응형: 16~40px)
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="shrink-0 w-28 text-xs" style={{ color: 'var(--color-text-disabled)' }}>
              --grid-columns
            </span>
            <span className="text-sm" style={{ color: 'var(--color-text)' }}>
              12
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

const radiusScale = [
  { name: 'xs', variable: '--radius-xs', value: '6px' },
  { name: 'sm', variable: '--radius-sm', value: '10px' },
  { name: 'md', variable: '--radius-md', value: '14px' },
  { name: 'lg', variable: '--radius-lg', value: '20px' },
  { name: 'xl', variable: '--radius-xl', value: '28px' },
  { name: '2xl', variable: '--radius-2xl', value: '32px' },
  { name: '3xl', variable: '--radius-3xl', value: '40px' },
  { name: 'full', variable: '--radius-full', value: '9999px' },
];

const shadowScale = [
  { name: 'xs', variable: '--shadow-xs' },
  { name: 'sm', variable: '--shadow-sm' },
  { name: 'md', variable: '--shadow-md' },
  { name: 'lg', variable: '--shadow-lg' },
  { name: 'xl', variable: '--shadow-xl' },
  { name: '2xl', variable: '--shadow-2xl' },
];

function ShapeSection() {
  return (
    <section id="shape">
      <h2 className="text-xl font-bold" style={{ color: 'var(--color-emphasis)' }}>
        Shape
      </h2>
      <p className="mt-1 text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
        Radius, Shadow
      </p>

      <h3 className="mt-8 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        Radius
      </h3>
      <div
        className="mt-4 rounded-2xl p-6"
        style={{
          backgroundColor: 'var(--color-surface-raised)',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <div className="flex flex-wrap gap-6">
          {radiusScale.map((r) => (
            <div key={r.variable} className="flex flex-col items-center gap-2">
              <div
                className="h-16 w-16"
                style={{
                  borderRadius: `var(${r.variable})`,
                  backgroundColor: 'var(--color-primary-subtle)',
                  border: '2px solid var(--color-primary)',
                }}
              />
              <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
                {r.name}
              </span>
              <span className="text-xs" style={{ color: 'var(--color-text-disabled)' }}>
                {r.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <h3 className="mt-8 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        Shadow
      </h3>
      <ThemeSplit>
        <div className="flex flex-wrap gap-6">
          {shadowScale.map((s) => (
            <div key={s.variable} className="flex flex-col items-center gap-2">
              <div
                className="h-16 w-16 rounded-xl"
                style={{
                  backgroundColor: 'var(--color-surface-raised)',
                  boxShadow: `var(${s.variable})`,
                }}
              />
              <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </ThemeSplit>
    </section>
  );
}

function MotionSection() {
  return (
    <section id="motion">
      <h2 className="text-xl font-bold" style={{ color: 'var(--color-emphasis)' }}>
        Motion
      </h2>
      <p className="mt-1 text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
        Transition Duration, Easing, Keyframes
      </p>

      <h3 className="mt-8 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        Transition
      </h3>
      <div
        className="mt-4 rounded-2xl p-6"
        style={{
          backgroundColor: 'var(--color-surface-raised)',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <p className="text-xs mb-4" style={{ color: 'var(--color-text-tertiary)' }}>
          Easing: cubic-bezier(0.2, 0, 0, 1) — 호버하면 transition 확인
        </p>
        <div className="flex flex-col gap-4">
          {[
            { name: 'Fast', variable: '--token-transition-fast', value: '150ms' },
            { name: 'Default', variable: '--token-transition', value: '220ms' },
            { name: 'Slow', variable: '--token-transition-slow', value: '360ms' },
          ].map((t) => (
            <div key={t.variable} className="flex items-center gap-4">
              <span
                className="shrink-0 w-16 text-xs"
                style={{ color: 'var(--color-text-disabled)' }}
              >
                {t.name}
              </span>
              <div
                className="h-10 w-10 rounded-lg cursor-pointer"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  transition: `var(${t.variable})`,
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = 'scale(1.3)';
                  (e.target as HTMLElement).style.backgroundColor = 'var(--color-emphasis)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = 'scale(1)';
                  (e.target as HTMLElement).style.backgroundColor = 'var(--color-primary)';
                }}
              />
              <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                {t.value} — {t.variable}
              </span>
            </div>
          ))}
        </div>
      </div>

      <h3 className="mt-8 text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        Keyframes
      </h3>
      <div
        className="mt-4 rounded-2xl p-6"
        style={{
          backgroundColor: 'var(--color-surface-raised)',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <p className="text-xs mb-4" style={{ color: 'var(--color-text-tertiary)' }}>
          클릭하면 애니메이션 재생
        </p>
        <div className="flex flex-wrap gap-6">
          {[
            { name: 'fadeIn', animation: 'fadeIn 0.5s ease' },
            { name: 'fadeInUp', animation: 'fadeInUp 0.5s ease' },
            { name: 'fadeInScale', animation: 'fadeInScale 0.5s ease' },
            { name: 'spin', animation: 'spin 1s linear infinite' },
            { name: 'pulse', animation: 'pulse 2s ease-in-out infinite' },
          ].map((k) => (
            <div key={k.name} className="flex flex-col items-center gap-2">
              <div
                className="h-12 w-12 rounded-lg cursor-pointer"
                style={{ backgroundColor: 'var(--color-primary)' }}
                onClick={(e) => {
                  const el = e.target as HTMLElement;
                  el.style.animation = 'none';
                  void el.offsetHeight;
                  el.style.animation = k.animation;
                }}
              />
              <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
                {k.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const zindexScale = [
  { name: 'base', variable: '--z-base', value: 0 },
  { name: 'dropdown', variable: '--z-dropdown', value: 10 },
  { name: 'sticky', variable: '--z-sticky', value: 20 },
  { name: 'overlay', variable: '--z-overlay', value: 30 },
  { name: 'modal', variable: '--z-modal', value: 40 },
  { name: 'toast', variable: '--z-toast', value: 50 },
];

function ZindexSection() {
  return (
    <section id="zindex">
      <h2 className="text-xl font-bold" style={{ color: 'var(--color-emphasis)' }}>
        Z-index
      </h2>
      <p className="mt-1 text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
        Layer Stack
      </p>

      <div
        className="mt-4 rounded-2xl p-6"
        style={{
          backgroundColor: 'var(--color-surface-raised)',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <div className="relative h-72">
          {zindexScale.map((z, i) => (
            <div
              key={z.variable}
              className="absolute rounded-xl flex items-center px-4"
              style={{
                left: `${i * 20}px`,
                bottom: `${i * 36}px`,
                width: `${220 - i * 16}px`,
                height: '48px',
                backgroundColor:
                  i === 0 ? 'var(--color-surface-sunken)' : 'var(--color-surface-raised)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-md)',
                zIndex: z.value,
              }}
            >
              <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
                {z.name}
              </span>
              <span className="ml-auto text-xs" style={{ color: 'var(--color-text-disabled)' }}>
                {z.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const opacityScale = [
  { name: 'disabled', variable: '--opacity-disabled', value: '0.4', desc: 'disabled 상태' },
  { name: 'overlay', variable: '--opacity-overlay', value: '0.6', desc: 'modal backdrop' },
  { name: 'pressed', variable: '--opacity-pressed', value: '0.65', desc: 'active/pressed' },
  { name: 'hover', variable: '--opacity-hover', value: '0.75', desc: '일반 hover' },
  {
    name: 'hover-subtle',
    variable: '--opacity-hover-subtle',
    value: '0.85',
    desc: 'emphasis hover',
  },
];

const borderWidthScale = [
  { name: 'thin', variable: '--border-width-thin', value: '1px', desc: '카드, 구분선, 패널' },
  { name: 'thick', variable: '--border-width-thick', value: '2px', desc: 'focus, active, spinner' },
];

function OpacitySection() {
  return (
    <section id="opacity">
      <h2 className="text-xl font-bold" style={{ color: 'var(--color-emphasis)' }}>
        Opacity
      </h2>
      <p className="mt-1 text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
        Disabled, Hover, Overlay
      </p>

      <div
        className="mt-4 rounded-2xl p-6"
        style={{
          backgroundColor: 'var(--color-surface-raised)',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <div className="flex flex-col gap-4">
          {opacityScale.map((o) => (
            <div key={o.variable} className="flex items-center gap-4">
              <span
                className="shrink-0 w-24 text-xs text-right"
                style={{ color: 'var(--color-text-disabled)' }}
              >
                {o.name}
              </span>
              <div className="relative h-8 w-32 rounded-lg overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'repeating-conic-gradient(var(--color-border) 0% 25%, var(--color-surface-raised) 0% 50%) 0 0 / 12px 12px',
                  }}
                />
                <div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    backgroundColor: 'var(--color-emphasis)',
                    opacity: `var(${o.variable})`,
                  }}
                />
              </div>
              <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
                {o.value}
              </span>
              <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                {o.variable}
              </span>
              <span className="text-xs" style={{ color: 'var(--color-text-disabled)' }}>
                {o.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BorderWidthSection() {
  return (
    <section id="border-width">
      <h2 className="text-xl font-bold" style={{ color: 'var(--color-emphasis)' }}>
        Border Width
      </h2>
      <p className="mt-1 text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
        Thin, Thick
      </p>

      <div
        className="mt-4 rounded-2xl p-6"
        style={{
          backgroundColor: 'var(--color-surface-raised)',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <div className="flex flex-col gap-4">
          {borderWidthScale.map((b) => (
            <div key={b.variable} className="flex items-center gap-4">
              <span
                className="shrink-0 w-24 text-xs text-right"
                style={{ color: 'var(--color-text-disabled)' }}
              >
                {b.name}
              </span>
              <div
                className="h-8 w-32 rounded-lg"
                style={{
                  border: `var(${b.variable}) solid var(--color-emphasis)`,
                  backgroundColor: 'var(--color-surface-sunken)',
                }}
              />
              <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
                {b.value}
              </span>
              <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                {b.variable}
              </span>
              <span className="text-xs" style={{ color: 'var(--color-text-disabled)' }}>
                {b.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function TokensPage() {
  return (
    <div className="flex gap-12">
      <div className="flex-1 flex flex-col gap-16">
        <ColorSection />
        <TypographySection />
        <SpacingSection />
        <ShapeSection />
        <MotionSection />
        <ZindexSection />
        <OpacitySection />
        <BorderWidthSection />
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
