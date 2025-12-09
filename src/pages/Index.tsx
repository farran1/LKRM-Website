// src/pages/Index.tsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Gauge,
  Shield,
  Sparkles,
  Star,
  Trophy,
  Users,
  Video,
} from "lucide-react";
import Logo from "../components/Logo";
import { CALENDLY_URL } from "../config";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { supabase } from "../lib/supabase";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import Footer from "../components/Footer";
import { useToast } from "../components/ui/use-toast";

const personas = [
  {
    id: "coach",
    label: "Coaches",
    headline: "Win more games with organized prep and real-time insights.",
    bullets: [
      "Unified playbooks, schedules, and staff tasks",
      "Live stat capture with instant adjustments",
      "Mobile dashboards for game-day decisions",
    ],
  },
  {
    id: "athlete_family",
    label: "Athletes & Families",
    headline: "Showcase progress, stay informed, and never miss an update.",
    bullets: [
      "Player profiles with highlights and academics",
      "Notifications for games, changes, and results",
      "Simple communication with coaches and staff",
    ],
  },
  {
    id: "tournament_provider",
    label: "Tournament Providers",
    headline: "Deliver professional brackets, streaming, and real-time stats.",
    bullets: [
      "Bracket automation with live scoring",
      "Embedded streaming and sponsor placements",
      "Coach/parent portals with reliable updates",
    ],
  },
];

const steps = [
  {
    title: "Share your role",
    description: "Tell us if you're a coach, athlete/family, or provider.",
  },
  {
    title: "We tailor your onboarding",
    description: "We align the rollout to your goals and season timeline.",
  },
  {
    title: "Launch with support",
    description: "White-glove setup, training, and early feature access.",
  },
];

const proofPoints = [
  { icon: Shield, title: "Secure & Reliable", description: "Built on Supabase with enterprise-grade auth and data controls." },
  { icon: Gauge, title: "Performance First", description: "Mobile-fast experiences with low-latency stat updates." },
  { icon: Sparkles, title: "Built With Coaches", description: "Co-created with programs who need clarity, not clutter." },
];

const personaValueProps = [
  {
    title: "For Coaches",
    icon: Users,
    items: [
      "Practice, game, and travel calendars synced",
      "Live stats + shot charts for instant adjustments",
      "Roster, roles, and tasks to keep staff aligned",
    ],
  },
  {
    title: "For Athletes & Families",
    icon: Star,
    items: [
      "Progress tracking, highlights, and grades in one place",
      "Real-time alerts for schedule changes and scores",
      "Clear expectations from coaches and staff",
    ],
  },
  {
    title: "For Tournament Providers",
    icon: Trophy,
    items: [
      "Self-serve brackets, seeding, and scheduling",
      "Scoring + streaming in one clean experience",
      "Sponsor-ready pages with reliable uptime",
    ],
  },
];

const Index: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const personaChips = useMemo(
    () =>
      personas.map((persona) => (
        <div
          key={persona.id}
          className="rounded-full bg-white/80 text-lk-primary px-4 py-2 text-sm font-semibold shadow-sm border border-white/60 backdrop-blur"
        >
          {persona.label}
        </div>
      )),
    []
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const full_name = String(formData.get("full_name") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const role = String(formData.get("role") || "coach");
    const notes = String(formData.get("notes") || "").trim();

    if (!full_name || !email) {
      toast({
        title: "Missing info",
        description: "Add your name and email to join the waitlist.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setSuccessMessage(null);

    const { error } = await supabase.from("waitlist_submissions").insert({
      full_name,
      email,
      role,
      notes: notes || null,
      source: "landing",
    });

    if (error) {
      toast({
        title: "Could not save your spot",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    form.reset();
    setLoading(false);
    setSuccessMessage("You're on the list! We'll reach out with next steps.");
    toast({
      title: "You're in!",
      description: "We saved your spot on the waitlist.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lk-background via-white to-lk-background text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <Logo className="h-10 w-auto text-lk-primary" />
              <span className="hidden sm:inline text-sm font-semibold text-lk-primary">
                Basketball Operating System
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-3">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-lk-primary hover:text-lk-accent"
              >
                Book a demo
              </a>
              <Button className="bg-lk-accent text-lk-background hover:bg-lk-primary">
                Join waitlist
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 sm:pt-32 pb-16">
        <div className="absolute inset-0 bg-[url('/front-view-man-holding-basketball.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap gap-2">{personaChips}</div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-slate-900">
                One platform for coaches, athletes, families, and tournaments.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl">
                LKRM keeps everyone aligned: coaches run tighter programs,
                athletes showcase progress, families stay informed, and
                providers deliver professional tournament experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <a href="#waitlist">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-lk-accent text-lk-background hover:bg-lk-primary px-6 py-3 text-lg"
                  >
                    Join the waitlist
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </a>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-lk-primary text-lk-primary hover:bg-lk-primary/10 px-6 py-3 text-lg"
                  >
                    Book a demo
                  </Button>
                </a>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                {proofPoints.map((item, idx) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-2 text-lk-primary font-semibold">
                      <item.icon className="h-5 w-5" />
                      {item.title}
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 mb-3 text-lk-primary font-semibold">
                <CheckCircle2 className="h-5 w-5" />
                Early access
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Get early access and tailored onboarding
              </h3>
              <p className="text-slate-600 mt-2">
                Join the waitlist to secure priority onboarding and feature
                previews for your program or tournaments.
              </p>
              <div className="mt-4 space-y-3">
                {personas.map((persona) => (
                  <div
                    key={persona.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
                  >
                    <div className="font-semibold text-slate-900 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-lk-primary" />
                      {persona.label}
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      {persona.headline}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-lk-primary">
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Clear onboarding for every role
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We adapt the rollout to coaches, athletes/families, and tournament
              providers so everyone gets value on day one.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <Card
                key={step.title}
                className="border-2 border-slate-100 hover:border-lk-accent/60 transition-shadow shadow-sm"
              >
                <CardHeader className="flex flex-row items-start gap-3">
                  <div className="h-9 w-9 rounded-full bg-lk-accent/15 text-lk-primary font-bold flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                    <CardDescription className="text-base mt-1">
                      {step.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Persona value props */}
      <section className="py-16 bg-lk-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-lk-primary">
                Built for every seat
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Value for coaches, athletes, families, and providers
              </h2>
              <p className="text-lg text-slate-600 mt-2 max-w-2xl">
                No more scattered tools. LKRM aligns the whole basketball
                ecosystem so decisions and updates are fast and reliable.
              </p>
            </div>
            <div className="flex items-center gap-2 text-lk-primary font-semibold">
              <Shield className="h-5 w-5" />
              Secure. Mobile-first. Coach-approved.
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {personaValueProps.map((persona) => (
              <Card
                key={persona.title}
                className="border-2 border-slate-100 hover:border-lk-accent/60 transition-shadow shadow-sm"
              >
                <CardHeader className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-lk-accent/15 text-lk-primary">
                    <persona.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{persona.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-slate-700">
                    {persona.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-lk-accent mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-lk-primary">
              Platform highlights
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Everything you need to keep teams and tournaments in sync
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Real-time stats, streaming, calendars, and communication built to
              reduce friction on game day.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Video,
                title: "Streaming + Stats",
                description:
                  "Live scoring, shot charts, and streams in one clean view.",
              },
              {
                icon: Calendar,
                title: "Scheduling that sticks",
                description:
                  "Smart calendars for practices, travel, and tournaments.",
              },
              {
                icon: BarChart3,
                title: "Insights that win",
                description:
                  "Staff dashboards with the data needed to adjust in minutes.",
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="border-2 border-slate-100 hover:border-lk-accent/60 transition-shadow shadow-sm"
              >
                <CardHeader className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-lk-accent/15 text-lk-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-slate-700">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist form */}
      <section id="waitlist" className="py-18 bg-lk-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-lk-primary">
                Join the waitlist
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Get early access and rollout support
              </h2>
              <p className="text-lg text-slate-600">
                We prioritize programs that want to launch quickly. Secure your
                spot and we'll tailor onboarding to your role.
              </p>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <Shield className="h-4 w-4 text-lk-primary" />
                Data secured by Supabase. No spam.
              </div>
            </div>
            <div className="lg:col-span-3">
              <Card className="border-2 border-slate-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Save my spot on the waitlist
                  </CardTitle>
                  <CardDescription className="text-base">
                    We’ll email you with onboarding steps and early-access
                    invitations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="full_name">Full name</Label>
                        <Input
                          id="full_name"
                          name="full_name"
                          placeholder="Jordan Taylor"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@program.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">I’m joining as</Label>
                      <select
                        id="role"
                        name="role"
                        className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lk-primary"
                        defaultValue="coach"
                      >
                        <option value="coach">Coach</option>
                        <option value="athlete_family">Athlete / Family</option>
                        <option value="tournament_provider">
                          Tournament Provider
                        </option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">What do you need most?</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        placeholder="e.g., Live stats for tournaments, roster management, parent updates..."
                        className="min-h-[90px]"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-lk-accent text-lk-background hover:bg-lk-primary"
                      disabled={loading}
                    >
                      {loading ? "Saving your spot..." : "Join the waitlist"}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    {successMessage && (
                      <div className="flex items-center gap-2 text-sm text-lk-primary bg-lk-accent/10 border border-lk-accent/30 rounded-md px-3 py-2">
                        <CheckCircle2 className="h-4 w-4" />
                        {successMessage}
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
              <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
                <Shield className="h-3 w-3" />
                We only use your info to coordinate onboarding and updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Ready to bring clarity to your program or tournament?
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Join the waitlist for early access or book time to see how LKRM can
            work for your season.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#waitlist">
              <Button className="bg-lk-accent text-lk-background hover:bg-lk-primary px-6 py-3 text-lg">
                Join the waitlist
              </Button>
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-lk-primary text-lk-primary hover:bg-lk-primary/10 px-6 py-3 text-lg"
              >
                Book a demo
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
