'use client';

import { useState } from 'react';
import { SearchInput } from '@/components/molecules/SearchInput';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'value', type: 'string', default: '-' },
  { name: 'onChange', type: '(e: ChangeEvent) => void', default: '-' },
  { name: 'onClear', type: '() => void', default: '-' },
  { name: 'loading', type: 'boolean', default: 'false' },
  { name: 'placeholder', type: 'string', default: '-' },
  { name: 'disabled', type: 'boolean', default: 'false' },
];

const tokens = [
  '--color-surface-sunken',
  '--color-text',
  '--color-text-tertiary',
  '--color-border',
  '--height-lg',
  '--border-width-thin',
  '--radius-full',
  '--opacity-disabled',
  '--token-transition-fast',
];

function DemoBasic() {
  const [value, setValue] = useState('');
  return (
    <SearchInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue('')}
      placeholder="Search..."
      style={{ maxWidth: 360 }}
    />
  );
}

function DemoWithValue() {
  const [value, setValue] = useState('design tokens');
  return (
    <SearchInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue('')}
      placeholder="Search..."
      style={{ maxWidth: 360 }}
    />
  );
}

function DemoLoading() {
  return (
    <SearchInput
      value="loading..."
      onChange={() => {}}
      loading
      placeholder="Search..."
      style={{ maxWidth: 360 }}
    />
  );
}

function DemoDisabled() {
  return (
    <SearchInput
      value=""
      onChange={() => {}}
      disabled
      placeholder="Search disabled"
      style={{ maxWidth: 360 }}
    />
  );
}

export default function SearchInputPage() {
  return (
    <AtomDocPage
      name="SearchInput"
      description="검색 전용 입력 필드. 검색 아이콘, 클리어 버튼, 로딩 스피너를 내장한다."
      props={props}
      tokens={tokens}
      category="Molecules"
      categoryHref="/docs/molecules"
    >
      <DocSection title="Basic">
        <ThemeSplit>
          <DemoBasic />
        </ThemeSplit>
      </DocSection>

      <DocSection title="With Value (Clear Button)">
        <ThemeSplit>
          <DemoWithValue />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Loading">
        <ThemeSplit>
          <DemoLoading />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Disabled">
        <ThemeSplit>
          <DemoDisabled />
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
