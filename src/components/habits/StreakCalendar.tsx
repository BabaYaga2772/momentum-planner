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
  // Cyan-based intensity scale (GitHub-style but cyberpunk)
  const getCellStyle = (value: number) => {
    if (value === 0) return { background: 'rgba(255,255,255,0.04)' };
    if (value === 1) return { background: 'rgba(0,212,255,0.25)' };
    if (value === 2) return { background: 'rgba(0,212,255,0.5)', boxShadow: '0 0 4px rgba(0,212,255,0.2)' };
    return { background: '#00d4ff', boxShadow: '0 0 6px rgba(0,212,255,0.4)' };
  };

  // Group by weeks (Mon-start)
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

  const totalDone = history.filter((d) => d.value > 0).length;
  const streak = (() => {
    let s = 0;
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].value > 0) s++;
      else break;
    }
    return s;
  })();

  return (
    <TooltipProvider>
      <div className="space-y-2">
        {/* Stats row */}
        <div className="flex items-center gap-4 text-[10px] font-mono">
          <span style={{ color: '#444' }}>
            <span style={{ color: '#00d4ff' }}>{streak}</span> day streak
          </span>
          <span style={{ color: '#444' }}>
            <span style={{ color: '#00d4ff' }}>{totalDone}</span> total
          </span>
          {/* Legend */}
          <div className="flex items-center gap-1 ml-auto">
            <span style={{ color: '#333' }}>less</span>
            {[0, 1, 2, 3].map((v) => (
              <div
                key={v}
                className="w-2.5 h-2.5"
                style={getCellStyle(v)}
              />
            ))}
            <span style={{ color: '#333' }}>more</span>
          </div>
        </div>

        {/* Heatmap grid */}
        <div className="flex gap-0.5 overflow-x-auto pb-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-0.5">
              {week.map((day) => (
                <Tooltip key={day.date}>
                  <TooltipTrigger asChild>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: weekIndex * 0.01, duration: 0.15 }}
                      className="w-2.5 h-2.5 cursor-default transition-all duration-150 hover:scale-125"
                      style={getCellStyle(day.value)}
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="bg-[#111] border border-white/10 text-xs font-mono"
                  >
                    <p style={{ color: '#888' }}>
                      {format(parseISO(day.date), 'MMM d')}
                      {day.value > 0 && (
                        <span style={{ color: '#00d4ff' }} className="ml-1">
                          ×{day.value}
                        </span>
                      )}
                    </p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}
