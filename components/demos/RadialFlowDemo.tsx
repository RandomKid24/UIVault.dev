
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const RadialFlowDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [grid] = useState(() => Array.from({ length: 64 }, (_, i) => ({
    id: i,
    x: (i % 8) * 40 - 140,
    y: Math.floor(i / 8) * 40 - 140
  })));

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
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
      className="relative w-full h-[400px] flex items-center justify-center bg-neutral-900/20"
    >
      <div className="relative">
        {grid.map((item) => (
          <FlowItem 
            key={item.id} 
            baseX={item.x} 
            baseY={item.y} 
            mouseX={mouseX} 
            mouseY={mouseY} 
          />
        ))}
      </div>
      
      {/* Decorative center point */}
      <div className="absolute w-1 h-1 bg-white/10 rounded-full" />
    </div>
  );
};

// Fix: Explicitly typing as React.FC to handle React-reserved 'key' prop correctly in the type system
const FlowItem: React.FC<{ baseX: number; baseY: number; mouseX: any; mouseY: any }> = ({ baseX, baseY, mouseX, mouseY }) => {
  const x = useMotionValue(baseX);
  const y = useMotionValue(baseY);
  const scale = useMotionValue(1);
  const opacity = useMotionValue(0.1);

  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const springScale = useSpring(scale, { stiffness: 150, damping: 20 });
  const springOpacity = useSpring(opacity, { stiffness: 150, damping: 20 });

  useEffect(() => {
    return mouseX.on('change', (latestX: number) => {
      // Calculate global center for the container
      const cx = 0; // Relative to the wrapper center
      const cy = 0;

      // Distance from mouse to item
      // We adjust for the fact that the container center is at relative 0,0
      // but mouse is relative to top-left. Wrapper is 400x400.
      const mx = latestX - 200;
      const my = mouseY.get() - 200;

      const dx = mx - baseX;
      const dy = my - baseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const maxDist = 150;
      const factor = Math.max(0, 1 - dist / maxDist);

      // Effect: Closer objects pull toward mouse, scale up, and brighten
      x.set(baseX + dx * factor * 0.8);
      y.set(baseY + dy * factor * 0.8);
      scale.set(1 + factor * 2);
      opacity.set(0.1 + factor * 0.9);
    });
  }, [baseX, baseY, mouseX, mouseY, x, y, scale, opacity]);

  return (
    <motion.div
      style={{ 
        x: springX, 
        y: springY, 
        scale: springScale, 
        opacity: springOpacity 
      }}
      className="absolute w-2 h-2 bg-cyan-500 rounded-full"
    />
  );
};

export default RadialFlowDemo;
