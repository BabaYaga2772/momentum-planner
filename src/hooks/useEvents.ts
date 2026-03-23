'use client';

import { useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, toKey } from '@/lib/db';
import type { CalendarEvent } from '@/lib/types';
import { format, startOfMonth, endOfMonth } from 'date-fns';

export function useEvents(month?: number, year?: number) {
  const events = useLiveQuery(async () => {
    if (month !== undefined && year !== undefined) {
      const start = startOfMonth(new Date(year, month));
      const end = endOfMonth(start);
      const startStr = format(start, 'yyyy-MM-dd');
      const endStr = format(end, 'yyyy-MM-dd');

      return db.events
        .where('date')
        .between(startStr, endStr, true, true)
        .toArray();
    }
    return db.events.toArray();
  }, [month, year]);

  const addEvent = async (event: Omit<CalendarEvent, 'id'>) => {
    const id = await db.events.add(event);
    return id;
  };

  const updateEvent = async (id: string, updates: Partial<CalendarEvent>) => {
    await db.events.update(toKey(id), updates);
  };

  const deleteEvent = async (id: string) => {
    await db.events.delete(toKey(id));
  };

  const getEventsForDate = (date: string) => {
    return events?.filter((e) => e.date === date) ?? [];
  };

  return {
    events: events ?? [],
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate,
    isLoading: events === undefined,
  };
}

export function useMonthlyPlan(month: number, year: number) {
  const monthlyPlan = useLiveQuery(
    () => db.monthlyPlans.where('[month+year]').equals([month, year]).first(),
    [month, year]
  );

  // Initialize monthly plan if it doesn't exist
  useEffect(() => {
    const initPlan = async () => {
      const existing = await db.monthlyPlans
        .where('[month+year]')
        .equals([month, year])
        .first();

      if (!existing) {
        const newPlan = {
          month,
          year,
          goals: [],
          notes: '',
          createdAt: new Date().toISOString(),
        };
        await db.monthlyPlans.add(newPlan);
      }
    };
    initPlan();
  }, [month, year]);

  const updateMonthlyPlan = async (updates: { goals?: { id: string; text: string; completed: boolean }[]; notes?: string }) => {
    if (monthlyPlan?.id) {
      await db.monthlyPlans.update(toKey(monthlyPlan.id), updates);
    }
  };

  return {
    monthlyPlan,
    updateMonthlyPlan,
    isLoading: monthlyPlan === undefined,
  };
}
