'use client';

import { cn } from '@/lib/cn';

/* ─── types ─── */

export interface ListPageTemplateProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  sidebarWidth?: number;
  title?: React.ReactNode;
  filter?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── ListPageTemplate ─── */

export function ListPageTemplate({
  header,
  sidebar,
  sidebarWidth = 240,
  title,
  filter,
  children,
  className,
  style,
}: ListPageTemplateProps) {
  return (
    <>
      <style>{`
        .ds-list-page {
          display: flex;
          min-height: 100vh;
          background: var(--color-bg);
          color: var(--color-text);
          font-family: var(--font-sans);
        }
        .ds-list-page-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          z-index: var(--z-sticky);
        }
        .ds-list-page-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .ds-list-page-header {
          position: sticky;
          top: 0;
          z-index: calc(var(--z-sticky) - 1);
        }
        .ds-list-page-main {
          flex: 1;
          padding: var(--pad-xl) var(--pad-2xl) var(--pad-3xl);
          display: flex;
          flex-direction: column;
          gap: var(--pad-lg);
        }
      `}</style>

      <div className={cn('ds-list-page', className)} style={style}>
        {sidebar && (
          <div className="ds-list-page-sidebar" style={{ width: sidebarWidth }}>
            {sidebar}
          </div>
        )}

        <div
          className="ds-list-page-body"
          style={sidebar ? { marginLeft: sidebarWidth } : undefined}
        >
          {header && <div className="ds-list-page-header">{header}</div>}
          <main className="ds-list-page-main">
            {title}
            {filter}
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
