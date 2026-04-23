'use client';

import { Skeleton } from '@/components/atoms/Skeleton';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  {
    name: 'variant',
    type: "'line' | 'circle' | 'block' | 'bar'",
    default: "'line'",
  },
  { name: 'width', type: 'string', default: 'variant별 기본값' },
  { name: 'height', type: 'string', default: 'variant별 기본값' },
];

const tokens = [
  '--color-surface-sunken',
  '--color-surface',
  '--radius-xs',
  '--radius-lg',
  '--radius-full',
  '--gap-md',
  '--pad-3xl',
];

export default function SkeletonPage() {
  return (
    <AtomDocPage
      name="Skeleton"
      description="콘텐츠 구조를 예측할 수 있는 초기 로드에 사용하는 플레이스홀더."
      props={props}
      tokens={tokens}
    >
      <DocSection title="Variants">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-4" style={{ maxWidth: 320 }}>
            <div>
              <span className="text-xs mb-1 block" style={{ color: 'var(--color-text-tertiary)' }}>
                line
              </span>
              <Skeleton variant="line" width="75%" />
            </div>
            <div>
              <span className="text-xs mb-1 block" style={{ color: 'var(--color-text-tertiary)' }}>
                circle
              </span>
              <Skeleton variant="circle" />
            </div>
            <div>
              <span className="text-xs mb-1 block" style={{ color: 'var(--color-text-tertiary)' }}>
                block
              </span>
              <Skeleton variant="block" />
            </div>
            <div>
              <span className="text-xs mb-1 block" style={{ color: 'var(--color-text-tertiary)' }}>
                bar
              </span>
              <Skeleton variant="bar" width="60%" />
            </div>
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Card Skeleton">
        <ThemeSplit cols={1}>
          <div className="flex flex-wrap gap-4" style={{ alignItems: 'stretch' }}>
            {/* 카드 1: 이미지 + 텍스트 */}
            <div
              className="flex flex-1 flex-col gap-3 rounded-2xl p-5"
              style={{
                minWidth: 180,
                backgroundColor: 'var(--color-surface-raised)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <Skeleton variant="block" />
              <Skeleton variant="line" width="75%" />
              <Skeleton variant="line" width="50%" />
              <Skeleton variant="bar" width="60%" />
            </div>

            {/* 카드 2: 아바타 + 리스트 */}
            <div
              className="flex flex-1 flex-col gap-3 rounded-2xl p-5"
              style={{
                minWidth: 180,
                backgroundColor: 'var(--color-surface-raised)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton variant="circle" />
                  <div className="flex flex-1 flex-col gap-2">
                    <Skeleton variant="line" width="75%" />
                    <Skeleton variant="line" width="50%" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
