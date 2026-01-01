
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const IntentMorphDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [confidence, setConfidence] = useState(0);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Score confidence based on distance and vector
      // Higher confidence if closer to center
      const score = Math.max(0, 1 - dist / 300);
      setConfidence(score);
      
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] flex items-center justify-center overflow-hidden"
    >
      <motion.div
        animate={{
          scale: 1 + confidence * 0.5,
          width: 200 + confidence * 400,
          height: 80 + confidence * 300,
          borderRadius: confidence > 0.8 ? "2rem" : "0.5rem",
          backgroundColor: confidence > 0.8 ? "#000" : "#111",
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative flex items-center justify-center border border-white/10 overflow-hidden cursor-pointer"
      >
        <motion.div
          animate={{ opacity: confidence > 0.6 ? 0 : 1 }}
          className="mono text-xs tracking-widest font-bold"
        >
          INITIALIZE_PORTAL
        </motion.div>

        {/* Portal Contents (Revealed on high confidence) */}
        <motion.div
          animate={{ opacity: confidence > 0.6 ? (confidence - 0.6) * 2.5 : 0 }}
          className="absolute inset-0 p-8 flex flex-col justify-center"
        >
          <h4 className="text-4xl font-black tracking-tighter leading-none mb-4">SYSTEMS_ACCESS_GRANTED</h4>
          <p className="mono text-[10px] text-cyan-500">READY_FOR_DEPLOYMENT_v2.1</p>
          
          <div className="mt-8 flex gap-4">
             {[1,2,3,4].map(i => (
               <div key={i} className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1 + i, repeat: Infinity, ease: 'linear' }}
                    className="h-full w-full bg-cyan-500"
                  />
               </div>
             ))}
          </div>
        </motion.div>
        
        {/* Particle Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px]" />
      </motion.div>

      {/* Confidence HUD */}
      <div className="absolute top-8 left-8 mono text-[9px] text-neutral-600 flex flex-col gap-1">
        <span>INTENT_SCORE: {(confidence * 100).toFixed(2)}%</span>
        <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            animate={{ width: `${confidence * 100}%` }}
            className="h-full bg-cyan-500"
          />
        </div>
      </div>
    </div>
  );
};

export default IntentMorphDemo;
