
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ThumbReachGridDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const touchX = useMotionValue(200);
  const touchY = useMotionValue(400);
  
  const springX = useSpring(touchX, { stiffness: 100, damping: 25 });
  const springY = useSpring(touchY, { stiffness: 100, damping: 25 });

  const gridItems = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    label: `MOD_0${i}`,
    baseX: (i % 4) * 70 - 105,
    baseY: Math.floor(i / 4) * 70 - 200,
  }));

  const handleInteraction = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    touchX.set(e.clientX - rect.left);
    touchY.set(e.clientY - rect.top);
  };

  return (
    <div 
      ref={containerRef}
      onPointerMove={handleInteraction}
      onPointerDown={handleInteraction}
      className="relative w-full h-full bg-neutral-950 flex items-center justify-center overflow-hidden cursor-crosshair"
    >
      <div className="relative">
        {gridItems.map((item) => (
          <ReachItem 
            key={item.id} 
            item={item} 
            touchX={springX} 
            touchY={springY} 
          />
        ))}
      </div>

      {/* Thumb Zone Visualization */}
      <motion.div 
        style={{ x: springX, y: springY }}
        className="absolute w-40 h-40 border border-cyan-500/20 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
      >
        <div className="w-1 h-1 bg-cyan-500 rounded-full shadow-[0_0_20px_cyan]" />
      </motion.div>

      <div className="absolute top-8 right-8 text-right max-w-[150px]">
        <h4 className="text-xl font-black italic tracking-tighter text-neutral-400 leading-none mb-2 uppercase">Reach_Adapt</h4>
        <p className="mono text-[8px] text-neutral-600 leading-tight">GRID ELEMENTS GRAVITATE TOWARD THE ACTIVE THUMB RADIUS.</p>
      </div>
    </div>
  );
};

const ReachItem = ({ item, touchX, touchY }: any) => {
  const x = useMotionValue(item.baseX);
  const y = useMotionValue(item.baseY);
  
  const springX = useSpring(x, { stiffness: 200, damping: 30 });
  const springY = useSpring(y, { stiffness: 200, damping: 30 });

  React.useEffect(() => {
    return touchX.on('change', (tx: number) => {
      const ty = touchY.get();
      // Calculate item position relative to container center (200, 250 approx)
      const absX = item.baseX + 200;
      const absY = item.baseY + 250;
      
      const dx = tx - absX;
      const dy = ty - absY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const threshold = 250;
      if (dist < threshold) {
        const factor = (threshold - dist) / threshold;
        x.set(item.baseX + dx * factor * 0.5);
        y.set(item.baseY + dy * factor * 0.5);
      } else {
        x.set(item.baseX);
        y.set(item.baseY);
      }
    });
  }, [item.baseX, item.baseY, touchX, touchY, x, y]);

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className="absolute w-12 h-12 bg-neutral-900 border border-white/5 rounded-xl flex items-center justify-center group"
    >
      <div className="mono text-[8px] text-neutral-600 group-hover:text-cyan-400 transition-colors font-bold uppercase">{item.label}</div>
    </motion.div>
  );
};

export default ThumbReachGridDemo;
