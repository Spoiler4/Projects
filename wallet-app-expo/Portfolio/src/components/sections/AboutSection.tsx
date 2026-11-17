'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 relative z-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4">Architecting Digital Excellence</h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm">
            Blending world-class design fidelity with bulletproof system architecture.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-12 text-left">
          <p className="text-accent-cyan text-sm uppercase tracking-[0.3em] mb-4">About Me</p>
          <h3 className="text-2xl lg:text-3xl font-semibold text-white mb-6">
            I’m a Kenyan web developer who loves turning ideas into fast, modern, and meaningful digital experiences.
          </h3>
          <p className="text-gray-400 text-base leading-relaxed mb-4">
            I build responsive websites and web applications with a strong focus on clean design, smooth user experience, and reliable performance.
          </p>
          <p className="text-gray-400 text-base leading-relaxed mb-6">
            From front-end interfaces to full web solutions, I enjoy creating products that are both beautiful and practical for real users.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300">React</span>
            <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300">Next.js</span>
            <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300">Tailwind CSS</span>
            <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300">UI/UX</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="glass-panel p-8 rounded-3xl relative overflow-hidden"
            whileHover={{ y: -5 }}
          >
            <h3 className="text-xl font-bold mb-4 text-accent-cyan">Mission</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              To engineer high-performance software products that scale effortlessly, offering lightning-fast execution and immersive user interactions.
            </p>
          </motion.div>

          <motion.div
            className="glass-panel p-8 rounded-3xl relative overflow-hidden"
            whileHover={{ y: -5 }}
          >
            <h3 className="text-xl font-bold mb-4 text-accent-indigo">Vision</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Redefining web and mobile standards through state-of-the-art 3D interfaces, robust API design, and pristine modern codebases.
            </p>
          </motion.div>

          <motion.div
            className="glass-panel p-8 rounded-3xl relative overflow-hidden"
            whileHover={{ y: -5 }}
          >
            <h3 className="text-xl font-bold mb-4 text-accent-purple">Philosophy</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Obsessive attention to detail, uncompromising performance optimization, and modular component-driven architecture.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};