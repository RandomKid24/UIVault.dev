
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PlasmaConduitLoaderDemo = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + 0.3));
    }, 32);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[#020202] flex flex-col items-center justify-center p-12 overflow-hidden gap-20">
      <div className="text-center z-10">
        <h4 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none">Plasma_Conduit</h4>
        <p className="mono text-[10px] text-cyan-500 mt-4 uppercase tracking-[0.8em]">Coalescence_Signal_v2.4</p>
      </div>

      <div className="relative w-full max-w-2xl h-24 flex items-center">
        {/* The Conduit Glass Tube */}
        <div className="absolute inset-0 border-y border-white/10 bg-neutral-900/40 rounded-full overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
           <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>

        {/* Fluid Interaction Area with Gooey Filter */}
        <div className="relative flex-1 h-full px-8" style={{ filter: 'url(#plasma-goo)' }}>
           {/* Progress Blobs */}
           <motion.div 
            animate={{ width: `${progress}%` }}
            className="h-full bg-cyan-500 relative flex items-center justify-end transition-all duration-300 rounded-full"
           >
              {/* Leader Blob */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.4, 1],
                  x: [0, 5, 0]
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-16 h-16 bg-cyan-400 rounded-full shadow-[0_0_40px_cyan]"
              />

              {/* Trailing Turbulence */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    x: [0, -100 - i * 40],
                    scale: [1, 0],
                    opacity: [0.6, 0]
                  }}
                  transition={{ 
                    duration: 1 + i * 0.2, 
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                  className="absolute right-8 w-12 h-12 bg-cyan-600 rounded-full"
                />
              ))}
           </motion.div>

           {/* Anticipation "Floating" Seeds */}
           {! (progress > 90) && [...Array(3)].map((_, i) => (
             <motion.div
              key={`seed-${i}`}
              animate={{ 
                x: [800, -100],
                y: [Math.sin(i) * 20, Math.sin(i + 1) * -20]
              }}
              transition={{ 
                duration: 4 + i, 
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-800/40 rounded-full blur-sm"
             />
           ))}
        </div>

        {/* HUD Markers */}
        <div className="absolute top-0 left-0 bottom-0 flex flex-col justify-between py-2 px-4 opacity-20 pointer-events-none">
           <span className="mono text-[7px] text-white">MIN_00</span>
           <span className="mono text-[7px] text-white">MAX_FF</span>
        </div>
        <div className="absolute top-1/2 right-4 -translate-y-1/2 mono text-xl font-black italic text-cyan-400 drop-shadow-[0_0_10px_cyan] z-20">
          {progress.toFixed(0)}%
        </div>
      </div>

      <div className="max-w-md text-center mono text-[9px] text-neutral-800 leading-relaxed uppercase">
        INSTRUMENT_CLASS: FLUID_CONDUIT. DATA IS REPRESENTED AS A HIGH-VISCOSITY PLASMA STREAM. SYNC INTEGRITY MAINTAINED THROUGH GOOEY RECOMBINATION LOGIC.
      </div>

      <svg className="hidden">
        <defs>
          <filter id="plasma-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default PlasmaConduitLoaderDemo;
