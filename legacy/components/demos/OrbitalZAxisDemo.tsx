
import React from 'react';
import { motion, useTime, useTransform } from 'framer-motion';

const OrbitalZAxisDemo = () => {
  const items = [
    { id: 'ALPHA', icon: 'A', color: '#06b6d4' },
    { id: 'BETA', icon: 'B', color: '#3b82f6' },
    { id: 'GAMMA', icon: 'G', color: '#6366f1' },
    { id: 'DELTA', icon: 'D', color: '#8b5cf6' },
    { id: 'EPSILON', icon: 'E', color: '#f43f5e' }
  ];

  return (
    <div className="relative w-full h-[500px] bg-neutral-950 flex items-center justify-center overflow-hidden perspective-[1200px]">
      {/* Center Observer Point */}
      <div className="w-2 h-2 bg-white rounded-full blur-sm opacity-20" />
      
      {/* Orbital Path Indicator */}
      <div className="absolute w-[500px] h-[500px] border border-white/5 rounded-full [transform:rotateX(75deg)] pointer-events-none" />

      <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
        {items.map((item, i) => (
          <OrbitalItem key={item.id} item={item} index={i} total={items.length} />
        ))}
      </div>

      <div className="absolute top-12 left-12 mono text-[10px] text-neutral-700 tracking-widest uppercase">
        Coordinate_Mapping: 3D_Orbital_Array
      </div>
    </div>
  );
};

const OrbitalItem = ({ item, index, total }: any) => {
  const time = useTime();
  const angleOffset = (index / total) * Math.PI * 2;
  
  const rotation = useTransform(time, [0, 8000], [0, Math.PI * 2], { clamp: false });
  
  const x = useTransform(rotation, (r) => Math.sin(r + angleOffset) * 220);
  const z = useTransform(rotation, (r) => Math.cos(r + angleOffset) * 220);
  
  const zIndex = useTransform(z, [-220, 220], [0, 100]);
  const scale = useTransform(z, [-220, 220], [0.7, 1.2]);
  const opacity = useTransform(z, [-220, -100, 220], [0.2, 0.5, 1]);
  const blurValue = useTransform(z, [-220, 0, 220], ["8px", "2px", "0px"]);
  const filterVal = useTransform(blurValue, (v) => `blur(${v})`);
  const glowOpacity = useTransform(z, [0, 220], [0, 0.2]);

  return (
    <motion.div
      style={{ 
        x, 
        translateZ: z, 
        zIndex, 
        scale, 
        opacity,
        filter: filterVal
      }}
      className="absolute cursor-pointer group"
    >
      <div 
        className="w-20 h-20 bg-neutral-900 border-2 rounded-2xl flex flex-col items-center justify-center gap-2 group-hover:border-white transition-colors"
        style={{ borderColor: item.color }}
      >
        <span className="text-2xl font-black italic tracking-tighter text-white">{item.icon}</span>
        <span className="mono text-[7px] text-neutral-600 font-bold uppercase tracking-widest">{item.id}</span>
      </div>
      
      {/* Dynamic spatial glow */}
      <motion.div 
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 bg-white rounded-2xl blur-2xl pointer-events-none"
      />
    </motion.div>
  );
};

export default OrbitalZAxisDemo;
