'use client';

import { Textarea } from '@/components/atoms/Textarea';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'label', type: 'string', default: '-' },
  { name: 'error', type: 'string', default: '-' },
  { name: 'hint', type: 'string', default: '-' },
  { name: 'rows', type: 'number', default: '4' },
  { name: 'disabled', type: 'boolean', default: 'false' },
  { name: 'placeholder', type: 'string', default: '-' },
];

const tokens = [
  '--color-surface-sunken',
  '--color-text',
  '--color-text-tertiary',
  '--color-border',
  '--color-error',
  '--color-primary',
  '--border-width-thin',
  '--opacity-disabled',
  '--token-transition-fast',
  '--ring',
];

export default function TextareaPage() {
  return (
    <AtomDocPage
      name="Textarea"
      description="멀티라인 텍스트 입력. label, hint, error를 지원하며 resize 가능하다."
      props={props}
      tokens={tokens}
    >
      <DocSection title="Preview">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-4 max-w-sm">
            <Textarea placeholder="Default textarea" />
            <Textarea label="With label" placeholder="Enter description..." />
            <Textarea
              label="With hint"
              placeholder="Write something..."
              hint="Maximum 500 characters."
            />
          </div>
        </ThemeSplit>
      </DocSection>

      <DocSection title="States">
        <ThemeSplit cols={1}>
          <div className="flex flex-col gap-4 max-w-sm">
            <Textarea label="Default" placeholder="Placeholder" />
            <Textarea
              label="Filled"
              defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."
            />
            <Textarea
              label="Error (empty)"
              placeholder="Required"
              error="This field is required."
            />
            <Textarea
              label="Error (with value)"
              defaultValue="Too short"
              error="Minimum 20 characters required."
            />
            <Textarea label="Disabled (empty)" placeholder="Cannot edit" disabled />
            <Textarea label="Disabled (with value)" defaultValue="Locked content" disabled />
            <Textarea label="Read-only" defaultValue="This content cannot be modified." readOnly />
            <Textarea label="Small (2 rows)" placeholder="Compact" rows={2} />
          </div>
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
