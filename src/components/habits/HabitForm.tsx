'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
import { Checkbox } from '@/components/ui/checkbox';
import { useLifeAreas } from '@/hooks/useLifeAreas';
import { LifeAreaDot } from '@/components/shared/LifeAreaBadge';
import type { Habit, HabitType, HabitSchedule } from '@/lib/types';

interface HabitFormProps {
  habit?: Habit;
  onSubmit: (habit: Omit<Habit, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function HabitForm({ habit, onSubmit, onCancel }: HabitFormProps) {
  const { lifeAreas } = useLifeAreas();

  const [name, setName] = useState(habit?.name || '');
  const [description, setDescription] = useState(habit?.description || '');
  const [type, setType] = useState<HabitType>(habit?.type || 'boolean');
  const [target, setTarget] = useState(habit?.target?.toString() || '');
  const [unit, setUnit] = useState(habit?.unit || '');
  const [scheduleType, setScheduleType] = useState<HabitSchedule['type']>(
    habit?.schedule.type || 'daily'
  );
  const [selectedDays, setSelectedDays] = useState<number[]>(
    habit?.schedule.days || [1, 2, 3, 4, 5]
  );
  const [timesPerWeek, setTimesPerWeek] = useState(
    habit?.schedule.timesPerWeek?.toString() || '3'
  );
  const [lifeAreaId, setLifeAreaId] = useState<string>(
    habit?.lifeAreaId || lifeAreas[0]?.id || '1'
  );
  const [color, setColor] = useState(habit?.color || 'violet');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const schedule: HabitSchedule = { type: scheduleType };
    if (scheduleType === 'specific-days') {
      schedule.days = selectedDays;
    } else if (scheduleType === 'times-per-week') {
      schedule.timesPerWeek = parseInt(timesPerWeek);
    }

    onSubmit({
      name,
      description,
      type,
      target: type === 'quantity' ? parseInt(target) : undefined,
      unit: type === 'quantity' ? unit : undefined,
      schedule,
      lifeAreaId,
      color,
    });
  };

  const toggleDay = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Exercise, Read, Meditate..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Description (optional)</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What does this habit involve?"
          className="resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label>Habit Type</Label>
        <Select value={type} onValueChange={(v) => setType(v as HabitType)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="boolean">Yes/No (Simple checkoff)</SelectItem>
            <SelectItem value="quantity">Quantity (Track amounts)</SelectItem>
            <SelectItem value="timed">Timed (Duration based)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {type === 'quantity' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Target</Label>
            <Input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="10"
            />
          </div>
          <div className="space-y-2">
            <Label>Unit</Label>
            <Input
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="pages, glasses, minutes..."
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label>Schedule</Label>
        <Select
          value={scheduleType}
          onValueChange={(v) => setScheduleType(v as HabitSchedule['type'])}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Every day</SelectItem>
            <SelectItem value="specific-days">Specific days</SelectItem>
            <SelectItem value="times-per-week">X times per week</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {scheduleType === 'specific-days' && (
        <div className="space-y-2">
          <Label>Select Days</Label>
          <div className="flex flex-wrap gap-2">
            {DAY_NAMES.map((day, index) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(index)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedDays.includes(index)
                    ? 'bg-violet-500 text-white'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}

      {scheduleType === 'times-per-week' && (
        <div className="space-y-2">
          <Label>Times per week</Label>
          <Input
            type="number"
            min="1"
            max="7"
            value={timesPerWeek}
            onChange={(e) => setTimesPerWeek(e.target.value)}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Life Area</Label>
        <Select
          value={lifeAreaId.toString()}
          onValueChange={(v) => setLifeAreaId(v)}
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

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          {habit ? 'Save Changes' : 'Create Habit'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
