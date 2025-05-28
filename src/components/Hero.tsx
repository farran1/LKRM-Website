import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  return (
    <section className="min-h-[65vh] sm:min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 relative transition-all duration-300">
      <div className="max-w-4xl mx-auto px-2 text-center w-full">
        <h1 className="text-4xl md:text-7xl font-extrabold text-gray-900 mb-3 md:mb-6 uppercase tracking-tight transition-all duration-300 animate-fade-in">
          Coaching <span className="text-blue-600">Reimagined</span>
        </h1>
        {/* Decorative downward arrow connecting H1 to subhead */}
        <div className="flex flex-col items-center -mt-3 mb-3">
          <ChevronDown size={32} className="text-blue-400 animate-bounce-slow" />
        </div>
        <h2 className="text-lg md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-snug animate-fade-in transition-all duration-500">
          A suite of powerful tools designed to save High School Coaches time & money by reducing their administrative burden.
        </h2>
        {/* CTA primary */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-9 animate-fade-in">
          <button
            onClick={() => scrollToSection('features')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md hover:scale-105 focus:scale-105 duration-200"
          >
            See How LKRM Works
            <ArrowRight size={20} />
          </button>
          {/* Secondary micro-CTA (e.g., email capture placeholder) */}
          <form
            className="flex w-full sm:w-auto items-center bg-white rounded-lg px-3 py-2 border border-gray-200 focus-within:shadow-lg transition-all duration-150"
            onSubmit={e => { e.preventDefault(); /* handle email submit here */ }}
          >
            <input
              type="email"
              placeholder="Sign Up for a Free Demo"
              className="bg-transparent outline-none border-none text-sm flex-1 px-2"
              required
            />
            <button
              type="submit"
              className="ml-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded font-semibold text-sm transition-colors duration-200"
            >
              Sign Up
            </button>
          </form>
        </div>
        <button
          onClick={() => scrollToSection('features')}
          className="animate-bounce mt-2"
        >
          <ChevronDown size={32} className="text-gray-400" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
