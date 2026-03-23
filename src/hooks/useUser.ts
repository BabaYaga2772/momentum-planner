'use client';

import { useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, toKey } from '@/lib/db';
import type { UserData, UserSettings } from '@/lib/types';
import { DEFAULT_USER_SETTINGS, getLevelFromXP, getXPForNextLevel, ACHIEVEMENTS, XP_VALUES } from '@/lib/defaults';
import { useUIStore } from '@/lib/store';

function createDefaultUser(): Omit<UserData, 'id'> {
  return {
    xp: 0,
    level: 1,
    achievements: [],
    streakFreezes: 3,
    settings: DEFAULT_USER_SETTINGS,
    createdAt: new Date().toISOString(),
  };
}

export function useUser() {
  const { triggerConfetti, triggerLevelUp, showAchievement } = useUIStore();

  const userData = useLiveQuery(() => db.userData.toCollection().first(), []);

  // Initialize user data if it doesn't exist
  useEffect(() => {
    const initUser = async () => {
      const existingUser = await db.userData.toCollection().first();
      if (!existingUser) {
        const newUser = createDefaultUser();
        await db.userData.add(newUser);
      }
    };
    initUser();
  }, []);

  const addXP = async (amount: number) => {
    if (!userData?.id) return;

    const newXP = userData.xp + amount;
    const newLevel = getLevelFromXP(newXP);
    const leveledUp = newLevel > userData.level;

    await db.userData.update(toKey(userData.id), { xp: newXP, level: newLevel });

    if (leveledUp) {
      triggerLevelUp();
      triggerConfetti();

      if (newLevel === 5) await unlockAchievement('level-5');
      if (newLevel === 10) await unlockAchievement('level-10');
      if (newLevel === 25) await unlockAchievement('level-25');
    }

    if (newXP >= 1000 && userData.xp < 1000) {
      await unlockAchievement('xp-1000');
    }
    if (newXP >= 10000 && userData.xp < 10000) {
      await unlockAchievement('xp-10000');
    }
  };

  const unlockAchievement = async (achievementId: string) => {
    if (!userData?.id) return;
    if (userData.achievements.includes(achievementId)) return;

    const newAchievements = [...userData.achievements, achievementId];
    await db.userData.update(toKey(userData.id), { achievements: newAchievements });
    showAchievement(achievementId);
    triggerConfetti();
  };

  const updateSettings = async (settings: Partial<UserSettings>) => {
    if (!userData?.id) return;
    await db.userData.update(toKey(userData.id), {
      settings: { ...userData.settings, ...settings },
    });
  };

  const useStreakFreeze = async (): Promise<boolean> => {
    if (!userData?.id || userData.streakFreezes <= 0) return false;
    await db.userData.update(toKey(userData.id), {
      streakFreezes: userData.streakFreezes - 1,
    });
    return true;
  };

  const addStreakFreeze = async (count: number = 1) => {
    if (!userData?.id) return;
    await db.userData.update(toKey(userData.id), {
      streakFreezes: userData.streakFreezes + count,
    });
  };

  const xpProgress = userData
    ? {
        current: userData.xp,
        level: userData.level,
        nextLevelXP: getXPForNextLevel(userData.level),
        prevLevelXP: getXPForNextLevel(userData.level - 1),
        progress:
          ((userData.xp - getXPForNextLevel(userData.level - 1)) /
            (getXPForNextLevel(userData.level) - getXPForNextLevel(userData.level - 1))) *
          100,
      }
    : { current: 0, level: 1, nextLevelXP: 100, prevLevelXP: 0, progress: 0 };

  const unlockedAchievements = userData
    ? ACHIEVEMENTS.filter((a) => userData.achievements.includes(a.id))
    : [];

  const lockedAchievements = userData
    ? ACHIEVEMENTS.filter((a) => !userData.achievements.includes(a.id))
    : ACHIEVEMENTS;

  return {
    userData,
    addXP,
    unlockAchievement,
    updateSettings,
    useStreakFreeze,
    addStreakFreeze,
    xpProgress,
    unlockedAchievements,
    lockedAchievements,
    xpValues: XP_VALUES,
    isLoading: userData === undefined,
  };
}
