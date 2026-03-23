'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Palette,
  Plus,
  Trash2,
  GripVertical,
  Save,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useLifeAreas } from '@/hooks/useLifeAreas';
import { useUser } from '@/hooks/useUser';
import { LIFE_AREA_COLORS } from '@/lib/defaults';
import { LifeAreaDot } from '@/components/shared/LifeAreaBadge';
import type { LifeArea } from '@/lib/types';
import { cn } from '@/lib/utils';

const colorOptions = Object.keys(LIFE_AREA_COLORS);

export default function SettingsPage() {
  const { lifeAreas, addLifeArea, updateLifeArea, deleteLifeArea } = useLifeAreas();
  const { userData, updateSettings } = useUser();

  const [isAddingArea, setIsAddingArea] = useState(false);
  const [newAreaName, setNewAreaName] = useState('');
  const [newAreaColor, setNewAreaColor] = useState('violet');
  const [editingArea, setEditingArea] = useState<LifeArea | null>(null);

  const handleAddArea = async () => {
    if (newAreaName.trim()) {
      await addLifeArea({
        name: newAreaName.trim(),
        color: newAreaColor,
        icon: 'Circle',
        order: lifeAreas.length,
        isDefault: false,
      });
      setNewAreaName('');
      setNewAreaColor('violet');
      setIsAddingArea(false);
    }
  };

  const handleUpdateArea = async () => {
    if (editingArea && editingArea.id) {
      await updateLifeArea(editingArea.id, {
        name: editingArea.name,
        color: editingArea.color,
      });
      setEditingArea(null);
    }
  };

  const handleDeleteArea = async (id: string) => {
    if (confirm('Are you sure you want to delete this life area?')) {
      await deleteLifeArea(id);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Settings className="h-6 w-6 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {/* Life Areas */}
      <Card className="bg-card border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-base">
              <Palette className="h-4 w-4 text-violet-400" />
              Life Areas
            </span>
            <Button size="sm" onClick={() => setIsAddingArea(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <AnimatePresence>
              {lifeAreas.map((area) => (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="group flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground/30 cursor-grab" />
                  <LifeAreaDot color={area.color} className="w-3 h-3" />
                  <span className="flex-1 font-medium">{area.name}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setEditingArea(area)}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    {!area.isDefault && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleDeleteArea(area.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* App Preferences */}
      <Card className="bg-card border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Week starts on</Label>
            <Select
              value={userData?.settings.weekStartsOn.toString() || '1'}
              onValueChange={(v) =>
                updateSettings({ weekStartsOn: parseInt(v) as 0 | 1 })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Monday</SelectItem>
                <SelectItem value="0">Sunday</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="bg-card border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            All your data is stored locally in your browser using IndexedDB. No data is
            sent to any server (except when using AI features).
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Export Data (Coming Soon)
            </Button>
            <Button variant="outline" size="sm" disabled>
              Import Data (Coming Soon)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Life Area Dialog */}
      <Dialog open={isAddingArea} onOpenChange={setIsAddingArea}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Life Area</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={newAreaName}
                onChange={(e) => setNewAreaName(e.target.value)}
                placeholder="e.g., Hobbies, Finance..."
              />
            </div>
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    onClick={() => setNewAreaColor(color)}
                    className={cn(
                      'w-8 h-8 rounded-full transition-all',
                      `bg-${color}-500`,
                      newAreaColor === color && 'ring-2 ring-offset-2 ring-offset-background ring-white'
                    )}
                  >
                    <span className="sr-only">{color}</span>
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={handleAddArea} className="w-full">
              <Plus className="h-4 w-4 mr-1" />
              Add Life Area
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Life Area Dialog */}
      <Dialog open={!!editingArea} onOpenChange={() => setEditingArea(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Life Area</DialogTitle>
          </DialogHeader>
          {editingArea && (
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={editingArea.name}
                  onChange={(e) =>
                    setEditingArea({ ...editingArea, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Color</Label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setEditingArea({ ...editingArea, color })}
                      className={cn(
                        'w-8 h-8 rounded-full transition-all',
                        `bg-${color}-500`,
                        editingArea.color === color && 'ring-2 ring-offset-2 ring-offset-background ring-white'
                      )}
                    >
                      <span className="sr-only">{color}</span>
                    </button>
                  ))}
                </div>
              </div>
              <Button onClick={handleUpdateArea} className="w-full">
                <Save className="h-4 w-4 mr-1" />
                Save Changes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
