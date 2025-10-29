// src/components/Features.tsx
import React from 'react';
import {
  Monitor,
  Calendar,
  Users,
  MessageSquare,
  DollarSign,
  PlayCircleIcon,
} from 'lucide-react';
import { StickyScroll, StickyFeature } from './ui/sticky-scroll-reveal';
import MobileFeatures from './MobileFeatures';

const features: StickyFeature[] = [
  {
    title: 'Centralized Dashboard',
    icon: Monitor,
    image: '/Dashboard 1.png',
    points: [
      'All your team information in one place',
      'Never miss a detail with Gameday Checklist',
      'Two Clicks away from anything you need',
    ],
  },
  {
    title: 'Live Stats Tracking',
    icon: PlayCircleIcon,
    image: '/Live Stat Tracker.png',
    points: [
      'Real-time tracking of player/team statistics',
      'Live insights and reports before you lose',
      'Automatically update MaxPreps',
    ],
  },
  {
    title: 'Season Planning',
    icon: Calendar,
    image: '/Calendar View.png',
    points: [
      'Plan, schedule, and track every event detail',
      'Your natural planning process on our platform',
      'No more excuses for missing anything',
    ],
  },
  {
    title: 'Task Delegation',
    icon: Users,
    image: '/Tasks.png',
    points: [
      'Assign responsibilities amongst your staff',
      'Track progress with automated reminders',
      "Optimize your team's workflow",
    ],
  },
 
  {
    title: 'Budgeting / Expenses',
    icon: DollarSign,
    image: '/Budget-3.png',
    points: [
      'Plan, track, and review every expense',
      'Generate budget reports for administration',
      'Never handle a receipt again',
    ],
  },
];

const Features: React.FC = () => {
  // Use a simple window width check for SSR safety
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section id="features" className="py-0 bg-lk-background">
      {isMobile ? <MobileFeatures /> : <StickyScroll content={features} />}
    </section>
  );
};

export default Features;
