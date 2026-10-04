
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';

const PressureExecutionDemo = () => {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startHold = () => {
    setIsHolding(true);
    timerRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setIsSuccess(true);
          setIsHolding(false);
          if (timerRef.current) clearInterval(timerRef.current);
          return 100;
        }
        return p + 1.5;
      });
    }, 16);
  };

  const endHold = () => {
    setIsHolding(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isSuccess) {
      setProgress(0);
    }
  };

  const reset = () => {
    setIsSuccess(false);
    setProgress(0);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-950 overflow-hidden relative">
      <div className="text-center z-10 space-y-4 mb-20">
        <h4 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none">Pressure_Lock</h4>
        <p className="mono text-[10px] text-rose-500 uppercase tracking-[0.5em] animate-pulse">Critical_Command_Protected</p>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="trigger"
              className="relative"
            >
               {/* Magnetic Field Glow */}
               <motion.div
                animate={{ 
                  scale: isHolding ? [1, 1.2, 1] : 1,
                  opacity: isHolding ? (progress / 100) : 0,
                  backgroundColor: progress > 80 ? '#f43f5e' : '#06b6d4'
                }}
                className="absolute -inset-20 blur-[80px] rounded-full pointer-events-none"
               />

               <motion.button
                onMouseDown={startHold}
                onMouseUp={endHold}
                onMouseLeave={endHold}
                animate={{ 
                  scale: isHolding ? 0.95 : 1,
                  backgroundColor: isHolding ? '#111' : '#fff',
                  color: isHolding ? '#fff' : '#000',
                  borderRadius: isHolding ? '40px' : '100px'
                }}
                className="w-48 h-48 border-8 border-white flex flex-col items-center justify-center gap-2 select-none active:scale-95 transition-all cursor-pointer shadow-2xl"
               >
                 <span className="mono text-[10px] font-black uppercase tracking-widest">{isHolding ? 'BUILDING...' : 'HOLD_EXEC'}</span>
                 <div className="text-3xl font-black italic tracking-tighter">{(progress).toFixed(0)}%</div>
               </motion.button>

               {/* Structural Compression Frame */}
               <motion.div 
                animate={{ 
                  rotate: isHolding ? progress * 3.6 : 0,
                  opacity: isHolding ? 0.4 : 0.1,
                  scale: isHolding ? 1.2 : 1.1
                }}
                className="absolute -inset-4 border-2 border-dashed border-white rounded-full pointer-events-none" 
               />
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              className="flex flex-col items-center"
            >
              <div className="w-48 h-48 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(6,182,212,0.5)]">
                 <h3 className="text-black font-black text-4xl italic tracking-tighter uppercase">EXECUTED</h3>
              </div>
              <button 
                onClick={reset}
                className="mt-12 px-8 py-3 border border-white/10 mono text-[9px] text-neutral-500 hover:text-white transition-colors uppercase tracking-[0.4em]"
              >
                Reset_Temporal_State
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-12 max-w-xs text-center mono text-[9px] text-neutral-800 leading-relaxed uppercase">
        INSTRUMENT_CLASS: PRESSURE_GATE. UNLOCKS ONLY WHEN SENSORS DETECT A PERSISTENT INTENT VECTOR OVER 3 SECONDS.
      </div>
    </div>
  );
};

export default PressureExecutionDemo;
