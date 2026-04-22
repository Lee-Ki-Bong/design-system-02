'use client';

import { Button } from '@/components/atoms/Button';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const variants = ['emphasis', 'primary', 'secondary', 'ghost', 'destructive'] as const;
const sizes = ['sm', 'md', 'lg'] as const;

const props = [
  {
    name: 'variant',
    type: "'emphasis' | 'primary' | 'secondary' | 'ghost' | 'destructive' | 'icon'",
    default: "'emphasis'",
  },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'" },
  { name: 'disabled', type: 'boolean', default: 'false' },
  { name: 'loading', type: 'boolean', default: 'false' },
  { name: 'className', type: 'string', default: '-' },
];

const tokens = [
  '--color-emphasis',
  '--color-emphasis-hover',
  '--color-on-emphasis',
  '--color-primary',
  '--color-primary-hover',
  '--color-surface-raised',
  '--color-border-strong',
  '--color-text',
  '--color-text-disabled',
  '--color-destructive',
  '--color-destructive-bg',
  '--radius-lg',
  '--radius-xl',
  '--height-sm',
  '--height-md',
  '--height-lg',
  '--shadow-sm',
  '--shadow-md',
  '--token-transition-fast',
];

export default function ButtonPage() {
  return (
    <AtomDocPage
      name="Button"
      description="가장 기본적인 인터랙션 요소. 6 variants, 3 sizes, loading/disabled 상태."
      props={props}
      tokens={tokens}
    >
      {/* Variant × Size Matrix */}
      <DocSection title="Preview">
        <ThemeSplit cols={1}>
          <div className="overflow-x-auto">
            <table className="border-separate" style={{ borderSpacing: '12px 8px' }}>
              <thead>
                <tr>
                  <th />
                  {variants.map((v) => (
                    <th
                      key={v}
                      className="text-xs font-medium text-left pb-1"
                      style={{ color: 'var(--color-text-disabled)' }}
                    >
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </th>
                  ))}
                  <th
                    className="text-xs font-medium text-left pb-1"
                    style={{ color: 'var(--color-text-disabled)' }}
                  >
                    Icon+Text
                  </th>
                  <th
                    className="text-xs font-medium text-left pb-1"
                    style={{ color: 'var(--color-text-disabled)' }}
                  >
                    Icon
                  </th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((size) => (
                  <tr key={size}>
                    <td className="text-xs pr-2" style={{ color: 'var(--color-text-disabled)' }}>
                      {size}
                    </td>
                    {variants.map((variant) => (
                      <td key={variant}>
                        <Button variant={variant} size={size}>
                          Button
                        </Button>
                      </td>
                    ))}
                    <td>
                      <Button variant="emphasis" size={size}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                        Add
                      </Button>
                    </td>
                    <td>
                      <Button variant="icon" size={size} aria-label="Add">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ThemeSplit>
      </DocSection>

      {/* States */}
      <DocSection title="States">
        <ThemeSplit cols={1}>
          <div className="flex gap-4 flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <Button>Default</Button>
              <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                Default
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button disabled>Disabled</Button>
              <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                Disabled
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button loading>Loading</Button>
              <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                Loading
              </span>
            </div>
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
