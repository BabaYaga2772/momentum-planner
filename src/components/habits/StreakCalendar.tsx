'use client';

import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface StreakCalendarProps {
  history: { date: string; value: number }[];
}

export function StreakCalendar({ history }: StreakCalendarProps) {
  const getIntensity = (value: number) => {
    if (value === 0) return 'bg-muted/30';
    if (value === 1) return 'bg-emerald-500/40';
    if (value >= 2) return 'bg-emerald-500/70';
    return 'bg-emerald-500';
  };

  // Group by weeks
  const weeks: { date: string; value: number }[][] = [];
  let currentWeek: { date: string; value: number }[] = [];

  history.forEach((day, index) => {
    const dayOfWeek = parseISO(day.date).getDay();
    if (dayOfWeek === 1 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
    if (index === history.length - 1) {
      weeks.push(currentWeek);
    }
  });

  return (
    <TooltipProvider>
      <div className="flex gap-1 overflow-x-auto pb-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day) => (
              <Tooltip key={day.date}>
                <TooltipTrigger>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: weekIndex * 0.02 }}
                    className={cn(
                      'w-3 h-3 rounded-sm transition-colors duration-200',
                      getIntensity(day.value),
                      day.value > 0 && 'hover:ring-2 hover:ring-emerald-400/50'
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-xs">
                    {format(parseISO(day.date), 'MMM d, yyyy')}
                    {day.value > 0 && (
                      <span className="text-emerald-400 ml-1">
                        ({day.value}x)
                      </span>
                    )}
                  </p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
}
