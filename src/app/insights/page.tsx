'use client';

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Smile, CheckSquare, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import { MoodChart } from '@/components/charts/MoodChart';
import { HabitChart } from '@/components/charts/HabitChart';
import { useHabits } from '@/hooks/useHabits';

export default function InsightsPage() {
  const { habits } = useHabits();
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);

  // Get last 14 days of mood data
  const moodData = useLiveQuery(async () => {
    const today = new Date();
    const twoWeeksAgo = subDays(today, 13);
    const dates = eachDayOfInterval({ start: twoWeeksAgo, end: today });

    const dailyPlans = await db.dailyPlans.toArray();
    const planMap = new Map(dailyPlans.map((p) => [p.date, p.mood.score]));

    return dates.map((date) => {
      const dateStr = format(date, 'yyyy-MM-dd');
      return {
        date: dateStr,
        score: planMap.get(dateStr) || 0,
      };
    }).filter((d) => d.score > 0);
  }, []);

  // Get last 7 days of habit completion data
  const habitData = useLiveQuery(async () => {
    const today = new Date();
    const weekAgo = subDays(today, 6);
    const dates = eachDayOfInterval({ start: weekAgo, end: today });

    const completions = await db.habitCompletions.toArray();
    const completionsByDate = new Map<string, number>();

    completions.forEach((c) => {
      const count = completionsByDate.get(c.date) || 0;
      completionsByDate.set(c.date, count + 1);
    });

    const allHabits = await db.habits.toArray();
    const totalHabits = allHabits.length;

    return dates.map((date) => {
      const dateStr = format(date, 'yyyy-MM-dd');
      return {
        date: dateStr,
        completed: completionsByDate.get(dateStr) || 0,
        total: totalHabits,
      };
    });
  }, []);

  // Calculate stats
  const stats = useLiveQuery(async () => {
    const completions = await db.habitCompletions.toArray();
    const today = format(new Date(), 'yyyy-MM-dd');
    const todayCompletions = completions.filter((c) => c.date === today).length;

    const weekAgo = format(subDays(new Date(), 7), 'yyyy-MM-dd');
    const weekCompletions = completions.filter((c) => c.date >= weekAgo).length;

    const dailyPlans = await db.dailyPlans.toArray();
    const moodsThisWeek = dailyPlans
      .filter((p) => p.date >= weekAgo && p.mood.score > 0)
      .map((p) => p.mood.score);

    const avgMood =
      moodsThisWeek.length > 0
        ? (moodsThisWeek.reduce((a, b) => a + b, 0) / moodsThisWeek.length).toFixed(1)
        : 'N/A';

    return {
      todayCompletions,
      weekCompletions,
      avgMood,
    };
  }, []);

  const generateInsight = async () => {
    setIsLoadingInsight(true);
    try {
      const response = await fetch('/api/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'weekly-insights',
          data: {
            habitsCompleted: stats?.weekCompletions || 0,
            totalHabits: (habitData?.length || 0) * habits.length,
            streaks: habits.map((h) => h.name),
            moodScores: moodData?.map((m) => m.score) || [],
          },
        }),
      });

      const data = await response.json();
      if (data.insight) {
        setAiInsight(data.insight);
      }
    } catch (error) {
      console.error('Failed to generate insight:', error);
      setAiInsight('Unable to generate insights. Make sure your ANTHROPIC_API_KEY is configured.');
    } finally {
      setIsLoadingInsight(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-cyan-400" />
          <h1 className="text-2xl font-bold">Insights</h1>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckSquare className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.todayCompletions || 0}</p>
                <p className="text-sm text-muted-foreground">Habits today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-violet-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.weekCompletions || 0}</p>
                <p className="text-sm text-muted-foreground">This week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Smile className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.avgMood || 'N/A'}</p>
                <p className="text-sm text-muted-foreground">Avg mood</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Smile className="h-4 w-4 text-violet-400" />
              Mood Trend (14 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {moodData && moodData.length > 0 ? (
              <MoodChart data={moodData} />
            ) : (
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                <p>Log your mood in daily reviews to see trends</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <CheckSquare className="h-4 w-4 text-emerald-400" />
              Habit Completion (7 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {habitData && habits.length > 0 ? (
              <HabitChart data={habitData} />
            ) : (
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                <p>Create habits to see completion data</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border-violet-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-amber-400" />
              AI Weekly Insights
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={generateInsight}
              disabled={isLoadingInsight}
            >
              {isLoadingInsight ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Generate
                </>
              )}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {aiInsight ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{aiInsight}</p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Click "Generate" to get AI-powered insights about your habits, mood patterns,
              and productivity trends.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
