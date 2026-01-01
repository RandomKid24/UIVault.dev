
import React, { useRef } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

const RhythmPulseDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const velocity = useVelocity(scrollYProgress);
  
  const pulseScale = useTransform(velocity, [-1, 0, 1], [1.5, 1, 1.5]);
  const pulseOpacity = useTransform(velocity, [-1, 0, 1], [0.8, 0.2, 0.8]);
  const bgBlur = useTransform(velocity, [-1, 0, 1], [10, 0, 10]);

  const springScale = useSpring(pulseScale, { stiffness: 100, damping: 10 });
  const springOpacity = useSpring(pulseOpacity, { stiffness: 100, damping: 10 });
  const filterVal = useTransform(bgBlur, (v) => `blur(${v}px)`);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl bg-neutral-950 border border-white/5">
      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-auto scrollbar-hide py-40 flex flex-col items-center gap-64"
      >
        <div className="h-[200px]" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="text-center">
            <h2 className="text-6xl font-black italic text-neutral-800">SECTION_0{i}</h2>
            <p className="mono text-[9px] text-neutral-600 tracking-[0.5em] mt-2">SCROLL_FOR_PULSE</p>
          </div>
        ))}
        <div className="h-[200px]" />
      </div>

      {/* Visual Feedback Layer */}
      <motion.div 
        style={{ scale: springScale, opacity: springOpacity, filter: filterVal }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div className="w-[80%] aspect-square border-4 border-cyan-500/20 rounded-full" />
        <div className="absolute w-[60%] aspect-square border-2 border-cyan-500/10 rounded-full" />
      </motion.div>

      {/* Rhythm HUD */}
      <div className="absolute top-8 left-8 mono text-[9px] text-cyan-500 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span>KINETIC_RHYTHM: ACTIVE</span>
        </div>
        <div>v: {Math.abs(velocity.get()).toFixed(4)}</div>
      </div>
    </div>
  );
};

export default RhythmPulseDemo;
