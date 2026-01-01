
import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

const MomentumTriggerDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High-fidelity spring config for tactile "snap"
  const springConfig = { stiffness: 200, damping: 25, mass: 0.5 };
  
  // Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isPressed = useMotionValue(0);

  // Smooth Springs for rotation
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  const pressScale = useSpring(isPressed, { stiffness: 400, damping: 30 });

  // 3D Transformations
  const rotateX = useTransform(y, [-100, 100], [20, -20]);
  const rotateY = useTransform(x, [-100, 100], [-20, 20]);
  
  // Parallax Depth Layers
  const labelZ = useTransform(pressScale, [0, 1], [40, 10]);
  const shadowOpacity = useTransform(pressScale, [0, 1], [0.3, 0.6]);
  const buttonScale = useTransform(pressScale, [0, 1], [1, 0.96]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    
    // Magnetic pull distance
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 300;
    
    if (dist < maxDist) {
      const power = (maxDist - dist) / maxDist;
      mouseX.set(dx * power * 0.5);
      mouseY.set(dy * power * 0.5);
    } else {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full flex flex-col items-center justify-center p-12 bg-[#020202] gap-16 overflow-hidden relative perspective-[1200px]"
    >
      {/* Background Dimensional Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full grid grid-cols-6 grid-rows-6">
           {[...Array(36)].map((_, i) => <div key={i} className="border-[0.5px] border-cyan-500" />)}
        </div>
      </div>

      <div className="text-center z-10 space-y-2">
        <div className="flex items-center justify-center gap-3">
           <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_cyan]" />
           <span className="mono text-[10px] text-cyan-500 font-black tracking-[0.8em] uppercase">Vect_Momentum_v4</span>
        </div>
      </div>

      <motion.div
        style={{ 
          rotateX, 
          rotateY, 
          scale: buttonScale,
          transformStyle: 'preserve-3d'
        }}
        className="relative group cursor-pointer"
      >
        {/* Dynamic Shadow Layer */}
        <motion.div 
          style={{ 
            translateZ: -50, 
            opacity: shadowOpacity,
            filter: 'blur(30px)' 
          }}
          className="absolute inset-0 bg-cyan-500/30 rounded-2xl" 
        />

        {/* The 3D Chassis */}
        <motion.button
          onPointerDown={() => isPressed.set(1)}
          onPointerUp={() => isPressed.set(0)}
          className="relative w-80 h-28 bg-neutral-900 border-2 border-white/10 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center group-hover:border-cyan-500/40 transition-colors"
          style={{ transformStyle: 'preserve-3d' }}
        >
           {/* Internal Light Spill (Masked Photonic Field) */}
           <motion.div 
             style={{ 
               x: useTransform(x, (v) => v * -1.2), 
               y: useTransform(y, (v) => v * -1.2),
             }}
             className="absolute inset-[-100%] pointer-events-none bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15),transparent_60%)] z-0"
           />

           {/* Stratified Content with Parallax */}
           <motion.div 
             style={{ translateZ: labelZ }}
             className="flex items-center gap-6 relative z-10 pointer-events-none"
           >
              <div className="flex flex-col items-center">
                 <div className="w-1 h-8 bg-cyan-500 mb-2 rounded-full shadow-[0_0_15px_cyan]" />
                 <div className="w-1 h-1 bg-white rounded-full opacity-40" />
              </div>
              <div className="flex flex-col items-start">
                 <span className="mono text-[8px] font-black tracking-[0.4em] text-cyan-500/60 uppercase">Init_Authorization</span>
                 <span className="text-4xl font-black italic tracking-tighter text-white leading-none uppercase">Commit_Entropy</span>
              </div>
           </motion.div>

           {/* Corner Decorators */}
           <div className="absolute top-4 left-4 flex gap-1.5">
              <div className="w-1 h-1 bg-cyan-500 rounded-full" />
              <div className="w-4 h-[1px] bg-white/20 mt-0.5" />
           </div>
           
           {/* High-Energy Edge Glint */}
           <motion.div 
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent skew-x-12 pointer-events-none"
           />
        </motion.button>

        {/* Outer Orbital Ring (Deep Z) */}
        <motion.div 
          style={{ translateZ: -80, opacity: 0.05 }}
          className="absolute -inset-12 border-2 border-dashed border-white rounded-3xl pointer-events-none group-hover:scale-110 transition-transform duration-1000"
        />
      </motion.div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-600 leading-relaxed uppercase z-10">
        CURSOR PROXIMITY WARPS THE SPATIAL ORIGIN. THE LABEL FLOATS IN Z-SPACE TO COMMUNICATE VOLUME AND RELATIVE MASS.
      </div>
    </div>
  );
};

export default MomentumTriggerDemo;
