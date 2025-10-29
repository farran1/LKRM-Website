import React from 'react';
import {
  Monitor,
  Calendar,
  Users,
  PlayCircleIcon,
  DollarSign,
} from 'lucide-react';

const features = [
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
      'Optimize your team\'s workflow',
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

const MobileFeatures: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 px-2 py-4">
      {features.map((feature, idx) => (
        <div key={feature.title} className="rounded-xl bg-white shadow p-4 flex flex-col gap-2">
          <div className="flex items-center gap-3 mb-1">
            {feature.icon && React.createElement(feature.icon, { size: 28, className: 'text-blue-600' })}
            <span className="text-lg font-bold text-gray-900">{feature.title}</span>
          </div>
          {feature.image && (
            <img src={feature.image} alt={feature.title + ' mockup'} className="w-full rounded-xl mb-2" />
          )}
          <ul className="list-disc pl-6 text-gray-700 text-base">
            {feature.points.map((pt, i) => (
              <li key={i}>{pt}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MobileFeatures; 