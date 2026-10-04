
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const VisualAgingDemo = ({ temporal }: any) => {
  const [hits, setHits] = useState(0);
  const { entropy = 0 } = temporal || {};
  
  const interactionAge = Math.min(hits / 40, 1);
  const combinedDecay = Math.max(interactionAge, entropy);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-900/20 overflow-hidden gap-12">
      <div className="text-center">
        <h4 className="text-3xl font-black italic tracking-tighter uppercase">Strata_Wear</h4>
        <p className="mono text-[9px] text-neutral-500 mt-2 uppercase tracking-widest">
          INTERACTIONS_RECORDED: {hits} // DECAY: {(combinedDecay * 100).toFixed(0)}%
        </p>
      </div>

      <motion.button
        onClick={() => setHits(h => h + 1)}
        animate={{ 
          borderRadius: `${4 + interactionAge * 60}px`,
          scale: 1 - interactionAge * 0.2,
          // Fix: skewX or skewY are valid transform properties in framer-motion, not generic skew
          skewX: interactionAge * (Math.random() - 0.5) * 5,
          backgroundColor: hits > 20 ? '#111' : '#fff',
          color: hits > 20 ? '#fff' : '#000',
          borderColor: interactionAge > 0.5 ? 'rgba(244, 63, 94, 0.4)' : 'rgba(255,255,255,0.1)'
        }}
        className="w-72 h-32 font-black text-2xl italic uppercase transition-all flex flex-col items-center justify-center border-4 relative overflow-hidden"
      >
        <span className="relative z-10">{interactionAge > 0.8 ? 'DEGRADED' : 'INTERACT'}</span>
        {hits > 10 && (
          <motion.div 
            animate={{ x: ['-100%', '100%'] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-0 left-0 w-1/3 h-1 bg-rose-500 opacity-50" 
          />
        )}
      </motion.button>

      <div className="relative w-full max-w-sm h-48 bg-black border border-white/5 p-8 rounded-3xl overflow-hidden">
         <motion.div
           animate={{ 
             filter: `blur(${combinedDecay * 8}px) opacity(${1 - combinedDecay * 0.5})`,
             x: interactionAge * (Math.random() - 0.5) * 20
           }}
           className="h-full w-full space-y-4"
         >
            <div className="h-6 w-2/3 bg-white/10 rounded" />
            <div className="h-2 w-full bg-white/5 rounded" />
            <div className="h-2 w-1/2 bg-white/5 rounded" />
         </motion.div>
         
         {/* Cracks and Scratches */}
         <div 
           className="absolute inset-0 pointer-events-none opacity-0 mix-blend-overlay"
           style={{ 
             opacity: interactionAge * 0.8,
             background: `repeating-linear-gradient(${hits * 10}deg, transparent 0px, rgba(255,255,255,0.05) 1px, transparent 2px, transparent 40px)`
           }}
         />
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-600 leading-relaxed uppercase">
        EACH CLICK INTRODUCES PHYSICAL ARTIFACTS INTO THE COMPONENT'S CSS DEFINITION. THE INTERFACE "REMEMBERS" ITS ABUSE.
      </div>
      
      <button 
        onClick={() => setHits(0)}
        className="mono text-[9px] text-neutral-800 hover:text-white transition-colors border-b border-transparent hover:border-white/20"
      >
        REFURBISH_INTERFACE_MODULE
      </button>
    </div>
  );
};

export default VisualAgingDemo;
