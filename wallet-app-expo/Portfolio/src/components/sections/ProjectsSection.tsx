'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '@/types';

const projects: Project[] = [
  {
    id: '1',
    title: 'Fast food & restaurant',
    category: 'Web Apps',
    description: 'Next-generation cloud workspace environment with real-time collaboration.',
    liveUrl: 'https://Spoiler4.github.io/Projects/sarab',
    githubUrl: 'https://github.com/Spoiler4/Projects/sarab',
    caseStudy: 'Engineered custom real-time sync engine utilizing WebSockets and Redis.',
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind', 'Node.js', 'Redis'],
    features: ['Real-time sync', 'Multiplayer cursors', 'Encrypted vault'],
    performanceScore: 96,
    image: '/projects/nexus.jpg',
  },
  {
    id: '2',
    title: 'Aura Mobile Banking',
    category: 'Mobile Apps',
    description: 'Secure cross-platform fintech application with biometric authentication.',
    liveUrl: '/coming-soon',
    githubUrl: 'https://github.com',
    caseStudy: 'Optimized render cycles achieving 60fps buttery smooth transitions.',
    techStack: ['React Native', 'TypeScript', 'GraphQL', 'Node.js'],
    features: ['Biometric Auth', 'Instant Payments', 'Analytics dashboard'],
    performanceScore: 98,
    image: '/projects/aura.jpg',
  },
  {
    id: '3',
    title: 'Enterprise AI Core',
    category: 'AI Projects',
    description: 'LLM orchestration platform for automated enterprise workflow pipelines.',
    liveUrl: '/coming-soon',
    githubUrl: 'https://github.com',
    caseStudy: 'Built high-throughput queue system processing millions of tokens securely.',
    techStack: ['Python', 'FastAPI', 'Next.js', 'Docker', 'AWS'],
    features: ['Custom Prompts', 'Token Analytics', 'Role Access'],
    performanceScore: 100,
    image: '/projects/ai.jpg',
  },
];

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', 'Web Apps', 'Mobile Apps', 'AI Projects'];

  const filteredProjects = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 px-6 relative z-25">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-400 font-mono text-sm">Showcasing production-ready engineering.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-mono transition-all ${
                filter === cat
                  ? 'bg-gradient-to-r from-accent-cyan to-accent-indigo text-dark-bg font-bold shadow-lg'
                  : 'glass-panel text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-panel rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-accent-cyan px-3 py-1 glass-panel rounded-full">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-green-400">Perf: {project.performanceScore}%</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-xs font-mono px-2.5 py-1 glass-panel rounded-lg text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-6 py-4 glass-panel border-t border-white/10 flex items-center justify-between">
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-accent-cyan hover:underline">
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white">
                  <Github className="w-4 h-4" />
                  <span>Code</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};