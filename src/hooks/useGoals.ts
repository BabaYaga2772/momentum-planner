'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import type { Goal } from '@/lib/types';

export function useGoals(lifeAreaId?: number) {
  const goals = useLiveQuery(async () => {
    if (lifeAreaId !== undefined) {
      return db.goals.where('lifeAreaId').equals(lifeAreaId).toArray();
    }
    return db.goals.toArray();
  }, [lifeAreaId]);

  const addGoal = async (goal: Omit<Goal, 'id' | 'createdAt'>) => {
    const id = await db.goals.add({
      ...goal,
      createdAt: new Date().toISOString(),
    });
    return id;
  };

  const updateGoal = async (id: number, updates: Partial<Goal>) => {
    await db.goals.update(id, updates);
  };

  const deleteGoal = async (id: number) => {
    await db.goals.delete(id);
  };

  const getGoalsByType = (type: Goal['type']) => {
    return goals?.filter((g) => g.type === type && g.status === 'active') ?? [];
  };

  const getActiveGoals = () => {
    return goals?.filter((g) => g.status === 'active') ?? [];
  };

  return {
    goals: goals ?? [],
    addGoal,
    updateGoal,
    deleteGoal,
    getGoalsByType,
    getActiveGoals,
    isLoading: goals === undefined,
  };
}
