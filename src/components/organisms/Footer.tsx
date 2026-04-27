'use client';

import { cn } from '@/lib/cn';

/* ─── types ─── */

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterBrand {
  logo: React.ReactNode;
  name: string;
  href?: string;
}

export interface FooterProps {
  brand?: FooterBrand;
  groups?: FooterGroup[];
  copyright?: string;
  actions?: React.ReactNode;
  onNavigate?: (href: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── Footer ─── */

export function Footer({
  brand,
  groups = [],
  copyright,
  actions,
  onNavigate,
  className,
  style,
}: FooterProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <>
      <style>{`
        .ds-footer {
          background: var(--color-surface-sunken);
          border-top: 1px solid var(--color-border-subtle);
          padding: var(--pad-2xl) var(--pad-lg) var(--pad-lg);
          font-family: var(--font-sans);
        }
        .ds-footer-top {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: var(--gap-2xl);
        }
        .ds-footer-brand {
          display: flex;
          align-items: center;
          gap: var(--gap-sm);
          text-decoration: none;
          margin-bottom: var(--gap-md);
        }
        .ds-footer-brand-logo {
          width: 28px;
          height: 28px;
          border-radius: var(--radius-sm);
          background: var(--color-emphasis);
          color: var(--color-on-emphasis);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: var(--font-size-caption);
          flex-shrink: 0;
        }
        .ds-footer-brand-name {
          font-weight: var(--font-weight-bold);
          font-size: var(--font-size-body-sm);
          color: var(--color-text);
        }
        .ds-footer-group-title {
          font-size: var(--font-size-overline);
          font-weight: var(--font-weight-semibold);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-text-tertiary);
          margin-bottom: var(--gap-sm);
        }
        .ds-footer-group-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--gap-xs);
        }
        .ds-footer-link {
          font-size: var(--font-size-body-sm);
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: color 150ms;
          cursor: pointer;
        }
        .ds-footer-link:hover {
          color: var(--color-text);
        }
        .ds-footer-divider {
          height: 1px;
          background: var(--color-border-strong);
          margin: var(--pad-lg) 0;
        }
        .ds-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--gap-md);
          flex-wrap: wrap;
        }
        .ds-footer-copyright {
          font-size: var(--font-size-caption);
          color: var(--color-text-tertiary);
        }
        .ds-footer-actions {
          display: flex;
          align-items: center;
          gap: var(--gap-sm);
        }
      `}</style>

      <footer className={cn('ds-footer', className)} style={style}>
        <div className="ds-footer-top">
          {brand && (
            <div>
              {brand.href ? (
                <a
                  href={brand.href}
                  className="ds-footer-brand"
                  onClick={(e) => handleClick(e, brand.href!)}
                >
                  <span className="ds-footer-brand-logo">{brand.logo}</span>
                  <span className="ds-footer-brand-name">{brand.name}</span>
                </a>
              ) : (
                <div className="ds-footer-brand">
                  <span className="ds-footer-brand-logo">{brand.logo}</span>
                  <span className="ds-footer-brand-name">{brand.name}</span>
                </div>
              )}
            </div>
          )}

          {groups.map((group) => (
            <div key={group.title}>
              <div className="ds-footer-group-title">{group.title}</div>
              <ul className="ds-footer-group-list">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="ds-footer-link"
                      onClick={(e) => handleClick(e, link.href)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="ds-footer-divider" />

        <div className="ds-footer-bottom">
          <span className="ds-footer-copyright">
            {copyright ?? `© ${new Date().getFullYear()} All rights reserved.`}
          </span>
          {actions && <div className="ds-footer-actions">{actions}</div>}
        </div>
      </footer>
    </>
  );
}
