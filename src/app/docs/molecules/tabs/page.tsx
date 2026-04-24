'use client';

import { useState } from 'react';
import { Tabs } from '@/components/molecules/Tabs';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'items', type: 'TabItem[]', default: '-' },
  { name: 'value', type: 'string', default: '-' },
  { name: 'onChange', type: '(value: string) => void', default: '-' },
  { name: 'variant', type: "'pill' | 'underline'", default: "'pill'" },
];

const tokens = [
  '--color-surface-raised',
  '--color-emphasis',
  '--color-on-emphasis',
  '--color-text',
  '--color-text-secondary',
  '--color-border',
  '--radius-full',
  '--shadow-sm',
  '--font-size-body-sm',
  '--font-weight-medium',
  '--font-sans',
  '--token-transition',
];

const sampleItems = [
  { label: 'Warehouse', value: 'warehouse' },
  { label: 'Analytics', value: 'analytics' },
  { label: 'Robot', value: 'robot' },
  { label: 'Pick Rates', value: 'pick-rates' },
  { label: 'Employees', value: 'employees' },
];

const shortItems = [
  { label: 'Overview', value: 'overview' },
  { label: 'Relationship', value: 'relationship' },
  { label: 'Cases', value: 'cases' },
  { label: 'Reports', value: 'reports' },
];

function PillDemo() {
  const [value, setValue] = useState('warehouse');
  return <Tabs items={sampleItems} value={value} onChange={setValue} />;
}

function UnderlineDemo() {
  const [value, setValue] = useState('overview');
  return <Tabs items={shortItems} value={value} onChange={setValue} variant="underline" />;
}

export default function TabsPage() {
  return (
    <AtomDocPage
      name="Tabs"
      description="콘텐츠 영역을 전환하는 탭 네비게이션. Pill과 Underline 두 가지 variant를 지원한다."
      props={props}
      tokens={tokens}
      category="Molecules"
      categoryHref="/docs/molecules"
    >
      <DocSection title="Pill Variant">
        <ThemeSplit cols={1}>
          <PillDemo />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Underline Variant">
        <ThemeSplit cols={1}>
          <UnderlineDemo />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Keyboard Navigation">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-3">
            <PillDemo />
            <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
              Arrow Left/Right, Home, End 키로 탭 간 이동
            </p>
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
