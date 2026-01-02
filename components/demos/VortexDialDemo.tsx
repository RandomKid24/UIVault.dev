
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

const VortexDialDemo = () => {
  const [velocity, setVelocity] = useState(0);
  const lastRotation = useRef(0);
  const lastTime = useRef(Date.now());

  const rotate = useMotionValue(0);
  const springRotate = useSpring(rotate, { stiffness: 300, damping: 30 });
  
  // High speed triggers centrifugal expansion (outer rings move away from center)
  const expansion = useTransform(springRotate, () => Math.min(60, velocity / 15));
  const filterVal = useTransform(springRotate, () => `blur(${Math.min(10, velocity / 25)}px)`);
  const coreGlow = useTransform(springRotate, () => Math.min(1, velocity / 500));

  const handleDrag = (_: any, info: any) => {
    // Rotation mapping based on circular movement logic
    const newRot = rotate.get() + info.delta.x + info.delta.y;
    rotate.set(newRot);

    const now = Date.now();
    const dt = (now - lastTime.current) / 1000;
    const dr = newRot - lastRotation.current;
    if (dt > 0) setVelocity(Math.abs(dr / dt));

    lastRotation.current = newRot;
    lastTime.current = now;
  };

  useEffect(() => {
    const decay = setInterval(() => setVelocity(v => Math.max(0, v * 0.96)), 50);
    return () => clearInterval(decay);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-black overflow-hidden gap-12 relative">
      <div className="text-center z-10">
        <h4 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none">Centrifuge_Vector</h4>
        <p className="mono text-[9px] text-cyan-500 mt-2 uppercase tracking-[0.5em]">Angular_Momentum: {velocity.toFixed(0)} rad/s</p>
      </div>

      <div className="relative w-80 h-80 flex items-center justify-center cursor-grab active:cursor-grabbing">
        {/* Background Coordinate HUD */}
        <div className="absolute inset-0 opacity-5 border border-dashed border-white/40 rounded-full" />
        <div className="absolute inset-20 opacity-10 border border-white/20 rounded-full border-dashed" />
        
        {/* Interaction Surface (Invisible but handles drag) */}
        <motion.div
          drag
          onDrag={handleDrag}
          className="absolute inset-0 z-50 rounded-full"
        />

        {/* Outer Orbital Ring (Centrifugal Displacement) */}
        <motion.div
          style={{ rotate: springRotate, scale: useTransform(expansion, (v) => 1 + v / 100) }}
          className="absolute w-64 h-64 border border-cyan-500/20 rounded-full flex items-center justify-center"
        >
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-2 h-2 bg-cyan-500 rounded-full" 
              style={{ 
                transform: `rotate(${i * 45}deg) translateY(-128px)`,
                opacity: 0.2 + (velocity / 1000)
              }} 
            />
          ))}
        </motion.div>

        {/* Primary Deconstructed Dial Elements */}
        <motion.div
          style={{ rotate: springRotate, filter: filterVal }}
          className="relative z-20 w-48 h-48 flex items-center justify-center"
        >
          {/* Segmented Outer Shell */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible">
            <motion.path
              d="M 50 2 A 48 48 0 0 1 98 50"
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="2 2"
              style={{ x: useTransform(expansion, (v) => v * 0.1), opacity: 0.4 }}
            />
            <motion.path
              d="M 50 98 A 48 48 0 0 1 2 50"
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="2 2"
              style={{ x: useTransform(expansion, (v) => -v * 0.1), opacity: 0.4 }}
            />
          </svg>

          {/* Central Mass Controller */}
          <div className="relative flex items-center justify-center">
             <motion.div 
              style={{ 
                rotate: useTransform(springRotate, (v) => -v * 2),
                boxShadow: useTransform(coreGlow, (g) => `0 0 ${g * 60}px cyan`)
              }}
              className="w-12 h-12 bg-white flex items-center justify-center rounded-lg"
             >
               <div className="w-1 h-6 bg-black" />
             </motion.div>
             
             {/* Dynamic Trails */}
             <AnimatePresence>
               {velocity > 200 && (
                 <motion.div
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 0.3, scale: 1.5 }}
                   exit={{ opacity: 0, scale: 2 }}
                   className="absolute w-32 h-32 border-2 border-cyan-500 rounded-full blur-md"
                 />
               )}
             </AnimatePresence>
          </div>

          {/* Inertia Counterweights */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              style={{ 
                rotate: i * 90,
                y: useTransform(expansion, (v) => -60 - v) 
              }}
              className="absolute w-1 h-4 bg-white/40"
            />
          ))}
        </motion.div>

        {/* Focal Indicator */}
        <div className="absolute top-0 w-0.5 h-12 bg-cyan-500 shadow-[0_0_20px_cyan] z-40" />
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-700 leading-relaxed uppercase">
        INSTRUMENT_CLASS: MASS_STABILIZER. EXPERIMENTAL TOPOLOGY RESPONDS TO CENTRIFUGAL LOADS BY DECONSTRUCTING ITS OUTER SHELL TO PRESERVE CORE INTEGRITY.
      </div>
    </div>
  );
};

export default VortexDialDemo;
