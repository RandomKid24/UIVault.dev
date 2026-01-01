
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const GeometricWarpDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [20, -20]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-20, 20]), { stiffness: 100, damping: 20 });
  const perspective = useSpring(useTransform(y, [0, 1], [1000, 800]), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full flex items-center justify-center bg-black/20 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, perspective }}
        className="w-80 h-96 relative preserve-3d"
      >
        <div className="absolute inset-0 bg-neutral-900 border border-white/10 rounded-2xl flex flex-col p-8 overflow-hidden">
          <div className="w-12 h-12 bg-cyan-500/20 rounded-full mb-6 border border-cyan-500/30" />
          <h3 className="text-4xl font-black italic tracking-tighter mb-4 leading-none">GEOMETRIC_WARP</h3>
          <p className="text-neutral-500 text-xs mono leading-relaxed mb-12">
            THE CONTAINER RESPONDS TO YOUR POSITION IN SPACE.
          </p>
          <div className="mt-auto flex justify-between items-end">
            <div className="mono text-[10px] text-cyan-500">v4.3.0</div>
            <div className="w-16 h-1 bg-white/10" />
          </div>
        </div>

        {/* Floating Accents */}
        <motion.div 
          style={{ translateZ: 50 }}
          className="absolute -top-4 -right-4 w-24 h-24 border border-cyan-500/40 rounded-full flex items-center justify-center bg-cyan-500/5 backdrop-blur-sm"
        >
          <div className="mono text-[8px] text-cyan-500">XY_SYNC</div>
        </motion.div>
      </motion.div>
      
      <style>{`
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
};

export default GeometricWarpDemo;
