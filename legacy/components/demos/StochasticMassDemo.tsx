
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const StochasticMassDemo = () => {
  const [physics, setPhysics] = useState({ stiffness: 100, damping: 10, mass: 1 });
  const [iteration, setIteration] = useState(0);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, physics);
  const springY = useSpring(y, physics);

  useEffect(() => {
    // Generate new physics personality
    const newPhysics = {
      stiffness: Math.random() * 500 + 50,
      damping: Math.random() * 40 + 5,
      mass: Math.random() * 5 + 0.5
    };
    setPhysics(newPhysics);
  }, [iteration]);

  const handleDrag = (_: any, info: any) => {
    x.set(info.offset.x);
    y.set(info.offset.y);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    setIteration(i => i + 1);
  };

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="relative w-[300px] h-[300px] border border-white/5 bg-neutral-950/50 rounded-2xl flex items-center justify-center overflow-hidden">
        <motion.div
          drag
          dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
          dragElastic={0.2}
          onDrag={handleDrag}
          onDragEnd={reset}
          style={{ x: springX, y: springY }}
          className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full cursor-grab active:cursor-grabbing shadow-[0_0_50px_rgba(6,182,212,0.3)]"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <div className="w-12 h-12 border-2 border-white/20 rounded-full animate-ping" />
          </div>
        </motion.div>
        
        <div className="absolute inset-4 border border-white/5 rounded-xl pointer-events-none" />
      </div>

      <div className="text-center space-y-4">
        <div className="grid grid-cols-3 gap-4 mono text-[10px] text-neutral-500 uppercase">
          <div>Mass: <span className="text-white">{physics.mass.toFixed(2)}</span></div>
          <div>Stiff: <span className="text-white">{physics.stiffness.toFixed(0)}</span></div>
          <div>Damp: <span className="text-white">{physics.damping.toFixed(0)}</span></div>
        </div>
        <button 
          onClick={reset}
          className="mono text-[10px] bg-white/5 px-4 py-2 hover:bg-white/10 transition-colors border border-white/5 rounded"
        >
          REGENERATE_ENTITY
        </button>
      </div>
    </div>
  );
};

export default StochasticMassDemo;
