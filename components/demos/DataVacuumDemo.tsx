import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DataVacuumDemo = () => {
  const [hasData, setHasData] = useState(true);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#030303] p-12 gap-20 overflow-hidden relative">
      <div className="text-center">
        <h4 className="text-3xl font-black italic tracking-tighter uppercase text-white">State_Vacuum</h4>
        <p className="mono text-[10px] text-neutral-700 uppercase tracking-widest mt-2">Persistence_Check_v0.1</p>
      </div>

      <div className="relative w-80 h-80 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {hasData ? (
            <motion.div
              key="data"
              initial={{ scale: 0, rotate: -90, filter: 'blur(20px)' }}
              animate={{ scale: 1, rotate: 0, filter: 'blur(0px)' }}
              exit={{ 
                scale: 0.1, 
                rotate: 180, 
                filter: 'blur(40px)',
                opacity: 0,
                transition: { duration: 0.8, ease: "circIn" } 
              }}
              className="w-full h-full bg-neutral-900 border-2 border-cyan-500/20 rounded-[4rem] p-12 flex flex-col justify-between shadow-[0_0_100px_rgba(6,182,212,0.1)]"
            >
               <div className="flex justify-between items-start">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                  <span className="mono text-[8px] text-neutral-600">LIVE_BITSTREAM</span>
               </div>
               <div className="space-y-4">
                  <div className="h-6 w-3/4 bg-white/10 rounded" />
                  <div className="h-2 w-full bg-white/5 rounded" />
                  <div className="h-2 w-1/2 bg-white/5 rounded" />
               </div>
               <div className="h-10 w-full bg-cyan-500/10 rounded-xl" />
            </motion.div>
          ) : (
            <motion.div
              key="void"
              initial={{ opacity: 0, scale: 2 }}
              animate={{ opacity: 1, scale: [1, 1.1, 1] }}
              transition={{ scale: { repeat: Infinity, duration: 4 } }}
              className="flex flex-col items-center gap-8"
            >
               <div className="w-24 h-24 border border-white/5 rounded-full flex items-center justify-center">
                  <motion.div 
                    animate={{ scale: [1, 0.2, 1], opacity: [0.1, 0.5, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 bg-white rounded-full blur-2xl" 
                  />
               </div>
               <span className="mono text-[10px] text-neutral-800 tracking-[1em] uppercase">Void_Detected</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button 
        onClick={() => setHasData(!hasData)}
        className={`px-12 py-3 border-2 font-black italic mono text-xs tracking-widest transition-all ${
          hasData ? 'bg-rose-500 border-rose-500 text-white' : 'bg-cyan-500 border-cyan-500 text-black'
        }`}
      >
        {hasData ? 'NULLIFY_DATASET' : 'INITIALIZE_BITSTREAM'}
      </button>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-800 leading-relaxed uppercase">
        THE ABSENCE OF DATA IS NOT A ZERO — IT IS A PHYSICAL COLLAPSE OF THE INTERFACE TOPOLOGY TOWARD A NON-EXISTENT CORE.
      </div>
    </div>
  );
};

export default DataVacuumDemo;
