'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isToday,
} from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, FileText, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppStore } from '@/lib/store';
import { useEvents, useMonthlyPlan } from '@/hooks/useEvents';
import { useLifeAreas } from '@/hooks/useLifeAreas';
import { LifeAreaDot, LifeAreaBadge } from '@/components/shared/LifeAreaBadge';
import { TaskList } from './TaskList';
import { NotesEditor } from './NotesEditor';
import { cn, createEmptyTask } from '@/lib/utils';
import type { CalendarEvent } from '@/lib/types';

export function MonthlyCalendar() {
  const { currentMonth, currentYear, setCurrentMonth, setCurrentYear } = useAppStore();
  const { events, addEvent, deleteEvent } = useEvents(currentMonth, currentYear);
  const { monthlyPlan, updateMonthlyPlan } = useMonthlyPlan(currentMonth, currentYear);
  const { lifeAreas, getLifeAreaById } = useLifeAreas();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    lifeAreaId: undefined,
    notes: '',
  });

  const currentDate = new Date(currentYear, currentMonth);
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const handlePreviousMonth = () => {
    const prev = subMonths(currentDate, 1);
    setCurrentMonth(prev.getMonth());
    setCurrentYear(prev.getFullYear());
  };

  const handleNextMonth = () => {
    const next = addMonths(currentDate, 1);
    setCurrentMonth(next.getMonth());
    setCurrentYear(next.getFullYear());
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setNewEvent((prev) => ({ ...prev, date: format(day, 'yyyy-MM-dd') }));
  };

  const handleAddEvent = async () => {
    if (newEvent.title && newEvent.date) {
      await addEvent({
        title: newEvent.title,
        date: newEvent.date,
        startTime: newEvent.startTime || undefined,
        endTime: newEvent.endTime || undefined,
        lifeAreaId: newEvent.lifeAreaId,
        notes: newEvent.notes || '',
      });
      setNewEvent({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        lifeAreaId: undefined,
        notes: '',
      });
      setIsEventDialogOpen(false);
    }
  };

  const getEventsForDay = (day: Date) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    return events.filter((e) => e.date === dateStr);
  };

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handlePreviousMonth}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold min-w-[180px] text-center">
            {format(currentDate, 'MMMM yyyy')}
          </h1>
          <Button variant="ghost" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleToday} className="ml-2">
            Today
          </Button>
        </div>

        <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={newEvent.title}
                  onChange={(e) => setNewEvent((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Event title..."
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent((prev) => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Time</Label>
                  <Input
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent((prev) => ({ ...prev, startTime: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Time</Label>
                  <Input
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent((prev) => ({ ...prev, endTime: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Life Area</Label>
                <Select
                  value={newEvent.lifeAreaId?.toString()}
                  onValueChange={(value) =>
                    setNewEvent((prev) => ({ ...prev, lifeAreaId: parseInt(value) }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select life area..." />
                  </SelectTrigger>
                  <SelectContent>
                    {lifeAreas.map((area) => (
                      <SelectItem key={area.id} value={area.id!.toString()}>
                        <div className="flex items-center gap-2">
                          <LifeAreaDot color={area.color} />
                          {area.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  value={newEvent.notes}
                  onChange={(e) => setNewEvent((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Add notes..."
                />
              </div>
              <Button onClick={handleAddEvent} className="w-full">
                Add Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-3">
          <Card className="bg-card border-border/50">
            <CardContent className="p-4">
              {/* Week Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-muted-foreground py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day) => {
                  const dayEvents = getEventsForDay(day);
                  const isCurrentMonth = isSameMonth(day, currentDate);
                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                  const isTodayDate = isToday(day);

                  return (
                    <motion.button
                      key={day.toISOString()}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleDayClick(day)}
                      className={cn(
                        'min-h-[80px] p-2 rounded-lg border transition-all duration-200 text-left',
                        isCurrentMonth
                          ? 'bg-muted/30 border-border/50 hover:border-violet-500/50'
                          : 'bg-muted/10 border-transparent text-muted-foreground/50',
                        isSelected && 'ring-2 ring-violet-500 border-violet-500',
                        isTodayDate && 'border-violet-500/50 bg-violet-500/10'
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={cn(
                            'text-sm font-medium',
                            isTodayDate &&
                              'bg-violet-500 text-white rounded-full w-6 h-6 flex items-center justify-center'
                          )}
                        >
                          {format(day, 'd')}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 3).map((event) => {
                          const lifeArea = event.lifeAreaId
                            ? getLifeAreaById(event.lifeAreaId)
                            : null;
                          return (
                            <div
                              key={event.id}
                              className={cn(
                                'text-xs truncate px-1.5 py-0.5 rounded',
                                lifeArea
                                  ? `bg-${lifeArea.color}-500/20 text-${lifeArea.color}-400`
                                  : 'bg-muted text-muted-foreground'
                              )}
                            >
                              {event.title}
                            </div>
                          );
                        })}
                        {dayEvents.length > 3 && (
                          <div className="text-xs text-muted-foreground">
                            +{dayEvents.length - 3} more
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Month Goals & Notes */}
        <div className="space-y-6">
          {/* Month Goals */}
          <Card className="bg-card border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="h-4 w-4 text-violet-400" />
                Month Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              {monthlyPlan && (
                <TaskList
                  tasks={monthlyPlan.goals.length > 0 ? monthlyPlan.goals : [createEmptyTask()]}
                  onUpdate={(goals) => updateMonthlyPlan({ goals })}
                  placeholder="Add monthly goal..."
                />
              )}
            </CardContent>
          </Card>

          {/* Month Notes */}
          <Card className="bg-card border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-orange-400" />
                Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {monthlyPlan && (
                <NotesEditor
                  content={monthlyPlan.notes}
                  onChange={(notes) => updateMonthlyPlan({ notes })}
                  placeholder="Monthly notes..."
                />
              )}
            </CardContent>
          </Card>

          {/* Selected Day Events */}
          {selectedDate && (
            <Card className="bg-card border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  {format(selectedDate, 'EEEE, MMM d')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {getEventsForDay(selectedDate).length > 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-2"
                    >
                      {getEventsForDay(selectedDate).map((event) => {
                        const lifeArea = event.lifeAreaId
                          ? getLifeAreaById(event.lifeAreaId)
                          : null;
                        return (
                          <div
                            key={event.id}
                            className="p-3 rounded-lg bg-muted/50 border border-border/50"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium text-sm">{event.title}</p>
                                {event.startTime && (
                                  <p className="text-xs text-muted-foreground">
                                    {event.startTime}
                                    {event.endTime && ` - ${event.endTime}`}
                                  </p>
                                )}
                              </div>
                              {lifeArea && <LifeAreaBadge lifeArea={lifeArea} size="sm" />}
                            </div>
                            {event.notes && (
                              <p className="text-xs text-muted-foreground mt-2">
                                {event.notes}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </motion.div>
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-muted-foreground text-center py-4"
                    >
                      No events for this day
                    </motion.p>
                  )}
                </AnimatePresence>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3"
                  onClick={() => {
                    setNewEvent((prev) => ({
                      ...prev,
                      date: format(selectedDate, 'yyyy-MM-dd'),
                    }));
                    setIsEventDialogOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Event
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
