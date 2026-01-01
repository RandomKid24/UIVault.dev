import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ThermalOverloadDemo = () => {
  const [heat, setHeat] = useState(0); // 0 to 1
  const [isLocked, setIsLocked] = useState(false);

  const interact = () => {
    if (isLocked) return;
    setHeat(prev => Math.min(1, prev + 0.15));
  };

  useEffect(() => {
    if (heat >= 1) {
      setIsLocked(true);
      setTimeout(() => {
        setHeat(0);
        setIsLocked(false);
      }, 5000);
    }

    const decay = setInterval(() => {
      setHeat(prev => Math.max(0, prev - 0.02));
    }, 200);
    return () => clearInterval(decay);
  }, [heat]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-950 p-12 gap-12 overflow-hidden relative">
      <div className="text-center z-20">
        <h4 className="text-4xl font-black italic tracking-tighter uppercase text-white">Thermal_Gate</h4>
        <p className={`mono text-[10px] mt-2 uppercase tracking-[0.4em] transition-colors duration-500 ${heat > 0.7 ? 'text-rose-500' : 'text-cyan-500'}`}>
          CORE_TEMP: {(heat * 1200).toFixed(0)}K
        </p>
      </div>

      <div className="relative w-80 h-40">
        <motion.button
          onClick={interact}
          animate={{ 
            backgroundColor: isLocked ? '#222' : '#fff',
            color: isLocked ? '#555' : '#000',
            filter: `blur(${heat * 15}px)`,
            scale: 1 + heat * 0.2,
            skewX: heat * (Math.random() - 0.5) * 40
          }}
          className="w-full h-full rounded-2xl font-black text-2xl italic uppercase relative z-10 border-4 border-transparent active:scale-95 transition-colors"
        >
          {isLocked ? 'SYSTEM_OVERLOAD' : 'EXECUTE_PROCESS'}
        </motion.button>

        {/* Heat Aura */}
        <motion.div 
          animate={{ 
            opacity: heat * 0.6,
            scale: 1 + heat * 2,
            backgroundColor: heat > 0.8 ? '#f43f5e' : '#fb923c'
          }}
          className="absolute inset-0 blur-3xl rounded-full z-0 pointer-events-none"
        />
      </div>

      <div className="w-64 h-2 bg-white/5 rounded-full overflow-hidden relative z-20">
         <motion.div 
            animate={{ width: `${heat * 100}%`, backgroundColor: heat > 0.7 ? '#f43f5e' : '#06b6d4' }}
            className="h-full" 
         />
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-600 leading-relaxed uppercase">
        INTERACTING TOO RAPIDLY GENERATES THERMAL ENTROPY. UPON REACHING CRITICAL TEMPERATURE, THE INTERFACE WILL LOCK UNTIL COOLING IS COMPLETE.
      </div>

      <AnimatePresence>
        {isLocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-rose-500/10 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-none"
          >
             <div className="text-center">
                <div className="text-8xl font-black italic text-rose-600 opacity-20 select-none">HOT</div>
                <p className="mono text-[11px] text-rose-500 font-bold tracking-[1em] animate-pulse uppercase">Cooling_Protocol_Active</p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThermalOverloadDemo;
