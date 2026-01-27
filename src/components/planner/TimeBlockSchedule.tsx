'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { ScheduleBlock } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TimeBlockScheduleProps {
  schedule: ScheduleBlock[];
  onUpdate: (schedule: ScheduleBlock[]) => void;
}

export function TimeBlockSchedule({ schedule, onUpdate }: TimeBlockScheduleProps) {
  const [focusedTime, setFocusedTime] = useState<string | null>(null);

  const handleContentChange = (time: string, content: string) => {
    const updated = schedule.map((block) =>
      block.time === time ? { ...block, content } : block
    );
    onUpdate(updated);
  };

  const formatTime = (time: string) => {
    const [hours] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour} ${ampm}`;
  };

  const isCurrentHour = (time: string) => {
    const now = new Date();
    const currentHour = now.getHours();
    const [hours] = time.split(':');
    return parseInt(hours) === currentHour;
  };

  return (
    <div className="space-y-1">
      {schedule.map((block, index) => {
        const isCurrent = isCurrentHour(block.time);
        const hasContent = block.content.trim() !== '';

        return (
          <motion.div
            key={block.time}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
            className={cn(
              'group flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-200',
              focusedTime === block.time && 'bg-muted/80',
              isCurrent && 'bg-violet-500/10 border border-violet-500/30',
              !focusedTime && !isCurrent && hasContent && 'bg-muted/30'
            )}
          >
            <div className={cn(
              'flex items-center gap-2 w-16 text-xs font-medium',
              isCurrent ? 'text-violet-400' : 'text-muted-foreground'
            )}>
              <Clock className={cn(
                'h-3 w-3',
                isCurrent ? 'text-violet-400' : 'text-muted-foreground/50'
              )} />
              {formatTime(block.time)}
            </div>
            <Input
              value={block.content}
              onChange={(e) => handleContentChange(block.time, e.target.value)}
              onFocus={() => setFocusedTime(block.time)}
              onBlur={() => setFocusedTime(null)}
              placeholder="Schedule..."
              className="flex-1 border-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:text-muted-foreground/30"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
