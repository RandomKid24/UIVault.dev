import React, { useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const PerspectiveFocalDemo = () => {
  const [focalIndex, setFocalIndex] = useState(1);
  
  const focalPoints = [
    { x: '20%', y: '20%' },
    { x: '50%', y: '50%' },
    { x: '80%', y: '80%' }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900/20 gap-12 p-20">
      <div className="text-center space-y-2">
        <h4 className="text-3xl font-black italic tracking-tighter">PERSPECTIVE_WARP</h4>
        <p className="mono text-[9px] text-neutral-500 uppercase tracking-widest">Vanishing_Point: Node_0{focalIndex}</p>
      </div>

      <motion.div
        animate={{ 
          perspectiveOrigin: `${focalPoints[focalIndex].x} ${focalPoints[focalIndex].y}` 
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 15 }}
        className="relative w-full h-[300px] perspective-[800px] flex items-center justify-center gap-8"
      >
        {[0, 1, 2].map((i) => (
          <motion.button
            key={i}
            onMouseEnter={() => setFocalIndex(i)}
            animate={{ 
              translateZ: focalIndex === i ? 100 : 0,
              rotateY: focalIndex === i ? 0 : (i < focalIndex ? 25 : -25),
              opacity: focalIndex === i ? 1 : 0.4
            }}
            className={`w-40 h-56 rounded-2xl border-2 flex flex-col items-center justify-center transition-colors ${
              focalIndex === i ? 'border-cyan-500 bg-neutral-900' : 'border-white/5 bg-neutral-950'
            }`}
          >
            <span className="mono text-[10px] text-neutral-600 mb-4 tracking-widest">STRATA_0{i}</span>
            <div className={`w-8 h-8 rounded-full ${focalIndex === i ? 'bg-cyan-500 shadow-[0_0_20px_cyan]' : 'bg-white/5'}`} />
          </motion.button>
        ))}
      </motion.div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-600 leading-relaxed uppercase">
        THE INTERFACE RECALCULATES ITS GLOBAL PERSPECTIVE ORIGIN BASED ON THE ELEMENT CURRENTLY OCCUPYING THE USER'S COGNITIVE FOCUS.
      </div>
    </div>
  );
};

export default PerspectiveFocalDemo;
