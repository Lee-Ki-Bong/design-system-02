'use client';

import { Divider } from '@/components/atoms/Divider';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
  },
  {
    name: 'variant',
    type: "'subtle' | 'strong'",
    default: "'subtle'",
  },
  { name: 'label', type: 'string', default: '-' },
];

const tokens = ['--color-border-subtle', '--color-border', '--color-text-tertiary', '--gap-md'];

export default function DividerPage() {
  return (
    <AtomDocPage
      name="Divider"
      description="콘텐츠 영역을 시각적으로 구분하는 수평·수직 구분선."
      props={props}
      tokens={tokens}
    >
      <DocSection title="Horizontal">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-4" style={{ maxWidth: 400 }}>
            <div>
              <span className="mb-2 block text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                subtle (default)
              </span>
              <Divider />
            </div>
            <div>
              <span className="mb-2 block text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                strong
              </span>
              <Divider variant="strong" />
            </div>
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="With Label">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-4" style={{ maxWidth: 400 }}>
            <Divider label="또는" />
            <Divider label="Section" />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Vertical">
        <ThemeSplit cols={1}>
          <div
            className="flex items-center text-sm"
            style={{ gap: 'var(--gap-md)', color: 'var(--color-text)' }}
          >
            <span>항목 A</span>
            <Divider orientation="vertical" variant="strong" />
            <span>항목 B</span>
            <Divider orientation="vertical" variant="strong" />
            <span>항목 C</span>
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="In Card">
        <ThemeSplit cols={1}>
          <div
            className="overflow-hidden rounded-2xl"
            style={{
              backgroundColor: 'var(--color-surface-raised)',
              boxShadow: 'var(--shadow-sm)',
              padding: '18px',
              maxWidth: 400,
            }}
          >
            {[
              { title: '프로젝트 이름', meta: 'Bong Design System v2' },
              { title: '생성일', meta: '2024-01-15' },
              { title: '멤버', meta: '12명' },
            ].map((item, i) => (
              <div key={item.title}>
                {i > 0 && <Divider style={{ margin: '0' }} />}
                <div style={{ padding: '12px 0' }}>
                  <div className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                    {item.title}
                  </div>
                  <div className="mt-0.5 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                    {item.meta}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
