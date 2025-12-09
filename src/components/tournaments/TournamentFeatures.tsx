// src/components/tournaments/TournamentFeatures.tsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Video,
  Film,
  BarChart3,
  Trophy,
  Smartphone,
  Zap,
  Users,
  Calendar,
  Target,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { VelocityScroll } from '@/components/ui/scroll-based-velocity';

const features = [
  {
    icon: Activity,
    title: 'Real-Time Stats',
    description: 'Live game statistics updated instantly. Track scores, player performance, and team analytics as the action happens.',
    color: 'text-lk-accent',
  },
  {
    icon: Video,
    title: 'Live Streaming',
    description: 'Broadcast games live to fans worldwide. High-quality streaming with multi-camera support and instant replays.',
    color: 'text-red-500',
  },
  {
    icon: Film,
    title: 'Instant Highlights',
    description: 'AI-powered highlight generation. Get the best moments automatically compiled and ready to share.',
    color: 'text-purple-500',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Deep insights into team and player performance. Data-driven decisions for coaches and organizers.',
    color: 'text-blue-500',
  },
  {
    icon: Trophy,
    title: 'Tournament Brackets',
    description: 'Interactive brackets with automatic updates. Easy scheduling, seeding, and bracket management.',
    color: 'text-yellow-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile Access',
    description: 'Full-featured mobile app. Watch games, check stats, and get notifications on the go.',
    color: 'text-green-500',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Sub-second updates. No delays, no buffering. Experience the game as it happens.',
    color: 'text-orange-500',
  },
  {
    icon: Users,
    title: 'Team Management',
    description: 'Comprehensive team and player management. Rosters, schedules, and communication tools.',
    color: 'text-indigo-500',
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Automated scheduling with conflict detection. Optimize court usage and minimize delays.',
    color: 'text-pink-500',
  },
  {
    icon: Target,
    title: 'Performance Tracking',
    description: 'Track player development over time. Compare performance across seasons and tournaments.',
    color: 'text-cyan-500',
  },
];

const TournamentFeatures: React.FC = () => {
  // Create a scrolling text from feature titles
  const featureTitles = features.map(f => f.title).join(' • ');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-lk-primary mb-4">
          Everything You Need for Modern Tournaments
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Powerful features designed to elevate the tournament experience for everyone involved.
        </p>
      </motion.div>

      {/* Scroll-based velocity effect */}
      <div className="mb-12 py-8 bg-gradient-to-r from-lk-accent/10 via-lk-primary/10 to-lk-accent/10 rounded-2xl overflow-hidden">
        <VelocityScroll
          text={featureTitles}
          default_velocity={1}
          className="text-2xl md:text-3xl font-bold text-lk-primary"
        />
      </div>
    </div>
  );
};

export default TournamentFeatures;

