import Dexie, { type Table } from 'dexie';
import type {
  LifeArea,
  Goal,
  DailyPlan,
  WeeklyPlan,
  MonthlyPlan,
  CalendarEvent,
  Habit,
  HabitCompletion,
  UserData,
  AIConversation,
} from './types';

// Dexie uses auto-increment number keys internally.
// App types use string IDs (for Supabase UUID migration).
// During transition, Dexie assigns numbers but we cast to string at boundaries.
// Use toKey() to convert string IDs back to Dexie number keys.
export function toKey(id: string | undefined): number {
  return Number(id);
}

const db = new Dexie('MomentumDB') as Dexie & {
  lifeAreas: Table<LifeArea, number>;
  goals: Table<Goal, number>;
  dailyPlans: Table<DailyPlan, number>;
  weeklyPlans: Table<WeeklyPlan, number>;
  monthlyPlans: Table<MonthlyPlan, number>;
  events: Table<CalendarEvent, number>;
  habits: Table<Habit, number>;
  habitCompletions: Table<HabitCompletion, number>;
  userData: Table<UserData, number>;
  aiConversations: Table<AIConversation, number>;
};

db.version(1).stores({
  lifeAreas: '++id, name, order, isDefault',
  goals: '++id, lifeAreaId, type, status, targetDate',
  dailyPlans: '++id, date',
  weeklyPlans: '++id, weekStart',
  monthlyPlans: '++id, [month+year]',
  events: '++id, date, lifeAreaId',
  habits: '++id, lifeAreaId, name',
  habitCompletions: '++id, habitId, date, [habitId+date]',
  userData: '++id',
  aiConversations: '++id, createdAt',
});

export { db };
