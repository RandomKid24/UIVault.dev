
import React, { useState } from 'react';
import { motion, useTime, useTransform } from 'framer-motion';

const OrbitNexusDemo = () => {
  const items = [
    { label: 'ALPHA', color: '#06b6d4' },
    { label: 'BETA', color: '#3b82f6' },
    { label: 'GAMMA', color: '#6366f1' },
    { label: 'DELTA', color: '#8b5cf6' }
  ];

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Central Core */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="w-12 h-12 bg-white rounded-full blur-xl"
      />
      
      {/* Orbital Rings */}
      <div className="absolute inset-0 border border-white/5 rounded-full scale-[0.4]" />
      <div className="absolute inset-0 border border-white/5 rounded-full scale-[0.7]" />

      {items.map((item, i) => (
        <OrbitItem key={item.label} item={item} index={i} total={items.length} />
      ))}
    </div>
  );
};

// Fix: Explicitly typing as React.FC to handle React-reserved 'key' prop correctly in the type system
const OrbitItem: React.FC<{ item: any; index: number; total: number }> = ({ item, index, total }) => {
  const [isHovered, setIsHovered] = useState(false);
  const time = useTime();
  
  // Create circular path
  const radius = 160;
  const initialAngle = (index / total) * Math.PI * 2;
  
  const rotate = useTransform(time, [0, 10000], [0, Math.PI * 2], {
    clamp: false
  });

  const x = useTransform(rotate, (val) => {
    if (isHovered) return 0;
    return Math.cos(val + initialAngle) * radius;
  });

  const y = useTransform(rotate, (val) => {
    if (isHovered) return 0;
    return Math.sin(val + initialAngle) * radius;
  });

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ x, y }}
      animate={{
        scale: isHovered ? 1.5 : 1,
        zIndex: isHovered ? 50 : 10
      }}
      className="absolute cursor-pointer flex flex-col items-center group"
    >
      <div 
        className="w-4 h-4 rounded-full border-2 border-white transition-all group-hover:bg-white"
        style={{ borderColor: item.color }}
      />
      <motion.span 
        animate={{ opacity: isHovered ? 1 : 0.4 }}
        className="mt-2 mono text-[10px] font-bold tracking-widest text-white"
      >
        {item.label}
      </motion.span>
    </motion.div>
  );
};

export default OrbitNexusDemo;
