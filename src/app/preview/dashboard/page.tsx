'use client';

import { useState } from 'react';
import { DashboardTemplate } from '@/components/templates/DashboardTemplate';
import { Sidebar } from '@/components/organisms/Sidebar';
import { Header } from '@/components/organisms/Header';
import { Stat } from '@/components/molecules/Stat';
import { Card } from '@/components/molecules/Card';
import { Badge } from '@/components/atoms/Badge';
import { Avatar } from '@/components/atoms/Avatar';
import { Icon } from '@/components/atoms/Icon';
import { Progress } from '@/components/atoms/Progress';
import type { DropdownMenuItem } from '@/components/molecules/DropdownMenu';

const sidebarSections = [
  {
    title: 'Menu',
    items: [
      { label: 'Dashboard', href: '/dashboard' },
      {
        label: 'Projects',
        href: '/projects',
        children: [
          { label: 'Active', href: '/projects/active' },
          { label: 'Archived', href: '/projects/archived' },
        ],
      },
      { label: 'Members', href: '/members' },
      { label: 'Analytics', href: '/analytics' },
      { label: 'Settings', href: '/settings' },
    ],
  },
];

const userMenu: DropdownMenuItem[] = [
  { type: 'label', text: 'Account' },
  { type: 'item', label: '프로필', icon: <Icon name="user" size={16} />, onSelect: () => {} },
  { type: 'item', label: '설정', icon: <Icon name="settings" size={16} />, onSelect: () => {} },
  { type: 'separator' },
  {
    type: 'item',
    label: '로그아웃',
    icon: <Icon name="logout" size={16} />,
    destructive: true,
    onSelect: () => {},
  },
];

const activities = [
  {
    name: '김지연',
    action: '프로젝트 생성',
    target: 'Design System v2',
    time: '2분 전',
    color: 'var(--accent-blue)',
  },
  {
    name: '박지훈',
    action: '이슈 해결',
    target: '#342 다크모드 버그',
    time: '15분 전',
    color: 'var(--accent-rose)',
  },
  {
    name: '이지수',
    action: '파일 업로드',
    target: 'Q4 보고서.pdf',
    time: '1시간 전',
    color: 'var(--accent-teal)',
  },
  {
    name: '최동훈',
    action: '멤버 초대',
    target: '한소영',
    time: '3시간 전',
    color: 'var(--accent-amber)',
  },
];

const projects = [
  { name: 'Design System v2', progress: 72, members: 5 },
  { name: 'Mobile App', progress: 45, members: 8 },
  { name: 'API Gateway', progress: 91, members: 3 },
  { name: 'Analytics Dashboard', progress: 28, members: 4 },
];

export default function DashboardPreview() {
  const [activePath, setActivePath] = useState('/dashboard');
  const [search, setSearch] = useState('');

  return (
    <DashboardTemplate
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
          searchPlaceholder="검색..."
          user={{
            name: '이기봉',
            initials: '기',
            menuItems: userMenu,
          }}
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
      }
    >
      {/* Page title */}
      <div style={{ marginBottom: 'var(--pad-xl)' }}>
        <h1
          style={{
            fontSize: 'var(--font-size-h2)',
            fontWeight: 'var(--font-weight-bold)',
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          Dashboard
        </h1>
        <p
          style={{
            fontSize: 'var(--font-size-body-sm)',
            color: 'var(--color-text-secondary)',
            marginTop: 'var(--gap-xs)',
          }}
        >
          프로젝트 현황과 팀 활동을 한눈에 확인하세요.
        </p>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--gap-lg)',
          marginBottom: 'var(--pad-xl)',
        }}
      >
        <Stat label="총 프로젝트" value="12" />
        <Stat label="활성 멤버" value="34" />
        <Stat label="완료 태스크" value="289" />
        <Stat label="이번 주 커밋" value="156" />
      </div>

      {/* Two column layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 'var(--gap-lg)',
        }}
      >
        {/* Projects */}
        <Card style={{ padding: 'var(--pad-lg)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--pad-md)',
            }}
          >
            <span
              style={{
                fontSize: 'var(--font-size-body)',
                fontWeight: 'var(--font-weight-semibold)',
              }}
            >
              진행 중인 프로젝트
            </span>
            <Badge variant="emphasis" size="sm">
              {projects.length}
            </Badge>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
            {projects.map((p) => (
              <div
                key={p.name}
                style={{
                  padding: 'var(--pad-md)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-surface)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--gap-sm)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--font-size-body-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    {p.name}
                  </span>
                  <span
                    style={{
                      fontSize: 'var(--font-size-caption)',
                      color: 'var(--color-text-tertiary)',
                    }}
                  >
                    {p.members}명
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-sm)' }}>
                  <Progress value={p.progress} style={{ flex: 1 }} />
                  <span
                    style={{
                      fontSize: 'var(--font-size-caption)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--color-text-secondary)',
                      minWidth: 36,
                      textAlign: 'right',
                    }}
                  >
                    {p.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent activity */}
        <Card style={{ padding: 'var(--pad-lg)' }}>
          <span
            style={{
              fontSize: 'var(--font-size-body)',
              fontWeight: 'var(--font-weight-semibold)',
              display: 'block',
              marginBottom: 'var(--pad-md)',
            }}
          >
            최근 활동
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
            {activities.map((a, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--gap-md)',
                }}
              >
                <Avatar size={32} color={a.color}>
                  {a.name.charAt(0)}
                </Avatar>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 'var(--font-size-body-sm)' }}>
                    <span style={{ fontWeight: 'var(--font-weight-medium)' }}>{a.name}</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}> {a.action} </span>
                    <span style={{ fontWeight: 'var(--font-weight-medium)' }}>{a.target}</span>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 'var(--font-size-caption)',
                    color: 'var(--color-text-tertiary)',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {a.time}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardTemplate>
  );
}
