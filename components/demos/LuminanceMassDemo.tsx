
import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';

const LuminanceMassDemo = () => {
  const [magnitude, setMagnitude] = useState(0.5); // Local state for the label
  const magnitudeMV = useMotionValue(0.5); // Motion value for the physics engine
  
  // The spring now tracks the MotionValue reactively
  const springMagnitude = useSpring(magnitudeMV, { stiffness: 50, damping: 20 });
  
  const scale = useTransform(springMagnitude, [0, 1], [0.2, 3]);
  const blur = useTransform(springMagnitude, [0, 1], [0, 80]);
  const opacity = useTransform(springMagnitude, [0, 0.2, 1], [0.1, 0.4, 0.8]);

  // Derived motion values for style props
  const filterVal = useTransform(blur, (v) => `blur(${v}px)`);
  const scaleSpill = useTransform(scale, (s: number) => s * 2.5);
  const blurSpill = useTransform(blur, (v: number) => `blur(${v * 2}px)`);
  const opacitySpill = useTransform(opacity, (o: number) => o * 0.2);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setMagnitude(val);
    magnitudeMV.set(val);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-950 p-12 gap-20 overflow-hidden relative">
      <div className="text-center z-10 space-y-2">
        <h4 className="text-4xl font-black italic tracking-tighter text-white">MAGNITUDE_GLOW</h4>
        <p className="mono text-[10px] text-neutral-600 uppercase tracking-widest">Sensory_Load: {(magnitude * 100).toFixed(0)}%</p>
      </div>

      <div className="relative flex items-center justify-center">
        {/* The Core Entity */}
        <motion.div
          style={{ scale }}
          className="w-16 h-16 bg-white rounded-full relative z-20 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
        />

        {/* Volumetric Aura */}
        <motion.div
          style={{ scale, filter: filterVal, opacity }}
          className="absolute w-64 h-64 bg-cyan-500 rounded-full z-0"
        />

        {/* Peripheral Spill */}
        <motion.div
          style={{ 
            scale: scaleSpill, 
            filter: blurSpill, 
            opacity: opacitySpill 
          }}
          className="absolute w-96 h-96 bg-cyan-900 rounded-full z-0"
        />
      </div>

      <div className="w-full max-w-sm flex flex-col gap-6 z-10">
        <input 
          type="range" min="0" max="1" step="0.01" 
          defaultValue={0.5}
          onChange={handleSliderChange}
          className="w-full accent-white h-1 bg-white/5 rounded-full appearance-none cursor-pointer"
        />
        <div className="flex justify-between mono text-[8px] text-neutral-600 uppercase tracking-[0.4em]">
          <span>Ambient_Idle</span>
          <span>Massive_Event</span>
        </div>
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-800 leading-relaxed uppercase">
        MAGNITUDE IS NOT MEASURED BY A LINE ON A GRID, BUT BY THE PHOTONIC PRESSURE AND VOLUME THE DATA OCCUPIES IN THE DIGITAL VOID.
      </div>
    </div>
  );
};

export default LuminanceMassDemo;
