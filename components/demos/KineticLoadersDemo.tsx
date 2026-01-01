
import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';

const KineticLoadersDemo = () => {
  const [progress, setProgress] = useState(0);
  const [isAuto, setIsAuto] = useState(true);

  useEffect(() => {
    if (!isAuto) return;
    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + Math.random() * 15));
    }, 1500);
    return () => clearInterval(interval);
  }, [isAuto]);

  return (
    <div className="w-full h-full bg-[#020202] p-12 overflow-y-auto scrollbar-hide">
      <div className="max-w-4xl mx-auto space-y-24 pb-20">
        
        {/* Header Telemetry */}
        <div className="flex justify-between items-end border-b border-white/5 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
              <span className="mono text-[10px] text-cyan-500 font-black tracking-[0.4em] uppercase">Load_Primitives_v9</span>
            </div>
            <h2 className="text-5xl font-black italic tracking-tighter text-white uppercase">Vect_Sync</h2>
          </div>
          <div className="flex flex-col items-end gap-2">
             <button 
              onClick={() => setIsAuto(!isAuto)}
              className="px-4 py-2 border border-white/10 mono text-[9px] text-neutral-500 hover:text-white transition-colors"
             >
               AUTO_CYCLE: {isAuto ? 'ON' : 'OFF'}
             </button>
             <span className="mono text-[10px] text-neutral-700">COORD_SYNC: {(progress/100).toFixed(4)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* 1. Tectonic Momentum */}
          <div className="space-y-6">
            <div className="flex justify-between items-center mono text-[9px] text-neutral-500 uppercase tracking-widest">
              <span>01 // Tectonic_Inertia</span>
              <span className="text-cyan-500">{progress.toFixed(0)}%</span>
            </div>
            <div className="h-4 w-full bg-neutral-900 border border-white/5 rounded-full overflow-hidden p-1">
              <motion.div 
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', stiffness: 80, damping: 12 }}
                className="h-full bg-white rounded-full relative"
              >
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-cyan-400 to-transparent blur-sm" />
              </motion.div>
            </div>
            <p className="text-[10px] text-neutral-600 mono leading-relaxed">USES MASS-WEIGHTED SPRINGS TO SIMULATE KINETIC OVERRUN ON DATA ARRIVAL.</p>
          </div>

          {/* 2. Stratified Z-Fill */}
          <div className="space-y-6">
            <div className="flex justify-between items-center mono text-[9px] text-neutral-500 uppercase tracking-widest">
              <span>02 // Strata_Depth</span>
              <span className="text-white">{progress.toFixed(0)}%</span>
            </div>
            <div className="relative h-12 w-full perspective-[1000px]">
               {[0, 1, 2].map((i) => (
                 <motion.div
                   key={i}
                   animate={{ 
                    width: `${progress}%`,
                    translateZ: -i * 20,
                    opacity: 1 - i * 0.3
                   }}
                   transition={{ 
                    width: { duration: 1.2, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } 
                   }}
                   className="absolute inset-y-0 left-0 bg-cyan-500/20 border-r-2 border-cyan-500 h-full origin-left"
                   style={{ transformStyle: 'preserve-3d' }}
                 />
               ))}
               <div className="absolute inset-0 border border-white/5 rounded-sm" />
            </div>
            <p className="text-[10px] text-neutral-600 mono leading-relaxed">A VOLUMETRIC STACK REVEALING PROGRESS ACROSS INDEPENDENT Z-PLANE STRATA.</p>
          </div>

          {/* 3. Photonic Bleed */}
          <div className="space-y-6">
            <div className="flex justify-between items-center mono text-[9px] text-neutral-500 uppercase tracking-widest">
              <span>03 // Photonic_Bleed</span>
              <span className="text-cyan-400">{progress.toFixed(0)}%</span>
            </div>
            <div className="h-1 w-full bg-white/5 relative overflow-visible">
               <motion.div
                 animate={{ left: `${progress}%` }}
                 transition={{ duration: 1, ease: "easeInOut" }}
                 className="absolute top-1/2 -translate-y-1/2 w-32 h-32 -translate-x-1/2 bg-cyan-500/20 blur-3xl rounded-full pointer-events-none"
               />
               <motion.div
                 animate={{ left: `${progress}%` }}
                 transition={{ duration: 1, ease: "easeInOut" }}
                 className="absolute top-1/2 -translate-y-1/2 w-1 h-6 -translate-x-1/2 bg-white shadow-[0_0_20px_cyan]"
               />
               <motion.div 
                animate={{ width: `${progress}%` }}
                className="absolute inset-y-0 left-0 bg-cyan-500/40 h-full" 
               />
            </div>
            <p className="text-[10px] text-neutral-600 mono leading-relaxed">REPRESENTS DATA AS A RADIATING PHOTONIC SEED TRAVELING THROUGH THE SYSTEM VOID.</p>
          </div>

          {/* 4. Entropy Stabilization */}
          <div className="space-y-6">
            <div className="flex justify-between items-center mono text-[9px] text-neutral-500 uppercase tracking-widest">
              <span>04 // Entropy_Crystalline</span>
              <span className="text-white font-black">{progress.toFixed(0)}%</span>
            </div>
            <div className="h-8 w-full bg-neutral-900 border border-white/5 relative flex items-center p-1">
               <motion.div
                 animate={{ 
                    width: `${progress}%`,
                    filter: `blur(${Math.max(0, (100 - progress) / 5)}px)`,
                    skew: (100 - progress) / 2
                 }}
                 className="h-full bg-gradient-to-r from-neutral-800 to-white relative"
               >
                 {progress < 90 && (
                    <motion.div 
                      animate={{ x: [0, 5, -5, 0] }} 
                      transition={{ repeat: Infinity, duration: 0.1 }}
                      className="absolute inset-0 bg-white/20" 
                    />
                 )}
               </motion.div>
            </div>
            <p className="text-[10px] text-neutral-600 mono leading-relaxed">INFORMATION EMERGES FROM STOCHASTIC NOISE, STABILIZING AS SIGNAL GAINS STRENGTH.</p>
          </div>
        </div>

        {/* Interaction Zone */}
        <div className="mt-12 p-12 border border-dashed border-white/5 rounded-[3rem] flex flex-col items-center gap-8">
           <span className="mono text-[10px] text-neutral-700 tracking-[1em] uppercase">Manual_Override_Input</span>
           <input 
            type="range" min="0" max="100" 
            value={progress} 
            onChange={(e) => { setIsAuto(false); setProgress(parseFloat(e.target.value)); }}
            className="w-full h-1 bg-white/5 rounded-full appearance-none accent-cyan-500 cursor-pointer"
           />
           <div className="grid grid-cols-4 gap-4 w-full">
              {[0, 25, 50, 75, 100].map(v => (
                <button key={v} onClick={() => { setIsAuto(false); setProgress(v); }} className="mono text-[8px] text-neutral-500 hover:text-white transition-colors">SET_{v}%</button>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default KineticLoadersDemo;
