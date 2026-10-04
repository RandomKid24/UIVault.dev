
import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const IntentCTAHeroDemo = () => {
  const [confidence, setConfidence] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Intent score: Closer = higher confidence
      const score = Math.max(0, 1 - dist / 300);
      setConfidence(score);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center bg-black">
      <div className="relative">
        {/* Glow Aura */}
        <motion.div
          animate={{
            scale: 1 + confidence * 2,
            opacity: confidence * 0.5,
          }}
          className="absolute inset-0 bg-cyan-500 blur-3xl rounded-full"
        />

        {/* Portal CTA */}
        <motion.button
          animate={{
            width: 200 + confidence * 200,
            height: 60 + confidence * 140,
            borderRadius: confidence > 0.8 ? "4px" : "40px",
            backgroundColor: confidence > 0.8 ? "#000" : "#fff",
            color: confidence > 0.8 ? "#fff" : "#000"
          }}
          className="relative z-10 flex items-center justify-center font-black mono text-xs tracking-widest overflow-hidden border border-white/10"
        >
          {confidence < 0.8 ? (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              APPROACH_PORTAL
            </motion.span>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
              <span className="text-2xl">INIT_PROTOCOL</span>
              <div className="flex gap-1">
                {[...Array(8)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    animate={{ height: [4, 20, 4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                    className="w-1 bg-cyan-500" 
                  />
                ))}
              </div>
            </motion.div>
          )}
        </motion.button>
      </div>

      <div className="absolute top-8 left-8 mono text-[9px] text-neutral-600">
        CONFIDENCE_MAPPING: {(confidence * 100).toFixed(0)}%
      </div>
    </div>
  );
};

export default IntentCTAHeroDemo;
