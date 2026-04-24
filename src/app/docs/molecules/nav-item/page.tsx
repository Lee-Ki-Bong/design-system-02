'use client';

import { useState } from 'react';
import { NavItem } from '@/components/molecules/NavItem';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'icon', type: 'ReactNode', default: '-' },
  { name: 'label', type: 'string', default: '-' },
  { name: 'badge', type: 'number', default: '-' },
  { name: 'active', type: 'boolean', default: 'false' },
  { name: 'depth', type: 'number', default: '0' },
  { name: 'href', type: 'string', default: '-' },
  { name: 'onClick', type: '() => void', default: '-' },
];

const tokens = [
  '--color-text',
  '--color-text-secondary',
  '--color-surface',
  '--color-surface-sunken',
  '--color-emphasis',
  '--color-on-emphasis',
  '--radius-lg',
  '--gap-sm',
  '--gap-md',
  '--font-size-body-sm',
  '--font-weight-medium',
  '--font-weight-semibold',
  '--font-sans',
  '--token-transition-fast',
];

function HomeIcon() {
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
      <path d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}

function SearchIcon() {
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
      <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function CalendarIcon() {
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
      <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function UserIcon() {
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
      <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20a7.5 7.5 0 0115 0" />
    </svg>
  );
}

function SettingsIcon() {
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
      <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.646.87.074.04.147.083.22.127.323.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.752-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function InteractiveDemo() {
  const [active, setActive] = useState('dashboard');
  const items = [
    { id: 'home', label: '홈', icon: <HomeIcon /> },
    { id: 'dashboard', label: '대시보드', icon: <SearchIcon />, badge: 3 },
    { id: 'schedule', label: '일정', icon: <CalendarIcon /> },
    { id: 'members', label: '멤버', icon: <UserIcon />, badge: 12 },
    { id: 'settings', label: '설정', icon: <SettingsIcon /> },
  ];

  return (
    <div style={{ width: '220px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
      {items.map((item) => (
        <NavItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          badge={item.badge}
          active={active === item.id}
          onClick={() => setActive(item.id)}
        />
      ))}
    </div>
  );
}

export default function NavItemPage() {
  return (
    <AtomDocPage
      name="NavItem"
      description="사이드바 네비게이션 항목. 아이콘, 라벨, badge count, active 상태를 지원한다."
      props={props}
      tokens={tokens}
      category="Molecules"
      categoryHref="/docs/molecules"
    >
      <DocSection title="Preview">
        <ThemeSplit cols={1}>
          <div style={{ width: '220px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <NavItem icon={<HomeIcon />} label="홈" />
            <NavItem icon={<SearchIcon />} label="대시보드" active />
            <NavItem icon={<CalendarIcon />} label="일정" />
            <NavItem icon={<UserIcon />} label="멤버" />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="With Badge">
        <ThemeSplit cols={1}>
          <div style={{ width: '220px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <NavItem icon={<HomeIcon />} label="홈" />
            <NavItem icon={<SearchIcon />} label="알림" badge={5} />
            <NavItem icon={<UserIcon />} label="멤버" badge={23} active />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="With Depth">
        <ThemeSplit cols={1}>
          <div style={{ width: '220px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <NavItem icon={<HomeIcon />} label="Design System" active />
            <NavItem label="Foundations" depth={1} />
            <NavItem label="Colors" depth={2} active />
            <NavItem label="Typography" depth={2} />
            <NavItem label="Spacing" depth={2} />
            <NavItem label="Components" depth={1} />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Without Icon">
        <ThemeSplit cols={1}>
          <div style={{ width: '220px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <NavItem label="프로젝트" />
            <NavItem label="팀" active />
            <NavItem label="설정" badge={2} />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Interactive Demo">
        <ThemeSplit cols={1}>
          <InteractiveDemo />
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
