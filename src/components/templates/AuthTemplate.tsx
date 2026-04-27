'use client';

import { cn } from '@/lib/cn';

/* ─── types ─── */

export interface AuthTemplateBrand {
  logo: React.ReactNode;
  name: string;
}

export interface AuthTemplateProps {
  brand?: AuthTemplateBrand;
  children: React.ReactNode;
  maxWidth?: number;
  footer?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── AuthTemplate ─── */

export function AuthTemplate({
  brand,
  children,
  maxWidth = 420,
  footer,
  className,
  style,
}: AuthTemplateProps) {
  return (
    <>
      <style>{`
        .ds-auth {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: var(--pad-xl);
          background: var(--color-bg);
          color: var(--color-text);
          font-family: var(--font-sans);
          box-sizing: border-box;
        }
        .ds-auth-brand {
          display: flex;
          align-items: center;
          gap: var(--gap-sm);
          margin-bottom: var(--pad-2xl);
        }
        .ds-auth-brand-logo {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-lg);
          background: var(--color-emphasis);
          color: var(--color-on-emphasis);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: var(--font-size-body);
          flex-shrink: 0;
        }
        .ds-auth-brand-name {
          font-weight: var(--font-weight-bold);
          font-size: var(--font-size-h3);
          letter-spacing: -0.01em;
          color: var(--color-text);
        }
        .ds-auth-card {
          width: 100%;
          background: var(--color-surface-raised);
          border-radius: var(--radius-2xl);
          box-shadow: var(--shadow-lg);
          padding: var(--pad-2xl);
          box-sizing: border-box;
        }
        .ds-auth-footer {
          margin-top: var(--pad-xl);
          font-size: var(--font-size-caption);
          color: var(--color-text-tertiary);
          text-align: center;
        }
        .ds-auth-footer a {
          color: var(--color-primary);
          text-decoration: none;
          font-weight: var(--font-weight-medium);
        }
        .ds-auth-footer a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className={cn('ds-auth', className)} style={style}>
        {brand && (
          <div className="ds-auth-brand">
            <span className="ds-auth-brand-logo">{brand.logo}</span>
            <span className="ds-auth-brand-name">{brand.name}</span>
          </div>
        )}

        <div className="ds-auth-card" style={{ maxWidth }}>
          {children}
        </div>

        {footer && <div className="ds-auth-footer">{footer}</div>}
      </div>
    </>
  );
}
