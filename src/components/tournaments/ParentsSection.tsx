// src/components/tournaments/ParentsSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Bell, Heart, Share2, Play, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Smartphone,
    title: 'Mobile-First Experience',
    description: 'Watch games and check stats from anywhere with our intuitive mobile app.',
  },
  {
    icon: Play,
    title: 'Live Game Viewing',
    description: 'Never miss a game with live streaming and instant notifications when games start.',
  },
  {
    icon: Heart,
    title: 'Player Highlights',
    description: 'Automatically generated highlights featuring your player\'s best moments.',
  },
  {
    icon: Bell,
    title: 'Real-Time Updates',
    description: 'Get instant notifications for scores, game starts, and important updates.',
  },
  {
    icon: BarChart3,
    title: 'Player Stats',
    description: 'Track your player\'s performance with detailed statistics and progress over time.',
  },
  {
    icon: Share2,
    title: 'Easy Sharing',
    description: 'Share highlights and achievements on social media with one tap.',
  },
];

const ParentsSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-block mb-4">
          <span className="bg-lk-accent/20 text-lk-primary px-4 py-2 rounded-full text-sm font-semibold">
            FOR PARENTS
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-lk-primary mb-4">
          Stay Connected to Every Game
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Watch your player compete live, get instant updates, and share their achievements with family and friends.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-all border-2 hover:border-lk-accent">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-lk-accent/10 text-lk-accent">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Mobile App Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-8 items-center"
      >
        <div>
          <h3 className="text-3xl font-bold text-lk-primary mb-4">
            Everything You Need in Your Pocket
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Our mobile app puts the entire tournament experience at your fingertips. 
            Watch live games, check scores, view highlights, and track your player's stats—all from your phone.
          </p>
          <ul className="space-y-4">
            {[
              'Live game streaming with DVR controls',
              'Push notifications for game starts and scores',
              'Player highlight reels automatically generated',
              'Social sharing for achievements and moments',
              'Offline viewing of recorded games',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 bg-lk-accent rounded-full flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="bg-gradient-to-br from-lk-primary to-lk-accent rounded-3xl p-8 shadow-2xl">
            <div className="bg-white rounded-2xl p-6 space-y-4">
              {/* Mock Mobile Screen */}
              <div className="bg-lk-background rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-lk-primary">Live Game</div>
                  <div className="flex items-center gap-1 text-red-500 text-xs">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    LIVE
                  </div>
                </div>
                <div className="bg-white rounded p-3 border-2 border-lk-accent">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lk-primary">Eagles</span>
                    <span className="text-2xl font-bold">42</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lk-primary">Panthers</span>
                    <span className="text-2xl font-bold">38</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center p-2 bg-gray-100 rounded">
                    <div className="font-semibold text-lk-primary">Q3</div>
                    <div className="text-gray-600">5:32</div>
                  </div>
                  <div className="text-center p-2 bg-gray-100 rounded">
                    <div className="font-semibold text-lk-primary">#23</div>
                    <div className="text-gray-600">18 PTS</div>
                  </div>
                  <div className="text-center p-2 bg-gray-100 rounded">
                    <div className="font-semibold text-lk-primary">Highlights</div>
                    <div className="text-gray-600">12 clips</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ParentsSection;

