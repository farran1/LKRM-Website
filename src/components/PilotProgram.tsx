
import React from 'react';
import { Users, Clock, Award } from 'lucide-react';

interface PilotProgramProps {
  countdownValue: number;
}

const PilotProgram: React.FC<PilotProgramProps> = ({ countdownValue }) => {
  return (
    <section id="pilot-program" className="py-20 bg-blue-600">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join Our Pilot Program
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Be among the first coaches to experience the future of team management. 
            Limited spots available for our exclusive beta program.
          </p>
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
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 mb-8">
            <span className="text-white text-lg mr-2">Only</span>
            <span className="text-3xl font-bold text-yellow-300">{countdownValue}</span>
            <span className="text-white text-lg ml-2">spots remaining</span>
          </div>
          <br />
          <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors text-lg">
            Apply Now - Free
          </button>
        </div>
      </div>
    </section>
  );
};

export default PilotProgram;
