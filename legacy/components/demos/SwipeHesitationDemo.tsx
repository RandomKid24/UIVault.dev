
import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const SwipeHesitationDemo = () => {
  const x = useMotionValue(0);
  const [hesitation, setHesitation] = useState(0);
  
  // Spring for the expansion effect
  const expand = useSpring(0, { stiffness: 100, damping: 20 });

  const handleDrag = (_: any, info: any) => {
    // If we're moving slowly and have traveled a bit, increase hesitation
    const velocity = Math.abs(info.velocity.x);
    const offset = Math.abs(info.offset.x);
    
    if (offset > 40 && velocity < 100) {
      setHesitation(prev => Math.min(1, prev + 0.05));
    } else if (velocity > 500) {
      setHesitation(0);
    }
  };

  const handleDragEnd = () => {
    if (hesitation < 0.8) {
      x.set(0);
      setHesitation(0);
    }
  };

  React.useEffect(() => {
    expand.set(hesitation);
  }, [hesitation, expand]);

  return (
    <div className="w-full h-full flex items-center justify-center p-8 bg-neutral-950/20">
      <div className="relative w-80">
        
        {/* The Hidden Content (Revealed on Hesitation) */}
        <motion.div 
          style={{ 
            opacity: expand,
            scale: useTransform(expand, [0, 1], [0.8, 1]),
            y: useTransform(expand, [0, 1], [20, 0])
          }}
          className="absolute -top-32 inset-x-0 h-24 bg-cyan-900/40 border border-cyan-500/30 rounded-2xl flex items-center justify-around p-4 backdrop-blur-xl z-0"
        >
          {['LOG', 'TRACE', 'PING'].map((action, i) => (
            <motion.button 
              key={action}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: hesitation > 0.8 ? 1 : 0, y: hesitation > 0.8 ? 0 : 10 }}
              transition={{ delay: i * 0.1 }}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full mono text-[9px] text-white font-bold"
            >
              {action}
            </motion.button>
          ))}
        </motion.div>

        {/* The Primary Swipe Element */}
        <motion.div
          drag="x"
          dragConstraints={{ left: -150, right: 150 }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          style={{ x }}
          className="relative z-10 w-full p-6 bg-neutral-900 border border-white/5 rounded-2xl cursor-grab active:cursor-grabbing shadow-2xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
            </div>
            <div>
              <h4 className="text-xl font-black italic tracking-tighter">DATA_STREAM_01</h4>
              <p className="mono text-[8px] text-neutral-500 tracking-widest">HESITATE_TO_EXPAND</p>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              style={{ width: useTransform(expand, [0, 1], ["0%", "100%"]) }}
              className="h-full bg-cyan-500"
            />
          </div>
        </motion.div>
        
        <div className="absolute -bottom-12 inset-x-0 text-center mono text-[9px] text-neutral-700 animate-pulse">
          SWIPE_SLOWLY_TO_REVEAL_PROTOCOLS
        </div>
      </div>
    </div>
  );
};

export default SwipeHesitationDemo;
