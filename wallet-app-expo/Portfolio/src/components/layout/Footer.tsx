'use client';

import React from 'react';
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 glass-panel py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <span className="font-display text-xl font-bold">
            <span className="text-accent-cyan">&lt;</span>
            <span>CHARLES.DEV</span>
            <span className="text-accent-indigo">/&gt;</span>
          </span>
          <p className="text-sm text-gray-400 mt-2">
            Engineering futuristic digital experiences with cutting-edge stack.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://github.com/Spoiler4" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-accent-cyan transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com/in/dev.charles" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-accent-cyan transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-accent-cyan transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="mailto:charlesodhiambo575@gmail.com" className="text-gray-400 hover:text-accent-cyan transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500">© {new Date().getFullYear()} Charles. All rights reserved.</span>
          <button
            onClick={scrollToTop}
            className="p-3 glass-panel rounded-full hover:border-accent-cyan transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 text-accent-cyan" />
          </button>
        </div>
      </div>
    </footer>
  );
};