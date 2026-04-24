'use client';

import { cn } from '@/lib/cn';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Breadcrumb({ items, separator = '/', className, style }: BreadcrumbProps) {
  return (
    <nav
      className={cn('ds-breadcrumb', className)}
      aria-label="breadcrumb"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: 'var(--font-size-body-sm)',
        fontWeight: 'var(--font-weight-medium)',
        color: 'var(--color-text-tertiary)',
        ...style,
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index} style={{ display: 'contents' }}>
            {index > 0 && (
              <span
                aria-hidden="true"
                style={{
                  color: 'var(--color-text-disabled)',
                  fontSize: 'var(--font-size-caption)',
                }}
              >
                {separator}
              </span>
            )}
            {isLast ? (
              <span
                aria-current="page"
                style={{
                  color: 'var(--color-text)',
                  fontWeight: 'var(--font-weight-semibold)',
                  padding: '4px 8px',
                }}
              >
                {item.label}
              </span>
            ) : (
              <BreadcrumbLink href={item.href ?? '#'}>{item.label}</BreadcrumbLink>
            )}
          </span>
        );
      })}
    </nav>
  );
}

function BreadcrumbLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="ds-breadcrumb-link"
      style={{
        color: 'var(--color-text-secondary)',
        textDecoration: 'none',
        padding: '4px 8px',
        borderRadius: 'var(--radius-md)',
        transition: 'background var(--token-transition-fast)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--color-surface)';
        e.currentTarget.style.color = 'var(--color-text)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '';
        e.currentTarget.style.color = 'var(--color-text-secondary)';
      }}
    >
      {children}
    </a>
  );
}
