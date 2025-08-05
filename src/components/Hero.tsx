import React, { useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Logo from './Logo';  // your inline Logo component

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const data = new FormData(form);

    await fetch('https://formspree.io/f/mvgroyqa', {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json',
      },
    });

    // Redirect to Calendly after successful submission
    window.location.href = 'https://calendly.com/andrew-lkrmsports/';
  };

  return (
    <section
      className="
        relative flex items-center justify-center
        min-h-[75vh] sm:min-h-[95vh] pt-32 md:pt-20
        before:content-[''] before:absolute before:inset-0
        before:bg-[url('/1.jpg')] before:bg-cover before:bg-center
        before:opacity-50 before:brightness-75
      "
    >

      <div className="relative z-6 max-w-7xl mx-auto px-2 text-center w-full">
        {/* Headline in white */}
        <h1 className="
            text-2xl sm:text-5xl md:text-7xl font-extrabold
            text-lk-primary mb-3 md:mb-6
            uppercase tracking-tight
            whitespace-nowrap
          ">
          Coach Smarter, Not Harder.
        </h1>

        {/* Sub-headline in white */}
        <h2 className="
            text-lg md:text-2xl font-bold
            text-lk-primary
            mb-8 max-w-3xl mx-auto leading-snug
          ">
          A suite of powerful tools designed to save High School Coaches time &amp; money
          by reducing administrative burdens.
        </h2>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-9">
          <button
            onClick={() => scrollToSection('features')}
            className="
              bg-lk-accent text-lk-background px-8 py-3 rounded-lg
              font-semibold hover:bg-lk-primary transition border border-lk-background
              flex items-center gap-2 shadow-md
            "
          >
            See How LKRM Works
            <ArrowRight size={20} />
          </button>

          <form
            ref={formRef}
            className="
              flex w-full sm:w-auto items-center
              bg-lk-background rounded-lg px-3 py-2
              border border-gray-200 transition-shadow
            "
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              name="email"
              placeholder="Sign Up for a Free Demo"
              className="bg-lk-background outline-none flex-1 px-2 text-gray-700 text-xs sm:text-base"
              required
            />
            <button
              type="submit"
              className="
                ml-1 bg-lk-background text-lk-primary px-3 py-1 rounded
                font-semibold text-sm hover:bg-gray-200 transition
              "
            >
              Sign Up
            </button>
          </form>
        </div>

        <button
          onClick={() => scrollToSection('features')}
          className="animate-bounce mt-2 text-white"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default Hero;