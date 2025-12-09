// src/components/tournaments/StreamingShowcase.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Film, Radio, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface Highlight {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
}

const StreamingShowcase: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const highlights: Highlight[] = [
    { id: '1', title: 'Game-Winning Three Pointer', thumbnail: '/Hero-Pic.jpg', duration: '0:15', views: 1250 },
    { id: '2', title: 'Amazing Alley-Oop Dunk', thumbnail: '/front-view-man-holding-basketball.jpg', duration: '0:12', views: 980 },
    { id: '3', title: 'Clutch Free Throws', thumbnail: '/1.jpg', duration: '0:18', views: 750 },
    { id: '4', title: 'Defensive Block', thumbnail: '/Hero-Pic.jpg', duration: '0:10', views: 620 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 mb-4">
          <Radio className="h-5 w-5 text-lk-accent" />
          <span className="text-lk-accent font-semibold">LIVE STREAMING & HIGHLIGHTS</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-lk-primary mb-4">
          Watch Games Live, Anytime, Anywhere
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          High-quality live streaming with instant highlights. Never miss a moment of the action.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Live Streaming Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="overflow-hidden border-2 border-lk-accent">
            <div className="relative aspect-video bg-gradient-to-br from-lk-primary to-lk-accent">
              {/* Video Player Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                {!isPlaying ? (
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="w-20 h-20 rounded-full bg-white/90 hover:bg-white transition-all flex items-center justify-center shadow-lg hover:scale-110"
                  >
                    <Play className="h-10 w-10 text-lk-primary ml-1" />
                  </button>
                ) : (
                  <div className="w-full h-full bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Radio className="h-8 w-8 mx-auto mb-2 animate-pulse text-red-500" />
                      <p className="text-sm font-semibold">LIVE STREAM</p>
                      <p className="text-xs text-gray-300 mt-1">Click to watch full stream</p>
                    </div>
                  </div>
                )}
              </div>
              {/* Overlay Info */}
              <div className="absolute top-4 left-4">
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Radio className="h-3 w-3 animate-pulse" />
                  LIVE
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold mb-1">Eagles vs Panthers</h3>
                <p className="text-sm text-gray-200">Championship Game • Q3 5:32</p>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Live Game Streaming</h3>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download App
                </Button>
              </div>
              <p className="text-gray-600 mb-4">
                Watch games in real-time with multi-camera angles, instant replays, and professional commentary.
              </p>
              <div className="flex gap-2">
                <Button className="flex-1 bg-lk-accent text-lk-background hover:bg-lk-primary">
                  <Play className="h-4 w-4 mr-2" />
                  Watch Live
                </Button>
                <Button variant="outline" className="flex-1">
                  <Film className="h-4 w-4 mr-2" />
                  View Archive
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Highlights Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Film className="h-5 w-5 text-lk-accent" />
                <h3 className="text-lg font-semibold">Instant Highlights</h3>
              </div>
              <p className="text-gray-600 mb-6">
                AI-powered highlight generation creates the best moments automatically. Share instantly on social media.
              </p>
              <Carousel className="w-full">
                <CarouselContent>
                  {highlights.map((highlight) => (
                    <CarouselItem key={highlight.id}>
                      <Card className="overflow-hidden">
                        <div className="relative aspect-video">
                          <img
                            src={highlight.thumbnail}
                            alt={highlight.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                            <div className="p-4 text-white w-full">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">{highlight.title}</h4>
                                <span className="text-xs bg-black/50 px-2 py-1 rounded">
                                  {highlight.duration}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-gray-300">
                                <span>{highlight.views.toLocaleString()} views</span>
                                <button className="hover:text-white transition-colors">
                                  <Play className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default StreamingShowcase;

