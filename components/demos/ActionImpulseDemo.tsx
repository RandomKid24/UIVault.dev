import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ActionImpulseDemo = () => {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const trigger = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipples(prev => [...prev, { id: Date.now(), x, y }]);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-950 overflow-hidden gap-12">
      <div className="text-center z-10">
        <h4 className="text-3xl font-black italic tracking-tighter uppercase text-white leading-none">Impulse_Core</h4>
        <p className="mono text-[9px] text-neutral-500 mt-2 uppercase tracking-[0.4em]">Propagating_State_Change</p>
      </div>

      <div className="relative">
        <motion.button
          onClick={trigger}
          whileTap={{ scale: 0.95 }}
          className="relative px-20 py-8 bg-white text-black font-black italic mono text-sm tracking-[0.3em] overflow-hidden focus:outline-none border-4 border-white group"
        >
          <span className="relative z-10 group-hover:scale-110 transition-transform block">EXECUTE_WAVE</span>
          
          <AnimatePresence>
            {ripples.map(r => (
              <motion.div
                key={r.id}
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 4, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ left: r.x, top: r.y }}
                className="absolute w-20 h-20 border-2 border-black rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              />
            ))}
          </AnimatePresence>
        </motion.button>

        {/* External environment shockwaves */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
          <AnimatePresence>
            {ripples.map(r => (
              <motion.div
                key={`ext-${r.id}`}
                initial={{ scale: 0.8, opacity: 0.2 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute w-96 h-96 border border-cyan-500/20 rounded-full"
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-700 leading-relaxed uppercase">
        BUTTON INTERACTION IS NOT A STATIC BOOLEAN. IT IS A RADIATING PULSE THAT REVERBERATES THROUGH THE VISUAL FABRIC OF THE LAB.
      </div>
    </div>
  );
};

export default ActionImpulseDemo;