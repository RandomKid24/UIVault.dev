import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const SpatialStrataDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const layers = [
    { z: -150, color: 'rgba(255,255,255,0.02)', label: 'BACKGROUND_STRATA', size: '120%' },
    { z: -50, color: 'rgba(6,182,212,0.05)', label: 'DATA_VOID', size: '100%' },
    { z: 50, color: 'rgba(255,255,255,0.05)', label: 'LOGIC_SURFACE', size: '80%' },
    { z: 150, color: 'rgba(6,182,212,0.2)', label: 'INTENT_LAYER', size: '60%' }
  ];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full h-full flex items-center justify-center bg-neutral-950 overflow-hidden perspective-[1000px]"
    >
      <div className="relative w-full h-full flex items-center justify-center transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
        {layers.map((layer, i) => (
          <StrataLayer 
            key={i} 
            layer={layer} 
            mouseX={mouseX} 
            mouseY={mouseY} 
          />
        ))}
      </div>
      
      <div className="absolute top-8 left-8 mono text-[9px] text-neutral-600 uppercase tracking-widest">
        Z-Buffer_Separation: {layers.length} Layers
      </div>
    </div>
  );
};

const StrataLayer = ({ layer, mouseX, mouseY }: any) => {
  const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [layer.z * -0.5, layer.z * 0.5]), { stiffness: 100, damping: 20 });
  const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [layer.z * -0.5, layer.z * 0.5]), { stiffness: 100, damping: 20 });

  return (
    <motion.div
      style={{ 
        x, y, 
        translateZ: layer.z,
        width: layer.size,
        height: layer.size,
        backgroundColor: layer.color
      }}
      className="absolute border border-white/5 rounded-3xl flex flex-col items-center justify-center backdrop-blur-[2px]"
    >
      <div className="mono text-[8px] text-neutral-500 mb-2 opacity-40">{layer.label}</div>
      <div className="w-1/4 h-[1px] bg-white/10" />
    </motion.div>
  );
};

export default SpatialStrataDemo;
