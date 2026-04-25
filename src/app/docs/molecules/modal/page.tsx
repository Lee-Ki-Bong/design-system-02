'use client';

import { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalClose,
} from '@/components/molecules/Modal';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'open', type: 'boolean', default: 'false' },
  { name: 'onClose', type: '() => void', default: '-' },
  { name: 'width', type: 'string', default: 'min(94%, 400px)' },
  { name: 'children', type: 'ReactNode', default: '-' },
];

const tokens = [
  '--color-surface-raised',
  '--color-text',
  '--color-text-secondary',
  '--color-text-tertiary',
  '--color-overlay',
  '--color-surface-sunken',
  '--color-emphasis',
  '--color-on-emphasis',
  '--color-error',
  '--color-on-surface',
  '--radius-2xl',
  '--radius-lg',
  '--radius-full',
  '--shadow-2xl',
  '--pad-2xl',
  '--pad-xl',
  '--pad-lg',
  '--pad-md',
  '--pad-sm',
  '--pad-xs',
  '--gap-sm',
  '--gap-lg',
  '--gap-3xl',
  '--font-size-h3',
  '--font-size-body-sm',
  '--font-size-caption',
  '--font-weight-medium',
  '--font-weight-semibold',
  '--z-modal',
  '--token-transition-fast',
];

function Btn({
  children,
  variant = 'ghost',
  onClick,
}: {
  children: React.ReactNode;
  variant?: 'ghost' | 'primary' | 'danger';
  onClick?: () => void;
}) {
  const base: React.CSSProperties = {
    font: 'inherit',
    fontSize: 'var(--font-size-body-sm)',
    fontWeight: 'var(--font-weight-semibold)',
    padding: 'var(--pad-sm) var(--pad-lg)',
    borderRadius: 'var(--radius-lg)',
    border: 0,
    cursor: 'pointer',
    letterSpacing: '-0.005em',
    transition: 'background var(--token-transition-fast)',
  };
  const variants: Record<string, React.CSSProperties> = {
    ghost: { background: 'transparent', color: 'var(--color-text-secondary)' },
    primary: { background: 'var(--color-emphasis)', color: 'var(--color-on-emphasis)' },
    danger: { background: 'var(--color-error)', color: 'var(--color-on-surface)' },
  };
  return (
    <button type="button" style={{ ...base, ...variants[variant] }} onClick={onClick}>
      {children}
    </button>
  );
}

function ConfirmDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Btn variant="primary" onClick={() => setOpen(true)}>
        Confirm 열기
      </Btn>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalClose onClose={() => setOpen(false)} />
        <ModalHeader>
          <h3
            style={{
              margin: 0,
              fontSize: 'var(--font-size-h3)',
              fontWeight: 'var(--font-weight-semibold)',
              letterSpacing: '-0.015em',
              color: 'var(--color-text)',
            }}
          >
            프로젝트를 삭제할까요?
          </h3>
        </ModalHeader>
        <ModalBody>
          <p
            style={{
              margin: 0,
              fontSize: 'var(--font-size-body-sm)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.55,
            }}
          >
            이 작업은 되돌릴 수 없으며, 프로젝트 내 파일 23개가 함께 삭제됩니다.
          </p>
        </ModalBody>
        <ModalFooter>
          <Btn onClick={() => setOpen(false)}>취소</Btn>
          <Btn variant="danger" onClick={() => setOpen(false)}>
            삭제하기
          </Btn>
        </ModalFooter>
      </Modal>
    </>
  );
}

function FormDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Btn variant="primary" onClick={() => setOpen(true)}>
        Form 열기
      </Btn>
      <Modal open={open} onClose={() => setOpen(false)} width="min(94%, 420px)">
        <ModalClose onClose={() => setOpen(false)} />
        <ModalHeader>
          <h3
            style={{
              margin: 0,
              fontSize: 'var(--font-size-h3)',
              fontWeight: 'var(--font-weight-semibold)',
              letterSpacing: '-0.015em',
              color: 'var(--color-text)',
            }}
          >
            새 워크스페이스
          </h3>
          <p
            style={{
              margin: 'var(--pad-xs) 0 0',
              fontSize: 'var(--font-size-body-sm)',
              color: 'var(--color-text-secondary)',
            }}
          >
            팀원과 함께 사용할 새 공간을 만들어요.
          </p>
        </ModalHeader>
        <ModalBody>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--pad-xs)',
              marginBottom: 'var(--gap-md)',
            }}
          >
            <label
              style={{
                fontSize: 'var(--font-size-caption)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-text-secondary)',
              }}
            >
              이름
            </label>
            <input
              type="text"
              defaultValue="Growth Team"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: 'var(--pad-sm) var(--pad-md)',
                font: 'inherit',
                fontSize: 'var(--font-size-body-sm)',
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface-raised)',
                borderRadius: 'var(--radius-lg)',
                color: 'var(--color-text)',
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--pad-xs)' }}>
            <label
              style={{
                fontSize: 'var(--font-size-caption)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-text-secondary)',
              }}
            >
              설명 (선택)
            </label>
            <input
              type="text"
              placeholder="무엇을 하는 팀인가요?"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: 'var(--pad-sm) var(--pad-md)',
                font: 'inherit',
                fontSize: 'var(--font-size-body-sm)',
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface-raised)',
                borderRadius: 'var(--radius-lg)',
                color: 'var(--color-text)',
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Btn onClick={() => setOpen(false)}>취소</Btn>
          <Btn variant="primary" onClick={() => setOpen(false)}>
            만들기
          </Btn>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default function ModalPage() {
  return (
    <AtomDocPage
      name="Modal"
      description="집중형 오버레이 다이얼로그. Confirm, Form 등 단일 과업에 사용한다. 포커스 트랩, ESC 닫기, 스크롤 잠금을 내장한다."
      props={props}
      tokens={tokens}
      category="Molecules"
      categoryHref="/docs/molecules"
    >
      <DocSection title="Confirm">
        <ThemeSplit cols={1}>
          <ConfirmDemo />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Form">
        <ThemeSplit cols={1}>
          <FormDemo />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Accessibility">
        <ThemeSplit cols={1}>
          <div
            style={{
              fontSize: 'var(--font-size-body-sm)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
            }}
          >
            <ul
              style={{
                margin: 0,
                paddingLeft: '1.2em',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <li>role=&quot;dialog&quot; + aria-modal=&quot;true&quot;</li>
              <li>열릴 때 첫 번째 포커스 가능 요소로 포커스 이동</li>
              <li>Tab/Shift+Tab 포커스 트랩</li>
              <li>Escape로 닫기</li>
              <li>닫힐 때 이전 포커스 복원</li>
              <li>배경 스크롤 잠금</li>
            </ul>
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
