
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

const ViscousDataFeelDemo = () => {
  // Fix: useTransform requires a MotionValue as the first argument. 
  // We maintain load as state for local numeric calculations and loadMV for reactive transforms.
  const [load, setLoad] = useState(0.5); // 0 (Air) to 1 (Molten Lead)
  const loadMV = useMotionValue(0.5);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Dynamic physics config based on load state
  // High load = Low stiffness (lazy) and High damping (heavy resistance)
  const stiffness = 600 - (load * 580);
  const damping = 10 + (load * 80);
  const mass = 1 + (load * 10);
  
  const springX = useSpring(x, { stiffness, damping, mass });
  const springY = useSpring(y, { stiffness, damping, mass });

  // Map displacement to physical deformation (stretching as it drags)
  const skewX = useTransform(springX, (v) => (v - x.get()) * 0.5);
  const skewY = useTransform(springY, (v) => (v - y.get()) * 0.5);
  // Fix: Passed loadMV (MotionValue) instead of load (number) to useTransform
  const scale = useTransform(loadMV, [0, 1], [1, 0.8]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-950 p-12 gap-20 overflow-hidden relative">
      <div className="text-center z-10 space-y-2">
        <h4 className="text-3xl font-black italic tracking-tighter text-white">VISCOUS_MASS</h4>
        <p className="mono text-[10px] text-cyan-500 uppercase tracking-widest">Environment_Viscosity: {(load * 100).toFixed(0)}%</p>
      </div>

      <div className="relative w-full h-64 flex items-center justify-center">
        {/* Interaction Radius Background */}
        <div className="absolute w-80 h-80 border border-white/5 rounded-full pointer-events-none opacity-20 bg-[radial-gradient(circle,rgba(6,182,212,0.05)_0%,transparent_70%)]" />

        {/* Liquid Trail/Shadow */}
        <motion.div
          style={{ 
            x: springX, 
            y: springY, 
            opacity: load * 0.5,
            scale: 1.2 
          }}
          className="absolute w-40 h-40 bg-cyan-950/20 blur-3xl rounded-full pointer-events-none"
        />

        {/* The Heavy Mass Entity */}
        <motion.div
          drag
          dragConstraints={{ left: -200, right: 200, top: -100, bottom: 100 }}
          dragElastic={0.05} // Low elasticity makes it feel stuck in the medium
          onDrag={(_, info) => {
            x.set(info.offset.x);
            y.set(info.offset.y);
          }}
          onDragEnd={() => { x.set(0); y.set(0); }}
          style={{ 
            x: springX, 
            y: springY, 
            skewX, 
            skewY,
            scale 
          }}
          className="w-40 h-40 bg-white border-4 border-white rounded-[2.5rem] flex items-center justify-center cursor-grab active:cursor-grabbing relative z-20 shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
        >
          <div className="text-center pointer-events-none">
             <div className="text-[10px] mono font-black text-black/40 uppercase tracking-tighter">Mass_Unit</div>
             <motion.div 
               animate={{ height: [10, 30, 10] }} 
               transition={{ duration: 3 - (load * 2), repeat: Infinity }}
               className="w-1 bg-cyan-500 mx-auto mt-2" 
             />
          </div>
          
          {/* Surface Detail */}
          <div className="absolute top-4 left-4 w-2 h-2 bg-black/5 rounded-full" />
        </motion.div>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-6 z-10">
        <input 
          type="range" min="0" max="1" step="0.01" 
          value={load} 
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            setLoad(val);
            loadMV.set(val);
          }}
          className="w-full accent-white h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
        />
        <div className="flex justify-between mono text-[8px] text-neutral-600 uppercase tracking-[0.4em]">
          <span>Vacuum_Snappy</span>
          <span>Heavy_Liquid</span>
        </div>
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-800 leading-relaxed uppercase">
        INSTRUMENT_CLASS: MASS_FEEDBACK. THE MOUSE DRAG OBSERVES THE VISCOSITY OF THE DATA-MEDIUM. HEAVIER DATASETS RESIST INTENT.
      </div>
    </div>
  );
};

export default ViscousDataFeelDemo;
