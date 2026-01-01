
import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const FieldCursorDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full h-full bg-neutral-950 relative overflow-hidden flex items-center justify-center cursor-none"
    >
      <div className="grid grid-cols-12 grid-rows-12 gap-8 pointer-events-none">
        {Array.from({ length: 144 }).map((_, i) => (
          <GridNode key={i} index={i} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>

      <motion.div 
        style={{ x: mouseX, y: mouseY }}
        className="absolute w-32 h-32 border border-cyan-500/20 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
      >
        <div className="w-1 h-1 bg-cyan-500 rounded-full shadow-[0_0_20px_cyan]" />
      </motion.div>

      <div className="absolute bottom-8 right-8 text-right opacity-20 pointer-events-none">
        <h4 className="text-xl font-black italic tracking-tighter text-white uppercase">Field_Pressure</h4>
        <p className="mono text-[8px] text-neutral-500 mt-1 tracking-widest uppercase">Grid_Topology_v9</p>
      </div>
    </div>
  );
};

const GridNode = ({ mouseX, mouseY }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const scale = useMotionValue(1);
  const smoothScale = useSpring(scale, { damping: 20, stiffness: 150 });

  useEffect(() => {
    return mouseX.on('change', (mx: number) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const my = mouseY.get();
      // Use client coordinates for distance comparison
      const dx = mx - (rect.left + rect.width / 2);
      const dy = my - (rect.top + rect.height / 2);
      const d = Math.sqrt(dx * dx + dy * dy);
      
      const threshold = 120;
      if (d < threshold) {
        scale.set(0.2 + (d / threshold) * 0.8);
      } else {
        scale.set(1);
      }
    });
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      style={{ scale: smoothScale }}
      className="w-1.5 h-1.5 bg-neutral-800 rounded-full"
    />
  );
};

export default FieldCursorDemo;
