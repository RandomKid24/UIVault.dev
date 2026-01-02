
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const StrataLoaderDemo = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + Math.random() * 15));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[#030303] flex flex-col items-center justify-center p-12 gap-16 overflow-hidden">
      <div className="text-center">
        <h4 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none">Strata_Depth</h4>
        <p className="mono text-[10px] text-cyan-500 mt-4 uppercase tracking-[0.6em]">Volumetric_Z-Fill_Sync</p>
      </div>

      <div className="relative w-full max-w-md h-20 perspective-[1000px] flex items-center justify-center">
         {[0, 1, 2, 3].map((i) => (
           <motion.div
             key={i}
             animate={{ 
              width: `${progress}%`,
              opacity: 1 - i * 0.2
             }}
             style={{
               translateZ: -i * 30,
               transformStyle: 'preserve-3d',
               height: '100%'
             }}
             transition={{ 
              width: { duration: 1.2, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } 
             }}
             className="absolute left-0 bg-cyan-500/20 border-r-2 border-cyan-500 origin-left"
           />
         ))}
         <div className="absolute inset-0 border border-white/5 rounded-sm pointer-events-none" />
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-8 mono text-[9px] text-neutral-600 uppercase tracking-widest">
           <span>Depth_Vectors: 04</span>
           <span>Buffer: Staggered</span>
        </div>
        <div className="text-white font-black italic text-5xl tracking-tighter">
          {progress.toFixed(0)}%
        </div>
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-800 leading-relaxed uppercase">
        PROGRESS IS REVEALED ACROSS INDEPENDENT SPATIAL STRATA. EACH LAYER OBSERVES A UNIQUE TEMPORAL OFFSET TO COMMUNICATE DATA DENSITY.
      </div>
    </div>
  );
};

export default StrataLoaderDemo;
