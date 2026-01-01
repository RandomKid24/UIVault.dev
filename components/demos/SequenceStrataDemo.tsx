import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SequenceStrataDemo = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const items = [
    { title: 'CORE_LAYER', desc: 'Base logic strata for system boot.' },
    { title: 'SIGNAL_FLOW', desc: 'Inertia-mapped binary packet streams.' },
    { title: 'VECT_ARRAYS', desc: 'Multi-dimensional geometry shaders.' },
    { title: 'VOID_EXCEPT', desc: 'Error handling via entropy reversal.' }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-900 gap-12">
      <div className="text-center z-10">
        <h4 className="text-4xl font-black italic tracking-tighter uppercase text-white">List_Slicing</h4>
        <p className="mono text-[9px] text-cyan-500 mt-2 uppercase tracking-[0.5em]">Z-Stratified_Sequence</p>
      </div>

      <div className="relative w-80 h-96 flex flex-col items-center justify-center perspective-[1000px]">
        {items.map((item, i) => {
          const isHovered = hoveredIndex === i;
          const isAbove = hoveredIndex !== null && i < hoveredIndex;
          
          return (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                y: isAbove ? -100 : 0,
                translateZ: isHovered ? 50 : -i * 20,
                opacity: hoveredIndex === null || isHovered ? 1 : 0.2,
                scale: isHovered ? 1.05 : 1 - i * 0.05,
                rotateX: isHovered ? 0 : 25
              }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              className="absolute w-full h-40 bg-black border-2 border-white/10 rounded-2xl p-8 flex flex-col justify-center cursor-pointer shadow-2xl"
              style={{ zIndex: items.length - i }}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="mono text-[8px] text-cyan-500 font-bold uppercase tracking-widest">LAYER_0{i}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </div>
              <h3 className="text-3xl font-black italic tracking-tighter text-white uppercase">{item.title}</h3>
              <p className="text-[10px] text-neutral-500 mono mt-2">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-700 uppercase">
        LIST ITEMS OCCUPY INDEPENDENT STRATA IN THE Z-AXIS. INTERACTION SLICES THE DEPTH BUFFER TO BRING FRAGMENTED DATA INTO FOCUS.
      </div>
    </div>
  );
};

export default SequenceStrataDemo;