
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Impression {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

const MemorySurfaceDemo = () => {
  const [impressions, setImpressions] = useState<Impression[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const addImpression = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newImpression = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      timestamp: Date.now()
    };
    setImpressions(prev => [...prev.slice(-15), newImpression]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setImpressions(prev => prev.filter(imp => Date.now() - imp.timestamp < 4000));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      onPointerDown={addImpression}
      onPointerMove={(e) => e.buttons > 0 && addImpression(e)}
      className="relative w-full h-[500px] bg-neutral-950 border border-white/5 rounded-2xl overflow-hidden cursor-crosshair flex items-center justify-center"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="z-10 text-center pointer-events-none select-none">
        <h4 className="text-4xl font-black italic tracking-tighter text-white opacity-20">MEMORY_FOAM</h4>
        <p className="mono text-[10px] text-neutral-700 mt-2 uppercase tracking-[0.4em]">Touch_Persistence_Active</p>
      </div>

      <AnimatePresence>
        {impressions.map((imp) => (
          <motion.div
            key={imp.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.2, 0.8], 
              opacity: [0.6, 0.4, 0],
              filter: ["blur(0px)", "blur(20px)", "blur(40px)"] 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, ease: "easeOut" }}
            style={{ 
              left: imp.x, 
              top: imp.y,
              x: "-50%",
              y: "-50%"
            }}
            className="absolute pointer-events-none"
          >
            <div className="w-32 h-32 bg-cyan-500/20 rounded-full border border-cyan-500/10 flex items-center justify-center">
               <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_20px_cyan]" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="absolute bottom-8 right-8 mono text-[9px] text-neutral-800 uppercase tracking-widest">
        Active_Impressions: {impressions.length}
      </div>
    </div>
  );
};

export default MemorySurfaceDemo;
