
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

const VelocityScrollbarDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const velocity = useVelocity(scrollYProgress);

  // Map velocity to thickness and glow
  const thickness = useTransform(velocity, [-2, 0, 2], [24, 4, 24]);
  const glow = useTransform(velocity, [-2, 0, 2], [20, 0, 20]);
  const color = useTransform(velocity, [-2, 0, 2], ["#06b6d4", "#ffffff", "#06b6d4"]);

  const springThickness = useSpring(thickness, { stiffness: 400, damping: 30 });
  
  // Fix derived motion values
  const scrollHeight = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const scrollTop = useTransform(scrollYProgress, [0, 1], ["8%", "8%"]);
  const shadowVal = useTransform(glow, (v) => `0 0 ${v}px rgba(6, 182, 212, 0.5)`);

  return (
    <div className="relative w-full h-[500px] bg-neutral-950 border border-white/5 rounded-3xl overflow-hidden flex">
      {/* Scrollable Content */}
      <div 
        ref={containerRef}
        className="flex-1 h-full overflow-y-auto scrollbar-hide px-12 py-20 space-y-40"
      >
        <div className="text-center opacity-10 select-none">
          <h2 className="text-9xl font-black italic tracking-tighter">ARCHIVE</h2>
        </div>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="max-w-md space-y-4">
             <div className="mono text-[10px] text-cyan-500 font-bold uppercase tracking-[0.4em]">Node_Sequence_0{i}</div>
             <p className="text-neutral-500 text-sm leading-relaxed font-light">
               The interface spine to the right is intent-aware. Scroll fast to witness structural expansion and photonic discharge.
             </p>
          </div>
        ))}
        <div className="h-40" />
      </div>

      {/* Kinetic Scrollbar Spine */}
      <div className="w-16 h-full border-l border-white/5 bg-black/40 flex items-center justify-center relative">
        <div className="absolute inset-y-8 w-1 bg-white/5 rounded-full" />
        
        <motion.div
          style={{ 
            height: scrollHeight,
            top: scrollTop,
            width: springThickness,
            backgroundColor: color,
            boxShadow: shadowVal
          }}
          className="absolute w-1 rounded-full origin-top"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-white opacity-40 rounded-full" />
          <div className="absolute bottom-0 inset-x-0 h-1 bg-white opacity-40 rounded-full" />
        </motion.div>

        <div className="absolute top-12 right-2 vertical-text mono text-[7px] text-neutral-800 tracking-widest uppercase select-none">
          Kinetic_Spine_v1.0
        </div>
      </div>

      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
};

export default VelocityScrollbarDemo;
