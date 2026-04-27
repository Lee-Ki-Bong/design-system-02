'use client';

import { useState } from 'react';
import { Header } from '@/components/organisms/Header';
import { Icon } from '@/components/atoms/Icon';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';
import type { DropdownMenuItem } from '@/components/molecules/DropdownMenu';

const props = [
  { name: 'brand', type: 'HeaderBrand', default: '-' },
  { name: 'showSearch', type: 'boolean', default: 'false' },
  { name: 'searchValue', type: 'string', default: '-' },
  { name: 'searchPlaceholder', type: 'string', default: "'검색...'" },
  { name: 'onSearchChange', type: '(value: string) => void', default: '-' },
  { name: 'user', type: 'HeaderUser', default: '-' },
  { name: 'actions', type: 'ReactNode', default: '-' },
  { name: 'onNavigate', type: '(href: string) => void', default: '-' },
];

const tokens = [
  '--color-surface-raised',
  '--color-surface',
  '--color-emphasis',
  '--color-on-emphasis',
  '--color-text',
  '--color-text-tertiary',
  '--color-border-subtle',
  '--color-border',
  '--radius-md',
  '--radius-full',
  '--gap-xs',
  '--gap-sm',
  '--gap-md',
  '--pad-lg',
  '--font-size-body',
  '--font-size-body-sm',
  '--font-weight-medium',
  '--font-weight-bold',
];

const userMenuItems: DropdownMenuItem[] = [
  { type: 'label', text: 'Account' },
  {
    type: 'item',
    label: '프로필',
    icon: <Icon name="user" size={16} />,
    onSelect: () => {},
  },
  {
    type: 'item',
    label: '설정',
    icon: <Icon name="settings" size={16} />,
    onSelect: () => {},
  },
  { type: 'separator' },
  {
    type: 'item',
    label: '로그아웃',
    icon: <Icon name="logout" size={16} />,
    destructive: true,
    onSelect: () => {},
  },
];

function DemoBasic() {
  return (
    <Header
      brand={{ logo: 'B', name: 'Whitebong UI', href: '/' }}
      user={{ name: '이기봉', initials: '기', menuItems: userMenuItems }}
    />
  );
}

function DemoWithSearch() {
  const [search, setSearch] = useState('');
  return (
    <Header
      brand={{ logo: 'A', name: 'Admin', href: '/' }}
      showSearch
      searchValue={search}
      onSearchChange={setSearch}
      user={{
        name: 'John Doe',
        avatar: 'https://picsum.photos/seed/user1/100/100',
        menuItems: userMenuItems,
      }}
    />
  );
}

function DemoWithActions() {
  return (
    <Header
      brand={{ logo: 'D', name: 'Dashboard' }}
      user={{ name: '관리자', initials: '관', menuItems: userMenuItems }}
      actions={
        <button
          type="button"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--color-border-subtle)',
            background: 'transparent',
            cursor: 'pointer',
            color: 'var(--color-text-secondary)',
            position: 'relative',
          }}
        >
          <Icon name="bell" size={18} />
          <span
            style={{
              position: 'absolute',
              top: 6,
              right: 6,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--color-error)',
              border: '2px solid var(--color-surface-raised)',
            }}
          />
        </button>
      }
    />
  );
}

function DemoBrandOnly() {
  return <Header brand={{ logo: 'W', name: 'Whitebong' }} />;
}

export default function HeaderPage() {
  return (
    <AtomDocPage
      name="Header"
      description="브랜드 + 검색 + 유저 메뉴를 제공하는 상단 헤더바 Organism."
      props={props}
      tokens={tokens}
      category="Organisms"
      categoryHref="/docs/organisms"
    >
      <DocSection title="Basic (브랜드 + 유저 메뉴)">
        <ThemeSplit>
          <DemoBasic />
        </ThemeSplit>
      </DocSection>

      <DocSection title="With Search">
        <ThemeSplit>
          <DemoWithSearch />
        </ThemeSplit>
      </DocSection>

      <DocSection title="With Actions (알림 버튼)">
        <ThemeSplit>
          <DemoWithActions />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Brand Only">
        <ThemeSplit>
          <DemoBrandOnly />
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
