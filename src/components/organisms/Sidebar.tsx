'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/cn';

/* ─── types ─── */

export interface SidebarItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export interface SidebarBrand {
  logo: React.ReactNode;
  name: string;
  href?: string;
}

export interface SidebarProps {
  brand?: SidebarBrand;
  sections: SidebarSection[];
  activePath?: string;
  width?: number;
  className?: string;
  style?: React.CSSProperties;
  /** 항목 클릭 시 호출 (SPA 라우팅 등) */
  onNavigate?: (href: string) => void;
}

/* ─── Sidebar ─── */

export function Sidebar({
  brand,
  sections,
  activePath = '',
  width = 240,
  className,
  style,
  onNavigate,
}: SidebarProps) {
  // 초기 열림 상태: activePath가 속한 항목을 열어둠
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    for (const section of sections) {
      for (const item of section.items) {
        if (item.children && activePath.startsWith(item.href)) {
          initial.add(item.href);
        }
      }
    }
    return initial;
  });

  const toggleItem = useCallback((href: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(href)) {
        next.delete(href);
      } else {
        next.add(href);
      }
      return next;
    });
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <>
      <style>{`
        .ds-sidebar {
          background: var(--color-surface-raised);
          padding: var(--gap-lg) var(--gap-md);
          box-shadow: var(--shadow-md);
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 2px;
          overflow-y: auto;
        }
        .ds-sidebar-brand {
          display: flex;
          align-items: center;
          gap: var(--gap-sm);
          padding: var(--pad-xs) var(--pad-sm) var(--pad-md);
          text-decoration: none;
          cursor: pointer;
        }
        .ds-sidebar-brand-logo {
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
          flex-shrink: 0;
        }
        .ds-sidebar-brand-name {
          font-weight: var(--font-weight-bold);
          font-size: var(--font-size-body);
          color: var(--color-emphasis);
        }
        .ds-sidebar-sep {
          height: 1px;
          background: var(--color-border-subtle);
          margin: var(--pad-xs) var(--pad-sm);
        }
        .ds-sidebar-section-title {
          font-size: var(--font-size-overline);
          font-weight: var(--font-weight-semibold);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text-tertiary);
          padding: var(--gap-md) var(--gap-md) var(--gap-xs);
        }
        .ds-sidebar-item {
          display: flex;
          align-items: center;
          gap: var(--gap-sm);
          padding: 9px var(--gap-md);
          border-radius: var(--radius-lg);
          font-size: var(--font-size-body-sm);
          font-weight: var(--font-weight-medium);
          font-family: var(--font-sans);
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: all 150ms;
          text-decoration: none;
        }
        .ds-sidebar-item:hover {
          background: var(--color-surface);
          color: var(--color-text);
        }
        .ds-sidebar-item[data-active='true'] {
          background: var(--color-surface-sunken);
          color: var(--color-text);
          font-weight: var(--font-weight-semibold);
        }
        .ds-sidebar-item .ds-sidebar-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          opacity: var(--opacity-disabled);
          flex-shrink: 0;
        }
        .ds-sidebar-item[data-active='true'] .ds-sidebar-dot {
          opacity: 1;
          background: var(--color-emphasis);
        }
        .ds-sidebar-children {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          transition: grid-template-rows 250ms ease, opacity 200ms ease;
        }
        .ds-sidebar-children[data-open='true'] {
          grid-template-rows: 1fr;
          opacity: 1;
        }
        .ds-sidebar-children-inner {
          overflow: hidden;
        }
        .ds-sidebar-child {
          padding: 6px var(--gap-md) 6px 28px;
          border-radius: var(--radius-md);
          font-size: var(--font-size-caption);
          font-weight: var(--font-weight-medium);
          font-family: var(--font-sans);
          color: var(--color-text-tertiary);
          cursor: pointer;
          transition: all 150ms;
          text-decoration: none;
          display: block;
        }
        .ds-sidebar-child:hover {
          color: var(--color-text-secondary);
          background: var(--color-surface);
        }
        .ds-sidebar-child[data-active='true'] {
          color: var(--color-text);
          font-weight: var(--font-weight-semibold);
        }
      `}</style>

      <nav
        className={cn('ds-sidebar', className)}
        style={{ width, borderRadius: '0 var(--radius-2xl) var(--radius-2xl) 0', ...style }}
        aria-label="Sidebar navigation"
      >
        {brand && (
          <>
            {brand.href ? (
              <a
                href={brand.href}
                className="ds-sidebar-brand"
                onClick={(e) => handleClick(e, brand.href!)}
              >
                <span className="ds-sidebar-brand-logo">{brand.logo}</span>
                <span className="ds-sidebar-brand-name">{brand.name}</span>
              </a>
            ) : (
              <div className="ds-sidebar-brand">
                <span className="ds-sidebar-brand-logo">{brand.logo}</span>
                <span className="ds-sidebar-brand-name">{brand.name}</span>
              </div>
            )}
            <div className="ds-sidebar-sep" />
          </>
        )}

        {sections.map((section) => (
          <div key={section.title}>
            <div className="ds-sidebar-section-title">{section.title}</div>
            {section.items.map((item) => {
              const isActive = activePath.startsWith(item.href);
              const isOpen = item.children ? openItems.has(item.href) : false;
              return (
                <div key={item.href}>
                  <a
                    href={item.href}
                    className="ds-sidebar-item"
                    data-active={isActive}
                    onClick={(e) => {
                      if (item.children) {
                        e.preventDefault();
                        toggleItem(item.href);
                        if (onNavigate) onNavigate(item.href);
                      } else {
                        handleClick(e, item.href);
                      }
                    }}
                  >
                    <span className="ds-sidebar-dot" />
                    {item.label}
                  </a>
                  {item.children && (
                    <div className="ds-sidebar-children" data-open={isOpen}>
                      <div className="ds-sidebar-children-inner">
                        {item.children.map((child) => (
                          <a
                            key={child.href}
                            href={child.href}
                            className="ds-sidebar-child"
                            data-active={activePath === child.href}
                            onClick={(e) => handleClick(e, child.href)}
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>
    </>
  );
}
