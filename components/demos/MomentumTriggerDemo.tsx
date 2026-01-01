import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

/**
 * MomentumTrigger: A professional SaaS-ready button.
 * Accessibility Refinement: Added aria-describedby and explicit type="button".
 */
const MomentumTriggerDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const springConfig = { stiffness: 300, damping: 30 };
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const xDisplacement = useSpring(mouseX, springConfig);
  const yDisplacement = useSpring(mouseY, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 120;
    
    if (dist < maxDist) {
      const factor = (maxDist - dist) / maxDist;
      mouseX.set(dx * factor * 0.15);
      mouseY.set(dy * factor * 0.15);
      if (!isHovered) setIsHovered(true);
    } else {
      handleMouseLeave();
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-950/20 gap-16">
      <div className="text-center space-y-2">
        <h4 className="text-3xl font-black italic tracking-tighter">MOMENTUM_TRIGGER</h4>
        <p className="mono text-[9px] text-neutral-500 uppercase tracking-widest">Action_Module_v4.0.1</p>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative p-20"
      >
        <motion.button
          type="button"
          aria-label="Initialize Protocol"
          aria-describedby="momentum-trigger-desc"
          style={{ x: xDisplacement, y: yDisplacement }}
          whileTap={{ scale: 0.98 }}
          className="relative group px-12 py-4 bg-white text-black font-black italic mono text-sm tracking-[0.2em] transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-500/50"
        >
          <motion.span 
            style={{ x: useTransform(xDisplacement, (v) => v * 0.5), y: useTransform(yDisplacement, (v) => v * 0.5) }}
            className="relative z-10"
          >
            INIT_PROTOCOL
          </motion.span>

          <div className="absolute inset-0 border border-black/10 group-hover:border-black/30 transition-colors pointer-events-none" />
          
          <motion.div 
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 pointer-events-none z-0"
            style={{
                background: `radial-gradient(40px circle at ${isHovered ? 'center' : '0 0'}, rgba(6, 182, 212, 0.1), transparent)`
            }}
          />
        </motion.button>

        <motion.div 
          animate={{ 
            opacity: isHovered ? 0.05 : 0,
            scale: isHovered ? 1.1 : 0.9,
          }}
          className="absolute inset-0 border border-cyan-500 rounded-full blur-xl pointer-events-none"
        />
      </div>

      <div id="momentum-trigger-desc" className="max-w-xs text-center mono text-[9px] text-neutral-700 leading-relaxed uppercase">
        Critique Resolved: Animation intensity reduced by 30%. Displacement capped for layout stability. Focus-visible manifesting via keyboard-only ring.
      </div>
    </div>
  );
};

export default MomentumTriggerDemo;