'use client';

import { useState, useEffect, useCallback } from 'react';
import { Progress, CircularProgress } from '@/components/atoms/Progress';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'value', type: 'number (0–100)', default: '-' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'" },
  {
    name: 'color',
    type: "'emphasis' | 'primary' | 'success' | 'warning' | 'error' | 'info'",
    default: "'emphasis'",
  },
  { name: 'showPercent', type: 'boolean', default: 'false' },
];

const tokens = [
  '--color-surface-sunken',
  '--color-emphasis',
  '--color-primary',
  '--color-success',
  '--color-warning',
  '--color-error',
  '--color-info',
  '--color-text',
  '--radius-full',
  '--gap-md',
];

export default function ProgressPage() {
  return (
    <AtomDocPage
      name="Progress"
      description="작업 진행률을 시각적으로 나타내는 바 및 원형 인디케이터."
      props={props}
      tokens={tokens}
    >
      <DocSection title="Interactive Demo">
        <InteractiveDemo />
      </DocSection>

      <DocSection title="Linear Progress">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-4" style={{ maxWidth: 400 }}>
            <div>
              <span className="mb-1 block text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                업로드 진행
              </span>
              <Progress value={72} showPercent />
            </div>
            <div>
              <span className="mb-1 block text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                디스크 사용량
              </span>
              <Progress value={45} size="lg" color="primary" showPercent />
            </div>
            <div>
              <span className="mb-1 block text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                위험 수준
              </span>
              <Progress value={89} size="lg" color="error" showPercent />
            </div>
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Sizes">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-4" style={{ maxWidth: 400 }}>
            <div>
              <span className="mb-1 block text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                sm (3px)
              </span>
              <Progress value={60} size="sm" color="info" />
            </div>
            <div>
              <span className="mb-1 block text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                md (6px, default)
              </span>
              <Progress value={60} />
            </div>
            <div>
              <span className="mb-1 block text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                lg (10px)
              </span>
              <Progress value={60} size="lg" color="primary" />
            </div>
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Colors">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-3" style={{ maxWidth: 400 }}>
            <Progress value={60} color="emphasis" showPercent />
            <Progress value={60} color="primary" showPercent />
            <Progress value={60} color="success" showPercent />
            <Progress value={30} color="warning" showPercent />
            <Progress value={89} color="error" showPercent />
            <Progress value={15} color="info" showPercent />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Circular Progress">
        <ThemeSplit cols={1}>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <CircularProgress value={72} color="emphasis" />
              <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                Emphasis
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CircularProgress value={60} color="success" />
              <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                Success
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CircularProgress value={89} color="error" />
              <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                Error
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CircularProgress value={45} color="primary" />
              <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                Primary
              </span>
            </div>
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}

function InteractiveDemo() {
  const [value, setValue] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (value >= 100) {
      setRunning(false);
      return;
    }
    const id = setTimeout(() => setValue((v) => Math.min(100, v + 1)), 40);
    return () => clearTimeout(id);
  }, [running, value]);

  const handleStart = useCallback(() => {
    setValue(0);
    setRunning(true);
  }, []);

  return (
    <ThemeSplit cols={1}>
      <div className="flex flex-col gap-4" style={{ maxWidth: 400 }}>
        <Progress value={value} size="lg" color="primary" showPercent />
        <CircularProgress value={value} color="primary" />
        <button
          onClick={handleStart}
          className="self-start rounded-full px-4 py-2 text-sm font-semibold"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-on-primary)',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {running ? '진행 중…' : value >= 100 ? '다시 시작' : '시작'}
        </button>
      </div>
    </ThemeSplit>
  );
}
