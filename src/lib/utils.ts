import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addDays, subDays, isToday } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date, formatStr: string = 'MMM d, yyyy'): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, formatStr);
}

export function getWeekDays(weekStart: string): Date[] {
  const start = parseISO(weekStart);
  const end = endOfWeek(start, { weekStartsOn: 1 });
  return eachDayOfInterval({ start, end });
}

export function getMonday(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(startOfWeek(d, { weekStartsOn: 1 }), 'yyyy-MM-dd');
}

export function isSameDateStr(date1: string, date2: string): boolean {
  return isSameDay(parseISO(date1), parseISO(date2));
}

export function addDaysToDate(date: string, days: number): string {
  return format(addDays(parseISO(date), days), 'yyyy-MM-dd');
}

export function subDaysFromDate(date: string, days: number): string {
  return format(subDays(parseISO(date), days), 'yyyy-MM-dd');
}

export function isTodayStr(date: string): boolean {
  return isToday(parseISO(date));
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function createEmptyTask(text: string = ''): { id: string; text: string; completed: boolean; lifeAreaId?: string } {
  return { id: generateId(), text, completed: false };
}

export function createEmptyLifeAreaGoal(text: string = ''): { id: string; text: string; completed: boolean } {
  return { id: generateId(), text, completed: false };
}
