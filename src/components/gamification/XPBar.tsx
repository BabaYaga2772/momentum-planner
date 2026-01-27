'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import { Progress } from '@/components/ui/progress';

export function XPBar() {
  const { xpProgress, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="p-3 rounded-lg bg-muted/50 animate-pulse">
        <div className="h-4 bg-muted rounded w-24 mb-2" />
        <div className="h-2 bg-muted rounded" />
      </div>
    );
  }

  return (
    <div className="p-3 rounded-lg bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
            <span className="text-xs font-bold text-white">{xpProgress.level}</span>
          </div>
          <span className="text-sm font-medium">Level {xpProgress.level}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Zap className="h-3 w-3 text-amber-400" />
          <span>{xpProgress.current.toLocaleString()} XP</span>
        </div>
      </div>
      <div className="relative">
        <Progress value={xpProgress.progress} className="h-2" />
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-500/20"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
        <span>{xpProgress.prevLevelXP.toLocaleString()}</span>
        <span>{xpProgress.nextLevelXP.toLocaleString()}</span>
      </div>
    </div>
  );
}
