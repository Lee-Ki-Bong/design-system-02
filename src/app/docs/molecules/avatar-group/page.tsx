'use client';

import { AvatarGroup } from '@/components/molecules/AvatarGroup';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'items', type: 'AvatarGroupItem[]', default: '[]' },
  { name: 'max', type: 'number', default: '4' },
  { name: 'size', type: 'number', default: '36' },
];

const tokens = [
  '--color-surface-raised',
  '--color-surface-sunken',
  '--color-text-tertiary',
  '--font-size-overline',
  '--font-size-caption',
  '--font-weight-semibold',
];

const sampleUsers: { label: string; color: string }[] = [
  { label: 'A', color: 'var(--accent-blue)' },
  { label: 'B', color: 'var(--accent-rose)' },
  { label: 'C', color: 'var(--accent-amber)' },
  { label: 'D', color: 'var(--accent-teal)' },
  { label: 'E', color: 'var(--accent-violet)' },
  { label: 'F', color: 'var(--accent-blue)' },
  { label: 'G', color: 'var(--accent-rose)' },
];

export default function AvatarGroupPage() {
  return (
    <AtomDocPage
      name="AvatarGroup"
      description="여러 사용자를 겹쳐서 표시하는 아바타 그룹. 최대 표시 수를 초과하면 +N 카운터를 보여준다."
      props={props}
      tokens={tokens}
      category="Molecules"
      categoryHref="/docs/molecules"
    >
      <DocSection title="Preview">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-6">
            <AvatarGroup items={sampleUsers.slice(0, 3)} />
            <AvatarGroup items={sampleUsers} max={4} />
            <AvatarGroup items={sampleUsers} max={3} />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Sizes">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-6">
            <AvatarGroup items={sampleUsers.slice(0, 5)} max={4} size={24} />
            <AvatarGroup items={sampleUsers.slice(0, 5)} max={4} size={36} />
            <AvatarGroup items={sampleUsers.slice(0, 5)} max={4} size={48} />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Max Variations">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-6">
            <AvatarGroup items={sampleUsers} max={2} />
            <AvatarGroup items={sampleUsers} max={5} />
            <AvatarGroup items={sampleUsers} max={7} />
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
