'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/organisms/Sidebar';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'brand', type: 'SidebarBrand', default: '-' },
  { name: 'sections', type: 'SidebarSection[]', default: '[]' },
  { name: 'activePath', type: 'string', default: "''" },
  { name: 'width', type: 'number', default: '240' },
  { name: 'onNavigate', type: '(href: string) => void', default: '-' },
];

const tokens = [
  '--color-surface-raised',
  '--color-surface',
  '--color-surface-sunken',
  '--color-emphasis',
  '--color-on-emphasis',
  '--color-text',
  '--color-text-secondary',
  '--color-text-tertiary',
  '--color-border-subtle',
  '--shadow-md',
  '--radius-sm',
  '--radius-md',
  '--radius-lg',
  '--radius-2xl',
  '--gap-sm',
  '--gap-md',
  '--gap-lg',
  '--pad-xs',
  '--pad-sm',
  '--pad-md',
  '--font-size-overline',
  '--font-size-body',
  '--font-size-body-sm',
  '--font-size-caption',
  '--font-weight-medium',
  '--font-weight-semibold',
  '--font-weight-bold',
  '--opacity-disabled',
];

const sampleSections = [
  {
    title: 'Components',
    items: [
      { label: 'Design Tokens', href: '/tokens' },
      {
        label: 'Atoms',
        href: '/atoms',
        children: [
          { label: 'Button', href: '/atoms/button' },
          { label: 'Input', href: '/atoms/input' },
          { label: 'Select', href: '/atoms/select' },
          { label: 'Badge', href: '/atoms/badge' },
        ],
      },
      {
        label: 'Molecules',
        href: '/molecules',
        children: [
          { label: 'Card', href: '/molecules/card' },
          { label: 'Modal', href: '/molecules/modal' },
          { label: 'Toast', href: '/molecules/toast' },
        ],
      },
    ],
  },
];

const sampleSectionsMulti = [
  {
    title: 'Main',
    items: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Analytics', href: '/analytics' },
      {
        label: 'Reports',
        href: '/reports',
        children: [
          { label: 'Monthly', href: '/reports/monthly' },
          { label: 'Annual', href: '/reports/annual' },
        ],
      },
    ],
  },
  {
    title: 'Settings',
    items: [
      { label: 'Profile', href: '/settings/profile' },
      { label: 'Notifications', href: '/settings/notifications' },
    ],
  },
];

function DemoBasic() {
  const [active, setActive] = useState('/atoms');
  return (
    <div
      style={{
        height: 420,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 'var(--radius-xl)',
      }}
    >
      <Sidebar
        brand={{ logo: 'B', name: 'Whitebong UI', href: '/' }}
        sections={sampleSections}
        activePath={active}
        onNavigate={setActive}
        style={{ position: 'relative', height: '100%', borderRadius: 'var(--radius-xl)' }}
      />
    </div>
  );
}

function DemoMultiSection() {
  const [active, setActive] = useState('/reports/monthly');
  return (
    <div
      style={{
        height: 420,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 'var(--radius-xl)',
      }}
    >
      <Sidebar
        brand={{ logo: 'A', name: 'Admin Panel', href: '/' }}
        sections={sampleSectionsMulti}
        activePath={active}
        onNavigate={setActive}
        style={{ position: 'relative', height: '100%', borderRadius: 'var(--radius-xl)' }}
      />
    </div>
  );
}

function DemoNoBrand() {
  const [active, setActive] = useState('/settings/profile');
  return (
    <div
      style={{
        height: 320,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 'var(--radius-xl)',
      }}
    >
      <Sidebar
        sections={sampleSectionsMulti}
        activePath={active}
        onNavigate={setActive}
        style={{ position: 'relative', height: '100%', borderRadius: 'var(--radius-xl)' }}
      />
    </div>
  );
}

export default function SidebarPage() {
  return (
    <AtomDocPage
      name="Sidebar"
      description="브랜드 + 섹션 + 계층형 네비게이션을 제공하는 사이드바 Organism. 접기/펼치기 애니메이션을 포함합니다."
      props={props}
      tokens={tokens}
      category="Organisms"
      categoryHref="/docs/organisms"
    >
      <DocSection title="Basic (클릭하여 활성 항목 변경)">
        <ThemeSplit>
          <DemoBasic />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Multi Section">
        <ThemeSplit>
          <DemoMultiSection />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Without Brand">
        <ThemeSplit>
          <DemoNoBrand />
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
