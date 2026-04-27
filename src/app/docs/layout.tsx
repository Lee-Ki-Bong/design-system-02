'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sections = [
  { label: 'Design Tokens', href: '/docs/tokens' },
  {
    label: 'Atoms',
    href: '/docs/atoms',
    children: [
      { label: 'Button', href: '/docs/atoms/button' },
      { label: 'Input', href: '/docs/atoms/input' },
      { label: 'Select', href: '/docs/atoms/select' },
      { label: 'Textarea', href: '/docs/atoms/textarea' },
      { label: 'Checkbox', href: '/docs/atoms/checkbox' },
      { label: 'Radio', href: '/docs/atoms/radio' },
      { label: 'Switch', href: '/docs/atoms/switch' },
      { label: 'Badge', href: '/docs/atoms/badge' },
      { label: 'Avatar', href: '/docs/atoms/avatar' },
      { label: 'Icon', href: '/docs/atoms/icon' },
      { label: 'Tooltip', href: '/docs/atoms/tooltip' },
      { label: 'Spinner', href: '/docs/atoms/spinner' },
      { label: 'Skeleton', href: '/docs/atoms/skeleton' },
      { label: 'Progress', href: '/docs/atoms/progress' },
      { label: 'Divider', href: '/docs/atoms/divider' },
    ],
  },
  {
    label: 'Molecules',
    href: '/docs/molecules',
    children: [
      { label: 'Tag', href: '/docs/molecules/tag' },
      { label: 'AvatarGroup', href: '/docs/molecules/avatar-group' },
      { label: 'Stat', href: '/docs/molecules/stat' },
      { label: 'Card', href: '/docs/molecules/card' },
      { label: 'EmptyState', href: '/docs/molecules/empty-state' },
      { label: 'Breadcrumb', href: '/docs/molecules/breadcrumb' },
      { label: 'Pagination', href: '/docs/molecules/pagination' },
      { label: 'Tabs', href: '/docs/molecules/tabs' },
      { label: 'NavItem', href: '/docs/molecules/nav-item' },
      { label: 'Popover', href: '/docs/molecules/popover' },
      { label: 'DropdownMenu', href: '/docs/molecules/dropdown-menu' },
      { label: 'Modal', href: '/docs/molecules/modal' },
      { label: 'Drawer', href: '/docs/molecules/drawer' },
      { label: 'Alert', href: '/docs/molecules/alert' },
      { label: 'Toast', href: '/docs/molecules/toast' },
      { label: 'Accordion', href: '/docs/molecules/accordion' },
      { label: 'SearchInput', href: '/docs/molecules/search-input' },
      { label: 'FileUpload', href: '/docs/molecules/file-upload' },
      { label: 'ListItem', href: '/docs/molecules/list-item' },
      { label: 'DatePicker', href: '/docs/molecules/date-picker' },
    ],
  },
  {
    label: 'Organisms',
    href: '/docs/organisms',
    children: [
      { label: 'DataTable', href: '/docs/organisms/data-table' },
      { label: 'FilterBar', href: '/docs/organisms/filter-bar' },
      { label: 'FormLayout', href: '/docs/organisms/form-layout' },
      { label: 'ImageUpload', href: '/docs/organisms/image-upload' },
      { label: 'Sidebar', href: '/docs/organisms/sidebar' },
      { label: 'Header', href: '/docs/organisms/header' },
      { label: 'Footer', href: '/docs/organisms/footer' },
    ],
  },
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
        .sb-child {
          padding: 6px var(--gap-md) 6px 28px;
          border-radius: var(--radius-md);
          font-size: var(--font-size-caption);
          font-weight: var(--font-weight-medium);
          color: var(--color-text-tertiary);
          cursor: pointer;
          transition: all 150ms;
          text-decoration: none;
          display: block;
        }
        .sb-child:hover {
          color: var(--color-text-secondary);
          background: var(--color-surface);
        }
        .sb-child.active {
          color: var(--color-text);
          font-weight: var(--font-weight-semibold);
        }
        .sb-children {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          transition: grid-template-rows 250ms ease, opacity 200ms ease;
        }
        .sb-children.open {
          grid-template-rows: 1fr;
          opacity: 1;
        }
        .sb-children-inner {
          overflow: hidden;
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
            <div key={s.href}>
              <Link href={s.href} className={`sb-item ${isActive ? 'active' : ''}`}>
                <span className="dot" />
                {s.label}
              </Link>
              {s.children && (
                <div className={`sb-children ${isActive ? 'open' : ''}`}>
                  <div className="sb-children-inner">
                    {s.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className={`sb-child ${pathname === c.href ? 'active' : ''}`}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>
      <main style={{ marginLeft: '240px', flex: 1, padding: 'var(--pad-2xl)' }}>{children}</main>
    </div>
  );
}
