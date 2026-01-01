
import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

const MagnetoNavDemo = () => {
  const items = ['DISCOVER', 'EVOLVE', 'CREATE', 'EXPAND'];
  
  return (
    <div className="flex gap-12 items-center justify-center p-20">
      {items.map((item, i) => (
        <MagnetoItem key={i} text={item} />
      ))}
    </div>
  );
};

// Fix: Explicitly typing as React.FC to handle React-reserved 'key' prop correctly in the type system
const MagnetoItem: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Magnet pull effect
    x.set((clientX - centerX) * 0.4);
    y.set((clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative cursor-pointer group p-4"
    >
      <motion.span 
        className="mono text-2xl font-black tracking-tighter group-hover:text-cyan-400 transition-colors"
      >
        {text}
      </motion.span>
      <motion.div 
        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
      />
      <div className="absolute -inset-4 bg-white/0 group-hover:bg-white/5 rounded-full blur-xl transition-colors" />
    </motion.div>
  );
};

export default MagnetoNavDemo;
