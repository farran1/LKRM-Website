
import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 relative">
      {/* Logo placeholder in top left */}
      <div className="absolute top-8 left-8">
        <div className="w-16 h-16 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center shadow-md">
          <span className="text-gray-400 text-xs font-bold select-none">Logo</span>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          Coaching <span className="text-blue-600">Reimagined</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          The all-in-one platform designed to save high school coaches time & money by reducing their administrative burden.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button 
            onClick={() => scrollToSection('pilot-program')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            Join the Movement
            <ArrowRight size={20} />
          </button>
          <button 
            onClick={() => scrollToSection('features')}
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            How LKRM Works
          </button>
        </div>
        <button 
          onClick={() => scrollToSection('features')}
          className="animate-bounce"
        >
          <ChevronDown size={32} className="text-gray-400" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
