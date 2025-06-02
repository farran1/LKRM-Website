"use client";
import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

export interface StickyFeature {
  title: string;
  icon: React.ComponentType<{ size?: string | number; className?: string }>;
  points: string[];
  image?: string;
}

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: StickyFeature[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);

  // Helper to clamp navigation
  const goTo = (idx: number) => {
    if (idx < 0 || idx >= content.length) return;
    setActiveCard(idx);
  };

  // Carousel indices
  const prevIdx = activeCard > 0 ? activeCard - 1 : null;
  const nextIdx = activeCard < content.length - 1 ? activeCard + 1 : null;

  return (
    <section className="px-3">
      <div className="w-full mx-auto h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start h-full">
          {/* Left: static mockup card with fixed height */}
          <div className="lg:col-span-8 h-full p-0 m-0 flex items-center justify-center">
            {content[activeCard].image ? (
              <img
                src={content[activeCard].image}
                alt={content[activeCard].title + ' mockup'}
                className="max-w-5xl max-h-[90%] w-full h-full"
                style={{ display: 'block' }}
              />
            ) : content[activeCard].icon ? (
              <div className="w-full h-full flex items-center justify-center">
                {React.createElement(content[activeCard].icon, {
                  size: 120,
                  className: 'text-blue-600',
                })}
              </div>
            ) : null}
          </div>
          {/* Right: carousel-style feature text */}
          <div className="lg:col-span-4 h-full flex flex-col items-center justify-center relative select-none">
            {/* Up arrow, now above the preview group */}
            {prevIdx !== null && (
              <button
                className="mx-auto mb-6 bg-white/80 hover:bg-white shadow rounded-full p-1 border border-gray-200 transition z-10"
                style={{ position: 'relative', top: 0 }}
                onClick={() => goTo(prevIdx)}
                aria-label="Previous feature"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><polyline points="18 15 12 9 6 15"></polyline></svg>
              </button>
            )}
            {/* Previous preview */}
            {prevIdx !== null && (
              <div
                className="opacity-40 pointer-events-auto cursor-pointer mb-6 transition-all duration-300 hover:opacity-60"
                onClick={() => goTo(prevIdx)}
              >
                <FeatureCard feature={content[prevIdx]} preview />
              </div>
            )}
            {/* Current feature */}
            <div className="relative z-10 bg-white rounded-xl shadow-xl p-6 mb-3">
              <FeatureCard feature={content[activeCard]} />
            </div>
            {/* Next preview */}
            {nextIdx !== null && (
              <div
                className="opacity-40 pointer-events-auto cursor-pointer mt-3 transition-all duration-300 hover:opacity-60"
                onClick={() => goTo(nextIdx)}
              >
                <FeatureCard feature={content[nextIdx]} preview />
              </div>
            )}
            {/* Down arrow, now below the preview group */}
            {nextIdx !== null && (
              <button
                className="mx-auto mt-6 bg-white/80 hover:bg-white shadow rounded-full p-1 border border-gray-200 transition z-10"
                style={{ position: 'relative', bottom: 0 }}
                onClick={() => goTo(nextIdx)}
                aria-label="Next feature"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper card for feature rendering
function FeatureCard({ feature, preview }: { feature: StickyFeature; preview?: boolean }) {
  return (
    <div>
      <div className="flex items-center mb-4">
        {feature.icon &&
          React.createElement(feature.icon, {
            size: preview ? 24 : 32,
            className: 'text-blue-600 mr-4',
          })}
        <h3 className={cn("text-2xl font-bold text-gray-900", preview && "truncate")}>{feature.title}</h3>
      </div>
      <ul className="space-y-3 relative">
        {feature.points.map((pt, i) =>
          preview ? (
            i === 0 ? (
              <li key={i} className="flex items-start space-x-3">
                <CheckCircle size={18} className="text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700 text-base">{pt}</span>
              </li>
            ) : null
          ) : (
            <li key={i} className="flex items-start space-x-3">
              <CheckCircle size={18} className="text-green-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700 text-base">{pt}</span>
            </li>
          )
        )}
        {/* Fade effect for preview if there are more points */}
        {preview && feature.points.length > 1 && (
          <li className="absolute left-0 right-0 bottom-0 h-6 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
        )}
      </ul>
    </div>
  );
} 