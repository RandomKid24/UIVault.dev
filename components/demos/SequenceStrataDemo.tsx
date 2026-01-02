
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

      {/* PERSPECTIVE STAGE */}
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
                y: isAbove ? -320 : 0,
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
              className="absolute w-full h-64 bg-neutral-950 border-2 border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between cursor-pointer shadow-[0_50px_100px_rgba(0,0,0,0.5)] origin-top transform-gpu"
              style={{ 
                zIndex: items.length - i,
                boxShadow: isHovered ? `0 20px 50px -10px ${item.color}44` : 'none'
              }}
            >
              {/* HEADER: Precise Circle Alignment */}
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1.5">
                  <span className="mono text-[8px] font-black uppercase tracking-widest leading-none" style={{ color: item.color }}>STRATA_NODE_0{i}</span>
                  <div className="w-10 h-[2px] bg-white/10 rounded-full" />
                </div>
                {/* Fixed: Status circle alignment within its own container */}
                <div className="relative w-3 h-3 flex items-center justify-center">
                   <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isHovered ? 'animate-pulse' : ''}`} style={{ backgroundColor: item.color }} />
                   {isHovered && (
                     <motion.div 
                        layoutId={`ping-${i}`}
                        className="absolute inset-0 rounded-full border border-cyan-500 animate-ping opacity-40" 
                     />
                   )}
                </div>
              </div>

              {/* BODY CONTENT */}
              <div className="space-y-3">
                <h3 className="text-3xl font-black italic tracking-tighter text-white uppercase leading-none">{item.title}</h3>
                <p className="text-[11px] text-neutral-500 mono uppercase tracking-tight leading-relaxed max-w-[90%]">
                  {item.desc}
                </p>
              </div>

              {/* FOOTER: Technical Circles Grid */}
              <div className="flex justify-between items-center pt-6 border-t border-white/5">
                 <div className="mono text-[7px] text-neutral-700 font-bold uppercase tracking-widest">Depth_Vect: -{i * 40}px</div>
                 
                 {/* Fixed: Unique perfectly aligned technical circles */}
                 <div className="flex gap-1.5">
                    {[...Array(3)].map((_, j) => (
                      <div 
                        key={j} 
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                          isHovered && j <= i ? 'bg-cyan-500' : 'bg-white/5'
                        }`} 
                      />
                    ))}
                 </div>
              </div>

              {/* Surface Reflection Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none rounded-[2.5rem]" />
            </motion.div>
          );
        })}
      </div>

      {/* INSTRUCTIONAL FOOTER */}
      <div className="max-w-sm text-center space-y-4">
        <div className="flex justify-center gap-4 opacity-20">
           {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-1 bg-white rounded-full" />)}
        </div>
        <p className="mono text-[9px] text-neutral-700 leading-relaxed uppercase tracking-[0.2em]">
          HOVER OVER A CARD TO "LIFT" THE STRATA. LAYERS ABOVE THE FOCUS POINT ARE TEMPORARILY DISPLACED TO REVEAL DEEP-STACK LOGIC.
        </p>
      </div>
    </div>
  );
};

export default SequenceStrataDemo;
