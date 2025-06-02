// src/components/Features.tsx
import React from 'react';
import {
  Monitor,
  Calendar,
  Users,
  MessageSquare,
  DollarSign,
} from 'lucide-react';
import { StickyScroll, StickyFeature } from './ui/sticky-scroll-reveal';

const features: StickyFeature[] = [
  {
    title: 'Dashboard',
    icon: Monitor,
    image: '/Dashboard.png',
    points: [
      'Real-time performance analytics and insights',
      'Centralized view of all team activities',
      'Customizable widgets for quick access to key metrics',
    ],
  },
  {
    title: 'Season Planning',
    icon: Calendar,
    image: '/Calendar View.png',
    points: [
      'Automated schedule generation and conflict resolution',
      'Practice and game planning templates',
      'Integration with school calendar systems',
    ],
  },
  {
    title: 'Task Delegation',
    icon: Users,
    image: '/Tasks.png',
    points: [
      'Assign responsibilities to assistant coaches and staff',
      'Track completion status with automated reminders',
      'Role-based access control for sensitive information',
    ],
  },
  {
    title: 'Communication',
    icon: MessageSquare,
    image: '/Emails-1.png',
    points: [
      'Multi-channel messaging system for team coordination',
      'Parent and student notification management',
      'Integration with popular communication platforms',
    ],
  },
  {
    title: 'Budgeting / Expenses',
    icon: DollarSign,
    image: '/Budget-3.png',
    points: [
      'Track equipment purchases and maintenance costs',
      'Generate budget reports for administration',
      'Automated expense categorization and approval workflows',
    ],
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-10 bg-lk-background">
      <StickyScroll content={features} />
    </section>
  );
};

export default Features;
