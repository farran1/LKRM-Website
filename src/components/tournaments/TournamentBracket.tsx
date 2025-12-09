// src/components/tournaments/TournamentBracket.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, MapPin, ZoomIn, ZoomOut, Download, Sparkles, Crown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AnimatedGradient } from '@/components/ui/animated-gradient';

interface Team {
  id: string;
  name: string;
  seed: number;
  score?: number;
}

interface Match {
  id: string;
  round: number;
  teams: Team[];
  winner?: string;
  date?: string;
  time?: string;
}

const TournamentBracket: React.FC = () => {
  const [hoveredMatch, setHoveredMatch] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  // Sample bracket data
  const bracketData: Match[] = [
    // Quarterfinals
    { id: 'q1', round: 1, teams: [{ id: 't1', name: 'Eagles', seed: 1, score: 72 }, { id: 't2', name: 'Hawks', seed: 8, score: 58 }], winner: 't1', date: '2024-03-15', time: '2:00 PM' },
    { id: 'q2', round: 1, teams: [{ id: 't3', name: 'Lions', seed: 4, score: 65 }, { id: 't4', name: 'Tigers', seed: 5, score: 68 }], winner: 't4', date: '2024-03-15', time: '4:00 PM' },
    { id: 'q3', round: 1, teams: [{ id: 't5', name: 'Wolves', seed: 3, score: 70 }, { id: 't6', name: 'Bears', seed: 6, score: 64 }], winner: 't5', date: '2024-03-16', time: '2:00 PM' },
    { id: 'q4', round: 1, teams: [{ id: 't7', name: 'Panthers', seed: 2, score: 75 }, { id: 't8', name: 'Cougars', seed: 7, score: 60 }], winner: 't7', date: '2024-03-16', time: '4:00 PM' },
    // Semifinals
    { id: 's1', round: 2, teams: [{ id: 't1', name: 'Eagles', seed: 1 }, { id: 't4', name: 'Tigers', seed: 5 }], date: '2024-03-20', time: '3:00 PM' },
    { id: 's2', round: 2, teams: [{ id: 't5', name: 'Wolves', seed: 3 }, { id: 't7', name: 'Panthers', seed: 2 }], date: '2024-03-20', time: '5:00 PM' },
    // Finals
    { id: 'f1', round: 3, teams: [{ id: 't1', name: 'Eagles', seed: 1 }, { id: 't7', name: 'Panthers', seed: 2 }], date: '2024-03-25', time: '7:00 PM' },
  ];

  const MatchCard = ({ match, index }: { match: Match; index: number }) => {
    const isHovered = hoveredMatch === match.id;
    const isCompleted = match.winner !== undefined;
    const isChampionship = match.round === 3;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onHoverStart={() => setHoveredMatch(match.id)}
        onHoverEnd={() => setHoveredMatch(null)}
        whileHover={{ scale: 1.05, y: -5 }}
        onClick={() => setSelectedMatch(match)}
        className="relative cursor-pointer"
      >
        {isChampionship && (
          <motion.div
            className="absolute -top-4 -left-4 -right-4 -bottom-4 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-2xl opacity-20 blur-xl"
            animate={{
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
        <Card
          className={`
            relative transition-all duration-300
            ${isHovered ? 'shadow-2xl border-2 border-lk-accent' : 'border-2'}
            ${isCompleted ? 'bg-gradient-to-br from-lk-background to-white' : 'bg-white'}
            ${isChampionship ? 'border-yellow-400 shadow-yellow-400/50 shadow-2xl scale-105' : 'border-gray-200'}
            ${isHovered && isChampionship ? 'border-yellow-500 shadow-yellow-500/50' : ''}
          `}
        >
          {isChampionship && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Crown className="h-6 w-6 text-yellow-500" />
              </motion.div>
            </div>
          )}
          <CardHeader className={`pb-3 ${isChampionship ? 'bg-gradient-to-r from-yellow-50 to-lk-background' : ''}`}>
            <div className="flex items-center justify-between">
              <CardTitle className={`text-sm font-bold ${isChampionship ? 'text-yellow-700 text-lg' : 'text-gray-600'}`}>
                {match.round === 1 ? 'Quarterfinal' : match.round === 2 ? 'Semifinal' : '🏆 Championship 🏆'}
              </CardTitle>
              {match.winner && (
                <Badge className={`${isChampionship ? 'bg-yellow-500 text-white animate-pulse' : 'bg-lk-accent text-white'}`}>
                  {isChampionship ? <Sparkles className="h-3 w-3 mr-1" /> : null}
                  Completed
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3 p-4">
            {match.teams.map((team, idx) => {
              const isWinner = match.winner === team.id;
              return (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`
                    flex items-center justify-between p-4 rounded-lg transition-all
                    ${isWinner 
                      ? isChampionship 
                        ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-400 shadow-lg' 
                        : 'bg-lk-accent/20 border-2 border-lk-accent'
                      : 'bg-gray-50 border border-gray-200'
                    }
                    ${isHovered ? 'bg-lk-primary/5' : ''}
                    ${isChampionship && isWinner ? 'scale-105' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                      ${isWinner && isChampionship 
                        ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg' 
                        : isWinner 
                        ? 'bg-lk-accent text-white' 
                        : 'bg-gray-300 text-gray-600'
                      }
                    `}>
                      #{team.seed}
                    </div>
                    <div>
                      <span className={`font-bold text-lg ${isWinner ? 'text-lk-primary' : 'text-gray-700'}`}>
                        {team.name}
                      </span>
                    </div>
                    {isWinner && (
                      <motion.div
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Trophy className={`h-5 w-5 ${isChampionship ? 'text-yellow-500' : 'text-lk-accent'}`} />
                      </motion.div>
                    )}
                  </div>
                  {team.score !== undefined && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`text-2xl font-bold ${isWinner ? 'text-lk-primary' : 'text-gray-600'}`}
                    >
                      {team.score}
                    </motion.span>
                  )}
                </motion.div>
              );
            })}
            {match.date && (
              <div className="flex items-center gap-4 text-xs text-gray-500 mt-4 pt-4 border-t">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(match.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{match.time}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.5));

  return (
    <AnimatedGradient
      colors={['#064462', '#39A78D', '#064462']}
      className="relative py-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-lk-primary/10 via-lk-accent/5 to-lk-primary/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,167,141,0.12),transparent_55%)]" />
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 40%), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 35%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.08), transparent 38%)' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Legend + Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-10 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20 shadow-[0_15px_50px_rgba(0,0,0,0.25)]"
        >
          <div className="flex items-center gap-3 text-xs sm:text-sm text-white/80 flex-wrap">
            <Badge className="bg-white/10 text-white border border-white/20 rounded-full">Live</Badge>
            <Badge className="bg-lk-accent/20 text-white border border-lk-accent/40 rounded-full">Completed</Badge>
            <Badge className="bg-yellow-500/20 text-yellow-100 border border-yellow-400/50 rounded-full">Championship</Badge>
            <span className="hidden sm:inline text-white/50">—</span>
            <span className="text-white/60">Pinch/scroll or use controls to zoom</span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 0.5}
              className="bg-white/15 border-white/30 text-white hover:bg-white/30"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm text-white font-semibold min-w-[60px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 1.5}
              className="bg-white/15 border-white/30 text-white hover:bg-white/30"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-lk-accent/20 border-lk-accent text-white hover:bg-lk-accent/30"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Bracket
          </Button>
        </motion.div>

        {/* Bracket Visualization */}
        <div className="relative">
          <div className="absolute inset-4 md:inset-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm pointer-events-none" />
          {/* SVG Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ height: '100%', minHeight: '600px' }}>
            {/* Lines from Quarterfinals to Semifinals */}
            <motion.line
              x1="25%"
              y1="25%"
              x2="50%"
              y2="35%"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.line
              x1="25%"
              y1="75%"
              x2="50%"
              y2="65%"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.7 }}
            />
            <motion.line
              x1="75%"
              y1="25%"
              x2="50%"
              y2="35%"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
            />
            <motion.line
              x1="75%"
              y1="75%"
              x2="50%"
              y2="65%"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
            />
            {/* Lines from Semifinals to Finals */}
            <motion.line
              x1="50%"
              y1="50%"
              x2="50%"
              y2="75%"
              stroke="rgba(255,215,0,0.5)"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 1 }}
            />
          </svg>

          <motion.div
            style={{ scale: zoomLevel }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 relative"
          >
            {/* Quarterfinals */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white text-center mb-6 drop-shadow-lg">
                Quarterfinals
              </h3>
              {bracketData.filter(m => m.round === 1).map((match, idx) => (
                <MatchCard key={match.id} match={match} index={idx} />
              ))}
            </motion.div>

            {/* Semifinals */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 md:mt-20"
            >
              <h3 className="text-2xl font-bold text-white text-center mb-6 drop-shadow-lg">
                Semifinals
              </h3>
              {bracketData.filter(m => m.round === 2).map((match, idx) => (
                <MatchCard key={match.id} match={match} index={idx + 4} />
              ))}
            </motion.div>

            {/* Finals - Spans 2 columns */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6 md:col-span-2 md:mt-40"
            >
              <div className="text-center mb-8">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block"
                >
                  <h3 className="text-4xl font-extrabold text-yellow-300 drop-shadow-lg mb-2">
                    🏆 CHAMPIONSHIP 🏆
                  </h3>
                </motion.div>
                <p className="text-white/80 text-sm">The Ultimate Showdown</p>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-lg">
                  {bracketData.filter(m => m.round === 3).map((match) => (
                    <MatchCard key={match.id} match={match} index={6} />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Match Detail Dialog */}
      <Dialog open={!!selectedMatch} onOpenChange={() => setSelectedMatch(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedMatch?.round === 1 ? 'Quarterfinal' : selectedMatch?.round === 2 ? 'Semifinal' : '🏆 Championship 🏆'} Match Details
            </DialogTitle>
          </DialogHeader>
          {selectedMatch && (
            <div className="space-y-4">
              {selectedMatch.teams.map((team) => (
                <div key={team.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-500">#{team.seed}</span>
                    <span className="font-semibold text-lk-primary">{team.name}</span>
                    {selectedMatch.winner === team.id && <Trophy className="h-5 w-5 text-lk-accent" />}
                  </div>
                  {team.score !== undefined && (
                    <span className="text-2xl font-bold text-lk-primary">{team.score}</span>
                  )}
                </div>
              ))}
              {selectedMatch.date && (
                <div className="flex items-center gap-4 text-sm text-gray-600 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(selectedMatch.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedMatch.time}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AnimatedGradient>
  );
};

export default TournamentBracket;
