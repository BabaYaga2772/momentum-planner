'use client';

import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sparkles, BookOpen, Heart } from 'lucide-react';
import type { DailyReview } from '@/lib/types';

interface ReviewSectionProps {
  review: DailyReview;
  onUpdate: (review: DailyReview) => void;
}

export function ReviewSection({ review, onUpdate }: ReviewSectionProps) {
  const handleChange = (field: keyof DailyReview, value: string) => {
    onUpdate({ ...review, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <Sparkles className="h-4 w-4 text-amber-400" />
          Accomplishments
        </Label>
        <Textarea
          value={review.accomplishments}
          onChange={(e) => handleChange('accomplishments', e.target.value)}
          placeholder="What did you accomplish today?"
          className="min-h-[80px] resize-none bg-muted/50 border-border/50 focus:border-violet-500/50"
        />
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <BookOpen className="h-4 w-4 text-cyan-400" />
          Lessons Learned
        </Label>
        <Textarea
          value={review.lessons}
          onChange={(e) => handleChange('lessons', e.target.value)}
          placeholder="What did you learn today?"
          className="min-h-[80px] resize-none bg-muted/50 border-border/50 focus:border-violet-500/50"
        />
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <Heart className="h-4 w-4 text-rose-400" />
          Gratitude
        </Label>
        <Textarea
          value={review.gratitude}
          onChange={(e) => handleChange('gratitude', e.target.value)}
          placeholder="What are you grateful for today?"
          className="min-h-[80px] resize-none bg-muted/50 border-border/50 focus:border-violet-500/50"
        />
      </div>
    </div>
  );
}
