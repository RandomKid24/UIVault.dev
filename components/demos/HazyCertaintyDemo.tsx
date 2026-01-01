import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const HazyCertaintyDemo = () => {
  const [uncertainty, setUncertainty] = useState(0.5); // 0 to 1
  
  const springUncertainty = useSpring(uncertainty, { stiffness: 100, damping: 30 });
  const blur = useTransform(springUncertainty, [0, 1], [0, 20]);
  const jitter = useTransform(springUncertainty, [0, 1], [0, 8]);
  
  const [noiseX, setNoiseX] = useState(0);
  const [noiseY, setNoiseY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (uncertainty > 0) {
        const amp = uncertainty * 6;
        setNoiseX((Math.random() - 0.5) * amp);
        setNoiseY((Math.random() - 0.5) * amp);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [uncertainty]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black p-12 gap-16 overflow-hidden relative">
      <div className="text-center z-10">
        <h4 className="text-3xl font-black italic tracking-tighter uppercase text-white">Signal_Coherence</h4>
        <p className={`mono text-[9px] uppercase tracking-[0.5em] transition-colors ${uncertainty > 0.7 ? 'text-rose-500' : 'text-cyan-500'}`}>
          Certainty_Level: {((1 - uncertainty) * 100).toFixed(0)}%
        </p>
      </div>

      <div className="relative w-80 h-48 bg-neutral-900 border border-white/5 rounded-3xl flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{ 
            filter: `blur(${blur.get()}px)`,
            x: noiseX,
            y: noiseY,
            opacity: 1 - uncertainty * 0.4
          }}
          className="text-center"
        >
          <div className="text-6xl font-black italic tracking-tighter text-white uppercase leading-none">ALPHA_09</div>
          <p className="mono text-[8px] text-neutral-500 mt-4 tracking-widest">SOURCE: QUANTUM_LEDGER</p>
        </motion.div>

        {/* Overlay Noise Grain */}
        <motion.div 
          animate={{ opacity: uncertainty }}
          className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" 
        />
      </div>

      <div className="w-full max-w-sm flex flex-col gap-6">
        <input 
          type="range" min="0" max="1" step="0.01" 
          value={uncertainty} 
          onChange={(e) => setUncertainty(parseFloat(e.target.value))}
          className="w-full accent-rose-500 h-1 bg-white/5 rounded-full appearance-none cursor-pointer"
        />
        <div className="flex justify-between mono text-[8px] text-neutral-600 uppercase tracking-[0.4em]">
          <span>Verified_Signal</span>
          <span>Pure_Uncertainty</span>
        </div>
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-800 leading-relaxed uppercase">
        TRUST IS COMMUNICATED THROUGH VISUAL FIDELITY. UNSTABLE DATA LITERALLY VIBRATES OUT OF FOCUS, COMMUNICATING RISK SENSORY-FIRST.
      </div>
    </div>
  );
};

export default HazyCertaintyDemo;
