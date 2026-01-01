
import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ViscousDataFeelDemo = () => {
  const [load, setLoad] = useState(0.5); // 0 to 1
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Interaction "weight" changes based on load. 
  // Fix: stiffness and damping must be static numbers in useSpring config, not MotionValues. 
  // We use the state 'load' to derive these values directly.
  const stiffness = 500 - (load * 480);
  const damping = 20 + (load * 30);
  
  const springX = useSpring(x, { 
    stiffness,
    damping
  });
  
  const springY = useSpring(y, { 
    stiffness,
    damping
  });

  const dragProgress = useTransform(x, [-150, 150], [0, 1]);
  // Fix: dragElastic expects a number, not a MotionValue. Deriving from load state.
  const dragElastic = 0.1 - (load * 0.08);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-950 p-12 gap-20 overflow-hidden relative">
      <div className="text-center z-10 space-y-2">
        <h4 className="text-3xl font-black italic tracking-tighter text-white">VISCOUS_LOAD</h4>
        <p className="mono text-[10px] text-neutral-600 uppercase tracking-widest">Complexity: {(load * 100).toFixed(0)}%</p>
      </div>

      <div className="relative w-full h-64 flex items-center justify-center">
        <motion.div
          drag
          dragConstraints={{ left: -200, right: 200, top: -100, bottom: 100 }}
          dragElastic={dragElastic}
          onDrag={(_, info) => {
            x.set(info.offset.x);
            y.set(info.offset.y);
          }}
          onDragEnd={() => { x.set(0); y.set(0); }}
          style={{ x: springX, y: springY }}
          className="w-40 h-40 bg-white/5 border-4 border-white rounded-3xl flex items-center justify-center cursor-grab active:cursor-grabbing relative"
        >
          <div className="text-center">
             <div className="text-xs mono font-black opacity-40 uppercase mb-2">Drag_Weight</div>
             <motion.div 
               animate={{ opacity: [0.2, 0.5, 0.2] }} 
               transition={{ duration: 2, repeat: Infinity }}
               className="w-1 h-8 bg-cyan-500 mx-auto" 
             />
          </div>

          {/* Liquid Trailing Effect Hint */}
          <motion.div 
            style={{ opacity: load }}
            className="absolute inset-0 bg-cyan-500/10 blur-xl pointer-events-none" 
          />
        </motion.div>

        {/* Resistance Field Visualization */}
        <div className="absolute inset-0 border border-dashed border-white/5 rounded-full pointer-events-none opacity-20" />
      </div>

      <div className="w-full max-w-sm flex flex-col gap-4">
        <input 
          type="range" min="0" max="1" step="0.01" 
          value={load} 
          onChange={(e) => setLoad(parseFloat(e.target.value))}
          className="w-full accent-white h-2 bg-white/5 rounded-full appearance-none cursor-pointer"
        />
        <div className="flex justify-between mono text-[8px] text-neutral-600 uppercase tracking-[0.4em]">
          <span>Air_Friction</span>
          <span>Liquid_Mass</span>
        </div>
      </div>

      <div className="max-w-sm text-center mono text-[9px] text-neutral-700 leading-relaxed uppercase">
        DATA DENSITY IS COMMUNICATED THROUGH THE FRICTION OF THE INTERFACE. COMPLEX SYSTEMS RESIST MOVEMENT; SIMPLE SYSTEMS GLIDE.
      </div>
    </div>
  );
};

export default ViscousDataFeelDemo;
