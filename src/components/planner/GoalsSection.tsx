'use client';

import { motion } from 'framer-motion';
import { Target, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useGoals } from '@/hooks/useGoals';
import { useLifeAreas } from '@/hooks/useLifeAreas';
import { LifeAreaBadge } from '@/components/shared/LifeAreaBadge';

export function GoalsSection() {
  const { goals } = useGoals();
  const { getLifeAreaById } = useLifeAreas();

  const longTermGoals = goals.filter((g) => g.type === 'long-term' && g.status === 'active');

  if (longTermGoals.length === 0) {
    return (
      <div className="text-center py-6">
        <Target className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
        <p className="text-sm text-muted-foreground mb-3">No goals set yet</p>
        <Link href="/goals">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Goals
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {longTermGoals.slice(0, 5).map((goal, index) => {
        const lifeArea = getLifeAreaById(goal.lifeAreaId);
        return (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Target className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{goal.title}</p>
              {lifeArea && (
                <LifeAreaBadge lifeArea={lifeArea} size="sm" />
              )}
            </div>
          </motion.div>
        );
      })}
      {longTermGoals.length > 5 && (
        <Link href="/goals" className="block">
          <Button variant="ghost" size="sm" className="w-full text-muted-foreground">
            View all {longTermGoals.length} goals
          </Button>
        </Link>
      )}
    </div>
  );
}
