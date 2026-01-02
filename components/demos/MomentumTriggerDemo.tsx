
import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

const MomentumTriggerDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isInsideInfluence, setIsInsideInfluence] = useState(false);

  // Smooth springs for the magnetic pull
  const springConfig = { stiffness: 150, damping: 20 };
  const pullX = useSpring(mouseX, springConfig);
  const pullY = useSpring(mouseY, springConfig);

  // 3D Rotation based on cursor position relative to button center
  const rotateX = useTransform(pullY, [-50, 50], [15, -15]);
  const rotateY = useTransform(pullX, [-50, 50], [-15, 15]);
  
  // Internal Parallax for text (moves faster than the box)
  const textX = useTransform(pullX, (v) => v * 0.4);
  const textY = useTransform(pullY, (v) => v * 0.4);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Magnetic Influence Radius: 200px
    if (dist < 200) {
      setIsInsideInfluence(true);
      // Map displacement (capped at 50px)
      mouseX.set(Math.max(-50, Math.min(50, dx * 0.3)));
      mouseY.set(Math.max(-50, Math.min(50, dy * 0.3)));
    } else {
      handleMouseLeave();
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsInsideInfluence(false);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-950 overflow-hidden gap-12 relative cursor-none"
    >
      <div className="text-center z-10 pointer-events-none">
        <h4 className="text-3xl font-black italic tracking-tighter text-white uppercase leading-none">Magnetic_Intent</h4>
        <p className="mono text-[9px] text-cyan-500 mt-4 uppercase tracking-[0.5em]">Field_State: {isInsideInfluence ? 'ENGAGED' : 'IDLE'}</p>
      </div>

      <div className="relative perspective-[1000px]">
        {/* The Magnetic Button Entity */}
        <motion.button
          ref={buttonRef}
          style={{ 
            x: pullX, 
            y: pullY, 
            rotateX, 
            rotateY,
            transformStyle: 'preserve-3d' 
          }}
          whileTap={{ scale: 0.9 }}
          className="relative w-64 h-24 bg-white border-2 border-white/20 flex items-center justify-center group overflow-hidden"
        >
          {/* Surface Detail */}
          <div className="absolute inset-0 bg-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Parallax Content Layer */}
          <motion.div 
            style={{ x: textX, y: textY, translateZ: 50 }}
            className="relative z-20 flex flex-col items-center gap-1"
          >
            <span className="text-black font-black italic mono text-sm tracking-[0.3em] uppercase">Initialize</span>
            <div className="w-8 h-0.5 bg-cyan-500" />
          </motion.div>

          {/* Magnetic Core Detail */}
          <div className="absolute top-2 left-2 w-1 h-1 bg-black/20 rounded-full" />
          <div className="absolute bottom-2 right-2 w-1 h-1 bg-black/20 rounded-full" />
        </motion.button>

        {/* Visual Flux Field (Tether line) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-[-1]">
          <motion.line
            animate={{ 
              opacity: isInsideInfluence ? [0.1, 0.3, 0.1] : 0,
              strokeDashoffset: [0, -20]
            }}
            transition={{ strokeDashoffset: { repeat: Infinity, duration: 1, ease: 'linear' } }}
            x1="50%" y1="50%"
            x2={useTransform(pullX, (v) => `calc(50% + ${v * 2}px)`)}
            y2={useTransform(pullY, (v) => `calc(50% + ${v * 2}px)`)}
            stroke="cyan"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      {/* Field Background HUD */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Custom Field Cursor */}
      <motion.div 
        animate={{ 
          x: pullX.get() * 5, // Exaggerated movement
          y: pullY.get() * 5,
          scale: isInsideInfluence ? 0.5 : 1
        }}
        className="fixed w-4 h-4 border border-white rounded-full pointer-events-none z-[100] mix-blend-difference"
      />

      <div className="max-w-xs text-center mono text-[9px] text-neutral-700 leading-relaxed uppercase">
        INSTRUMENT_CLASS: INTENT_GATE. OBSERVE THE 3D LEANING TRANSFORMATIONS AS THE CURSOR EXERTS VIRTUAL GRAVITY ON THE BUTTON'S MASS.
      </div>
    </div>
  );
};

export default MomentumTriggerDemo;
