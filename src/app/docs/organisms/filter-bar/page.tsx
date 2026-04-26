'use client';

import { useState } from 'react';
import { FilterBar } from '@/components/organisms/FilterBar';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const chips = [
  { label: '전체', value: 'all' },
  { label: '활성', value: 'active' },
  { label: '자리비움', value: 'away' },
  { label: '오프라인', value: 'offline' },
];

const props = [
  { name: 'chips', type: 'FilterChip[]', default: '-' },
  { name: 'activeChip', type: 'string', default: '-' },
  { name: 'onChipChange', type: '(value: string) => void', default: '-' },
  { name: 'activeFilters', type: 'ActiveFilter[]', default: '[]' },
  { name: 'onFilterRemove', type: '(value: string) => void', default: '-' },
  { name: 'searchValue', type: 'string', default: '-' },
  { name: 'onSearchChange', type: '(value: string) => void', default: '-' },
  { name: 'searchPlaceholder', type: 'string', default: "'검색...'" },
  { name: 'resultCount', type: 'number', default: '-' },
];

const tokens = [
  '--color-surface-raised',
  '--color-surface',
  '--color-surface-sunken',
  '--color-text',
  '--color-text-secondary',
  '--color-text-tertiary',
  '--color-border',
  '--color-emphasis',
  '--color-on-emphasis',
  '--color-primary',
  '--color-primary-subtle',
  '--radius-full',
  '--shadow-sm',
  '--height-sm',
  '--height-xs',
  '--font-size-body-sm',
  '--font-size-caption',
  '--font-weight-medium',
  '--token-transition-fast',
];

function DemoBasic() {
  const [active, setActive] = useState('all');
  return <FilterBar chips={chips} activeChip={active} onChipChange={setActive} />;
}

function DemoWithFilters() {
  const [active, setActive] = useState('all');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([
    { label: '역할: Designer', value: 'role:designer' },
    { label: '팀: Product', value: 'team:product' },
  ]);
  return (
    <FilterBar
      chips={chips}
      activeChip={active}
      onChipChange={setActive}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="멤버, 프로젝트, 태그 검색..."
      activeFilters={filters}
      onFilterRemove={(v) => setFilters((f) => f.filter((x) => x.value !== v))}
      resultCount={24}
    />
  );
}

export default function FilterBarPage() {
  return (
    <AtomDocPage
      name="FilterBar"
      description="검색 입력 + 필터 칩 + 활성 필터 태그를 조합한 필터링 바. v1 filter-bar 패턴 기반."
      props={props}
      tokens={tokens}
      category="Organisms"
      categoryHref="/docs/organisms"
    >
      <DocSection title="Basic">
        <ThemeSplit>
          <DemoBasic />
        </ThemeSplit>
      </DocSection>

      <DocSection title="With Active Filters + Result Count">
        <ThemeSplit>
          <DemoWithFilters />
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
