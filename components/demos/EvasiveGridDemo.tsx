
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const EvasiveGridDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const gridItems = Array.from({ length: 144 }, (_, i) => ({
    id: i,
    x: (i % 12) * 32 - 176,
    y: Math.floor(i / 12) * 32 - 176
  }));

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex items-center justify-center bg-neutral-900 overflow-hidden"
    >
      <div className="relative">
        {gridItems.map((item) => (
          <EvasiveItem 
            key={item.id} 
            baseX={item.x} 
            baseY={item.y} 
            mouseX={mouseX} 
            mouseY={mouseY} 
          />
        ))}
      </div>
      
      <div className="absolute bottom-6 left-6 mono text-[8px] text-neutral-600 tracking-widest">
        REPULSION_FORCE: MAX
      </div>
    </div>
  );
};

const EvasiveItem = ({ baseX, baseY, mouseX, mouseY }: any) => {
  const x = useMotionValue(baseX);
  const y = useMotionValue(baseY);
  
  const springX = useSpring(x, { stiffness: 400, damping: 30 });
  const springY = useSpring(y, { stiffness: 400, damping: 30 });

  React.useEffect(() => {
    return mouseX.on('change', (mx) => {
      const my = mouseY.get();
      const dx = baseX - mx;
      const dy = baseY - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const threshold = 100;
      if (dist < threshold) {
        const force = (threshold - dist) / threshold;
        const pushX = (dx / dist) * force * 50;
        const pushY = (dy / dist) * force * 50;
        x.set(baseX + pushX);
        y.set(baseY + pushY);
      } else {
        x.set(baseX);
        y.set(baseY);
      }
    });
  }, [baseX, baseY, mouseX, mouseY, x, y]);

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className="absolute w-2 h-2 bg-neutral-700 rounded-sm"
    />
  );
};

export default EvasiveGridDemo;
