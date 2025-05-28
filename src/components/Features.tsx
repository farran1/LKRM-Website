
import React from 'react';
import { Monitor, Calendar, Users, MessageSquare, DollarSign, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface FeaturesProps {
  activeFeature: number;
}

const Features: React.FC<FeaturesProps> = ({ activeFeature }) => {
  const features = [
    {
      title: "Dashboard",
      icon: Monitor,
      points: [
        "Real-time performance analytics and insights",
        "Centralized view of all team activities",
        "Customizable widgets for quick access to key metrics"
      ]
    },
    {
      title: "Season Planning",
      icon: Calendar,
      points: [
        "Automated schedule generation and conflict resolution",
        "Practice and game planning templates",
        "Integration with school calendar systems"
      ]
    },
    {
      title: "Task Delegation",
      icon: Users,
      points: [
        "Assign responsibilities to assistant coaches and staff",
        "Track completion status with automated reminders",
        "Role-based access control for sensitive information"
      ]
    },
    {
      title: "Communication",
      icon: MessageSquare,
      points: [
        "Multi-channel messaging system for team coordination",
        "Parent and student notification management",
        "Integration with popular communication platforms"
      ]
    },
    {
      title: "Budgeting / Expenses",
      icon: DollarSign,
      points: [
        "Track equipment purchases and maintenance costs",
        "Generate budget reports for administration",
        "Automated expense categorization and approval workflows"
      ]
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Device Mockup */}
          <div className="w-full">
            <div className="bg-gray-800 rounded-xl p-3 shadow-xl sticky top-32 max-w-md mx-auto">
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="bg-gray-100 p-2 border-b">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="p-6 h-64 flex items-center justify-center">
                  <div className="text-center">
                    {React.createElement(features[activeFeature].icon, { size: 48, className: "text-blue-600 mx-auto mb-3" })}
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{features[activeFeature].title}</h4>
                    <p className="text-gray-600 text-sm">Interactive {features[activeFeature].title.toLowerCase()} interface</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Active Feature Content */}
          <div className="w-full">
            <div className="sticky top-32">
              <div className="transition-all duration-500 ease-in-out">
                <div className="flex items-center mb-6">
                  {React.createElement(features[activeFeature].icon, { size: 32, className: "text-blue-600 mr-4" })}
                  <h3 className="text-3xl font-bold text-gray-900">{features[activeFeature].title}</h3>
                </div>
                <ul className="space-y-4">
                  {features[activeFeature].points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start">
                      <CheckCircle size={20} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-lg">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Spacer for scroll-triggered feature changes */}
        <div className="h-[200vh]"></div>
      </div>
    </section>
  );
};

export default Features;
