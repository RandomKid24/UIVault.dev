import React, { useState } from 'react';
import { motion } from 'framer-motion';

const KineticStatusDemo = () => {
  const [status, setStatus] = useState<'SUCCESS' | 'ERROR'>('SUCCESS');

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-950 gap-16 overflow-hidden">
      <div className="text-center">
        <h4 className="text-3xl font-black italic tracking-tighter text-white uppercase">Wire_Status</h4>
        <p className="mono text-[9px] text-neutral-700 mt-2 uppercase tracking-[0.5em]">Procedural_Morphing</p>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-48 h-48">
          <motion.path
            initial={false}
            animate={{ 
              d: status === 'SUCCESS' 
                ? "M 20 50 L 45 75 L 80 25" 
                : "M 25 25 L 75 75 M 75 25 L 25 75",
              stroke: status === 'SUCCESS' ? "#06b6d4" : "#f43f5e",
              pathLength: [0, 1]
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 10 }}
            fill="transparent"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Ambient Ring */}
        <motion.div 
          animate={{ 
            borderColor: status === 'SUCCESS' ? 'rgba(6,182,212,0.2)' : 'rgba(244,63,94,0.2)',
            scale: [1, 1.1, 1]
          }}
          className="absolute inset-0 border-2 rounded-full"
        />
      </div>

      <div className="flex gap-4">
        <button 
          onClick={() => setStatus('SUCCESS')}
          className={`px-10 py-3 border-2 mono text-[10px] font-black uppercase tracking-widest transition-all ${status === 'SUCCESS' ? 'bg-cyan-500 border-cyan-500 text-black' : 'border-white/5 text-neutral-700'}`}
        >
          EXEC_VALID
        </button>
        <button 
          onClick={() => setStatus('ERROR')}
          className={`px-10 py-3 border-2 mono text-[10px] font-black uppercase tracking-widest transition-all ${status === 'ERROR' ? 'bg-rose-500 border-rose-500 text-white' : 'border-white/5 text-neutral-700'}`}
        >
          EXEC_ABORT
        </button>
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-800 leading-relaxed uppercase">
        SYMBOLS ARE NOT STATIC ASSETS. THEY ARE GEOMETRIC PRIMITIVES THAT BEND AND RE-ROUTE THEIR VECTORS TO COMMUNICATE SYSTEM TRUTH.
      </div>
    </div>
  );
};

export default KineticStatusDemo;