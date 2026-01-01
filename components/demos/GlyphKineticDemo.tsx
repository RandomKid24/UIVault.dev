
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GlyphKineticDemo = () => {
  const [status, setStatus] = useState<'IDLE' | 'WORKING' | 'SUCCESS' | 'ERROR'>('IDLE');

  const states = [
    { id: 'IDLE', label: 'IDLE' },
    { id: 'WORKING', label: 'ACTIVE' },
    { id: 'SUCCESS', label: 'DONE' },
    { id: 'ERROR', label: 'FAIL' }
  ];

  const getGlyphAnimation = () => {
    switch (status) {
      case 'WORKING': return {
        rotate: [0, 360],
        scale: [1, 1.2, 1],
        borderRadius: ["50%", "30%", "50%"],
        // Fix: Added 'as const' to easing string and explicitly typed return to any for complex union compatibility
        transition: { duration: 2, repeat: Infinity, ease: "linear" as const }
      };
      case 'SUCCESS': return {
        scale: [1, 1.4, 1.2],
        rotate: [0, 180, 180],
        borderRadius: "0%",
        // Fix: Added 'as const' to easing string
        transition: { duration: 0.6, ease: "backOut" as const }
      };
      case 'ERROR': return {
        x: [0, -10, 10, -10, 10, 0],
        rotate: [0, -5, 5, -5, 5, 0],
        scale: 0.9,
        borderRadius: "0%",
        transition: { duration: 0.4 }
      };
      default: return {
        scale: [1, 1.05, 1],
        transition: { duration: 4, repeat: Infinity }
      };
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-900/60 gap-16">
      <div className="text-center">
        <h4 className="text-3xl font-black italic tracking-tighter">GLYPH_RHYTHM</h4>
        <p className="mono text-[9px] text-neutral-500 uppercase tracking-widest mt-2">Textless_State_Communication</p>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* The Semantic Glyph */}
        <motion.div
          // Fix: Type casting to any to satisfy complex framer-motion prop union
          animate={getGlyphAnimation() as any}
          className={`w-32 h-32 border-8 flex items-center justify-center overflow-hidden transition-colors duration-500 ${
            status === 'SUCCESS' ? 'border-white bg-white' :
            status === 'ERROR' ? 'border-white/20' :
            status === 'WORKING' ? 'border-cyan-500' :
            'border-white/10'
          }`}
        >
          <AnimatePresence mode="wait">
            {status === 'SUCCESS' && (
              <motion.div 
                key="s" initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="w-12 h-12 bg-black rounded-full" 
              />
            )}
            {status === 'ERROR' && (
              <motion.div 
                key="e" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="w-full h-2 bg-white rotate-45 absolute" 
              />
            )}
            {status === 'WORKING' && (
              <motion.div 
                key="w" animate={{ scale: [1, 0.5, 1] }} 
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-4 h-4 bg-cyan-500 rounded-full" 
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Energy Rings */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 border border-white/5 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-8 border border-white/5 rounded-full border-dashed"
        />
      </div>

      <div className="flex gap-2">
        {states.map((s) => (
          <button
            key={s.id}
            onClick={() => setStatus(s.id as any)}
            className={`px-6 py-2 border mono text-[10px] font-bold tracking-widest uppercase transition-all ${
              status === s.id ? 'bg-white text-black border-white' : 'border-white/10 text-neutral-600 hover:border-white/30'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-600">
        In the field, text labels are noise. Use rhythmic vibration (Working) and sharp geometric changes (Success/Error) to signal intent.
      </div>
    </div>
  );
};

export default GlyphKineticDemo;
