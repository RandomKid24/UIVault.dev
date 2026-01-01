import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const RefractiveImageDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(200);
  const mouseY = useMotionValue(250);
  const [isHovered, setIsHovered] = useState(false);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[500px] bg-neutral-950 flex items-center justify-center overflow-hidden cursor-crosshair rounded-3xl"
    >
      <div className="relative w-80 h-96 overflow-hidden border border-white/10 rounded-2xl group">
        {/* The Base Image */}
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" 
          alt="Refractive texture"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale opacity-60"
        />

        {/* Refractive Lens Layer */}
        <motion.div
          style={{
            x: useTransform(springX, (v) => v - 400),
            y: useTransform(springY, (v) => v - 480),
            scale: isHovered ? 1.5 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          className="absolute inset-0 pointer-events-none z-20"
        >
          <div className="w-80 h-80 rounded-full border-4 border-white/20 backdrop-blur-2xl overflow-hidden flex items-center justify-center shadow-2xl">
             <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" 
              alt="Magnified"
              className="w-96 h-96 object-cover scale-[1.4] transition-all duration-300 contrast-125 saturate-150"
             />
             {/* Chromatic Fringe */}
             <div className="absolute inset-0 border-4 border-rose-500/20 blur-sm rounded-full" />
             <div className="absolute inset-0 border-4 border-cyan-500/20 blur-md rounded-full translate-x-1" />
          </div>
        </motion.div>

        <div className="absolute bottom-6 left-6 z-30 pointer-events-none">
           <h5 className="text-xl font-black italic text-white drop-shadow-2xl uppercase">Refractive_Media</h5>
           <p className="mono text-[8px] text-cyan-400 font-bold tracking-[0.4em] uppercase mt-1">Liquid_Lens_v9.0</p>
        </div>
      </div>

      <div className="absolute top-8 left-8 mono text-[9px] text-neutral-700 tracking-widest uppercase">
        Media_Focus: Dynamic // Refraction: Active
      </div>
    </div>
  );
};

export default RefractiveImageDemo;