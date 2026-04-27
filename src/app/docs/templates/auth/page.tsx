'use client';

import { Icon } from '@/components/atoms/Icon';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'brand', type: '{ logo: ReactNode; name: string }', default: '-' },
  { name: 'children', type: 'ReactNode', default: '-' },
  { name: 'maxWidth', type: 'number', default: '420' },
  { name: 'footer', type: 'ReactNode', default: '-' },
];

const tokens = [
  '--color-bg',
  '--color-text',
  '--color-surface-raised',
  '--color-emphasis',
  '--color-on-emphasis',
  '--color-primary',
  '--color-text-tertiary',
  '--shadow-lg',
  '--radius-lg',
  '--radius-2xl',
  '--pad-xl',
  '--pad-2xl',
  '--font-sans',
];

export default function AuthTemplatePage() {
  return (
    <AtomDocPage
      name="AuthTemplate"
      description="로그인/회원가입 등 인증 페이지를 위한 중앙 정렬 카드 레이아웃 Template."
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
            <strong style={{ color: 'var(--color-text)' }}>Brand</strong> — 로고 + 서비스명 (상단)
          </li>
          <li>
            <strong style={{ color: 'var(--color-text)' }}>Card</strong> — 중앙 폼 컨테이너
            (surface-raised + shadow)
          </li>
          <li>
            <strong style={{ color: 'var(--color-text)' }}>Footer</strong> — 하단 보조 링크
            (회원가입 등)
          </li>
          <li>
            <strong style={{ color: 'var(--color-text)' }}>maxWidth</strong> — 카드 최대 너비 제한
            (기본 420px)
          </li>
        </ul>
      </DocSection>

      <DocSection title="미리보기">
        <a
          href="/preview/auth"
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
