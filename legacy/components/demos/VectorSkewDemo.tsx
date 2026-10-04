
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const VectorSkewDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [angle, setAngle] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    
    // Calculate polar angle
    const ang = Math.atan2(dy, dx) * (180 / Math.PI);
    setAngle(ang);

    mouseX.set(dx);
    mouseY.set(dy);
  };

  const springAngle = useSpring(angle, { stiffness: 50, damping: 15 });
  const springX = useSpring(mouseX, { stiffness: 50, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 15 });

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full h-full flex flex-col items-center justify-center p-12 bg-black overflow-hidden relative cursor-none"
    >
      {/* Background Vector Field */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <svg width="100%" height="100%">
            {[...Array(10)].map((_, i) => (
              <line 
                key={i}
                x1="50%" y1="50%"
                x2={50 + Math.cos(i * 36) * 500}
                y2={50 + Math.sin(i * 36) * 500}
                stroke="white"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
            ))}
         </svg>
      </div>

      <div className="relative group">
        {/* Angle Indicator Line */}
        <motion.div 
          style={{ rotate: springAngle }}
          className="absolute top-1/2 left-1/2 w-[400px] h-0.5 bg-gradient-to-r from-cyan-500/20 via-cyan-500 to-transparent origin-left pointer-events-none -z-10" 
        />

        {/* The Vector Shift Button */}
        <motion.button
          style={{ 
            skewX: useTransform(springX, [-300, 300], [-25, 25]),
            skewY: useTransform(springY, [-200, 200], [-15, 15]),
            x: useTransform(springX, [-300, 300], [-20, 20]),
            y: useTransform(springY, [-200, 200], [-20, 20])
          }}
          whileHover={{ scale: 1.05 }}
          className="relative w-80 h-24 bg-neutral-900 border-2 border-white/10 flex flex-col items-center justify-center gap-1 shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="text-3xl font-black italic tracking-tighter text-white uppercase leading-none">ANGLE_SYNC</span>
          <div className="mono text-[8px] text-cyan-500 font-bold tracking-[0.5em] uppercase">Approach_Vector: {angle.toFixed(1)}°</div>
        </motion.button>

        {/* Hitbox Extension Shadows */}
        <motion.div 
          style={{ 
            skewX: useTransform(springX, [-300, 300], [-25, 25]),
            x: useTransform(springX, [-300, 300], [-40, 40]),
            opacity: 0.1
          }}
          className="absolute inset-0 bg-cyan-500 blur-xl pointer-events-none"
        />
      </div>

      {/* Target Cursor Component */}
      <motion.div 
        style={{ x: springX, y: springY, left: '50%', top: '50%' }}
        className="absolute w-4 h-4 border border-white rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
         <div className="w-1 h-1 bg-cyan-500 rounded-full shadow-[0_0_10px_cyan]" />
      </motion.div>

      <div className="absolute bottom-12 text-center pointer-events-none">
        <p className="mono text-[9px] text-neutral-800 uppercase tracking-[0.8em]">Vector_Intent_Field_v10.4</p>
      </div>
    </div>
  );
};

export default VectorSkewDemo;
