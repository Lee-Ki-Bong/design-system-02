'use client';

import { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/cn';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  width?: string;
  children: React.ReactNode;
  className?: string;
  /** Portal 대상 ref — 미지정 시 가장 가까운 [data-theme] 또는 document.body */
  portalRef?: React.RefObject<HTMLElement | null>;
}

const FADE_DURATION = 200;

export function Modal({
  open,
  onClose,
  width = 'min(94%, 400px)',
  children,
  className,
  portalRef,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus trap
  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement;

    const raf = requestAnimationFrame(() => {
      const first = dialogRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      first?.focus();
    });

    return () => {
      cancelAnimationFrame(raf);
      previousFocusRef.current?.focus();
    };
  }, [open]);

  // Trap tab within modal
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
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

  const getPortalTarget = () =>
    portalRef?.current ?? wrapperRef.current?.closest('[data-theme]') ?? document.body;

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
              zIndex: 'var(--z-modal)' as unknown as number,
              background: 'var(--color-overlay)',
              display: 'grid',
              placeItems: 'center',
              padding: 'var(--pad-2xl) var(--pad-lg)',
              animation: `fadeIn ${FADE_DURATION}ms ease-out`,
            }}
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              className={cn('ds-modal', className)}
              style={{
                position: 'relative',
                width,
                background: 'var(--color-surface-raised)',
                color: 'var(--color-text)',
                borderRadius: 'var(--radius-2xl)',
                boxShadow: 'var(--shadow-2xl)',
                overflow: 'hidden',
                animation: `fadeInUp ${FADE_DURATION}ms cubic-bezier(0.2, 0, 0, 1)`,
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

export function ModalHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(className)}
      style={{ padding: 'var(--pad-2xl) var(--pad-2xl) var(--gap-sm)' }}
    >
      {children}
    </div>
  );
}

export function ModalBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(className)} style={{ padding: '0 var(--pad-2xl) var(--pad-lg)' }}>
      {children}
    </div>
  );
}

export function ModalFooter({
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
        justifyContent: 'flex-end',
        gap: 'var(--gap-sm)',
        padding: 'var(--gap-lg) var(--pad-xl) var(--pad-lg)',
      }}
    >
      {children}
    </div>
  );
}

export function ModalClose({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="닫기"
      style={{
        position: 'absolute',
        top: 'var(--pad-md)',
        right: 'var(--pad-md)',
        width: 'var(--gap-3xl)',
        height: 'var(--gap-3xl)',
        borderRadius: 'var(--radius-full)',
        border: 0,
        background: 'transparent',
        cursor: 'pointer',
        display: 'grid',
        placeItems: 'center',
        color: 'var(--color-text-tertiary)',
        transition: 'background var(--token-transition-fast)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--color-surface-sunken)';
        e.currentTarget.style.color = 'var(--color-text)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = 'var(--color-text-tertiary)';
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  );
}
