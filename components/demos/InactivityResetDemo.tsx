
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InactivityResetDemo = ({ temporal }: any) => {
  const [isActive, setIsActive] = useState(false);
  const [charge, setCharge] = useState(100);
  const { lastActivity = Date.now(), entropy = 0 } = temporal || {};

  const wake = () => setIsActive(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const idleTime = Date.now() - lastActivity;
      const decayThreshold = 4000 - (entropy * 3000); // Entropy makes it reset faster
      const remaining = Math.max(0, 1 - idleTime / decayThreshold);
      setCharge(remaining * 100);
      
      if (idleTime > decayThreshold) {
        setIsActive(false);
      } else {
        setIsActive(true);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [lastActivity, entropy]);

  return (
    <div 
      onClick={wake}
      className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-950 overflow-hidden gap-12 relative cursor-pointer"
    >
      <div className="absolute top-12 flex items-center gap-4 mono text-[10px]">
         <span className="text-neutral-500 uppercase tracking-widest">Temporal_Coherence</span>
         <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div animate={{ width: `${charge}%`, backgroundColor: charge < 30 ? '#f43f5e' : '#06b6d4' }} className="h-full" />
         </div>
         <span className="mono text-white">{(charge).toFixed(0)}%</span>
      </div>

      <AnimatePresence mode="wait">
        {isActive && charge > 5 ? (
          <motion.div
            key="manifest"
            initial={{ scale: 0, opacity: 0, rotate: -90, filter: 'blur(40px)' }}
            animate={{ scale: 1, opacity: 1, rotate: 0, filter: 'blur(0px)' }}
            exit={{ scale: 1.2, opacity: 0, rotate: 45, filter: 'blur(40px)', transition: { duration: 1.5, ease: 'circIn' } }}
            className="w-full max-w-sm bg-neutral-900 border border-white/10 p-12 rounded-[3rem] flex flex-col gap-10 shadow-2xl relative"
          >
            <div className="space-y-2">
               <h3 className="text-3xl font-black italic tracking-tighter text-white">QUANTUM_LOCKED</h3>
               <p className="mono text-[8px] text-cyan-500 uppercase tracking-[0.4em]">Auth_Session_Valid</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               {[...Array(4)].map((_, i) => (
                 <div key={i} className="h-12 bg-white/5 border border-white/5 rounded-xl animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />
               ))}
            </div>

            <div className="h-10 w-full bg-cyan-500/10 border border-cyan-500/20 rounded-full flex items-center justify-center font-black mono text-[10px] tracking-widest text-cyan-400">
               ENCRYPTED_NODE_L3
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="singularity"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            className="flex flex-col items-center gap-8"
          >
            <div className="w-20 h-20 bg-white rounded-full blur-3xl" />
            <p className="mono text-[10px] text-neutral-600 animate-pulse tracking-[1em] uppercase">Disconnected</p>
            <span className="mono text-[8px] text-neutral-800">TAP_TO_REMATERIALIZE</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-600 leading-relaxed uppercase">
        {entropy > 0.5 ? "ENTROPY_HIGH: PERSISTENCE_DURATION_REDUCED" : "STABLE_FIELD: PERSISTENCE_DURATION_NORMAL"}
      </div>
    </div>
  );
};

export default InactivityResetDemo;
