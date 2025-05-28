
import React from 'react';
import { TrendingUp, Trophy, Users2, Target } from 'lucide-react';

const Outcomes: React.FC = () => {
  const outcomes = [
    {
      icon: TrendingUp,
      title: "40% Time Savings",
      description: "Reduce administrative tasks and focus more on coaching"
    },
    {
      icon: Trophy,
      title: "Better Performance",
      description: "Data-driven insights lead to improved team results"
    },
    {
      icon: Users2,
      title: "Enhanced Communication",
      description: "Streamlined communication with players, parents, and staff"
    },
    {
      icon: Target,
      title: "Goal Achievement",
      description: "Track and achieve your season objectives more effectively"
    }
  ];

  return (
    <section id="outcomes" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Proven Results
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the impact that streamlined coaching management has on teams across the country
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {outcomes.map((outcome, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {React.createElement(outcome.icon, { size: 32, className: "text-blue-600" })}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{outcome.title}</h3>
              <p className="text-gray-600">{outcome.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg p-8 shadow-lg inline-block">
            <blockquote className="text-xl text-gray-700 italic mb-4">
              "This platform transformed how I manage my team. I can focus on what I love most - coaching - 
              while the system handles everything else seamlessly."
            </blockquote>
            <cite className="text-gray-600 font-semibold">
              — Coach Sarah Johnson, Lincoln High School Basketball
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Outcomes;
