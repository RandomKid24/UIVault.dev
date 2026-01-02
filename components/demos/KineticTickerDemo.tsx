
import React, { useState, useEffect } from 'react';
import { motion, useTime, useTransform, useMotionValue, useSpring } from 'framer-motion';

const KineticTickerDemo = () => {
  const momentum = useMotionValue(0.5);
  const [displayVal, setDisplayVal] = useState(50);
  
  // Smooth the input for fluid transitions
  const smoothMomentum = useSpring(momentum, { stiffness: 100, damping: 20 });
  
  const time = useTime();
  
  // Deriving frequency and amplitude from the smooth motion value
  const frequency = useTransform(smoothMomentum, [0, 1], [2, 30]);
  const amplitude = useTransform(smoothMomentum, [0, 1], [2, 25]);
  const opacity = useTransform(smoothMomentum, [0, 1], [0.2, 1]);
  const blur = useTransform(smoothMomentum, [0, 1], [0, 8]);

  // The primary oscillation loop: sin(time * frequency) * amplitude
  const oscillate = useTransform([time, frequency, amplitude], ([t, f, a]: any) => {
    return Math.sin((t as number) * (f as number) / 1000) * (a as number);
  });

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    momentum.set(val);
    setDisplayVal(Math.round(val * 100));
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-950 p-12 gap-16 overflow-hidden relative">
      <div className="text-center space-y-2 z-10">
        <h4 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none">Momentum_Ticker</h4>
        <p className="mono text-[10px] text-cyan-500 uppercase tracking-[0.5em]">Load_Signature: {displayVal}%</p>
      </div>

      {/* Vibration Array */}
      <div className="flex gap-6 items-center h-48">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            style={{ 
              y: oscillate, 
              opacity,
              height: 80 + (i * 15),
              filter: useTransform(blur, (v) => `blur(${v}px)`)
            }}
            transition={{ delay: i * 0.02 }}
            className="w-1.5 bg-white rounded-full relative"
          >
             {/* Core Energy Pulse */}
             <motion.div 
               animate={{ height: ['0%', '100%', '0%'] }}
               transition={{ 
                 duration: 2 / (displayVal/50 + 0.5), 
                 repeat: Infinity, 
                 ease: "linear",
                 delay: i * 0.1 
               }}
               className="absolute inset-x-0 bottom-0 bg-cyan-500 shadow-[0_0_20px_cyan]"
             />
          </motion.div>
        ))}
      </div>

      {/* Control Module */}
      <div className="w-full max-w-sm flex flex-col gap-6 z-10">
        <input 
          type="range" min="0" max="1" step="0.01" 
          defaultValue={0.5}
          onChange={handleSliderChange}
          className="w-full accent-cyan-500 h-1 bg-white/5 rounded-full appearance-none cursor-pointer"
        />
        <div className="flex justify-between mono text-[8px] text-neutral-600 uppercase tracking-[0.4em]">
          <span>Stable_Idle</span>
          <span>Critical_Volatile</span>
        </div>
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-800 leading-relaxed uppercase">
        INSTRUMENT_CLASS: KINETIC_MONITOR. COMMUNICATES DATA "HEALTH" VIA RHYTHMIC TURBULENCE. PERCEIVE SYSTEM LOAD WITHOUT READING DIGITS.
      </div>

      {/* Peripheral Activity Indicators */}
      <div className="absolute inset-y-0 left-0 w-1 bg-neutral-900 overflow-hidden">
        <motion.div 
          style={{ y: oscillate, opacity: 0.1 }}
          className="w-full h-20 bg-cyan-500 blur-xl" 
        />
      </div>
      <div className="absolute inset-y-0 right-0 w-1 bg-neutral-900 overflow-hidden">
        <motion.div 
          style={{ y: oscillate, opacity: 0.1 }}
          className="w-full h-20 bg-cyan-500 blur-xl" 
        />
      </div>
    </div>
  );
};

export default KineticTickerDemo;
