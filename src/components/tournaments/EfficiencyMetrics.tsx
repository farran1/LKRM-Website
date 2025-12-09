// src/components/tournaments/EfficiencyMetrics.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface EfficiencyMetricsProps {
  playerName?: string;
  stats: {
    per?: number; // Player Efficiency Rating
    tsPercentage?: number; // True Shooting Percentage
    pace?: number;
    offensiveRating?: number;
    defensiveRating?: number;
  };
}

export const EfficiencyMetrics: React.FC<EfficiencyMetricsProps> = ({
  playerName = 'Player',
  stats = {
    per: 18.5,
    tsPercentage: 58.2,
    pace: 72.3,
    offensiveRating: 112.5,
    defensiveRating: 105.2,
  },
}) => {
  const metrics = [
    {
      label: 'PER (Player Efficiency Rating)',
      value: stats.per || 0,
      max: 30,
      description: 'Overall player performance metric. Higher is better.',
      color: 'bg-lk-accent',
    },
    {
      label: 'TS% (True Shooting %)',
      value: stats.tsPercentage || 0,
      max: 100,
      description: 'Shooting efficiency accounting for 2PT, 3PT, and FT.',
      color: 'bg-blue-500',
    },
    {
      label: 'Pace',
      value: stats.pace || 0,
      max: 100,
      description: 'Possessions per 48 minutes. Higher = faster tempo.',
      color: 'bg-purple-500',
    },
    {
      label: 'Offensive Rating',
      value: stats.offensiveRating || 0,
      max: 150,
      description: 'Points produced per 100 possessions.',
      color: 'bg-green-500',
    },
    {
      label: 'Defensive Rating',
      value: stats.defensiveRating || 0,
      max: 150,
      description: 'Points allowed per 100 possessions. Lower is better.',
      color: 'bg-red-500',
      inverse: true,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Efficiency Metrics - {playerName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((metric, idx) => {
          const percentage = (metric.value / metric.max) * 100;
          const displayValue = metric.inverse ? metric.max - metric.value : metric.value;

          return (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700">{metric.label}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">{metric.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="text-lg font-bold text-lk-primary">{displayValue.toFixed(1)}</span>
              </div>
              <Progress value={percentage} className="h-2" />
              <div className="text-xs text-gray-500">
                {metric.inverse ? 'Lower is better' : 'Higher is better'}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

