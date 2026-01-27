'use client';

import { motion } from 'framer-motion';
import { Flame, Trash2, Edit2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useHabitStreak, useHabitHistory } from '@/hooks/useHabits';
import { useLifeAreas } from '@/hooks/useLifeAreas';
import { LifeAreaBadge } from '@/components/shared/LifeAreaBadge';
import { StreakCalendar } from './StreakCalendar';
import type { Habit } from '@/lib/types';
import { cn } from '@/lib/utils';

interface HabitCardProps {
  habit: Habit;
  onEdit: () => void;
  onDelete: () => void;
}

export function HabitCard({ habit, onEdit, onDelete }: HabitCardProps) {
  const streak = useHabitStreak(habit.id!);
  const history = useHabitHistory(habit.id!, 35);
  const { getLifeAreaById } = useLifeAreas();

  const lifeArea = getLifeAreaById(habit.lifeAreaId);

  const getScheduleText = () => {
    if (habit.schedule.type === 'daily') return 'Daily';
    if (habit.schedule.type === 'specific-days' && habit.schedule.days) {
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return habit.schedule.days.map((d) => dayNames[d]).join(', ');
    }
    if (habit.schedule.type === 'times-per-week') {
      return `${habit.schedule.timesPerWeek}x per week`;
    }
    return '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl bg-card border border-border/50 hover:border-violet-500/30 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg">{habit.name}</h3>
          {habit.description && (
            <p className="text-sm text-muted-foreground mt-0.5">{habit.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            {lifeArea && <LifeAreaBadge lifeArea={lifeArea} size="sm" />}
            <span className="text-xs text-muted-foreground">{getScheduleText()}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Streak Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
            <Flame className={cn(
              'h-4 w-4',
              streak.current > 0 ? 'text-amber-400' : 'text-muted-foreground'
            )} />
            <span className={cn(
              'text-sm font-bold',
              streak.current > 0 ? 'text-amber-400' : 'text-muted-foreground'
            )}>
              {streak.current}
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-4 text-sm">
        <div>
          <span className="text-muted-foreground">Current: </span>
          <span className="font-medium text-amber-400">{streak.current} days</span>
        </div>
        <div>
          <span className="text-muted-foreground">Best: </span>
          <span className="font-medium text-emerald-400">{streak.longest} days</span>
        </div>
        {habit.type === 'quantity' && habit.target && (
          <div>
            <span className="text-muted-foreground">Target: </span>
            <span className="font-medium">{habit.target} {habit.unit}</span>
          </div>
        )}
      </div>

      {/* Streak Calendar */}
      <StreakCalendar history={history} />
    </motion.div>
  );
}
