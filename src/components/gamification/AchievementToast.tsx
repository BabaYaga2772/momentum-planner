'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useUIStore } from '@/lib/store';
import { ACHIEVEMENTS } from '@/lib/defaults';

export function AchievementToast() {
  const { achievementUnlocked } = useUIStore();

  const achievement = achievementUnlocked
    ? ACHIEVEMENTS.find((a) => a.id === achievementUnlocked)
    : null;

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[100]"
        >
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 px-6 py-4 shadow-lg glow-primary">
            {/* Shine effect */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
            />

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-amber-400 uppercase tracking-wide">
                  Achievement Unlocked!
                </p>
                <p className="text-lg font-bold text-white">{achievement.name}</p>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
