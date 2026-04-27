'use client';

import { useState } from 'react';
import { ListPageTemplate } from '@/components/templates/ListPageTemplate';
import { Sidebar } from '@/components/organisms/Sidebar';
import { Header } from '@/components/organisms/Header';
import { FilterBar } from '@/components/organisms/FilterBar';
import { DataTable, type DataTableColumn } from '@/components/organisms/DataTable';
import { Badge } from '@/components/atoms/Badge';
import { Icon } from '@/components/atoms/Icon';
import { Avatar } from '@/components/atoms/Avatar';
import type { DropdownMenuItem } from '@/components/molecules/DropdownMenu';

/* ─── sidebar config ─── */
const sidebarSections = [
  {
    title: 'Menu',
    items: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Members', href: '/members' },
      { label: 'Projects', href: '/projects' },
      { label: 'Settings', href: '/settings' },
    ],
  },
];

const userMenu: DropdownMenuItem[] = [
  { type: 'item', label: '프로필', icon: <Icon name="user" size={16} />, onSelect: () => {} },
  { type: 'separator' },
  {
    type: 'item',
    label: '로그아웃',
    icon: <Icon name="logout" size={16} />,
    destructive: true,
    onSelect: () => {},
  },
];

/* ─── table data ─── */
type Member = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joined: string;
  color: string;
  [key: string]: unknown;
};

const members: Member[] = [
  {
    id: 1,
    name: '김지연',
    email: 'jiyeon@acme.co',
    role: '디자인',
    status: 'active',
    joined: '2024-01-15',
    color: 'var(--accent-blue)',
  },
  {
    id: 2,
    name: '박지훈',
    email: 'jihun@acme.co',
    role: '개발',
    status: 'active',
    joined: '2024-02-20',
    color: 'var(--accent-rose)',
  },
  {
    id: 3,
    name: '이지수',
    email: 'jisoo@acme.co',
    role: '마케팅',
    status: 'pending',
    joined: '2024-03-10',
    color: 'var(--accent-teal)',
  },
  {
    id: 4,
    name: '최동훈',
    email: 'donghun@acme.co',
    role: '개발',
    status: 'active',
    joined: '2024-04-05',
    color: 'var(--accent-amber)',
  },
  {
    id: 5,
    name: '한소영',
    email: 'soyoung@acme.co',
    role: '프로덕트',
    status: 'inactive',
    joined: '2023-11-22',
    color: 'var(--accent-violet)',
  },
  {
    id: 6,
    name: '정민호',
    email: 'minho@acme.co',
    role: '디자인',
    status: 'active',
    joined: '2024-05-01',
    color: 'var(--accent-blue)',
  },
  {
    id: 7,
    name: '윤서현',
    email: 'seohyun@acme.co',
    role: '개발',
    status: 'active',
    joined: '2024-06-12',
    color: 'var(--accent-rose)',
  },
  {
    id: 8,
    name: '강태우',
    email: 'taewoo@acme.co',
    role: '마케팅',
    status: 'pending',
    joined: '2024-07-08',
    color: 'var(--accent-teal)',
  },
];

const statusMap = {
  active: { label: '활성', variant: 'success' as const },
  inactive: { label: '비활성', variant: 'default' as const },
  pending: { label: '대기', variant: 'warning' as const },
};

const columns: DataTableColumn<Member>[] = [
  {
    key: 'name',
    header: '이름',
    sortable: true,
    render: (row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-sm)' }}>
        <Avatar size={28} color={row.color}>
          {row.name.charAt(0)}
        </Avatar>
        <div>
          <div style={{ fontWeight: 'var(--font-weight-medium)' }}>{row.name}</div>
          <div
            style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-tertiary)' }}
          >
            {row.email}
          </div>
        </div>
      </div>
    ),
  },
  { key: 'role', header: '역할', sortable: true },
  {
    key: 'status',
    header: '상태',
    sortable: true,
    render: (row) => {
      const s = statusMap[row.status];
      return (
        <Badge variant={s.variant} size="sm">
          {s.label}
        </Badge>
      );
    },
  },
  { key: 'joined', header: '가입일', sortable: true },
];

/* ─── filters ─── */
const filterChips = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '활성' },
  { value: 'pending', label: '대기' },
  { value: 'inactive', label: '비활성' },
];

export default function ListPagePreview() {
  const [activePath, setActivePath] = useState('/members');
  const [search, setSearch] = useState('');
  const [filterSearch, setFilterSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = members.filter((m) => {
    if (activeFilter !== 'all' && m.status !== activeFilter) return false;
    if (filterSearch && !m.name.includes(filterSearch) && !m.email.includes(filterSearch))
      return false;
    return true;
  });

  return (
    <ListPageTemplate
      sidebar={
        <Sidebar
          brand={{ logo: 'B', name: 'Bong CRM', href: '/dashboard' }}
          sections={sidebarSections}
          activePath={activePath}
          onNavigate={setActivePath}
          style={{ height: '100%', borderRadius: 0 }}
        />
      }
      header={
        <Header
          showSearch
          searchValue={search}
          onSearchChange={setSearch}
          user={{ name: '이기봉', initials: '기', menuItems: userMenu }}
        />
      }
      title={
        <div>
          <h1
            style={{
              fontSize: 'var(--font-size-h2)',
              fontWeight: 'var(--font-weight-bold)',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            멤버 관리
          </h1>
          <p
            style={{
              fontSize: 'var(--font-size-body-sm)',
              color: 'var(--color-text-secondary)',
              marginTop: 'var(--gap-xs)',
            }}
          >
            팀 멤버 목록을 검색하고 관리합니다.
          </p>
        </div>
      }
      filter={
        <FilterBar
          searchValue={filterSearch}
          onSearchChange={setFilterSearch}
          searchPlaceholder="멤버 검색..."
          chips={filterChips}
          activeChip={activeFilter}
          onChipChange={setActiveFilter}
          resultCount={filtered.length}
        />
      }
    >
      <DataTable data={filtered} columns={columns} rowKey={(row) => String(row.id)} pageSize={6} />
    </ListPageTemplate>
  );
}
