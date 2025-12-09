// src/components/tournaments/StatTrends.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PerformanceChart } from '@/components/ui/performance-chart';

interface StatTrendsProps {
  trends: {
    [key: string]: Array<{ date: string; value: number }>;
  };
}

export const StatTrends: React.FC<StatTrendsProps> = ({
  trends = {
    'Points Per Game': [
      { date: 'Week 1', value: 15.2 },
      { date: 'Week 2', value: 16.8 },
      { date: 'Week 3', value: 18.5 },
      { date: 'Week 4', value: 17.3 },
      { date: 'Week 5', value: 19.1 },
    ],
    'Shooting %': [
      { date: 'Week 1', value: 42.5 },
      { date: 'Week 2', value: 45.2 },
      { date: 'Week 3', value: 48.1 },
      { date: 'Week 4', value: 46.8 },
      { date: 'Week 5', value: 49.3 },
    ],
    'Rebounds Per Game': [
      { date: 'Week 1', value: 6.2 },
      { date: 'Week 2', value: 7.1 },
      { date: 'Week 3', value: 7.8 },
      { date: 'Week 4', value: 7.5 },
      { date: 'Week 5', value: 8.2 },
    ],
  },
}) => {
  const [selectedStat, setSelectedStat] = useState<string>(Object.keys(trends)[0]);

  const currentTrend = trends[selectedStat] || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Stat Trends Over Time</CardTitle>
          <Select value={selectedStat} onValueChange={setSelectedStat}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(trends).map((stat) => (
                <SelectItem key={stat} value={stat}>
                  {stat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <PerformanceChart
          data={currentTrend.map(t => ({ name: t.date, value: t.value }))}
          type="line"
          height={300}
          showGrid={true}
        />
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-lk-background rounded">
            <div className="text-sm text-gray-600">Current</div>
            <div className="text-xl font-bold text-lk-primary">
              {currentTrend.length > 0 ? currentTrend[currentTrend.length - 1].value.toFixed(1) : '0'}
            </div>
          </div>
          <div className="text-center p-3 bg-lk-background rounded">
            <div className="text-sm text-gray-600">Average</div>
            <div className="text-xl font-bold text-lk-primary">
              {currentTrend.length > 0
                ? (currentTrend.reduce((sum, t) => sum + t.value, 0) / currentTrend.length).toFixed(1)
                : '0'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

