'use client';

import { DropdownMenu } from '@/components/molecules/DropdownMenu';
import type { DropdownMenuItem } from '@/components/molecules/DropdownMenu';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'items', type: 'DropdownMenuItem[]', default: '-' },
  { name: 'minWidth', type: 'number', default: '200' },
  { name: 'children', type: 'ReactElement', default: '-' },
];

const tokens = [
  '--color-surface-raised',
  '--color-surface',
  '--color-text',
  '--color-text-tertiary',
  '--color-error',
  '--color-error-bg',
  '--color-border-subtle',
  '--radius-xl',
  '--shadow-lg',
  '--pad-xs',
  '--pad-sm',
  '--pad-md',
  '--font-size-body-sm',
  '--font-size-overline',
  '--font-size-caption',
  '--font-mono',
  '--z-dropdown',
  '--token-transition-fast',
];

function Ico({ d }: { d: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

const actionsItems: DropdownMenuItem[] = [
  { type: 'label', text: 'Edit' },
  {
    type: 'item',
    label: '수정',
    icon: (
      <Ico d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    ),
    shortcut: 'Ctrl E',
  },
  {
    type: 'item',
    label: '복제',
    icon: (
      <Ico d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    ),
    shortcut: 'Ctrl D',
  },
  { type: 'separator' },
  {
    type: 'item',
    label: '다운로드',
    icon: <Ico d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />,
  },
  {
    type: 'item',
    label: '공유',
    icon: (
      <Ico d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    ),
  },
  { type: 'separator' },
  {
    type: 'item',
    label: '삭제',
    icon: (
      <Ico d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    ),
    shortcut: 'Del',
    destructive: true,
  },
];

const simpleItems: DropdownMenuItem[] = [
  { type: 'item', label: '새로고침' },
  { type: 'item', label: '설정' },
  { type: 'separator' },
  { type: 'item', label: '로그아웃', destructive: true },
];

function TriggerButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      style={{
        height: 'var(--height-md)',
        padding: '0 var(--pad-lg)',
        background: 'var(--color-surface-raised)',
        color: 'var(--color-text)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-full)',
        fontSize: 'var(--font-size-body-sm)',
        fontWeight: 'var(--font-weight-medium)',
        fontFamily: 'var(--font-sans)',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--gap-sm)',
      }}
    >
      {children}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  );
}

function IconTrigger() {
  return (
    <button
      type="button"
      style={{
        width: 'var(--height-md)',
        height: 'var(--height-md)',
        background: 'var(--color-surface-raised)',
        color: 'var(--color-text)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-full)',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="5" r="1.5" />
        <circle cx="12" cy="12" r="1.5" />
        <circle cx="12" cy="19" r="1.5" />
      </svg>
    </button>
  );
}

export default function DropdownMenuPage() {
  return (
    <AtomDocPage
      name="DropdownMenu"
      description="클릭으로 열리는 액션 메뉴. 아이콘, 단축키, 구분선, 레이블 섹션, destructive 항목을 지원한다."
      props={props}
      tokens={tokens}
      category="Molecules"
      categoryHref="/docs/molecules"
    >
      <DocSection title="Actions Menu">
        <ThemeSplit cols={1}>
          <DropdownMenu items={actionsItems}>
            <TriggerButton>Actions</TriggerButton>
          </DropdownMenu>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Simple Menu">
        <ThemeSplit cols={1}>
          <DropdownMenu items={simpleItems} minWidth={160}>
            <IconTrigger />
          </DropdownMenu>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Keyboard Navigation">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-3">
            <DropdownMenu items={actionsItems}>
              <TriggerButton>Keyboard Test</TriggerButton>
            </DropdownMenu>
            <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
              Arrow Up/Down으로 항목 이동, Enter/Space로 선택, Escape로 닫기
            </p>
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
