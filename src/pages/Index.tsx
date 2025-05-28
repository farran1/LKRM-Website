
import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Features from '../components/Features';
import Hero from '../components/Hero';
import PilotProgram from '../components/PilotProgram';
import Outcomes from '../components/Outcomes';
import Footer from '../components/Footer';

const Index = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [countdownValue, setCountdownValue] = useState(100);
  const [isCountdownVisible, setIsCountdownVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        const rect = featuresSection.getBoundingClientRect();
        const sectionHeight = rect.height;
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - window.innerHeight)));
        const featureIndex = Math.floor(scrollProgress * 5); // 5 features total
        setActiveFeature(Math.min(featureIndex, 4)); // 0-4 index range
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
  }, [isCountdownVisible]);

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

      <Hero scrollToSection={scrollToSection} />
      <Features activeFeature={activeFeature} />
      <PilotProgram countdownValue={countdownValue} />
      <Outcomes />
      <Footer />
    </div>
  );
};

export default Index;
