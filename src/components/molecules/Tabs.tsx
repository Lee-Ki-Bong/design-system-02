'use client';

import { useRef, useCallback } from 'react';
import { cn } from '@/lib/cn';

export interface TabItem {
  label: string;
  value: string;
}

type TabVariant = 'pill' | 'underline';

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange?: (value: string) => void;
  variant?: TabVariant;
  className?: string;
  style?: React.CSSProperties;
}

const pillContainerStyle: React.CSSProperties = {
  background: 'var(--color-surface-raised)',
  padding: 'var(--pad-xs)',
  borderRadius: 'var(--radius-full)',
  display: 'inline-flex',
  gap: '2px',
  boxShadow: 'var(--shadow-sm)',
};

const underlineContainerStyle: React.CSSProperties = {
  display: 'flex',
  borderBottom: '1px solid var(--color-border)',
  gap: 'var(--gap-xs)',
};

const baseBtnStyle: React.CSSProperties = {
  fontSize: 'var(--font-size-body-sm)',
  fontWeight: 'var(--font-weight-medium)',
  fontFamily: 'var(--font-sans)',
  color: 'var(--color-text-secondary)',
  cursor: 'pointer',
  border: 'none',
  background: 'none',
  transition: 'all var(--token-transition)',
};

const pillBtnStyle: React.CSSProperties = {
  ...baseBtnStyle,
  padding: 'var(--gap-sm) var(--pad-lg)',
  borderRadius: 'var(--radius-full)',
};

const pillActiveStyle: React.CSSProperties = {
  background: 'var(--color-emphasis)',
  color: 'var(--color-on-emphasis)',
};

const underlineBtnStyle: React.CSSProperties = {
  ...baseBtnStyle,
  padding: 'var(--pad-sm) var(--pad-lg)',
  position: 'relative' as const,
};

export function Tabs({ items, value, onChange, variant = 'pill', className, style }: TabsProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault();

      const currentIndex = items.findIndex((item) => item.value === value);
      let next = currentIndex;

      if (e.key === 'ArrowRight') next = (currentIndex + 1) % items.length;
      else if (e.key === 'ArrowLeft') next = (currentIndex - 1 + items.length) % items.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = items.length - 1;

      onChange?.(items[next].value);

      const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      buttons?.[next]?.focus();
    },
    [items, value, onChange],
  );

  const isPill = variant === 'pill';

  return (
    <div
      ref={listRef}
      className={cn('ds-tabs', className)}
      role="tablist"
      aria-label="Tabs"
      style={{
        ...(isPill ? pillContainerStyle : underlineContainerStyle),
        ...style,
      }}
      onKeyDown={handleKeyDown}
    >
      {items.map((item) => {
        const isActive = item.value === value;

        return isPill ? (
          <PillTab key={item.value} active={isActive} onClick={() => onChange?.(item.value)}>
            {item.label}
          </PillTab>
        ) : (
          <UnderlineTab key={item.value} active={isActive} onClick={() => onChange?.(item.value)}>
            {item.label}
          </UnderlineTab>
        );
      })}
    </div>
  );
}

function PillTab({
  active,
  children,
  ...props
}: { active: boolean; children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      tabIndex={active ? 0 : -1}
      style={{
        ...pillBtnStyle,
        ...(active ? pillActiveStyle : {}),
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.color = 'var(--color-text)';
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.color = 'var(--color-text-secondary)';
      }}
      {...props}
    >
      {children}
    </button>
  );
}

function UnderlineTab({
  active,
  children,
  ...props
}: { active: boolean; children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      tabIndex={active ? 0 : -1}
      style={{
        ...underlineBtnStyle,
        color: active ? 'var(--color-text)' : 'var(--color-text-secondary)',
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.color = 'var(--color-text)';
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.color = 'var(--color-text-secondary)';
      }}
      {...props}
    >
      {children}
      {active && (
        <span
          style={{
            position: 'absolute',
            left: 'var(--pad-md)',
            right: 'var(--pad-md)',
            bottom: '-1px',
            height: '2px',
            background: 'var(--color-emphasis)',
            borderRadius: '2px',
          }}
        />
      )}
    </button>
  );
}
