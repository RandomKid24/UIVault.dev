
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const HolographicTriggerDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set((e.clientX - cx) * 0.1);
    mouseY.set((e.clientY - cy) * 0.1);
  };

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipples(prev => [...prev, { id: Date.now(), x, y }]);
    setTimeout(() => setRipples(prev => prev.slice(1)), 1000);
  };

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-950 overflow-hidden perspective-[1000px]"
    >
      <div className="relative group">
        {/* Holographic Projection Layer (The "Shadow") */}
        <motion.div
          style={{ 
            x: useTransform(springX, (v) => -v * 2.5),
            y: useTransform(springY, (v) => -v * 2.5),
            translateZ: -50,
            scale: 1.1,
            opacity: 0.2
          }}
          className="absolute inset-0 bg-cyan-500 blur-2xl rounded-2xl pointer-events-none"
        />

        {/* The Main Interactive Core */}
        <motion.button
          onClick={handleClick}
          style={{ 
            rotateX: useTransform(springY, [-20, 20], [15, -15]),
            rotateY: useTransform(springX, [-20, 20], [-15, 15]),
            transformStyle: 'preserve-3d'
          }}
          whileTap={{ translateZ: -20, scale: 0.95 }}
          className="relative w-64 h-32 bg-neutral-900 border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden group"
        >
          {/* Surface Photonic Layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center gap-3">
             <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_10px_cyan]" 
                  />
                ))}
             </div>
             <span className="mono text-sm font-black tracking-[0.5em] text-white uppercase italic">IMPULSE_CORE</span>
          </div>

          {/* Click Ripples */}
          {ripples.map(r => (
            <motion.div
              key={r.id}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 4, opacity: 0 }}
              style={{ left: r.x, top: r.y }}
              className="absolute w-20 h-20 bg-cyan-500/30 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            />
          ))}

          {/* Holographic "Fringe" */}
          <div className="absolute inset-0 border border-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>
      </div>

      <div className="mt-16 text-center">
         <p className="mono text-[9px] text-neutral-600 uppercase tracking-[0.4em] mb-4">Sensing_Volumetric_Pressure</p>
         <div className="flex justify-center gap-8">
            <div className="flex flex-col gap-1">
               <span className="mono text-[7px] text-neutral-800">VX_OFFSET</span>
               <span className="mono text-[10px] text-cyan-700 font-bold">{springX.get().toFixed(2)}</span>
            </div>
            <div className="flex flex-col gap-1">
               <span className="mono text-[7px] text-neutral-800">VY_OFFSET</span>
               <span className="mono text-[10px] text-cyan-700 font-bold">{springY.get().toFixed(2)}</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default HolographicTriggerDemo;
