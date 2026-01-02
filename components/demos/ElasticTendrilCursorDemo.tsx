
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useVelocity, useAnimationFrame } from 'framer-motion';

const ElasticTendrilCursorDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(200);
  const mouseY = useMotionValue(250);

  // Buffer to store historical mouse positions for the "body" of the tendrils
  const bufferLength = 8;
  const history = useRef<{ x: number, y: number }[]>([]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  const [tendrils, setTendrils] = useState<string[]>(["", "", ""]);

  useAnimationFrame(() => {
    const currentX = mouseX.get();
    const currentY = mouseY.get();
    
    // Update history
    history.current = [{ x: currentX, y: currentY }, ...history.current.slice(0, bufferLength - 1)];
    
    if (history.current.length < bufferLength) return;

    // Generate 3 organic tendrils with different "lazy" behaviors
    const newPaths = [0.4, 0.7, 1].map((laziness, i) => {
        let path = `M ${currentX} ${currentY}`;
        history.current.forEach((point, idx) => {
            if (idx === 0) return;
            // Add wave based on laziness and index
            const waveX = Math.sin(Date.now() / 200 + idx + i) * (idx * 2 * laziness);
            const waveY = Math.cos(Date.now() / 200 + idx + i) * (idx * 2 * laziness);
            path += ` L ${point.x + waveX} ${point.y + waveY}`;
        });
        return path;
    });

    setTendrils(newPaths);
  });

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full bg-[#050505] overflow-hidden flex items-center justify-center cursor-none"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="text-center pointer-events-none select-none opacity-10">
        <h4 className="text-7xl font-black italic tracking-tighter text-white uppercase">JELLYFISH</h4>
        <p className="mono text-[10px] text-neutral-700 mt-4 uppercase tracking-[0.6em]">Viscous_Pointer_Logic</p>
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {tendrils.map((d, i) => (
          <path 
            key={i}
            d={d} 
            fill="none" 
            stroke={i === 0 ? "#8b5cf6" : i === 1 ? "#3b82f6" : "#06b6d4"} 
            strokeWidth={4 - i} 
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-40"
          />
        ))}
      </svg>

      {/* Head Entity */}
      <motion.div
        style={{ x: mouseX, y: mouseY, left: -8, top: -8 }}
        className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,0.4)] z-50 pointer-events-none flex items-center justify-center"
      >
        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
      </motion.div>

      <div className="absolute bottom-8 right-8 mono text-[9px] text-neutral-800 uppercase tracking-widest">
        Medium: High_Viscosity_Fluid // Render: Procedural_Path
      </div>
    </div>
  );
};

export default ElasticTendrilCursorDemo;
