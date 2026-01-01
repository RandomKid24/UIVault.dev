import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CadenceLockDemo = () => {
  const [cadence, setCadence] = useState(0); // 0 to 1
  const [isLocked, setIsLocked] = useState(true);
  const lastClick = useRef(Date.now());
  const targetBPM = 120;
  const targetInterval = (60 / targetBPM) * 1000;

  const handleClick = () => {
    const now = Date.now();
    const interval = now - lastClick.current;
    const diff = Math.abs(interval - targetInterval);
    
    // Check if click interval is within 100ms of target (120BPM)
    if (diff < 120) {
      setCadence(prev => Math.min(1, prev + 0.2));
    } else {
      setCadence(prev => Math.max(0, prev - 0.3));
    }
    lastClick.current = now;
  };

  useEffect(() => {
    if (cadence >= 0.9) setIsLocked(false);
    else setIsLocked(true);

    const decay = setInterval(() => {
      setCadence(prev => Math.max(0, prev - 0.01));
    }, 100);
    return () => clearInterval(decay);
  }, [cadence]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-950 p-12 gap-12">
      <div className="text-center">
        <h4 className="text-3xl font-black italic tracking-tighter">CADENCE_AUTH</h4>
        <p className="mono text-[9px] text-neutral-500 uppercase tracking-widest mt-2">BPM_TARGET: 120</p>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="absolute inset-0 border-2 border-cyan-500/20 rounded-full"
        />

        <motion.button
          onClick={handleClick}
          animate={{ 
            scale: isLocked ? 1 : 1.1,
            backgroundColor: isLocked ? '#111' : '#fff',
            color: isLocked ? '#555' : '#000',
            borderColor: `rgba(6, 182, 212, ${cadence})`
          }}
          className="w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center gap-2 relative z-10 transition-colors"
        >
          <span className="mono text-[10px] font-black">{isLocked ? 'TAP_RYHTM' : 'OPENED'}</span>
        </motion.button>

        {/* Cadence Meter */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
           <circle cx="128" cy="128" r="80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
           <motion.circle 
              cx="128" cy="128" r="80" fill="none" stroke="#06b6d4" strokeWidth="4" 
              strokeDasharray="502"
              animate={{ strokeDashoffset: 502 - (502 * cadence) }}
           />
        </svg>
      </div>

      <AnimatePresence>
        {!isLocked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-cyan-500 text-black font-black italic rounded-xl text-center"
          >
            BIO_RHYTHM_MATCHED: ACCESS_GRANTED
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-xs text-center mono text-[8px] text-neutral-700 leading-relaxed uppercase">
        THE INTERFACE RESISTS SPASMODIC OR RANDOM INPUT. SYNCHRONIZE YOUR PHYSICAL PULSE WITH THE SYSTEM CLOCK TO UNLOCK.
      </div>
    </div>
  );
};

export default CadenceLockDemo;
