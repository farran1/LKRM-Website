
import React from 'react';
import { Users, Clock, Award, Timer } from 'lucide-react';

interface PilotProgramProps {
  countdownValue: number;
  deadlineSeconds?: number;
}

const formatTimer = (seconds: number) => {
  if (seconds == null) return "";
  const d = new Date(seconds * 1000).toISOString();
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

const PilotProgram: React.FC<PilotProgramProps> = ({ countdownValue, deadlineSeconds }) => {
  return (
    <section id="pilot-program" className="py-20 bg-blue-600">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-9 flex flex-col items-center">
          <div className="flex flex-row justify-center items-center gap-4 flex-wrap">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-1 animate-fade-in">
              Now Accepting The Top
            </h2>
            <span className="text-4xl md:text-5xl font-black text-yellow-300 mb-1 animate-bounce-slow transition-all duration-500">
              {countdownValue}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-1">Programs!!</h2>
          </div>
          {/* Countdown timer */}
          <div className="mt-2 flex flex-row items-center justify-center gap-2 animate-fade-in">
            <Timer size={20} className="text-yellow-200" />
            <span className="text-white bg-blue-800/60 rounded px-2 py-1 text-xs md:text-sm font-mono">
              Application closes in {formatTimer(deadlineSeconds ?? 0)}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <Users size={48} className="text-blue-200 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Exclusive Access</h3>
            <p className="text-blue-100">
              Get early access to all features and help shape the product roadmap
            </p>
          </div>
          <div className="text-center">
            <Clock size={48} className="text-blue-200 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">6-Month Program</h3>
            <p className="text-blue-100">
              Full access to the platform throughout your season at no cost
            </p>
          </div>
          <div className="text-center">
            <Award size={48} className="text-blue-200 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Priority Support</h3>
            <p className="text-blue-100">
              Direct line to our development team for feedback and support
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 mb-3">
            <span className="text-white text-lg mr-2">Only</span>
            <span className="text-3xl font-bold text-yellow-300">{countdownValue}</span>
            <span className="text-white text-lg ml-2">spots remaining</span>
          </div>
          <br />
          <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors text-lg shadow-md hover:scale-105 focus:scale-105 duration-150 animate-fade-in">
            Apply Now - Free
          </button>
        </div>
      </div>
    </section>
  );
};

export default PilotProgram;

