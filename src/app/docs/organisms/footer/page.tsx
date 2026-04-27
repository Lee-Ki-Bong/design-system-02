'use client';

import { Footer } from '@/components/organisms/Footer';
import { Icon } from '@/components/atoms/Icon';
import { ThemeSplit } from '@/components/ThemeSplit';
import { AtomDocPage, DocSection } from '@/components/AtomDocPage';

const props = [
  { name: 'brand', type: 'FooterBrand', default: '-' },
  { name: 'groups', type: 'FooterGroup[]', default: '[]' },
  { name: 'copyright', type: 'string', default: "'© {year} All rights reserved.'" },
  { name: 'actions', type: 'ReactNode', default: '-' },
  { name: 'onNavigate', type: '(href: string) => void', default: '-' },
];

const tokens = [
  '--color-surface-sunken',
  '--color-emphasis',
  '--color-on-emphasis',
  '--color-text',
  '--color-text-secondary',
  '--color-text-tertiary',
  '--color-border-subtle',
  '--radius-sm',
  '--gap-xs',
  '--gap-sm',
  '--gap-md',
  '--gap-2xl',
  '--pad-lg',
  '--pad-2xl',
  '--font-size-overline',
  '--font-size-body-sm',
  '--font-size-caption',
  '--font-weight-semibold',
  '--font-weight-bold',
];

const sampleGroups = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact', href: '/contact' },
      { label: 'Status', href: '/status' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];

function SocialIcon({ name }: { name: 'code' | 'mail' | 'globe' }) {
  return (
    <a
      href="#"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        borderRadius: 'var(--radius-full)',
        color: 'var(--color-text-tertiary)',
        transition: 'color 150ms',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--color-text)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--color-text-tertiary)';
      }}
    >
      <Icon name={name} size={18} />
    </a>
  );
}

function DemoFull() {
  return (
    <Footer
      brand={{ logo: 'B', name: 'Whitebong UI', href: '/' }}
      groups={sampleGroups}
      copyright="© 2026 Whitebong UI. All rights reserved."
      actions={
        <>
          <SocialIcon name="code" />
          <SocialIcon name="mail" />
          <SocialIcon name="globe" />
        </>
      }
    />
  );
}

function DemoMinimal() {
  return (
    <Footer
      copyright="© 2026 My Company. All rights reserved."
      actions={
        <>
          <SocialIcon name="code" />
          <SocialIcon name="mail" />
        </>
      }
    />
  );
}

function DemoBrandOnly() {
  return <Footer brand={{ logo: 'W', name: 'Whitebong' }} groups={sampleGroups.slice(0, 2)} />;
}

export default function FooterPage() {
  return (
    <AtomDocPage
      name="Footer"
      description="링크 그룹 + 카피라이트 + 소셜 아이콘을 제공하는 하단 푸터 Organism."
      props={props}
      tokens={tokens}
      category="Organisms"
      categoryHref="/docs/organisms"
    >
      <DocSection title="Full (브랜드 + 링크 그룹 + 소셜)">
        <ThemeSplit cols={1}>
          <DemoFull />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Minimal (카피라이트 + 소셜만)">
        <ThemeSplit cols={1}>
          <DemoMinimal />
        </ThemeSplit>
      </DocSection>

      <DocSection title="Brand + 2 Groups">
        <ThemeSplit cols={1}>
          <DemoBrandOnly />
        </ThemeSplit>
      </DocSection>
    </AtomDocPage>
  );
}
