'use client';

import { useState, useRef, useId } from 'react';
import { cn } from '@/lib/cn';

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: React.ReactNode;
  placement?: TooltipPlacement;
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  className?: string;
}

const placementStyles: Record<TooltipPlacement, React.CSSProperties> = {
  top: { bottom: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)' },
  bottom: { top: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)' },
  left: { right: 'calc(100% + 10px)', top: '50%', transform: 'translateY(-50%)' },
  right: { left: 'calc(100% + 10px)', top: '50%', transform: 'translateY(-50%)' },
};

const arrowStyles: Record<TooltipPlacement, React.CSSProperties> = {
  top: {
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    borderTopColor: 'var(--color-emphasis)',
  },
  bottom: {
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    borderBottomColor: 'var(--color-emphasis)',
  },
  left: {
    left: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    borderLeftColor: 'var(--color-emphasis)',
  },
  right: {
    right: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    borderRightColor: 'var(--color-emphasis)',
  },
};

export function Tooltip({ content, placement = 'top', children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const tooltipId = useId();

  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(true);
  };

  const hide = () => {
    timeoutRef.current = setTimeout(() => setVisible(false), 100);
  };

  return (
    <div
      className={cn('ds-tooltip relative inline-flex', className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {/* Trigger */}
      <span aria-describedby={visible ? tooltipId : undefined}>{children}</span>

      {/* Tooltip */}
      {visible && (
        <div
          id={tooltipId}
          role="tooltip"
          className="absolute z-10 whitespace-nowrap pointer-events-none"
          style={{
            backgroundColor: 'var(--color-emphasis)',
            color: 'var(--color-on-emphasis)',
            fontSize: '12px',
            fontWeight: 500,
            lineHeight: 1.4,
            padding: '8px 14px',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            ...placementStyles[placement],
          }}
        >
          {content}
          {/* Arrow */}
          <span
            className="absolute"
            style={{
              width: 0,
              height: 0,
              border: '5px solid transparent',
              ...arrowStyles[placement],
            }}
          />
        </div>
      )}
    </div>
  );
}
