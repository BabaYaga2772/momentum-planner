import Dexie, { type EntityTable } from 'dexie';
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

const db = new Dexie('MomentumDB') as Dexie & {
  lifeAreas: EntityTable<LifeArea, 'id'>;
  goals: EntityTable<Goal, 'id'>;
  dailyPlans: EntityTable<DailyPlan, 'id'>;
  weeklyPlans: EntityTable<WeeklyPlan, 'id'>;
  monthlyPlans: EntityTable<MonthlyPlan, 'id'>;
  events: EntityTable<CalendarEvent, 'id'>;
  habits: EntityTable<Habit, 'id'>;
  habitCompletions: EntityTable<HabitCompletion, 'id'>;
  userData: EntityTable<UserData, 'id'>;
  aiConversations: EntityTable<AIConversation, 'id'>;
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
