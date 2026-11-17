'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaPhp, FaDocker, FaAws, FaGitAlt } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiPostgresql, SiMongodb, SiGraphql } from 'react-icons/si';

const technologies = [
  { name: 'React / React Native', icon: <FaReact className="w-8 h-8 text-accent-cyan" /> },
  { name: 'Next.js 15', icon: <SiNextdotjs className="w-8 h-8 text-white" /> },
  { name: 'TypeScript', icon: <SiTypescript className="w-8 h-8 text-blue-400" /> },
  { name: 'Node.js', icon: <FaNodeJs className="w-8 h-8 text-green-500" /> },
  { name: 'PHP / Laravel', icon: <FaPhp className="w-8 h-8 text-purple-400" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-8 h-8 text-cyan-400" /> },
  { name: 'PostgreSQL', icon: <SiPostgresql className="w-8 h-8 text-blue-500" /> },
  { name: 'MongoDB', icon: <SiMongodb className="w-8 h-8 text-green-400" /> },
  { name: 'GraphQL', icon: <SiGraphql className="w-8 h-8 text-pink-500" /> },
  { name: 'Docker', icon: <FaDocker className="w-8 h-8 text-blue-400" /> },
  { name: 'AWS Cloud', icon: <FaAws className="w-8 h-8 text-orange-400" /> },
  { name: 'Git & GitHub', icon: <FaGitAlt className="w-8 h-8 text-orange-500" /> },
];

export const TechStackSection: React.FC = () => {
  return (
    <section id="tech" className="py-24 px-6 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4">Core Technology Stack</h2>
          <p className="text-gray-400 font-mono text-sm">Engineered with robust and scalable technologies.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center gap-4 border border-white/5 hover:border-accent-cyan/50 transition-all shadow-xl"
            >
              {tech.icon}
              <span className="text-xs font-mono font-medium text-gray-300 text-center">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};