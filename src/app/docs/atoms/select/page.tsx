'use client';

import { Select } from '@/components/atoms/Select';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grape', label: 'Grape' },
];

const props = [
  { name: 'label', type: 'string', default: '-' },
  { name: 'error', type: 'string', default: '-' },
  { name: 'hint', type: 'string', default: '-' },
  {
    name: 'options',
    type: '{ value: string; label: string }[]',
    default: '[]',
  },
  { name: 'placeholder', type: 'string', default: '-' },
  { name: 'disabled', type: 'boolean', default: 'false' },
];

const tokens = [
  '--color-surface-sunken',
  '--color-text',
  '--color-text-tertiary',
  '--color-border',
  '--color-error',
  '--color-primary',
  '--height-lg',
  '--border-width-thin',
  '--opacity-disabled',
  '--token-transition-fast',
  '--ring',
];

export default function SelectPage() {
  return (
    <AtomDocPage
      name="Select"
      description="드롭다운 선택 필드. 네이티브 select 기반, label/error/hint를 지원한다."
      props={props}
      tokens={tokens}
    >
      <DocSection title="Preview">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-4 max-w-sm">
            <Select options={sampleOptions} placeholder="Choose a fruit" />
            <Select label="With label" options={sampleOptions} placeholder="Select..." />
            <Select
              label="With hint"
              options={sampleOptions}
              placeholder="Select..."
              hint="Choose your favorite fruit."
            />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="States">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-4 max-w-sm">
            <Select label="Default" options={sampleOptions} placeholder="Select..." />
            <Select
              label="Selected"
              options={sampleOptions}
              defaultValue="cherry"
            />
            <Select
              label="Error (empty)"
              options={sampleOptions}
              placeholder="Select..."
              error="Selection is required."
            />
            <Select
              label="Error (with value)"
              options={sampleOptions}
              defaultValue="banana"
              error="This option is unavailable."
            />
            <Select
              label="Disabled (empty)"
              options={sampleOptions}
              placeholder="Select..."
              disabled
            />
            <Select
              label="Disabled (with value)"
              options={sampleOptions}
              defaultValue="apple"
              disabled
            />
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
