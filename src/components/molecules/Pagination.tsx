'use client';

import { cn } from '@/lib/cn';

export interface PaginationProps {
  current: number;
  total: number;
  onPageChange?: (page: number) => void;
  siblings?: number;
  className?: string;
  style?: React.CSSProperties;
}

function getPages(current: number, total: number, siblings: number): (number | 'dots')[] {
  const range: (number | 'dots')[] = [];

  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);

  range.push(1);

  if (left > 2) range.push('dots');

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < total - 1) range.push('dots');

  if (total > 1) range.push(total);

  return range;
}

const btnBase: React.CSSProperties = {
  minWidth: '36px',
  height: '36px',
  borderRadius: 'var(--radius-md)',
  border: 'none',
  background: 'transparent',
  color: 'var(--color-text-secondary)',
  fontSize: 'var(--font-size-body-sm)',
  fontWeight: 'var(--font-weight-medium)',
  fontFamily: 'var(--font-sans)',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all var(--token-transition-fast)',
  padding: 0,
};

const activeStyle: React.CSSProperties = {
  background: 'var(--color-emphasis)',
  color: 'var(--color-on-emphasis)',
  boxShadow: 'var(--shadow-xs)',
};

const disabledStyle: React.CSSProperties = {
  color: 'var(--color-text-disabled)',
  cursor: 'not-allowed',
};

export function Pagination({
  current,
  total,
  onPageChange,
  siblings = 1,
  className,
  style,
}: PaginationProps) {
  const pages = getPages(current, total, siblings);
  const isFirst = current === 1;
  const isLast = current === total;

  return (
    <nav
      className={cn('ds-pagination', className)}
      aria-label="pagination"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        ...style,
      }}
    >
      <PageButton
        disabled={isFirst}
        onClick={() => onPageChange?.(current - 1)}
        aria-label="이전 페이지"
      >
        <ChevronLeft />
      </PageButton>

      {pages.map((page, i) =>
        page === 'dots' ? (
          <span
            key={`dots-${i}`}
            style={{
              color: 'var(--color-text-disabled)',
              fontSize: 'var(--font-size-body-sm)',
              padding: '0 4px',
            }}
          >
            …
          </span>
        ) : (
          <PageButton
            key={page}
            active={page === current}
            onClick={() => onPageChange?.(page)}
            aria-label={`${page} 페이지`}
            aria-current={page === current ? 'page' : undefined}
          >
            {page}
          </PageButton>
        ),
      )}

      <PageButton
        disabled={isLast}
        onClick={() => onPageChange?.(current + 1)}
        aria-label="다음 페이지"
      >
        <ChevronRight />
      </PageButton>
    </nav>
  );
}

function PageButton({
  active = false,
  disabled = false,
  children,
  ...props
}: {
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'>) {
  return (
    <button
      type="button"
      disabled={disabled}
      style={{
        ...btnBase,
        ...(active ? activeStyle : {}),
        ...(disabled ? disabledStyle : {}),
      }}
      onMouseEnter={(e) => {
        if (!disabled && !active) {
          e.currentTarget.style.background = 'var(--color-surface)';
          e.currentTarget.style.color = 'var(--color-text)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !active) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'var(--color-text-secondary)';
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}

function ChevronLeft() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
