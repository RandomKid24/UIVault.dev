import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const FrictionToggleDemo = () => {
  const [isOn, setIsOn] = useState(false);
  const x = useMotionValue(0);
  
  // Non-linear spring for the magnetic "break" feel
  const springX = useSpring(x, { stiffness: 500, damping: 40 });
  const scale = useTransform(x, [-60, 60], [1, 1]);
  const glow = useTransform(x, [-60, 60], [0, 1]);

  const handleDrag = (_: any, info: any) => {
    // If dragged past threshold, snap state
    if (info.offset.x > 50 && !isOn) {
      setIsOn(true);
      x.set(60);
    } else if (info.offset.x < -50 && isOn) {
      setIsOn(false);
      x.set(0);
    }
  };

  const handleDragEnd = () => {
    if (isOn) x.set(60);
    else x.set(0);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-950 gap-16">
      <div className="text-center">
        <h4 className="text-3xl font-black italic tracking-tighter uppercase text-white">Momentum_Switch</h4>
        <p className="mono text-[9px] text-neutral-500 mt-2 uppercase tracking-[0.5em]">Friction_Locked: {isOn ? 'DISENGAGED' : 'LOCKED'}</p>
      </div>

      <div className="relative w-40 h-16 bg-neutral-900 border-2 border-white/5 rounded-full p-2 flex items-center overflow-hidden">
        {/* Track Labeling */}
        <div className="absolute inset-0 flex justify-between px-6 items-center mono text-[8px] text-neutral-700 font-black pointer-events-none">
          <span>NULL</span>
          <span>EXEC</span>
        </div>

        {/* The Slider Knob */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 90 }}
          dragElastic={0.05}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={{ x: isOn ? 90 : 0 }}
          style={{ scale }}
          className="relative z-10 w-10 h-10 bg-white rounded-full cursor-grab active:cursor-grabbing shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center"
        >
          <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${isOn ? 'bg-cyan-500' : 'bg-rose-500'}`} />
        </motion.div>

        {/* Field Glow */}
        <motion.div
          animate={{
            opacity: isOn ? 0.3 : 0,
            x: isOn ? 80 : 0
          }}
          className="absolute inset-0 bg-cyan-500 blur-2xl pointer-events-none"
        />
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-700 uppercase leading-relaxed">
        UNLIKE TRADITIONAL TOGGLES, THE FRICTION SWITCH REQUIRES DELIBERATE PHYSICAL MOMENTUM TO CROSS THE POTENTIAL ENERGY BARRIER.
      </div>
    </div>
  );
};

export default FrictionToggleDemo;