/**
 * Progress / CircularProgress
 *
 * ## 실시간 진행률 연동 방식 (value를 어떻게 갱신하는가)
 *
 * 1. SSE (Server-Sent Events) — 가장 일반적
 *    서버→클라이언트 단방향 스트림. HTTP 연결 유지하며 서버가 push.
 *    파일 업로드 후 서버 처리(인코딩, 배치) 진행률에 적합.
 *
 * 2. WebSocket — 양방향 필요 시
 *    채팅, 게임 등 양방향 통신이 필요할 때. 단순 진행률만이면 SSE가 가벼움.
 *
 * 3. Polling — 가장 단순
 *    클라이언트가 1~2초마다 GET /api/jobs/:id/status 호출.
 *    구현 쉽고 인프라 부담 없음, 실시간성은 떨어짐.
 *
 * 4. XHR progress — 업로드/다운로드 전용
 *    xhr.upload.onprogress 이벤트로 바이트 단위 추적.
 *    별도 서버 구현 없이 브라우저가 계산.
 *
 * 정확한 퍼센트를 알 수 있으면 Progress, 없으면 Spinner 사용.
 */

'use client';

import { cn } from '@/lib/cn';

type ProgressSize = 'sm' | 'md' | 'lg';
type ProgressColor = 'emphasis' | 'primary' | 'success' | 'warning' | 'error' | 'info';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  size?: ProgressSize;
  color?: ProgressColor;
  showPercent?: boolean;
}

const sizeHeight: Record<ProgressSize, string> = {
  sm: '3px',
  md: '6px',
  lg: '10px',
};

const colorVar: Record<ProgressColor, string> = {
  emphasis: 'var(--color-emphasis)',
  primary: 'var(--color-primary)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  error: 'var(--color-error)',
  info: 'var(--color-info)',
};

export function Progress({
  value,
  size = 'md',
  color = 'emphasis',
  showPercent = false,
  className,
  style,
  ...props
}: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div
      className={cn('ds-progress flex items-center', className)}
      style={{ gap: 'var(--gap-md)', ...style }}
      {...props}
    >
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="진행률"
        className="flex-1 overflow-hidden"
        style={{
          height: sizeHeight[size],
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--color-surface-sunken)',
        }}
      >
        <div
          style={{
            width: `${clamped}%`,
            height: '100%',
            borderRadius: 'var(--radius-full)',
            backgroundColor: colorVar[color],
            transition: 'width 300ms ease-out',
          }}
        />
      </div>
      {showPercent && (
        <span
          className="shrink-0 text-right text-xs font-semibold"
          style={{ color: 'var(--color-text)', minWidth: 36 }}
        >
          {clamped}%
        </span>
      )}
    </div>
  );
}

/* ─── Circular Progress ─── */

export interface CircularProgressProps extends React.SVGAttributes<SVGSVGElement> {
  value: number;
  svgSize?: number;
  strokeWidth?: number;
  color?: ProgressColor;
  showValue?: boolean;
}

export function CircularProgress({
  value,
  svgSize = 64,
  strokeWidth = 5,
  color = 'emphasis',
  showValue = true,
  className,
  style,
  ...props
}: CircularProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const r = (svgSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <svg
      width={svgSize}
      height={svgSize}
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      className={cn('ds-circular-progress', className)}
      style={style}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="진행률"
      {...props}
    >
      <circle
        cx={svgSize / 2}
        cy={svgSize / 2}
        r={r}
        fill="none"
        stroke="var(--color-surface-sunken)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={svgSize / 2}
        cy={svgSize / 2}
        r={r}
        fill="none"
        stroke={colorVar[color]}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${svgSize / 2} ${svgSize / 2})`}
        style={{ transition: 'stroke-dashoffset 300ms ease-out' }}
      />
      {showValue && (
        <text
          x={svgSize / 2}
          y={svgSize / 2}
          dy="0.35em"
          textAnchor="middle"
          fontSize={14}
          fontWeight={700}
          fill="var(--color-text)"
        >
          {clamped}
        </text>
      )}
    </svg>
  );
}
