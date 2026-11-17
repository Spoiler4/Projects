'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { Sun, Moon, Command, Menu, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme, setCommandPaletteOpen } = usePortfolioStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Tech Stack', href: '#tech' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'glass-panel py-4 shadow-xl' : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="#hero" className="font-display text-xl font-bold tracking-wider">
          <span className="text-accent-cyan">&lt;</span>
          <span>CHARLES.DEV</span>
          <span className="text-accent-indigo">/&gt;</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 glass-panel px-6 py-2 rounded-full">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-400 hover:text-accent-cyan transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-2 glass-panel px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:border-accent-cyan transition-colors"
          >
            <Command className="w-3.5 h-3.5" />
            <span>K</span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 glass-panel rounded-full hover:border-accent-cyan transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-accent-cyan" /> : <Moon className="w-4 h-4 text-accent-indigo" />}
          </button>

          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 bg-gradient-to-r from-accent-indigo to-accent-purple px-4 py-2 rounded-full text-xs font-semibold text-white hover:opacity-95 transition-opacity shadow-lg"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <button onClick={toggleTheme} className="p-2 glass-panel rounded-full">
            {theme === 'dark' ? <Sun className="w-4 h-4 text-accent-cyan" /> : <Moon className="w-4 h-4 text-accent-indigo" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 glass-panel rounded-full text-gray-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="absolute top-full left-0 w-full glass-panel border-b border-white/10 p-6 lg:hidden flex flex-col gap-4 shadow-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-200 hover:text-accent-cyan"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="/resume.pdf"
              download
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent-indigo to-accent-purple py-3 rounded-xl text-sm font-semibold text-white"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};