
import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const TetherCursorDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(250);
  const mouseY = useMotionValue(250);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 200 });

  const anchors = [
    { x: 0.2, y: 0.2, id: 1 }, { x: 0.8, y: 0.2, id: 2 },
    { x: 0.2, y: 0.8, id: 3 }, { x: 0.8, y: 0.8, id: 4 },
    { x: 0.5, y: 0.5, id: 5 }
  ];

  const [nearest, setNearest] = useState<any>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      mouseX.set(mx);
      mouseY.set(my);

      let minDist = Infinity;
      let target: any = null;

      anchors.forEach(a => {
        const tx = a.x * rect.width;
        const ty = a.y * rect.height;
        const d = Math.sqrt((mx - tx) ** 2 + (my - ty) ** 2);
        if (d < minDist && d < 200) {
          minDist = d;
          target = { x: tx, y: ty, dist: d };
        }
      });
      setNearest(target);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-[#020202] relative overflow-hidden cursor-none"
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <AnimatePresence>
          {nearest && (
            <motion.line
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 - nearest.dist / 200 }}
              exit={{ opacity: 0 }}
              x1={smoothX}
              y1={smoothY}
              x2={nearest.x}
              y2={nearest.y}
              stroke="#06b6d4"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          )}
        </AnimatePresence>
      </svg>

      {/* Anchor Nodes */}
      {anchors.map(a => (
        <div 
          key={a.id} 
          className="absolute w-2 h-2 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" 
          style={{ left: `${a.x * 100}%`, top: `${a.y * 100}%` }} 
        />
      ))}

      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute w-4 h-4 border border-white rounded-full -translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-center"
      >
        <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]" />
      </motion.div>

      <div className="absolute top-12 left-12 text-left">
        <h4 className="text-2xl font-black italic tracking-tighter text-white/10 uppercase">Proximity_Tether</h4>
        <p className="mono text-[8px] text-neutral-800 mt-2 tracking-[0.5em] uppercase">Dynamic_Anchor_Sync</p>
      </div>
    </div>
  );
};

export default TetherCursorDemo;
