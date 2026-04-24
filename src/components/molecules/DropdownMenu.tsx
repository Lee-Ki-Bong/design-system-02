'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/cn';

/* ─── Types ─── */

export type DropdownMenuItem =
  | {
      type: 'item';
      label: string;
      icon?: React.ReactNode;
      shortcut?: string;
      destructive?: boolean;
      onSelect?: () => void;
    }
  | { type: 'separator' }
  | { type: 'label'; text: string };

export interface DropdownMenuProps {
  items: DropdownMenuItem[];
  minWidth?: number;
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  className?: string;
}

const FADE_DURATION = 150;
const GAP = 6;

/* ─── Component ─── */

export function DropdownMenu({ items, minWidth = 200, children, className }: DropdownMenuProps) {
  const [mounted, setMounted] = useState(false);
  const [showOpacity, setShowOpacity] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const [focusIndex, setFocusIndex] = useState(-1);

  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const actionItems = items
    .map((item, i) => (item.type === 'item' ? i : -1))
    .filter((i) => i !== -1);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !menuRef.current) return;
    const tr = triggerRef.current.getBoundingClientRect();
    const menu = menuRef.current.getBoundingClientRect();

    let top = tr.bottom + GAP;
    let left = tr.left;

    // flip up if no space below
    if (top + menu.height > window.innerHeight - 4) {
      top = tr.top - menu.height - GAP;
    }
    // shift left if overflows right
    if (left + menu.width > window.innerWidth - 4) {
      left = window.innerWidth - menu.width - 4;
    }

    setPos({ top, left });
  }, []);

  const open = useCallback(() => {
    setMounted(true);
    setFocusIndex(-1);
  }, []);

  const close = useCallback(() => {
    setShowOpacity(false);
    setTimeout(() => {
      setMounted(false);
      setPos(null);
      setFocusIndex(-1);
    }, FADE_DURATION);
  }, []);

  const toggle = useCallback(() => {
    if (mounted) close();
    else open();
  }, [mounted, open, close]);

  // Position after mount
  useEffect(() => {
    if (!mounted) return;
    const raf = requestAnimationFrame(() => {
      updatePosition();
      requestAnimationFrame(() => setShowOpacity(true));
    });
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [mounted, updatePosition]);

  // Outside click
  useEffect(() => {
    if (!mounted) return;
    const handle = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        menuRef.current?.contains(e.target as Node)
      ) {
        return;
      }
      close();
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [mounted, close]);

  // Keyboard
  useEffect(() => {
    if (!mounted) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusIndex((prev) => {
          const curPos = actionItems.indexOf(prev);
          if (e.key === 'ArrowDown') {
            const next = curPos < actionItems.length - 1 ? curPos + 1 : 0;
            return actionItems[next];
          } else {
            const next = curPos > 0 ? curPos - 1 : actionItems.length - 1;
            return actionItems[next];
          }
        });
        return;
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (focusIndex >= 0) {
          const item = items[focusIndex];
          if (item.type === 'item' && item.onSelect) {
            item.onSelect();
            close();
          }
        }
      }
    };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [mounted, close, focusIndex, items, actionItems]);

  // Focus management
  useEffect(() => {
    if (!mounted || focusIndex < 0) return;
    const el = menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
    const idx = actionItems.indexOf(focusIndex);
    if (el && idx >= 0) el[idx]?.focus();
  }, [focusIndex, mounted, actionItems]);

  return (
    <div ref={triggerRef} className={cn('ds-dropdown-trigger inline-flex', className)}>
      <span
        onClick={toggle}
        style={{ cursor: 'pointer' }}
        aria-haspopup="true"
        aria-expanded={mounted}
      >
        {children}
      </span>

      {mounted &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={{
              position: 'fixed',
              zIndex: 'var(--z-dropdown)' as unknown as number,
              top: pos?.top ?? -9999,
              left: pos?.left ?? -9999,
              minWidth,
              padding: 'var(--pad-xs) 0',
              background: 'var(--color-surface-raised)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-lg)',
              overflow: 'hidden',
              opacity: showOpacity ? 1 : 0,
              transition: `opacity ${FADE_DURATION}ms ease-in-out`,
            }}
          >
            {items.map((item, i) => {
              if (item.type === 'separator') {
                return (
                  <div
                    key={`sep-${i}`}
                    style={{
                      height: 1,
                      background: 'var(--color-border-subtle)',
                      margin: 'var(--pad-xs) 0',
                    }}
                  />
                );
              }
              if (item.type === 'label') {
                return (
                  <div
                    key={`label-${i}`}
                    style={{
                      padding: 'var(--pad-xs) var(--pad-md)',
                      fontSize: 'var(--font-size-overline)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--color-text-tertiary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {item.text}
                  </div>
                );
              }
              return (
                <div
                  key={`item-${i}`}
                  role="menuitem"
                  tabIndex={focusIndex === i ? 0 : -1}
                  onClick={() => {
                    item.onSelect?.();
                    close();
                  }}
                  onMouseEnter={() => setFocusIndex(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--gap-sm)',
                    padding: 'var(--pad-sm) var(--pad-md)',
                    fontSize: 'var(--font-size-body-sm)',
                    color: item.destructive ? 'var(--color-error)' : 'var(--color-text)',
                    cursor: 'pointer',
                    transition: 'background var(--token-transition-fast)',
                    background:
                      focusIndex === i
                        ? item.destructive
                          ? 'var(--color-error-bg)'
                          : 'var(--color-surface)'
                        : 'transparent',
                    outline: 'none',
                  }}
                >
                  {item.icon && (
                    <span style={{ display: 'inline-flex', width: 16, height: 16, flexShrink: 0 }}>
                      {item.icon}
                    </span>
                  )}
                  <span>{item.label}</span>
                  {item.shortcut && (
                    <span
                      style={{
                        marginLeft: 'auto',
                        fontSize: 'var(--font-size-caption)',
                        color: 'var(--color-text-tertiary)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {item.shortcut}
                    </span>
                  )}
                </div>
              );
            })}
          </div>,
          triggerRef.current?.closest('[data-theme]') ?? document.body,
        )}
    </div>
  );
}
