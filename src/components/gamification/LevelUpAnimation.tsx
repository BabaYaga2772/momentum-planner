'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { useUIStore } from '@/lib/store';
import { useUser } from '@/hooks/useUser';

export function LevelUpAnimation() {
  const { levelUpAnimation } = useUIStore();
  const { xpProgress } = useUser();

  return (
    <AnimatePresence>
      {levelUpAnimation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="relative"
          >
            {/* Outer glow */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/50 to-cyan-500/50 blur-xl"
              style={{ width: 200, height: 200, margin: -25 }}
            />

            {/* Main badge */}
            <div className="relative w-[150px] h-[150px] rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
              <div className="w-[130px] h-[130px] rounded-full bg-background flex flex-col items-center justify-center">
                <Star className="h-10 w-10 text-amber-400 mb-1" />
                <span className="text-3xl font-bold gradient-text">{xpProgress.level}</span>
                <span className="text-sm text-muted-foreground">Level Up!</span>
              </div>
            </div>

            {/* Particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i * Math.PI * 2) / 8) * 100,
                  y: Math.sin((i * Math.PI * 2) / 8) * 100,
                }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-amber-400"
                style={{ marginLeft: -6, marginTop: -6 }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
