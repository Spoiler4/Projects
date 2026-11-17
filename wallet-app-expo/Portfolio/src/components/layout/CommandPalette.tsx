'use client';

import React, { useEffect, useState } from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CommandPalette: React.FC = () => {
  const { isCommandPaletteOpen, setCommandPaletteOpen, toggleTheme } = usePortfolioStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  const actions = [
    { id: 'home', name: 'Go to Home', action: () => (window.location.hash = '#hero') },
    { id: 'projects', name: 'View Projects', action: () => (window.location.hash = '#projects') },
    { id: 'contact', name: 'Get in Touch', action: () => (window.location.hash = '#contact') },
    { id: 'theme', name: 'Toggle Theme', action: () => toggleTheme() },
    { id: 'resume', name: 'Download Resume', action: () => window.open('/resume.pdf') },
  ];

  const filteredActions = actions.filter((a) => a.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/60 backdrop-blur-md px-4">
          <motion.div
            className="w-full max-w-xl glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
          >
            <div className="flex items-center px-4 py-3 border-b border-white/10 gap-3">
              <Command className="w-5 h-5 text-accent-cyan" />
              <input
                type="text"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 text-sm"
                autoFocus
              />
            </div>
            <div className="p-2 max-h-72 overflow-y-auto">
              {filteredActions.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-500">No results found.</div>
              ) : (
                filteredActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => {
                      action.action();
                      setCommandPaletteOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm text-gray-300 hover:bg-accent-indigo/20 hover:text-white transition-colors"
                  >
                    <span>{action.name}</span>
                    <span className="text-xs text-gray-500 font-mono">Select</span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};