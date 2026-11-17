'use client';

import React, { useState } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

export const TerminalSection: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([
    'Welcome to Charles OS v2.6.0',
    'Type "help" to see available commands.',
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    let res = '';

    switch (cmd) {
      case 'help':
        res = 'Commands: whoami, skills, call, projects, contact, clear';
        break;
      case 'whoami':
        res = 'Charles - Senior Full Stack Developer & Software Engineer.';
        break;
      case 'skills':
        res = 'React, Next.js, TypeScript, Node.js, PHP, Laravel, AWS, Docker.';
        break;
      case 'call' :
        res = 'You can reach me at: +254 111 790 134';
      case 'projects':
        res = 'Nexus Cloud OS, Aura Mobile Banking, Enterprise AI Core.';
        break;
      case 'contact':
        res = 'Email: charlesodhiambo575@gmail.com | Whatsapp: 0111790134';
        break;
      case 'clear':
        setOutput([]);
        setInput('');
        return;
      default:
        res = `Command not recognized: ${cmd}. Type "help" for assistance.`;
    }

    setOutput([...output, `$ ${input}`, res]);
    setInput('');
  };

  return (
    <section className="py-20 px-6 relative z-20">
      <div className="max-w-4xl mx-auto glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/20">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>charles@terminal:~</span>
          </div>
        </div>

        <div className="p-6 font-mono text-sm space-y-3 min-h-[250px] max-h-[350px] overflow-y-auto">
          {output.map((line, i) => (
            <div key={i} className={line.startsWith('$') ? 'text-accent-cyan' : 'text-gray-300'}>
              {line}
            </div>
          ))}
          <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2">
            <span className="text-accent-indigo">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-white font-mono text-sm"
              placeholder="Type command..."
            />
          </form>
        </div>
      </div>
    </section>
  );
};