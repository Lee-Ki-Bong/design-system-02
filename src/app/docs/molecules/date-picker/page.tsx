'use client';

import { useState } from 'react';
import { DatePicker } from '@/components/molecules/DatePicker';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'value', type: 'Date', default: '-' },
  { name: 'defaultValue', type: 'Date', default: '-' },
  { name: 'onChange', type: '(date: Date | undefined) => void', default: '-' },
  { name: 'placeholder', type: 'string', default: "'YYYY-MM-DD'" },
  { name: 'dateFormat', type: 'string', default: "'yyyy-MM-dd'" },
  { name: 'disabled', type: 'boolean', default: 'false' },
  { name: 'error', type: 'string', default: '-' },
  { name: 'label', type: 'string', default: '-' },
  { name: 'hint', type: 'string', default: '-' },
];

const tokens = [
  '--color-surface-raised',
  '--color-surface-sunken',
  '--color-surface',
  '--color-text',
  '--color-text-secondary',
  '--color-text-tertiary',
  '--color-text-disabled',
  '--color-border',
  '--color-border-subtle',
  '--color-emphasis',
  '--color-on-emphasis',
  '--color-primary',
  '--color-error',
  '--height-lg',
  '--radius-xl',
  '--radius-2xl',
  '--radius-md',
  '--shadow-lg',
  '--ring',
  '--token-transition-fast',
];

function DemoBasic() {
  const [date, setDate] = useState<Date | undefined>();
  return <DatePicker value={date} onChange={setDate} style={{ maxWidth: 280 }} />;
}

function DemoWithLabel() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 3, 21));
  return (
    <DatePicker
      label="시작일"
      value={date}
      onChange={setDate}
      hint="프로젝트 시작일을 선택하세요"
      style={{ maxWidth: 280 }}
    />
  );
}

function DemoError() {
  return <DatePicker label="마감일" error="마감일은 필수 항목입니다." style={{ maxWidth: 280 }} />;
}

function DemoDisabled() {
  return (
    <DatePicker
      label="확정일"
      defaultValue={new Date(2026, 3, 21)}
      disabled
      style={{ maxWidth: 280 }}
    />
  );
}

export default function DatePickerPage() {
  return (
    <AtomDocPage
      name="DatePicker"
      description="캘린더 팝업 기반 날짜 선택 컴포넌트. 직접 입력 또는 캘린더에서 선택 가능."
      props={props}
      tokens={tokens}
      category="Molecules"
      categoryHref="/docs/molecules"
    >
      <div
        className="rounded-xl p-4 mb-6"
        style={{
          background: 'var(--color-surface-sunken)',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <strong style={{ color: 'var(--color-text)' }}>Dependencies:</strong>{' '}
          <code
            className="rounded px-1.5 py-0.5 text-xs"
            style={{ background: 'var(--color-surface)', color: 'var(--color-primary)' }}
          >
            react-day-picker@9
          </code>{' '}
          +{' '}
          <code
            className="rounded px-1.5 py-0.5 text-xs"
            style={{ background: 'var(--color-surface)', color: 'var(--color-primary)' }}
          >
            date-fns@4
          </code>{' '}
          &mdash; 캘린더 로직과 날짜 포맷팅에 사용합니다.
        </p>
      </div>

      <DocSection title="Basic">
        <ThemeSplit>
          <DemoBasic />
        </ThemeSplit>
      </DocSection>

      <DocSection title="With Label + Hint">
        <ThemeSplit>
          <DemoWithLabel />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Error">
        <ThemeSplit>
          <DemoError />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Disabled">
        <ThemeSplit>
          <DemoDisabled />
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
