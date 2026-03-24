'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Confetti } from '@/components/gamification/Confetti';
import { LevelUpAnimation } from '@/components/gamification/LevelUpAnimation';
import { AchievementToast } from '@/components/gamification/AchievementToast';
import { Toaster } from '@/components/ui/sonner';

// Routes that render without the app shell (no sidebar, no gamification overlays)
const BARE_ROUTES = ['/login'];

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isBareRoute = BARE_ROUTES.some((route) => pathname.startsWith(route));

  if (isBareRoute) {
    return (
      <div className="min-h-screen bg-background">
        {children}
        <Toaster richColors position="bottom-right" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-0 min-h-screen">
          <div className="p-4 lg:p-8 pt-16 lg:pt-6">
            {children}
          </div>
        </main>
      </div>
      <Confetti />
      <LevelUpAnimation />
      <AchievementToast />
      <Toaster richColors position="bottom-right" />
    </div>
  );
}
