'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, CheckSquare, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useHabits } from '@/hooks/useHabits';
import { useLifeAreas } from '@/hooks/useLifeAreas';
import { useUser } from '@/hooks/useUser';
import { HabitCard } from '@/components/habits/HabitCard';
import { HabitForm } from '@/components/habits/HabitForm';
import { LifeAreaDot } from '@/components/shared/LifeAreaBadge';
import type { Habit } from '@/lib/types';

export default function HabitsPage() {
  const { habits, addHabit, updateHabit, deleteHabit, isLoading } = useHabits();
  const { lifeAreas } = useLifeAreas();
  const { unlockAchievement } = useUser();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [filterLifeAreaId, setFilterLifeAreaId] = useState<string>('all');

  const handleAdd = async (habit: Omit<Habit, 'id' | 'createdAt'>) => {
    await addHabit(habit);
    setIsFormOpen(false);

    // Check for first habit achievement
    if (habits.length === 0) {
      await unlockAchievement('first-habit');
    }
    // Check for 5 habits achievement
    if (habits.length === 4) {
      await unlockAchievement('habits-5');
    }
  };

  const handleEdit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsFormOpen(true);
  };

  const handleUpdate = async (updates: Omit<Habit, 'id' | 'createdAt'>) => {
    if (editingHabit?.id) {
      await updateHabit(editingHabit.id, updates);
      setEditingHabit(null);
      setIsFormOpen(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteHabit(id);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingHabit(null);
  };

  const filteredHabits =
    filterLifeAreaId === 'all'
      ? habits
      : habits.filter((h) => h.lifeAreaId === filterLifeAreaId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded w-48 animate-pulse" />
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-muted rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckSquare className="h-6 w-6 text-emerald-400" />
          <h1 className="text-2xl font-bold">Habits</h1>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4 mr-1" />
          New Habit
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filterLifeAreaId} onValueChange={setFilterLifeAreaId}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Life Areas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Life Areas</SelectItem>
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
        <span className="text-sm text-muted-foreground">
          {filteredHabits.length} habit{filteredHabits.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Habits Grid */}
      {filteredHabits.length === 0 ? (
        <div className="text-center py-12">
          <CheckSquare className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No habits yet</h3>
          <p className="text-muted-foreground mb-4">
            Start building positive habits to track your progress
          </p>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Create Your First Habit
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          <AnimatePresence>
            {filteredHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onEdit={() => handleEdit(habit)}
                onDelete={() => handleDelete(habit.id!)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingHabit ? 'Edit Habit' : 'Create New Habit'}
            </DialogTitle>
          </DialogHeader>
          <HabitForm
            habit={editingHabit || undefined}
            onSubmit={editingHabit ? handleUpdate : handleAdd}
            onCancel={handleClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
