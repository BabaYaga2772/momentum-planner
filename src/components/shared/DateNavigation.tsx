'use client';

import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate, isTodayStr } from '@/lib/utils';

interface DateNavigationProps {
  currentDate: string;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  formatStr?: string;
}

export function DateNavigation({
  currentDate,
  onPrevious,
  onNext,
  onToday,
  formatStr = 'EEEE, MMMM d, yyyy',
}: DateNavigationProps) {
  const isToday = isTodayStr(currentDate);

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={onPrevious}>
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold">{formatDate(currentDate, formatStr)}</h1>
        {isToday && (
          <span className="px-2 py-0.5 text-xs font-medium bg-violet-500/20 text-violet-400 rounded-full">
            Today
          </span>
        )}
      </div>

      <Button variant="ghost" size="icon" onClick={onNext}>
        <ChevronRight className="h-5 w-5" />
      </Button>

      {!isToday && (
        <Button variant="outline" size="sm" onClick={onToday} className="ml-2">
          <CalendarDays className="h-4 w-4 mr-1" />
          Today
        </Button>
      )}
    </div>
  );
}
