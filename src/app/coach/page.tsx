'use client';

import { MessageSquare, Bot, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ChatInterface } from '@/components/ai/ChatInterface';
import { useHabits } from '@/hooks/useHabits';
import { useGoals } from '@/hooks/useGoals';

export default function CoachPage() {
  const { habits } = useHabits();
  const { goals } = useGoals();

  const context = {
    habits: habits.map((h) => h.name),
    goals: goals.filter((g) => g.status === 'active').map((g) => g.title),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <MessageSquare className="h-6 w-6 text-violet-400" />
        <h1 className="text-2xl font-bold">AI Coach</h1>
      </div>

      {/* Coach Info */}
      <Card className="bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border-violet-500/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                Momentum Coach
                <Sparkles className="h-4 w-4 text-amber-400" />
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Your personal AI assistant for productivity, habit building, and goal
                achievement. Ask me anything about planning your day, staying motivated, or
                improving your habits.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <ChatInterface context={context} />

      {/* Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <h3 className="font-medium mb-1">Plan Your Day</h3>
          <p className="text-sm text-muted-foreground">
            Ask me to help you prioritize tasks and create an effective schedule.
          </p>
        </div>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <h3 className="font-medium mb-1">Build Habits</h3>
          <p className="text-sm text-muted-foreground">
            Get advice on starting new habits and maintaining existing ones.
          </p>
        </div>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <h3 className="font-medium mb-1">Stay Motivated</h3>
          <p className="text-sm text-muted-foreground">
            Talk through challenges and get encouragement to keep going.
          </p>
        </div>
      </div>
    </div>
  );
}
