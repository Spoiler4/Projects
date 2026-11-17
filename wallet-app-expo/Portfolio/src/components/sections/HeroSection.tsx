'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SceneContainer } from '@/components/canvas/SceneContainer';
import { Github, Linkedin, Twitter, Mail, ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    setIsAndroid(/Android/i.test(navigator.userAgent));
  }, []);

  return (
    <section
      id="hero"
      className={`relative flex items-center justify-center overflow-hidden ${isAndroid ? 'min-h-[100dvh] pt-20 px-4 sm:px-6' : 'min-h-screen pt-24 px-6'}`}
    >
      <SceneContainer />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 glass-panel px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
            <span className="text-xs font-mono text-accent-cyan tracking-wide">AVAILABLE FOR PROJECTS</span>
          </div>

          <h1 className={`font-display font-bold tracking-tight mb-6 ${isAndroid ? 'text-4xl sm:text-5xl' : 'text-5xl lg:text-7xl'}`}>
            Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-indigo to-accent-purple">Charles</span>
          </h1>

          <p className={`text-gray-400 font-mono mb-8 ${isAndroid ? 'text-lg' : 'text-xl'}`}>
            Full Stack Developer • Software Engineer • Mobile App Specialist
          </p>

          <div className={`mb-10 ${isAndroid ? 'flex flex-col gap-3' : 'flex flex-wrap gap-4'}`}>
            <a
              href="#contact"
              className="flex items-center gap-2 bg-gradient-to-r from-accent-cyan to-accent-indigo px-6 py-3 rounded-xl font-semibold text-dark-bg hover:opacity-95 transition-opacity shadow-lg shadow-accent-cyan/20"
            >
              <span>Hire Me</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#projects"
              className="flex items-center gap-2 glass-panel px-6 py-3 rounded-xl font-semibold text-white hover:border-accent-cyan transition-colors"
            >
              <span>View Projects</span>
            </a>
          </div>

          <div className={`flex items-center text-gray-400 ${isAndroid ? 'gap-5' : 'gap-6'}`}>
            <a href="https://github.com/Spoiler4" target="_blank" rel="noreferrer" className="hover:text-accent-cyan transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-accent-cyan transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-accent-cyan transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="mailto:charlesodhiambo575@gmail.com" className="hover:text-accent-cyan transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};