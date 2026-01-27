'use client';

import { format, addDays, subDays } from 'date-fns';
import { Target, ListTodo, Clock, FileText, CheckCircle, Smile } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppStore } from '@/lib/store';
import { useDailyPlan } from '@/hooks/useDailyPlan';
import { DateNavigation } from '@/components/shared/DateNavigation';
import { GoalsSection } from './GoalsSection';
import { PriorityList } from './PriorityList';
import { TimeBlockSchedule } from './TimeBlockSchedule';
import { TaskList } from './TaskList';
import { NotesEditor } from './NotesEditor';
import { ReviewSection } from './ReviewSection';
import { MoodPicker } from '@/components/mood/MoodPicker';
import { HabitsDailySection } from '@/components/habits/HabitsDailySection';

export function DailyPlanPage() {
  const { currentDate, setCurrentDate } = useAppStore();
  const {
    dailyPlan,
    updateTopPriorities,
    updateSchedule,
    updatePrimaryTasks,
    updateSecondaryTasks,
    updateNotes,
    updateReview,
    updateMood,
    isLoading,
  } = useDailyPlan(currentDate);

  const handlePrevious = () => {
    const newDate = format(subDays(new Date(currentDate), 1), 'yyyy-MM-dd');
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = format(addDays(new Date(currentDate), 1), 'yyyy-MM-dd');
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(format(new Date(), 'yyyy-MM-dd'));
  };

  if (isLoading || !dailyPlan) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-muted rounded w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-64 bg-muted rounded-lg" />
          <div className="lg:col-span-2 h-64 bg-muted rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <DateNavigation
        currentDate={currentDate}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToday={handleToday}
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Goals & Priorities */}
        <div className="space-y-6">
          {/* Goals */}
          <Card className="bg-card border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="h-4 w-4 text-violet-400" />
                My Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GoalsSection />
            </CardContent>
          </Card>

          {/* Top Priorities */}
          <Card className="bg-card border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <ListTodo className="h-4 w-4 text-amber-400" />
                Top Priority for Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PriorityList
                priorities={dailyPlan.topPriorities}
                onUpdate={updateTopPriorities}
              />
            </CardContent>
          </Card>

          {/* Habits */}
          <Card className="bg-card border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                Daily Habits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <HabitsDailySection date={currentDate} />
            </CardContent>
          </Card>
        </div>

        {/* Center Column - Schedule */}
        <Card className="bg-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4 text-cyan-400" />
              Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="max-h-[600px] overflow-y-auto">
            <TimeBlockSchedule
              schedule={dailyPlan.schedule}
              onUpdate={updateSchedule}
            />
          </CardContent>
        </Card>

        {/* Right Column - Tasks, Notes, Review */}
        <div className="space-y-6">
          {/* Tasks */}
          <Card className="bg-card border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <ListTodo className="h-4 w-4 text-blue-400" />
                Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="primary" className="w-full">
                <TabsList className="w-full grid grid-cols-2 mb-3">
                  <TabsTrigger value="primary">Primary</TabsTrigger>
                  <TabsTrigger value="secondary">Secondary</TabsTrigger>
                </TabsList>
                <TabsContent value="primary">
                  <TaskList
                    tasks={dailyPlan.primaryTasks}
                    onUpdate={updatePrimaryTasks}
                    placeholder="Add primary task..."
                  />
                </TabsContent>
                <TabsContent value="secondary">
                  <TaskList
                    tasks={dailyPlan.secondaryTasks}
                    onUpdate={updateSecondaryTasks}
                    placeholder="Add secondary task..."
                  />
                </TabsContent>
              </Tabs>
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
                content={dailyPlan.notes}
                onChange={updateNotes}
                placeholder="Capture your thoughts..."
              />
            </CardContent>
          </Card>

          {/* Day Review */}
          <Card className="bg-card border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Smile className="h-4 w-4 text-rose-400" />
                Day Review
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">How are you feeling?</p>
                <MoodPicker mood={dailyPlan.mood} onUpdate={updateMood} />
              </div>
              <ReviewSection review={dailyPlan.review} onUpdate={updateReview} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
