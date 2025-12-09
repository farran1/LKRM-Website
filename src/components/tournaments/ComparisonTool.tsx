// src/components/tournaments/ComparisonTool.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ComparisonStats {
  name: string;
  points: number;
  rebounds: number;
  assists: number;
  fgPercentage: number;
  threePtPercentage: number;
  ftPercentage: number;
}

interface ComparisonToolProps {
  players: ComparisonStats[];
  teams?: ComparisonStats[];
}

export const ComparisonTool: React.FC<ComparisonToolProps> = ({ players, teams }) => {
  const [selected1, setSelected1] = useState<string>(players[0]?.name || '');
  const [selected2, setSelected2] = useState<string>(players[1]?.name || '');

  const entity1 = [...players, ...(teams || [])].find(p => p.name === selected1);
  const entity2 = [...players, ...(teams || [])].find(p => p.name === selected2);

  const compareStat = (stat1: number, stat2: number, label: string) => {
    const diff = stat1 - stat2;
    const percentage = stat2 > 0 ? ((diff / stat2) * 100).toFixed(1) : '0';
    const isBetter = diff > 0;

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{label}</span>
          <span className={`font-semibold ${isBetter ? 'text-green-600' : 'text-red-600'}`}>
            {isBetter ? '+' : ''}{diff.toFixed(1)} ({isBetter ? '+' : ''}{percentage}%)
          </span>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <div className="text-xs text-gray-500 mb-1">{entity1?.name}</div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${isBetter ? 'bg-lk-accent' : 'bg-gray-400'}`}
                initial={{ width: 0 }}
                animate={{ width: `${(stat1 / Math.max(stat1, stat2)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-sm font-bold text-lk-primary mt-1">{stat1.toFixed(1)}</div>
          </div>
          <div className="flex-1">
            <div className="text-xs text-gray-500 mb-1">{entity2?.name}</div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${!isBetter ? 'bg-lk-accent' : 'bg-gray-400'}`}
                initial={{ width: 0 }}
                animate={{ width: `${(stat2 / Math.max(stat1, stat2)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-sm font-bold text-lk-primary mt-1">{stat2.toFixed(1)}</div>
          </div>
        </div>
      </div>
    );
  };

  if (!entity1 || !entity2) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compare Players/Teams</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Selection */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Select First</label>
            <Select value={selected1} onValueChange={setSelected1}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[...players, ...(teams || [])].map((entity) => (
                  <SelectItem key={entity.name} value={entity.name}>
                    {entity.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Select Second</label>
            <Select value={selected2} onValueChange={setSelected2}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[...players, ...(teams || [])].map((entity) => (
                  <SelectItem key={entity.name} value={entity.name}>
                    {entity.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Comparison Stats */}
        <div className="space-y-4 pt-4 border-t">
          {compareStat(entity1.points, entity2.points, 'Points Per Game')}
          {compareStat(entity1.rebounds, entity2.rebounds, 'Rebounds Per Game')}
          {compareStat(entity1.assists, entity2.assists, 'Assists Per Game')}
          {compareStat(entity1.fgPercentage, entity2.fgPercentage, 'Field Goal %')}
          {compareStat(entity1.threePtPercentage, entity2.threePtPercentage, 'Three Point %')}
          {compareStat(entity1.ftPercentage, entity2.ftPercentage, 'Free Throw %')}
        </div>
      </CardContent>
    </Card>
  );
};

