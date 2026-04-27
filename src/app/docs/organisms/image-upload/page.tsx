'use client';

import { useState } from 'react';
import { ImageUpload, type ImageItem } from '@/components/organisms/ImageUpload';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'value', type: 'ImageItem[]', default: '[]' },
  { name: 'onChange', type: '(items: ImageItem[]) => void', default: '-' },
  { name: 'max', type: 'number', default: '10' },
  { name: 'accept', type: 'string', default: "'image/*'" },
  { name: 'disabled', type: 'boolean', default: 'false' },
];

const tokens = [
  '--color-surface-sunken',
  '--color-text-tertiary',
  '--color-border',
  '--color-border-subtle',
  '--color-primary',
  '--radius-xl',
  '--radius-full',
  '--gap-xs',
  '--gap-md',
  '--font-size-caption',
  '--font-weight-medium',
  '--token-transition-fast',
];

const sampleImages: ImageItem[] = [
  { id: 'sample-1', url: 'https://picsum.photos/seed/ds1/400/400' },
  { id: 'sample-2', url: 'https://picsum.photos/seed/ds2/400/400' },
  { id: 'sample-3', url: 'https://picsum.photos/seed/ds3/400/400' },
];

function DemoBasic() {
  const [items, setItems] = useState<ImageItem[]>([]);
  return <ImageUpload value={items} onChange={setItems} max={6} />;
}

function DemoWithImages() {
  const [items, setItems] = useState<ImageItem[]>(sampleImages);
  return <ImageUpload value={items} onChange={setItems} max={6} />;
}

function DemoDisabled() {
  return <ImageUpload value={sampleImages} disabled max={6} />;
}

export default function ImageUploadPage() {
  return (
    <AtomDocPage
      name="ImageUpload"
      description="이미지 그리드 + 드래그 재정렬 + 추가/삭제를 지원하는 이미지 업로드 Organism."
      props={props}
      tokens={tokens}
      category="Organisms"
      categoryHref="/docs/organisms"
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
            @dnd-kit/core
          </code>{' '}
          +{' '}
          <code
            className="rounded px-1.5 py-0.5 text-xs"
            style={{ background: 'var(--color-surface)', color: 'var(--color-primary)' }}
          >
            @dnd-kit/sortable
          </code>{' '}
          &mdash; 드래그 재정렬에 사용합니다.
        </p>
      </div>

      <DocSection title="Empty (클릭 또는 드래그로 추가)">
        <ThemeSplit>
          <DemoBasic />
        </ThemeSplit>
      </DocSection>

      <DocSection title="With Images (드래그로 재정렬)">
        <ThemeSplit>
          <DemoWithImages />
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
