import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TrailCursorDemo = () => {
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setTrail(prev => [...prev.slice(-12), { x, y, id: Math.random() }]);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full h-full flex items-center justify-center bg-black overflow-hidden relative cursor-none"
    >
      <div className="text-center z-10 pointer-events-none opacity-20">
        <h4 className="text-9xl font-black italic tracking-tighter text-white">MEMORY</h4>
        <p className="mono text-[10px] text-white mt-4 uppercase tracking-[1em]">Temporal_Pathmapping</p>
      </div>

      <AnimatePresence>
        {trail.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: (i + 1) / trail.length }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ left: t.x, top: t.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
             <div 
               className="w-4 h-4 border border-cyan-500 rounded-sm" 
               style={{ rotate: `${i * 15}deg` }}
             />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Active Head */}
      {trail.length > 0 && (
        <motion.div
          animate={{ x: trail[trail.length-1].x, y: trail[trail.length-1].y }}
          className="absolute left-0 top-0 w-2 h-2 bg-white rounded-full shadow-[0_0_20px_white] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />
      )}

      <div className="absolute bottom-8 left-8 mono text-[9px] text-neutral-800 uppercase tracking-widest">
        Buffer_Index: {trail.length} // Memory_Decay: Active
      </div>
    </div>
  );
};

export default TrailCursorDemo;