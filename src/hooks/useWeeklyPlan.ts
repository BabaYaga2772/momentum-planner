'use client';

import { useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, toKey } from '@/lib/db';
import type { WeeklyPlan, Task, WeeklyReview, LifeAreaGoal } from '@/lib/types';
import { createEmptyTask, createEmptyLifeAreaGoal } from '@/lib/utils';

function createEmptyWeeklyPlan(weekStart: string, lifeAreaIds: string[]): Omit<WeeklyPlan, 'id'> {
  const lifeAreaGoals: Record<string, LifeAreaGoal[]> = {};
  lifeAreaIds.forEach((id) => {
    lifeAreaGoals[id] = [createEmptyLifeAreaGoal()];
  });

  return {
    weekStart,
    lastWeekReview: { wins: '', challenges: '', lessons: '' },
    topPriorities: [createEmptyTask(), createEmptyTask(), createEmptyTask()],
    weeklyPlan: [
      createEmptyTask('1. '),
      createEmptyTask('2. '),
      createEmptyTask('3. '),
      createEmptyTask('4. '),
      createEmptyTask('5. '),
    ],
    notes: '',
    lifeAreaGoals,
    createdAt: new Date().toISOString(),
  };
}

export function useWeeklyPlan(weekStart: string) {
  const weeklyPlan = useLiveQuery(
    () => db.weeklyPlans.where('weekStart').equals(weekStart).first(),
    [weekStart]
  );

  // Initialize weekly plan if it doesn't exist
  useEffect(() => {
    const initPlan = async () => {
      const existing = await db.weeklyPlans.where('weekStart').equals(weekStart).first();
      if (!existing) {
        const lifeAreas = await db.lifeAreas.toArray();
        const lifeAreaIds = lifeAreas.map((a) => String(a.id!));
        const newPlan = createEmptyWeeklyPlan(weekStart, lifeAreaIds);
        await db.weeklyPlans.add(newPlan);
      }
    };
    initPlan();
  }, [weekStart]);

  const updateWeeklyPlan = async (updates: Partial<WeeklyPlan>) => {
    if (weeklyPlan?.id) {
      await db.weeklyPlans.update(toKey(weeklyPlan.id), updates);
    }
  };

  const updateLastWeekReview = async (review: WeeklyReview) => {
    await updateWeeklyPlan({ lastWeekReview: review });
  };

  const updateTopPriorities = async (priorities: Task[]) => {
    await updateWeeklyPlan({ topPriorities: priorities });
  };

  const updateWeeklyPlanItems = async (items: Task[]) => {
    await updateWeeklyPlan({ weeklyPlan: items });
  };

  const updateNotes = async (notes: string) => {
    await updateWeeklyPlan({ notes });
  };

  const updateLifeAreaGoals = async (lifeAreaId: string, goals: LifeAreaGoal[]) => {
    if (weeklyPlan) {
      const updated = {
        ...weeklyPlan.lifeAreaGoals,
        [lifeAreaId]: goals,
      };
      await updateWeeklyPlan({ lifeAreaGoals: updated });
    }
  };

  return {
    weeklyPlan,
    updateWeeklyPlan,
    updateLastWeekReview,
    updateTopPriorities,
    updateWeeklyPlanItems,
    updateNotes,
    updateLifeAreaGoals,
    isLoading: weeklyPlan === undefined,
  };
}
