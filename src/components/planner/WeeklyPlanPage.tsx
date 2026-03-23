'use client';

import { format, addWeeks, subWeeks, parseISO, startOfWeek } from 'date-fns';
import { Calendar, Target, ListTodo, FileText, Trophy, AlertCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/lib/store';
import { useWeeklyPlan } from '@/hooks/useWeeklyPlan';
import { useLifeAreas } from '@/hooks/useLifeAreas';
import { DateNavigation } from '@/components/shared/DateNavigation';
import { PriorityList } from './PriorityList';
import { TaskList } from './TaskList';
import { NotesEditor } from './NotesEditor';
import { LifeAreaBadge } from '@/components/shared/LifeAreaBadge';
import { getWeekDays, createEmptyLifeAreaGoal } from '@/lib/utils';
import type { WeeklyReview, LifeAreaGoal } from '@/lib/types';

export function WeeklyPlanPage() {
  const { currentWeekStart, setCurrentWeekStart } = useAppStore();
  const {
    weeklyPlan,
    updateLastWeekReview,
    updateTopPriorities,
    updateWeeklyPlanItems,
    updateNotes,
    updateLifeAreaGoals,
    isLoading,
  } = useWeeklyPlan(currentWeekStart);
  const { lifeAreas } = useLifeAreas();

  const handlePrevious = () => {
    const newWeekStart = format(subWeeks(parseISO(currentWeekStart), 1), 'yyyy-MM-dd');
    setCurrentWeekStart(newWeekStart);
  };

  const handleNext = () => {
    const newWeekStart = format(addWeeks(parseISO(currentWeekStart), 1), 'yyyy-MM-dd');
    setCurrentWeekStart(newWeekStart);
  };

  const handleToday = () => {
    const today = new Date();
    const monday = startOfWeek(today, { weekStartsOn: 1 });
    setCurrentWeekStart(format(monday, 'yyyy-MM-dd'));
  };

  const weekDays = getWeekDays(currentWeekStart);
  const weekEndDate = format(weekDays[weekDays.length - 1], 'MMM d');
  const weekStartFormatted = format(parseISO(currentWeekStart), 'MMM d');

  const handleReviewChange = (field: keyof WeeklyReview, value: string) => {
    if (weeklyPlan) {
      updateLastWeekReview({ ...weeklyPlan.lastWeekReview, [field]: value });
    }
  };

  const handleLifeAreaGoalAdd = (lifeAreaId: string) => {
    if (weeklyPlan) {
      const currentGoals = weeklyPlan.lifeAreaGoals[lifeAreaId] || [];
      updateLifeAreaGoals(lifeAreaId, [...currentGoals, createEmptyLifeAreaGoal()]);
    }
  };

  const handleLifeAreaGoalUpdate = (lifeAreaId: string, goals: LifeAreaGoal[]) => {
    updateLifeAreaGoals(lifeAreaId, goals);
  };

  if (isLoading || !weeklyPlan) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-muted rounded w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-muted rounded-lg" />
          <div className="h-64 bg-muted rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <DateNavigation
        currentDate={currentWeekStart}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToday={handleToday}
        formatStr={`'Week of' MMM d`}
      />

      {/* Week Overview Mini Calendar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {weekDays.map((day) => (
          <div
            key={day.toISOString()}
            className="flex flex-col items-center px-4 py-2 rounded-lg bg-muted/30 border border-border/50 min-w-[60px]"
          >
            <span className="text-xs text-muted-foreground">{format(day, 'EEE')}</span>
            <span className="text-lg font-semibold">{format(day, 'd')}</span>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Review & Priorities */}
        <div className="space-y-6">
          {/* Last Week Review */}
          <Card className="bg-card border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4 text-violet-400" />
                Last Week Review
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm">
                  <Trophy className="h-4 w-4 text-amber-400" />
                  Wins & Accomplishments
                </Label>
                <Textarea
                  value={weeklyPlan.lastWeekReview.wins}
                  onChange={(e) => handleReviewChange('wins', e.target.value)}
                  placeholder="What went well last week?"
                  className="min-h-[80px] resize-none bg-muted/50 border-border/50"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-rose-400" />
                  Challenges
                </Label>
                <Textarea
                  value={weeklyPlan.lastWeekReview.challenges}
                  onChange={(e) => handleReviewChange('challenges', e.target.value)}
                  placeholder="What challenges did you face?"
                  className="min-h-[80px] resize-none bg-muted/50 border-border/50"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm">
                  <Lightbulb className="h-4 w-4 text-cyan-400" />
                  Lessons Learned
                </Label>
                <Textarea
                  value={weeklyPlan.lastWeekReview.lessons}
                  onChange={(e) => handleReviewChange('lessons', e.target.value)}
                  placeholder="What did you learn?"
                  className="min-h-[80px] resize-none bg-muted/50 border-border/50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Top Priorities */}
          <Card className="bg-card border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="h-4 w-4 text-amber-400" />
                Top Priority for the Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PriorityList
                priorities={weeklyPlan.topPriorities}
                onUpdate={updateTopPriorities}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Weekly Plan & Notes */}
        <div className="space-y-6">
          {/* Weekly Plan */}
          <Card className="bg-card border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <ListTodo className="h-4 w-4 text-blue-400" />
                Weekly Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TaskList
                tasks={weeklyPlan.weeklyPlan}
                onUpdate={updateWeeklyPlanItems}
                placeholder="Add action item..."
              />
            </CardContent>
          </Card>

          {/* Notes */}
          <Card className="bg-card border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-orange-400" />
                Notes & Ideas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <NotesEditor
                content={weeklyPlan.notes}
                onChange={updateNotes}
                placeholder="Capture weekly thoughts..."
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Life Area Goals Grid */}
      <Card className="bg-card border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="h-4 w-4 text-emerald-400" />
            Goals by Life Area
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lifeAreas.map((area) => (
              <div key={area.id} className="p-4 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <LifeAreaBadge lifeArea={area} />
                </div>
                <TaskList
                  tasks={(weeklyPlan.lifeAreaGoals[area.id!] || []).map(g => ({
                    id: g.id,
                    text: g.text,
                    completed: g.completed,
                  }))}
                  onUpdate={(tasks) => handleLifeAreaGoalUpdate(area.id!, tasks.map(t => ({
                    id: t.id,
                    text: t.text,
                    completed: t.completed,
                  })))}
                  placeholder={`Add ${area.name.toLowerCase()} goal...`}
                  showAddButton={true}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
