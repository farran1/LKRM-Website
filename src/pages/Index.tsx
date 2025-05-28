
import { useState, useEffect } from 'react';
import { ChevronDown, Monitor, Calendar, Users, MessageSquare, DollarSign, CheckCircle, ArrowRight } from 'lucide-react';

const Index = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [countdownValue, setCountdownValue] = useState(100);
  const [isCountdownVisible, setIsCountdownVisible] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        const rect = featuresSection.getBoundingClientRect();
        const sectionHeight = rect.height;
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - window.innerHeight)));
        const featureIndex = Math.floor(scrollProgress * features.length);
        setActiveFeature(Math.min(featureIndex, features.length - 1));
      }

      const pilotSection = document.getElementById('pilot-program');
      if (pilotSection) {
        const rect = pilotSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0 && !isCountdownVisible) {
          setIsCountdownVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCountdownVisible, features.length]);

  useEffect(() => {
    if (isCountdownVisible && countdownValue > 20) {
      const timer = setTimeout(() => {
        setCountdownValue(prev => Math.max(20, prev - 5));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [countdownValue, isCountdownVisible]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md rounded-full px-8 py-3 shadow-lg border border-gray-200">
        <div className="flex space-x-8">
          {['Features', 'Pilot Program', 'Outcomes'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
              className="text-sm font-medium tracking-wider uppercase text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105"
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent)] pointer-events-none"></div>
        <div className="text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6 tracking-tight">
            COACHING
            <br />
            <span className="text-blue-600">REIMAGINED</span>
          </h1>
          
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent w-32"></div>
            <ChevronDown className="mx-4 text-blue-600 animate-bounce" size={24} />
            <div className="h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent w-32"></div>
          </div>

          <h2 className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            A suite of powerful tools designed to save High School Coaches time & money by reducing their administrative burden.
          </h2>

          <button
            onClick={() => scrollToSection('features')}
            className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            See How LKRM Works
            <ArrowRight className="inline-block ml-2" size={20} />
          </button>

          <div className="mt-8">
            <p className="text-sm text-gray-500 mb-4">Sign up for a free demo</p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button className="bg-gray-900 text-white px-6 py-2 rounded-r-full hover:bg-gray-800 transition-colors">
                Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Device Mockup */}
            <div className="sticky top-32">
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

            {/* Right: Feature Content */}
            <div className="space-y-32">
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

      {/* Pilot Program Section */}
      <section id="pilot-program" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Now Accepting The Top{' '}
              <span className="text-blue-600 text-6xl font-black">
                {countdownValue}
              </span>{' '}
              Programs!!
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Eligibility */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Who Can Join</h3>
              <ul className="space-y-6">
                {[
                  'High School sports programs of any size',
                  'Commitment to pilot duration (6–8 weeks)',
                  'Willingness to provide feedback'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle size={24} className="text-green-500 mr-4 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Process Flow */}
            <div>
              <div className="space-y-8">
                {[
                  { step: '1', title: 'Application', desc: 'Submit your program details' },
                  { step: '2', title: 'Approval', desc: 'Review and acceptance process' },
                  { step: '3', title: 'Kick-off', desc: 'Begin your LKRM journey' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                    {index < 2 && (
                      <ArrowRight className="text-gray-400 ml-auto" size={24} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <button className="bg-blue-600 text-white px-12 py-4 rounded-full text-xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Apply Today
            </button>
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section id="outcomes" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Stats Row */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              { metric: '+35%', label: 'Efficiency' },
              { metric: '20', label: 'Pilot Partners' },
              { metric: '500+', label: 'Hours Saved' },
              { metric: '95%', label: 'Satisfaction' }
            ].map((stat, index) => (
              <div key={index} className="text-center bg-white p-8 rounded-2xl shadow-lg">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.metric}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Case Studies */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Lincoln High Athletics', result: '40% reduction in admin time' },
              { name: 'Roosevelt Football', result: 'Streamlined budget tracking' },
              { name: 'Jefferson Basketball', result: 'Improved team communication' }
            ].map((study, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-blue-600 font-bold text-xl">{study.name.split(' ')[0][0]}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{study.name}</h4>
                <p className="text-gray-600">{study.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Coaching Experience?</h2>
          <button className="bg-white text-blue-600 px-12 py-4 rounded-full text-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
            Get Started Today
          </button>
          <p className="mt-4 text-blue-100">No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-8 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
