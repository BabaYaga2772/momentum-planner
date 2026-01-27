export interface LifeArea {
  id?: number;
  name: string;
  color: string;
  icon: string;
  order: number;
  isDefault: boolean;
  createdAt: string;
}

export interface Goal {
  id?: number;
  title: string;
  description: string;
  lifeAreaId: number;
  type: 'long-term' | 'monthly' | 'weekly';
  targetDate?: string;
  status: 'active' | 'completed' | 'archived';
  createdAt: string;
}

export interface ScheduleBlock {
  time: string;
  content: string;
  lifeAreaId?: number;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  lifeAreaId?: number;
}

export interface DailyReview {
  accomplishments: string;
  lessons: string;
  gratitude: string;
}

export interface Mood {
  score: number;
  note: string;
}

export interface DailyPlan {
  id?: number;
  date: string;
  topPriorities: Task[];
  schedule: ScheduleBlock[];
  primaryTasks: Task[];
  secondaryTasks: Task[];
  notes: string;
  review: DailyReview;
  mood: Mood;
  createdAt: string;
}

export interface WeeklyReview {
  wins: string;
  challenges: string;
  lessons: string;
}

export interface LifeAreaGoal {
  id: string;
  text: string;
  completed: boolean;
}

export interface WeeklyPlan {
  id?: number;
  weekStart: string;
  lastWeekReview: WeeklyReview;
  topPriorities: Task[];
  weeklyPlan: Task[];
  notes: string;
  lifeAreaGoals: Record<number, LifeAreaGoal[]>;
  createdAt: string;
}

export interface MonthlyPlan {
  id?: number;
  month: number;
  year: number;
  goals: Task[];
  notes: string;
  createdAt: string;
}

export interface CalendarEvent {
  id?: number;
  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
  lifeAreaId?: number;
  notes: string;
}

export type HabitType = 'boolean' | 'quantity' | 'timed';

export type HabitScheduleType = 'daily' | 'specific-days' | 'times-per-week';

export interface HabitSchedule {
  type: HabitScheduleType;
  days?: number[];
  timesPerWeek?: number;
}

export interface Habit {
  id?: number;
  name: string;
  description: string;
  type: HabitType;
  target?: number;
  unit?: string;
  schedule: HabitSchedule;
  lifeAreaId: number;
  color: string;
  createdAt: string;
}

export interface HabitCompletion {
  id?: number;
  habitId: number;
  date: string;
  value: number;
  timestamp: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface UserData {
  id?: number;
  xp: number;
  level: number;
  achievements: string[];
  streakFreezes: number;
  settings: UserSettings;
  createdAt: string;
}

export interface UserSettings {
  theme: 'dark' | 'light';
  notifications: boolean;
  weekStartsOn: 0 | 1;
}

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface AIConversation {
  id?: number;
  messages: AIMessage[];
  createdAt: string;
}
