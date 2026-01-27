'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Plus, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGoals } from '@/hooks/useGoals';
import { useLifeAreas } from '@/hooks/useLifeAreas';
import { LifeAreaBadge, LifeAreaDot } from '@/components/shared/LifeAreaBadge';
import type { Goal } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function GoalsPage() {
  const { goals, addGoal, updateGoal, deleteGoal, isLoading } = useGoals();
  const { lifeAreas } = useLifeAreas();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({
    title: '',
    description: '',
    type: 'long-term',
    lifeAreaId: lifeAreas[0]?.id || 1,
    status: 'active',
  });

  const handleAdd = async () => {
    if (newGoal.title && newGoal.lifeAreaId && newGoal.type) {
      await addGoal({
        title: newGoal.title,
        description: newGoal.description || '',
        type: newGoal.type as Goal['type'],
        lifeAreaId: newGoal.lifeAreaId,
        status: 'active',
      });
      setNewGoal({
        title: '',
        description: '',
        type: 'long-term',
        lifeAreaId: lifeAreas[0]?.id || 1,
        status: 'active',
      });
      setIsFormOpen(false);
    }
  };

  const handleToggleComplete = async (goal: Goal) => {
    await updateGoal(goal.id!, {
      status: goal.status === 'active' ? 'completed' : 'active',
    });
  };

  const getGoalsByLifeArea = (lifeAreaId: number) => {
    return goals.filter((g) => g.lifeAreaId === lifeAreaId && g.status === 'active');
  };

  const activeGoals = goals.filter((g) => g.status === 'active');
  const completedGoals = goals.filter((g) => g.status === 'completed');

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded w-48 animate-pulse" />
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-muted rounded-xl animate-pulse" />
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
          <Target className="h-6 w-6 text-violet-400" />
          <h1 className="text-2xl font-bold">Goals</h1>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4 mr-1" />
          New Goal
        </Button>
      </div>

      {/* Goals by Life Area */}
      <Tabs defaultValue="by-area">
        <TabsList>
          <TabsTrigger value="by-area">By Life Area</TabsTrigger>
          <TabsTrigger value="all">All Goals ({activeGoals.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedGoals.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="by-area" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lifeAreas.map((area) => {
              const areaGoals = getGoalsByLifeArea(area.id!);
              return (
                <Card key={area.id} className="bg-card border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <LifeAreaBadge lifeArea={area} />
                      <span className="text-muted-foreground text-sm">
                        ({areaGoals.length})
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {areaGoals.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No goals yet
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {areaGoals.map((goal) => (
                          <GoalItem
                            key={goal.id}
                            goal={goal}
                            onToggle={() => handleToggleComplete(goal)}
                            onDelete={() => deleteGoal(goal.id!)}
                          />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="all" className="mt-6">
          {activeGoals.length === 0 ? (
            <div className="text-center py-12">
              <Target className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No goals yet</h3>
              <p className="text-muted-foreground mb-4">
                Set goals to stay focused on what matters most
              </p>
              <Button onClick={() => setIsFormOpen(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Create Your First Goal
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {activeGoals.map((goal) => {
                  const lifeArea = lifeAreas.find((a) => a.id === goal.lifeAreaId);
                  return (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border/50"
                    >
                      <button
                        onClick={() => handleToggleComplete(goal)}
                        className="mt-0.5"
                      >
                        <CheckCircle className="h-5 w-5 text-muted-foreground hover:text-emerald-400 transition-colors" />
                      </button>
                      <div className="flex-1">
                        <h3 className="font-medium">{goal.title}</h3>
                        {goal.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {goal.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          {lifeArea && <LifeAreaBadge lifeArea={lifeArea} size="sm" />}
                          <span className="text-xs text-muted-foreground capitalize">
                            {goal.type.replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => deleteGoal(goal.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {completedGoals.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No completed goals yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {completedGoals.map((goal) => {
                const lifeArea = lifeAreas.find((a) => a.id === goal.lifeAreaId);
                return (
                  <div
                    key={goal.id}
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 border border-border/50"
                  >
                    <button onClick={() => handleToggleComplete(goal)}>
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                    </button>
                    <div className="flex-1">
                      <h3 className="font-medium line-through text-muted-foreground">
                        {goal.title}
                      </h3>
                      {lifeArea && (
                        <LifeAreaBadge lifeArea={lifeArea} size="sm" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add Goal Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Goal</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={newGoal.title}
                onChange={(e) => setNewGoal((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="What do you want to achieve?"
              />
            </div>
            <div className="space-y-2">
              <Label>Description (optional)</Label>
              <Textarea
                value={newGoal.description}
                onChange={(e) =>
                  setNewGoal((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Add more details..."
              />
            </div>
            <div className="space-y-2">
              <Label>Goal Type</Label>
              <Select
                value={newGoal.type}
                onValueChange={(v) =>
                  setNewGoal((prev) => ({ ...prev, type: v as Goal['type'] }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="long-term">Long-term</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Life Area</Label>
              <Select
                value={newGoal.lifeAreaId?.toString()}
                onValueChange={(v) =>
                  setNewGoal((prev) => ({ ...prev, lifeAreaId: parseInt(v) }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
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
            <Button onClick={handleAdd} className="w-full">
              Create Goal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function GoalItem({
  goal,
  onToggle,
  onDelete,
}: {
  goal: Goal;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group flex items-start gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
    >
      <button onClick={onToggle} className="mt-0.5">
        <CheckCircle className="h-4 w-4 text-muted-foreground hover:text-emerald-400 transition-colors" />
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{goal.title}</p>
        <span className="text-xs text-muted-foreground capitalize">
          {goal.type.replace('-', ' ')}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
        onClick={onDelete}
      >
        <Trash2 className="h-3 w-3" />
      </Button>
    </motion.div>
  );
}
