
import React, { useState, useRef, useEffect } from 'react';
import { motion, useTime, useTransform, useMotionValue, useSpring } from 'framer-motion';

const OrbitNexusDemo = () => {
  const items = [
    { label: 'ALPHA', color: '#06b6d4' },
    { label: 'BETA', color: '#3b82f6' },
    { label: 'GAMMA', color: '#6366f1' },
    { label: 'DELTA', color: '#8b5cf6' }
  ];

  // Global state to slow down time when the user is trying to "catch" a node
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const orbitSpeed = useMotionValue(1);
  const smoothSpeed = useSpring(orbitSpeed, { stiffness: 50, damping: 20 });

  useEffect(() => {
    orbitSpeed.set(isAnyHovered ? 0.05 : 1);
  }, [isAnyHovered]);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center bg-neutral-950 overflow-hidden">
      {/* Central Core Signal */}
      <motion.div 
        animate={{ 
          scale: isAnyHovered ? 1.2 : 1,
          opacity: isAnyHovered ? 0.8 : 0.3
        }}
        className="w-12 h-12 bg-white rounded-full blur-2xl relative z-0"
      />
      
      {/* Orbital Rings - Visual Guides */}
      <div className="absolute w-[320px] h-[320px] border border-white/5 rounded-full pointer-events-none" />
      <div className="absolute w-[100px] h-[100px] border border-white/5 rounded-full pointer-events-none opacity-20" />

      {items.map((item, i) => (
        <OrbitItem 
          key={item.label} 
          item={item} 
          index={i} 
          total={items.length} 
          globalSpeed={smoothSpeed}
          onHoverChange={setIsAnyHovered}
        />
      ))}

      <div className="absolute bottom-8 left-8 mono text-[9px] text-neutral-700 uppercase tracking-[0.4em]">
        Status: {isAnyHovered ? 'TEMPORAL_LOCK_ACTIVE' : 'ORBITAL_FREEFLOW'}
      </div>
    </div>
  );
};

interface OrbitItemProps {
  item: any;
  index: number;
  total: number;
  globalSpeed: any;
  onHoverChange: (hovered: boolean) => void;
}

const OrbitItem: React.FC<OrbitItemProps> = ({ item, index, total, globalSpeed, onHoverChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const time = useTime();
  
  // Accumulated rotation to allow for variable speed without "jumping"
  const accumulatedRotation = useMotionValue(0);
  
  useEffect(() => {
    let lastTime = performance.now();
    const update = (now: number) => {
      const deltaTime = now - lastTime;
      const speed = globalSpeed.get();
      // Only increment rotation if not individually hovered
      if (!isHovered) {
        accumulatedRotation.set(accumulatedRotation.get() + (deltaTime * 0.0005 * speed));
      }
      lastTime = now;
      requestAnimationFrame(update);
    };
    const raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [isHovered, globalSpeed]);

  const radius = 160;
  const initialAngle = (index / total) * Math.PI * 2;

  // Derive X and Y from the accumulated rotation
  const x = useTransform(accumulatedRotation, (val) => {
    return Math.cos(val + initialAngle) * radius;
  });

  const y = useTransform(accumulatedRotation, (val) => {
    return Math.sin(val + initialAngle) * radius;
  });

  return (
    <motion.div
      onMouseEnter={() => {
        setIsHovered(true);
        onHoverChange(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHoverChange(false);
      }}
      style={{ x, y }}
      animate={{
        scale: isHovered ? 1.8 : 1,
        zIndex: isHovered ? 50 : 10
      }}
      className="absolute cursor-pointer flex flex-col items-center group"
    >
      {/* Target Marker */}
      <div 
        className="w-5 h-5 rounded-full border-2 border-white transition-all duration-500 shadow-2xl flex items-center justify-center relative"
        style={{ 
          borderColor: item.color,
          backgroundColor: isHovered ? item.color : 'transparent' 
        }}
      >
        {isHovered && (
          <motion.div 
            layoutId="active-glow"
            className="absolute -inset-4 bg-white/20 blur-xl rounded-full"
          />
        )}
      </div>

      <motion.div 
        animate={{ 
          opacity: isHovered ? 1 : 0.4,
          y: isHovered ? 10 : 0
        }}
        className="mt-2 text-center"
      >
        <span className="mono text-[10px] font-black tracking-widest text-white block uppercase">
          {item.label}
        </span>
        {isHovered && (
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="mono text-[7px] text-cyan-500 font-bold"
          >
            SELECT_NODE
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
};

export default OrbitNexusDemo;
