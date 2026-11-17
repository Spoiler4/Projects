'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '100+', label: 'Projects Delivered' },
  { value: '50+', label: 'Happy Clients' },
  { value: '5+', label: 'Years Experience' },
  { value: '20+', label: 'Technologies Mastered' },
];

export const StatsSection: React.FC = () => {
  return (
    <section className="py-20 px-6 relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel p-8 rounded-3xl text-center border border-white/5"
          >
            <div className="text-4xl lg:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-indigo mb-2">
              {stat.value}
            </div>
            <div className="text-xs font-mono text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};