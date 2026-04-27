'use client';

import { useState } from 'react';
import { FormPageTemplate } from '@/components/templates/FormPageTemplate';
import { Sidebar } from '@/components/organisms/Sidebar';
import { Header } from '@/components/organisms/Header';
import { FormLayout, FormField, FormRow, FormActions } from '@/components/organisms/FormLayout';
import { Breadcrumb } from '@/components/molecules/Breadcrumb';
import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import { Select } from '@/components/atoms/Select';
import { Button } from '@/components/atoms/Button';
import { Switch } from '@/components/atoms/Switch';
import { Icon } from '@/components/atoms/Icon';
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
          { label: 'New', href: '/projects/new' },
        ],
      },
      { label: 'Members', href: '/members' },
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

export default function FormPagePreview() {
  const [activePath, setActivePath] = useState('/projects/new');
  const [name, setName] = useState('Customer Portal Redesign');
  const [startDate, setStartDate] = useState('2026-04-21');
  const [endDate, setEndDate] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('medium');
  const [notify, setNotify] = useState(true);

  return (
    <FormPageTemplate
      sidebar={
        <Sidebar
          brand={{ logo: 'B', name: 'Bong CRM', href: '/dashboard' }}
          sections={sidebarSections}
          activePath={activePath}
          onNavigate={setActivePath}
          style={{ height: '100%', borderRadius: 0 }}
        />
      }
      header={<Header user={{ name: '이기봉', initials: '기', menuItems: userMenu }} />}
      breadcrumb={
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Projects', href: '/projects' },
            { label: '새 프로젝트' },
          ]}
        />
      }
      title={
        <div style={{ marginBottom: 'var(--pad-sm)' }}>
          <h1
            style={{
              fontSize: 'var(--font-size-h2)',
              fontWeight: 'var(--font-weight-bold)',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            새 프로젝트
          </h1>
          <p
            style={{
              fontSize: 'var(--font-size-body-sm)',
              color: 'var(--color-text-secondary)',
              marginTop: 'var(--gap-xs)',
            }}
          >
            프로젝트 정보를 입력하고 팀에 공유하세요.
          </p>
        </div>
      }
    >
      <FormLayout title="기본 정보">
        <FormField label="프로젝트 이름" required>
          <Input
            placeholder="프로젝트 이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormField>

        <FormRow>
          <FormField label="시작일">
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </FormField>
          <FormField label="마감일" hint="비워두면 기한 없음">
            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </FormField>
        </FormRow>

        <FormField label="우선순위">
          <Select
            value={priority}
            onChange={(v) => setPriority(v)}
            options={[
              { value: 'low', label: '낮음' },
              { value: 'medium', label: '보통' },
              { value: 'high', label: '높음' },
              { value: 'urgent', label: '긴급' },
            ]}
          />
        </FormField>

        <FormField
          label="설명"
          required
          error={desc === '' ? '프로젝트 설명은 필수 항목입니다.' : undefined}
        >
          <Textarea
            placeholder="프로젝트에 대해 간략히 설명해 주세요"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            error={desc === '' ? '필수' : undefined}
            rows={4}
          />
        </FormField>
      </FormLayout>

      <FormLayout title="알림 설정" style={{ marginTop: 'var(--pad-lg)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--pad-sm) 0',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 'var(--font-size-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              이메일 알림
            </div>
            <div
              style={{
                fontSize: 'var(--font-size-caption)',
                color: 'var(--color-text-tertiary)',
                marginTop: 2,
              }}
            >
              프로젝트 변경사항을 이메일로 받습니다
            </div>
          </div>
          <Switch checked={notify} onChange={(e) => setNotify(e.target.checked)} />
        </div>
      </FormLayout>

      <FormActions style={{ marginTop: 'var(--pad-lg)' }}>
        <Button variant="ghost">취소</Button>
        <Button variant="emphasis">프로젝트 생성</Button>
      </FormActions>
    </FormPageTemplate>
  );
}
