import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const IsometricGridFluxDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const rotateX = useTransform(springY, [0, 1], [40, 60]);
  const rotateZ = useTransform(springX, [0, 1], [-55, -35]);

  const cells = Array.from({ length: 16 });

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full h-full flex items-center justify-center bg-neutral-900/20 perspective-[1000px]"
    >
      <motion.div
        style={{ rotateX, rotateZ, transformStyle: 'preserve-3d' }}
        className="grid grid-cols-4 gap-4 w-[400px] h-[400px]"
      >
        {cells.map((_, i) => (
          <motion.div
            key={i}
            whileHover={{ translateZ: 50 }}
            className="relative bg-neutral-900 border border-white/10 rounded-lg group overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Side faces for 3D effect */}
            <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/20 transition-colors" />
            <div className="absolute bottom-4 right-4 mono text-[8px] text-neutral-700 font-bold group-hover:text-cyan-400 transition-colors uppercase">
              MOD_{i}
            </div>
            
            {/* 2.5D extrusion hint */}
            <motion.div 
              style={{ translateZ: -10 }}
              className="absolute inset-0 bg-black opacity-20"
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="absolute bottom-8 right-8 text-right">
        <h4 className="text-xl font-black italic tracking-tighter text-neutral-500 uppercase">Iso_Flux</h4>
        <p className="mono text-[8px] text-neutral-700 uppercase tracking-widest mt-1">pseudo-3D_Extrusion_v1</p>
      </div>
    </div>
  );
};

export default IsometricGridFluxDemo;
