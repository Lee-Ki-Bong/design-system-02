'use client';

import { Breadcrumb } from '@/components/molecules/Breadcrumb';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  {
    name: 'items',
    type: 'BreadcrumbItem[]',
    default: '-',
  },
  {
    name: 'separator',
    type: 'ReactNode',
    default: "'/'",
  },
];

const tokens = [
  '--color-text',
  '--color-text-secondary',
  '--color-text-tertiary',
  '--color-text-disabled',
  '--color-surface',
  '--radius-md',
  '--font-size-body-sm',
  '--font-size-caption',
  '--font-weight-medium',
  '--font-weight-semibold',
  '--token-transition-fast',
];

export default function BreadcrumbPage() {
  return (
    <AtomDocPage
      name="Breadcrumb"
      description="현재 페이지의 계층 위치를 보여주는 네비게이션 보조 요소."
      props={props}
      tokens={tokens}
      category="Molecules"
      categoryHref="/docs/molecules"
    >
      <DocSection title="Preview">
        <ThemeSplit cols={1}>
          <Breadcrumb
            items={[
              { label: '홈', href: '#' },
              { label: '프로젝트', href: '#' },
              { label: 'Bong Design System', href: '#' },
              { label: '설정' },
            ]}
          />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Short Path">
        <ThemeSplit cols={1}>
          <Breadcrumb
            items={[
              { label: '대시보드', href: '#' },
              { label: 'Customer Journeys', href: '#' },
              { label: 'New Case Management' },
            ]}
          />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Custom Separator">
        <ThemeSplit cols={1}>
          <Breadcrumb
            separator="›"
            items={[
              { label: '홈', href: '#' },
              { label: '카테고리', href: '#' },
              { label: '상세' },
            ]}
          />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Single Item">
        <ThemeSplit cols={1}>
          <Breadcrumb items={[{ label: '홈' }]} />
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
