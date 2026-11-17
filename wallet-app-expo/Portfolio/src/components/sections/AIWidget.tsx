'use client';

import React, { useState } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AIWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi! I am Charles AI assistant. Ask me anything about Charles experience.' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {sender: 'ai', text: `You asked: "${userMsg}". {response}` },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-80 lg:w-96 glass-panel rounded-3xl overflow-hidden shadow-2xl border border-white/10 mb-4"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-accent-indigo/20">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-accent-cyan" />
                <span className="font-bold text-sm">Alex AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 h-80 overflow-y-auto space-y-4 text-xs font-mono">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`p-3 rounded-2xl max-w-[80%] ${
                      m.sender === 'user' ? 'bg-accent-indigo text-white' : 'glass-panel text-gray-300'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="flex items-center p-3 border-t border-white/10 gap-2">
              <input
                type="text"
                placeholder="Ask something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white text-xs px-2"
              />
              <button type="submit" className="p-2 bg-accent-cyan rounded-xl text-dark-bg">
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-gradient-to-r from-accent-cyan to-accent-indigo rounded-full shadow-2xl text-dark-bg hover:opacity-95 transition-opacity"
      >
        <Bot className="w-6 h-6" />
      </button>
    </div>
  );
};