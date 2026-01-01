
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useVelocity } from 'framer-motion';

const ImpatienceEngineDemo = () => {
  const [jitterScore, setJitterScore] = useState(0);
  const [isZenMode, setIsZenMode] = useState(false);
  const clickBuffer = useRef<number[]>([]);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const velocity = useVelocity(mouseX);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const dist = Math.sqrt(
        Math.pow(e.clientX - lastMousePos.current.x, 2) + 
        Math.pow(e.clientY - lastMousePos.current.y, 2)
      );
      
      // If moving small distances very fast, it's jitter
      if (dist < 50 && Math.abs(velocity.get()) > 1000) {
        setJitterScore(prev => Math.min(1, prev + 0.05));
      }
      
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      mouseX.set(e.clientX);
    };

    const handleClick = () => {
      const now = Date.now();
      clickBuffer.current = [...clickBuffer.current.slice(-5), now];
      
      // 5 clicks in < 1 second = impatient
      if (clickBuffer.current.length === 6 && now - clickBuffer.current[0] < 1000) {
        setJitterScore(1);
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('click', handleClick);
    };
  }, [velocity]);

  useEffect(() => {
    if (jitterScore > 0.8) setIsZenMode(true);
    
    const decay = setInterval(() => {
      setJitterScore(prev => Math.max(0, prev - 0.02));
      if (jitterScore < 0.2) setIsZenMode(false);
    }, 100);
    
    return () => clearInterval(decay);
  }, [jitterScore]);

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center p-12 transition-all duration-1000 ${isZenMode ? 'bg-neutral-950 scale-105' : 'bg-neutral-900/40'}`}>
      <div className="absolute top-12 flex items-center gap-4 mono text-[10px]">
         <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div animate={{ width: `${jitterScore * 100}%` }} className="h-full bg-rose-500" />
         </div>
         <span className="text-neutral-500 uppercase tracking-widest">Impatience_Threshold</span>
      </div>

      <div className="relative w-full max-w-xl">
        <AnimatePresence mode="wait">
          {!isZenMode ? (
            <motion.div
              key="busy"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              className="grid grid-cols-2 gap-8"
            >
               {[...Array(4)].map((_, i) => (
                 <div key={i} className="p-8 border border-white/5 bg-neutral-900/40 rounded-2xl space-y-4">
                    <div className="h-4 w-1/2 bg-white/10" />
                    <div className="h-2 w-full bg-white/5" />
                    <div className="h-2 w-2/3 bg-white/5" />
                    <div className="flex gap-2 pt-4">
                       <div className="h-8 w-24 bg-cyan-500/10 border border-cyan-500/20" />
                       <div className="h-8 w-8 bg-white/5" />
                    </div>
                 </div>
               ))}
            </motion.div>
          ) : (
            <motion.div
              key="zen"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-8"
            >
               <h3 className="text-9xl font-black italic tracking-tighter opacity-10">ZEN_MODE</h3>
               <div className="p-12 border-4 border-cyan-500 bg-cyan-500 text-black font-black text-4xl italic uppercase">
                  Proceed_Quickly
               </div>
               <p className="mono text-[10px] text-cyan-500 tracking-[0.5em] uppercase mt-4">UI_Simplified_For_Focus</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-12 max-w-xs text-center mono text-[9px] text-neutral-600 leading-relaxed uppercase">
        Rapidly click the screen or jitter your mouse to trigger the Impatience Engine. The UI will simplify to reduce cognitive friction and accelerate interaction.
      </div>
    </div>
  );
};

export default ImpatienceEngineDemo;
