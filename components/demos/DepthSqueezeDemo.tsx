import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DepthSqueezeDemo = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const layers = [
    { title: 'UI_SKIN', color: 'rgba(255,255,255,0.1)', depth: 0 },
    { title: 'LOGIC_CORE', color: 'rgba(6,182,212,0.15)', depth: -80 },
    { title: 'BIO_SENSORS', color: 'rgba(59,130,246,0.1)', depth: -160 },
    { title: 'DATA_VOID', color: 'rgba(255,255,255,0.02)', depth: -240 }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-950 overflow-hidden gap-16">
      <div className="text-center space-y-2">
        <h4 className="text-3xl font-black italic tracking-tighter">DEPTH_SQUEEZE</h4>
        <p className="mono text-[9px] text-neutral-500 uppercase tracking-widest">
          Z-Axis_State: {isExpanded ? 'EXPANDED_3D' : 'FLATTENED_2D'}
        </p>
      </div>

      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative w-80 h-96 perspective-[1000px] cursor-pointer group"
      >
        <div className="relative w-full h-full transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
           {layers.map((layer, i) => (
             <motion.div
               key={i}
               animate={{ 
                 translateZ: isExpanded ? layer.depth : 0,
                 opacity: isExpanded ? 1 : (i === 0 ? 1 : 0),
                 rotateX: isExpanded ? 45 : 0,
                 rotateY: isExpanded ? -20 : 0,
                 scale: isExpanded ? 0.9 : 1
               }}
               transition={{ type: 'spring', stiffness: 100, damping: 20 }}
               className="absolute inset-0 border-2 border-white/5 rounded-[3rem] p-12 flex flex-col justify-between backdrop-blur-sm"
               style={{ backgroundColor: layer.color, transformStyle: 'preserve-3d' }}
             >
               <div className="flex justify-between items-start">
                 <span className="mono text-[8px] text-white/20 tracking-[0.4em] uppercase">Strata_{i}</span>
                 <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
               </div>

               <div className="text-center">
                 <h3 className="text-2xl font-black italic tracking-tighter text-white opacity-40 uppercase">{layer.title}</h3>
               </div>

               <div className="h-1 w-full bg-white/5 rounded-full" />
             </motion.div>
           ))}
        </div>
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-600 uppercase tracking-widest">
        Click the stack to toggle Z-axis expansion. Elements collapse into a single plane to conserve cognitive resources when idle.
      </div>
    </div>
  );
};

export default DepthSqueezeDemo;
