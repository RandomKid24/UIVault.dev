
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MonochromeLogicDemo = () => {
  const [state, setState] = useState<'IDLE' | 'ACTIVE' | 'ERROR'>('IDLE');

  const states = [
    { id: 'IDLE', label: 'IDLE_WAIT', pattern: 'radial-gradient(circle, #333 1px, transparent 1px)' },
    { id: 'ACTIVE', label: 'ACTIVE_FLOW', pattern: 'repeating-linear-gradient(45deg, #444, #444 2px, transparent 2px, transparent 10px)' },
    { id: 'ERROR', label: 'ERROR_STATE', pattern: 'repeating-linear-gradient(90deg, #555, #555 4px, transparent 4px, transparent 8px)' }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-900/40 gap-12">
      <div className="text-center">
        <h4 className="text-3xl font-black italic tracking-tighter">PATTERN_SEMANTICS</h4>
        <p className="mono text-[9px] text-neutral-500 uppercase tracking-widest mt-2">Communication_Through_Density</p>
      </div>

      <div className="flex gap-6">
        {states.map((s) => (
          <button
            key={s.id}
            onClick={() => setState(s.id as any)}
            className={`w-32 h-32 border-4 transition-all flex flex-col items-center justify-center gap-4 ${
              state === s.id ? 'border-white scale-110' : 'border-neutral-700 hover:border-neutral-500'
            }`}
            style={{ backgroundImage: s.pattern, backgroundSize: '12px 12px' }}
          >
            <div className="bg-black/80 px-2 py-1 mono text-[8px] font-bold text-white border border-white/10 uppercase">
              {s.label}
            </div>
          </button>
        ))}
      </div>

      <div className="relative w-full max-w-md h-40 border-8 border-white flex flex-col items-center justify-center overflow-hidden">
        {/* The pattern shifts based on state */}
        <motion.div
          animate={{
            backgroundImage: states.find(s => s.id === state)?.pattern,
            backgroundSize: state === 'ACTIVE' ? '20px 20px' : '10px 10px'
          }}
          className="absolute inset-0 opacity-40 transition-all duration-700"
        />
        
        <div className="relative z-10 text-center bg-black/90 p-6 border-y-4 border-white">
          <h3 className="text-4xl font-black italic tracking-tighter">SYSTEM_MODE: {state}</h3>
          <p className="mono text-[10px] mt-2 tracking-[0.4em] text-neutral-400">STATE_COMMUNICATED_VIA_LUMINANCE</p>
        </div>
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-600">
        Observe how "Active" uses motion/diagonals and "Error" uses high-frequency vertical bars. No color cues used.
      </div>
    </div>
  );
};

export default MonochromeLogicDemo;
