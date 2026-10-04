
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const StateMemoryDemo = ({ temporal }: any) => {
  const [history, setHistory] = useState<{ x: number; y: number; weight: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { entropy = 0 } = temporal || {};

  const biasX = useMotionValue(0);
  const biasY = useMotionValue(0);
  const springBiasX = useSpring(biasX, { stiffness: 40, damping: 15 });
  const springBiasY = useSpring(biasY, { stiffness: 40, damping: 15 });

  const recordInteraction = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 60;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 60;
    
    biasX.set(nx);
    biasY.set(ny);
    setHistory(prev => [{ x: e.clientX - rect.left, y: e.clientY - rect.top, weight: 1 }, ...prev.slice(0, 15)]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setHistory(prev => prev.map(h => ({ ...h, weight: h.weight - 0.05 })).filter(h => h.weight > 0));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      onClick={recordInteraction}
      className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-950 overflow-hidden gap-12 cursor-crosshair relative"
    >
      <div className="text-center z-20 pointer-events-none">
        <h4 className="text-3xl font-black italic tracking-tighter uppercase">Memory_Mapped_Grid</h4>
        <p className="mono text-[9px] text-neutral-500 uppercase tracking-widest mt-2">Bias_Vector: [ {biasX.get().toFixed(1)}, {biasY.get().toFixed(1)} ]</p>
      </div>

      <motion.div
        style={{ 
          x: springBiasX, 
          y: springBiasY, 
          rotateX: useTransform(springBiasY, [-30, 30], [20, -20]), 
          rotateY: useTransform(springBiasX, [-30, 30], [-20, 20]),
          filter: `blur(${entropy * 10}px)`
        }}
        className="grid grid-cols-3 gap-6 w-96 perspective-[1200px] z-10"
      >
        {[...Array(9)].map((_, i) => (
          <div key={i} className="aspect-square bg-neutral-900 border border-white/5 p-4 flex flex-col justify-end group hover:border-cyan-500/50 transition-colors">
            <div className="w-1 h-4 bg-white/5 group-hover:bg-cyan-500 transition-colors" />
            <span className="mono text-[7px] text-neutral-700 mt-2">STRATA_0{i}</span>
          </div>
        ))}
      </motion.div>

      {/* History Echo Visualization */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {history.map((h, i) => (
          <motion.div
            key={i}
            initial={{ scale: 3, opacity: 0.8 }}
            animate={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{ left: h.x, top: h.y }}
            className="absolute w-4 h-4 border border-cyan-500/20 rounded-full"
          />
        ))}
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-600 leading-relaxed uppercase z-20 pointer-events-none">
        THE INTERFACE ACCUMULATES PHYSICAL MOMENTUM TOWARD YOUR MOST RECENT CLUSTER OF ACTIONS.
      </div>
    </div>
  );
};

export default StateMemoryDemo;
