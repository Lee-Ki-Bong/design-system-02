'use client';

import { cn } from '@/lib/cn';

/* ─── types ─── */

export interface FormPageTemplateProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  sidebarWidth?: number;
  breadcrumb?: React.ReactNode;
  title?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── FormPageTemplate ─── */

export function FormPageTemplate({
  header,
  sidebar,
  sidebarWidth = 240,
  breadcrumb,
  title,
  children,
  maxWidth = 720,
  className,
  style,
}: FormPageTemplateProps) {
  return (
    <>
      <style>{`
        .ds-form-page {
          display: flex;
          min-height: 100vh;
          background: var(--color-bg);
          color: var(--color-text);
          font-family: var(--font-sans);
        }
        .ds-form-page-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          z-index: var(--z-sticky);
        }
        .ds-form-page-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .ds-form-page-header {
          position: sticky;
          top: 0;
          z-index: calc(var(--z-sticky) - 1);
        }
        .ds-form-page-main {
          flex: 1;
          padding: var(--pad-xl) var(--pad-2xl) var(--pad-3xl);
          display: flex;
          flex-direction: column;
          gap: var(--pad-md);
        }
        .ds-form-page-content {
          width: 100%;
        }
      `}</style>

      <div className={cn('ds-form-page', className)} style={style}>
        {sidebar && (
          <div className="ds-form-page-sidebar" style={{ width: sidebarWidth }}>
            {sidebar}
          </div>
        )}

        <div
          className="ds-form-page-body"
          style={sidebar ? { marginLeft: sidebarWidth } : undefined}
        >
          {header && <div className="ds-form-page-header">{header}</div>}
          <main className="ds-form-page-main">
            {breadcrumb}
            {title}
            <div className="ds-form-page-content" style={{ maxWidth }}>
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
