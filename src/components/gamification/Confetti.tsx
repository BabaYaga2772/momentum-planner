'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useUIStore } from '@/lib/store';

export function Confetti() {
  const { showConfetti } = useUIStore();

  useEffect(() => {
    if (showConfetti) {
      const duration = 2000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'],
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [showConfetti]);

  return null;
}
