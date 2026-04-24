'use client';

import { useState } from 'react';
import { Pagination } from '@/components/molecules/Pagination';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'current', type: 'number', default: '-' },
  { name: 'total', type: 'number', default: '-' },
  { name: 'onPageChange', type: '(page: number) => void', default: '-' },
  { name: 'siblings', type: 'number', default: '1' },
];

const tokens = [
  '--color-text-secondary',
  '--color-text-disabled',
  '--color-emphasis',
  '--color-on-emphasis',
  '--color-surface',
  '--radius-md',
  '--shadow-xs',
  '--font-size-body-sm',
  '--font-weight-medium',
  '--font-sans',
  '--token-transition-fast',
];

function InteractiveDemo() {
  const [page, setPage] = useState(1);
  return (
    <div className="flex flex-col items-start gap-3">
      <Pagination current={page} total={12} onPageChange={setPage} />
      <span className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
        현재 페이지: {page}
      </span>
    </div>
  );
}

export default function PaginationPage() {
  return (
    <AtomDocPage
      name="Pagination"
      description="페이지 목록 간 이동을 위한 네비게이션 컨트롤."
      props={props}
      tokens={tokens}
      category="Molecules"
      categoryHref="/docs/molecules"
    >
      <DocSection title="Preview">
        <ThemeSplit cols={1}>
          <Pagination current={1} total={12} />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Middle Page">
        <ThemeSplit cols={1}>
          <Pagination current={6} total={12} />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Last Page">
        <ThemeSplit cols={1}>
          <Pagination current={12} total={12} />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Few Pages">
        <ThemeSplit cols={1}>
          <Pagination current={2} total={3} />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Interactive Demo">
        <ThemeSplit cols={1}>
          <InteractiveDemo />
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
