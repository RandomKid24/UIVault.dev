import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DecayTimerDemo = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isDead, setIsDead] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsDead(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const entropyLevel = 1 - timeLeft / 60;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-black gap-16 overflow-hidden relative">
      <div className="text-center z-10">
        <h4 className="text-3xl font-black italic tracking-tighter text-white uppercase">Decay_Clock</h4>
        <p className="mono text-[9px] text-neutral-600 mt-2 uppercase tracking-[0.4em]">Temporal_Disintegration</p>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isDead ? (
            <motion.div
              key="timer"
              animate={{ 
                rotate: timeLeft * 6,
                // Fix: skewX or skewY are valid transform properties in framer-motion, not generic skew
                skewX: entropyLevel * 30,
                filter: `blur(${entropyLevel * 5}px)`,
                scale: 1 - entropyLevel * 0.2
              }}
              className="relative w-48 h-48 border-4 border-cyan-500 rounded-3xl flex items-center justify-center bg-cyan-500/5 shadow-[0_0_40px_rgba(6,182,212,0.1)]"
            >
               <span className="text-7xl font-black italic tracking-tighter leading-none">{timeLeft}</span>
               <span className="mono text-[10px] mt-2 opacity-40 uppercase tracking-widest font-black">Seconds</span>

               {/* Disintegrating shards */}
               <div className="absolute inset-0 pointer-events-none">
                 {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        opacity: entropyLevel > (i/6) ? [0.4, 0] : 0,
                        x: (Math.random() - 0.5) * 200,
                        y: (Math.random() - 0.5) * 200,
                        rotate: Math.random() * 360
                      }}
                      className="absolute w-4 h-4 bg-cyan-500/20 border border-cyan-500/40"
                    />
                 ))}
               </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
               <div className="text-8xl font-black italic text-rose-600 opacity-20">VOID</div>
               <p className="mono text-rose-500 text-[10px] font-bold tracking-[1em] uppercase animate-pulse">Session_Entropy_Maxed</p>
               <button 
                onClick={() => { setTimeLeft(60); setIsDead(false); }}
                className="mt-8 px-10 py-3 border border-white/10 mono text-[9px] hover:bg-white hover:text-black transition-colors"
               >
                 REGENERATE_TIME
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-800 leading-relaxed uppercase">
        TIME IS NOT A NUMBER. IT IS A GEOMETRIC STRUCTURE THAT WEARS AND DISINTEGRATES AS IT MOVES TOWARD THE EVENT HORIZON.
      </div>
    </div>
  );
};

export default DecayTimerDemo;