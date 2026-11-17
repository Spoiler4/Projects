'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ArrowUpRight } from 'lucide-react';

const experiences = [
  {
    role: 'Full Stack Developer',
    company: 'Freelance / Independent',
    location: 'Remote',
    period: '2024 — Present',
    description:
      'Building scalable web applications, mobile solutions, and modern digital experiences using Next.js, React, Node.js, and cloud technologies.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js'],
  },
  {
    role: 'Software Engineer',
    company: 'Tech Solutions',
    location: 'Remote',
    period: '2022 — 2024',
    description:
      'Designed and developed production-ready applications with a focus on performance, clean architecture, and exceptional user experiences.',
    technologies: ['JavaScript', 'APIs', 'Database', 'Cloud'],
  },
  {
    role: 'Mobile App Developer',
    company: 'Independent Projects',
    location: 'Remote',
    period: '2021 — 2022',
    description:
      'Created cross-platform mobile applications with intuitive interfaces and reliable backend integrations.',
    technologies: ['React Native', 'Firebase', 'UI/UX'],
  },
];

export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="relative py-24 px-6 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/10 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-5">
            <Briefcase className="w-4 h-4 text-accent-cyan" />
            <span className="text-xs font-mono text-accent-cyan tracking-widest">
              EXPERIENCE
            </span>
          </div>

          <h2 className="font-display font-bold text-4xl md:text-6xl">
            My Professional
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-indigo to-accent-purple">
              {' '}Journey
            </span>
          </h2>

          <p className="text-gray-400 font-mono mt-5 max-w-2xl">
            A timeline of projects, engineering challenges, and experiences
            that shaped my development career.
          </p>
        </motion.div>


        {/* Timeline */}
        <div className="relative">

          {/* Line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan via-accent-indigo to-transparent" />

          <div className="space-y-12">

            {experiences.map((item, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                className={`relative flex ${
                  index % 2 === 0
                    ? 'md:justify-start'
                    : 'md:justify-end'
                }`}
              >

                {/* Dot */}
                <div className="absolute left-[13px] md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-dark-bg border-2 border-accent-cyan shadow-lg shadow-accent-cyan/50 z-10" />


                {/* Card */}
                <div
                  className="
                  ml-14 md:ml-0
                  md:w-[45%]
                  glass-panel
                  rounded-2xl
                  p-6
                  group
                  hover:border-accent-cyan/50
                  transition-all
                  duration-300
                  "
                >

                  <div className="flex justify-between items-start mb-5">

                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {item.role}
                      </h3>

                      <p className="text-accent-cyan font-mono text-sm mt-1">
                        {item.company}
                      </p>
                    </div>

                    <ArrowUpRight
                      className="
                      w-5 h-5
                      text-gray-500
                      group-hover:text-accent-cyan
                      transition-colors
                      "
                    />

                  </div>


                  <div className="flex flex-wrap gap-4 text-xs text-gray-400 font-mono mb-5">

                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.period}
                    </span>

                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>

                  </div>


                  <p className="text-gray-400 leading-relaxed mb-5">
                    {item.description}
                  </p>


                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="
                        px-3
                        py-1
                        rounded-full
                        bg-white/5
                        border
                        border-white/10
                        text-xs
                        text-gray-300
                        font-mono
                        "
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>

              </motion.div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
};