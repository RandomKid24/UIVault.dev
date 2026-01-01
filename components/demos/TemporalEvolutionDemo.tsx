
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TemporalEvolutionDemo = ({ temporal }: any) => {
  const [age, setAge] = useState(0);
  const { entropy = 0 } = temporal || {};

  useEffect(() => {
    const timer = setInterval(() => setAge(a => a + 0.1), 100);
    return () => clearInterval(timer);
  }, []);

  // Map age and entropy to complexity
  const segments = Math.floor(Math.min(3 + age * (1 + entropy * 4), 64));
  const rotationSpeed = 30 - Math.min(age + entropy * 20, 25);
  const coreGlow = Math.min(age * 5 + entropy * 50, 100);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-950 overflow-hidden gap-12">
      <div className="text-center space-y-2">
        <h4 className="text-3xl font-black italic tracking-tighter uppercase">Temporal_Genesis</h4>
        <div className="flex justify-center gap-1">
           {[...Array(10)].map((_, i) => (
             <div key={i} className={`h-1 w-2 rounded-sm ${i < (age/2) ? 'bg-cyan-500' : 'bg-white/5'}`} />
           ))}
        </div>
        <p className="mono text-[9px] text-neutral-500 uppercase tracking-widest mt-2">
          Complexity_Index: {segments} // Flux: {entropy.toFixed(2)}
        </p>
      </div>

      <div className="relative w-72 h-72 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: rotationSpeed, repeat: Infinity, ease: 'linear' }}
          className="relative w-full h-full"
        >
          {[...Array(segments)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1 + entropy, 
                opacity: 0.8 - (entropy * 0.5),
                height: entropy > 0.5 ? '4px' : '1px'
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100%',
                background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? '#06b6d4' : '#fff'})`,
                rotate: (i * (360 / segments)),
                transformOrigin: '0% 50%',
                boxShadow: `0 0 ${coreGlow / 2}px rgba(6, 182, 212, 0.4)`
              }}
            />
          ))}
        </motion.div>
        
        <motion.div 
          animate={{ scale: [1, 1.2, 1], boxShadow: [`0 0 ${coreGlow}px cyan`, `0 0 ${coreGlow * 1.5}px cyan`, `0 0 ${coreGlow}px cyan`] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute w-6 h-6 bg-white rounded-full z-20" 
        />
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-600 leading-relaxed uppercase">
        {entropy > 0.7 ? "SYSTEM_ENTROPY_CRITICAL: MORPHOLOGY_DEFORMED" : "STRUCTURAL_GROWTH_IN_PROGRESS"}
      </div>

      <button 
        onClick={() => setAge(0)}
        className="mono text-[9px] text-neutral-800 hover:text-white border border-white/5 px-4 py-2 hover:bg-white/5 transition-all"
      >
        RESTART_TEMPORAL_CYCLE
      </button>
    </div>
  );
};

export default TemporalEvolutionDemo;
