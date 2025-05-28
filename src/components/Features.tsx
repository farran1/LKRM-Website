
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
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Device Mockup */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="bg-gray-800 rounded-2xl p-4 shadow-2xl">
              <div className="bg-white rounded-xl overflow-hidden">
                <div className="bg-gray-100 p-4 border-b">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="p-8 h-96 flex items-center justify-center">
                  <div className="text-center">
                    {React.createElement(features[activeFeature].icon, { size: 64, className: "text-blue-600 mx-auto mb-4" })}
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{features[activeFeature].title}</h4>
                    <p className="text-gray-600">Interactive {features[activeFeature].title.toLowerCase()} interface</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle: Separator */}
          <div className="lg:col-span-1 flex justify-center">
            <Separator orientation="vertical" className="h-full min-h-[600px] hidden lg:block" />
            <Separator orientation="horizontal" className="w-full lg:hidden" />
          </div>

          {/* Right: Feature Content */}
          <div className="lg:col-span-6 space-y-32">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  activeFeature === index ? 'opacity-100' : 'opacity-30'
                }`}
              >
                <div className="flex items-center mb-6">
                  {React.createElement(feature.icon, { size: 32, className: "text-blue-600 mr-4" })}
                  <h3 className="text-3xl font-bold text-gray-900">{feature.title}</h3>
                </div>
                <ul className="space-y-4">
                  {feature.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start">
                      <CheckCircle size={20} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-lg">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
