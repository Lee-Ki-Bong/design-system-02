'use client';

import { ToastProvider, useToast } from '@/components/molecules/Toast';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  {
    name: 'variant',
    type: "'success' | 'info' | 'warning' | 'error' | 'emphasis'",
    default: "'info'",
  },
  { name: 'title', type: 'string', default: '-' },
  { name: 'description', type: 'string', default: '-' },
  { name: 'action', type: '{ label: string; onClick: () => void }', default: '-' },
  { name: 'duration', type: 'number (ms)', default: '5000' },
];

const tokens = [
  '--color-surface-raised',
  '--color-text',
  '--color-text-secondary',
  '--color-text-tertiary',
  '--color-border-subtle',
  '--color-emphasis',
  '--color-on-emphasis',
  '--color-primary',
  '--color-info-bg',
  '--color-info',
  '--color-success-bg',
  '--color-success',
  '--color-warning-bg',
  '--color-warning',
  '--color-error-bg',
  '--color-error',
  '--radius-xl',
  '--radius-full',
  '--shadow-lg',
  '--gap-md',
  '--gap-sm',
  '--gap-3xl',
  '--pad-md',
  '--gap-lg',
  '--height-xs',
  '--font-size-body-sm',
  '--font-weight-semibold',
  '--z-modal',
];

function Btn({
  children,
  onClick,
  variant = 'ghost',
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'ghost' | 'primary';
}) {
  const styles: Record<string, React.CSSProperties> = {
    ghost: {
      height: 'var(--height-sm)',
      padding: '0 var(--pad-lg)',
      background: 'var(--color-surface)',
      color: 'var(--color-text)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-full)',
      fontSize: 'var(--font-size-body-sm)',
      fontWeight: 'var(--font-weight-medium)',
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer',
    },
    primary: {
      height: 'var(--height-sm)',
      padding: '0 var(--pad-lg)',
      background: 'var(--color-emphasis)',
      color: 'var(--color-on-emphasis)',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      fontSize: 'var(--font-size-body-sm)',
      fontWeight: 'var(--font-weight-medium)',
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer',
    },
  };
  return (
    <button type="button" style={styles[variant]} onClick={onClick}>
      {children}
    </button>
  );
}

function ToastButtons() {
  const { toast } = useToast();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--gap-sm)' }}>
      <Btn
        onClick={() =>
          toast({
            variant: 'success',
            title: '저장되었습니다',
            description: '변경사항이 모두 동기화되었어요.',
          })
        }
      >
        Success
      </Btn>
      <Btn
        onClick={() =>
          toast({
            variant: 'info',
            title: '새 업데이트가 있습니다',
            description: 'v2.4 릴리스 노트를 확인해 보세요.',
            action: { label: '자세히 보기 →', onClick: () => {} },
          })
        }
      >
        Info + Action
      </Btn>
      <Btn
        onClick={() =>
          toast({
            variant: 'warning',
            title: '연결이 불안정합니다',
            description: '작업 중인 내용은 임시 저장되었어요.',
          })
        }
      >
        Warning
      </Btn>
      <Btn
        onClick={() =>
          toast({
            variant: 'error',
            title: '업로드에 실패했습니다',
            description: '네트워크 오류로 요청을 처리할 수 없어요.',
            action: { label: '다시 시도', onClick: () => {} },
          })
        }
      >
        Error
      </Btn>
      <Btn
        onClick={() =>
          toast({
            variant: 'emphasis',
            title: '1개 항목을 삭제했습니다',
            description: '30일 동안 복구할 수 있어요.',
            action: { label: '실행 취소', onClick: () => {} },
          })
        }
        variant="primary"
      >
        Emphasis
      </Btn>
    </div>
  );
}

export default function ToastPage() {
  return (
    <AtomDocPage
      name="Toast"
      description="자동 소멸 알림. ToastProvider로 감싼 뒤 useToast()로 호출한다. 스태킹, 액션 버튼, emphasis 스낵바를 지원한다."
      props={props}
      tokens={tokens}
      category="Molecules"
      categoryHref="/docs/molecules"
    >
      <DocSection title="Variants">
        <ThemeSplit cols={1}>
          <ToastProvider>
            <ToastButtons />
          </ToastProvider>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Usage">
        <ThemeSplit cols={1}>
          <div
            style={{
              fontSize: 'var(--font-size-body-sm)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
            }}
          >
            <pre
              style={{
                margin: 0,
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--font-size-caption)',
                background: 'var(--color-surface-sunken)',
                padding: 'var(--pad-md)',
                borderRadius: 'var(--radius-lg)',
                overflowX: 'auto',
              }}
            >
              {`// 1. 앱 루트에 ToastProvider 배치
<ToastProvider>
  <App />
</ToastProvider>

// 2. 컴포넌트에서 useToast 사용
const { toast } = useToast();
toast({
  variant: 'success',
  title: '저장되었습니다',
  description: '설명 (선택)',
  duration: 5000,  // 0이면 자동 소멸 안 함
});`}
            </pre>
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
