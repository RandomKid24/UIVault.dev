
import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const IndecisionSyncDemo = () => {
  const [waverScore, setWaverScore] = useState(0);
  const lastTarget = useRef<number | null>(null);
  const switchCount = useRef(0);
  const lastSwitchTime = useRef(Date.now());

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });

  const handleHover = (target: number) => {
    const now = Date.now();
    if (lastTarget.current !== null && lastTarget.current !== target) {
      const timeDiff = now - lastSwitchTime.current;
      if (timeDiff < 600) {
        switchCount.current += 1;
        setWaverScore(Math.min(1, switchCount.current * 0.2));
      }
      lastSwitchTime.current = now;
    }
    lastTarget.current = target;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastSwitchTime.current > 1000) {
        switchCount.current = Math.max(0, switchCount.current - 0.5);
        setWaverScore(prev => Math.max(0, prev - 0.05));
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-950/40 gap-16">
      <div className="text-center space-y-2">
        <h4 className="text-3xl font-black italic tracking-tighter">INDECISION_SYNC</h4>
        <p className="mono text-[9px] text-neutral-500 uppercase tracking-widest">Waver_Score: {(waverScore * 100).toFixed(0)}%</p>
      </div>

      <div className="flex gap-20 relative">
        {/* Choice A */}
        <motion.div
          onMouseEnter={() => handleHover(0)}
          animate={{
            x: waverScore * (Math.random() - 0.5) * 10,
            y: waverScore * (Math.random() - 0.5) * 10,
            scale: 1 + waverScore * 0.1,
            borderColor: waverScore > 0.5 ? 'rgba(6, 182, 212, 1)' : 'rgba(255,255,255,0.1)'
          }}
          className="w-48 h-64 bg-neutral-900 border-2 rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden p-8 transition-colors group"
        >
          <div className="text-4xl font-black italic tracking-tighter mb-4 opacity-40 group-hover:opacity-100">NODE_A</div>
          <div className="w-full h-1 bg-white/5 relative overflow-hidden">
             <motion.div 
              animate={{ x: waverScore > 0.4 ? ['-100%', '100%'] : '-100%' }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="absolute inset-y-0 left-0 bg-cyan-500 w-full" 
             />
          </div>
        </motion.div>

        {/* Choice B */}
        <motion.div
          onMouseEnter={() => handleHover(1)}
          animate={{
            x: waverScore * (Math.random() - 0.5) * -10,
            y: waverScore * (Math.random() - 0.5) * -10,
            scale: 1 + waverScore * 0.1,
            borderColor: waverScore > 0.5 ? 'rgba(244, 63, 94, 1)' : 'rgba(255,255,255,0.1)'
          }}
          className="w-48 h-64 bg-neutral-900 border-2 rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden p-8 transition-colors group"
        >
          <div className="text-4xl font-black italic tracking-tighter mb-4 opacity-40 group-hover:opacity-100">NODE_B</div>
          <div className="w-full h-1 bg-white/5 relative overflow-hidden">
             <motion.div 
              animate={{ x: waverScore > 0.4 ? ['100%', '-100%'] : '-100%' }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="absolute inset-y-0 left-0 bg-rose-500 w-full" 
             />
          </div>
        </motion.div>

        {/* The Connection Bridge */}
        <motion.div 
          animate={{ opacity: waverScore, scaleX: waverScore }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-[1px] bg-gradient-to-r from-cyan-500 to-rose-500 blur-[2px]"
        />
      </div>

      <div className="mono text-[9px] text-neutral-600 max-w-xs text-center leading-relaxed">
        Hover back and forth between A and B quickly to simulate hesitation. The UI will begin to pulsate and bridge the gap to reveal the conflict.
      </div>
    </div>
  );
};

export default IndecisionSyncDemo;
