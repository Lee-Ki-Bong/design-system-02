'use client';

import { cn } from '@/lib/cn';
import iconsData from './icons.json';

type IconName = keyof typeof iconsData;

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}

const icons = iconsData as Record<string, string>;

export function Icon({
  name,
  size = 24,
  strokeWidth = 1.8,
  className,
  style,
  ...props
}: IconProps) {
  const pathData = icons[name];
  if (!pathData) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('ds-icon shrink-0', className)}
      style={style}
      {...props}
    >
      <g dangerouslySetInnerHTML={{ __html: pathData }} />
    </svg>
  );
}

export function getIconNames(): IconName[] {
  return Object.keys(iconsData).filter((k) => k !== '_note') as IconName[];
}
