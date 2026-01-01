
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SequenceStrataDemo = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const items = [
    { title: 'VOID_ENTRY', desc: 'Base logic strata for system boot.', flux: '0x3F2A' },
    { title: 'KINETIC_FLOW', desc: 'Inertia-mapped binary packet streams.', flux: '0x9E11' },
    { title: 'VECT_ARRAYS', desc: 'Multi-dimensional geometry shaders.', flux: '0x0A2B' },
    { title: 'STRATA_CORE', desc: 'Error handling via entropy reversal.', flux: '0xFF00' }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-[#020202] gap-12 overflow-hidden relative perspective-[1500px]">
      {/* Background HUD Decor */}
      <div className="absolute top-12 left-12 flex flex-col gap-2 mono text-[9px] text-neutral-800 pointer-events-none uppercase">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 bg-cyan-500/20 rounded-full" />
           <span>Strata_Buffer_Active</span>
        </div>
        <div className="w-32 h-[1px] bg-neutral-900" />
        <span>Slicing_Mode: Focal_Z</span>
      </div>

      <div className="relative w-96 h-96 flex flex-col items-center justify-center [transform-style:preserve-3d]">
        {items.map((item, i) => {
          const isHovered = hoveredIndex === i;
          const distance = hoveredIndex === null ? 0 : Math.abs(i - hoveredIndex);
          const isAbove = hoveredIndex !== null && i < hoveredIndex;
          
          return (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                y: isHovered ? 0 : (isAbove ? -120 - (distance * 10) : 120 + (distance * 10)),
                translateZ: isHovered ? 120 : (hoveredIndex === null ? -i * 40 : -100 - (distance * 40)),
                rotateX: isHovered ? 0 : 45,
                scale: isHovered ? 1.1 : 1 - (distance * 0.05),
                opacity: hoveredIndex === null || isHovered ? 1 : 0.2,
                borderColor: isHovered ? 'rgba(6, 182, 212, 0.5)' : 'rgba(255,255,255,0.05)',
                backgroundColor: isHovered ? 'rgba(5, 5, 5, 1)' : 'rgba(15, 15, 15, 0.6)'
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              className="absolute w-full h-32 border-2 rounded-2xl p-6 flex flex-col justify-between cursor-pointer shadow-2xl backdrop-blur-xl group overflow-hidden"
              style={{ zIndex: isHovered ? 100 : items.length - i }}
            >
              {/* Internal Scanline for Hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div 
                    initial={{ y: '-100%' }}
                    animate={{ y: '200%' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent pointer-events-none"
                  />
                )}
              </AnimatePresence>

              <div className="flex justify-between items-start relative z-10">
                <div className="flex flex-col">
                  <span className="mono text-[8px] text-cyan-500 font-black tracking-widest uppercase mb-1">STRATA_0{i}</span>
                  <h3 className="text-3xl font-black italic tracking-tighter text-white uppercase leading-none">{item.title}</h3>
                </div>
                <div className="mono text-[8px] px-2 py-1 bg-white/5 border border-white/10 rounded-sm text-neutral-500 font-bold">
                  {item.flux}
                </div>
              </div>

              <div className="relative z-10 flex justify-between items-end">
                <p className={`text-[10px] mono transition-colors duration-500 max-w-[200px] ${isHovered ? 'text-neutral-400' : 'text-neutral-700'}`}>
                  {item.desc}
                </p>
                <div className={`w-2 h-2 rounded-full transition-colors ${isHovered ? 'bg-cyan-500 shadow-[0_0_10px_cyan]' : 'bg-neutral-800'}`} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="absolute bottom-12 text-center max-w-xs mono text-[9px] text-neutral-700 uppercase tracking-[0.6em] animate-pulse">
        Interact_to_Slice_Strata
      </div>
    </div>
  );
};

export default SequenceStrataDemo;
