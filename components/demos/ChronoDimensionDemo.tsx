
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';

const ChronoDimensionDemo = ({ temporal }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const { entropy = 0 } = temporal || {};

  // Create a reactive motion value for entropy to avoid stale closures in transforms
  const entropyMV = useMotionValue(entropy);
  useEffect(() => {
    entropyMV.set(entropy);
  }, [entropy, entropyMV]);

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 15 });

  const items = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    label: `PACKET_0${i}`,
    x: (i % 5) * 100 - 200,
    y: Math.floor(i / 5) * 80 - 80,
    chaosX: (Math.random() - 0.5) * 1200,
    chaosY: (Math.random() - 0.5) * 1000,
    chaosZ: (Math.random() - 0.5) * 2000,
    chaosRot: (Math.random() - 0.5) * 1440
  }));

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#020202] overflow-hidden gap-12 relative perspective-[1500px]">
      {/* Scrollable Dimension Container */}
      <div 
        ref={containerRef}
        className="absolute inset-0 overflow-y-auto scrollbar-hide snap-y snap-mandatory z-10"
      >
        <div className="h-[500%] w-full" />
      </div>

      {/* Laboratory HUD Overlay */}
      <div className="absolute top-12 left-12 flex flex-col gap-4 mono text-[10px] z-50">
         <div className="flex items-center gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-cyan-500 font-black tracking-widest uppercase">Temporal_Buffer</span>
              <div className="w-48 h-1.5 bg-white/5 relative rounded-full overflow-hidden border border-white/5">
                 <motion.div 
                   style={{ scaleX: smoothProgress }} 
                   className="absolute inset-0 bg-cyan-500 origin-left shadow-[0_0_15px_cyan]" 
                 />
              </div>
            </div>
            <div className="text-neutral-500 flex flex-col">
              <span className="font-bold text-white uppercase tracking-tighter">Entropy_Bias</span>
              <span>{(entropy * 100).toFixed(0)}%_FLUX</span>
            </div>
         </div>
      </div>

      {/* The Dimensional Core */}
      <div className="relative w-full h-full flex items-center justify-center z-20 pointer-events-none transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
        {items.map((item) => (
          <ChronoNode 
            key={item.id} 
            item={item} 
            progress={smoothProgress} 
            entropyMV={entropyMV} 
          />
        ))}
      </div>

      {/* Decorative Grid Floor */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none opacity-20" />
      
      <div className="absolute bottom-12 text-center mono text-[9px] text-neutral-600 animate-pulse z-50 uppercase tracking-[0.8em]">
        Scrub_Y_Axis_To_Displace_State
      </div>
    </div>
  );
};

const ChronoNode = ({ item, progress, entropyMV }: any) => {
  // We combine the scroll progress and the global entropy into a single "Chaos Factor"
  // Fix: Use useTransform with multiple motion values to maintain reactivity
  const factor = useTransform([progress, entropyMV], ([p, e]: any) => {
    return Math.min(1, (p as number) + (e as number) * 0.4);
  });
  
  // Spatial transformations
  const x = useTransform(factor, [0, 1], [item.x, item.chaosX]);
  const y = useTransform(factor, [0, 1], [item.y, item.chaosY]);
  const z = useTransform(factor, [0, 1], [0, item.chaosZ]);
  const rotate = useTransform(factor, [0, 1], [0, item.chaosRot]);
  const rotateY = useTransform(factor, [0, 1], [0, 45]);
  const scale = useTransform(factor, [0, 0.8, 1], [1, 0.8, 0.1]);
  const opacity = useTransform(factor, [0, 0.2, 0.8, 1], [1, 1, 0.6, 0]);
  
  // Visual effects
  const blurValue = useTransform(factor, [0, 0.5, 1], [0, 4, 20]);
  const filterVal = useTransform(blurValue, (v) => `blur(${v}px)`);
  const shadowVal = useTransform(factor, (f: any) => `0 0 ${f * 40}px rgba(6, 182, 212, ${f * 0.5})`);

  return (
    <motion.div
      style={{ 
        x, y, 
        translateZ: z,
        rotate, 
        rotateY,
        scale, 
        opacity,
        filter: filterVal,
        boxShadow: shadowVal
      }}
      className="absolute w-32 h-16 bg-neutral-900 border-2 border-white/5 flex flex-col items-center justify-center rounded-xl backdrop-blur-xl group"
    >
      <div className="absolute top-2 left-2 w-1 h-1 bg-cyan-500 rounded-full group-hover:animate-ping" />
      <span className="mono text-[9px] font-black text-white/80 tracking-widest uppercase">{item.label}</span>
      <div className="w-12 h-0.5 bg-white/5 mt-2 rounded-full overflow-hidden">
        <motion.div 
          animate={{ x: ['-100%', '100%'] }} 
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          className="w-1/2 h-full bg-cyan-500/20" 
        />
      </div>
    </motion.div>
  );
};

export default ChronoDimensionDemo;
