
import React, { useState, useEffect } from 'react';
import { motion, useVelocity, useMotionValue, useTransform } from 'framer-motion';

const PersonalityMatrixDemo = () => {
  const x = useMotionValue(0);
  const velocity = useVelocity(x);
  
  // Map velocity to "aggression" or personality shift
  const blur = useTransform(velocity, [-2000, 0, 2000], [20, 0, 20]);
  const skew = useTransform(velocity, [-2000, 2000], [-30, 30]);
  const color = useTransform(velocity, [-2000, 0, 2000], ["#f43f5e", "#06b6d4", "#f43f5e"]);

  const [mode, setMode] = useState<'IDLE' | 'KINETIC'>('IDLE');

  useEffect(() => {
    return velocity.on('change', (v) => {
      if (Math.abs(v) > 100) setMode('KINETIC');
      else setMode('IDLE');
    });
  }, [velocity]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-12 bg-neutral-950/20">
      <div className="relative">
        <motion.div
          drag="x"
          dragConstraints={{ left: -200, right: 200 }}
          style={{ x, skew, color }}
          className="cursor-grab active:cursor-grabbing"
        >
          <div className="text-9xl font-black italic tracking-tighter select-none">
            {mode === 'IDLE' ? 'SOFT' : 'FAST'}
          </div>
        </motion.div>

        {/* Dynamic Personality Indicator */}
        <motion.div 
          style={{ filter: `blur(${blur.get()}px)`, backgroundColor: color }}
          className="absolute -inset-10 opacity-10 rounded-full pointer-events-none"
        />
      </div>

      <div className="flex flex-col items-center gap-2 mono text-[10px]">
        <div className="flex gap-4">
          <span className={mode === 'IDLE' ? 'text-cyan-500 font-bold' : 'text-neutral-700'}>// IDLE_BROWSE</span>
          <span className={mode === 'KINETIC' ? 'text-rose-500 font-bold' : 'text-neutral-700'}>// HIGH_INTENT</span>
        </div>
        <div className="text-neutral-500">VELOCITY_VECTOR: {Math.abs(velocity.get()).toFixed(0)} px/s</div>
      </div>
    </div>
  );
};

export default PersonalityMatrixDemo;
