// src/components/tournaments/TournamentTimeline.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trophy, Users, Play, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  status: 'completed' | 'current' | 'upcoming';
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

interface TournamentTimelineProps {
  events: TimelineEvent[];
}

export const TournamentTimeline: React.FC<TournamentTimelineProps> = ({ events }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-lk-accent text-white';
      case 'current':
        return 'bg-lk-primary text-white animate-pulse';
      case 'upcoming':
        return 'bg-gray-300 text-gray-600';
      default:
        return 'bg-gray-300';
    }
  };

  const getIconColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-lk-accent';
      case 'current':
        return 'text-lk-primary';
      case 'upcoming':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300" />

      <div className="space-y-8">
        {events.map((event, index) => {
          const Icon = event.icon;
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-start gap-6"
            >
              {/* Icon */}
              <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${getStatusColor(event.status)}`}>
                <Icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <Card className="flex-1 border-2 hover:border-lk-accent transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-lk-primary">{event.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
                      {event.status === 'completed' ? 'Completed' : event.status === 'current' ? 'In Progress' : 'Upcoming'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  {event.description && (
                    <p className="text-sm text-gray-600">{event.description}</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

