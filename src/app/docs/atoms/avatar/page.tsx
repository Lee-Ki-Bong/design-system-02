'use client';

import { Avatar } from '@/components/atoms/Avatar';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const SAMPLE_IMG = 'https://i.pravatar.cc/150?img=32';
const SAMPLE_IMG2 = 'https://i.pravatar.cc/150?img=47';

const props = [
  { name: 'src', type: 'string', default: '-' },
  { name: 'alt', type: 'string', default: "''" },
  { name: 'color', type: 'string', default: '--accent-blue' },
  { name: 'size', type: 'number', default: '44' },
  { name: 'ring', type: 'boolean', default: 'false' },
  { name: 'badge', type: 'number | string', default: '-' },
  { name: 'children', type: 'ReactNode', default: '-' },
];

const tokens = [
  '--accent-blue',
  '--accent-rose',
  '--accent-amber',
  '--accent-teal',
  '--accent-violet',
  '--color-on-surface',
  '--color-surface-raised',
  '--color-error',
  '--font-weight-semibold',
  '--font-size-overline',
  '--font-size-caption',
  '--font-size-body-sm',
];

export default function AvatarPage() {
  return (
    <AtomDocPage
      name="Avatar"
      description="사용자 표시. 이니셜 + 배경색. 링, 뱃지, 클러스터 지원."
      props={props}
      tokens={tokens}
    >
      <DocSection title="Preview">
        <ThemeSplit cols={1}>
          <div className="flex items-center gap-3">
            <Avatar size={24}>A</Avatar>
            <Avatar size={32} color="var(--accent-rose)">
              B
            </Avatar>
            <Avatar color="var(--accent-teal)">김</Avatar>
            <Avatar size={52} color="var(--accent-violet)">
              박
            </Avatar>
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Ring">
        <ThemeSplit cols={1}>
          <div className="flex items-center gap-3">
            <Avatar ring>A</Avatar>
            <Avatar ring color="var(--accent-rose)">
              B
            </Avatar>
            <Avatar ring color="var(--accent-teal)">
              김
            </Avatar>
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Badge">
        <ThemeSplit cols={1}>
          <div className="flex items-center gap-4">
            <Avatar badge={2}>A</Avatar>
            <Avatar color="var(--accent-rose)" badge={3}>
              B
            </Avatar>
            <Avatar color="var(--accent-amber)" badge={1}>
              C
            </Avatar>
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Image">
        <ThemeSplit cols={1}>
          <div className="flex items-center gap-3">
            <Avatar src={SAMPLE_IMG} alt="User" size={24} />
            <Avatar src={SAMPLE_IMG} alt="User" size={32} />
            <Avatar src={SAMPLE_IMG} alt="User" />
            <Avatar src={SAMPLE_IMG} alt="User" size={52} />
            <Avatar src={SAMPLE_IMG2} alt="User" ring />
            <Avatar src={SAMPLE_IMG2} alt="User" badge={5} />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Colors">
        <ThemeSplit cols={1}>
          <div className="flex items-center gap-3">
            <Avatar color="var(--accent-blue)">B</Avatar>
            <Avatar color="var(--accent-rose)">R</Avatar>
            <Avatar color="var(--accent-amber)">A</Avatar>
            <Avatar color="var(--accent-teal)">T</Avatar>
            <Avatar color="var(--accent-violet)">V</Avatar>
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
