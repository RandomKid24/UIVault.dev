
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ReactiveClusterDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const dots = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 400,
    y: (Math.random() - 0.5) * 400,
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
      className="relative w-full h-full flex items-center justify-center bg-neutral-950 overflow-hidden"
    >
      <div className="relative">
        {dots.map((dot) => (
          <ClusterDot 
            key={dot.id} 
            baseX={dot.x} 
            baseY={dot.y} 
            mouseX={mouseX} 
            mouseY={mouseY} 
          />
        ))}
      </div>
      <div className="absolute top-8 right-8 mono text-[9px] text-neutral-700 tracking-[0.2em]">
        MAGNETIC_FIELD_STRENGTH: 0.85
      </div>
    </div>
  );
};

const ClusterDot = ({ baseX, baseY, mouseX, mouseY }: any) => {
  const x = useMotionValue(baseX);
  const y = useMotionValue(baseY);
  
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  React.useEffect(() => {
    return mouseX.on('change', (mx) => {
      const my = mouseY.get();
      const dx = mx - baseX;
      const dy = my - baseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const maxDist = 150;
      const factor = Math.max(0, 1 - dist / maxDist);
      
      // Pull toward mouse
      x.set(baseX + dx * factor * 0.9);
      y.set(baseY + dy * factor * 0.9);
    });
  }, [baseX, baseY, mouseX, mouseY, x, y]);

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className="absolute w-1 h-1 bg-cyan-500/40 rounded-full"
    />
  );
};

export default ReactiveClusterDemo;
