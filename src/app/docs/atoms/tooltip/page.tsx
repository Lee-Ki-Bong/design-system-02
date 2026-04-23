'use client';

import { Tooltip } from '@/components/atoms/Tooltip';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'content', type: 'ReactNode', default: '-' },
  { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'" },
  { name: 'enterDelay', type: 'number (ms)', default: '0' },
  { name: 'leaveDelay', type: 'number (ms)', default: '100' },
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
      description="요소에 마우스를 올리거나 포커스하면 보조 텍스트를 표시한다. 화면 경계 자동 전환, 페이드 애니메이션, 딜레이를 지원한다."
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

      <DocSection title="Delay">
        <ThemeSplit cols={1}>
          <div className="flex flex-wrap items-center justify-center gap-12 py-12">
            <Tooltip content="즉시 등장" enterDelay={0}>
              <TriggerButton>No delay</TriggerButton>
            </Tooltip>
            <Tooltip content="300ms 후 등장" enterDelay={300}>
              <TriggerButton>Enter 300ms</TriggerButton>
            </Tooltip>
            <Tooltip content="500ms 후 사라짐" leaveDelay={500}>
              <TriggerButton>Leave 500ms</TriggerButton>
            </Tooltip>
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Auto Flip (edge)">
        <ThemeSplit cols={1}>
          <div className="py-8">
            <p className="text-xs mb-4 text-center" style={{ color: 'var(--color-text-tertiary)' }}>
              화면 경계에 가까운 요소에 hover하면 자동으로 반대 방향으로 전환됩니다.
            </p>
            <div className="flex justify-between">
              <Tooltip content="왼쪽 경계 → 오른쪽으로 flip" placement="left">
                <TriggerButton>Left edge</TriggerButton>
              </Tooltip>
              <Tooltip content="오른쪽 경계 → 왼쪽으로 flip" placement="right">
                <TriggerButton>Right edge</TriggerButton>
              </Tooltip>
            </div>
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Keyboard (Escape)">
        <ThemeSplit cols={1}>
          <div className="flex justify-center py-8">
            <Tooltip content="Tab으로 포커스 → Escape로 닫기">
              <TriggerButton>Focus me (Tab)</TriggerButton>
            </Tooltip>
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
