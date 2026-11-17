'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Server, Database, Cloud, Cpu } from 'lucide-react';

const services = [
  { icon: <Code className="w-6 h-6 text-accent-cyan" />, title: 'Full Stack Development', desc: 'End-to-end web applications built with Next.js, React, and Node.' },
  { icon: <Smartphone className="w-6 h-6 text-accent-indigo" />, title: 'Mobile Applications', desc: 'Cross-platform mobile apps using React Native with native performance.' },
  { icon: <Server className="w-6 h-6 text-accent-purple" />, title: 'REST & GraphQL APIs', desc: 'Secure, scalable, and well-documented backend microservices.' },
  { icon: <Database className="w-6 h-6 text-accent-cyan" />, title: 'Database Architecture', desc: 'Optimized SQL and NoSQL design with high availability and indexing.' },
  { icon: <Cloud className="w-6 h-6 text-accent-indigo" />, title: 'Cloud Deployment', desc: 'Seamless CI/CD pipelines deployed to AWS, Vercel, and Docker clusters.' },
  { icon: <Cpu className="w-6 h-6 text-accent-purple" />, title: 'System Architecture', desc: 'Enterprise-grade system design emphasizing high concurrency and security.' },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-24 px-6 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4">Specialized Services</h2>
          <p className="text-gray-400 font-mono text-sm">Delivering high-impact digital solutions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-accent-cyan/40 transition-all"
            >
              <div className="p-4 glass-panel rounded-2xl w-fit mb-6">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};