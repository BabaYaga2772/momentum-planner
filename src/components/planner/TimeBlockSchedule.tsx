'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
    return `${displayHour}${ampm}`;
  };

  const isCurrentHour = (time: string) => {
    const [hours] = time.split(':');
    return parseInt(hours) === new Date().getHours();
  };

  const isPastHour = (time: string) => {
    const [hours] = time.split(':');
    return parseInt(hours) < new Date().getHours();
  };

  return (
    <div className="relative">
      {/* Vertical timeline spine */}
      <div
        className="absolute top-0 bottom-0 w-px"
        style={{ left: '52px', background: 'rgba(255,255,255,0.05)' }}
      />
      <div className="space-y-0">
        {schedule.map((block, index) => {
          const isCurrent = isCurrentHour(block.time);
          const isPast = isPastHour(block.time);
          const hasContent = block.content.trim() !== '';
          const isFocused = focusedTime === block.time;

          return (
            <motion.div
              key={block.time}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.015 }}
              className={cn(
                'group relative flex items-center transition-all duration-150',
                isCurrent && 'bg-[#00d4ff]/5',
                isFocused && !isCurrent && 'bg-white/[0.02]'
              )}
            >
              {/* Time label */}
              <div
                className={cn(
                  'w-12 shrink-0 text-right pr-3 text-[10px] font-mono py-2.5 select-none',
                  isCurrent ? 'text-[#00d4ff]' : isPast ? 'text-[#333]' : 'text-[#444]'
                )}
              >
                {formatTime(block.time)}
              </div>

              {/* Timeline node */}
              <div className="relative z-10 shrink-0 flex items-center justify-center w-3 mx-1">
                {isCurrent ? (
                  <motion.div
                    className="w-2 h-2"
                    style={{
                      background: '#00d4ff',
                      boxShadow: '0 0 6px #00d4ff, 0 0 12px rgba(0,212,255,0.5)',
                    }}
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                ) : hasContent ? (
                  <div
                    className="w-1.5 h-1.5"
                    style={{ background: isPast ? '#2a2a2a' : '#3a3a3a' }}
                  />
                ) : (
                  <div className="w-1 h-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
                )}
              </div>

              {/* Input */}
              <div className="flex-1 pl-2">
                <Input
                  value={block.content}
                  onChange={(e) => handleContentChange(block.time, e.target.value)}
                  onFocus={() => setFocusedTime(block.time)}
                  onBlur={() => setFocusedTime(null)}
                  placeholder={isCurrent ? 'Now...' : 'Block...'}
                  className={cn(
                    'border-0 bg-transparent px-0 py-2.5 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm font-mono',
                    isCurrent
                      ? 'text-white placeholder:text-[#00d4ff]/30'
                      : isPast
                      ? 'text-[#3a3a3a] placeholder:text-[#222]'
                      : 'text-[#777] placeholder:text-[#2a2a2a]',
                    hasContent && !isPast && 'text-[#bbb]'
                  )}
                />
              </div>

              {/* Current hour right-edge accent */}
              {isCurrent && (
                <div
                  className="absolute right-0 top-0 bottom-0 w-px"
                  style={{ background: 'linear-gradient(to bottom, transparent, #00d4ff40, transparent)' }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
