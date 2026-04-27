'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Avatar } from '@/components/atoms/Avatar';
import { Icon } from '@/components/atoms/Icon';
import { DropdownMenu, type DropdownMenuItem } from '@/components/molecules/DropdownMenu';
import { SearchInput } from '@/components/molecules/SearchInput';

/* ─── types ─── */

export interface HeaderBrand {
  logo: React.ReactNode;
  name: string;
  href?: string;
}

export interface HeaderUser {
  name: string;
  avatar?: string;
  initials?: string;
  menuItems?: DropdownMenuItem[];
}

export interface HeaderProps {
  brand?: HeaderBrand;
  showSearch?: boolean;
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  user?: HeaderUser;
  actions?: React.ReactNode;
  onNavigate?: (href: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── Header ─── */

export function Header({
  brand,
  showSearch = false,
  searchValue,
  searchPlaceholder = '검색...',
  onSearchChange,
  user,
  actions,
  onNavigate,
  className,
  style,
}: HeaderProps) {
  const [localSearch, setLocalSearch] = useState('');
  const search = searchValue ?? localSearch;
  const setSearch = onSearchChange ?? setLocalSearch;

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate && brand?.href) {
      e.preventDefault();
      onNavigate(brand.href);
    }
  };

  return (
    <>
      <style>{`
        .ds-header {
          display: flex;
          align-items: center;
          gap: var(--gap-md);
          padding: 0 var(--pad-lg);
          height: 56px;
          background: var(--color-surface-raised);
          border-bottom: 1px solid var(--color-border-subtle);
          font-family: var(--font-sans);
          box-sizing: border-box;
        }
        .ds-header-brand {
          display: flex;
          align-items: center;
          gap: var(--gap-sm);
          text-decoration: none;
          cursor: pointer;
          flex-shrink: 0;
        }
        .ds-header-brand-logo {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          background: var(--color-emphasis);
          color: var(--color-on-emphasis);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: var(--font-size-body-sm);
          flex-shrink: 0;
        }
        .ds-header-brand-name {
          font-weight: var(--font-weight-bold);
          font-size: var(--font-size-body);
          color: var(--color-text);
          white-space: nowrap;
        }
        .ds-header-search {
          flex: 1;
          max-width: 480px;
          min-width: 0;
        }
        .ds-header-spacer {
          flex: 1;
        }
        .ds-header-right {
          display: flex;
          align-items: center;
          gap: var(--gap-sm);
          flex-shrink: 0;
          margin-left: auto;
        }
        .ds-header-user-btn {
          display: flex;
          align-items: center;
          gap: var(--gap-xs);
          padding: 4px 8px 4px 4px;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border-subtle);
          background: transparent;
          cursor: pointer;
          transition: all 150ms;
          color: var(--color-text);
          font-family: var(--font-sans);
        }
        .ds-header-user-btn:hover {
          background: var(--color-surface);
          border-color: var(--color-border);
        }
        .ds-header-user-name {
          font-size: var(--font-size-body-sm);
          font-weight: var(--font-weight-medium);
          white-space: nowrap;
        }
      `}</style>

      <header className={cn('ds-header', className)} style={style}>
        {brand && (
          <>
            {brand.href ? (
              <a href={brand.href} className="ds-header-brand" onClick={handleBrandClick}>
                <span className="ds-header-brand-logo">{brand.logo}</span>
                <span className="ds-header-brand-name">{brand.name}</span>
              </a>
            ) : (
              <div className="ds-header-brand">
                <span className="ds-header-brand-logo">{brand.logo}</span>
                <span className="ds-header-brand-name">{brand.name}</span>
              </div>
            )}
          </>
        )}

        {showSearch ? (
          <div className="ds-header-search">
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch('')}
              placeholder={searchPlaceholder}
            />
          </div>
        ) : (
          <div className="ds-header-spacer" />
        )}

        <div className="ds-header-right">
          {actions}

          {user && (
            <DropdownMenu items={user.menuItems ?? []}>
              <button type="button" className="ds-header-user-btn">
                <Avatar src={user.avatar} size={28}>
                  {user.initials ?? user.name.charAt(0)}
                </Avatar>
                <span className="ds-header-user-name">{user.name}</span>
                <Icon
                  name="chevronDown"
                  size={14}
                  style={{ color: 'var(--color-text-tertiary)' }}
                />
              </button>
            </DropdownMenu>
          )}
        </div>
      </header>
    </>
  );
}
