
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

const VortexDialDemo = () => {
  const [velocity, setVelocity] = useState(0);
  const lastRotation = useRef(0);
  const lastTime = useRef(Date.now());

  const rotate = useMotionValue(0);
  const springRotate = useSpring(rotate, { stiffness: 300, damping: 30 });
  
  // Fix: Correct derived transforms outside render cycle
  const filterVal = useTransform(springRotate, () => `blur(${Math.min(20, velocity / 10)}px)`);
  const particleScale = useTransform(springRotate, () => 1 + velocity / 200);
  const bgRotate = useTransform(springRotate, (v) => v * 0.5);

  const handleDrag = (_: any, info: any) => {
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
    const decay = setInterval(() => setVelocity(v => Math.max(0, v * 0.95)), 50);
    return () => clearInterval(decay);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-black overflow-hidden gap-12 relative">
      <div className="text-center z-10">
        <h4 className="text-3xl font-black italic tracking-tighter text-white">Centrifuge_Input</h4>
        <p className="mono text-[9px] text-neutral-600 mt-2 uppercase tracking-[0.5em]">Angular_Velocity: {velocity.toFixed(0)}</p>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Background Orbitals */}
        <motion.div 
          style={{ rotate: bgRotate }}
          className="absolute inset-0 border border-white/5 rounded-full border-dashed opacity-20" 
        />
        
        {/* High Velocity Particles */}
        <AnimatePresence>
          {velocity > 100 && [...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: (velocity - 100) / 1000,
                rotate: springRotate.get() + i * 45,
                scale: 1.2
              }}
              className="absolute w-full h-full border-t-2 border-cyan-500 rounded-full blur-sm"
            />
          ))}
        </AnimatePresence>

        {/* The Main Dial */}
        <motion.div
          drag
          onDrag={handleDrag}
          style={{ rotate: springRotate, filter: filterVal }}
          className="relative z-20 w-40 h-40 bg-neutral-900 border-4 border-white/10 rounded-full flex flex-col items-center justify-center cursor-grab active:cursor-grabbing shadow-[0_0_100px_rgba(6,182,212,0.1)]"
        >
          <div className="w-1.5 h-12 bg-cyan-500 rounded-full absolute top-2" />
          <div className="text-2xl font-black italic tracking-tighter text-white opacity-40">DIAL</div>
        </motion.div>
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-800 leading-relaxed uppercase">
        SCROLL SPEED AND ROTATIONAL DIRECTION ARE FIRST-CLASS CITIZENS. AT HIGH VELOCITY, THE ENTITY ENTERS A CENTRIFUGAL STATE, SHEDDING SPATIAL DATA.
      </div>
    </div>
  );
};

export default VortexDialDemo;
