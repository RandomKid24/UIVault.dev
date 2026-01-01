
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const UniversalKineticDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(250);
  const mouseY = useMotionValue(250);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const grid = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    label: `LINK_0${i}`,
    x: (i % 3) * 120 - 120,
    y: Math.floor(i / 3) * 120 - 120
  }));

  const handleMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMove}
      className="relative w-full h-full flex items-center justify-center bg-neutral-950/20 overflow-hidden cursor-crosshair"
    >
      <div className="relative">
        {grid.map((item) => (
          <ScalingNode key={item.id} item={item} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>

      <div className="absolute top-8 left-8 text-left max-w-[200px]">
        <h4 className="text-2xl font-black italic tracking-tighter">UNIVERSAL_KINETIC</h4>
        <p className="mono text-[8px] text-neutral-600 mt-2 leading-tight uppercase">
          Dynamic hit-box scaling based on confidence approach. Helping users land with precision.
        </p>
      </div>
    </div>
  );
};

const ScalingNode = ({ item, mouseX, mouseY }: any) => {
  const [scale, setScale] = useState(1);
  const [glow, setGlow] = useState(0);

  useEffect(() => {
    return mouseX.on('change', (mx: number) => {
      const my = mouseY.get();
      // Calculate node position relative to center (approx 250, 250)
      const nodeX = item.x + 250;
      const nodeY = item.y + 250;

      const dx = mx - nodeX;
      const dy = my - nodeY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Scale up if cursor is within 200px
      const threshold = 150;
      if (dist < threshold) {
        const factor = (threshold - dist) / threshold;
        setScale(1 + factor * 0.6);
        setGlow(factor);
      } else {
        setScale(1);
        setGlow(0);
      }
    });
  }, [item.x, item.y, mouseX, mouseY]);

  return (
    <motion.div
      animate={{ scale, x: item.x, y: item.y }}
      className="absolute w-20 h-20 flex items-center justify-center group"
    >
      <div 
        className="w-16 h-16 bg-neutral-900 border-2 transition-colors flex flex-col items-center justify-center gap-1 rounded-xl"
        style={{ 
          borderColor: glow > 0.5 ? '#fff' : 'rgba(255,255,255,0.05)',
          boxShadow: `0 0 ${glow * 30}px rgba(6, 182, 212, ${glow * 0.4})`
        }}
      >
        <span className="mono text-[7px] text-neutral-700 font-black tracking-widest uppercase italic">{item.label}</span>
        <div className={`w-2 h-2 rounded-full transition-all ${glow > 0.5 ? 'bg-cyan-500 scale-125' : 'bg-white/10'}`} />
      </div>
    </motion.div>
  );
};

export default UniversalKineticDemo;
