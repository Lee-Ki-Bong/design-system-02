'use client';

import { Badge } from '@/components/atoms/Badge';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  {
    name: 'variant',
    type: "'default' | 'success' | 'warning' | 'error' | 'info' | 'emphasis'",
    default: "'default'",
  },
  { name: 'size', type: "'sm' | 'lg'", default: "'sm'" },
  { name: 'dot', type: 'boolean', default: 'false' },
  { name: 'children', type: 'ReactNode', default: '-' },
];

const tokens = [
  '--color-surface',
  '--color-text-secondary',
  '--color-success',
  '--color-success-bg',
  '--color-warning',
  '--color-warning-bg',
  '--color-error',
  '--color-error-bg',
  '--color-info',
  '--color-info-bg',
  '--color-emphasis',
  '--color-on-emphasis',
  '--radius-full',
  '--font-size-caption',
  '--font-size-body-sm',
  '--font-weight-medium',
];

export default function BadgePage() {
  return (
    <AtomDocPage
      name="Badge"
      description="상태나 카테고리를 나타내는 인라인 라벨. dot으로 상태 표시 점을 추가할 수 있다."
      props={props}
      tokens={tokens}
    >
      <DocSection title="Preview">
        <ThemeSplit cols={1}>
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Default</Badge>
            <Badge variant="success" dot>
              Available
            </Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="error" dot>
              Error
            </Badge>
            <Badge variant="info">Executed</Badge>
            <Badge variant="emphasis">Scheduled</Badge>
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Sizes">
        <ThemeSplit cols={1}>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="success">Small (default)</Badge>
            <Badge variant="success" size="lg">
              Large
            </Badge>
            <Badge variant="error" size="lg">
              Error LG
            </Badge>
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Variants">
        <ThemeSplit cols={1}>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="emphasis">Emphasis</Badge>
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="With Dot">
        <ThemeSplit cols={1}>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="success" dot>
              Online
            </Badge>
            <Badge variant="error" dot>
              Offline
            </Badge>
            <Badge variant="warning" dot>
              Away
            </Badge>
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
