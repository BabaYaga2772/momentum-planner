'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import type { Habit, HabitCompletion } from '@/lib/types';
import { format, parseISO, subDays, isAfter, isBefore, eachDayOfInterval } from 'date-fns';

export function useHabits() {
  const habits = useLiveQuery(() => db.habits.toArray(), []);

  const addHabit = async (habit: Omit<Habit, 'id' | 'createdAt'>) => {
    const id = await db.habits.add({
      ...habit,
      createdAt: new Date().toISOString(),
    });
    return id;
  };

  const updateHabit = async (id: number, updates: Partial<Habit>) => {
    await db.habits.update(id, updates);
  };

  const deleteHabit = async (id: number) => {
    await db.transaction('rw', [db.habits, db.habitCompletions], async () => {
      await db.habitCompletions.where('habitId').equals(id).delete();
      await db.habits.delete(id);
    });
  };

  return {
    habits: habits ?? [],
    addHabit,
    updateHabit,
    deleteHabit,
    isLoading: habits === undefined,
  };
}

export function useHabitCompletions(date: string) {
  const completions = useLiveQuery(
    () => db.habitCompletions.where('date').equals(date).toArray(),
    [date]
  );

  const completeHabit = async (habitId: number, value: number = 1) => {
    const existing = await db.habitCompletions
      .where('[habitId+date]')
      .equals([habitId, date])
      .first();

    if (existing) {
      await db.habitCompletions.update(existing.id!, { value, timestamp: new Date().toISOString() });
    } else {
      await db.habitCompletions.add({
        habitId,
        date,
        value,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const uncompleteHabit = async (habitId: number) => {
    await db.habitCompletions.where('[habitId+date]').equals([habitId, date]).delete();
  };

  const getCompletionForHabit = (habitId: number): HabitCompletion | undefined => {
    return completions?.find((c) => c.habitId === habitId);
  };

  const isHabitCompleted = (habitId: number): boolean => {
    return completions?.some((c) => c.habitId === habitId) ?? false;
  };

  return {
    completions: completions ?? [],
    completeHabit,
    uncompleteHabit,
    getCompletionForHabit,
    isHabitCompleted,
    isLoading: completions === undefined,
  };
}

export function useHabitStreak(habitId: number) {
  const streakData = useLiveQuery(async () => {
    const habit = await db.habits.get(habitId);
    if (!habit) return { current: 0, longest: 0 };

    const completions = await db.habitCompletions
      .where('habitId')
      .equals(habitId)
      .reverse()
      .sortBy('date');

    if (completions.length === 0) return { current: 0, longest: 0 };

    const today = format(new Date(), 'yyyy-MM-dd');
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    let checkDate = today;

    const isScheduledForDay = (date: string, schedule: Habit['schedule']): boolean => {
      if (schedule.type === 'daily') return true;
      if (schedule.type === 'specific-days' && schedule.days) {
        const dayOfWeek = parseISO(date).getDay();
        return schedule.days.includes(dayOfWeek);
      }
      return true;
    };

    const completionDates = new Set(completions.map((c) => c.date));

    for (let i = 0; i < 365; i++) {
      const dateStr = format(subDays(parseISO(today), i), 'yyyy-MM-dd');

      if (!isScheduledForDay(dateStr, habit.schedule)) {
        continue;
      }

      if (completionDates.has(dateStr)) {
        if (i === 0 || tempStreak > 0) {
          currentStreak = tempStreak + 1;
        }
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        if (i === 0) {
          currentStreak = 0;
        }
        tempStreak = 0;
      }
    }

    return { current: currentStreak, longest: longestStreak };
  }, [habitId]);

  return streakData ?? { current: 0, longest: 0 };
}

export function useHabitHistory(habitId: number, days: number = 30) {
  const history = useLiveQuery(async () => {
    const today = new Date();
    const startDate = subDays(today, days - 1);
    const dates = eachDayOfInterval({ start: startDate, end: today });

    const completions = await db.habitCompletions
      .where('habitId')
      .equals(habitId)
      .toArray();

    const completionMap = new Map(completions.map((c) => [c.date, c.value]));

    return dates.map((date) => {
      const dateStr = format(date, 'yyyy-MM-dd');
      return {
        date: dateStr,
        value: completionMap.get(dateStr) ?? 0,
      };
    });
  }, [habitId, days]);

  return history ?? [];
}
