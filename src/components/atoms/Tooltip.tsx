'use client';

import { useState, useRef, useId, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/cn';

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: React.ReactNode;
  placement?: TooltipPlacement;
  enterDelay?: number;
  leaveDelay?: number;
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  className?: string;
}

const ARROW_SIZE = 5;
const GAP = 10;
const FADE_DURATION = 150;

function getPosition(
  trigger: DOMRect,
  tooltip: DOMRect,
  preferred: TooltipPlacement,
): { placement: TooltipPlacement; top: number; left: number } {
  const opposite: Record<TooltipPlacement, TooltipPlacement> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  };
  const placements: TooltipPlacement[] = [preferred, opposite[preferred]];
  for (const p of ['top', 'bottom', 'left', 'right'] as TooltipPlacement[]) {
    if (!placements.includes(p)) placements.push(p);
  }

  for (const p of placements) {
    const pos = calcViewportPosition(trigger, tooltip, p);
    if (
      pos.top >= 4 &&
      pos.left >= 4 &&
      pos.top + tooltip.height <= window.innerHeight - 4 &&
      pos.left + tooltip.width <= window.innerWidth - 4
    ) {
      return {
        placement: p,
        top: pos.top + window.scrollY,
        left: pos.left + window.scrollX,
      };
    }
  }
  const fallback = calcViewportPosition(trigger, tooltip, preferred);
  return {
    placement: preferred,
    top: fallback.top + window.scrollY,
    left: fallback.left + window.scrollX,
  };
}

/** Returns position in viewport coordinates (no scroll offset) */
function calcViewportPosition(
  trigger: DOMRect,
  tooltip: DOMRect,
  placement: TooltipPlacement,
): { top: number; left: number } {
  switch (placement) {
    case 'top':
      return {
        top: trigger.top - tooltip.height - GAP,
        left: trigger.left + trigger.width / 2 - tooltip.width / 2,
      };
    case 'bottom':
      return {
        top: trigger.bottom + GAP,
        left: trigger.left + trigger.width / 2 - tooltip.width / 2,
      };
    case 'left':
      return {
        top: trigger.top + trigger.height / 2 - tooltip.height / 2,
        left: trigger.left - tooltip.width - GAP,
      };
    case 'right':
      return {
        top: trigger.top + trigger.height / 2 - tooltip.height / 2,
        left: trigger.right + GAP,
      };
  }
}

const arrowStyles: Record<TooltipPlacement, React.CSSProperties> = {
  top: {
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    borderTopColor: 'var(--color-emphasis)',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  bottom: {
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    borderTopColor: 'transparent',
    borderBottomColor: 'var(--color-emphasis)',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  left: {
    left: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'var(--color-emphasis)',
    borderRightColor: 'transparent',
  },
  right: {
    right: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'var(--color-emphasis)',
  },
};

export function Tooltip({
  content,
  placement = 'top',
  enterDelay = 0,
  leaveDelay = 100,
  children,
  className,
}: TooltipProps) {
  // mounted = DOM에 존재, showOpacity = opacity 1
  const [mounted, setMounted] = useState(false);
  const [showOpacity, setShowOpacity] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number; placement: TooltipPlacement } | null>(
    null,
  );

  const enterTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const fadeOutTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const result = getPosition(triggerRect, tooltipRect, placement);
    setPos(result);
  }, [placement]);

  // Position after mount & on scroll/resize
  useEffect(() => {
    if (!mounted) return;
    const raf = requestAnimationFrame(() => {
      updatePosition();
      // trigger fade-in on next frame so browser registers opacity change
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

  const show = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    if (fadeOutTimerRef.current) clearTimeout(fadeOutTimerRef.current);
    if (enterDelay > 0) {
      enterTimerRef.current = setTimeout(() => {
        setMounted(true);
      }, enterDelay);
    } else {
      setMounted(true);
    }
  };

  const hide = () => {
    if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
    // Start fade-out
    leaveTimerRef.current = setTimeout(() => {
      setShowOpacity(false);
      // Remove from DOM after fade-out transition completes
      fadeOutTimerRef.current = setTimeout(() => {
        setMounted(false);
        setPos(null);
      }, FADE_DURATION);
    }, leaveDelay);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && mounted) {
      setShowOpacity(false);
      setTimeout(() => {
        setMounted(false);
        setPos(null);
      }, FADE_DURATION);
    }
  };

  const resolvedPlacement = pos?.placement ?? placement;

  return (
    <div
      ref={triggerRef}
      className={cn('ds-tooltip relative inline-flex', className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onKeyDown={handleKeyDown}
    >
      <span aria-describedby={mounted ? tooltipId : undefined}>{children}</span>

      {mounted &&
        createPortal(
          <div
            ref={tooltipRef}
            id={tooltipId}
            role="tooltip"
            className="whitespace-nowrap pointer-events-none"
            style={{
              position: 'absolute',
              zIndex: 9999,
              top: pos?.top ?? -9999,
              left: pos?.left ?? -9999,
              backgroundColor: 'var(--color-emphasis)',
              color: 'var(--color-on-emphasis)',
              fontSize: '12px',
              fontWeight: 500,
              lineHeight: 1.4,
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-md)',
              opacity: showOpacity ? 1 : 0,
              transition: `opacity ${FADE_DURATION}ms ease-in-out`,
            }}
          >
            {content}
            <span
              className="absolute"
              style={{
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: `${ARROW_SIZE}px`,
                ...arrowStyles[resolvedPlacement],
              }}
            />
          </div>,
          document.body,
        )}
    </div>
  );
}
