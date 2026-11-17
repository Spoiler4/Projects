'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to send message right now.');
      }

      setStatus('success');
      setMessage('Thank you for reaching out. Your message has been sent successfully.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unable to send message right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl lg:text-5xl font-display font-bold mb-6">Let&apos;s Build Together</h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Have a project in mind or want to discuss engineering opportunities? Send a message and let&apos;s create something remarkable.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 glass-panel rounded-2xl"><Mail className="w-5 h-5 text-accent-cyan" /></div>
              <div>
                <div className="text-xs font-mono text-gray-500">Email</div>
                <div className="text-sm font-medium">charlesodhiambo575@gmail.com</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 glass-panel rounded-2xl"><Phone className="w-5 h-5 text-accent-indigo" /></div>
              <div>
                <div className="text-xs font-mono text-gray-500">Phone</div>
                <div className="text-sm font-medium">(+254) 111790134</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 glass-panel rounded-2xl"><MapPin className="w-5 h-5 text-accent-purple" /></div>
              <div>
                <div className="text-xs font-mono text-gray-500">Location</div>
                <div className="text-sm font-medium">Nairobi, Kenya</div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl">
          {status === 'success' ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-accent-cyan mb-2">Message Sent!</h3>
              <p className="text-gray-400 text-sm">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full glass-panel px-4 py-3 rounded-xl border border-white/10 outline-none text-white text-sm focus:border-accent-cyan"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-2">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full glass-panel px-4 py-3 rounded-xl border border-white/10 outline-none text-white text-sm focus:border-accent-cyan"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-2">Message</label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full glass-panel px-4 py-3 rounded-xl border border-white/10 outline-none text-white text-sm focus:border-accent-cyan"
                  placeholder="Tell me about your project..."
                />
              </div>
              {status === 'error' && (
                <p className="text-sm text-red-400">{message}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent-cyan to-accent-indigo py-3.5 rounded-xl font-semibold text-dark-bg hover:opacity-95 transition-opacity shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};