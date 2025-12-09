import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import Footer from "../components/Footer";

const HighSchool: React.FC = () => {
  return (
    <div className="min-h-screen bg-lk-background text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Coaching Platform Overview</h1>
        </div>
        <p className="text-lg text-slate-700 mb-6 max-w-3xl">
          We’re polishing this page for a focused coach experience. Interested
          in early access? Head back and join the waitlist so we can tailor the
          onboarding to your program.
        </p>
        <Link to="/#waitlist">
          <Button className="bg-lk-accent text-lk-background hover:bg-lk-primary">
            Join the waitlist
          </Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default HighSchool;

