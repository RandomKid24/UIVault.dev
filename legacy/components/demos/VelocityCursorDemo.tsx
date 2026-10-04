
import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion';

const VelocityCursorDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const vx = useVelocity(mouseX);
  const vy = useVelocity(mouseY);

  const springConfig = { damping: 25, stiffness: 300 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const velocity = useTransform([vx, vy], ([valX, valY]: any) => {
    return Math.sqrt(valX ** 2 + valY ** 2);
  });

  const angle = useTransform([vx, vy], ([valX, valY]: any) => {
    return Math.atan2(valY, valX) * (180 / Math.PI);
  });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-[#050505] relative overflow-hidden flex flex-col items-center justify-center cursor-none"
    >
      <div className="text-center pointer-events-none">
        <h4 className="text-6xl font-black italic tracking-tighter text-white/5 uppercase">Kinetic_Pointer</h4>
        <p className="mono text-[10px] text-neutral-800 mt-4 tracking-[0.8em] uppercase">V-Vector_Warp_Enabled</p>
      </div>

      <motion.div
        style={{ x: smoothX, y: smoothY, rotate: angle, left: -16, top: -16 }}
        className="absolute pointer-events-none z-[100]"
      >
        <motion.div 
          style={{ 
            scaleX: useTransform(velocity, [0, 3000], [1, 3.5]),
            scaleY: useTransform(velocity, [0, 3000], [1, 0.4])
          }}
          className="w-8 h-8 bg-cyan-500 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.6)] flex items-center justify-center"
        >
          <div className="w-1 h-1 bg-white rounded-full" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-12 mono text-[9px] text-neutral-700 tracking-[0.4em] uppercase">
        Move_Cursor_Rapidly_To_Witness_Deformation
      </div>
    </div>
  );
};

export default VelocityCursorDemo;
