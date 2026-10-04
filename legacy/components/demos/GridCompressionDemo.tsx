
import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';

const GridCompressionDemo = () => {
  const [volume, setVolume] = useState(0.2); // Local state for label
  const volumeMV = useMotionValue(0.2); // Reactive motion value
  
  const springVolume = useSpring(volumeMV, { stiffness: 60, damping: 15 });
  
  const gap = useTransform(springVolume, [0, 1], [40, 4]);
  const size = useTransform(springVolume, [0, 1], [60, 20]);
  const borderRadius = useTransform(springVolume, [0, 1], ["20%", "50%"]);
  const color = useTransform(springVolume, [0, 1], ["#171717", "#06b6d4"]);
  const itemOpacity = useTransform(springVolume, [0, 1], [0.3, 1]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    volumeMV.set(val);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-950 p-12 gap-16 overflow-hidden relative">
      <div className="text-center z-10">
        <h4 className="text-4xl font-black italic tracking-tighter uppercase text-white leading-none">DENSITY_COMPRESSION</h4>
        <p className="mono text-[9px] text-neutral-700 uppercase tracking-widest mt-4 italic">Volumetric_Grid_Packing_v4</p>
      </div>

      <div className="relative w-full h-80 flex items-center justify-center">
        <motion.div 
          className="grid grid-cols-6 grid-rows-4"
          style={{ gap }}
        >
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              style={{ 
                width: size, 
                height: size, 
                backgroundColor: color,
                borderRadius,
                opacity: itemOpacity
              }}
              className="border border-white/5 shadow-2xl"
            />
          ))}
        </motion.div>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-6">
        <input 
          type="range" min="0" max="1" step="0.01" 
          value={volume} 
          onChange={handleSliderChange}
          className="w-full accent-cyan-500 h-1 bg-white/5 rounded-full appearance-none cursor-pointer"
        />
        <div className="flex justify-between mono text-[8px] text-neutral-600 uppercase tracking-[0.4em]">
          <span>Sparse_Inventory</span>
          <span>Critical_Density</span>
        </div>
      </div>

      <div className="max-w-sm text-center mono text-[9px] text-neutral-800 leading-relaxed uppercase">
        LAYOUT DENSITY REFLECTS DATA VOLUME. HIGH-VOLUME SYSTEMS COMPRESS ELEMENTS INTO HIGH-ENERGY RADIAL NODES; LOW-VOLUME SYSTEMS DRIFT APART.
      </div>
    </div>
  );
};

export default GridCompressionDemo;
