
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const IntentPulseDemo = () => {
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // Monitor cursor vector toward center
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);

      // Determine "Intent" - Are we moving fast toward the center?
      // Simplified: if within 120px, start solidifying
      if (dist < 120) {
        setIsReady(true);
      } else {
        setIsReady(false);
      }
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-64 h-64 flex items-center justify-center group cursor-none"
    >
      {/* The Cursor Sentinel */}
      <motion.div 
        style={{ x: springX, y: springY }}
        className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm pointer-events-none z-50"
      />

      <motion.div
        animate={{
          scale: isReady ? 1 : 0.4,
          opacity: isReady ? 1 : 0.2,
          borderRadius: isReady ? "4px" : "100%",
          rotate: isReady ? 0 : 45
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="relative w-40 h-40 bg-neutral-900 border border-white/10 flex items-center justify-center overflow-hidden"
      >
        <motion.div 
          animate={{
            opacity: isReady ? 1 : 0,
            y: isReady ? 0 : 20
          }}
          className="mono text-xs font-bold tracking-[0.3em]"
        >
          EXECUTE_INTENT
        </motion.div>

        {/* Ambient Glow */}
        <motion.div 
          animate={{
            scale: isReady ? 1.5 : 1,
            opacity: isReady ? 0.3 : 0.1
          }}
          className="absolute inset-0 bg-cyan-500 blur-2xl pointer-events-none"
        />
      </motion.div>

      {/* Outer Field Indicators */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            rotate: isReady ? i * 90 : i * 90 + 45,
            scale: isReady ? 1.2 : 0.8,
            opacity: isReady ? 1 : 0.2
          }}
          className="absolute w-48 h-48 border-t border-cyan-500/30 rounded-full pointer-events-none"
        />
      ))}
    </div>
  );
};

export default IntentPulseDemo;
