'use client';

import { cn } from '@/lib/cn';
import { SearchInput } from '@/components/molecules/SearchInput';
import { Pagination } from '@/components/molecules/Pagination';
import { useState, useMemo } from 'react';

/* ─── types ─── */

export type SortDirection = 'asc' | 'desc' | null;

export interface DataTableColumn<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (row: T, index: number) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  title?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  pageSize?: number;
  onSort?: (key: string, direction: SortDirection) => void;
  sortKey?: string;
  sortDirection?: SortDirection;
  rowKey?: (row: T, index: number) => string | number;
  emptyText?: string;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── component ─── */

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  title,
  searchable = false,
  searchPlaceholder = '검색...',
  onSearch,
  pageSize = 10,
  onSort,
  sortKey,
  sortDirection,
  rowKey,
  emptyText = '데이터가 없습니다',
  className,
  style,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [internalSortKey, setInternalSortKey] = useState<string | null>(null);
  const [internalSortDir, setInternalSortDir] = useState<SortDirection>(null);

  const activeSortKey = sortKey ?? internalSortKey;
  const activeSortDir = sortDirection ?? internalSortDir;

  const handleSort = (key: string) => {
    let next: SortDirection;
    if (activeSortKey !== key) {
      next = 'asc';
    } else if (activeSortDir === 'asc') {
      next = 'desc';
    } else {
      next = null;
    }

    if (onSort) {
      onSort(key, next);
    } else {
      setInternalSortKey(next ? key : null);
      setInternalSortDir(next);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
    onSearch?.(value);
  };

  /* sorted data */
  const sortedData = useMemo(() => {
    if (!activeSortKey || !activeSortDir) return data;
    return [...data].sort((a, b) => {
      const aVal = a[activeSortKey];
      const bVal = b[activeSortKey];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const cmp = String(aVal).localeCompare(String(bVal), 'ko');
      return activeSortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, activeSortKey, activeSortDir]);

  /* pagination */
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const pagedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const startIdx = (currentPage - 1) * pageSize + 1;
  const endIdx = Math.min(currentPage * pageSize, sortedData.length);

  return (
    <div
      className={cn('ds-data-table', className)}
      style={{
        background: 'var(--color-surface-raised)',
        borderRadius: 'var(--radius-2xl)',
        boxShadow: 'var(--shadow-md)',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* header */}
      {(title || searchable) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--pad-lg) var(--pad-xl)',
            borderBottom: '1px solid var(--color-border-subtle)',
            gap: 'var(--gap-lg)',
          }}
        >
          {title && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-sm)' }}>
              <span
                style={{
                  fontSize: 'var(--font-size-body)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-text)',
                }}
              >
                {title}
              </span>
              <span
                style={{
                  fontSize: 'var(--font-size-body-sm)',
                  color: 'var(--color-text-tertiary)',
                }}
              >
                {sortedData.length}건
              </span>
            </div>
          )}
          {searchable && (
            <SearchInput
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              onClear={() => handleSearch('')}
              placeholder={searchPlaceholder}
              style={{ width: 200, height: 'var(--height-sm)' }}
            />
          )}
        </div>
      )}

      {/* table */}
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  style={{
                    padding: 'var(--pad-sm) var(--pad-xl)',
                    textAlign: (col.align ?? 'left') as React.CSSProperties['textAlign'],
                    fontSize: 'var(--font-size-body-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--color-text-tertiary)',
                    borderBottom: '1px solid var(--color-border-subtle)',
                    cursor: col.sortable ? 'pointer' : 'default',
                    userSelect: col.sortable ? 'none' : undefined,
                    whiteSpace: 'nowrap',
                    width: col.width,
                    transition: 'color var(--token-transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    if (col.sortable) e.currentTarget.style.color = 'var(--color-text)';
                  }}
                  onMouseLeave={(e) => {
                    if (col.sortable) e.currentTarget.style.color = 'var(--color-text-tertiary)';
                  }}
                >
                  {col.header}
                  {col.sortable && activeSortKey === col.key && (
                    <span
                      style={{
                        fontSize: 'var(--font-size-overline)',
                        marginLeft: 'var(--gap-xs)',
                      }}
                    >
                      {activeSortDir === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pagedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    padding: 'var(--pad-2xl) var(--pad-xl)',
                    textAlign: 'center',
                    fontSize: 'var(--font-size-body-sm)',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              pagedData.map((row, rowIdx) => {
                const globalIdx = (currentPage - 1) * pageSize + rowIdx;
                const key = rowKey ? rowKey(row, globalIdx) : globalIdx;
                return (
                  <tr
                    key={key}
                    style={{ transition: 'background var(--token-transition-fast)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--color-surface)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        style={{
                          padding: 'var(--pad-md) var(--pad-xl)',
                          fontSize: 'var(--font-size-body-sm)',
                          color: 'var(--color-text)',
                          borderBottom: '1px solid var(--color-border-subtle)',
                          textAlign: (col.align ?? 'left') as React.CSSProperties['textAlign'],
                        }}
                      >
                        {col.render
                          ? col.render(row, globalIdx)
                          : (row[col.key] as React.ReactNode)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* footer */}
      {totalPages > 1 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--pad-sm) var(--pad-xl)',
            borderTop: '1px solid var(--color-border-subtle)',
          }}
        >
          <span
            style={{
              fontSize: 'var(--font-size-body-sm)',
              color: 'var(--color-text-tertiary)',
            }}
          >
            {startIdx}-{endIdx} / {sortedData.length}
          </span>
          <Pagination current={currentPage} total={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}
    </div>
  );
}
