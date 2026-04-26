'use client';

import { useState } from 'react';
import { DataTable } from '@/components/organisms/DataTable';
import { Badge } from '@/components/atoms/Badge';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

/* ─── sample data ─── */

interface Member {
  [key: string]: unknown;
  name: string;
  role: string;
  status: 'active' | 'away' | 'offline';
  lastActive: string;
}

const statusMap = {
  active: { variant: 'success' as const, label: '활성' },
  away: { variant: 'warning' as const, label: '자리비움' },
  offline: { variant: 'error' as const, label: '오프라인' },
};

const members: Member[] = [
  { name: '김정호', role: 'Product Designer', status: 'active', lastActive: '방금 전' },
  { name: '이수진', role: 'Frontend Engineer', status: 'active', lastActive: '5분 전' },
  { name: '박민수', role: 'Backend Engineer', status: 'away', lastActive: '1시간 전' },
  { name: '최유나', role: 'Product Manager', status: 'offline', lastActive: '3일 전' },
  { name: '장세훈', role: 'QA Engineer', status: 'active', lastActive: '12분 전' },
  { name: '한지민', role: 'Data Analyst', status: 'active', lastActive: '2분 전' },
  { name: '윤성빈', role: 'DevOps Engineer', status: 'away', lastActive: '30분 전' },
  { name: '정다은', role: 'UX Researcher', status: 'offline', lastActive: '1주 전' },
  { name: '오현우', role: 'iOS Developer', status: 'active', lastActive: '8분 전' },
  { name: '서예린', role: 'Android Developer', status: 'active', lastActive: '1분 전' },
  { name: '임재혁', role: 'Security Engineer', status: 'away', lastActive: '2시간 전' },
  { name: '강민지', role: 'Technical Writer', status: 'offline', lastActive: '5일 전' },
];

const columns = [
  { key: 'name', header: '이름', sortable: true },
  { key: 'role', header: '역할', sortable: true },
  {
    key: 'status',
    header: '상태',
    render: (row: Member) => {
      const s = statusMap[row.status];
      return (
        <Badge variant={s.variant} size="sm">
          {s.label}
        </Badge>
      );
    },
  },
  { key: 'lastActive', header: '최근 활동' },
];

/* ─── props table ─── */

const props = [
  { name: 'columns', type: 'DataTableColumn<T>[]', default: '-' },
  { name: 'data', type: 'T[]', default: '-' },
  { name: 'title', type: 'string', default: '-' },
  { name: 'searchable', type: 'boolean', default: 'false' },
  { name: 'searchPlaceholder', type: 'string', default: "'검색...'" },
  { name: 'pageSize', type: 'number', default: '10' },
  { name: 'sortKey', type: 'string', default: '-' },
  { name: 'sortDirection', type: "'asc' | 'desc' | null", default: '-' },
  { name: 'onSort', type: '(key, dir) => void', default: '-' },
  { name: 'onSearch', type: '(query) => void', default: '-' },
  { name: 'rowKey', type: '(row, index) => string | number', default: 'index' },
  { name: 'emptyText', type: 'string', default: "'데이터가 없습니다'" },
];

const tokens = [
  '--color-surface-raised',
  '--color-surface',
  '--color-text',
  '--color-text-tertiary',
  '--color-border-subtle',
  '--radius-2xl',
  '--shadow-md',
  '--pad-sm',
  '--pad-md',
  '--pad-lg',
  '--pad-xl',
  '--font-size-body',
  '--font-size-body-sm',
  '--font-weight-semibold',
  '--font-weight-medium',
  '--token-transition-fast',
];

/* ─── demos ─── */

function DemoBasic() {
  return <DataTable columns={columns} data={members.slice(0, 5)} title="멤버 목록" />;
}

function DemoSearchable() {
  const [search, setSearch] = useState('');
  const filtered = members.filter(
    (m) => m.name.includes(search) || m.role.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <DataTable
      columns={columns}
      data={filtered}
      title="멤버 목록"
      searchable
      onSearch={setSearch}
    />
  );
}

function DemoPaginated() {
  return (
    <DataTable
      columns={columns}
      data={members}
      title="멤버 목록"
      searchable
      pageSize={5}
      rowKey={(row) => row.name}
    />
  );
}

/* ─── page ─── */

export default function DataTablePage() {
  return (
    <AtomDocPage
      name="DataTable"
      description="정렬, 검색, 페이지네이션을 갖춘 데이터 테이블. SearchInput과 Pagination Molecule을 조합한 Organism."
      props={props}
      tokens={tokens}
      category="Organisms"
      categoryHref="/docs/organisms"
    >
      <DocSection title="Basic">
        <ThemeSplit>
          <DemoBasic />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Searchable">
        <ThemeSplit>
          <DemoSearchable />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Paginated (pageSize=5)">
        <ThemeSplit>
          <DemoPaginated />
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
