'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, GripVertical, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Task } from '@/lib/types';
import { createEmptyTask, cn } from '@/lib/utils';

interface TaskListProps {
  tasks: Task[];
  onUpdate: (tasks: Task[]) => void;
  placeholder?: string;
  showAddButton?: boolean;
  className?: string;
}

export function TaskList({
  tasks,
  onUpdate,
  placeholder = 'Add a task...',
  showAddButton = true,
  className,
}: TaskListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleToggle = (id: string) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    onUpdate(updated);
  };

  const handleTextChange = (id: string, text: string) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, text } : task
    );
    onUpdate(updated);
  };

  const handleAdd = () => {
    const newTask = createEmptyTask();
    onUpdate([...tasks, newTask]);
    setEditingId(newTask.id);
  };

  const handleRemove = (id: string) => {
    if (tasks.length > 1) {
      onUpdate(tasks.filter((task) => task.id !== id));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTask = createEmptyTask();
      const updated = [...tasks];
      updated.splice(index + 1, 0, newTask);
      onUpdate(updated);
      setEditingId(newTask.id);
    } else if (e.key === 'Backspace' && tasks[index].text === '' && tasks.length > 1) {
      e.preventDefault();
      handleRemove(id);
      if (index > 0) {
        const prevTask = tasks[index - 1];
        setEditingId(prevTask.id);
      }
    }
  };

  useEffect(() => {
    if (editingId && inputRefs.current[editingId]) {
      inputRefs.current[editingId]?.focus();
    }
  }, [editingId, tasks]);

  return (
    <div className={cn('space-y-1', className)}>
      <AnimatePresence initial={false}>
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="group flex items-center gap-2"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground/30 opacity-0 group-hover:opacity-100 cursor-grab" />
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => handleToggle(task.id)}
              className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
            />
            <Input
              ref={(el) => { inputRefs.current[task.id] = el; }}
              value={task.text}
              onChange={(e) => handleTextChange(task.id, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, task.id, index)}
              onFocus={() => setEditingId(task.id)}
              placeholder={placeholder}
              className={cn(
                'flex-1 border-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                task.completed && 'line-through text-muted-foreground'
              )}
            />
            {tasks.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover:opacity-100"
                onClick={() => handleRemove(task.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {showAddButton && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAdd}
          className="text-muted-foreground hover:text-foreground"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add task
        </Button>
      )}
    </div>
  );
}
