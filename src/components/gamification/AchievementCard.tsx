'use client';

import { motion } from 'framer-motion';
import {
  Trophy, Flame, Star, Award, Medal, BookOpen, Calendar, Layers,
  CheckCircle, Crown, Sunrise, Moon, Heart, Bot, Target, Zap, Footprints, Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Achievement } from '@/lib/types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Trophy, Flame, Star, Award, Medal, BookOpen, Calendar, Layers,
  CheckCircle, Crown, Sunrise, Moon, Heart, Bot, Target, Zap, Footprints, Check
};

interface AchievementCardProps {
  achievement: Achievement;
  unlocked: boolean;
  index?: number;
}

export function AchievementCard({ achievement, unlocked, index = 0 }: AchievementCardProps) {
  const Icon = iconMap[achievement.icon] || Trophy;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        'relative p-4 rounded-xl border transition-all duration-300',
        unlocked
          ? 'bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/30'
          : 'bg-muted/30 border-border/50 grayscale'
      )}
    >
      {unlocked && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/5 to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      <div className="relative flex items-start gap-4">
        <div
          className={cn(
            'w-12 h-12 rounded-full flex items-center justify-center',
            unlocked
              ? 'bg-gradient-to-br from-amber-400 to-amber-600'
              : 'bg-muted'
          )}
        >
          <Icon
            className={cn(
              'h-6 w-6',
              unlocked ? 'text-white' : 'text-muted-foreground'
            )}
          />
        </div>

        <div className="flex-1">
          <h3
            className={cn(
              'font-semibold',
              unlocked ? 'text-amber-400' : 'text-muted-foreground'
            )}
          >
            {achievement.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            {achievement.description}
          </p>
          {unlocked && achievement.unlockedAt && (
            <p className="text-xs text-muted-foreground mt-2">
              Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
            </p>
          )}
        </div>

        {unlocked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
          >
            <Check className="h-4 w-4 text-white" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
