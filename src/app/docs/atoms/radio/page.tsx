'use client';

import { Radio } from '@/components/atoms/Radio';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'label', type: 'string', default: '-' },
  { name: 'name', type: 'string', default: '-' },
  { name: 'value', type: 'string', default: '-' },
  { name: 'checked', type: 'boolean', default: '-' },
  { name: 'defaultChecked', type: 'boolean', default: 'false' },
  { name: 'disabled', type: 'boolean', default: 'false' },
  { name: 'onChange', type: '(e: ChangeEvent) => void', default: '-' },
];

const tokens = [
  '--color-emphasis',
  '--color-surface-raised',
  '--color-border-strong',
  '--color-text',
  '--radius-full',
  '--opacity-disabled',
  '--token-transition-fast',
  '--ring',
];

export default function RadioPage() {
  return (
    <AtomDocPage
      name="Radio"
      description="단일 선택을 위한 라디오 버튼. name으로 그룹핑한다."
      props={props}
      tokens={tokens}
    >
      <DocSection title="Preview">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-3">
            <Radio label="Unselected" />
            <Radio label="Selected" checked />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="States">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-3">
            <Radio label="Default" />
            <Radio label="Selected" checked />
            <Radio label="Disabled (unselected)" disabled />
            <Radio label="Disabled (selected)" checked disabled />
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
