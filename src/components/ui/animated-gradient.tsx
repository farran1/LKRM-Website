// src/components/ui/animated-gradient.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedGradientProps {
  colors?: string[];
  duration?: number;
  className?: string;
  children?: React.ReactNode;
}

export const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colors = ['#064462', '#39A78D', '#064462'],
  duration = 10,
  className = '',
  children,
}) => {
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`,
            `linear-gradient(135deg, ${colors[1]}, ${colors[2] || colors[0]})`,
            `linear-gradient(225deg, ${colors[2] || colors[0]}, ${colors[0]})`,
            `linear-gradient(315deg, ${colors[0]}, ${colors[1]})`,
            `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`,
          ],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
};

