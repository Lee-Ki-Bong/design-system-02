'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/cn';

type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverProps {
  content: React.ReactNode;
  placement?: PopoverPlacement;
  width?: number;
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  className?: string;
}

const GAP = 8;
const FADE_DURATION = 150;
const ARROW_SIZE = 6;

function calcViewportPosition(
  trigger: DOMRect,
  popover: DOMRect,
  placement: PopoverPlacement,
): { top: number; left: number } {
  switch (placement) {
    case 'top':
      return {
        top: trigger.top - popover.height - GAP,
        left: trigger.left + trigger.width / 2 - popover.width / 2,
      };
    case 'bottom':
      return {
        top: trigger.bottom + GAP,
        left: trigger.left + trigger.width / 2 - popover.width / 2,
      };
    case 'left':
      return {
        top: trigger.top + trigger.height / 2 - popover.height / 2,
        left: trigger.left - popover.width - GAP,
      };
    case 'right':
      return {
        top: trigger.top + trigger.height / 2 - popover.height / 2,
        left: trigger.right + GAP,
      };
  }
}

function getPosition(
  trigger: DOMRect,
  popover: DOMRect,
  preferred: PopoverPlacement,
): { placement: PopoverPlacement; top: number; left: number } {
  const opposite: Record<PopoverPlacement, PopoverPlacement> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  };
  const placements: PopoverPlacement[] = [preferred, opposite[preferred]];
  for (const p of ['top', 'bottom', 'left', 'right'] as PopoverPlacement[]) {
    if (!placements.includes(p)) placements.push(p);
  }

  for (const p of placements) {
    const pos = calcViewportPosition(trigger, popover, p);
    if (
      pos.top >= 4 &&
      pos.left >= 4 &&
      pos.top + popover.height <= window.innerHeight - 4 &&
      pos.left + popover.width <= window.innerWidth - 4
    ) {
      return { placement: p, top: pos.top, left: pos.left };
    }
  }
  const fallback = calcViewportPosition(trigger, popover, preferred);
  return {
    placement: preferred,
    top: fallback.top,
    left: fallback.left,
  };
}

const arrowStyles: Record<PopoverPlacement, React.CSSProperties> = {
  top: {
    bottom: `-${ARROW_SIZE}px`,
    left: '50%',
    transform: 'translateX(-50%) rotate(45deg)',
  },
  bottom: {
    top: `-${ARROW_SIZE}px`,
    left: '50%',
    transform: 'translateX(-50%) rotate(45deg)',
  },
  left: {
    right: `-${ARROW_SIZE}px`,
    top: '50%',
    transform: 'translateY(-50%) rotate(45deg)',
  },
  right: {
    left: `-${ARROW_SIZE}px`,
    top: '50%',
    transform: 'translateY(-50%) rotate(45deg)',
  },
};

export function Popover({
  content,
  placement = 'bottom',
  width = 280,
  children,
  className,
}: PopoverProps) {
  const [mounted, setMounted] = useState(false);
  const [showOpacity, setShowOpacity] = useState(false);
  const [pos, setPos] = useState<{
    top: number;
    left: number;
    placement: PopoverPlacement;
  } | null>(null);

  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const result = getPosition(triggerRect, popoverRect, placement);
    setPos(result);
  }, [placement]);

  const open = useCallback(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    setShowOpacity(false);
    setTimeout(() => {
      setMounted(false);
      setPos(null);
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
    const handleClick = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        popoverRef.current?.contains(e.target as Node)
      ) {
        return;
      }
      close();
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [mounted, close]);

  // Escape key
  useEffect(() => {
    if (!mounted) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mounted, close]);

  const resolvedPlacement = pos?.placement ?? placement;

  return (
    <div ref={triggerRef} className={cn('ds-popover-trigger inline-flex', className)}>
      <span onClick={toggle} style={{ cursor: 'pointer' }}>
        {children}
      </span>

      {mounted &&
        createPortal(
          <div
            ref={popoverRef}
            role="dialog"
            style={{
              position: 'fixed',
              zIndex: 'var(--z-dropdown)' as unknown as number,
              top: pos?.top ?? -9999,
              left: pos?.left ?? -9999,
              width,
              padding: 'var(--pad-lg)',
              color: 'var(--color-text)',
              background: 'var(--color-surface-raised)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-lg)',
              opacity: showOpacity ? 1 : 0,
              transition: `opacity ${FADE_DURATION}ms ease-in-out`,
            }}
          >
            <span
              style={{
                position: 'absolute',
                width: `${ARROW_SIZE * 2}px`,
                height: `${ARROW_SIZE * 2}px`,
                background: 'var(--color-surface-raised)',
                boxShadow: 'var(--shadow-xs)',
                ...arrowStyles[resolvedPlacement],
              }}
            />
            <div style={{ position: 'relative' }}>{content}</div>
          </div>,
          triggerRef.current?.closest('[data-theme]') ?? document.body,
        )}
    </div>
  );
}
