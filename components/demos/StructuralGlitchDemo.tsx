import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StructuralGlitchDemo = () => {
  const [isGlitching, setIsGlitching] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
      className="w-full h-full flex flex-col items-center justify-center bg-neutral-950 p-12 gap-12 overflow-hidden relative cursor-help"
    >
      <div className="text-center">
        <h4 className="text-3xl font-black italic tracking-tighter uppercase">Abstraction_Leak</h4>
        <p className="mono text-[9px] text-neutral-600 mt-2 uppercase tracking-widest italic">Hover_to_Decompile</p>
      </div>

      <div className="grid grid-cols-2 gap-8 w-full max-w-xl perspective-[1000px]">
        {[...Array(4)].map((_, i) => (
          <GlitchCard key={i} index={i} isGlitching={isGlitching} />
        ))}
      </div>

      {/* Global Glitch Overlay */}
      <AnimatePresence>
        {isGlitching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0, 0.05, 0] }}
            transition={{ duration: 0.2, repeat: Infinity }}
            className="absolute inset-0 bg-cyan-500 pointer-events-none mix-blend-overlay"
          />
        )}
      </AnimatePresence>

      <div className="absolute bottom-8 right-8 text-right max-w-[200px]">
        <p className="mono text-[8px] text-neutral-700 leading-tight uppercase">
          Revealing internal Z-index stratification and element class declarations via intentional rendering flaws.
        </p>
      </div>
    </div>
  );
};

const GlitchCard = ({ index, isGlitching }: any) => {
  return (
    <motion.div
      animate={{ 
        rotateX: isGlitching ? 25 : 0,
        rotateY: isGlitching ? -15 : 0,
        translateZ: isGlitching ? index * 20 : 0,
        backgroundColor: isGlitching ? 'rgba(0,0,0,1)' : 'rgba(23,23,23,1)'
      }}
      className={`h-40 border-2 rounded-2xl p-6 relative transition-all duration-500 ${
        isGlitching ? 'border-cyan-500/50' : 'border-white/5'
      }`}
    >
      <div className="relative z-10">
         <h5 className={`font-black tracking-tighter transition-colors ${isGlitching ? 'text-cyan-500' : 'text-white'}`}>MOD_0{index}</h5>
         <div className="h-1 w-8 bg-neutral-800 mt-2" />
      </div>

      <AnimatePresence>
        {isGlitching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 p-4 font-mono text-[7px] text-cyan-800 overflow-hidden leading-tight select-none pointer-events-none"
          >
            <div className="border border-cyan-900 absolute inset-2" />
            &lt;div class="node_layer_{index}"&gt;<br />
            &nbsp;&nbsp;style="transform: matrix3d(...)"<br />
            &nbsp;&nbsp;z-index: {100 - index}<br />
            &nbsp;&nbsp;ref: {Math.random().toString(36).substring(7)}<br />
            &lt;/div&gt;
            <div className="absolute bottom-4 right-4 text-[10px] font-black opacity-40">L_0{index}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isGlitching && (
        <div className="absolute bottom-6 right-6 w-8 h-8 bg-white/5 rounded-full blur-xl" />
      )}
    </motion.div>
  );
};

export default StructuralGlitchDemo;
