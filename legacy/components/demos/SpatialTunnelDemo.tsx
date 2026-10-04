
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const SpatialTunnelDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const layers = [
    { title: 'ORIGIN', color: 'rgba(6, 182, 212, 0.4)', depth: 0 },
    { title: 'STRATA', color: 'rgba(59, 130, 246, 0.4)', depth: 1 },
    { title: 'KINETIC', color: 'rgba(99, 102, 241, 0.4)', depth: 2 },
    { title: 'ETHER', color: 'rgba(139, 92, 246, 0.4)', depth: 3 }
  ];

  return (
    <div className="relative w-full h-[500px] bg-neutral-950 flex items-center justify-center perspective-[1000px] overflow-hidden rounded-2xl">
      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-auto scrollbar-hide snap-y snap-mandatory"
      >
        <div className="h-[400%]">
          {layers.map((layer, i) => (
            <Layer 
              key={layer.title} 
              layer={layer} 
              index={i} 
              progress={scrollYProgress} 
            />
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-8 right-8 mono text-[9px] text-neutral-600">
        Z_DEPTH_MODULATION: ACTIVE
      </div>
    </div>
  );
};

const Layer: React.FC<{ layer: any; index: number; progress: any }> = ({ layer, index, progress }) => {
  const start = index * 0.25;
  const end = (index + 1) * 0.25;
  
  const scale = useTransform(progress, [start - 0.2, start, end, end + 0.2], [0, 1, 4, 10]);
  const opacity = useTransform(progress, [start - 0.1, start, end, end + 0.1], [0, 1, 0.2, 0]);
  const blur = useTransform(progress, [start, end], ["0px", "20px"]);

  const springScale = useSpring(scale, { stiffness: 100, damping: 20 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });
  const filterVal = useTransform(blur, (v) => `blur(${v})`);

  return (
    <motion.div
      style={{ 
        scale: springScale, 
        opacity: springOpacity,
        filter: filterVal
      }}
      className="sticky top-0 w-full h-screen flex items-center justify-center pointer-events-none"
    >
      <div 
        className="w-[80%] aspect-video border border-white/10 flex items-center justify-center rounded-3xl overflow-hidden backdrop-blur-sm"
        style={{ background: `radial-gradient(circle at center, ${layer.color}, transparent)` }}
      >
        <div className="text-center">
          <span className="mono text-[10px] tracking-[0.5em] text-white/40 block mb-4 uppercase">Layer_{index}</span>
          <h2 className="text-8xl font-black tracking-tighter text-white">{layer.title}</h2>
        </div>
      </div>
    </motion.div>
  );
};

export default SpatialTunnelDemo;
