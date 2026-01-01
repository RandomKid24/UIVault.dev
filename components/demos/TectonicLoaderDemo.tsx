
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TectonicLoaderDemo = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + Math.random() * 20));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col items-center justify-center p-12 gap-12">
      <div className="text-center">
        <h4 className="text-3xl font-black italic tracking-tighter uppercase text-white">Tectonic_Inertia</h4>
        <p className="mono text-[10px] text-cyan-500 mt-2 tracking-[0.4em]">Mass-Weighted_Spring_Sync</p>
      </div>

      <div className="w-full max-w-md h-6 bg-neutral-900 border border-white/5 rounded-full overflow-hidden p-1 relative">
        <motion.div 
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 12 }}
          className="h-full bg-white rounded-full relative"
        >
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-cyan-400 to-transparent blur-sm" />
          <motion.div 
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="absolute right-0 top-0 bottom-0 w-1 bg-cyan-500 shadow-[0_0_15px_cyan]"
          />
        </motion.div>
      </div>

      <div className="flex gap-12 mono text-[10px] text-neutral-600">
        <div>STATUS: {progress > 95 ? 'FINALIZING' : 'PROCESSING'}</div>
        <div>VECT_LOCK: {(progress/100).toFixed(4)}</div>
      </div>
    </div>
  );
};

export default TectonicLoaderDemo;
