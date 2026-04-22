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
      {/* TODO(docs-sidebar): organisms/Sidebar 컴포넌트로 분리 + inline style 제거 */}
      <style>{`
        .sidebar {
          background: var(--color-surface-raised);
          padding: var(--gap-lg) var(--gap-md);
          border-radius: 0 var(--radius-2xl) var(--radius-2xl) 0;
          box-shadow: var(--shadow-md);
          width: 240px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 2px;
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          overflow-y: auto;
        }
        .sb-head {
          display: flex;
          align-items: center;
          gap: var(--gap-sm);
          padding: var(--pad-xs) var(--pad-sm) var(--pad-md);
        }
        .sb-logo {
          width: 30px;
          height: 30px;
          border-radius: var(--radius-sm);
          background: var(--color-emphasis);
          color: var(--color-on-emphasis);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: var(--font-size-body-sm);
        }
        .sb-brand {
          font-weight: var(--font-weight-bold);
          font-size: var(--font-size-body);
          color: var(--color-emphasis);
        }
        .sb-section {
          font-size: var(--font-size-overline);
          font-weight: var(--font-weight-semibold);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text-tertiary);
          padding: var(--gap-md) var(--gap-md) var(--gap-xs);
        }
        .sb-item {
          display: flex;
          align-items: center;
          gap: var(--gap-sm);
          padding: 9px var(--gap-md);
          border-radius: var(--radius-lg);
          font-size: var(--font-size-body-sm);
          font-weight: var(--font-weight-medium);
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: all 150ms;
          text-decoration: none;
        }
        .sb-item:hover {
          background: var(--color-surface);
          color: var(--color-text);
        }
        .sb-item.active {
          background: var(--color-surface-sunken);
          color: var(--color-text);
          font-weight: var(--font-weight-semibold);
        }
        .sb-item .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          opacity: var(--opacity-disabled);
          flex-shrink: 0;
        }
        .sb-item.active .dot {
          opacity: 1;
          background: var(--color-emphasis);
        }
        .sb-sep {
          height: 1px;
          background: var(--color-border-subtle);
          margin: var(--pad-xs) var(--pad-sm);
        }
      `}</style>

      <nav className="sidebar">
        <Link href="/docs" className="sb-head">
          <span className="sb-logo">B</span>
          <span className="sb-brand">Whitebong UI</span>
        </Link>
        <div className="sb-sep" />
        <div className="sb-section">Components</div>
        {sections.map((s) => {
          const isActive = pathname.startsWith(s.href);
          return (
            <Link key={s.href} href={s.href} className={`sb-item ${isActive ? 'active' : ''}`}>
              <span className="dot" />
              {s.label}
            </Link>
          );
        })}
      </nav>
      <main style={{ marginLeft: '240px', flex: 1, padding: 'var(--pad-2xl)' }}>{children}</main>
    </div>
  );
}
