'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { heroSlides, awards } from '@/data/site-data';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

  // Smooth crossfade variants - no sliding, just fade
  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 1.05,
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        opacity: { duration: 0.8, ease: 'easeOut' },
        scale: { duration: 1.2, ease: 'easeOut' },
      },
    },
    exit: {
      opacity: 0,
      scale: 1,
      transition: {
        opacity: { duration: 0.6, ease: 'easeIn' },
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.12, duration: 0.5, ease: 'easeOut' },
    }),
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3, ease: 'easeIn' }
    },
  };

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-slate-900">
      {/* Static dark background to prevent white flash */}
      <div className="absolute inset-0 bg-slate-900" />
      
      {/* Background Slides - Crossfade effect */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/30" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Subtitle Badge */}
                <motion.div
                  custom={0}
                  variants={contentVariants}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-teal-400 text-sm font-semibold mb-6"
                >
                  <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 animate-pulse" />
                  {heroSlides[currentSlide].subtitle}
                </motion.div>

                {/* Title */}
                <motion.h1
                  custom={1}
                  variants={contentVariants}
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
                >
                  {heroSlides[currentSlide].title.split(' ').map((word, i) => (
                    <span key={i}>
                      {word === 'I.T' || word === 'Simple' || word === 'AI-Powered' || word === 'Digital' ? (
                        <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                          {word}
                        </span>
                      ) : (
                        word
                      )}{' '}
                    </span>
                  ))}
                </motion.h1>

                {/* Description */}
                <motion.p
                  custom={2}
                  variants={contentVariants}
                  className="text-lg md:text-xl text-white/70 max-w-2xl mb-8 leading-relaxed"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  custom={3}
                  variants={contentVariants}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-8 py-6 text-lg font-medium group"
                    >
                      {heroSlides[currentSlide].cta}
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </Button>
                  </Link>
                  <Link href="/case-studies">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/30 bg-white/5 text-white hover:bg-white/10 px-8 py-6 text-lg font-medium"
                    >
                      View Our Work
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
        {/* Progress Dots */}
        <div className="flex items-center gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative h-2 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? 'w-12 bg-gradient-to-r from-teal-400 to-blue-400'
                  : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
            >
              {index === currentSlide && isPlaying && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 6, ease: 'linear' }}
                  className="absolute inset-0 bg-white/30 rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Play/Pause */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          {isPlaying ? (
            <Pause className="text-white" size={18} />
          ) : (
            <Play className="text-white ml-0.5" size={18} />
          )}
        </button>
      </div>

      {/* Arrow Navigation */}
      <div className="absolute bottom-1/2 translate-y-1/2 left-4 right-4 z-20 flex justify-between pointer-events-none">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors pointer-events-auto backdrop-blur-sm"
        >
          <ChevronLeft className="text-white" size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors pointer-events-auto backdrop-blur-sm"
        >
          <ChevronRight className="text-white" size={24} />
        </button>
      </div>

      {/* Awards Ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-teal-600 to-blue-600 py-3 overflow-hidden z-20">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap"
        >
          {[...awards, ...awards, ...awards, ...awards].map((award, index) => (
            <span key={index} className="text-white text-sm font-medium mx-8 flex items-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full mr-3" />
              {award}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-32 right-8 z-20 hidden lg:block">
        <div className="text-white/60 text-sm font-medium">
          <span className="text-white text-2xl font-bold">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="mx-2">/</span>
          <span>{String(heroSlides.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  );
}
