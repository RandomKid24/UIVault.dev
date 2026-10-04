import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImpulseSignalDemo = () => {
  const [alerts, setAlerts] = useState<{ id: number; msg: string }[]>([]);

  const push = () => {
    setAlerts(prev => [...prev, { id: Date.now(), msg: `STRATA_ERR_0${Math.floor(Math.random()*9)}` }]);
    setTimeout(() => setAlerts(prev => prev.slice(1)), 2500);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-950 overflow-hidden gap-12 relative">
      <div className="text-center z-10">
        <h4 className="text-3xl font-black italic tracking-tighter uppercase text-white">Signal_Impulse</h4>
        <p className="mono text-[9px] text-neutral-700 mt-2 uppercase tracking-[0.4em]">Non-Persistent_Manifest</p>
      </div>

      <div className="relative w-full max-w-sm h-64 flex flex-col items-center justify-center gap-4">
        <AnimatePresence>
          {alerts.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ scaleX: 0, skewX: 45, opacity: 0, filter: 'blur(20px)' }}
              animate={{ 
                scaleX: 1, skewX: 0, opacity: 1, filter: 'blur(0px)',
                x: [0, -5, 5, -2, 0], // Small jitter
              }}
              exit={{ scaleY: 0, opacity: 0, filter: 'blur(20px)', transition: { duration: 0.3 } }}
              className="w-full p-6 bg-cyan-500 text-black border-2 border-white flex justify-between items-center relative overflow-hidden"
            >
               <div className="flex flex-col">
                  <span className="mono text-[8px] font-black tracking-widest opacity-40 uppercase italic">Impulse_Detect</span>
                  <h5 className="text-2xl font-black italic tracking-tighter leading-none">{a.msg}</h5>
               </div>
               <div className="w-10 h-10 border-4 border-black rounded-full animate-ping opacity-20" />
               
               {/* Chromatic aberration line */}
               <div className="absolute inset-0 border-t border-rose-500/50 translate-y-1 pointer-events-none" />
            </motion.div>
          ))}
        </AnimatePresence>

        {alerts.length === 0 && (
          <div className="mono text-[9px] text-neutral-800 animate-pulse uppercase tracking-[0.8em]">Field_Clear</div>
        )}
      </div>

      <button 
        onClick={push}
        className="px-10 py-3 border-2 border-white/10 hover:border-cyan-500 transition-all mono text-[10px] font-black italic uppercase tracking-widest text-white"
      >
        TRIGGER_IMPULSE
      </button>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-800 leading-relaxed uppercase">
        NOTIFICATIONS ARE NOT BOXES IN THE CORNER. THEY ARE TEMPORARY DIMENSIONAL TEARS IN THE INTERFACE COHERENCE.
      </div>
    </div>
  );
};

export default ImpulseSignalDemo;