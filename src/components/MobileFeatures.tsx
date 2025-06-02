import React from 'react';
import {
  Monitor,
  Calendar,
  Users,
  MessageSquare,
  DollarSign,
} from 'lucide-react';

const features = [
  {
    title: 'Dashboard',
    icon: Monitor,
    image: '/Dashboard.png',
    points: [
      'Centralized view of all team activities',
      'Never forget a detail with a custom Gameday Checklist',
      'Customizable widgets for quick access to key information',
    ],
  },
  {
    title: 'Season Planning',
    icon: Calendar,
    image: '/Calendar View.png',
    points: [
      'Plan, schedule, and track every event of your season',
      'Your natural planning process on our platform',
      'Integration with your existing calendar systems',
    ],
  },
  {
    title: 'Task Delegation',
    icon: Users,
    image: '/Tasks.png',
    points: [
      'Assign responsibilities amongst your entire staff',
      'Track completion status with automated reminders',
      'Optimize your team\'s workflow',
    ],
  },
  {
    title: 'Communication',
    icon: MessageSquare,
    image: '/Emails-1.png',
    points: [
      'Effortless communication with coaches, players, and parents',
      'Send and receive both emails and text messages from within the platform',
      'Automated reminders for instant communication',
    ],
  },
  {
    title: 'Budgeting / Expenses',
    icon: DollarSign,
    image: '/Budget-3.png',
    points: [
      'Plan, track, and review every expense of your season',
      'Generate budget reports for administration',
      'Never lose a receipt again with our automated receipt detail capture',
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
            <img src={feature.image} alt={feature.title + ' mockup'} className="w-full rounded mb-2" />
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