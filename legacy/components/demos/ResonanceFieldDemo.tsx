
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ResonanceFieldDemo = () => {
  const [points, setPoints] = useState<{ x: number; y: number; id: number; intensity: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPoints(prev => [...prev.slice(-40), { x, y, id: Date.now(), intensity: 1 }]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prev => prev.map(p => ({ ...p, intensity: p.intensity - 0.05 })).filter(p => p.intensity > 0));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMove}
      className="relative w-full h-[500px] bg-neutral-950 border border-white/5 rounded-2xl overflow-hidden cursor-none flex items-center justify-center"
    >
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:32px_32px]" />

      {points.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: p.intensity * 0.4, scale: p.intensity * 2 }}
          style={{ left: p.x, top: p.y, x: '-50%', y: '-50%' }}
          className="absolute w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"
        />
      ))}

      <div className="z-10 text-center pointer-events-none select-none">
        <h4 className="text-8xl font-black italic tracking-tighter text-white opacity-[0.03]">RESONANCE</h4>
        <p className="mono text-[10px] text-neutral-800 mt-2 uppercase tracking-[1em]">Exploring_Curiosity</p>
      </div>

      <div className="absolute bottom-8 right-8 mono text-[9px] text-neutral-800 uppercase tracking-widest">
        Active_Nodes: {points.length}
      </div>
    </div>
  );
};

export default ResonanceFieldDemo;
