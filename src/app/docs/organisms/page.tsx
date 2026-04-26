'use client';

import Link from 'next/link';

type Span = { col?: number; row?: number };

const organisms: {
  name: string;
  href: string;
  desc: string;
  span?: Span;
}[] = [
  {
    name: 'DataTable',
    href: '/docs/organisms/data-table',
    desc: '정렬·검색·페이지네이션 테이블',
    span: { col: 2 },
  },
  {
    name: 'FilterBar',
    href: '/docs/organisms/filter-bar',
    desc: '검색 + 필터 칩 + 활성 태그',
    span: { col: 2 },
  },
  {
    name: 'FormLayout',
    href: '/docs/organisms/form-layout',
    desc: '폼 카드 + 필드 그리드 + 액션',
  },
  {
    name: 'ImageUpload',
    href: '/docs/organisms/image-upload',
    desc: '이미지 그리드 + 재정렬 + 크롭',
  },
  {
    name: 'Sidebar',
    href: '/docs/organisms/sidebar',
    desc: '네비게이션 사이드바',
  },
  {
    name: 'Header',
    href: '/docs/organisms/header',
    desc: '로고 + 검색 + 유저 메뉴',
    span: { col: 2 },
  },
  {
    name: 'Footer',
    href: '/docs/organisms/footer',
    desc: '링크 그룹 + 카피라이트',
    span: { col: 2 },
  },
];

export default function OrganismsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold" style={{ color: 'var(--color-emphasis)' }}>
        Organisms
      </h1>
      <p className="mt-2" style={{ color: 'var(--color-text-secondary)' }}>
        Molecule + Atom 조합의 독립적 UI 섹션
      </p>
      <div
        className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2"
        style={{ gridAutoRows: 'min-content' }}
      >
        {organisms.map((o) => {
          const colSpan = o.span?.col === 2 ? 'sm:col-span-2' : '';

          return (
            <Link
              key={o.href}
              href={o.href}
              className={`group rounded-2xl p-6 transition-all hover:scale-[1.01] ${colSpan}`}
              style={{
                backgroundColor: 'var(--color-surface-raised)',
                border: '1px solid var(--color-border-subtle)',
              }}
            >
              <div
                className="mb-4 flex h-28 items-center justify-center rounded-xl"
                style={{ backgroundColor: 'var(--color-surface-sunken)' }}
              />
              <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                {o.name}
              </p>
              <p className="mt-1 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                {o.desc}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
