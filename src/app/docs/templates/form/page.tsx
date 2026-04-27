'use client';

import { Icon } from '@/components/atoms/Icon';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'sidebar', type: 'ReactNode', default: '-' },
  { name: 'header', type: 'ReactNode', default: '-' },
  { name: 'sidebarWidth', type: 'number', default: '240' },
  { name: 'breadcrumb', type: 'ReactNode', default: '-' },
  { name: 'title', type: 'ReactNode', default: '-' },
  { name: 'children', type: 'ReactNode', default: '-' },
  { name: 'maxWidth', type: 'number', default: '720' },
];

const tokens = [
  '--color-bg',
  '--color-text',
  '--z-sticky',
  '--pad-xl',
  '--pad-2xl',
  '--pad-3xl',
  '--pad-md',
];

export default function FormTemplatePage() {
  return (
    <AtomDocPage
      name="FormPageTemplate"
      description="Sidebar + Header + Breadcrumb + FormLayout으로 구성된 생성/수정 폼 페이지 Template."
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
            <strong style={{ color: 'var(--color-text)' }}>Breadcrumb</strong> — 현재 위치 경로
            (Breadcrumb molecule)
          </li>
          <li>
            <strong style={{ color: 'var(--color-text)' }}>FormLayout</strong> — 카드 + 필드 그리드
            + 유효성 (FormLayout organism)
          </li>
          <li>
            <strong style={{ color: 'var(--color-text)' }}>FormActions</strong> — 취소/저장 버튼
            (FormActions organism)
          </li>
          <li>
            <strong style={{ color: 'var(--color-text)' }}>maxWidth</strong> — 폼 콘텐츠 최대 너비
            제한 (기본 720px)
          </li>
        </ul>
      </DocSection>

      <DocSection title="미리보기">
        <a
          href="/preview/form"
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
