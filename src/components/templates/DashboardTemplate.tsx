'use client';

import { cn } from '@/lib/cn';

/* ─── types ─── */

export interface DashboardTemplateProps {
  sidebar: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
  sidebarWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── DashboardTemplate ─── */

export function DashboardTemplate({
  sidebar,
  header,
  children,
  sidebarWidth = 240,
  className,
  style,
}: DashboardTemplateProps) {
  return (
    <>
      <style>{`
        .ds-dashboard {
          display: flex;
          min-height: 100vh;
          background: var(--color-bg);
          color: var(--color-text);
          font-family: var(--font-sans);
        }
        .ds-dashboard-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          z-index: var(--z-sticky);
        }
        .ds-dashboard-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .ds-dashboard-header {
          position: sticky;
          top: 0;
          z-index: calc(var(--z-sticky) - 1);
        }
        .ds-dashboard-main {
          flex: 1;
          padding: var(--pad-xl) var(--pad-2xl) var(--pad-3xl);
        }
      `}</style>

      <div className={cn('ds-dashboard', className)} style={style}>
        <div className="ds-dashboard-sidebar" style={{ width: sidebarWidth }}>
          {sidebar}
        </div>

        <div className="ds-dashboard-body" style={{ marginLeft: sidebarWidth }}>
          {header && <div className="ds-dashboard-header">{header}</div>}
          <main className="ds-dashboard-main">{children}</main>
        </div>
      </div>
    </>
  );
}
