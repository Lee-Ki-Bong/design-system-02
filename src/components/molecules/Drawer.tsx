'use client';

import { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/cn';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: 'left' | 'right';
  width?: string;
  children: React.ReactNode;
  className?: string;
}

const DURATION = 200;

export function Drawer({
  open,
  onClose,
  side = 'right',
  width = '380px',
  children,
  className,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus trap — first focusable
  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement;

    const raf = requestAnimationFrame(() => {
      const first = panelRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      first?.focus();
    });

    return () => {
      cancelAnimationFrame(raf);
      previousFocusRef.current?.focus();
    };
  }, [open]);

  // Trap tab + ESC
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Lock scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  const getPortalTarget = () => wrapperRef.current?.closest('[data-theme]') ?? document.body;

  const slideAnim = side === 'right' ? 'slideInRight' : 'slideInLeft';

  return (
    <>
      <span ref={wrapperRef} style={{ display: 'none' }} />
      {open &&
        createPortal(
          <div
            onClick={handleOverlayClick}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 'var(--z-overlay)' as unknown as number,
              background: 'var(--color-overlay)',
              animation: `fadeIn ${DURATION}ms ease-out`,
            }}
          >
            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              className={cn('ds-drawer', className)}
              style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                [side]: 0,
                width,
                maxWidth: '90vw',
                background: 'var(--color-surface-raised)',
                color: 'var(--color-text)',
                boxShadow: 'var(--shadow-2xl)',
                zIndex: 'var(--z-modal)' as unknown as number,
                display: 'flex',
                flexDirection: 'column',
                animation: `${slideAnim} ${DURATION}ms cubic-bezier(0.2, 0, 0, 1)`,
              }}
            >
              {children}
            </div>
          </div>,
          getPortalTarget(),
        )}
    </>
  );
}

export function DrawerHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(className)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--pad-lg) var(--pad-xl)',
        borderBottom: '1px solid var(--color-border-subtle)',
      }}
    >
      {children}
    </div>
  );
}

export function DrawerBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(className)}
      style={{
        flex: 1,
        padding: 'var(--pad-xl)',
        overflowY: 'auto',
        fontSize: 'var(--font-size-body-sm)',
        color: 'var(--color-text-secondary)',
        lineHeight: 'var(--line-height-body)',
      }}
    >
      {children}
    </div>
  );
}

export function DrawerFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(className)}
      style={{
        padding: 'var(--pad-md) var(--pad-xl)',
        borderTop: '1px solid var(--color-border-subtle)',
        display: 'flex',
        gap: 'var(--gap-sm)',
        justifyContent: 'flex-end',
      }}
    >
      {children}
    </div>
  );
}

export function DrawerClose({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="닫기"
      style={{
        width: 'var(--height-xs)',
        height: 'var(--height-xs)',
        background: 'var(--color-surface)',
        border: 'none',
        borderRadius: 'var(--radius-full)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-text-secondary)',
        transition: 'background var(--token-transition-fast)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--color-surface-sunken)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--color-surface)';
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}
