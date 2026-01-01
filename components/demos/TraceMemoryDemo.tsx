
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TraceMemoryDemo = () => {
  const [history, setHistory] = useState<string[]>(['DASHBOARD']);
  const [current, setCurrent] = useState('DASHBOARD');

  const goTo = (state: string) => {
    if (state === current) return;
    setHistory(prev => [...prev.slice(-4), current]); // Keep last 5
    setCurrent(state);
  };

  const states = ['CORE', 'SYSTEM', 'ANALYTICS', 'NEURAL', 'BIOS'];

  return (
    <div className="w-full h-full p-12 flex flex-col items-center gap-12 bg-neutral-900/40 rounded-2xl border border-white/5">
      
      {/* Current State View */}
      <div className="relative h-48 w-full flex items-center justify-center border border-white/10 bg-black/20 rounded-xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            className="text-center"
          >
            <h3 className="text-6xl font-black italic tracking-tighter">{current}</h3>
            <p className="mono text-[9px] text-cyan-500 mt-2 tracking-[0.3em]">ACTIVE_INSTANCE</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Selection */}
      <div className="flex gap-4">
        {states.map(s => (
          <button
            key={s}
            onClick={() => goTo(s)}
            className={`px-4 py-2 border rounded-full mono text-[10px] tracking-widest transition-all ${
              current === s ? 'bg-cyan-500 border-cyan-500 text-black font-bold' : 'border-white/10 text-neutral-500 hover:border-white/20'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Trace Memory (The kinetic breadcrumbs) */}
      <div className="flex items-center gap-3">
        <div className="mono text-[9px] text-neutral-600 mr-4">TRACE_HISTORY:</div>
        {history.map((h, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="group relative cursor-pointer"
            onClick={() => goTo(h)}
          >
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan-500/50 transition-colors">
              <div className="w-1.5 h-1.5 bg-cyan-500/40 rounded-full" />
            </div>
            
            {/* Snapshot Hover */}
            <motion.div 
              className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 bg-neutral-950 border border-white/10 p-3 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"
            >
              <div className="text-[10px] font-bold text-white mb-1">{h}</div>
              <div className="h-10 w-full bg-white/5 rounded blur-[2px]" />
              <div className="mono text-[8px] text-neutral-500 mt-2">RECALL_STATE</div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TraceMemoryDemo;
