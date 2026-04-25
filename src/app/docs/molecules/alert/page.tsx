'use client';

import { Alert } from '@/components/molecules/Alert';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'variant', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'" },
  { name: 'type', type: "'inline' | 'banner'", default: "'inline'" },
  { name: 'title', type: 'string', default: '-' },
  { name: 'children', type: 'ReactNode', default: '-' },
  { name: 'onClose', type: '() => void', default: '-' },
];

const tokens = [
  '--color-info-bg',
  '--color-info',
  '--color-success-bg',
  '--color-success',
  '--color-warning-bg',
  '--color-warning',
  '--color-error-bg',
  '--color-error',
  '--color-text',
  '--color-text-secondary',
  '--color-text-tertiary',
  '--radius-xl',
  '--radius-lg',
  '--shadow-sm',
  '--pad-md',
  '--pad-lg',
  '--pad-sm',
  '--gap-md',
  '--gap-sm',
  '--font-size-body-sm',
  '--font-weight-semibold',
  '--font-weight-medium',
];

export default function AlertPage() {
  return (
    <AtomDocPage
      name="Alert"
      description="인라인 알림과 배너 알림. info, success, warning, error 4가지 variant를 지원한다."
      props={props}
      tokens={tokens}
      category="Molecules"
      categoryHref="/docs/molecules"
    >
      <DocSection title="Inline Alert">
        <ThemeSplit cols={1}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--gap-sm)',
              maxWidth: 480,
            }}
          >
            <Alert variant="info" title="안내">
              새로운 기능이 추가되었습니다.
            </Alert>
            <Alert variant="success" title="완료">
              저장이 완료되었습니다.
            </Alert>
            <Alert variant="warning" title="주의">
              저장되지 않은 변경사항이 있습니다.
            </Alert>
            <Alert variant="error" title="오류">
              필수 항목 3개가 누락되었습니다. 아래 표시된 필드를 확인하세요.
            </Alert>
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Banner Alert">
        <ThemeSplit cols={1}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-sm)' }}>
            <Alert variant="info" type="banner" onClose={() => {}}>
              시스템 점검 예정: 4월 25일 02:00~04:00 (KST)
            </Alert>
            <Alert variant="warning" type="banner" onClose={() => {}}>
              무료 체험이 3일 남았습니다.
            </Alert>
            <Alert variant="error" type="banner" onClose={() => {}}>
              결제에 실패했습니다. 카드 정보를 확인하세요.
            </Alert>
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
