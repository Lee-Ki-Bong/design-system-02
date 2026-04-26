'use client';

import { cn } from '@/lib/cn';
import { Icon } from '@/components/atoms/Icon';

/* ─── types ─── */

export interface FilterChip {
  label: string;
  value: string;
}

export interface ActiveFilter {
  label: string;
  value: string;
}

export interface FilterBarProps {
  chips: FilterChip[];
  activeChip?: string;
  onChipChange?: (value: string) => void;
  activeFilters?: ActiveFilter[];
  onFilterRemove?: (value: string) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  resultCount?: number;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── styles ─── */

const barStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--gap-sm)',
  flexWrap: 'wrap',
  padding: 'var(--pad-md) var(--pad-lg)',
  background: 'var(--color-surface-raised)',
  borderRadius: 'var(--radius-full)',
  boxShadow: 'var(--shadow-sm)',
};

const searchStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 200,
  height: 'var(--height-sm)',
  padding: '0 var(--pad-md)',
  background: 'var(--color-surface)',
  border: 'none',
  borderRadius: 'var(--radius-full)',
  fontSize: 'var(--font-size-body-sm)',
  fontFamily: 'var(--font-sans)',
  color: 'var(--color-text)',
  outline: 'none',
};

const chipBase: React.CSSProperties = {
  height: 'var(--height-xs)',
  padding: '0 var(--pad-sm)',
  background: 'var(--color-surface)',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'var(--color-border)',
  borderRadius: 'var(--radius-full)',
  fontSize: 'var(--font-size-body-sm)',
  fontWeight: 'var(--font-weight-medium)',
  fontFamily: 'var(--font-sans)',
  color: 'var(--color-text-secondary)',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--gap-xs)',
  transition: 'background var(--token-transition-fast), border-color var(--token-transition-fast)',
};

const chipActiveStyle: React.CSSProperties = {
  background: 'var(--color-emphasis)',
  color: 'var(--color-on-emphasis)',
  borderColor: 'var(--color-emphasis)',
};

const tagStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--gap-xs)',
  padding: 'var(--gap-xs) var(--pad-sm)',
  background: 'var(--color-primary-subtle)',
  color: 'var(--color-primary)',
  borderRadius: 'var(--radius-full)',
  fontSize: 'var(--font-size-caption)',
  fontWeight: 'var(--font-weight-medium)',
};

const tagBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  color: 'var(--color-primary)',
  fontSize: 'var(--font-size-body-sm)',
  lineHeight: 1,
  fontFamily: 'var(--font-sans)',
};

/* ─── component ─── */

export function FilterBar({
  chips,
  activeChip,
  onChipChange,
  activeFilters = [],
  onFilterRemove,
  searchValue,
  onSearchChange,
  searchPlaceholder = '검색...',
  resultCount,
  className,
  style,
}: FilterBarProps) {
  return (
    <div className={cn('ds-filter-bar', className)} style={style}>
      {/* bar */}
      <div style={barStyle}>
        <Icon
          name="search"
          size={18}
          style={{ color: 'var(--color-text-tertiary)', flexShrink: 0 }}
        />
        <input
          type="text"
          value={searchValue ?? ''}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder={searchPlaceholder}
          style={searchStyle}
        />
        {chips.map((chip) => {
          const isActive = chip.value === activeChip;
          return (
            <button
              key={chip.value}
              type="button"
              onClick={() => onChipChange?.(chip.value)}
              style={{
                ...chipBase,
                ...(isActive ? chipActiveStyle : {}),
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = 'var(--color-surface-sunken)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'var(--color-surface)';
              }}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* active filters */}
      {activeFilters.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: 'var(--gap-xs)',
            marginTop: 'var(--gap-md)',
            flexWrap: 'wrap',
          }}
        >
          {activeFilters.map((f) => (
            <span key={f.value} style={tagStyle}>
              {f.label}
              <button
                type="button"
                onClick={() => onFilterRemove?.(f.value)}
                style={tagBtnStyle}
                aria-label={`${f.label} 필터 제거`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* result count */}
      {resultCount !== undefined && (
        <div
          style={{
            marginTop: 'var(--gap-md)',
            fontSize: 'var(--font-size-body-sm)',
            color: 'var(--color-text-tertiary)',
          }}
        >
          {resultCount}개 결과
        </div>
      )}
    </div>
  );
}
