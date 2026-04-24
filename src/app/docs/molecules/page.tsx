'use client';

import Link from 'next/link';
import { Tag } from '@/components/molecules/Tag';
import { AvatarGroup } from '@/components/molecules/AvatarGroup';
import { Stat } from '@/components/molecules/Stat';
import { Card } from '@/components/molecules/Card';
import { Breadcrumb } from '@/components/molecules/Breadcrumb';
import { Pagination } from '@/components/molecules/Pagination';
import { Tabs } from '@/components/molecules/Tabs';
import { NavItem } from '@/components/molecules/NavItem';
import { Badge } from '@/components/atoms/Badge';

function NavIco({ d }: { d: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

type Span = { col?: number; row?: number };

const molecules: {
  name: string;
  href: string;
  desc: string;
  preview: React.ReactNode;
  span?: Span;
}[] = [
  {
    name: 'Tag',
    href: '/docs/molecules/tag',
    desc: '제거 가능한 라벨',
    preview: (
      <div className="flex gap-2">
        <Tag variant="info">React</Tag>
        <Tag variant="success">TS</Tag>
        <Tag variant="warning" onRemove={() => {}}>
          Next
        </Tag>
      </div>
    ),
  },
  {
    name: 'AvatarGroup',
    href: '/docs/molecules/avatar-group',
    desc: '아바타 그룹 + 오버플로',
    preview: (
      <AvatarGroup
        size={28}
        max={3}
        items={[
          { label: 'A', color: 'var(--accent-blue)' },
          { label: 'B', color: 'var(--accent-rose)' },
          { label: 'C', color: 'var(--accent-teal)' },
          { label: 'D', color: 'var(--accent-violet)' },
        ]}
      />
    ),
  },
  {
    name: 'Stat',
    href: '/docs/molecules/stat',
    desc: '숫자 + 라벨 + 트렌드',
    preview: <Stat label="매출" value="₩12.4M" trend="up" trendValue="+8.2%" />,
  },
  {
    name: 'Card',
    href: '/docs/molecules/card',
    desc: '콘텐츠 컨테이너',
    preview: (
      <Card variant="elevated" padding="12px" style={{ width: '100%' }}>
        <div className="text-xs font-semibold" style={{ color: 'var(--color-text)' }}>
          Card
        </div>
        <div className="mt-1 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
          콘텐츠 영역
        </div>
      </Card>
    ),
  },
  {
    name: 'EmptyState',
    href: '/docs/molecules/empty-state',
    desc: '빈 상태 안내',
    preview: (
      <div className="flex flex-col items-center gap-1">
        <div className="text-lg" style={{ color: 'var(--color-text-disabled)' }}>
          ∅
        </div>
        <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
          데이터 없음
        </div>
      </div>
    ),
  },
  {
    name: 'Breadcrumb',
    href: '/docs/molecules/breadcrumb',
    desc: '계층 경로 네비게이션',
    span: { col: 2 },
    preview: <Breadcrumb items={[{ label: '홈' }, { label: '프로젝트' }, { label: '설정' }]} />,
  },
  {
    name: 'Pagination',
    href: '/docs/molecules/pagination',
    desc: '페이지 이동 컨트롤',
    span: { col: 2 },
    preview: <Pagination current={3} total={10} />,
  },
  {
    name: 'Tabs',
    href: '/docs/molecules/tabs',
    desc: 'Pill / Underline 탭',
    span: { col: 2 },
    preview: (
      <Tabs
        items={[
          { label: 'Tab A', value: 'a' },
          { label: 'Tab B', value: 'b' },
          { label: 'Tab C', value: 'c' },
        ]}
        value="a"
      />
    ),
  },
  {
    name: 'NavItem',
    href: '/docs/molecules/nav-item',
    desc: '사이드바 네비게이션 항목',
    span: { row: 2 },
    preview: (
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          background: 'var(--color-surface-raised)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--gap-sm)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <NavItem
          label="홈"
          icon={
            <NavIco d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          }
        />
        <NavItem
          label="대시보드"
          active
          icon={
            <NavIco d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          }
          badge={3}
        />
        <NavItem
          label="일정"
          icon={
            <NavIco d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          }
        />
        <NavItem
          label="멤버"
          icon={
            <NavIco d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20a7.5 7.5 0 0115 0" />
          }
          badge={12}
        />
        <NavItem
          label="설정"
          icon={
            <NavIco d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.646.87.074.04.147.083.22.127.323.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.752-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          }
        />
      </div>
    ),
  },
  {
    name: 'Popover',
    href: '/docs/molecules/popover',
    desc: '클릭 오버레이 콘텐츠',
    preview: (
      <div
        className="rounded-xl px-3 py-2 text-xs"
        style={{
          backgroundColor: 'var(--color-surface-raised)',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <div className="font-semibold" style={{ color: 'var(--color-text)' }}>
          Popover
        </div>
        <div className="mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
          자유 콘텐츠
        </div>
      </div>
    ),
  },
  {
    name: 'DropdownMenu',
    href: '/docs/molecules/dropdown-menu',
    desc: '액션 드롭다운 메뉴',
    span: { row: 2 },
    preview: (
      <div
        className="flex flex-col rounded-xl py-1.5 text-xs"
        style={{
          backgroundColor: 'var(--color-surface-raised)',
          boxShadow: 'var(--shadow-md)',
          width: '100%',
        }}
      >
        <div
          className="px-3 py-0.5 text-[10px] font-medium uppercase tracking-wider"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          Edit
        </div>
        <div className="px-3 py-1.5" style={{ color: 'var(--color-text)' }}>
          수정
        </div>
        <div className="px-3 py-1.5" style={{ color: 'var(--color-text)' }}>
          복제
        </div>
        <div style={{ height: 1, background: 'var(--color-border-subtle)', margin: '3px 0' }} />
        <div className="px-3 py-1.5" style={{ color: 'var(--color-text)' }}>
          다운로드
        </div>
        <div className="px-3 py-1.5" style={{ color: 'var(--color-text)' }}>
          공유
        </div>
        <div style={{ height: 1, background: 'var(--color-border-subtle)', margin: '3px 0' }} />
        <div className="px-3 py-1.5" style={{ color: 'var(--color-error)' }}>
          삭제
        </div>
      </div>
    ),
  },
];

export default function MoleculesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold" style={{ color: 'var(--color-emphasis)' }}>
        Molecules
      </h1>
      <p className="mt-2" style={{ color: 'var(--color-text-secondary)' }}>
        Atom 조합으로 구성된 단일 기능 컴포넌트
      </p>
      <div
        className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2"
        style={{ gridAutoRows: 'min-content' }}
      >
        {molecules.map((m) => {
          const colSpan = m.span?.col === 2 ? 'sm:col-span-2' : '';
          const rowSpan = m.span?.row === 2 ? 'sm:row-span-2' : '';
          const previewH = m.span?.row === 2 ? 'min-h-56' : 'h-28';

          return (
            <Link
              key={m.href}
              href={m.href}
              className={`group rounded-2xl p-6 transition-all hover:scale-[1.01] ${colSpan} ${rowSpan}`}
              style={{
                backgroundColor: 'var(--color-surface-raised)',
                border: '1px solid var(--color-border-subtle)',
              }}
            >
              <div
                className={`mb-4 flex ${previewH} items-center justify-center rounded-xl px-5 py-4`}
                style={{ backgroundColor: 'var(--color-surface-sunken)' }}
              >
                {m.preview}
              </div>
              <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                {m.name}
              </p>
              <p className="mt-1 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                {m.desc}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
