import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ProximityFieldDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const dots = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 500,
    y: (Math.random() - 0.5) * 400,
  }));

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(-1000); mouseY.set(-1000); }}
      className="relative w-full h-[500px] flex items-center justify-center bg-neutral-950 overflow-hidden cursor-none"
    >
      <div className="relative">
        {dots.map((dot) => (
          <ProximityDot 
            key={dot.id} 
            baseX={dot.x} 
            baseY={dot.y} 
            mouseX={mouseX} 
            mouseY={mouseY} 
          />
        ))}
      </div>

      <div className="z-10 text-center pointer-events-none select-none opacity-10">
        <h4 className="text-9xl font-black italic tracking-tighter text-white">FIELD</h4>
      </div>

      <motion.div 
        style={{ x: mouseX, y: mouseY }}
        className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_20px_white] pointer-events-none"
      />
    </div>
  );
};

const ProximityDot = ({ baseX, baseY, mouseX, mouseY }: any) => {
  const [fidelity, setFidelity] = useState(0);

  useEffect(() => {
    return mouseX.on('change', (mx: number) => {
      const my = mouseY.get();
      const dx = mx - baseX;
      const dy = my - baseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const threshold = 180;
      setFidelity(Math.max(0, 1 - dist / threshold));
    });
  }, [baseX, baseY, mouseX, mouseY]);

  return (
    <motion.div
      animate={{ 
        x: baseX, 
        y: baseY,
        scale: 0.5 + fidelity * 1.5,
        opacity: 0.05 + fidelity * 0.8,
        filter: `blur(${(1 - fidelity) * 4}px)`,
        backgroundColor: fidelity > 0.8 ? '#06b6d4' : '#fff'
      }}
      className="absolute w-1.5 h-1.5 rounded-full"
    />
  );
};

export default ProximityFieldDemo;
