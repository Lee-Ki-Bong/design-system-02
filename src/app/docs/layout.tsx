'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sections = [
  { label: 'Design Tokens', href: '/docs/tokens' },
  { label: 'Atoms', href: '/docs/atoms' },
  { label: 'Molecules', href: '/docs/molecules' },
  { label: 'Organisms', href: '/docs/organisms' },
  { label: 'Templates', href: '/docs/templates' },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      <nav
        className="fixed top-0 left-0 flex h-screen w-60 flex-col gap-1 overflow-y-auto p-4"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRight: '1px solid var(--color-border)',
        }}
      >
        <Link
          href="/docs"
          className="mb-4 text-sm font-bold"
          style={{ color: 'var(--color-emphasis)' }}
        >
          Whitebong UI
        </Link>
        {sections.map((s) => {
          const isActive = pathname.startsWith(s.href);
          return (
            <Link
              key={s.href}
              href={s.href}
              className="rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              style={{
                backgroundColor: isActive ? 'var(--color-primary-subtle)' : 'transparent',
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              }}
            >
              {s.label}
            </Link>
          );
        })}
      </nav>
      <main className="ml-60 flex-1 p-8">{children}</main>
    </div>
  );
}
