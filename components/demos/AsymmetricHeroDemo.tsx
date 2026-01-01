
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const AsymmetricHeroDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMove}
      className="relative w-full h-full bg-neutral-950 overflow-hidden flex items-center justify-center"
    >
      {/* Central Asymmetric Brand */}
      <motion.div 
        style={{ 
          x: useSpring(useTransform(mouseX, [-0.5, 0.5], [50, -50])),
          y: useSpring(useTransform(mouseY, [-0.5, 0.5], [50, -50]))
        }}
        className="relative z-20"
      >
        <h2 className="text-8xl font-black tracking-tighter italic -skew-x-12 border-b-8 border-cyan-500">
          BREAK
        </h2>
        <span className="mono text-[12px] block text-right mt-2 text-neutral-500 tracking-widest">
          //GRID_COLLAPSE_v1.0
        </span>
      </motion.div>

      {/* Floating Fragments */}
      <Fragment x={-120} y={-80} delay={0} mouseX={mouseX} mouseY={mouseY} z={40}>
        <div className="p-4 bg-neutral-900 border border-white/5 mono text-[9px] text-cyan-500">
          &lt;div class="chaos" /&gt;
        </div>
      </Fragment>

      <Fragment x={150} y={100} delay={0.2} mouseX={mouseX} mouseY={mouseY} z={80}>
        <div className="text-5xl font-black opacity-10 italic">01.02.03</div>
      </Fragment>

      <Fragment x={-200} y={150} delay={0.4} mouseX={mouseX} mouseY={mouseY} z={20}>
        <div className="w-32 h-1 bg-white/20" />
      </Fragment>

      <Fragment x={250} y={-180} delay={0.6} mouseX={mouseX} mouseY={mouseY} z={60}>
        <div className="w-48 h-48 border border-white/5 rounded-full" />
      </Fragment>
    </div>
  );
};

const Fragment = ({ children, x, y, delay, mouseX, mouseY, z }: any) => {
  const sx = useSpring(useTransform(mouseX, [-0.5, 0.5], [x - z, x + z]), { damping: 25 });
  const sy = useSpring(useTransform(mouseY, [-0.5, 0.5], [y - z, y + z]), { damping: 25 });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      style={{ x: sx, y: sy }}
      className="absolute pointer-events-none"
    >
      {children}
    </motion.div>
  );
};

export default AsymmetricHeroDemo;
