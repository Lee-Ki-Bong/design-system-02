'use client';

import { useState, useCallback, useId } from 'react';
import { cn } from '@/lib/cn';

export interface AccordionItem {
  label: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  defaultOpen?: number[];
  className?: string;
}

export function Accordion({
  items,
  multiple = false,
  defaultOpen = [],
  className,
}: AccordionProps) {
  const [openSet, setOpenSet] = useState<Set<number>>(() => new Set(defaultOpen));
  const baseId = useId();

  const toggle = useCallback(
    (index: number) => {
      setOpenSet((prev) => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          if (!multiple) next.clear();
          next.add(index);
        }
        return next;
      });
    },
    [multiple],
  );

  return (
    <div
      className={cn('ds-accordion', className)}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-sm)' }}
    >
      {items.map((item, i) => {
        const isOpen = openSet.has(i);
        const triggerId = `${baseId}-t-${i}`;
        const panelId = `${baseId}-p-${i}`;

        return (
          <div
            key={i}
            style={{
              background: 'var(--color-surface-raised)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-sm)',
              overflow: 'hidden',
            }}
          >
            <button
              type="button"
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(i)}
              style={{
                width: '100%',
                padding: 'var(--pad-md) var(--pad-lg)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                font: 'var(--font-weight-medium) var(--font-size-body) var(--font-sans)',
                color: 'var(--color-text)',
                textAlign: 'left',
                transition: 'background var(--token-transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-surface)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
              }}
            >
              {item.label}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-text-tertiary)"
                strokeWidth="1.8"
                style={{
                  flexShrink: 0,
                  transition: 'transform var(--token-transition)',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              style={{
                display: 'grid',
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                transition: 'grid-template-rows var(--token-transition)',
              }}
            >
              <div style={{ overflow: 'hidden' }}>
                <div
                  style={{
                    padding: '0 var(--pad-lg) var(--pad-lg)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 'var(--line-height-body)',
                  }}
                >
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
