// src/components/tournaments/PlayerCard3D.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface PlayerCard3DProps {
  name: string;
  number: number;
  position: string;
  stats: {
    points: number;
    rebounds: number;
    assists: number;
  };
  photo?: string;
  achievements?: string[];
}

export const PlayerCard3D: React.FC<PlayerCard3DProps> = ({
  name,
  number,
  position,
  stats,
  photo,
  achievements = [],
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000" style={{ perspective: '1000px' }}>
      <motion.div
        className="relative w-full h-64 cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
        onHoverStart={() => setIsFlipped(true)}
        onHoverEnd={() => setIsFlipped(false)}
      >
        {/* Front Side */}
        <Card
          className="absolute inset-0 backface-hidden border-2 border-lk-accent"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <CardContent className="p-6 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-lk-primary to-lk-accent flex items-center justify-center text-white text-2xl font-bold">
                #{number}
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">{position}</div>
                <div className="text-lg font-bold text-lk-primary">{name}</div>
              </div>
            </div>
            {photo ? (
              <img
                src={photo}
                alt={name}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
            ) : (
              <div className="w-full h-32 bg-gradient-to-br from-lk-primary/20 to-lk-accent/20 rounded-lg mb-4 flex items-center justify-center">
                <Target className="h-12 w-12 text-lk-accent opacity-50" />
              </div>
            )}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-xs text-gray-500">PTS</div>
                <div className="text-xl font-bold text-lk-primary">{stats.points}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">REB</div>
                <div className="text-xl font-bold text-lk-primary">{stats.rebounds}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">AST</div>
                <div className="text-xl font-bold text-lk-primary">{stats.assists}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back Side */}
        <Card
          className="absolute inset-0 backface-hidden border-2 border-lk-accent rotate-y-180"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <CardContent className="p-6 h-full flex flex-col">
            <div className="text-center mb-4">
              <div className="text-lg font-bold text-lk-primary mb-1">{name}</div>
              <div className="text-sm text-gray-500">#{number} • {position}</div>
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">Points Per Game</span>
                <span className="font-bold text-lk-accent">{stats.points}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">Rebounds Per Game</span>
                <span className="font-bold text-lk-accent">{stats.rebounds}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">Assists Per Game</span>
                <span className="font-bold text-lk-accent">{stats.assists}</span>
              </div>
              {achievements.length > 0 && (
                <div className="mt-4">
                  <div className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    Achievements
                  </div>
                  <div className="space-y-1">
                    {achievements.map((achievement, idx) => (
                      <div key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-lk-accent" />
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

