'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  Code2,
  Rocket,
  Sparkles,
} from 'lucide-react';

export default function ComingSoonPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white flex items-center justify-center px-6">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl w-full text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-8 w-20 h-20 rounded-2xl flex items-center justify-center
                     bg-gradient-to-br from-cyan-400/20 to-purple-500/20
                     border border-cyan-400/20
                     shadow-[0_0_50px_rgba(0,245,255,0.15)]"
        >
          <Rocket className="w-9 h-9 text-cyan-400" />
        </motion.div>

        {/* Status */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full
                        bg-white/[0.03] border border-white/10 backdrop-blur-xl">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>

          <span className="text-xs font-mono tracking-widest text-cyan-300">
            UNDER DEVELOPMENT
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6">
          Coming{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500">
            Soon
          </span>
        </h1>

        {/* Description */}
        <p className="max-w-xl mx-auto text-gray-400 text-lg sm:text-xl leading-relaxed mb-10">
          This project is currently being built and polished.
          Check back soon to explore the full experience.
        </p>

        {/* Developer terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-xl mx-auto mb-10 text-left rounded-2xl overflow-hidden
                     bg-[#0a1020]/90 border border-white/10
                     shadow-2xl shadow-cyan-500/5 backdrop-blur-xl"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
            <span className="w-3 h-3 rounded-full bg-red-400/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <span className="w-3 h-3 rounded-full bg-green-400/80" />

            <span className="ml-3 text-xs font-mono text-gray-500">
              project-terminal
            </span>
          </div>

          {/* Terminal content */}
          <div className="p-5 font-mono text-sm leading-7">
            <div>
              <span className="text-green-400">charles@portfolio</span>
              <span className="text-gray-500">:</span>
              <span className="text-cyan-400">~/project</span>
              <span className="text-white">$ </span>
              <span className="text-gray-300">
                npm run build
              </span>
            </div>

            <div className="text-gray-500 mt-2">
              &gt; Building something awesome...
            </div>

            <div className="text-cyan-400">
              ✓ Interface
            </div>

            <div className="text-indigo-400">
              ✓ Backend
            </div>

            <div className="text-purple-400">
              ✓ Features
            </div>

            <div className="text-yellow-400">
              ⟳ Final polish...
            </div>

            <div className="mt-2">
              <span className="text-green-400">status:</span>{' '}
              <span className="text-gray-300">
                87% complete
              </span>
              <span className="animate-pulse text-cyan-400">
                _
              </span>
            </div>
          </div>
        </motion.div>

        {/* Feature indicators */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-400">
              Code in progress
            </span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-400">
              Final touches
            </span>
          </div>
        </div>

        {/* Back button */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                     bg-gradient-to-r from-cyan-400 to-indigo-500
                     text-[#050816] font-semibold
                     shadow-lg shadow-cyan-500/20
                     hover:opacity-90 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
      </motion.div>
    </main>
  );
}
