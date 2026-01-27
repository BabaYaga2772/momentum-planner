'use client';

import { useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { DEFAULT_LIFE_AREAS } from '@/lib/defaults';
import type { LifeArea } from '@/lib/types';

export function useLifeAreas() {
  const lifeAreas = useLiveQuery(() => db.lifeAreas.orderBy('order').toArray(), []);

  // Initialize default life areas if none exist
  useEffect(() => {
    const initLifeAreas = async () => {
      const areas = await db.lifeAreas.toArray();
      if (areas.length === 0) {
        const now = new Date().toISOString();
        const defaultAreas = DEFAULT_LIFE_AREAS.map((area) => ({
          ...area,
          createdAt: now,
        }));
        await db.lifeAreas.bulkAdd(defaultAreas);
      }
    };
    initLifeAreas();
  }, []);

  const addLifeArea = async (area: Omit<LifeArea, 'id' | 'createdAt'>) => {
    const id = await db.lifeAreas.add({
      ...area,
      createdAt: new Date().toISOString(),
    });
    return id;
  };

  const updateLifeArea = async (id: number, updates: Partial<LifeArea>) => {
    await db.lifeAreas.update(id, updates);
  };

  const deleteLifeArea = async (id: number) => {
    await db.lifeAreas.delete(id);
  };

  const reorderLifeAreas = async (orderedIds: number[]) => {
    await db.transaction('rw', db.lifeAreas, async () => {
      for (let i = 0; i < orderedIds.length; i++) {
        await db.lifeAreas.update(orderedIds[i], { order: i });
      }
    });
  };

  const getLifeAreaById = (id: number) => {
    return lifeAreas?.find((area) => area.id === id);
  };

  return {
    lifeAreas: lifeAreas ?? [],
    addLifeArea,
    updateLifeArea,
    deleteLifeArea,
    reorderLifeAreas,
    getLifeAreaById,
    isLoading: lifeAreas === undefined,
  };
}
