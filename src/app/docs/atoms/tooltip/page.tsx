'use client';

import { Tooltip } from '@/components/atoms/Tooltip';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'content', type: 'ReactNode', default: '-' },
  { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'" },
  { name: 'children', type: 'ReactElement', default: '-' },
];

const tokens = [
  '--color-emphasis',
  '--color-on-emphasis',
  '--color-surface-raised',
  '--color-text',
  '--radius-md',
  '--radius-full',
  '--shadow-md',
  '--shadow-sm',
];

function TriggerButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="rounded-full border-none px-5 py-2.5 text-[13px] font-medium"
      style={{
        background: 'var(--color-surface-raised)',
        color: 'var(--color-text)',
        boxShadow: 'var(--shadow-sm)',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

export default function TooltipPage() {
  return (
    <AtomDocPage
      name="Tooltip"
      description="요소에 마우스를 올리거나 포커스하면 보조 텍스트를 표시한다."
      props={props}
      tokens={tokens}
    >
      <DocSection title="Placement">
        <ThemeSplit cols={1}>
          <div className="flex flex-wrap items-center justify-center gap-12 py-12">
            <Tooltip content="위쪽 툴팁" placement="top">
              <TriggerButton>Top</TriggerButton>
            </Tooltip>
            <Tooltip content="아래쪽 툴팁" placement="bottom">
              <TriggerButton>Bottom</TriggerButton>
            </Tooltip>
            <Tooltip content="왼쪽 툴팁" placement="left">
              <TriggerButton>Left</TriggerButton>
            </Tooltip>
            <Tooltip content="오른쪽 툴팁" placement="right">
              <TriggerButton>Right</TriggerButton>
            </Tooltip>
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
