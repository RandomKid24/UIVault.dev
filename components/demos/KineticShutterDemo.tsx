
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useVelocity, useTransform, useSpring, AnimatePresence } from 'framer-motion';

const KineticShutterDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const velocity = useVelocity(mouseX);
  const [isRevealed, setIsRevealed] = useState(false);

  // Transform velocity to shutter width
  const shutterWidth = useTransform(velocity, [-2000, 0, 2000], [100, 0, 100]);
  const springShutter = useSpring(shutterWidth, { stiffness: 200, damping: 30 });

  useEffect(() => {
    return velocity.on('change', (v) => {
      if (Math.abs(v) > 800) setIsRevealed(true);
      else setIsRevealed(false);
    });
  }, [velocity]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative w-full h-[500px] bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden flex items-center justify-center"
    >
      {/* Background Static */}
      <div className="absolute inset-0 opacity-5 grayscale bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop')] bg-cover" />

      {/* The Kinetic Shutter Layer */}
      <div className="relative z-10 text-center">
        <h2 className="text-9xl font-black italic tracking-tighter opacity-10">SHUTTER</h2>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="bg-black/80 backdrop-blur-xl border border-cyan-500/50 p-12 rounded-3xl"
              >
                <div className="mono text-[10px] text-cyan-500 mb-4 tracking-[0.4em] uppercase font-black italic">High_Velocity_Reveal</div>
                <h3 className="text-4xl font-black tracking-tight mb-2">SECRET_ACCESS</h3>
                <p className="text-neutral-500 text-sm max-w-[200px] mx-auto font-light leading-relaxed">
                  THIS CONTENT ONLY MANIFESTS UNDER HIGH KINETIC MOMENTUM.
                </p>
                <div className="mt-8 flex justify-center gap-1">
                  {[...Array(12)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      animate={{ height: [2, 12, 2] }}
                      transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                      className="w-0.5 bg-cyan-500" 
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 mono text-[10px] text-neutral-600 animate-pulse">
        SWIPE_CURSOR_FAST_TO_UNLOCK
      </div>

      {/* Velocity HUD */}
      <div className="absolute top-8 left-8 flex items-center gap-4 mono text-[10px]">
        <div className="px-3 py-1 bg-black/50 border border-white/10 rounded">
          VELOCITY_GATE: <span className={isRevealed ? 'text-cyan-500' : 'text-neutral-500'}>{Math.abs(velocity.get()).toFixed(0)} px/s</span>
        </div>
      </div>
    </div>
  );
};

export default KineticShutterDemo;
