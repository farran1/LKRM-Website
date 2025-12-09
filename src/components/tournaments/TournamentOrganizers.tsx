// src/components/tournaments/TournamentOrganizers.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Trophy, BarChart3, Settings, CreditCard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TournamentTimeline } from './TournamentTimeline';
import { AnimatedCounter } from '@/components/ui/animated-counter';

const features = [
  {
    icon: Users,
    title: 'Team Registration',
    description: 'Streamlined registration process with automated team management and roster verification.',
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Automated bracket generation and scheduling with conflict detection and optimization.',
  },
  {
    icon: Trophy,
    title: 'Bracket Management',
    description: 'Interactive brackets with real-time updates and automatic progression tracking.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Comprehensive tournament analytics including attendance, engagement, and performance metrics.',
  },
  {
    icon: Settings,
    title: 'Custom Configuration',
    description: 'Fully customizable tournament settings, rules, and scoring systems.',
  },
  {
    icon: CreditCard,
    title: 'Payment Processing',
    description: 'Integrated payment system for registration fees and ticket sales.',
  },
];

const TournamentOrganizers: React.FC = () => {
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
            FOR TOURNAMENT ORGANIZERS
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-lk-primary mb-4">
          Everything You Need to Run Successful Tournaments
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Powerful tools to manage every aspect of your tournament from registration to championship.
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

      {/* Visual Mockup Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-lk-primary to-lk-accent rounded-2xl p-8 md:p-12 text-white"
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-4">Tournament Dashboard</h3>
            <p className="text-lg text-white/90 mb-6">
              Get a complete overview of your tournament at a glance. Monitor registrations, 
              track game progress, and manage everything from one central dashboard.
            </p>
            <ul className="space-y-3">
              {[
                'Real-time registration tracking',
                'Automated bracket generation',
                'Live game status updates',
                'Revenue and attendance analytics',
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/80">Total Teams</span>
                <span className="text-2xl font-bold">
                  <AnimatedCounter value={32} />
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Games Completed</span>
                <span className="text-2xl font-bold">
                  <AnimatedCounter value={24} />/31
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Live Games</span>
                <span className="text-2xl font-bold">
                  <AnimatedCounter value={4} />
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Total Revenue</span>
                <span className="text-2xl font-bold">
                  $<AnimatedCounter value={12450} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TournamentOrganizers;

