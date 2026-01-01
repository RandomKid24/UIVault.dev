
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const DepthProbeDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(250);
  const mouseY = useMotionValue(250);
  const [isHovered, setIsHovered] = useState(false);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[500px] bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden cursor-none"
    >
      {/* Background Layer (Distant) */}
      <div className="absolute inset-0 bg-neutral-950 flex items-center justify-center">
        <div className="text-[200px] font-black italic text-white opacity-[0.02] select-none">DEPTH</div>
      </div>

      {/* Hidden Mid Layer (Only visible through probe) */}
      <motion.div 
        style={{
          clipPath: useTransform([springX, springY], ([x, y]) => `circle(${isHovered ? 120 : 0}px at ${x}px ${y}px)`)
        }}
        className="absolute inset-0 bg-cyan-900/20 backdrop-blur-md flex items-center justify-center"
      >
        <div className="text-center space-y-6">
          <div className="mono text-xs text-cyan-400 tracking-[0.5em] uppercase">Strata_Identified</div>
          <h2 className="text-8xl font-black italic tracking-tighter text-white">REVEAL</h2>
          <div className="flex justify-center gap-4">
            <div className="w-12 h-1 bg-cyan-500" />
            <div className="w-12 h-1 bg-white" />
          </div>
        </div>
      </motion.div>

      {/* Top Layer Info */}
      <div className="absolute top-12 left-12 max-w-[200px] space-y-4 opacity-40">
        <h3 className="text-xl font-black italic">PROBE_MODULE_v4</h3>
        <p className="text-[10px] mono text-neutral-500 leading-relaxed uppercase tracking-tighter">
          Reveal hidden spatial strata using circular clipping masks synchronized to cursor focal point.
        </p>
      </div>

      {/* The Probe UI */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[100]"
      >
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 border border-white/40 rounded-full animate-ping" />
          <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_15px_white]" />
          <div className="absolute -top-10 mono text-[9px] text-white bg-black px-2 py-1 rounded border border-white/10 whitespace-nowrap">
            COORD_X: {mouseX.get().toFixed(0)}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DepthProbeDemo;
