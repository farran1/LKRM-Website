
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Features from '../components/Features';
import Hero from '../components/Hero';
import PilotProgram from '../components/PilotProgram';
import Outcomes from '../components/Outcomes';
import Footer from '../components/Footer';

// Helper for formatting the timer
const formatTimer = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
};

const Index = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [countdownValue, setCountdownValue] = useState(100);
  const [isCountdownVisible, setIsCountdownVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [deadlineTimer, setDeadlineTimer] = useState(8100); // e.g. 2h15m for demo

  // Scroll progress for progress bar (0-1)
  useEffect(() => {
    const handleScroll = () => {
      const sectionOrder = [
        { id: 'features' },
        { id: 'pilot-program' },
        { id: 'outcomes' },
      ];
      let progress = 0;
      let found = false;

      sectionOrder.forEach((section, i) => {
        const el = document.getElementById(section.id);
        if (el && !found) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom > 0) {
            found = true;
            progress = (i + Math.min(1, (window.innerHeight / 2 - rect.top) / rect.height)) / sectionOrder.length;
          }
        }
      });

      if (!found) {
        // At top/bottom
        if (window.scrollY < 100) {
          progress = 0;
        } else {
          progress = 1;
        }
      }

      setScrollProgress(Math.max(0, Math.min(1, progress)));

      // Animate feature sync as before
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCountdownVisible]);

  // Animate countdown for pilot spots
  useEffect(() => {
    if (isCountdownVisible && countdownValue > 20) {
      const timer = setTimeout(() => {
        setCountdownValue(prev => Math.max(20, prev - 5));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [countdownValue, isCountdownVisible]);

  // Deadline timer for pilot program section (e.g. 2h15m)
  useEffect(() => {
    if (deadlineTimer > 0) {
      const inter = setInterval(() => {
        setDeadlineTimer((sec) => (sec > 0 ? sec - 1 : 0));
      }, 1000);
      return () => clearInterval(inter);
    }
  }, [deadlineTimer]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Responsive/fixed nav + animated progress bar
  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navigation */}
      <nav
        className={`
          fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md
          rounded-full px-8 py-3 shadow-lg border border-gray-200 flex flex-col items-center
          w-[95vw] max-w-xl
          transition-all
        `}
        style={{ minWidth: 240 }}
      >
        <div className="flex space-x-8 justify-center items-center w-full">
          {['Features', 'Pilot Program', 'Outcomes'].map((item, idx) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
              className={`
                text-xs md:text-sm font-semibold tracking-widest uppercase text-gray-700
                hover:text-blue-600 transition-all duration-300
                hover:scale-105 focus:scale-105
                px-2
                ${scrollProgress >= idx/3 && scrollProgress < (idx+1)/3 ? "text-blue-600 font-bold" : ""}
                relative
                animate-fade-in
              `}
              style={{ letterSpacing: 2 }}
            >
              {item}
            </button>
          ))}
        </div>
        {/* Animated progress bar */}
        <div className="w-full flex justify-center items-end relative">
          <div className="absolute left-0 bottom-0 w-full h-2 pointer-events-none">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-300"
              style={{
                width: `${Math.max(2, scrollProgress * 100)}%`,
                boxShadow: scrollProgress > 0.01 ? '0 1px 6px 1px rgba(30,80,200,0.10)' : 'none',
                transition: 'width 0.4s cubic-bezier(.44,0,.56,1)'
              }}
            />
            <div className="absolute top-0 bottom-0 left-0 right-0 rounded-full border border-blue-100 pointer-events-none" />
          </div>
        </div>
      </nav>
      {/* Spacer so nav doesn't overlap */}
      <div className="h-24 md:h-24"></div>

      <Hero scrollToSection={scrollToSection} />
      <Features activeFeature={activeFeature} />
      <PilotProgram countdownValue={countdownValue} deadlineSeconds={deadlineTimer} />
      <Outcomes />
      <Footer />
    </div>
  );
};

export default Index;

