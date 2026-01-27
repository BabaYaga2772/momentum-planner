'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import type { Task } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PriorityListProps {
  priorities: Task[];
  onUpdate: (priorities: Task[]) => void;
  maxItems?: number;
}

export function PriorityList({ priorities, onUpdate, maxItems = 3 }: PriorityListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleToggle = (id: string) => {
    const updated = priorities.map((p) =>
      p.id === id ? { ...p, completed: !p.completed } : p
    );
    onUpdate(updated);
  };

  const handleTextChange = (id: string, text: string) => {
    const updated = priorities.map((p) =>
      p.id === id ? { ...p, text } : p
    );
    onUpdate(updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' && index < priorities.length - 1) {
      e.preventDefault();
      setEditingId(priorities[index + 1].id);
    }
  };

  useEffect(() => {
    if (editingId && inputRefs.current[editingId]) {
      inputRefs.current[editingId]?.focus();
    }
  }, [editingId]);

  return (
    <div className="space-y-2">
      {priorities.slice(0, maxItems).map((priority, index) => (
        <motion.div
          key={priority.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="group flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50 hover:border-violet-500/30 transition-colors"
        >
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold">
            {index + 1}
          </div>
          <Checkbox
            checked={priority.completed}
            onCheckedChange={() => handleToggle(priority.id)}
            className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
          />
          <Input
            ref={(el) => { inputRefs.current[priority.id] = el; }}
            value={priority.text}
            onChange={(e) => handleTextChange(priority.id, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={() => setEditingId(priority.id)}
            placeholder={`Priority ${index + 1}...`}
            className={cn(
              'flex-1 border-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm',
              priority.completed && 'line-through text-muted-foreground'
            )}
          />
          {index === 0 && (
            <Star className="h-4 w-4 text-amber-400" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
