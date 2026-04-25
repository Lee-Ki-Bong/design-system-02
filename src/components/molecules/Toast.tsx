'use client';

import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

type ToastVariant = 'success' | 'info' | 'warning' | 'error' | 'emphasis';

export interface ToastData {
  id: string;
  variant?: ToastVariant;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  duration?: number;
}

interface ToastContextValue {
  toast: (data: Omit<ToastData, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

const iconPaths: Record<string, string> = {
  success: 'M5 12l4.5 4.5L19 7',
  info: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 8.01V8M12 11v5',
  warning:
    'M10.3 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.7 3.86a2 2 0 00-3.4 0zM12 9v4M12 17.01V17',
  error: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 8v5M12 16.01V16',
};

const colorMap: Record<string, { bg: string; color: string }> = {
  success: { bg: 'var(--color-success-bg)', color: 'var(--color-success)' },
  info: { bg: 'var(--color-info-bg)', color: 'var(--color-info)' },
  warning: { bg: 'var(--color-warning-bg)', color: 'var(--color-warning)' },
  error: { bg: 'var(--color-error-bg)', color: 'var(--color-error)' },
};

const DEFAULT_DURATION = 5000;

function ToastItem({ data, onDismiss }: { data: ToastData; onDismiss: (id: string) => void }) {
  const { variant = 'info', title, description, action, duration = DEFAULT_DURATION, id } = data;
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isEmphasis = variant === 'emphasis';

  useEffect(() => {
    if (duration > 0) {
      timerRef.current = setTimeout(() => onDismiss(id), duration);
    }
    return () => clearTimeout(timerRef.current);
  }, [id, duration, onDismiss]);

  const baseStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--gap-md)',
    padding: 'var(--pad-md) var(--pad-md) var(--pad-md) var(--gap-lg)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-lg)',
    minWidth: 320,
    maxWidth: 420,
    position: 'relative',
    animation: 'fadeInUp 200ms ease-out',
  };

  if (isEmphasis) {
    Object.assign(baseStyle, {
      background: 'var(--color-emphasis)',
      border: '1px solid var(--color-emphasis)',
      color: 'var(--color-on-emphasis)',
    });
  } else {
    Object.assign(baseStyle, {
      background: 'var(--color-surface-raised)',
      border: '1px solid var(--color-border-subtle)',
    });
  }

  return (
    <div role="status" aria-live="polite" style={baseStyle}>
      {/* Icon */}
      {!isEmphasis && colorMap[variant] && (
        <div
          style={{
            flexShrink: 0,
            width: 'var(--gap-3xl)',
            height: 'var(--gap-3xl)',
            borderRadius: 'var(--radius-full)',
            display: 'grid',
            placeItems: 'center',
            background: colorMap[variant].bg,
            color: colorMap[variant].color,
            marginTop: 1,
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={iconPaths[variant]} />
          </svg>
        </div>
      )}
      {isEmphasis && (
        <div
          style={{
            flexShrink: 0,
            width: 'var(--gap-3xl)',
            height: 'var(--gap-3xl)',
            borderRadius: 'var(--radius-full)',
            display: 'grid',
            placeItems: 'center',
            background: 'rgba(255,255,255,0.1)',
            color: 'var(--color-on-emphasis)',
            marginTop: 1,
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12l4.5 4.5L19 7" />
          </svg>
        </div>
      )}

      {/* Body */}
      <div style={{ flex: 1, minWidth: 0, paddingTop: 3 }}>
        <div
          style={{
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 'var(--font-weight-semibold)',
            color: isEmphasis ? 'var(--color-on-emphasis)' : 'var(--color-text)',
            marginBottom: 2,
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              fontSize: 'var(--font-size-body-sm)',
              color: isEmphasis ? 'var(--color-on-emphasis)' : 'var(--color-text-secondary)',
              opacity: isEmphasis ? 0.7 : 1,
              lineHeight: 1.5,
            }}
          >
            {description}
          </div>
        )}
        {action && !isEmphasis && (
          <button
            type="button"
            onClick={action.onClick}
            style={{
              marginTop: 'var(--gap-sm)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--gap-xs)',
              fontSize: 'var(--font-size-body-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-primary)',
              background: 'none',
              border: 0,
              padding: 0,
              cursor: 'pointer',
            }}
          >
            {action.label}
          </button>
        )}
      </div>

      {/* Emphasis action */}
      {action && isEmphasis && (
        <button
          type="button"
          onClick={action.onClick}
          style={{
            alignSelf: 'center',
            marginRight: 'var(--gap-xs)',
            fontSize: 'var(--font-size-body-sm)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-primary)',
            background: 'none',
            border: 0,
            padding: 0,
            cursor: 'pointer',
          }}
        >
          {action.label}
        </button>
      )}

      {/* Close */}
      <button
        type="button"
        onClick={() => onDismiss(id)}
        aria-label="닫기"
        style={{
          flexShrink: 0,
          width: 'var(--height-xs)',
          height: 'var(--height-xs)',
          borderRadius: 'var(--radius-full)',
          background: 'transparent',
          border: 0,
          cursor: 'pointer',
          display: 'grid',
          placeItems: 'center',
          color: isEmphasis ? 'var(--color-on-emphasis)' : 'var(--color-text-tertiary)',
          opacity: isEmphasis ? 0.6 : 1,
          marginTop: -2,
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const wrapperRef = useRef<HTMLSpanElement>(null);

  const toast = useCallback((data: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { ...data, id }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const portalTarget =
    typeof document !== 'undefined'
      ? (wrapperRef.current?.closest('[data-theme]') ?? document.body)
      : null;

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <span ref={wrapperRef} style={{ display: 'none' }} />
      {portalTarget &&
        toasts.length > 0 &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              bottom: 'var(--pad-xl)',
              right: 'var(--pad-xl)',
              zIndex: 'var(--z-modal)' as unknown as number,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--gap-sm)',
              pointerEvents: 'none',
            }}
          >
            {toasts.map((t) => (
              <div key={t.id} style={{ pointerEvents: 'auto' }}>
                <ToastItem data={t} onDismiss={dismiss} />
              </div>
            ))}
          </div>,
          portalTarget,
        )}
    </ToastContext.Provider>
  );
}
