
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EntropyLoaderDemo = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + 5));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[#020202] flex flex-col items-center justify-center p-12 gap-12">
      <div className="text-center">
        <h4 className="text-3xl font-black italic tracking-tighter text-white">Entropy_Crystalline</h4>
        <p className="mono text-[10px] text-neutral-700 mt-2 uppercase tracking-[0.3em]">Noise-to-Signal_Transition</p>
      </div>

      <div className="relative w-80 h-16 bg-neutral-900 border border-white/5 overflow-hidden flex items-center p-1">
        <motion.div
          animate={{ 
            width: `${progress}%`,
            filter: `blur(${Math.max(0, (100 - progress) / 5)}px)`,
            skewX: (100 - progress) / 2
          }}
          className="h-full bg-gradient-to-r from-neutral-800 to-white relative overflow-hidden"
        >
          {progress < 95 && (
            <motion.div 
              animate={{ x: [0, 5, -5, 0], opacity: [0.2, 0.5, 0.2] }} 
              transition={{ repeat: Infinity, duration: 0.1 }}
              className="absolute inset-0 bg-white mix-blend-overlay" 
            />
          )}
        </motion.div>
        
        {/* Digital Scraps */}
        <div className="absolute inset-0 flex items-center justify-center mono text-[8px] text-white/5 select-none pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="mx-1">{Math.random().toString(16).slice(2, 4)}</span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
         <span className="text-white font-black italic tracking-tighter text-4xl">{progress}%</span>
         <div className="w-32 h-0.5 bg-cyan-900/20 relative overflow-hidden">
            <motion.div 
              animate={{ x: ['-100%', '100%'] }} 
              transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-cyan-500 w-1/4"
            />
         </div>
      </div>
    </div>
  );
};

export default EntropyLoaderDemo;
