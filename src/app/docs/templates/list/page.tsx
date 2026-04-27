'use client';

import { Icon } from '@/components/atoms/Icon';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'sidebar', type: 'ReactNode', default: '-' },
  { name: 'header', type: 'ReactNode', default: '-' },
  { name: 'sidebarWidth', type: 'number', default: '240' },
  { name: 'title', type: 'ReactNode', default: '-' },
  { name: 'filter', type: 'ReactNode', default: '-' },
  { name: 'children', type: 'ReactNode', default: '-' },
];

const tokens = [
  '--color-bg',
  '--color-text',
  '--z-sticky',
  '--pad-xl',
  '--pad-2xl',
  '--pad-3xl',
  '--pad-lg',
];

export default function ListTemplatePage() {
  return (
    <AtomDocPage
      name="ListPageTemplate"
      description="Sidebar + Header + FilterBar + DataTable로 구성된 목록형 CRUD 페이지 Template."
      props={props}
      tokens={tokens}
      category="Templates"
      categoryHref="/docs/templates"
    >
      <DocSection title="구성">
        <ul
          style={{
            fontSize: 'var(--font-size-body-sm)',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.8,
            paddingLeft: 'var(--pad-lg)',
            margin: 0,
          }}
        >
          <li>
            <strong style={{ color: 'var(--color-text)' }}>Sidebar</strong> — 선택, 좌측 네비게이션
          </li>
          <li>
            <strong style={{ color: 'var(--color-text)' }}>Header</strong> — sticky 상단바
          </li>
          <li>
            <strong style={{ color: 'var(--color-text)' }}>FilterBar</strong> — 검색 + 필터 칩
            (FilterBar organism)
          </li>
          <li>
            <strong style={{ color: 'var(--color-text)' }}>DataTable</strong> — 정렬 + 페이지네이션
            (DataTable organism)
          </li>
        </ul>
      </DocSection>

      <DocSection title="미리보기">
        <a
          href="/preview/list"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--gap-sm)',
            padding: 'var(--pad-sm) var(--pad-lg)',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-emphasis)',
            color: 'var(--color-on-emphasis)',
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 'var(--font-weight-medium)',
            fontFamily: 'var(--font-sans)',
            textDecoration: 'none',
            transition: 'opacity 150ms',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.85';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          <Icon name="externalLink" size={16} />
          전체 화면 미리보기 열기
        </a>
      </DocSection>
    </AtomDocPage>
  );
}
