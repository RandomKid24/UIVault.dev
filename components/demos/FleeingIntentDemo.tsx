import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion';

const FleeingIntentDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(200);
  const mouseY = useMotionValue(250);
  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);

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
      className="relative w-full h-[500px] bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden cursor-none flex items-center justify-center"
    >
      <div className="grid grid-cols-5 gap-8">
        {[...Array(15)].map((_, i) => (
          <FleeingNode 
            key={i} 
            index={i} 
            mouseX={mouseX} 
            mouseY={mouseY} 
            vx={velocityX} 
            vy={velocityY} 
          />
        ))}
      </div>

      <motion.div 
        style={{ x: mouseX, y: mouseY }}
        className="absolute w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 z-[100] shadow-[0_0_15px_white]"
      />

      <div className="absolute top-8 left-8 mono text-[9px] text-neutral-600">
        INPUT_DEFENSE_MODE: ACTIVE
      </div>
    </div>
  );
};

const FleeingNode = ({ index, mouseX, mouseY, vx, vy }: any) => {
  const baseX = (index % 5) * 80 - 160;
  const baseY = Math.floor(index / 5) * 80 - 160;
  
  const x = useMotionValue(baseX);
  const y = useMotionValue(baseY);
  const springX = useSpring(x, { stiffness: 400, damping: 30 });
  const springY = useSpring(y, { stiffness: 400, damping: 30 });

  React.useEffect(() => {
    return mouseX.on('change', (mx: number) => {
      const my = mouseY.get();
      const absX = baseX + 250;
      const absY = baseY + 250;
      
      const dx = absX - mx;
      const dy = absY - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const vel = Math.sqrt(vx.get() ** 2 + vy.get() ** 2);
      
      // Only flee if cursor velocity is high and within 120px
      const threshold = 120;
      if (dist < threshold && vel > 1000) {
        const power = (threshold - dist) / threshold;
        const fleeX = (dx / dist) * power * 150;
        const fleeY = (dy / dist) * power * 150;
        x.set(baseX + fleeX);
        y.set(baseY + fleeY);
      } else {
        x.set(baseX);
        y.set(baseY);
      }
    });
  }, [baseX, baseY, mouseX, mouseY, vx, vy]);

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className="w-12 h-12 bg-neutral-800 border border-white/5 rounded-lg flex items-center justify-center group cursor-pointer hover:bg-cyan-500 transition-colors"
    >
      <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-black" />
    </motion.div>
  );
};

export default FleeingIntentDemo;
