// src/components/tournaments/TournamentHero.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, TrendingUp, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CALENDLY_URL } from '@/config';

interface TournamentHeroProps {
  scrollToSection: (sectionId: string) => void;
}

const TournamentHero: React.FC<TournamentHeroProps> = ({ scrollToSection }) => {
  return (
    <section
      className="
        relative flex items-start justify-center
        pt-24 md:pt-28 pb-12
        before:content-[''] before:absolute before:inset-0
        before:bg-[url('/front-view-man-holding-basketball.jpg')] before:bg-cover before:bg-center
        before:opacity-30 before:brightness-50
      "
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full pt-8">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex flex-wrap items-center justify-center gap-2 bg-lk-accent/20 text-lk-primary px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 text-xs sm:text-sm font-semibold"
        >
          <Radio className="h-3 w-3 sm:h-4 sm:w-4 animate-pulse shrink-0" />
          <span className="text-center">Live Stats • Real-Time Updates • Instant Highlights</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="
            text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold
            text-white mb-6
            leading-tight
          "
        >
          Basketball Tournaments
          <br />
          <span className="text-lk-accent">Reimagined</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="
            text-lg md:text-2xl font-medium
            text-lk-primary mb-8 max-w-3xl mx-auto
            leading-relaxed
          "
        >
          Experience tournaments like never before with instant real-time stats, 
          live streaming, and AI-powered highlights. Built for organizers, coaches, and parents.
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-6"
        >
          {[
            { icon: TrendingUp, text: 'Real-Time Stats' },
            { icon: Play, text: 'Live Streaming' },
            { icon: Radio, text: 'Instant Highlights' },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-lk-primary text-sm border border-white/30"
            >
              <feature.icon className="h-4 w-4 text-lk-primary" />
              <span>{feature.text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full px-4"
        >
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="
                w-full sm:w-auto bg-lk-accent text-lk-background px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg
                hover:bg-lk-primary transition-all
                shadow-lg hover:shadow-xl
                flex items-center justify-center gap-2
              "
            >
              Get Started Free
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </a>
          <Button
            size="lg"
            className="
              w-full sm:w-auto bg-white/85 text-lk-primary border-2 border-lk-accent px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg
              hover:bg-white shadow-md hover:shadow-lg backdrop-blur-sm
              flex items-center justify-center gap-2
            "
            onClick={() => scrollToSection('live-stats')}
          >
            <Play className="h-4 w-4 sm:h-5 sm:w-5" />
            See It In Action
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8"
        >
          <button
            onClick={() => scrollToSection('features')}
            className="animate-bounce text-white/80 hover:text-white transition-colors"
            aria-label="Scroll down"
          >
            <ArrowRight className="h-6 w-6 rotate-90 mx-auto" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TournamentHero;

