'use client';

import { Trophy, Flame, Star, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/hooks/useUser';
import { XPBar } from '@/components/gamification/XPBar';
import { AchievementCard } from '@/components/gamification/AchievementCard';
import { ACHIEVEMENTS } from '@/lib/defaults';

export default function AchievementsPage() {
  const { userData, xpProgress, unlockedAchievements, lockedAchievements, isLoading } =
    useUser();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded w-48 animate-pulse" />
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-muted rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Trophy className="h-6 w-6 text-amber-400" />
        <h1 className="text-2xl font-bold">Achievements</h1>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{xpProgress.level}</p>
                <p className="text-sm text-muted-foreground">Current Level</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <Flame className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{xpProgress.current.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total XP</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {unlockedAchievements.length}/{ACHIEVEMENTS.length}
                </p>
                <p className="text-sm text-muted-foreground">Achievements</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* XP Progress */}
      <Card className="bg-card border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Level Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <XPBar />
          <p className="text-sm text-muted-foreground mt-3">
            {(xpProgress.nextLevelXP - xpProgress.current).toLocaleString()} XP needed for
            Level {xpProgress.level + 1}
          </p>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-card border-border/50">
        <CardContent className="p-6">
          <Tabs defaultValue="unlocked">
            <TabsList className="mb-6">
              <TabsTrigger value="unlocked" className="gap-2">
                <Trophy className="h-4 w-4" />
                Unlocked ({unlockedAchievements.length})
              </TabsTrigger>
              <TabsTrigger value="locked" className="gap-2">
                <Lock className="h-4 w-4" />
                Locked ({lockedAchievements.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="unlocked">
              {unlockedAchievements.length === 0 ? (
                <div className="text-center py-8">
                  <Trophy className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">No achievements unlocked yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Complete habits and goals to earn achievements!
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {unlockedAchievements.map((achievement, index) => (
                    <AchievementCard
                      key={achievement.id}
                      achievement={achievement}
                      unlocked={true}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="locked">
              <div className="grid gap-4 md:grid-cols-2">
                {lockedAchievements.map((achievement, index) => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    unlocked={false}
                    index={index}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
