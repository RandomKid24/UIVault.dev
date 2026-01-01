import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TectonicDataDemo = () => {
  const [plates, setPlates] = useState<{ id: number; offset: number; h: number }[]>([
    { id: 1, offset: 0, h: 40 },
    { id: 2, offset: 0, h: 60 },
    { id: 3, offset: 0, h: 30 },
  ]);

  const triggerEvent = () => {
    setPlates(prev => prev.map(p => ({
      ...p,
      offset: (Math.random() - 0.5) * 40,
      h: 20 + Math.random() * 80
    })));
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900 p-12 gap-12 overflow-hidden relative">
      <div className="text-center z-10">
        <h4 className="text-4xl font-black italic tracking-tighter uppercase text-white">Tectonic_Input</h4>
        <p className="mono text-[10px] text-neutral-600 uppercase tracking-widest mt-2">Structural_Stress_Protocol</p>
      </div>

      <div className="flex flex-col gap-2 w-80">
        {plates.map((plate) => (
          <motion.div
            key={plate.id}
            animate={{ 
              x: plate.offset,
              height: plate.h,
              backgroundColor: plate.offset > 15 ? '#06b6d4' : plate.offset < -15 ? '#f43f5e' : '#171717'
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="w-full border border-white/10 rounded-lg flex items-center justify-center overflow-hidden relative group"
          >
             <div className="mono text-[8px] opacity-20 group-hover:opacity-100 transition-opacity">STRATA_PLATE_0{plate.id}</div>
             <motion.div 
               animate={{ opacity: Math.abs(plate.offset) / 40 }}
               className="absolute inset-0 bg-white/5 pointer-events-none" 
             />
          </motion.div>
        ))}
      </div>

      <button 
        onClick={triggerEvent}
        className="px-12 py-4 bg-white text-black font-black italic mono text-xs tracking-widest hover:scale-110 active:scale-95 transition-all"
      >
        PUSH_DATA_EVENT
      </button>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-700 leading-relaxed uppercase">
        SYSTEM UPDATES ARE NOT TEXT LOGS. THEY ARE PHYSICAL SHIFTS IN THE INTERFACE TOPOLOGY, COMMUNICATING IMPACT THROUGH DISPLACEMENT.
      </div>
    </div>
  );
};

export default TectonicDataDemo;
