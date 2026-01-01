import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useAnimationFrame } from 'framer-motion';

const SurfaceTensionDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(200);
  const mouseY = useMotionValue(200);
  
  const springX = useSpring(mouseX, { stiffness: 60, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 15 });

  const pathRef = useRef<SVGPathElement>(null);

  // High-performance path manipulation outside React render cycle
  useAnimationFrame(() => {
    if (!pathRef.current) return;
    const vx = springX.get();
    const vy = springY.get();
    const w = 400;
    const h = 400;

    // Creates a "stretched" liquid surface effect toward the cursor
    const d = `
      M 0,0 
      H ${w} 
      V ${h} 
      H 0 
      L 0,${vy} 
      Q ${vx},${vy} 0,${vy} 
      Z
    `;
    
    // We use a more interesting 'curtain' tension effect
    const tensionPath = `
      M 0,0 
      Q ${vx},${vy * 0.1} ${w},0 
      Q ${vx * 1.1},${vy} ${w},${h} 
      Q ${vx},${h - (h - vy) * 0.1} 0,${h} 
      Q ${vx * 0.9},${vy} 0,0
    `;
    
    pathRef.current.setAttribute('d', tensionPath);
  });

  const handleMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(200);
    mouseY.set(200);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-[400px] h-[400px] flex items-center justify-center bg-neutral-950 border border-white/5 rounded-2xl overflow-hidden group cursor-none"
    >
      <svg width="400" height="400" className="absolute inset-0 pointer-events-none overflow-visible">
        <defs>
          <radialGradient id="surfaceGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(6, 182, 212, 0.2)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        
        <path
          ref={pathRef}
          fill="rgba(6, 182, 212, 0.03)"
          stroke="rgba(6, 182, 212, 0.2)"
          strokeWidth="1"
        />

        <motion.circle
          cx={springX}
          cy={springY}
          r="120"
          fill="url(#surfaceGlow)"
          className="blur-3xl"
        />
      </svg>

      <div className="z-10 text-center pointer-events-none">
        <h4 className="text-3xl font-black italic tracking-tighter text-white/10 uppercase">Surface_Tension</h4>
        <p className="mono text-[10px] text-neutral-800 mt-2 uppercase tracking-[0.4em]">Elastic_Grid_v2</p>
      </div>

      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-[0.03] pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div key={i} className="border-[0.5px] border-white" />
        ))}
      </div>
      
      <motion.div 
        style={{ x: springX, y: springY }}
        className="absolute w-1 h-1 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_30px_cyan] pointer-events-none"
      />
    </div>
  );
};

export default SurfaceTensionDemo;