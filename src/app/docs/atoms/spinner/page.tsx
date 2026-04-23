'use client';

import { Spinner } from '@/components/atoms/Spinner';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
  },
  {
    name: 'variant',
    type: "'default' | 'onEmphasis' | 'primary'",
    default: "'default'",
  },
];

const tokens = [
  '--color-border',
  '--color-emphasis',
  '--color-on-emphasis',
  '--color-primary',
  '--color-primary-subtle',
  '--pad-lg',
  '--gap-2xl',
  '--height-sm',
  '--height-lg',
];

export default function SpinnerPage() {
  return (
    <AtomDocPage
      name="Spinner"
      description="결과를 예측할 수 없는 액션의 로딩 피드백에 사용하는 회전 인디케이터."
      props={props}
      tokens={tokens}
    >
      <DocSection title="Sizes">
        <ThemeSplit cols={1}>
          <div className="flex flex-wrap items-center gap-6">
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Spinner size={s} />
                <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                  {s}
                </span>
              </div>
            ))}
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Variants">
        <ThemeSplit cols={1}>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <Spinner variant="default" />
              <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                default
              </span>
            </div>
            <div
              className="flex flex-col items-center gap-2 rounded-xl p-4"
              style={{ backgroundColor: 'var(--color-emphasis)' }}
            >
              <Spinner variant="onEmphasis" />
              <span className="text-xs" style={{ color: 'var(--color-on-emphasis)' }}>
                onEmphasis
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner variant="primary" />
              <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                primary
              </span>
            </div>
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Inline Usage">
        <ThemeSplit cols={1}>
          <div className="flex flex-wrap items-center gap-6">
            <div
              className="flex items-center gap-2 text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <Spinner size="xs" />
              검색 중…
            </div>
            <button
              disabled
              className="inline-flex items-center gap-2 rounded-full px-5 font-semibold text-sm"
              style={{
                height: 'var(--height-md)',
                backgroundColor: 'var(--color-emphasis)',
                color: 'var(--color-on-emphasis)',
                opacity: 0.7,
                border: 'none',
                cursor: 'not-allowed',
              }}
            >
              <Spinner size="sm" variant="onEmphasis" />
              저장 중…
            </button>
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
