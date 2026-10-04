
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PhotonicLoaderDemo = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + Math.random() * 15));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center p-12 gap-20 overflow-hidden">
      <div className="text-center">
        <h4 className="text-4xl font-black italic tracking-tighter text-white uppercase">Photonic_Bleed</h4>
        <p className="mono text-[10px] text-neutral-600 mt-2 uppercase tracking-[0.6em]">Volumetric_Wait_State</p>
      </div>

      <div className="relative w-full max-w-lg h-1 bg-white/5 overflow-visible">
        {/* Progress Fill */}
        <motion.div 
          animate={{ width: `${progress}%` }}
          className="absolute inset-y-0 left-0 bg-cyan-500/30"
        />

        {/* Photonic Seed */}
        <motion.div
          animate={{ left: `${progress}%` }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
        >
          {/* Main Core */}
          <div className="w-1 h-6 bg-white shadow-[0_0_20px_cyan]" />
          
          {/* Light Spill */}
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full"
          />
        </motion.div>

        {/* Background Trace */}
        <div className="absolute inset-0 pointer-events-none border-x border-white/10" />
      </div>

      <div className="mono text-[9px] text-neutral-800 uppercase tracking-widest text-center max-w-xs">
        Data represented as a radiating photonic seed traveling through the system void.
      </div>
    </div>
  );
};

export default PhotonicLoaderDemo;
