import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useVelocity, useTransform, AnimatePresence } from 'framer-motion';

const EarnedLegibilityDemo = () => {
  const mouseX = useMotionValue(0);
  const velocity = useVelocity(mouseX);
  const [decryption, setDecryption] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => mouseX.set(e.clientX);
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const v = Math.abs(velocity.get());
      if (v < 10) { // Nearly still
        setDecryption(prev => Math.min(1, prev + 0.02));
        setIsFocused(true);
      } else {
        setDecryption(prev => Math.max(0, prev - 0.05));
        setIsFocused(false);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [velocity]);

  const rawData = "THE_QUICK_BROWN_FOX_JUMPS_OVER_THE_LAZY_LOGIC_GATE_010101";
  
  const getScrambled = (text: string, level: number) => {
    return text.split('').map((char, i) => {
      if (level > (i / text.length)) return char;
      return String.fromCharCode(33 + Math.floor(Math.random() * 94));
    }).join('');
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black p-12 gap-12 overflow-hidden">
      <div className="text-center">
        <h4 className="text-3xl font-black italic tracking-tighter uppercase text-white">Earned_Data</h4>
        <p className="mono text-[9px] text-neutral-700 mt-2 uppercase tracking-[0.5em]">Stability_Protocol_v2</p>
      </div>

      <div className="relative w-full max-w-2xl bg-neutral-900 border border-white/5 p-12 rounded-3xl overflow-hidden min-h-[200px] flex items-center justify-center">
        {/* Background Noise Shader Emulation */}
        <motion.div 
          animate={{ opacity: 1 - decryption }}
          className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:10px_10px] pointer-events-none"
        />

        <div className="relative z-10 text-center">
          <motion.p 
            animate={{ 
              filter: `blur(${(1 - decryption) * 10}px)`,
              letterSpacing: `${(1 - decryption) * 10}px`,
              opacity: 0.2 + decryption * 0.8
            }}
            className="mono text-2xl font-bold text-cyan-500 break-all leading-relaxed"
          >
            {getScrambled(rawData, decryption)}
          </motion.p>
        </div>

        {/* Progress HUD */}
        <div className="absolute top-4 right-6 flex items-center gap-3 mono text-[8px]">
          <span className={isFocused ? 'text-cyan-500 animate-pulse' : 'text-neutral-700'}>
            {isFocused ? 'DECRYPTING...' : 'HOLD_STILL'}
          </span>
          <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
             <motion.div animate={{ width: `${decryption * 100}%` }} className="h-full bg-cyan-500" />
          </div>
        </div>
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-600 leading-relaxed uppercase">
        INFORMATION IS PROTECTED BY A KINETIC GATE. HOLD YOUR CURSOR PERFECTLY STILL TO SOLIDIFY THE BITSTREAM.
      </div>
    </div>
  );
};

export default EarnedLegibilityDemo;
