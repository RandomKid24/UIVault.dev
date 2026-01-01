import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const RebelNavigationDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(200);
  const mouseY = useMotionValue(200);

  const [activeItem, setActiveItem] = useState(0);

  const handleMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // REBEL LOGIC: Swap X and Y, and Invert them
    mouseX.set(rect.width - y);
    mouseY.set(rect.height - x);
  };

  const navItems = ['STRATA', 'VECT', 'LOGIC', 'BIO'];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMove}
      className="relative w-full h-[500px] bg-neutral-950 flex items-center justify-center overflow-hidden border border-white/5 rounded-2xl cursor-none"
    >
      <div className="flex flex-col gap-8 items-center">
        {navItems.map((item, i) => (
          <motion.div
            key={item}
            animate={{
              scale: activeItem === i ? 1.5 : 1,
              color: activeItem === i ? '#06b6d4' : '#222',
              opacity: activeItem === i ? 1 : 0.3
            }}
            className="text-6xl font-black italic tracking-tighter uppercase select-none"
          >
            {item}
          </motion.div>
        ))}
      </div>

      {/* The Swapped Cursor */}
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        className="absolute w-6 h-6 border-2 border-cyan-500 rounded-full flex items-center justify-center pointer-events-none z-50"
      >
        <div className="w-1 h-1 bg-cyan-500 rounded-full" />
      </motion.div>

      {/* Logic remap visualization */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 p-8 mono text-[10px] text-cyan-800">Remap: [X → -Y, Y → -X]</div>
        <div className="w-full h-full grid grid-cols-2 grid-rows-2">
           <div className="border border-white/10" />
           <div className="border border-white/10" />
           <div className="border border-white/10" />
           <div className="border border-white/10" />
        </div>
      </div>

      <div className="absolute bottom-8 left-8 max-w-xs mono text-[8px] text-neutral-700 leading-relaxed uppercase">
        ANTI-UI_PATTERN: INPUT_HIJACK. SPATIAL EXPECTATIONS ARE REMAPPED TO CHALLENGE COGNITIVE AUTOMATION.
      </div>
    </div>
  );
};

export default RebelNavigationDemo;
