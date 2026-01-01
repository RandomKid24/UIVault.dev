
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ChoiceConvergenceDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(250);
  const mouseY = useMotionValue(250);

  const handleMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const choices = [
    { id: 'CONFIRM', x: 0, y: -100, color: 'bg-white text-black' },
    { id: 'CANCEL', x: -100, y: 80, color: 'bg-neutral-900 text-neutral-500' },
    { id: 'MODIFY', x: 100, y: 80, color: 'bg-neutral-900 text-neutral-500' }
  ];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMove}
      className="relative w-full h-[500px] flex items-center justify-center bg-neutral-950 overflow-hidden cursor-crosshair"
    >
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff20_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative">
        {choices.map((choice) => (
          <ConvergentChoice 
            key={choice.id} 
            choice={choice} 
            mouseX={mouseX} 
            mouseY={mouseY} 
          />
        ))}
      </div>

      <div className="absolute top-8 left-8 text-left max-w-[200px]">
        <h4 className="text-2xl font-black italic tracking-tighter">CONVERGENCE</h4>
        <p className="mono text-[8px] text-neutral-600 mt-2 leading-tight uppercase">
          Dynamic gravity wells shift interactive targets toward user intent vectors.
        </p>
      </div>
    </div>
  );
};

const ConvergentChoice = ({ choice, mouseX, mouseY }: any) => {
  const x = useMotionValue(choice.x);
  const y = useMotionValue(choice.y);
  const springX = useSpring(x, { stiffness: 200, damping: 25 });
  const springY = useSpring(y, { stiffness: 200, damping: 25 });

  useEffect(() => {
    return mouseX.on('change', (mx: number) => {
      const my = mouseY.get();
      // Center of container is 250, 250
      const absX = choice.x + 250;
      const absY = choice.y + 250;

      const dx = mx - absX;
      const dy = my - absY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const threshold = 300;
      if (dist < threshold) {
        const power = (threshold - dist) / threshold;
        x.set(choice.x + dx * power * 0.4);
        y.set(choice.y + dy * power * 0.4);
      } else {
        x.set(choice.x);
        y.set(choice.y);
      }
    });
  }, [choice.x, choice.y, mouseX, mouseY]);

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className={`absolute px-8 py-3 rounded-full border border-white/10 font-black mono text-xs tracking-widest ${choice.color} shadow-2xl -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-shadow hover:shadow-cyan-500/20`}
    >
      {choice.id}
    </motion.div>
  );
};

export default ChoiceConvergenceDemo;
