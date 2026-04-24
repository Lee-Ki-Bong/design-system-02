'use client';

import { Stat } from '@/components/molecules/Stat';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'value', type: 'string | number', default: '-' },
  { name: 'label', type: 'string', default: '-' },
  { name: 'trend', type: "'up' | 'down' | 'neutral'", default: '-' },
  { name: 'trendValue', type: 'string', default: '-' },
  { name: 'sparkline', type: 'number[]', default: '-' },
];

const tokens = [
  '--color-surface-raised',
  '--color-text',
  '--color-text-tertiary',
  '--color-success',
  '--color-success-bg',
  '--color-error',
  '--color-error-bg',
  '--radius-2xl',
  '--shadow-sm',
  '--font-weight-bold',
  '--font-weight-semibold',
  '--font-size-caption',
];

export default function StatPage() {
  return (
    <AtomDocPage
      name="Stat"
      description="핵심 지표를 숫자 + 라벨 + 트렌드 + 스파크라인으로 표시하는 카드."
      props={props}
      tokens={tokens}
      category="Molecules"
      categoryHref="/docs/molecules"
    >
      <DocSection title="Preview">
        <ThemeSplit cols={1}>
          <div className="flex flex-wrap gap-4">
            <Stat value={72} label="Robots" trend="up" sparkline={[40, 55, 70, 50, 85, 60]} />
            <Stat value={30} label="Associates" trend="up" sparkline={[30, 60, 45, 75, 55, 65]} />
            <Stat
              value={345}
              label="Throughput"
              trend="down"
              sparkline={[70, 55, 80, 40, 60, 50]}
            />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="With Trend Value">
        <ThemeSplit cols={1}>
          <div className="flex flex-wrap gap-4">
            <Stat value="12.5k" label="Revenue" trend="up" trendValue="+8.2%" />
            <Stat value="3.2k" label="Users" trend="down" trendValue="-2.1%" />
            <Stat value="98%" label="Uptime" trend="neutral" trendValue="0%" />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Without Sparkline">
        <ThemeSplit cols={1}>
          <div className="flex flex-wrap gap-4">
            <Stat value={128} label="Active Tasks" trend="up" />
            <Stat value="4.8" label="Avg. Rating" />
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
