
import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';

const VolumetricGaugeDemo = () => {
  const [percent, setPercent] = useState(40);
  const level = useMotionValue(0.4);
  
  // Spring handles the smooth transition of the liquid mass
  const springLevel = useSpring(level, { stiffness: 60, damping: 20 });
  
  const height = useTransform(springLevel, [0, 1], ["0%", "100%"]);
  const glow = useTransform(springLevel, [0, 1], [0.05, 0.4]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setPercent(Math.round(val * 100));
    level.set(val);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-950 overflow-hidden gap-12 relative">
      <div className="text-center z-10">
        <h4 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none">Hydro-Logic_Reservoir</h4>
        <p className="mono text-[9px] text-cyan-500 mt-4 uppercase tracking-[0.5em]">Data_Density: {percent}%</p>
      </div>

      <div className="relative w-48 h-80 border-4 border-white/5 rounded-3xl overflow-hidden bg-black/40 flex flex-col justify-end p-2 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
        {/* The Liquid Body */}
        <motion.div
          style={{ height }}
          className="w-full bg-cyan-500 relative rounded-b-xl shadow-[0_0_60px_rgba(6,182,212,0.4)]"
        >
          {/* Liquid Surface Displacement */}
          <motion.div 
            animate={{ 
              skewY: [-1.5, 1.5, -1.5],
              borderRadius: ["45% 55% 70% 30%", "55% 45% 30% 70%", "45% 55% 70% 30%"]
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-0 inset-x-0 h-10 bg-cyan-400 blur-lg -translate-y-5" 
          />
          
          {/* Photonic Buoyancy Particles */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
             {[...Array(6)].map((_, i) => (
               <motion.div
                key={i}
                animate={{ 
                  y: [240, -40], 
                  opacity: [0, 1, 0],
                  x: [Math.random() * 20, Math.random() * -20]
                }}
                transition={{ repeat: Infinity, duration: 3 + i, delay: i * 0.7 }}
                className="absolute left-1/2 w-1 h-1 bg-white rounded-full"
               />
             ))}
          </div>
        </motion.div>

        {/* Ambient Pressure Glow */}
        <motion.div 
          style={{ opacity: glow }}
          className="absolute inset-0 bg-cyan-500 blur-[80px] rounded-full z-[-1]"
        />
      </div>

      {/* Input Module */}
      <div className="w-full max-w-sm flex flex-col gap-6 z-10">
        <div className="relative">
          <input 
            type="range" min="0" max="1" step="0.001" 
            defaultValue={0.4}
            onChange={handleSliderChange}
            className="w-full accent-cyan-500 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
          />
        </div>
        <div className="flex justify-between mono text-[9px] text-neutral-600 font-black uppercase tracking-[0.3em]">
          <div className="flex flex-col gap-1">
            <span className="text-neutral-800">VOID_STATE</span>
            <span>0.00_B</span>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="text-neutral-800">SATURATION_MAX</span>
            <span>1.02_TB</span>
          </div>
        </div>
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-700 leading-relaxed uppercase">
        INSTRUMENT_CLASS: VOLUMETRIC_GAUGE. DATA IS REPRESENTED AS A COMPRESSIBLE FLUID. OBSERVE SURFACE PERTURBATION DURING VOLUME TRANSITIONS.
      </div>
    </div>
  );
};

export default VolumetricGaugeDemo;
