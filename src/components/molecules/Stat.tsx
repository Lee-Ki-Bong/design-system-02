'use client';

import { cn } from '@/lib/cn';

type StatTrend = 'up' | 'down' | 'neutral';

export interface StatProps {
  value: string | number;
  label: string;
  trend?: StatTrend;
  trendValue?: string;
  sparkline?: number[];
  className?: string;
  style?: React.CSSProperties;
}

const trendConfig: Record<StatTrend, { symbol: string; color: string; bg: string }> = {
  up: { symbol: '↑', color: 'var(--color-success)', bg: 'var(--color-success-bg)' },
  down: { symbol: '↓', color: 'var(--color-error)', bg: 'var(--color-error-bg)' },
  neutral: { symbol: '→', color: 'var(--color-text-tertiary)', bg: 'var(--color-surface)' },
};

export function Stat({ value, label, trend, trendValue, sparkline, className, style }: StatProps) {
  const t = trend ? trendConfig[trend] : null;
  const maxSpark = sparkline ? Math.max(...sparkline) : 0;

  return (
    <div
      className={cn('ds-stat flex items-center gap-[var(--gap-md)]', className)}
      style={{
        backgroundColor: 'var(--color-surface-raised)',
        borderRadius: 'var(--radius-2xl)',
        padding: 'var(--pad-lg) var(--pad-xl)',
        boxShadow: 'var(--shadow-sm)',
        minWidth: '180px',
        ...style,
      }}
    >
      <div>
        <div
          className="flex items-start"
          style={{
            fontSize: '36px',
            fontWeight: 'var(--font-weight-bold)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: 'var(--color-text)',
            gap: 'var(--gap-xs)',
          }}
        >
          {value}
          {t && (
            <span
              className="inline-flex items-center"
              style={{
                fontSize: 'var(--font-size-caption)',
                fontWeight: 'var(--font-weight-semibold)',
                padding: '2px var(--pad-xs)',
                borderRadius: 'var(--gap-sm)',
                marginTop: 'var(--gap-xs)',
                backgroundColor: t.bg,
                color: t.color,
              }}
            >
              {trendValue ?? t.symbol}
            </span>
          )}
        </div>
        <div
          style={{
            fontSize: 'var(--font-size-caption)',
            color: 'var(--color-text-tertiary)',
            marginTop: 'var(--gap-xs)',
          }}
        >
          {label}
        </div>
      </div>

      {sparkline && sparkline.length > 0 && (
        <div
          className="flex items-end flex-1 self-stretch"
          style={{ height: 'var(--gap-3xl)', gap: '2px' }}
        >
          {sparkline.map((v, i) => {
            const pct = maxSpark > 0 ? (v / maxSpark) * 100 : 0;
            const isHigh = pct >= 60;
            return (
              <div
                key={i}
                style={{
                  height: `${pct}%`,
                  width: '3px',
                  borderRadius: '2px',
                  backgroundColor: t
                    ? isHigh
                      ? t.color
                      : t.bg
                    : isHigh
                      ? 'var(--color-emphasis)'
                      : 'var(--color-surface-sunken)',
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
