'use client';

import { Checkbox } from '@/components/atoms/Checkbox';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'label', type: 'string', default: '-' },
  { name: 'checked', type: 'boolean', default: '-' },
  { name: 'defaultChecked', type: 'boolean', default: 'false' },
  { name: 'disabled', type: 'boolean', default: 'false' },
  { name: 'onChange', type: '(e: ChangeEvent) => void', default: '-' },
];

const tokens = [
  '--color-emphasis',
  '--color-on-emphasis',
  '--color-surface-raised',
  '--color-border-strong',
  '--color-text',
  '--radius-xs',
  '--shadow-xs',
  '--opacity-disabled',
  '--token-transition',
  '--ring',
];

export default function CheckboxPage() {
  return (
    <AtomDocPage
      name="Checkbox"
      description="다중 선택을 위한 체크박스. label과 함께 사용한다."
      props={props}
      tokens={tokens}
    >
      <DocSection title="Preview">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-3">
            <Checkbox label="Unchecked" />
            <Checkbox label="Checked" checked />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="States">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-3">
            <Checkbox label="Default" />
            <Checkbox label="Checked" checked />
            <Checkbox label="Disabled (unchecked)" disabled />
            <Checkbox label="Disabled (checked)" checked disabled />
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
