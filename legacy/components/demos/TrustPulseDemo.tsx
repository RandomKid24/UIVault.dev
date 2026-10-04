
import React from 'react';
import { motion } from 'framer-motion';

const TrustPulseDemo = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-950 overflow-hidden gap-16">
      <div className="text-center">
        <h4 className="text-3xl font-black italic tracking-tighter">TRUST_ANCHOR</h4>
        <p className="mono text-[9px] text-neutral-500 uppercase tracking-widest mt-2">Bio-Rhythmic_Data_Verification</p>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Fibonacci Pulse 1 */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 1.618,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 border-2 border-cyan-500 rounded-full"
        />
        
        {/* Fibonacci Pulse 2 */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 2.618,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-4 border border-cyan-500/40 rounded-full"
        />

        <div className="relative z-10 text-center">
           <div className="w-4 h-4 bg-white rounded-full mx-auto mb-4 shadow-[0_0_30px_white]" />
           <p className="mono text-[10px] text-white font-bold tracking-[0.6em] uppercase">Secured</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 w-full max-w-sm">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                animate={{ width: ['0%', '100%'] }}
                transition={{ duration: 1 + i * 0.5, repeat: Infinity, ease: 'linear' }}
                className="h-full bg-cyan-800"
               />
            </div>
            <div className="mono text-[7px] text-neutral-600">CHAN_0{i}</div>
          </div>
        ))}
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-600 uppercase">
        System stability is communicated through non-linear, organic timing (Fibonacci). Fast linear pulses evoke panic; steady non-linear pulses evoke biological trust.
      </div>
    </div>
  );
};

export default TrustPulseDemo;
