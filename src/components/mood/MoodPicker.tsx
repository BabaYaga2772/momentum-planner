'use client';

import { motion } from 'framer-motion';
import { MOOD_EMOJIS, MOOD_LABELS } from '@/lib/defaults';
import { Input } from '@/components/ui/input';
import type { Mood } from '@/lib/types';
import { cn } from '@/lib/utils';

interface MoodPickerProps {
  mood: Mood;
  onUpdate: (mood: Mood) => void;
  showNote?: boolean;
}

export function MoodPicker({ mood, onUpdate, showNote = true }: MoodPickerProps) {
  const handleScoreChange = (score: number) => {
    onUpdate({ ...mood, score });
  };

  const handleNoteChange = (note: string) => {
    onUpdate({ ...mood, note });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        {MOOD_EMOJIS.map((emoji, index) => {
          const score = index + 1;
          const isSelected = mood.score === score;

          return (
            <motion.button
              key={score}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScoreChange(score)}
              className={cn(
                'flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200',
                isSelected
                  ? 'bg-violet-500/20 ring-2 ring-violet-500/50'
                  : 'hover:bg-muted/50'
              )}
            >
              <span className={cn(
                'text-2xl transition-transform duration-200',
                isSelected && 'scale-110'
              )}>
                {emoji}
              </span>
              <span className={cn(
                'text-xs',
                isSelected ? 'text-violet-400 font-medium' : 'text-muted-foreground'
              )}>
                {MOOD_LABELS[index]}
              </span>
            </motion.button>
          );
        })}
      </div>

      {showNote && mood.score > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Input
            value={mood.note}
            onChange={(e) => handleNoteChange(e.target.value)}
            placeholder="Add a note about your mood..."
            className="bg-muted/50 border-border/50"
          />
        </motion.div>
      )}
    </div>
  );
}
