
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useVelocity, useTransform, useSpring, AnimatePresence } from 'framer-motion';

const OmniHeroDemo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const velocity = useVelocity(mouseX);

  const handleMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const skew = useSpring(useTransform(velocity, [-3000, 3000], [-25, 25]));
  const blur = useSpring(useTransform(velocity, [-3000, 0, 3000], [15, 0, 15]));

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMove}
      className="relative w-full h-full bg-neutral-950 overflow-hidden flex items-center justify-center"
    >
      {/* Background Interactive Web */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <motion.div
        style={{ skewX: skew, filter: useTransform(blur, (v) => `blur(${v}px)`) }}
        className="relative z-20 text-center"
      >
        <h1 className="text-8xl md:text-[14rem] font-black italic tracking-tighter text-white leading-none">
          OMNI.IO
        </h1>
        <div className="flex items-center justify-center gap-4 mt-8">
           <div className="h-0.5 w-12 bg-cyan-500" />
           <span className="mono text-xs tracking-[0.5em] text-cyan-500">THE_CONSOLIDATED_EXP</span>
           <div className="h-0.5 w-12 bg-cyan-500" />
        </div>
      </motion.div>

      {/* Kinetic Particles */}
      {[...Array(12)].map((_, i) => (
        <OmniParticle key={i} index={i} mouseX={mouseX} mouseY={mouseY} />
      ))}

      {/* Status HUD */}
      <div className="absolute bottom-12 left-12 flex flex-col gap-2 mono text-[10px] text-neutral-600">
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
           <span>SIGNAL_LOCKED</span>
        </div>
        <div className="flex gap-4">
           <span>V: {Math.abs(velocity.get()).toFixed(0)}</span>
           <span>X: {mouseX.get().toFixed(0)}</span>
           <span>Y: {mouseY.get().toFixed(0)}</span>
        </div>
      </div>
    </div>
  );
};

const OmniParticle = ({ index, mouseX, mouseY }: any) => {
  const x = useSpring(useTransform(mouseX, [0, 1000], [Math.random() * 800 - 400, Math.random() * 800 - 400]), { damping: 30 + index });
  const y = useSpring(useTransform(mouseY, [0, 1000], [Math.random() * 800 - 400, Math.random() * 800 - 400]), { damping: 30 + index });

  return (
    <motion.div
      style={{ x, y }}
      className="absolute w-1 h-1 bg-cyan-500/20 rounded-full"
    />
  );
};

export default OmniHeroDemo;
