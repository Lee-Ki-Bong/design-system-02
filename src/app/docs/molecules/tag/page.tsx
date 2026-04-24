'use client';

import { useState } from 'react';
import { Tag } from '@/components/molecules/Tag';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  {
    name: 'variant',
    type: "'default' | 'success' | 'warning' | 'error' | 'info' | 'emphasis'",
    default: "'default'",
  },
  { name: 'size', type: "'sm' | 'lg'", default: "'sm'" },
  { name: 'onRemove', type: '() => void', default: '-' },
  { name: 'disabled', type: 'boolean', default: 'false' },
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
  '--opacity-disabled',
  '--token-transition-fast',
];

function RemovableDemo() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind', 'Next.js']);
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((tag) => (
        <Tag
          key={tag}
          variant="info"
          onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}
        >
          {tag}
        </Tag>
      ))}
      {tags.length === 0 && (
        <span className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
          모든 태그가 제거되었습니다.
          <button
            className="ml-2 underline"
            style={{ color: 'var(--color-primary)' }}
            onClick={() => setTags(['React', 'TypeScript', 'Tailwind', 'Next.js'])}
          >
            초기화
          </button>
        </span>
      )}
    </div>
  );
}

export default function TagPage() {
  return (
    <AtomDocPage
      name="Tag"
      description="제거 가능한 라벨. 필터 칩, 태깅, 선택된 항목 표시 등에 사용한다."
      props={props}
      tokens={tokens}
      category="Molecules"
      categoryHref="/docs/molecules"
    >
      <DocSection title="Preview">
        <ThemeSplit cols={1}>
          <div className="flex flex-wrap items-center gap-2">
            <Tag>Default</Tag>
            <Tag variant="success">Success</Tag>
            <Tag variant="warning">Warning</Tag>
            <Tag variant="error">Error</Tag>
            <Tag variant="info">Info</Tag>
            <Tag variant="emphasis">Emphasis</Tag>
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="With Remove">
        <ThemeSplit cols={1}>
          <div className="flex flex-wrap items-center gap-2">
            <Tag variant="default" onRemove={() => {}}>
              Removable
            </Tag>
            <Tag variant="success" onRemove={() => {}}>
              Removable
            </Tag>
            <Tag variant="error" onRemove={() => {}}>
              Removable
            </Tag>
            <Tag variant="emphasis" onRemove={() => {}}>
              Removable
            </Tag>
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Sizes">
        <ThemeSplit cols={1}>
          <div className="flex flex-wrap items-center gap-2">
            <Tag variant="info" onRemove={() => {}}>
              Small (default)
            </Tag>
            <Tag variant="info" size="lg" onRemove={() => {}}>
              Large
            </Tag>
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Disabled">
        <ThemeSplit cols={1}>
          <div className="flex flex-wrap items-center gap-2">
            <Tag variant="info" disabled onRemove={() => {}}>
              Disabled
            </Tag>
            <Tag variant="success" disabled>
              Disabled
            </Tag>
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Interactive Demo">
        <ThemeSplit cols={1}>
          <RemovableDemo />
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
