// src/components/tournaments/LiveStatsDemo.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { AnimatedCounter } from '@/components/ui/animated-counter';

interface PlayerStat {
  name: string;
  number: number;
  points: number;
  rebounds: number;
  assists: number;
  trend: 'up' | 'down' | 'neutral';
}

const LiveStatsDemo: React.FC = () => {
  const [gameClock, setGameClock] = useState(600); // 10:00 in seconds
  const [quarter, setQuarter] = useState(1);
  const [homeScore, setHomeScore] = useState(42);
  const [awayScore, setAwayScore] = useState(38);
  const [isLive, setIsLive] = useState(true);

  const [homePlayers, setHomePlayers] = useState<PlayerStat[]>([
    { name: 'Jordan Smith', number: 23, points: 18, rebounds: 7, assists: 4, trend: 'up' },
    { name: 'Marcus Johnson', number: 5, points: 12, rebounds: 5, assists: 8, trend: 'up' },
    { name: 'Chris Williams', number: 11, points: 8, rebounds: 3, assists: 2, trend: 'neutral' },
  ]);

  const [awayPlayers, setAwayPlayers] = useState<PlayerStat[]>([
    { name: 'Alex Davis', number: 7, points: 15, rebounds: 6, assists: 5, trend: 'up' },
    { name: 'Ryan Brown', number: 14, points: 10, rebounds: 4, assists: 3, trend: 'down' },
    { name: 'Tyler Wilson', number: 9, points: 9, rebounds: 8, assists: 1, trend: 'neutral' },
  ]);

  // Simulate game clock
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setGameClock((prev) => {
        if (prev <= 0) {
          if (quarter < 4) {
            setQuarter((q) => q + 1);
            return 600; // Reset to 10:00
          } else {
            setIsLive(false);
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isLive, quarter]);

  // Simulate score updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // Randomly update scores
      if (Math.random() > 0.7) {
        setHomeScore((prev) => prev + (Math.random() > 0.5 ? 2 : 3));
      }
      if (Math.random() > 0.7) {
        setAwayScore((prev) => prev + (Math.random() > 0.5 ? 2 : 3));
      }

      // Update player stats occasionally
      if (Math.random() > 0.8) {
        setHomePlayers((players) =>
          players.map((p) => {
            if (Math.random() > 0.5) {
              const stat = ['points', 'rebounds', 'assists'][Math.floor(Math.random() * 3)] as keyof PlayerStat;
              return {
                ...p,
                [stat]: (p[stat] as number) + 1,
                trend: Math.random() > 0.5 ? 'up' : 'neutral',
              };
            }
            return p;
          })
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const StatCard = ({ label, value, trend }: { label: string; value: number; trend?: 'up' | 'down' | 'neutral' }) => (
    <div className="text-center">
      <div className="text-xs text-gray-600 mb-1">{label}</div>
      <div className="flex items-center justify-center gap-1">
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="text-lg font-bold text-lk-primary"
          >
            {value}
          </motion.span>
        </AnimatePresence>
        {trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500" />}
        {trend === 'down' && <TrendingDown className="h-3 w-3 text-red-500" />}
      </div>
    </div>
  );

  const titleComponent = (
    <>
      <div className="inline-flex items-center gap-2 mb-4">
        <Radio className="h-5 w-5 text-lk-accent animate-pulse" />
        <Badge variant="outline" className="text-lk-accent border-lk-accent">
          LIVE DEMO
        </Badge>
      </div>
      <h1 className="text-4xl md:text-6xl font-semibold text-lk-primary dark:text-white">
        Real-Time Stats That <br />
        <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-lk-accent">
          Update Instantly
        </span>
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
        Watch as scores, player stats, and game data update in real-time. No refresh needed.
      </p>
    </>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ContainerScroll titleComponent={titleComponent}>
        <div className="h-full w-full overflow-y-auto p-4 md:p-6">
          <Card className="border-2 border-lk-accent shadow-xl bg-white">
            <CardHeader className="bg-gradient-to-r from-lk-primary to-lk-accent text-white">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">Live Game Stats</CardTitle>
                  <div className="flex items-center gap-4 text-sm">
                    <span>Q{quarter}</span>
                    <span className="font-mono text-lg">{formatTime(gameClock)}</span>
                    {isLive && (
                      <Badge className="bg-red-500 text-white animate-pulse">
                        LIVE
                      </Badge>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setIsLive(!isLive)}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm"
                >
                  {isLive ? 'Pause' : 'Resume'}
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Score Display */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-lk-background rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Home Team</div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={homeScore}
                      initial={{ scale: 1.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.7, opacity: 0 }}
                  className="text-5xl font-bold text-lk-primary"
                >
                  <AnimatedCounter value={homeScore} />
                </motion.div>
                  </AnimatePresence>
                </div>
                <div className="text-center p-4 bg-lk-background rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Away Team</div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={awayScore}
                      initial={{ scale: 1.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.7, opacity: 0 }}
                  className="text-5xl font-bold text-lk-primary"
                >
                  <AnimatedCounter value={awayScore} />
                </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Top Players */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-lk-primary">Home Team Leaders</h3>
                  <div className="space-y-3">
                    {homePlayers.map((player, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-lk-primary text-white flex items-center justify-center font-bold">
                            #{player.number}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold mb-2">{player.name}</div>
                            <div className="flex gap-4 text-sm text-gray-600">
                              <StatCard label="PTS" value={player.points} trend={player.trend} />
                              <StatCard label="REB" value={player.rebounds} />
                              <StatCard label="AST" value={player.assists} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-lk-primary">Away Team Leaders</h3>
                  <div className="space-y-3">
                    {awayPlayers.map((player, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-lk-accent text-white flex items-center justify-center font-bold">
                            #{player.number}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold mb-2">{player.name}</div>
                            <div className="flex gap-4 text-sm text-gray-600">
                              <StatCard label="PTS" value={player.points} trend={player.trend} />
                              <StatCard label="REB" value={player.rebounds} />
                              <StatCard label="AST" value={player.assists} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContainerScroll>
    </div>
  );
};

export default LiveStatsDemo;
