// src/components/tournaments/CoachesSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Users, ClipboardList, BarChart3, Video } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PerformanceDashboard } from './PerformanceDashboard';
import { EfficiencyMetrics } from './EfficiencyMetrics';

const features = [
  {
    icon: Target,
    title: 'Player Performance Tracking',
    description: 'Track individual player stats across all games with detailed analytics and trends.',
  },
  {
    icon: TrendingUp,
    title: 'Team Analytics',
    description: 'Comprehensive team statistics including shooting percentages, turnovers, and efficiency metrics.',
  },
  {
    icon: Users,
    title: 'Roster Management',
    description: 'Manage your team roster, track player availability, and plan lineups.',
  },
  {
    icon: ClipboardList,
    title: 'Game Preparation',
    description: 'Access opponent scouting reports, game plans, and preparation tools.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Metrics',
    description: 'Deep dive into advanced analytics like PER, true shooting percentage, and pace.',
  },
  {
    icon: Video,
    title: 'Game Film Analysis',
    description: 'Review game footage with timestamped highlights and play-by-play breakdowns.',
  },
];

const CoachesSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-block mb-4">
          <span className="bg-lk-accent/20 text-lk-primary px-4 py-2 rounded-full text-sm font-semibold">
            FOR COACHES
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-lk-primary mb-4">
          Data-Driven Coaching Decisions
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Make informed decisions with real-time stats, player analytics, and comprehensive game insights.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-all border-2 hover:border-lk-accent">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-lk-accent/10 text-lk-accent">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Performance Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-lk-background rounded-2xl p-8 md:p-12 border-2 border-lk-accent"
      >
        <PerformanceDashboard />
      </motion.div>

      {/* Efficiency Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-8"
      >
        <EfficiencyMetrics playerName="Team Average" />
      </motion.div>
    </div>
  );
};

export default CoachesSection;

