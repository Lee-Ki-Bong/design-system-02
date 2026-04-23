'use client';

import { useState } from 'react';
import { Select } from '@/components/atoms/Select';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grape', label: 'Grape' },
];

const countryOptions = [
  { value: 'kr', label: '대한민국' },
  { value: 'us', label: '미국' },
  { value: 'jp', label: '일본' },
  { value: 'cn', label: '중국' },
  { value: 'de', label: '독일' },
  { value: 'fr', label: '프랑스' },
  { value: 'gb', label: '영국' },
  { value: 'ca', label: '캐나다' },
  { value: 'au', label: '호주' },
  { value: 'br', label: '브라질' },
  { value: 'in', label: '인도' },
  { value: 'sg', label: '싱가포르' },
];

const props = [
  { name: 'label', type: 'string', default: '-' },
  { name: 'error', type: 'string', default: '-' },
  { name: 'hint', type: 'string', default: '-' },
  { name: 'options', type: '{ value: string; label: string }[]', default: '[]' },
  { name: 'placeholder', type: 'string', default: '-' },
  { name: 'disabled', type: 'boolean', default: 'false' },
  { name: 'value', type: 'string', default: '-' },
  { name: 'defaultValue', type: 'string', default: '-' },
  { name: 'onChange', type: '(value: string) => void', default: '-' },
  { name: 'searchable', type: 'boolean', default: 'false' },
  { name: 'multiple', type: 'boolean', default: 'false' },
];

const tokens = [
  '--color-surface-sunken',
  '--color-surface',
  '--color-surface-raised',
  '--color-text',
  '--color-text-secondary',
  '--color-text-tertiary',
  '--color-text-disabled',
  '--color-border',
  '--color-border-subtle',
  '--color-emphasis',
  '--color-error',
  '--height-lg',
  '--border-width-thin',
  '--opacity-disabled',
  '--token-transition-fast',
  '--ring',
  '--shadow-lg',
  '--radius-xl',
  '--radius-md',
  '--pad-xs',
  '--pad-sm',
  '--pad-md',
];

export default function SelectPage() {
  const [controlled, setControlled] = useState('cherry');

  return (
    <AtomDocPage
      name="Select"
      description="커스텀 드롭다운 선택 필드. 검색·멀티셀렉트·키보드 탐색을 지원한다."
      props={props}
      tokens={tokens}
    >
      <DocSection title="Preview">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-4 max-w-sm">
            <Select options={fruitOptions} placeholder="Choose a fruit" />
            <Select label="With label" options={fruitOptions} placeholder="Select..." />
            <Select
              label="With hint"
              options={fruitOptions}
              placeholder="Select..."
              hint="Choose your favorite fruit."
            />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="States">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-4 max-w-sm">
            <Select label="Default" options={fruitOptions} placeholder="Select..." />
            <Select label="Selected" options={fruitOptions} defaultValue="cherry" />
            <Select
              label="Error (empty)"
              options={fruitOptions}
              placeholder="Select..."
              error="Selection is required."
            />
            <Select
              label="Error (with value)"
              options={fruitOptions}
              defaultValue="banana"
              error="This option is unavailable."
            />
            <Select
              label="Disabled (empty)"
              options={fruitOptions}
              placeholder="Select..."
              disabled
            />
            <Select
              label="Disabled (with value)"
              options={fruitOptions}
              defaultValue="apple"
              disabled
            />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Controlled">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-4 max-w-sm">
            <Select
              label={`Controlled: ${controlled}`}
              options={fruitOptions}
              value={controlled}
              onChange={setControlled}
            />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Searchable">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-4 max-w-sm">
            <Select
              label="Country"
              options={countryOptions}
              placeholder="검색하여 선택..."
              searchable
            />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Multi Select">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-4 max-w-sm">
            <Select
              label="Fruits (multiple)"
              options={fruitOptions}
              placeholder="Select fruits..."
              multiple
            />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Scrollable">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-4 max-w-sm">
            <Select
              label="Country (12 options)"
              options={countryOptions}
              placeholder="Select a country..."
            />
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
