// src/pages/Tournaments.tsx
import React, { useState } from 'react';
import TournamentHero from '../components/tournaments/TournamentHero';
import TournamentFeatures from '../components/tournaments/TournamentFeatures';
import TournamentOrganizers from '../components/tournaments/TournamentOrganizers';
import CoachesSection from '../components/tournaments/CoachesSection';
import ParentsSection from '../components/tournaments/ParentsSection';
import LiveStatsDemo from '../components/tournaments/LiveStatsDemo';
import StreamingShowcase from '../components/tournaments/StreamingShowcase';
import TournamentBracket from '../components/tournaments/TournamentBracket';
import { ComparisonTool } from '../components/tournaments/ComparisonTool';
import { TournamentTimeline } from '../components/tournaments/TournamentTimeline';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import { CALENDLY_URL } from '../config';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Trophy, Users, Play, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Tournaments: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-lk-background">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-white/50 backdrop-blur-md z-50 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <Logo className="h-8 sm:h-10 w-auto text-lk-primary" />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <button
                onClick={() => scrollToSection('features')}
                className="text-sm lg:text-base text-gray-700 hover:text-lk-primary transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('live-stats')}
                className="text-sm lg:text-base text-gray-700 hover:text-lk-primary transition-colors"
              >
                Live Stats
              </button>
              <button
                onClick={() => scrollToSection('streaming')}
                className="text-sm lg:text-base text-gray-700 hover:text-lk-primary transition-colors"
              >
                Streaming
              </button>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-lk-accent text-lk-background hover:bg-lk-primary text-sm lg:text-base px-4 lg:px-6">
                  Get Started
                </Button>
              </a>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <button
                    onClick={() => scrollToSection('features')}
                    className="text-left text-lg font-medium text-gray-700 hover:text-lk-primary transition-colors py-2"
                  >
                    Features
                  </button>
                  <button
                    onClick={() => scrollToSection('live-stats')}
                    className="text-left text-lg font-medium text-gray-700 hover:text-lk-primary transition-colors py-2"
                  >
                    Live Stats
                  </button>
                  <button
                    onClick={() => scrollToSection('streaming')}
                    className="text-left text-lg font-medium text-gray-700 hover:text-lk-primary transition-colors py-2"
                  >
                    Streaming
                  </button>
                  <div className="pt-4 border-t">
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full bg-lk-accent text-lk-background hover:bg-lk-primary">
                        Get Started
                      </Button>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <TournamentHero scrollToSection={scrollToSection} />

      {/* Features Grid */}
      <section id="features" className="py-12 sm:py-16 lg:py-20 bg-white">
        <TournamentFeatures />
      </section>

      {/* Live Stats Demo */}
      <section id="live-stats" className="pt-0 pb-12 sm:pb-16 lg:pb-20 bg-lk-background">
        <LiveStatsDemo />
      </section>

      {/* Tournament Bracket */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <TournamentBracket />
      </section>

      {/* Tournament Timeline */}
      <section className="py-12 sm:py-16 lg:py-20 bg-lk-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TournamentTimeline
            events={[
              {
                id: '1',
                title: 'Registration Opens',
                date: 'March 1, 2024',
                status: 'completed',
                icon: Users,
                description: 'Team registration period begins',
              },
              {
                id: '2',
                title: 'Bracket Released',
                date: 'March 10, 2024',
                status: 'completed',
                icon: Trophy,
                description: 'Tournament bracket and schedule announced',
              },
              {
                id: '3',
                title: 'Tournament Games',
                date: 'March 15-24, 2024',
                status: 'current',
                icon: Play,
                description: 'Quarterfinals and semifinals in progress',
              },
              {
                id: '4',
                title: 'Championship Game',
                date: 'March 25, 2024',
                status: 'upcoming',
                icon: Trophy,
                description: 'Championship game at 7:00 PM',
              },
            ]}
          />
        </div>
      </section>

      {/* Additional Features Showcase */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-lk-primary mb-8 sm:mb-12 text-center">
            Advanced Analytics & Tools
          </h2>
          <div className="grid md:grid-cols-1 gap-6 sm:gap-8">
            <ComparisonTool
              players={[
                { name: 'Jordan Smith', points: 18.5, rebounds: 7.2, assists: 4.1, fgPercentage: 48.2, threePtPercentage: 36.8, ftPercentage: 72.4 },
                { name: 'Marcus Johnson', points: 12.3, rebounds: 5.1, assists: 8.2, fgPercentage: 45.1, threePtPercentage: 38.5, ftPercentage: 75.0 },
                { name: 'Chris Williams', points: 8.7, rebounds: 7.8, assists: 2.3, fgPercentage: 52.3, threePtPercentage: 0, ftPercentage: 68.9 },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Streaming & Highlights */}
      <section id="streaming" className="py-12 sm:py-16 lg:py-20 bg-lk-background">
        <StreamingShowcase />
      </section>

      {/* Audience-Specific Sections */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <TournamentOrganizers />
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-lk-background">
        <CoachesSection />
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <ParentsSection />
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-lk-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Ready to Transform Your Tournament Experience?
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-200">
            Join leading tournaments using LKRM for real-time stats, live streaming, and comprehensive analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="w-full sm:w-auto bg-lk-accent text-lk-background hover:bg-lk-accent/90 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6">
                Schedule a Demo
              </Button>
            </a>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white text-white bg-white/10 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6"
              onClick={() => scrollToSection('features')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Tournaments;

