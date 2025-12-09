// src/components/tournaments/RealTimeGraph.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PerformanceChart } from '@/components/ui/performance-chart';
import { Radio } from 'lucide-react';

interface RealTimeGraphProps {
  metric: 'score' | 'points' | 'efficiency';
  initialData?: Array<{ name: string; value: number }>;
  updateInterval?: number;
}

export const RealTimeGraph: React.FC<RealTimeGraphProps> = ({
  metric = 'score',
  initialData = [],
  updateInterval = 3000,
}) => {
  const [data, setData] = useState(initialData);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev];
        if (newData.length > 0) {
          const lastValue = newData[newData.length - 1].value;
          const newValue = lastValue + (Math.random() > 0.5 ? 1 : 2);
          newData.push({
            name: `Q${Math.floor(newData.length / 4) + 1} ${(newData.length % 4) + 1}:00`,
            value: newValue,
          });
          // Keep only last 20 data points
          if (newData.length > 20) {
            newData.shift();
          }
        }
        return newData;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [isLive, updateInterval]);

  const getTitle = () => {
    switch (metric) {
      case 'score':
        return 'Score Progression';
      case 'points':
        return 'Points Per Quarter';
      case 'efficiency':
        return 'Team Efficiency';
      default:
        return 'Real-Time Graph';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {isLive && <Radio className="h-4 w-4 text-red-500 animate-pulse" />}
            {getTitle()}
          </CardTitle>
          <button
            onClick={() => setIsLive(!isLive)}
            className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            {isLive ? 'Pause' : 'Resume'}
          </button>
        </div>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <PerformanceChart
            data={data}
            type="line"
            height={300}
            showGrid={true}
          />
        ) : (
          <div className="h-[300px] flex items-center justify-center text-gray-400">
            No data available
          </div>
        )}
      </CardContent>
    </Card>
  );
};

