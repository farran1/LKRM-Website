// src/components/tournaments/PerformanceDashboard.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PerformanceChart } from '@/components/ui/performance-chart';
import { AnimatedCounter } from '@/components/ui/animated-counter';

interface PerformanceDashboardProps {
  teamStats?: {
    wins: number;
    losses: number;
    pointsPerGame: number;
    reboundsPerGame: number;
  };
  playerLeaders?: Array<{
    name: string;
    stat: number;
    statType: string;
  }>;
  gameTrends?: Array<{
    date: string;
    points: number;
    opponent: string;
  }>;
}

export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  teamStats = { wins: 24, losses: 8, pointsPerGame: 78.5, reboundsPerGame: 42.3 },
  playerLeaders = [
    { name: 'Jordan Smith', stat: 18.5, statType: 'PPG' },
    { name: 'Marcus Johnson', stat: 8.2, statType: 'APG' },
    { name: 'Chris Williams', stat: 7.8, statType: 'RPG' },
  ],
  gameTrends = [
    { date: 'Game 1', points: 72, opponent: 'Hawks' },
    { date: 'Game 2', points: 85, opponent: 'Lions' },
    { date: 'Game 3', points: 78, opponent: 'Tigers' },
    { date: 'Game 4', points: 91, opponent: 'Wolves' },
    { date: 'Game 5', points: 82, opponent: 'Bears' },
  ],
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Team Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-lk-background rounded-lg">
              <div className="text-sm text-gray-600 mb-2">Wins</div>
              <div className="text-3xl font-bold text-lk-primary">
                <AnimatedCounter value={teamStats.wins} />
              </div>
            </div>
            <div className="text-center p-4 bg-lk-background rounded-lg">
              <div className="text-sm text-gray-600 mb-2">Losses</div>
              <div className="text-3xl font-bold text-lk-primary">
                <AnimatedCounter value={teamStats.losses} />
              </div>
            </div>
            <div className="text-center p-4 bg-lk-background rounded-lg">
              <div className="text-sm text-gray-600 mb-2">PPG</div>
              <div className="text-3xl font-bold text-lk-primary">
                <AnimatedCounter value={teamStats.pointsPerGame} decimals={1} />
              </div>
            </div>
            <div className="text-center p-4 bg-lk-background rounded-lg">
              <div className="text-sm text-gray-600 mb-2">RPG</div>
              <div className="text-3xl font-bold text-lk-primary">
                <AnimatedCounter value={teamStats.reboundsPerGame} decimals={1} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trends">Game Trends</TabsTrigger>
          <TabsTrigger value="leaders">Player Leaders</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
        </TabsList>
        <TabsContent value="trends" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Points Per Game Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceChart
                data={gameTrends.map(g => ({ name: g.date, value: g.points }))}
                type="line"
                height={300}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="leaders" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {playerLeaders.map((leader, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-lk-primary">{leader.name}</div>
                      <div className="text-sm text-gray-600">{leader.statType}</div>
                    </div>
                    <div className="text-2xl font-bold text-lk-accent">
                      <AnimatedCounter value={leader.stat} decimals={1} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="efficiency" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Shooting Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceChart
                data={[
                  { name: 'FG%', value: 48.2 },
                  { name: '3PT%', value: 36.8 },
                  { name: 'FT%', value: 72.4 },
                ]}
                type="bar"
                height={300}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

