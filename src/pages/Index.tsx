// src/pages/Index.tsx
import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import Hero from '../components/Hero';
import Features from '../components/Features';
import PilotProgram from '../components/PilotProgram';
import Outcomes from '../components/Outcomes';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [countdownValue, setCountdownValue] = useState(100);
  const [isCountdownVisible, setIsCountdownVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [deadlineTimer, setDeadlineTimer] = useState(181000);

  // full-page scroll progress (0–1)
  useEffect(() => {
    const handler = () => {
      const top = document.documentElement.scrollTop;
      const full = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(Math.min(Math.max(top / full, 0), 1));
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // pilot spots countdown (100 → 20)
  useEffect(() => {
    if (isCountdownVisible && countdownValue > 20) {
      const t = setTimeout(() => setCountdownValue(v => Math.max(20, v - 3)), 50);
      return () => clearTimeout(t);
    }
  }, [countdownValue, isCountdownVisible]);

  // deadline timer tick
  useEffect(() => {
    if (deadlineTimer > 0) {
      const id = setInterval(() => setDeadlineTimer(s => Math.max(s - 1, 0)), 1000);
      return () => clearInterval(id);
    }
  }, [deadlineTimer]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-lk-background">
      {/* Full-width frosted bar behind logo & nav */}
      <div
        className="fixed top-0 left-0 w-full h-14 md:h-20 bg-white/30 backdrop-blur-sm z-30"
        style={{ WebkitBackdropFilter: 'blur(8px)', backdropFilter: 'blur(8px)' }}
      />

      {/* Logo, floated above the bar */}
      <Logo
        className="fixed top-0 left-2 h-12 w-auto text-lk-primary z-50 md:top-0 md:left-4 md:h-20"
        aria-label="LKRM Logo"
      />

      {/* CTA Button - Desktop only */}
      <a
        href="https://calendly.com/andrew-lkrmsports/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:inline-block fixed top-4 right-8 z-50 bg-lk-accent text-lk-background px-6 py-2 rounded-lg font-semibold shadow hover:bg-lk-primary transition"
      >
        Request Free Demo
      </a>

      {/* CTA Button - Mobile only */}
      <a
        href="https://calendly.com/andrew-lkrmsports/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden fixed top-2 right-2 z-50 bg-lk-accent text-lk-background px-4 py-2 rounded-lg font-semibold shadow hover:bg-lk-primary transition text-sm"
      >
        Request Free Demo
      </a>

      {/* Nav pill */}
      <nav
        className="
          fixed top-16 md:top-5 left-1/2 transform -translate-x-1/2 z-40
          bg-lk-background/90 rounded-full px-3 py-2 shadow-md overflow-hidden
          w-[98vw] max-w-xs
          md:px-6 md:py-3 md:w-[90vw] md:max-w-md
        "
      >
        <div className="flex items-center justify-center space-x-8">
          {['Features', 'Pilot Program', 'Outcomes'].map(sec => (
            <button
              key={sec}
              onClick={() => scrollToSection(sec.toLowerCase().replace(' ', '-'))}
              className="text-sm font-medium uppercase tracking-wide text-gray-700 hover:text-lk-primary focus:outline-none"
            >
              {sec}
            </button>
          ))}
        </div>

        {/* bottom-flush progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden">
          <div
            className="h-full bg-lk-primary rounded-b-full transition-all duration-200"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </nav>

      {/* Page sections */}
      <Hero scrollToSection={scrollToSection} />
      <Features />

      <PilotProgram
        countdownValue={countdownValue}
        deadlineSeconds={deadlineTimer}
        onVisible={() => setIsCountdownVisible(true)}
      />
      <Outcomes />
      <Footer />
    </div>
  );
};

export default Index;
