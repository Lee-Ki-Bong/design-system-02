'use client';

import { Icon, getIconNames } from '@/components/atoms/Icon';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'name', type: 'IconName', default: '-' },
  { name: 'size', type: 'number', default: '24' },
  { name: 'strokeWidth', type: 'number', default: '1.8' },
];

const tokens = [
  '--color-text',
  '--color-text-tertiary',
  '--font-mono',
  '--font-size-overline',
  '--radius-lg',
];

const iconNames = getIconNames();

export default function IconPage() {
  return (
    <AtomDocPage
      name="Icon"
      description={`Heroicons 스타일 아이콘 세트. ${iconNames.length}개 아이콘 제공.`}
      props={props}
      tokens={tokens}
    >
      <DocSection title="All Icons">
        <ThemeSplit cols={1}>
          <div
            className="grid gap-[var(--gap-sm)]"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))' }}
          >
            {iconNames.map((name) => (
              <div
                key={name}
                className="flex flex-col items-center gap-[var(--gap-xs)] rounded-[var(--radius-lg)] px-[var(--pad-xs)] py-[var(--pad-sm)] transition-colors duration-150 hover:bg-[var(--color-surface)]"
                style={{ cursor: 'default' }}
              >
                <Icon name={name} style={{ color: 'var(--color-text)' }} />
                <span
                  className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-center"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--font-size-overline)',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  {name}
                </span>
              </div>
            ))}
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Sizes">
        <ThemeSplit cols={1}>
          <div className="flex items-center gap-4" style={{ color: 'var(--color-text)' }}>
            <Icon name="star" size={16} />
            <Icon name="star" size={20} />
            <Icon name="star" size={24} />
            <Icon name="star" size={32} />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="Stroke Width">
        <ThemeSplit cols={1}>
          <div className="flex items-center gap-4" style={{ color: 'var(--color-text)' }}>
            <Icon name="home" strokeWidth={1} />
            <Icon name="home" strokeWidth={1.5} />
            <Icon name="home" strokeWidth={1.8} />
            <Icon name="home" strokeWidth={2.5} />
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
