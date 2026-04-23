'use client';

import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Badge } from '@/components/atoms/Badge';
import { Avatar } from '@/components/atoms/Avatar';
import { Spinner } from '@/components/atoms/Spinner';
import { Skeleton } from '@/components/atoms/Skeleton';
import { Progress } from '@/components/atoms/Progress';
import { Divider } from '@/components/atoms/Divider';
import { Checkbox } from '@/components/atoms/Checkbox';
import { Switch } from '@/components/atoms/Switch';
import { Icon } from '@/components/atoms/Icon';

const atoms: { name: string; href: string; desc: string; preview: React.ReactNode }[] = [
  {
    name: 'Button',
    href: '/docs/atoms/button',
    desc: '인터랙션의 기본 단위',
    preview: (
      <div className="flex gap-2">
        <Button size="sm">Button</Button>
        <Button size="sm" variant="secondary">
          Btn
        </Button>
      </div>
    ),
  },
  {
    name: 'Input',
    href: '/docs/atoms/input',
    desc: '텍스트 입력',
    preview: <Input placeholder="Text…" style={{ height: 32, fontSize: 12, width: '100%' }} />,
  },
  {
    name: 'Select',
    href: '/docs/atoms/select',
    desc: '드롭다운 선택',
    preview: (
      <select
        className="w-full rounded-lg border-none text-xs"
        style={{
          height: 32,
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          padding: '0 8px',
        }}
      >
        <option>Option</option>
      </select>
    ),
  },
  {
    name: 'Textarea',
    href: '/docs/atoms/textarea',
    desc: '멀티라인 입력',
    preview: (
      <div
        className="w-full rounded-lg text-xs"
        style={{
          height: 40,
          backgroundColor: 'var(--color-surface)',
          padding: '6px 8px',
          color: 'var(--color-text-tertiary)',
        }}
      >
        Text…
      </div>
    ),
  },
  {
    name: 'Checkbox',
    href: '/docs/atoms/checkbox',
    desc: '체크 토글',
    preview: (
      <div className="flex items-center gap-3">
        <Checkbox defaultChecked label="" />
        <Checkbox label="" />
      </div>
    ),
  },
  {
    name: 'Radio',
    href: '/docs/atoms/radio',
    desc: '단일 선택',
    preview: (
      <div className="flex items-center gap-3">
        <input type="radio" defaultChecked name="preview-radio" />
        <input type="radio" name="preview-radio" />
      </div>
    ),
  },
  {
    name: 'Switch',
    href: '/docs/atoms/switch',
    desc: '온/오프 토글',
    preview: (
      <div className="flex items-center gap-3">
        <Switch defaultChecked />
        <Switch />
      </div>
    ),
  },
  {
    name: 'Badge',
    href: '/docs/atoms/badge',
    desc: '상태 라벨, 카운트',
    preview: (
      <div className="flex gap-2">
        <Badge variant="success" dot>
          OK
        </Badge>
        <Badge variant="error">Err</Badge>
      </div>
    ),
  },
  {
    name: 'Avatar',
    href: '/docs/atoms/avatar',
    desc: '사용자 프로필',
    preview: (
      <div className="flex gap-2">
        <Avatar size={28} color="var(--accent-blue)">KB</Avatar>
        <Avatar size={28} color="var(--accent-rose)">JY</Avatar>
      </div>
    ),
  },
  {
    name: 'Icon',
    href: '/docs/atoms/icon',
    desc: 'SVG 아이콘 렌더러',
    preview: (
      <div className="flex gap-2">
        <Icon name="check" size={18} />
        <Icon name="search" size={18} />
        <Icon name="settings" size={18} />
      </div>
    ),
  },
  {
    name: 'Tooltip',
    href: '/docs/atoms/tooltip',
    desc: '호버 힌트',
    preview: (
      <div
        className="rounded-lg px-3 py-1.5 text-xs font-medium"
        style={{
          backgroundColor: 'var(--color-emphasis)',
          color: 'var(--color-on-emphasis)',
        }}
      >
        Tooltip
      </div>
    ),
  },
  {
    name: 'Spinner',
    href: '/docs/atoms/spinner',
    desc: '로딩 인디케이터',
    preview: (
      <div className="flex items-center gap-3">
        <Spinner size="sm" />
        <Spinner size="md" variant="primary" />
      </div>
    ),
  },
  {
    name: 'Skeleton',
    href: '/docs/atoms/skeleton',
    desc: '로딩 플레이스홀더',
    preview: (
      <div className="flex w-full flex-col gap-2">
        <Skeleton variant="line" width="75%" height="8px" />
        <Skeleton variant="line" width="50%" height="8px" />
      </div>
    ),
  },
  {
    name: 'Progress',
    href: '/docs/atoms/progress',
    desc: '진행률 바',
    preview: <Progress value={65} size="sm" color="primary" style={{ width: '100%' }} />,
  },
  {
    name: 'Divider',
    href: '/docs/atoms/divider',
    desc: '구분선',
    preview: (
      <div className="flex w-full flex-col gap-3">
        <Divider variant="strong" />
        <Divider label="OR" />
      </div>
    ),
  },
];

export default function AtomsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold" style={{ color: 'var(--color-emphasis)' }}>
        Atoms
      </h1>
      <p className="mt-2" style={{ color: 'var(--color-text-secondary)' }}>
        토큰을 직접 소비하는 최소 단위 컴포넌트
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {atoms.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="group rounded-xl p-5 transition-all hover:scale-[1.02]"
            style={{
              backgroundColor: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border-subtle)',
            }}
          >
            <div
              className="mb-3 flex h-20 items-center justify-center rounded-lg px-3"
              style={{ backgroundColor: 'var(--color-surface-sunken)' }}
            >
              {a.preview}
            </div>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
              {a.name}
            </p>
            <p className="mt-1 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
              {a.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
