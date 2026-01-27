'use client';

import { useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import type { DailyPlan, Task, ScheduleBlock, DailyReview, Mood } from '@/lib/types';
import { createEmptyTask } from '@/lib/utils';
import { SCHEDULE_HOURS } from '@/lib/defaults';

function createEmptyDailyPlan(date: string): Omit<DailyPlan, 'id'> {
  return {
    date,
    topPriorities: [createEmptyTask(), createEmptyTask(), createEmptyTask()],
    schedule: SCHEDULE_HOURS.map((time) => ({ time, content: '' })),
    primaryTasks: [createEmptyTask()],
    secondaryTasks: [createEmptyTask()],
    notes: '',
    review: { accomplishments: '', lessons: '', gratitude: '' },
    mood: { score: 0, note: '' },
    createdAt: new Date().toISOString(),
  };
}

export function useDailyPlan(date: string) {
  const dailyPlan = useLiveQuery(
    () => db.dailyPlans.where('date').equals(date).first(),
    [date]
  );

  // Initialize daily plan if it doesn't exist
  useEffect(() => {
    const initPlan = async () => {
      const existing = await db.dailyPlans.where('date').equals(date).first();
      if (!existing) {
        const newPlan = createEmptyDailyPlan(date);
        await db.dailyPlans.add(newPlan);
      }
    };
    initPlan();
  }, [date]);

  const updateDailyPlan = async (updates: Partial<DailyPlan>) => {
    if (dailyPlan?.id) {
      await db.dailyPlans.update(dailyPlan.id, updates);
    }
  };

  const updateTopPriorities = async (priorities: Task[]) => {
    await updateDailyPlan({ topPriorities: priorities });
  };

  const updateSchedule = async (schedule: ScheduleBlock[]) => {
    await updateDailyPlan({ schedule });
  };

  const updatePrimaryTasks = async (tasks: Task[]) => {
    await updateDailyPlan({ primaryTasks: tasks });
  };

  const updateSecondaryTasks = async (tasks: Task[]) => {
    await updateDailyPlan({ secondaryTasks: tasks });
  };

  const updateNotes = async (notes: string) => {
    await updateDailyPlan({ notes });
  };

  const updateReview = async (review: DailyReview) => {
    await updateDailyPlan({ review });
  };

  const updateMood = async (mood: Mood) => {
    await updateDailyPlan({ mood });
  };

  return {
    dailyPlan,
    updateDailyPlan,
    updateTopPriorities,
    updateSchedule,
    updatePrimaryTasks,
    updateSecondaryTasks,
    updateNotes,
    updateReview,
    updateMood,
    isLoading: dailyPlan === undefined,
  };
}
