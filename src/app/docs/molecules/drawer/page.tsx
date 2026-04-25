'use client';

import { useState } from 'react';
import {
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
} from '@/components/molecules/Drawer';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'open', type: 'boolean', default: 'false' },
  { name: 'onClose', type: '() => void', default: '-' },
  { name: 'side', type: "'left' | 'right'", default: "'right'" },
  { name: 'width', type: 'string', default: "'380px'" },
  { name: 'children', type: 'ReactNode', default: '-' },
];

const tokens = [
  '--color-surface-raised',
  '--color-text',
  '--color-text-secondary',
  '--color-overlay',
  '--color-surface',
  '--color-surface-sunken',
  '--color-border-subtle',
  '--color-emphasis',
  '--color-on-emphasis',
  '--shadow-2xl',
  '--radius-full',
  '--pad-lg',
  '--pad-xl',
  '--pad-md',
  '--gap-sm',
  '--height-xs',
  '--font-size-h3',
  '--font-size-body-sm',
  '--font-weight-semibold',
  '--font-weight-medium',
  '--z-overlay',
  '--z-modal',
  '--token-transition-fast',
];

function Btn({
  children,
  variant = 'secondary',
  onClick,
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}) {
  const styles: Record<string, React.CSSProperties> = {
    primary: {
      height: 'var(--height-sm)',
      padding: '0 var(--pad-lg)',
      background: 'var(--color-emphasis)',
      color: 'var(--color-on-emphasis)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      font: 'var(--font-weight-medium) var(--font-size-body-sm) var(--font-sans)',
      cursor: 'pointer',
    },
    secondary: {
      height: 'var(--height-sm)',
      padding: '0 var(--pad-lg)',
      background: 'var(--color-surface)',
      color: 'var(--color-text)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-full)',
      font: 'var(--font-weight-medium) var(--font-size-body-sm) var(--font-sans)',
      cursor: 'pointer',
    },
  };
  return (
    <button type="button" style={styles[variant]} onClick={onClick}>
      {children}
    </button>
  );
}

function RightDrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Btn variant="primary" onClick={() => setOpen(true)}>
        오른쪽 Drawer 열기
      </Btn>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <DrawerHeader>
          <span
            style={{
              fontSize: 'var(--font-size-h3)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            상세 정보
          </span>
          <DrawerClose onClose={() => setOpen(false)} />
        </DrawerHeader>
        <DrawerBody>
          <p style={{ margin: 0 }}>
            Drawer 본문 영역입니다. 폼, 필터, 상세 정보 등 다양한 콘텐츠를 배치할 수 있습니다.
          </p>
          <p style={{ marginTop: 'var(--gap-lg)' }}>
            surface-raised 배경 위에 콘텐츠가 놓이며, shadow-2xl로 깊이감을 표현합니다.
          </p>
        </DrawerBody>
        <DrawerFooter>
          <Btn onClick={() => setOpen(false)}>취소</Btn>
          <Btn variant="primary" onClick={() => setOpen(false)}>
            저장
          </Btn>
        </DrawerFooter>
      </Drawer>
    </>
  );
}

function LeftDrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Btn variant="primary" onClick={() => setOpen(true)}>
        왼쪽 Drawer 열기
      </Btn>
      <Drawer open={open} onClose={() => setOpen(false)} side="left" width="320px">
        <DrawerHeader>
          <span
            style={{
              fontSize: 'var(--font-size-h3)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            필터
          </span>
          <DrawerClose onClose={() => setOpen(false)} />
        </DrawerHeader>
        <DrawerBody>
          <p style={{ margin: 0 }}>
            왼쪽에서 슬라이드되는 Drawer입니다. 필터 패널이나 사이드 네비게이션에 적합합니다.
          </p>
        </DrawerBody>
      </Drawer>
    </>
  );
}

export default function DrawerPage() {
  return (
    <AtomDocPage
      name="Drawer"
      description="화면 옆에서 슬라이드되는 패널. 상세 정보, 필터, 폼에 사용한다. 포커스 트랩, ESC 닫기, 스크롤 잠금을 내장한다."
      props={props}
      tokens={tokens}
      category="Molecules"
      categoryHref="/docs/molecules"
    >
      <DocSection title="Right (기본)">
        <ThemeSplit cols={1}>
          <RightDrawerDemo />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Left">
        <ThemeSplit cols={1}>
          <LeftDrawerDemo />
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
