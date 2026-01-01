
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CommitmentShardDemo = () => {
  const [isCommitted, setIsCommitted] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-950 overflow-hidden relative">
      <AnimatePresence mode="wait">
        {!isCommitted ? (
          <motion.div
            key="pre"
            exit={{ 
              scale: 2, 
              opacity: 0, 
              filter: 'blur(40px)',
              transition: { duration: 0.8, ease: "circIn" } 
            }}
            className="flex flex-col items-center gap-12"
          >
            <div className="text-center">
              <h4 className="text-4xl font-black italic tracking-tighter">COMMITMENT_REQ</h4>
              <p className="mono text-[10px] text-neutral-600 mt-2">DRAG_TO_SOLIDIFY_CHOICE</p>
            </div>

            <div className="relative w-80 h-20 bg-neutral-900 border border-white/5 rounded-full p-2 flex items-center">
               <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 240 }}
                dragElastic={0.1}
                onDrag={(_, info) => setDragProgress(info.offset.x / 240)}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 230) setIsCommitted(true);
                  else setDragProgress(0);
                }}
                className="w-16 h-16 bg-white rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center relative z-10 shadow-2xl"
               >
                 <div className="w-2 h-2 bg-black rounded-full" />
               </motion.div>
               
               <div className="absolute right-8 mono text-[10px] text-neutral-800 tracking-widest font-bold">
                 FINALIZE
               </div>

               {/* Tension Bar */}
               <motion.div 
                 style={{ scaleX: dragProgress }}
                 className="absolute inset-y-0 left-0 bg-cyan-500 rounded-full origin-left opacity-20 pointer-events-none"
               />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="post"
            initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            className="flex flex-col items-center"
          >
            <div className="relative p-16 border-8 border-white bg-white text-black text-center">
               <h3 className="text-8xl font-black italic tracking-tighter leading-none">COMMITTED</h3>
               <div className="h-2 w-full bg-black mt-6" />
               <p className="mono text-[11px] font-bold mt-8 tracking-[0.6em] uppercase">State_Solidified_v1.0</p>
            </div>
            
            <motion.button 
              onClick={() => setIsCommitted(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 mono text-[10px] text-neutral-500 border-b border-white/10"
            >
              RESET_TEMPORAL_STATE
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shard Particles during transition */}
      <AnimatePresence>
        {dragProgress > 0.8 && !isCommitted && (
          <motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
             {[...Array(12)].map((_, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, x: 0, y: 0 }}
                 animate={{ 
                    opacity: 1, 
                    x: (Math.random() - 0.5) * 800, 
                    y: (Math.random() - 0.5) * 800,
                    rotate: Math.random() * 360
                 }}
                 className="absolute left-1/2 top-1/2 w-4 h-4 border border-cyan-500"
               />
             ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommitmentShardDemo;
