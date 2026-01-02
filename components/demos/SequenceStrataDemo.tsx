
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SequenceStrataDemo = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const items = [
    { title: 'CORE_LAYER', desc: 'Base logic strata for system boot.', color: '#06b6d4' },
    { title: 'SIGNAL_FLOW', desc: 'Inertia-mapped binary packet streams.', color: '#3b82f6' },
    { title: 'VECT_ARRAYS', desc: 'Multi-dimensional geometry shaders.', color: '#6366f1' },
    { title: 'VOID_EXCEPT', desc: 'Error handling via entropy reversal.', color: '#8b5cf6' }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-900 gap-12">
      <div className="text-center z-10">
        <h4 className="text-4xl font-black italic tracking-tighter uppercase text-white">Deep_Layer_Peel</h4>
        <p className="mono text-[9px] text-cyan-500 mt-2 uppercase tracking-[0.5em]">Z-Stratified_Navigation</p>
      </div>

      <div className="relative w-80 h-96 flex items-center justify-center perspective-[2000px]">
        {items.map((item, i) => {
          const isHovered = hoveredIndex === i;
          const isAbove = hoveredIndex !== null && i < hoveredIndex;
          const isBelow = hoveredIndex !== null && i > hoveredIndex;
          
          return (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={false}
              animate={{
                // "Peeling" back the layers above
                y: isAbove ? -300 : 0,
                // Lifting the active layer
                rotateX: isHovered ? -75 : -15, 
                translateZ: isHovered ? 150 : -i * 40,
                scale: isHovered ? 1.1 : 1 - i * 0.05,
                opacity: isAbove ? 0 : 1,
                filter: isBelow ? `blur(${ (i - (hoveredIndex || 0)) * 2 }px)` : 'blur(0px)',
              }}
              transition={{ 
                type: 'spring', 
                stiffness: 120, 
                damping: 20,
                mass: 1 
              }}
              className="absolute w-full h-56 bg-neutral-950 border-2 border-white/10 rounded-[2rem] p-8 flex flex-col justify-between cursor-pointer shadow-[0_50px_100px_rgba(0,0,0,0.5)] origin-top transform-gpu"
              style={{ 
                zIndex: items.length - i,
                boxShadow: isHovered ? `0 20px 50px -10px ${item.color}44` : 'none'
              }}
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="mono text-[8px] font-black uppercase tracking-widest" style={{ color: item.color }}>STRATA_NODE_0{i}</span>
                  <div className="w-8 h-1 bg-white/10 rounded-full" />
                </div>
                <div className={`w-2 h-2 rounded-full ${isHovered ? 'animate-ping' : ''}`} style={{ backgroundColor: item.color }} />
              </div>

              <div>
                <h3 className="text-3xl font-black italic tracking-tighter text-white uppercase leading-none mb-2">{item.title}</h3>
                <p className="text-[10px] text-neutral-500 mono uppercase tracking-tight leading-relaxed max-w-[80%]">
                  {item.desc}
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                 <div className="mono text-[7px] text-neutral-700 font-bold uppercase">Depth_Vector: -{i * 40}px</div>
                 <div className="w-10 h-0.5 bg-white/5" />
              </div>

              {/* Surface Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none rounded-[2rem]" />
            </motion.div>
          );
        })}
      </div>

      <div className="max-w-sm text-center mono text-[9px] text-neutral-700 leading-relaxed uppercase tracking-wider">
        HOVER OVER A CARD TO "LIFT" THE STRATA. LAYERS ABOVE THE FOCUS POINT ARE TEMPORARILY DISPLACED TO REVEAL DEEP-STACK LOGIC.
      </div>
    </div>
  );
};

export default SequenceStrataDemo;
