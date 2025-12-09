// src/components/tournaments/ShotHeatMap.tsx
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ShotZone {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  attempts: number;
  makes: number;
}

interface ShotHeatMapProps {
  zones: ShotZone[];
  playerName?: string;
}

export const ShotHeatMap: React.FC<ShotHeatMapProps> = ({
  zones,
  playerName = 'Player',
}) => {
  const [selectedZone, setSelectedZone] = useState<ShotZone | null>(null);

  const maxAttempts = useMemo(() => Math.max(...zones.map(z => z.attempts || 1), 1), [zones]);
  const bestZone = useMemo(
    () =>
      [...zones].sort((a, b) => {
        const ea = a.attempts ? a.makes / a.attempts : 0;
        const eb = b.attempts ? b.makes / b.attempts : 0;
        return eb - ea;
      })[0],
    [zones]
  );

  const getZoneColor = (zone: ShotZone) => {
    const efficiency = zone.attempts > 0 ? zone.makes / zone.attempts : 0;
    const hue = Math.max(0, Math.min(120, efficiency * 140)); // 0 = red, 120 = green
    return `hsla(${hue}, 85%, 52%, 0.95)`;
  };

  const getZoneOpacity = (zone: ShotZone) => {
    return zone.attempts > 0 ? Math.min(0.25 + (zone.attempts / maxAttempts) * 0.75, 0.95) : 0.12;
  };

  return (
    <Card className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl shadow-lk-accent/25">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-white">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-lk-accent/90 to-amber-300/70 flex items-center justify-center text-lg font-black shadow-lg shadow-lk-accent/40">
            FG
          </div>
          <div>
            <div className="text-sm uppercase tracking-widest text-slate-300">Shot Heat Map</div>
            <div className="text-xl font-semibold">{playerName}</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-4">
          <div className="relative w-full rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-inner" style={{ aspectRatio: '9/16' }}>
            {/* Basketball Court (vertical, scout look) */}
            <svg viewBox="0 0 520 920" className="w-full h-full">
              <defs>
                <linearGradient id="courtFloorV" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f2d3a0" />
                  <stop offset="100%" stopColor="#c89a53" />
                </linearGradient>
                <radialGradient id="laneGlow" cx="50%" cy="60%" r="55%">
                  <stop offset="0%" stopColor="#ffffff18" />
                  <stop offset="80%" stopColor="#00000000" />
                </radialGradient>
                <filter id="heatGlowV">
                  <feGaussianBlur stdDeviation="10" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Court */}
              <rect x="0" y="0" width="520" height="920" fill="url(#courtFloorV)" />
              <rect x="0" y="0" width="520" height="920" fill="url(#laneGlow)" />
              <rect x="0" y="0" width="520" height="920" fill="none" stroke="#8b6914" strokeWidth="2.5" />

              {/* Half court and center */}
              <line x1="0" y1="460" x2="520" y2="460" stroke="#8b6914" strokeWidth="3" />
              <circle cx="260" cy="460" r="70" fill="none" stroke="#8b6914" strokeWidth="3" />
              <circle cx="260" cy="460" r="5" fill="#8b6914" />

              {/* Paint and rim (top basket) */}
              <rect x="150" y="40" width="220" height="190" fill="none" stroke="#8b6914" strokeWidth="3" />
              <rect x="180" y="40" width="160" height="120" fill="none" stroke="#8b6914" strokeWidth="3" />
              <circle cx="260" cy="65" r="20" fill="none" stroke="#8b6914" strokeWidth="3" />
              {/* Three point arc (top) */}
              <path d="M40 40 Q260 240 480 40" fill="none" stroke="#8b6914" strokeWidth="3" />

              {/* Shot Zones */}
              {zones.map((zone) => {
                const percentage = zone.attempts > 0 ? ((zone.makes / zone.attempts) * 100).toFixed(1) : 0;
                const isSelected = selectedZone?.id === zone.id;
                return (
                  <g key={zone.id} filter="url(#heatGlowV)">
                    <motion.rect
                      x={zone.x}
                      y={zone.y}
                      width={zone.width}
                      height={zone.height}
                      fill={getZoneColor(zone)}
                      opacity={getZoneOpacity(zone)}
                      className="cursor-pointer transition-all"
                      onClick={() => setSelectedZone(zone)}
                      whileHover={{ scale: 1.02 }}
                      animate={{ strokeWidth: isSelected ? 3.5 : 1.25, stroke: isSelected ? '#ffffff' : '#0f172a' }}
                      rx={10}
                    />
                    {zone.attempts > 0 && (
                      <text
                        x={zone.x + zone.width / 2}
                        y={zone.y + zone.height / 2}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-sm font-black fill-white drop-shadow-md"
                        style={{ textShadow: '0 4px 10px rgba(0,0,0,0.45)' }}
                      >
                        {percentage}%
                      </text>
                    )}
                    <rect
                      x={zone.x}
                      y={zone.y}
                      width={zone.width}
                      height={zone.height}
                      fill="none"
                      stroke="rgba(15,23,42,0.5)"
                      strokeWidth="1.5"
                      rx={10}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Legend overlay */}
            <div className="absolute left-3 right-3 bottom-3 bg-slate-950/75 border border-white/10 rounded-xl px-4 py-3 backdrop-blur shadow-lg shadow-black/30">
              <div className="flex items-center justify-between text-xs text-slate-100 font-medium mb-2">
                <span>Low efficiency</span>
                <span>High efficiency</span>
              </div>
              <div className="h-3 w-full rounded-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400 shadow-inner" />
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                <span>0-25%</span>
                <span>25-40%</span>
                <span>40-55%</span>
                <span>55%+</span>
              </div>
            </div>

            {/* Zone Info Tooltip */}
            {selectedZone && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 right-4 bg-slate-950/95 text-white p-4 rounded-xl shadow-2xl border border-lk-accent/50 backdrop-blur z-10 max-w-[240px]"
              >
                <div className="font-bold text-lk-accent mb-1 text-sm uppercase tracking-wide">Zone Focus</div>
                <div className="text-lg font-semibold mb-2">{selectedZone.name}</div>
                <div className="text-sm space-y-1 text-slate-200">
                  <div className="flex justify-between"><span>Makes</span><span className="font-semibold text-emerald-300">{selectedZone.makes}</span></div>
                  <div className="flex justify-between"><span>Attempts</span><span className="font-semibold text-amber-200">{selectedZone.attempts}</span></div>
                  <div className="flex justify-between text-base font-semibold text-lk-accent">
                    {selectedZone.attempts > 0 ? ((selectedZone.makes / selectedZone.attempts) * 100).toFixed(1) : 0}%
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Tap any zone to compare.</div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Scout-style right rail */}
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-4 sm:p-5 shadow-inner flex flex-col gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-1">Scout Grade</div>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-black text-white">
                  {bestZone ? ((bestZone.makes / (bestZone.attempts || 1)) * 100).toFixed(0) : 0}%
                </div>
                <div className="text-xs text-emerald-300 font-semibold px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/40">
                  Best Zone: {bestZone?.name ?? '—'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm text-slate-200">
              {zones.slice(0, 4).map((zone) => {
                const pct = zone.attempts ? (zone.makes / zone.attempts) * 100 : 0;
                return (
                  <div key={`mini-${zone.id}`} className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">{zone.name}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-white">{pct.toFixed(1)}%</span>
                      <span className="text-xs text-slate-400">{zone.makes}/{zone.attempts}</span>
                    </div>
                    <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, pct)}%` }}
                        transition={{ duration: 0.6 }}
                        className="h-full rounded-full bg-gradient-to-r from-lk-accent to-emerald-400"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-xs text-slate-400 leading-relaxed">
              Vertical scout view highlights efficiency and volume by zone. Tap a zone on the court to drill into makes/attempts and compare across regions.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

