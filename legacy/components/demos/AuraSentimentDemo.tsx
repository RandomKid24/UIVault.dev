import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AuraSentimentDemo = () => {
  const [sentiment, setSentiment] = useState<'POSITIVE' | 'NEUTRAL' | 'NEGATIVE'>('NEUTRAL');

  const configs = {
    POSITIVE: { color: '#06b6d4', blur: 40, scale: 1.2, speed: 1.5, bg: 'rgba(6,182,212,0.05)' },
    NEUTRAL: { color: '#ffffff', blur: 20, scale: 1, speed: 4, bg: 'transparent' },
    NEGATIVE: { color: '#f43f5e', blur: 80, scale: 0.8, speed: 0.5, bg: 'rgba(244,63,94,0.1)' }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 transition-colors duration-2000 gap-16 relative overflow-hidden" style={{ backgroundColor: configs[sentiment].bg }}>
      <div className="text-center z-10">
        <h4 className="text-4xl font-black italic tracking-tighter uppercase text-white">Atmospheric_Sentiment</h4>
        <p className="mono text-[10px] text-neutral-500 uppercase tracking-widest mt-2 italic">Color_Viscosity_Sync</p>
      </div>

      <div className="relative w-96 h-96 flex items-center justify-center">
        {/* The Liquid Body */}
        <motion.div
          animate={{
            scale: configs[sentiment].scale,
            backgroundColor: configs[sentiment].color,
            borderRadius: sentiment === 'POSITIVE' ? ["40% 60% 70% 30%", "60% 40% 30% 70%", "40% 60% 70% 30%"] : 
                         sentiment === 'NEGATIVE' ? "0%" : "50%",
            filter: `blur(${configs[sentiment].blur}px)`,
          }}
          transition={{
            duration: configs[sentiment].speed,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut'
          }}
          className="absolute inset-0 opacity-40"
        />

        <div className="relative z-10 text-center">
           <AnimatePresence mode="wait">
             <motion.h2 
               key={sentiment}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="text-7xl font-black italic tracking-tighter leading-none"
             >
               {sentiment}
             </motion.h2>
           </AnimatePresence>
        </div>
      </div>

      <div className="flex gap-4 z-10">
        {['POSITIVE', 'NEUTRAL', 'NEGATIVE'].map(s => (
          <button
            key={s}
            onClick={() => setSentiment(s as any)}
            className={`px-8 py-3 border-2 mono text-[10px] font-black tracking-[0.4em] transition-all ${
              sentiment === s ? 'bg-white text-black border-white' : 'text-neutral-500 border-white/5 hover:border-white/20'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-700 leading-relaxed uppercase">
        DATA EMOTION IS RENDERED THROUGH CHROMATIC VISCOSITY. BRIGHT FLOWING SHAPES SIGNAL GROWTH; JAGGED RED VOIDS SIGNAL COLLAPSE.
      </div>
    </div>
  );
};

export default AuraSentimentDemo;
