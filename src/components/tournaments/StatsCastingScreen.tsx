// src/components/tournaments/StatsCastingScreen.tsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, TrendingUp, TrendingDown, Zap, Target, Award, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedCounter } from '@/components/ui/animated-counter';

type StatTrend = 'up' | 'down' | undefined;

const StatBadge = ({
  label,
  value,
  trend,
  color = 'text-lk-accent',
}: {
  label: string;
  value: number;
  trend?: StatTrend;
  color?: string;
}) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="flex flex-col items-center p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
  >
    <div className="text-xs text-white/70 mb-1">{label}</div>
    <div className="flex items-center gap-1">
      <span className={`text-2xl font-bold ${color}`}>
        <AnimatedCounter value={value} />
      </span>
      {trend === 'up' && <TrendingUp className="h-4 w-4 text-green-400" />}
      {trend === 'down' && <TrendingDown className="h-4 w-4 text-red-400" />}
    </div>
  </motion.div>
);

interface GameEvent {
  id: string;
  time: string;
  quarter: number;
  type: 'score' | 'foul' | 'timeout' | 'substitution';
  team: 'home' | 'away';
  player?: string;
  description: string;
  points?: number;
}

interface PlayerStat {
  name: string;
  number: number;
  position: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  fgMade: number;
  fgAttempted: number;
  threePtMade: number;
  threePtAttempted: number;
  ftMade: number;
  ftAttempted: number;
  plusMinus: number;
}

interface StatsCastingScreenProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  quarter: number;
  timeRemaining: number;
  homePlayers: PlayerStat[];
  awayPlayers: PlayerStat[];
  gameEvents?: GameEvent[];
}

export const StatsCastingScreen: React.FC<StatsCastingScreenProps> = ({
  homeTeam = 'Eagles',
  awayTeam = 'Panthers',
  homeScore = 78,
  awayScore = 72,
  quarter = 3,
  timeRemaining = 324,
  homePlayers = [
    { name: 'Jordan Smith', number: 23, position: 'G', points: 24, rebounds: 8, assists: 6, steals: 2, blocks: 1, fgMade: 9, fgAttempted: 18, threePtMade: 3, threePtAttempted: 7, ftMade: 3, ftAttempted: 4, plusMinus: 12 },
    { name: 'Marcus Johnson', number: 5, position: 'PG', points: 18, rebounds: 4, assists: 10, steals: 3, blocks: 0, fgMade: 7, fgAttempted: 14, threePtMade: 2, threePtAttempted: 5, ftMade: 2, ftAttempted: 2, plusMinus: 8 },
    { name: 'Chris Williams', number: 11, position: 'F', points: 12, rebounds: 9, assists: 2, steals: 1, blocks: 2, fgMade: 5, fgAttempted: 10, threePtMade: 0, threePtAttempted: 0, ftMade: 2, ftAttempted: 3, plusMinus: 5 },
  ],
  awayPlayers = [
    { name: 'Alex Davis', number: 7, position: 'G', points: 22, rebounds: 6, assists: 5, steals: 1, blocks: 0, fgMade: 8, fgAttempted: 16, threePtMade: 4, threePtAttempted: 8, ftMade: 2, ftAttempted: 3, plusMinus: -8 },
    { name: 'Ryan Brown', number: 14, position: 'F', points: 16, rebounds: 7, assists: 3, steals: 2, blocks: 1, fgMade: 6, fgAttempted: 12, threePtMade: 2, threePtAttempted: 5, ftMade: 2, ftAttempted: 2, plusMinus: -5 },
    { name: 'Tyler Wilson', number: 9, position: 'C', points: 10, rebounds: 11, assists: 1, steals: 0, blocks: 3, fgMade: 4, fgAttempted: 8, threePtMade: 0, threePtAttempted: 0, ftMade: 2, ftAttempted: 4, plusMinus: -12 },
  ],
  gameEvents = [],
}: StatsCastingScreenProps) => {
  const [isLive, setIsLive] = useState(true);
  const [currentTime, setCurrentTime] = useState(timeRemaining);
  const [selectedView, setSelectedView] = useState<'leaders' | 'progression' | 'efficiency'>('progression');
  const [highlightedPlayer, setHighlightedPlayer] = useState<string | null>(null);
  const [scoreHistory, setScoreHistory] = useState<Array<{ time: number; home: number; away: number }>>([
    { time: 0, home: 0, away: 0 },
    { time: 120, home: 12, away: 8 },
    { time: 240, home: 28, away: 22 },
    { time: 360, home: 45, away: 38 },
    { time: 480, home: 62, away: 55 },
    { time: 600, home: 78, away: 72 },
  ]);
  const [recentEvent, setRecentEvent] = useState<GameEvent | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [latestPoints, setLatestPoints] = useState<{ home: { x: number; y: number }; away: { x: number; y: number } | null } | null>(null);

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate shooting percentages
  const getShootingPercentage = (made: number, attempted: number) => {
    return attempted > 0 ? ((made / attempted) * 100).toFixed(1) : '0.0';
  };

  // Calculate win probability (ESPN-style)
  const calculateWinProbability = useMemo(() => {
    return scoreHistory.map((point, idx) => {
      const scoreDiff = point.home - point.away;
      const timeElapsed = point.time;
      const totalGameTime = 1920; // 4 quarters * 12 minutes * 60 seconds
      const timeRemaining = totalGameTime - timeElapsed;
      const quarter = Math.floor(timeElapsed / 480) + 1;
      
      // Base probability from score difference
      // More weight given to recent performance
      let baseProb = 50; // Start at 50/50
      
      if (scoreDiff !== 0) {
        // Score difference impact increases as game progresses
        const timeWeight = timeElapsed / totalGameTime;
        const diffImpact = Math.abs(scoreDiff) * (1 + timeWeight * 2);
        
        if (scoreDiff > 0) {
          baseProb = 50 + Math.min(45, diffImpact * 2);
        } else {
          baseProb = 50 - Math.min(45, diffImpact * 2);
        }
      }
      
      // Momentum factor (recent score changes)
      if (idx > 0) {
        const prevDiff = scoreHistory[idx - 1].home - scoreHistory[idx - 1].away;
        const momentum = scoreDiff - prevDiff;
        if (momentum > 0) {
          baseProb += Math.min(10, momentum * 2);
        } else if (momentum < 0) {
          baseProb -= Math.min(10, Math.abs(momentum) * 2);
        }
      }
      
      // Time remaining factor (less time = more certainty)
      const timeFactor = Math.min(20, (totalGameTime - timeElapsed) / totalGameTime * 20);
      if (scoreDiff > 0) {
        baseProb += timeFactor;
      } else if (scoreDiff < 0) {
        baseProb -= timeFactor;
      }
      
      return {
        ...point,
        winProbability: Math.max(0, Math.min(100, baseProb)),
      };
    });
  }, [scoreHistory]);

  const allPlayers = useMemo(() => [...homePlayers, ...awayPlayers], [homePlayers, awayPlayers]);
  const homeNameSet = useMemo(() => new Set(homePlayers.map((p) => p.name)), [homePlayers]);

  const leaderboardStats = useMemo(() => {
    const configs = [
      { key: 'points', label: 'Points', value: (p: PlayerStat) => p.points, formatter: (p: PlayerStat) => `${p.points} pts` },
      { key: 'rebounds', label: 'Rebounds', value: (p: PlayerStat) => p.rebounds, formatter: (p: PlayerStat) => `${p.rebounds} reb` },
      { key: 'assists', label: 'Assists', value: (p: PlayerStat) => p.assists, formatter: (p: PlayerStat) => `${p.assists} ast` },
      { key: 'steals', label: 'Steals', value: (p: PlayerStat) => p.steals, formatter: (p: PlayerStat) => `${p.steals} stl` },
      { key: 'blocks', label: 'Blocks', value: (p: PlayerStat) => p.blocks, formatter: (p: PlayerStat) => `${p.blocks} blk` },
      {
        key: 'fg',
        label: 'FG%',
        value: (p: PlayerStat) => parseFloat(getShootingPercentage(p.fgMade, p.fgAttempted)),
        formatter: (p: PlayerStat) => `${getShootingPercentage(p.fgMade, p.fgAttempted)}%`,
      },
      {
        key: 'three',
        label: '3PT%',
        value: (p: PlayerStat) => parseFloat(getShootingPercentage(p.threePtMade, p.threePtAttempted)),
        formatter: (p: PlayerStat) => `${getShootingPercentage(p.threePtMade, p.threePtAttempted)}%`,
      },
      {
        key: 'plusMinus',
        label: '+/-',
        value: (p: PlayerStat) => p.plusMinus,
        formatter: (p: PlayerStat) => `${p.plusMinus >= 0 ? '+' : ''}${p.plusMinus}`,
      },
    ];

    return configs.map((cfg) => {
      const sorted = [...allPlayers].sort((a, b) => cfg.value(b) - cfg.value(a)).slice(0, 4);
      const maxVal = sorted.length ? cfg.value(sorted[0]) || 1 : 1;
      return { ...cfg, leaders: sorted, maxVal };
    });
  }, [allPlayers, getShootingPercentage]);

  // Simulate game progression
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const newTime = Math.max(0, prev - 1);
        
        // Randomly update scores
        if (Math.random() > 0.85) {
          const newHomeScore = homeScore + Math.floor(Math.random() * 3) + 1;
          const newAwayScore = awayScore + Math.floor(Math.random() * 3) + 1;
          
          setScoreHistory((prev) => [
            ...prev,
            { time: timeRemaining - newTime, home: newHomeScore, away: newAwayScore },
          ].slice(-20));

          // Show event notification
          if (Math.random() > 0.7) {
            setRecentEvent({
              id: Date.now().toString(),
              time: formatTime(newTime),
              quarter,
              type: 'score',
              team: Math.random() > 0.5 ? 'home' : 'away',
              description: `${Math.random() > 0.5 ? 'Jordan Smith' : 'Alex Davis'} scores!`,
              points: Math.random() > 0.5 ? 2 : 3,
            });
            setTimeout(() => setRecentEvent(null), 3000);
          }
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isLive, homeScore, awayScore, quarter, timeRemaining]);

  // Draw ESPN-style win probability chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || selectedView !== 'progression') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const width = canvas.width;
    const height = canvas.height;
    const padding = { top: 60, right: 40, bottom: 60, left: 50 };
    const graphWidth = width - padding.left - padding.right;
    const graphHeight = height - padding.top - padding.bottom;
    const graphTop = padding.top;
    const graphBottom = height - padding.bottom;
    const graphLeft = padding.left;
    const graphRight = width - padding.right;
    const midY = graphTop + graphHeight / 2; // 50% line

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(graphLeft, graphTop, graphWidth, graphHeight);

    if (calculateWinProbability.length > 1) {
      const probData = calculateWinProbability;
      const dataLength = probData.length;
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      
      // Horizontal grid lines (0%, 50%, 100%)
      [0, 50, 100].forEach((percent) => {
        const y = graphTop + (graphHeight * (100 - percent) / 100);
        ctx.beginPath();
        ctx.moveTo(graphLeft, y);
        ctx.lineTo(graphRight, y);
        ctx.stroke();
      });

      // Vertical grid lines (quarters)
      const quarters = 4;
      for (let i = 0; i <= quarters; i++) {
        const x = graphLeft + (graphWidth * i / quarters);
        ctx.beginPath();
        ctx.moveTo(x, graphTop);
        ctx.lineTo(x, graphBottom);
        ctx.stroke();
      }

      // Draw 50% center line (more prominent)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(graphLeft, midY);
      ctx.lineTo(graphRight, midY);
      ctx.stroke();

      // Draw filled areas above and below 50% line (ESPN style)
      // Fill the area between the probability curve and the 50% line
      
      // Area above 50% (home team favored)
      ctx.fillStyle = 'rgba(78, 230, 191, 0.25)';
      ctx.beginPath();
      ctx.moveTo(graphLeft, midY);
      probData.forEach((point, idx) => {
        const x = graphLeft + (graphWidth / (dataLength - 1)) * idx;
        const prob = point.winProbability;
        const y = graphTop + (graphHeight * (100 - prob) / 100);
        if (prob >= 50) {
          ctx.lineTo(x, y);
        } else {
          // When below 50%, draw to midY
          ctx.lineTo(x, midY);
        }
      });
      ctx.lineTo(graphRight, midY);
      ctx.lineTo(graphLeft, midY);
      ctx.closePath();
      ctx.fill();

      // Area below 50% (away team favored)
      ctx.fillStyle = 'rgba(6, 68, 98, 0.25)';
      ctx.beginPath();
      ctx.moveTo(graphLeft, midY);
      probData.forEach((point, idx) => {
        const x = graphLeft + (graphWidth / (dataLength - 1)) * idx;
        const prob = point.winProbability;
        const y = graphTop + (graphHeight * (100 - prob) / 100);
        if (prob <= 50) {
          ctx.lineTo(x, y);
        } else {
          // When above 50%, draw to midY
          ctx.lineTo(x, midY);
        }
      });
      ctx.lineTo(graphRight, midY);
      ctx.lineTo(graphLeft, midY);
      ctx.closePath();
      ctx.fill();

      // Draw the main probability line (black, thick)
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 4;
      ctx.beginPath();
      probData.forEach((point, idx) => {
        const x = graphLeft + (graphWidth / (dataLength - 1)) * idx;
        const y = graphTop + (graphHeight * (100 - point.winProbability) / 100);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw Y-axis labels (0%, 50%, 100%)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText('100%', graphLeft - 10, graphTop);
      ctx.fillText('50%', graphLeft - 10, midY);
      ctx.fillText('0%', graphLeft - 10, graphBottom);

      // Draw X-axis labels (quarters)
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      const quarterLabels = ['1st', '2nd', '3rd', '4th'];
      for (let i = 0; i < quarters; i++) {
        const x = graphLeft + (graphWidth * (i + 0.5) / quarters);
        ctx.fillText(quarterLabels[i], x, graphBottom + 10);
      }

      // Store latest point for animation
      if (probData.length > 0) {
        const lastPoint = probData[probData.length - 1];
        const lastX = graphLeft + (graphWidth / (dataLength - 1)) * (dataLength - 1);
        const lastY = graphTop + (graphHeight * (100 - lastPoint.winProbability) / 100);
        setLatestPoints({ 
          home: { x: lastX, y: lastY }, 
          away: null 
        });
      }
    }
  }, [scoreHistory, selectedView, calculateWinProbability]);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(45deg, transparent 25%, rgba(57,167,141,0.12) 50%, transparent 75%, transparent 100%)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-16">
        {/* Header Bar */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 bg-black/40 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
        >
          <div className="flex items-center gap-4">
            {isLive && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="flex items-center gap-2 bg-red-600 px-3 sm:px-4 py-2 rounded-full"
              >
                <Radio className="h-4 w-4 text-white" />
                <span className="text-white font-bold text-xs sm:text-sm">LIVE</span>
              </motion.div>
            )}
            <div className="text-white/60 text-sm line-clamp-1">
              {homeTeam} vs {awayTeam}
            </div>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto justify-between">
            <div className="flex items-center gap-2 text-white">
              <Clock className="h-5 w-5 shrink-0" />
              <span className="font-mono text-lg font-bold whitespace-nowrap">Q{quarter} {formatTime(currentTime)}</span>
            </div>
          </div>
        </motion.div>

        {/* Score Display - Large and Prominent */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {/* Home Team */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-gradient-to-br from-lk-accent/18 to-lk-accent/4 rounded-2xl p-6 sm:p-8 border border-lk-accent/25 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-lk-accent/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="text-white/70 text-sm mb-2 font-semibold">{homeTeam}</div>
              <motion.div
                key={homeScore}
                initial={{ scale: 1.3, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-lk-accent mb-4 leading-tight"
              >
                <AnimatedCounter value={homeScore} />
              </motion.div>
              <div className="flex gap-2 flex-wrap">
                <StatBadge label="FG%" value={parseFloat(getShootingPercentage(homePlayers.reduce((sum, p) => sum + p.fgMade, 0), homePlayers.reduce((sum, p) => sum + p.fgAttempted, 0)))} color="text-lk-accent" />
                <StatBadge label="3PT%" value={parseFloat(getShootingPercentage(homePlayers.reduce((sum, p) => sum + p.threePtMade, 0), homePlayers.reduce((sum, p) => sum + p.threePtAttempted, 0)))} color="text-lk-accent" />
              </div>
            </div>
          </motion.div>

          {/* Away Team */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-gradient-to-br from-lk-primary/18 to-lk-primary/4 rounded-2xl p-6 sm:p-8 border border-lk-primary/25 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-lk-primary/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="text-white/70 text-sm mb-2 font-semibold">{awayTeam}</div>
              <motion.div
                key={awayScore}
                initial={{ scale: 1.3, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-lk-primary mb-4 leading-tight"
              >
                <AnimatedCounter value={awayScore} />
              </motion.div>
              <div className="flex gap-2 flex-wrap">
                <StatBadge label="FG%" value={parseFloat(getShootingPercentage(awayPlayers.reduce((sum, p) => sum + p.fgMade, 0), awayPlayers.reduce((sum, p) => sum + p.fgAttempted, 0)))} color="text-lk-primary" />
                <StatBadge label="3PT%" value={parseFloat(getShootingPercentage(awayPlayers.reduce((sum, p) => sum + p.threePtMade, 0), awayPlayers.reduce((sum, p) => sum + p.threePtAttempted, 0)))} color="text-lk-primary" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* View Tabs - Centered */}
        <div className="flex justify-center gap-2 mb-6 overflow-x-auto pb-1">
          {(['leaders', 'progression', 'efficiency'] as const).map((view) => (
            <button
              key={view}
              onClick={() => setSelectedView(view)}
              className={`
                px-5 sm:px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap transition-all
                ${selectedView === view
                  ? 'bg-lk-accent text-white shadow-lg scale-105'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
                }
              `}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Views */}
        <AnimatePresence mode="wait">
          {selectedView === 'leaders' && (
            <motion.div
              key="leaders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Card className="bg-black/50 backdrop-blur-md border-white/10 p-5 sm:p-6">
                <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">League Leaders</h3>
                      <p className="text-white/60 text-sm">Top performers across every key stat</p>
                    </div>
                  </div>
                  <Badge className="bg-white/10 text-white border border-white/20 rounded-full px-3 py-1 text-xs">
                    Live updating
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {leaderboardStats.map((stat, statIdx) => (
                    <motion.div
                      key={`leaders-${stat.key}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: statIdx * 0.04 }}
                      className="p-4 rounded-2xl bg-white/5 border border-white/12 shadow-[0_18px_40px_rgba(0,0,0,0.35)] relative overflow-hidden"
                    >
                      <div
                        className="absolute inset-0 opacity-30 blur-3xl pointer-events-none"
                        style={{
                          background:
                            'radial-gradient(circle at 30% 30%, rgba(78,230,191,0.25), transparent 45%), radial-gradient(circle at 80% 20%, rgba(6,68,98,0.25), transparent 35%)',
                        }}
                      />
                      <div className="flex items-center justify-between mb-3 relative z-10">
                        <div className="text-white font-semibold flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs uppercase tracking-wide">
                            {stat.label.slice(0, 2)}
                          </div>
                          <span>{stat.label}</span>
                        </div>
                        <Badge className="bg-white/10 text-white border border-white/20 rounded-full px-3 py-1 text-xs backdrop-blur">
                          Top {stat.leaders.length}
                        </Badge>
                      </div>
                      <div className="space-y-3 relative z-10">
                        {stat.leaders.map((player, idx) => {
                          const value = stat.value(player);
                          const pct = Math.min(100, Math.max(0, (value / stat.maxVal) * 100));
                          const isHome = homeNameSet.has(player.name);
                          return (
                            <div
                              key={`leaders-${stat.key}-${player.number}-${player.name}`}
                              className="p-3 rounded-xl bg-black/40 border border-white/10"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-inner ${
                                    isHome ? 'bg-lk-accent/80' : 'bg-lk-primary/80'
                                  }`}
                                >
                                  #{player.number}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="text-white font-semibold truncate">{player.name}</div>
                                    <div className="text-white text-sm font-bold">{stat.formatter(player)}</div>
                                  </div>
                                  <div className="text-white/60 text-xs">
                                    {player.position} · {isHome ? homeTeam : awayTeam}
                                  </div>
                                  <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${pct}%` }}
                                      transition={{ duration: 0.6, delay: idx * 0.05 }}
                                      className={`h-full rounded-full ${
                                        isHome ? 'bg-lk-accent' : 'bg-lk-primary'
                                      }`}
                                    />
                                  </div>
                                </div>
                                <div className="text-white/60 text-xs font-mono mt-2 flex items-center gap-2">
                                  <span className="inline-flex h-6 px-2 rounded-full bg-white/8 border border-white/15 items-center justify-center">
                                    {stat.label}
                                  </span>
                                  <span>Rank #{idx + 1}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {selectedView === 'progression' && (
            <motion.div
              key="progression"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="bg-black/40 backdrop-blur-md border-white/10 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Score Progression & Win Probability</h3>
                  {calculateWinProbability.length > 0 && (
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xs text-white/60">Win Probability</div>
                        <div className="flex items-center gap-2">
                          <div className="text-lg font-bold text-lk-accent">
                            {calculateWinProbability[calculateWinProbability.length - 1].winProbability.toFixed(0)}%
                          </div>
                          <span className="text-white/70 text-sm">{homeTeam}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-lg font-bold text-lk-primary">
                            {(100 - calculateWinProbability[calculateWinProbability.length - 1].winProbability).toFixed(0)}%
                          </div>
                          <span className="text-white/70 text-sm">{awayTeam}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-80 sm:h-96 bg-black/25 rounded-xl border border-white/10"
                  />
                  {latestPoints && selectedView === 'progression' && latestPoints.home && (
                    <motion.div
                      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      style={{
                        left: latestPoints.home.x,
                        top: latestPoints.home.y,
                      }}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.3, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <div className="h-4 w-4 rounded-full bg-black/60 blur-sm border-2 border-white/50" />
                    </motion.div>
                  )}
                </div>
                <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-lk-accent" />
                    <span className="text-white/70 text-sm font-medium">{homeTeam}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-lk-primary" />
                    <span className="text-white/70 text-sm font-medium">{awayTeam}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {selectedView === 'efficiency' && (
            <motion.div
              key="efficiency"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {[homeTeam, awayTeam].map((team, teamIdx) => {
                const players = teamIdx === 0 ? homePlayers : awayPlayers;
                return (
                  <Card key={team} className="bg-black/40 backdrop-blur-md border-white/10">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-4">{team} Efficiency</h3>
                      <div className="space-y-4">
                        {players.map((player, idx) => {
                          const fgPct = parseFloat(getShootingPercentage(player.fgMade, player.fgAttempted));
                          const threePct = player.threePtAttempted > 0 ? parseFloat(getShootingPercentage(player.threePtMade, player.threePtAttempted)) : 0;
                          const ftPct = parseFloat(getShootingPercentage(player.ftMade, player.ftAttempted));
                          const tsPct = ((player.points / (2 * (player.fgAttempted + 0.44 * player.ftAttempted))) * 100).toFixed(1);

                          return (
                            <motion.div
                              key={player.number}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: idx * 0.1 }}
                              className="p-4 bg-white/5 rounded-lg border border-white/10"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="font-bold text-white">#{player.number} {player.name}</div>
                                <div className={`text-lg font-bold ${teamIdx === 0 ? 'text-lk-accent' : 'text-lk-primary'}`}>
                                  {player.points} PTS
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-white/70">FG%</span>
                                  <div className="flex items-center gap-2">
                                    <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${fgPct}%` }}
                                        transition={{ duration: 1, delay: idx * 0.1 }}
                                        className={`h-full rounded-full ${teamIdx === 0 ? 'bg-lk-accent' : 'bg-lk-primary'}`}
                                      />
                                    </div>
                                    <span className="text-white font-bold w-12 text-right">{fgPct}%</span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-white/70">3PT%</span>
                                  <div className="flex items-center gap-2">
                                    <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${threePct}%` }}
                                        transition={{ duration: 1, delay: idx * 0.1 + 0.1 }}
                                        className={`h-full rounded-full ${teamIdx === 0 ? 'bg-lk-accent' : 'bg-lk-primary'}`}
                                      />
                                    </div>
                                    <span className="text-white font-bold w-12 text-right">{threePct}%</span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-white/70">TS%</span>
                                  <span className="text-white font-bold">{tsPct}%</span>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recent Event Notification */}
        <AnimatePresence>
          {recentEvent && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="fixed bottom-6 md:bottom-8 right-1/2 md:right-8 translate-x-1/2 md:translate-x-0 bg-gradient-to-r from-lk-accent to-lk-primary p-5 sm:p-6 rounded-xl shadow-2xl border-2 border-white/20 z-50 w-[90vw] max-w-sm"
            >
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-white animate-pulse" />
                <div>
                  <div className="text-white font-bold">{recentEvent.description}</div>
                  <div className="text-white/80 text-sm">{recentEvent.time} - Q{recentEvent.quarter}</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

