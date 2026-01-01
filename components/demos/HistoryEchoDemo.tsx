import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HistoryEchoDemo = ({ temporal }: any) => {
  const [history, setHistory] = useState<string[]>(['INITIAL_VOID']);
  const [current, setCurrent] = useState('INITIAL_VOID');
  const { entropy = 0 } = temporal || {};

  const updateState = (state: string) => {
    if (state === current) return;
    setHistory(prev => [current, ...prev.slice(0, 6)]);
    setCurrent(state);
  };

  const protocols = ['STRATA_X', 'STRATA_Y', 'VECT_ALPHA', 'VECT_BETA', 'LOG_NULL'];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-[#050505] overflow-hidden gap-20 relative perspective-[2000px]">
      <div className="text-center z-50">
        <h4 className="text-3xl font-black italic tracking-tighter uppercase text-white">Temporal_Stacking</h4>
        <p className="mono text-[9px] text-neutral-600 mt-2 uppercase tracking-widest">History_Depth: {history.length} // Memory_Leak: {(entropy * 100).toFixed(0)}%</p>
      </div>

      <div className="relative w-full h-80 flex items-center justify-center [transform-style:preserve-3d]">
        {/* The Echoes */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none [transform-style:preserve-3d]">
           {history.map((h, i) => (
             <motion.div
               key={`${h}-${i}`}
               initial={{ opacity: 0, translateZ: 0 }}
               animate={{ 
                 opacity: (0.2 / (i + 1)) * (1 - entropy), 
                 translateZ: -(i + 1) * (150 + entropy * 300),
                 scale: 1 + (i + 1) * 0.1,
                 filter: `blur(${(i + 1) * 2 + entropy * 10}px)`
               }}
               transition={{ type: 'spring', stiffness: 50, damping: 20 }}
               className="absolute text-8xl font-black italic text-cyan-500 uppercase whitespace-nowrap select-none"
             >
               {h}
             </motion.div>
           ))}
        </div>

        {/* The Active State */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40, filter: 'blur(20px)', translateZ: 100 }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', translateZ: 0 }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(40px)', transition: { duration: 0.5 } }}
            className="relative z-50 text-center"
          >
            <h2 className="text-9xl font-black italic tracking-tighter text-white uppercase leading-none drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              {current}
            </h2>
            <div className="mt-6 flex justify-center gap-1">
               {[...Array(20)].map((_, i) => (
                 <div key={i} className="w-1 h-1 bg-cyan-500 rounded-full" />
               ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap justify-center gap-3 relative z-50">
        {protocols.map((p) => (
          <button
            key={p}
            onClick={() => updateState(p)}
            className={`px-8 py-3 border-2 mono text-[10px] font-black tracking-widest transition-all ${
              current === p ? 'bg-white text-black border-white' : 'bg-transparent text-neutral-600 border-white/5 hover:border-white/20'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-800 leading-relaxed uppercase z-50">
        PREVIOUS STATES REMAIN RESIDENT IN THE TEMPORAL BUFFER. ENTROPY MODULATES THEIR FADE RATE AND SPATIAL DISPERSION.
      </div>
    </div>
  );
};

export default HistoryEchoDemo;