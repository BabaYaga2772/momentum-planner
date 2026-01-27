'use client';

import { motion } from 'framer-motion';
import { Plus, Flame } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useHabits, useHabitCompletions, useHabitStreak } from '@/hooks/useHabits';
import { useLifeAreas } from '@/hooks/useLifeAreas';
import { useUser } from '@/hooks/useUser';
import { useUIStore } from '@/lib/store';
import { LifeAreaDot } from '@/components/shared/LifeAreaBadge';
import { cn } from '@/lib/utils';
import { parseISO, getDay } from 'date-fns';

interface HabitsDailySectionProps {
  date: string;
}

export function HabitsDailySection({ date }: HabitsDailySectionProps) {
  const { habits, isLoading: habitsLoading } = useHabits();
  const { isHabitCompleted, completeHabit, uncompleteHabit } = useHabitCompletions(date);
  const { getLifeAreaById } = useLifeAreas();
  const { addXP, unlockAchievement, xpValues } = useUser();
  const { triggerConfetti } = useUIStore();

  const dayOfWeek = getDay(parseISO(date));

  const todaysHabits = habits.filter((habit) => {
    if (habit.schedule.type === 'daily') return true;
    if (habit.schedule.type === 'specific-days' && habit.schedule.days) {
      return habit.schedule.days.includes(dayOfWeek);
    }
    return true;
  });

  const handleToggle = async (habitId: number, isCompleted: boolean) => {
    if (isCompleted) {
      await uncompleteHabit(habitId);
    } else {
      await completeHabit(habitId, 1);
      await addXP(xpValues.habitComplete, 'habit');
      triggerConfetti();

      if (habits.length === 1) {
        await unlockAchievement('first-habit');
      }
    }
  };

  if (habitsLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-10 bg-muted/50 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  if (todaysHabits.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-muted-foreground mb-3">No habits for today</p>
        <Link href="/habits">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Habits
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todaysHabits.map((habit) => {
        const completed = isHabitCompleted(habit.id!);
        const lifeArea = getLifeAreaById(habit.lifeAreaId);

        return (
          <HabitItem
            key={habit.id}
            habitId={habit.id!}
            name={habit.name}
            completed={completed}
            lifeAreaColor={lifeArea?.color || 'slate'}
            onToggle={() => handleToggle(habit.id!, completed)}
          />
        );
      })}

      <Link href="/habits" className="block mt-3">
        <Button variant="ghost" size="sm" className="w-full text-muted-foreground">
          Manage Habits
        </Button>
      </Link>
    </div>
  );
}

interface HabitItemProps {
  habitId: number;
  name: string;
  completed: boolean;
  lifeAreaColor: string;
  onToggle: () => void;
}

function HabitItem({ habitId, name, completed, lifeAreaColor, onToggle }: HabitItemProps) {
  const streak = useHabitStreak(habitId);

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className={cn(
        'flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer',
        completed
          ? 'bg-emerald-500/10 border-emerald-500/30'
          : 'bg-muted/30 border-border/50 hover:border-violet-500/30'
      )}
      onClick={onToggle}
    >
      <Checkbox
        checked={completed}
        className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
      />
      <LifeAreaDot color={lifeAreaColor} />
      <span className={cn(
        'flex-1 text-sm font-medium',
        completed && 'line-through text-muted-foreground'
      )}>
        {name}
      </span>
      {streak.current > 0 && (
        <div className="flex items-center gap-1 text-xs text-amber-400">
          <Flame className="h-3 w-3" />
          {streak.current}
        </div>
      )}
    </motion.div>
  );
}
