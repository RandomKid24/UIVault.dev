
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useVelocity } from 'framer-motion';

const AdaptiveHeroDemo = () => {
  const [theme, setTheme] = useState<'INDUSTRIAL' | 'ETHEREAL'>('INDUSTRIAL');
  const mouseX = useMotionValue(0);
  const velocity = useVelocity(mouseX);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      // High velocity triggers ETHEREAL state shift
      if (Math.abs(velocity.get()) > 1500) {
        setTheme('ETHEREAL');
      } else {
        const timeout = setTimeout(() => setTheme('INDUSTRIAL'), 2000);
        return () => clearTimeout(timeout);
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [velocity]);

  return (
    <div className={`relative w-full h-full transition-colors duration-1000 ${theme === 'INDUSTRIAL' ? 'bg-neutral-950' : 'bg-cyan-900/10'}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {theme === 'INDUSTRIAL' ? (
            <motion.div
              key="industrial"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center"
            >
              <h1 className="text-9xl font-black italic tracking-tighter border-8 border-white p-6">STASIS</h1>
              <p className="mono text-xs tracking-widest mt-6 text-neutral-600">HEAVY_GEOMETRY_ACTIVE</p>
            </motion.div>
          ) : (
            <motion.div
              key="ethereal"
              initial={{ opacity: 0, filter: 'blur(20px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(20px)' }}
              className="text-center"
            >
              <h1 className="text-9xl font-light italic tracking-[0.2em] text-cyan-400">FLUID</h1>
              <p className="mono text-xs tracking-widest mt-6 text-cyan-800">KINETIC_FLOW_ACTIVE</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 right-8 mono text-[9px] text-neutral-700">
        ADAPTIVE_PERSONALITY: {theme}
      </div>
    </div>
  );
};

export default AdaptiveHeroDemo;
