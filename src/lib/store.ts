import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { format, startOfWeek } from 'date-fns';

interface AppState {
  currentDate: string;
  currentWeekStart: string;
  currentMonth: number;
  currentYear: number;
  sidebarOpen: boolean;
  selectedLifeAreaId: number | null;

  setCurrentDate: (date: string) => void;
  setCurrentWeekStart: (date: string) => void;
  setCurrentMonth: (month: number) => void;
  setCurrentYear: (year: number) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSelectedLifeAreaId: (id: number | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentDate: format(new Date(), 'yyyy-MM-dd'),
      currentWeekStart: format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd'),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      sidebarOpen: true,
      selectedLifeAreaId: null,

      setCurrentDate: (date) => set({ currentDate: date }),
      setCurrentWeekStart: (date) => set({ currentWeekStart: date }),
      setCurrentMonth: (month) => set({ currentMonth: month }),
      setCurrentYear: (year) => set({ currentYear: year }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setSelectedLifeAreaId: (id) => set({ selectedLifeAreaId: id }),
    }),
    {
      name: 'momentum-app-store',
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);

interface UIState {
  showConfetti: boolean;
  levelUpAnimation: boolean;
  achievementUnlocked: string | null;

  triggerConfetti: () => void;
  triggerLevelUp: () => void;
  showAchievement: (id: string) => void;
  clearAnimations: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  showConfetti: false,
  levelUpAnimation: false,
  achievementUnlocked: null,

  triggerConfetti: () => {
    set({ showConfetti: true });
    setTimeout(() => set({ showConfetti: false }), 3000);
  },
  triggerLevelUp: () => {
    set({ levelUpAnimation: true });
    setTimeout(() => set({ levelUpAnimation: false }), 3000);
  },
  showAchievement: (id) => {
    set({ achievementUnlocked: id });
    setTimeout(() => set({ achievementUnlocked: null }), 4000);
  },
  clearAnimations: () => set({
    showConfetti: false,
    levelUpAnimation: false,
    achievementUnlocked: null
  }),
}));
