
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BismuthGrowthLoaderDemo = () => {
  const [progress, setProgress] = useState(0);
  const maxLayers = 8;
  const currentLayers = Math.floor((progress / 100) * maxLayers);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + 0.5));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col items-center justify-center p-12 overflow-hidden perspective-[1000px]">
      <div className="text-center mb-24 z-50">
        <h4 className="text-4xl font-black italic tracking-tighter uppercase text-white">Bismuth_Growth</h4>
        <p className="mono text-[10px] text-cyan-500 mt-2 uppercase tracking-[0.4em]">Isometric_Recursive_Stack</p>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center transform-gpu [transform-style:preserve-3d] rotate-x-[60deg] rotate-z-[45deg]">
        <AnimatePresence>
          {[...Array(maxLayers)].map((_, i) => (
            i <= currentLayers && (
              <CrystalLayer 
                key={i} 
                index={i} 
                total={maxLayers} 
                progress={progress} 
              />
            )
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-32 w-64 space-y-4">
        <div className="flex justify-between mono text-[10px] text-neutral-600">
           <span>STRATA_GEN: {currentLayers}</span>
           <span>SYNC: {progress.toFixed(0)}%</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
           <motion.div 
            animate={{ width: `${progress}%` }} 
            className="h-full bg-cyan-500 shadow-[0_0_15px_cyan]" 
           />
        </div>
      </div>
    </div>
  );
};

const CrystalLayer = ({ index, total }: any) => {
  const size = 180 - (index * 20);
  const hue = 180 + (index * 30);
  
  return (
    <motion.div
      initial={{ opacity: 0, translateZ: -100, scale: 0.8 }}
      animate={{ opacity: 1, translateZ: index * 20, scale: 1 }}
      exit={{ opacity: 0, translateZ: 200, scale: 1.2 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      style={{ 
        width: size, 
        height: size,
        backgroundColor: `hsla(${hue}, 80%, 50%, 0.1)`,
        borderColor: `hsla(${hue}, 80%, 60%, 0.5)`,
        borderWidth: '2px',
        boxShadow: `0 0 40px hsla(${hue}, 80%, 40%, 0.2)`
      }}
      className="absolute rounded-lg backdrop-blur-sm flex items-center justify-center"
    >
      <div className="absolute inset-2 border border-white/5 rounded-md" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      <span className="mono text-[8px] font-bold text-white/20 select-none">L_{index}</span>
    </motion.div>
  );
};

export default BismuthGrowthLoaderDemo;
