'use client';

import { Input } from '@/components/atoms/Input';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'label', type: 'string', default: '-' },
  { name: 'error', type: 'string', default: '-' },
  { name: 'hint', type: 'string', default: '-' },
  { name: 'iconLeft', type: 'ReactNode', default: '-' },
  { name: 'iconRight', type: 'ReactNode', default: '-' },
  { name: 'disabled', type: 'boolean', default: 'false' },
  { name: 'type', type: "'text' | 'password' | 'email' | ...", default: "'text'" },
  { name: 'placeholder', type: 'string', default: '-' },
];

const tokens = [
  '--color-surface-sunken',
  '--color-text',
  '--color-text-tertiary',
  '--color-border',
  '--color-error',
  '--color-primary',
  '--height-lg',
  '--border-width-thin',
  '--opacity-disabled',
  '--token-transition-fast',
  '--ring',
];

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

export default function InputPage() {
  return (
    <AtomDocPage
      name="Input"
      description="텍스트 입력 필드. label, hint, error, icon 슬롯을 지원한다."
      props={props}
      tokens={tokens}
    >
      <DocSection title="Preview">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-4 max-w-sm">
            <Input placeholder="Default input" />
            <Input label="Label" placeholder="With label" />
            <Input label="With hint" placeholder="Enter email" hint="We'll never share your email." />
            <Input label="With icon" placeholder="Search..." iconLeft={<SearchIcon />} />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="States">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-4 max-w-sm">
            <Input label="Default" placeholder="Placeholder" />
            <Input label="Filled" defaultValue="hello@example.com" />
            <Input label="Error (empty)" placeholder="Required" error="This field is required." />
            <Input
              label="Error (with value)"
              defaultValue="invalid-email"
              error="Please enter a valid email."
            />
            <Input label="Disabled (empty)" placeholder="Cannot edit" disabled />
            <Input label="Disabled (with value)" defaultValue="Locked value" disabled />
            <Input label="Read-only" defaultValue="Read-only value" readOnly />
            <Input label="Password" type="password" defaultValue="secret123" />
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
