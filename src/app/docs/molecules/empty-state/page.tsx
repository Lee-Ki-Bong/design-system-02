'use client';

import { EmptyState } from '@/components/molecules/EmptyState';
import { Button } from '@/components/atoms/Button';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'icon', type: 'ReactNode', default: '-' },
  { name: 'title', type: 'string', default: '-' },
  { name: 'description', type: 'string', default: '-' },
  { name: 'action', type: 'ReactNode', default: '-' },
  { name: 'variant', type: "'default' | 'dashed'", default: "'default'" },
];

const tokens = [
  '--color-surface-raised',
  '--color-surface-sunken',
  '--color-text',
  '--color-text-secondary',
  '--color-text-tertiary',
  '--color-border-strong',
  '--radius-2xl',
  '--radius-full',
  '--shadow-sm',
  '--font-weight-semibold',
];

const FolderIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

export default function EmptyStatePage() {
  return (
    <AtomDocPage
      name="EmptyState"
      description="콘텐츠가 없을 때 안내 메시지와 액션을 표시하는 빈 상태 컴포넌트."
      props={props}
      tokens={tokens}
      category="Molecules"
      categoryHref="/docs/molecules"
    >
      <DocSection title="Preview">
        <ThemeSplit cols={1}>
          <div className="flex flex-wrap gap-4">
            <EmptyState
              icon={<FolderIcon />}
              title="프로젝트가 없습니다"
              description="새 프로젝트를 만들어 팀과 함께 작업을 시작하세요."
              action={
                <Button variant="primary" size="sm">
                  프로젝트 만들기
                </Button>
              }
              style={{ flex: 1, minWidth: '240px' }}
            />
            <EmptyState
              variant="dashed"
              icon={<PlusIcon />}
              title="파일을 드래그하세요"
              description="또는 클릭하여 파일을 선택할 수 있습니다."
              style={{ flex: 1, minWidth: '240px' }}
            />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Without Action">
        <ThemeSplit cols={1}>
          <EmptyState
            icon={<SearchIcon />}
            title="검색 결과가 없습니다"
            description="다른 키워드로 검색해 보세요."
            style={{ maxWidth: '380px' }}
          />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Minimal">
        <ThemeSplit cols={1}>
          <EmptyState title="데이터 없음" style={{ maxWidth: '380px' }} />
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
