import React, { useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const VolumetricGaugeDemo = () => {
  const [level, setLevel] = useState(0.4); // 0 to 1
  const springLevel = useSpring(level, { stiffness: 50, damping: 15 });
  
  const height = useTransform(springLevel, [0, 1], ["0%", "100%"]);
  const glow = useTransform(springLevel, [0, 1], [0.1, 0.6]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-900 overflow-hidden gap-12 relative">
      <div className="text-center z-10">
        <h4 className="text-3xl font-black italic tracking-tighter text-white">Liquid_Volume</h4>
        <p className="mono text-[9px] text-cyan-500 mt-2 uppercase tracking-[0.5em]">Capacity: {(level * 100).toFixed(0)}%</p>
      </div>

      <div className="relative w-48 h-80 border-4 border-white/5 rounded-3xl overflow-hidden bg-black/40 flex flex-col justify-end p-2 shadow-inner">
        {/* The Liquid Surface (Perturbation simulated via rotate and skew) */}
        <motion.div
          style={{ height }}
          className="w-full bg-cyan-500 relative rounded-b-xl shadow-[0_0_50px_rgba(6,182,212,0.3)]"
        >
          <motion.div 
            animate={{ 
              skewY: [-2, 2, -2],
              borderRadius: ["40% 60% 70% 30%", "60% 40% 30% 70%", "40% 60% 70% 30%"]
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute top-0 inset-x-0 h-8 bg-cyan-400 blur-md -translate-y-4" 
          />
          
          {/* Internal Volumetric Particles */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
             {[...Array(5)].map((_, i) => (
               <motion.div
                key={i}
                animate={{ y: [200, -10], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 2 + i, delay: i * 0.5 }}
                className="w-1 h-1 bg-white rounded-full mx-auto"
               />
             ))}
          </div>
        </motion.div>

        {/* Outer Reflective Glow */}
        <motion.div 
          style={{ opacity: glow }}
          className="absolute inset-0 bg-cyan-500 blur-3xl rounded-full z-[-1]"
        />
      </div>

      <div className="w-full max-w-sm flex flex-col gap-4">
        <input 
          type="range" min="0" max="1" step="0.01" 
          value={level} 
          onChange={(e) => setLevel(parseFloat(e.target.value))}
          className="w-full accent-cyan-500 h-1 bg-white/5 rounded-full appearance-none cursor-pointer"
        />
        <div className="flex justify-between mono text-[8px] text-neutral-700 font-bold uppercase tracking-[0.4em]">
          <span>VACUUM_NULL</span>
          <span>OVERFLOW_CRIT</span>
        </div>
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-700 uppercase">
        DATA IS RENDERED AS A PHYSICAL SUBSTANCE WITH MASS, SURFACE TENSION, AND VOLUMETRIC OCCUPANCY.
      </div>
    </div>
  );
};

export default VolumetricGaugeDemo;