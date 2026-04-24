'use client';

import { Card, CardHeader, CardBody, CardFooter } from '@/components/molecules/Card';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  {
    name: 'variant',
    type: "'default' | 'elevated' | 'flat'",
    default: "'default'",
  },
  { name: 'padding', type: 'string', default: "'var(--pad-lg)'" },
  { name: 'children', type: 'ReactNode', default: '-' },
];

const tokens = [
  '--color-surface-raised',
  '--color-surface',
  '--color-border-subtle',
  '--radius-2xl',
  '--shadow-md',
  '--shadow-lg',
  '--pad-lg',
  '--pad-md',
];

export default function CardPage() {
  return (
    <AtomDocPage
      name="Card"
      description="관련 콘텐츠를 시각적으로 묶는 컨테이너. Header/Body/Footer 슬롯을 조합할 수 있다."
      props={props}
      tokens={tokens}
      category="Molecules"
      categoryHref="/docs/molecules"
    >
      <DocSection title="Variants">
        <ThemeSplit cols={1}>
          <div className="flex flex-wrap gap-4">
            <Card variant="default" style={{ flex: 1, minWidth: '160px' }}>
              <div
                className="text-xs font-medium uppercase tracking-widest"
                style={{ color: 'var(--color-text-tertiary)', marginBottom: '10px' }}
              >
                Default
              </div>
              <div className="text-base font-semibold" style={{ color: 'var(--color-text)' }}>
                Card · shadow-md
              </div>
              <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                일반 카드
              </div>
            </Card>
            <Card variant="elevated" style={{ flex: 1, minWidth: '160px' }}>
              <div
                className="text-xs font-medium uppercase tracking-widest"
                style={{ color: 'var(--color-text-tertiary)', marginBottom: '10px' }}
              >
                Elevated
              </div>
              <div className="text-base font-semibold" style={{ color: 'var(--color-text)' }}>
                Card · shadow-lg
              </div>
              <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                강조된 카드
              </div>
            </Card>
            <Card variant="flat" style={{ flex: 1, minWidth: '160px' }}>
              <div
                className="text-xs font-medium uppercase tracking-widest"
                style={{ color: 'var(--color-text-tertiary)', marginBottom: '10px' }}
              >
                Flat
              </div>
              <div className="text-base font-semibold" style={{ color: 'var(--color-text)' }}>
                Card · surface
              </div>
              <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                분리된 섹션
              </div>
            </Card>
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="With Header / Footer">
        <ThemeSplit cols={1}>
          <Card style={{ maxWidth: '380px' }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold" style={{ color: 'var(--color-text)' }}>
                  Project Alpha
                </span>
                <Badge variant="success" dot>
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                로봇 자동화 파이프라인의 처리량과 가동률을 모니터링합니다.
              </p>
            </CardBody>
            <CardFooter>
              <Button variant="ghost" size="sm">
                Details
              </Button>
              <Button variant="primary" size="sm">
                Open
              </Button>
            </CardFooter>
          </Card>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Body Only">
        <ThemeSplit cols={1}>
          <Card variant="flat" style={{ maxWidth: '380px' }}>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Header와 Footer 없이 콘텐츠만 담을 수도 있다.
            </p>
          </Card>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
