export interface LifeArea {
  id?: string;
  name: string;
  color: string;
  icon: string;
  order: number;
  isDefault: boolean;
  createdAt: string;
}

export interface Goal {
  id?: string;
  title: string;
  description: string;
  lifeAreaId: string;
  type: 'long-term' | 'monthly' | 'weekly';
  targetDate?: string;
  status: 'active' | 'completed' | 'archived';
  createdAt: string;
}

export interface ScheduleBlock {
  time: string;
  content: string;
  lifeAreaId?: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  lifeAreaId?: string;
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
  id?: string;
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
  id?: string;
  weekStart: string;
  lastWeekReview: WeeklyReview;
  topPriorities: Task[];
  weeklyPlan: Task[];
  notes: string;
  lifeAreaGoals: Record<string, LifeAreaGoal[]>;
  createdAt: string;
}

export interface MonthlyPlan {
  id?: string;
  month: number;
  year: number;
  goals: Task[];
  notes: string;
  createdAt: string;
}

export interface CalendarEvent {
  id?: string;
  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
  lifeAreaId?: string;
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
  id?: string;
  name: string;
  description: string;
  type: HabitType;
  target?: number;
  unit?: string;
  schedule: HabitSchedule;
  lifeAreaId: string;
  color: string;
  createdAt: string;
}

export interface HabitCompletion {
  id?: string;
  habitId: string;
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
  id?: string;
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
  id?: string;
  messages: AIMessage[];
  createdAt: string;
}
