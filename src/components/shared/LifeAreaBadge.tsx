'use client';

import { LIFE_AREA_COLORS } from '@/lib/defaults';
import { cn } from '@/lib/utils';
import type { LifeArea } from '@/lib/types';

interface LifeAreaBadgeProps {
  lifeArea: LifeArea;
  size?: 'sm' | 'md';
  showName?: boolean;
}

export function LifeAreaBadge({ lifeArea, size = 'sm', showName = true }: LifeAreaBadgeProps) {
  const colors = LIFE_AREA_COLORS[lifeArea.color] || LIFE_AREA_COLORS.slate;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border',
        colors.bg,
        colors.text,
        colors.border,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      )}
    >
      {showName && lifeArea.name}
    </span>
  );
}

interface LifeAreaDotProps {
  color: string;
  className?: string;
}

export function LifeAreaDot({ color, className }: LifeAreaDotProps) {
  const colors = LIFE_AREA_COLORS[color] || LIFE_AREA_COLORS.slate;

  return (
    <span
      className={cn(
        'inline-block w-2 h-2 rounded-full',
        colors.text.replace('text-', 'bg-'),
        className
      )}
    />
  );
}
