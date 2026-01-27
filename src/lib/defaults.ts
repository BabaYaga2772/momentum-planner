import type { LifeArea, Achievement, UserSettings } from './types';

export const DEFAULT_LIFE_AREAS: Omit<LifeArea, 'id' | 'createdAt'>[] = [
  { name: 'Physical', color: 'emerald', icon: 'Dumbbell', order: 0, isDefault: true },
  { name: 'Personal', color: 'violet', icon: 'User', order: 1, isDefault: true },
  { name: 'Family', color: 'rose', icon: 'Heart', order: 2, isDefault: true },
  { name: 'Work', color: 'blue', icon: 'Briefcase', order: 3, isDefault: true },
  { name: 'Social', color: 'amber', icon: 'Users', order: 4, isDefault: true },
  { name: 'Others', color: 'slate', icon: 'MoreHorizontal', order: 5, isDefault: true },
];

export const LIFE_AREA_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  violet: { bg: 'bg-violet-500/20', text: 'text-violet-400', border: 'border-violet-500/30' },
  rose: { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/30' },
  blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
  amber: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
  slate: { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/30' },
  cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  pink: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/30' },
  orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
  teal: { bg: 'bg-teal-500/20', text: 'text-teal-400', border: 'border-teal-500/30' },
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-habit', name: 'First Steps', description: 'Create your first habit', icon: 'Footprints' },
  { id: 'streak-3', name: 'Getting Started', description: 'Reach a 3-day streak', icon: 'Flame' },
  { id: 'streak-7', name: 'Week Warrior', description: 'Reach a 7-day streak', icon: 'Flame' },
  { id: 'streak-30', name: 'Monthly Master', description: 'Reach a 30-day streak', icon: 'Flame' },
  { id: 'streak-100', name: 'Century Club', description: 'Reach a 100-day streak', icon: 'Trophy' },
  { id: 'first-review', name: 'Reflector', description: 'Complete your first daily review', icon: 'BookOpen' },
  { id: 'week-planner', name: 'Week Planner', description: 'Complete a weekly plan', icon: 'Calendar' },
  { id: 'level-5', name: 'Rising Star', description: 'Reach level 5', icon: 'Star' },
  { id: 'level-10', name: 'Achiever', description: 'Reach level 10', icon: 'Award' },
  { id: 'level-25', name: 'Expert', description: 'Reach level 25', icon: 'Medal' },
  { id: 'habits-5', name: 'Habit Builder', description: 'Create 5 habits', icon: 'Layers' },
  { id: 'perfect-day', name: 'Perfect Day', description: 'Complete all habits in a day', icon: 'CheckCircle' },
  { id: 'perfect-week', name: 'Perfect Week', description: 'Complete all habits for 7 days straight', icon: 'Crown' },
  { id: 'early-bird', name: 'Early Bird', description: 'Complete a habit before 7 AM', icon: 'Sunrise' },
  { id: 'night-owl', name: 'Night Owl', description: 'Complete a habit after 10 PM', icon: 'Moon' },
  { id: 'mood-tracker', name: 'Mood Master', description: 'Log your mood for 7 days', icon: 'Heart' },
  { id: 'ai-chat', name: 'AI Coach', description: 'Have your first AI coaching session', icon: 'Bot' },
  { id: 'goal-setter', name: 'Goal Setter', description: 'Set 10 goals', icon: 'Target' },
  { id: 'xp-1000', name: 'XP Hunter', description: 'Earn 1,000 XP', icon: 'Zap' },
  { id: 'xp-10000', name: 'XP Legend', description: 'Earn 10,000 XP', icon: 'Zap' },
];

export const XP_VALUES = {
  habitComplete: 10,
  dailyReview: 25,
  weeklyPlan: 50,
  goalComplete: 30,
  streakBonus: (streak: number) => Math.min(streak * 2, 50),
  perfectDay: 100,
};

export const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 3800,
  4700, 5700, 6800, 8000, 9300, 10700, 12200, 13800, 15500, 17300,
  19200, 21200, 23300, 25500, 27800, 30200, 32700, 35300, 38000, 40800,
];

export function getLevelFromXP(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      return i + 1;
    }
  }
  return 1;
}

export function getXPForNextLevel(level: number): number {
  if (level >= LEVEL_THRESHOLDS.length) {
    return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + (level - LEVEL_THRESHOLDS.length + 1) * 3000;
  }
  return LEVEL_THRESHOLDS[level];
}

export const DEFAULT_USER_SETTINGS: UserSettings = {
  theme: 'dark',
  notifications: true,
  weekStartsOn: 1,
};

export const MOOD_EMOJIS = ['😢', '😔', '😐', '🙂', '😄'];
export const MOOD_LABELS = ['Awful', 'Bad', 'Okay', 'Good', 'Great'];

export const SCHEDULE_HOURS = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00',
];
