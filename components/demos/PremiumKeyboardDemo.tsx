
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PremiumKeyboardDemo = () => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const items = ['COMMAND', 'EXECUTE', 'ANALYZE', 'PURGE', 'ARCHIVE', 'SYNC'];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setFocusedIndex(prev => (prev + 1) % items.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setFocusedIndex(prev => (prev - 1 + items.length) % items.length);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [items.length]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-950 gap-12">
      <div className="text-center">
        <h4 className="text-4xl font-black italic tracking-tighter">SPATIAL_FOCUS</h4>
        <p className="mono text-[10px] text-cyan-500 uppercase tracking-widest mt-2">Use_Arrow_Keys_To_Navigate</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-2xl">
        {items.map((item, i) => (
          <div key={item} className="relative group">
            <button
              onFocus={() => setFocusedIndex(i)}
              className={`w-full p-8 border-2 transition-all duration-500 flex flex-col items-center justify-center gap-4 relative z-10 ${
                focusedIndex === i ? 'border-white bg-white text-black' : 'border-white/5 text-neutral-600 hover:border-white/20'
              }`}
            >
              <span className="mono text-[9px] tracking-widest font-black uppercase italic">Node_0{i}</span>
              <span className="text-2xl font-black tracking-tighter">{item}</span>
            </button>
            
            {/* The Premium "Focus Ring" Snap Effect */}
            {focusedIndex === i && (
              <motion.div
                layoutId="focus-ring"
                className="absolute -inset-2 border-4 border-cyan-500 rounded-lg pointer-events-none"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-4 mono text-[10px] text-neutral-500">
        <div className="flex items-center gap-2">
          <kbd className="px-2 py-1 bg-white/10 rounded border border-white/10">↑ ↓</kbd>
          <span>JUMP_NODES</span>
        </div>
        <div className="flex items-center gap-2">
          <kbd className="px-2 py-1 bg-white/10 rounded border border-white/10">ENTER</kbd>
          <span>SELECT_ENTITY</span>
        </div>
      </div>
    </div>
  );
};

export default PremiumKeyboardDemo;
