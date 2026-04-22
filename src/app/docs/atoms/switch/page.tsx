'use client';

import { Switch } from '@/components/atoms/Switch';
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
  '--color-surface-raised',
  '--color-border-strong',
  '--color-text',
  '--shadow-sm',
  '--radius-full',
  '--pad-xl',
  '--opacity-disabled',
  '--token-transition',
  '--ring',
];

export default function SwitchPage() {
  return (
    <AtomDocPage
      name="Switch"
      description="On/Off 토글 스위치. 즉시 반영되는 설정에 사용한다."
      props={props}
      tokens={tokens}
    >
      <DocSection title="Preview">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-3">
            <Switch label="Off" />
            <Switch label="On" checked />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="States">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-3">
            <Switch label="Default (off)" />
            <Switch label="Active (on)" checked />
            <Switch label="Disabled (off)" disabled />
            <Switch label="Disabled (on)" checked disabled />
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
