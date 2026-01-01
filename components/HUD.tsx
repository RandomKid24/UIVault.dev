import React from 'react';
import { motion } from 'framer-motion';
import { Home, LayoutGrid, Cpu, Info } from 'lucide-react';
import { View } from '../types';

interface HUDProps {
  activeView: View;
  setView: (v: View) => void;
}

const HUD: React.FC<HUDProps> = ({ activeView, setView }) => {
  const navItems: { id: View; icon: React.ReactNode; label: string }[] = [
    { id: 'home', icon: <Home size={20} />, label: 'HOME' },
    { id: 'explorer', icon: <LayoutGrid size={20} />, label: 'LAB' },
    { id: 'philosophy', icon: <Info size={20} />, label: 'DOCS' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]" aria-label="Global Navigation">
      <div className="bg-neutral-900/50 backdrop-blur-xl border border-white/5 rounded-full p-1.5 flex items-center gap-1 shadow-2xl">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setView(item.id)}
            aria-current={activeView === item.id ? 'page' : undefined}
            className={`relative px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 group ${
              activeView === item.id ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            {activeView === item.id && (
              <motion.div
                layoutId="nav-bg"
                className="absolute inset-0 bg-white/10 rounded-full"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{item.icon}</span>
            <span className="relative z-10 mono text-[10px] font-bold tracking-[0.2em] overflow-hidden whitespace-nowrap hidden md:block">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default HUD;