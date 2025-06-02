import React, { useEffect, useRef } from 'react';
import { Clock, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PilotProgramProps {
  countdownValue: number;      // animates 100 → 20
  deadlineSeconds: number;     // ticking deadline in seconds
  onVisible: () => void;       // called once when section enters view
}

export default function PilotProgram({
  countdownValue,
  deadlineSeconds,
  onVisible,
}: PilotProgramProps) {
  const ref = useRef<HTMLElement | null>(null);

  // Fire onVisible once when the section scrolls into view
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible();
          obs.disconnect();
        }
      },
      { root: null, threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [onVisible]);

  // Format seconds as HH:MM:SS
  const formatTimer = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, '0')}:${s
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <section
      id="pilot-program"
      ref={ref}
      className="py-20 bg-lk-primary text-white"
    >
      <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-bold">
          Now Accepting The Top{' '}
          <span className="text-yellow-400">{countdownValue}</span>{' '}
          Pilot
           Programs!!
        </h2>

        {/* Timer badge */}
        {/* <div className="inline-flex items-center bg-lk-primary/50 px-4 py-2 rounded-full text-sm space-x-2 mx-auto">
          <Clock size={20} />
          <span>
            First Round of Applications Clos in {formatTimer(deadlineSeconds)}
          </span>
        </div> */}
      </div>

      {/* Three-column perks */}
      <div className="mt-12 max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <Users size={48} className="opacity-75" />
          <h3 className="text-xl font-semibold">Exclusive Access</h3>
          <p className="text-sm">
            Get early access to all features and directly shape the product roadmap - deciding on all updates
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <Clock size={48} className="opacity-75" />
          <h3 className="text-xl font-semibold">1 Year Program</h3>
          <p className="text-sm">
            Full access to the platform before, during, and after your season for $1,500
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <Award size={48} className="opacity-75" />
          <h3 className="text-xl font-semibold">Priority Support</h3>
          <p className="text-sm">
            Direct line to our development team for feedback and support when you want it
          </p>
        </div>
      </div>

      {/* Spots remaining pill */}
      <div className="mt-12 flex justify-center">
        <div className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full text-sm space-x-1">
          <span>Only</span>
          <span className="text-yellow-400 font-bold">{14}</span>
          <span>spots remaining</span>
        </div>
      </div>

      {/* CTA button */}
      <div className="mt-8 flex justify-center">
        <Link to="/apply">
          <button className="bg-lk-accent text-lk-primary font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-lk-primary hover:text-lk-background border border-lk-background transition-colors">
            Apply Now – No Credit Card Required
          </button>
        </Link>
      </div>
    </section>
  );
}
