import React from 'react';
import { motion } from 'framer-motion';

const NeuralBadgeDemo = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-900/40 gap-12">
      <div className="text-center">
        <h4 className="text-3xl font-black italic tracking-tighter text-white uppercase">Neural_Markers</h4>
        <p className="mono text-[9px] text-neutral-600 mt-2 uppercase tracking-[0.5em]">Bio-Rhythmic_Pills</p>
      </div>

      <div className="flex flex-wrap justify-center gap-12">
        <Badge variant="cyan" label="SYSTEM_OK" />
        <Badge variant="rose" label="CRIT_WARN" />
        <Badge variant="amber" label="DATA_SYNC" />
        <Badge variant="white" label="VOID_NULL" />
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-800 leading-relaxed uppercase">
        BADGES ARE NOT STATIC CONTAINERS. THEY ARE LIVING ENERGY FIELDS THAT PULSE WITH SYSTEM TELEMETRY AND GLOBAL ENTROPY.
      </div>
    </div>
  );
};

const Badge = ({ variant, label }: { variant: string; label: string }) => {
  const colors: any = {
    cyan: '#06b6d4',
    rose: '#f43f5e',
    amber: '#fbbf24',
    white: '#ffffff'
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex items-center justify-center">
        {/* The Glow Aura */}
        <motion.div
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 blur-xl rounded-full"
          style={{ backgroundColor: colors[variant] }}
        />

        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative px-6 py-2 border rounded-full backdrop-blur-md flex items-center gap-3 group hover:border-white transition-colors cursor-default"
          style={{ borderColor: `${colors[variant]}33`, backgroundColor: `${colors[variant]}08` }}
        >
          <div className="w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_10px_white]" style={{ backgroundColor: colors[variant] }} />
          <span className="mono text-[9px] font-black tracking-widest uppercase italic" style={{ color: colors[variant] }}>{label}</span>
        </motion.div>
      </div>
    </div>
  );
};

export default NeuralBadgeDemo;