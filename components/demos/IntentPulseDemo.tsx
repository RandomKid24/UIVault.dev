
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

const IntentPulseDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [proximity, setProximity] = useState(0); // 0 to 1
  const [angle, setAngle] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Physics for the button "leaning" toward the cursor
  const leanX = useSpring(0, { stiffness: 100, damping: 20 });
  const leanY = useSpring(0, { stiffness: 100, damping: 20 });
  
  // Smooth proximity for visual scaling
  const smoothProximity = useSpring(0, { stiffness: 60, damping: 15 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Calculate angle for the "look at" behavior
      const ang = Math.atan2(dy, dx) * (180 / Math.PI);
      setAngle(ang);

      // Max influence radius of 300px
      const p = Math.max(0, 1 - dist / 300);
      setProximity(p);
      smoothProximity.set(p);

      // Set leaning intensity (max 15px)
      if (dist < 300) {
        leanX.set((dx / 300) * 20 * p);
        leanY.set((dy / 300) * 20 * p);
      } else {
        leanX.set(0);
        leanY.set(0);
      }

      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [leanX, leanY, smoothProximity]);

  const isReady = proximity > 0.85;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] flex flex-col items-center justify-center bg-neutral-950 overflow-hidden group"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:32px_32px]" />
      
      {/* The Magnetic Influence Ring */}
      <motion.div 
        style={{ 
          scale: useTransform(smoothProximity, [0, 1], [1.2, 0.8]),
          opacity: useTransform(smoothProximity, [0, 1], [0.05, 0.2])
        }}
        className="absolute w-[400px] h-[400px] border border-white rounded-full pointer-events-none"
      />

      <div className="relative flex items-center justify-center">
        {/* Tracking Petals - Segmented Feedback */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              rotate: isReady ? (i * 45) : angle, // Snap to fixed positions when ready
              scale: isReady ? 1 : 0.8 + proximity * 0.4,
              opacity: 0.1 + proximity * 0.6
            }}
            className="absolute pointer-events-none"
            style={{ width: 180, height: 2 }}
          >
            <div 
              className="absolute right-0 w-8 h-full bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]" 
              style={{ 
                opacity: 0.2 + (proximity * 0.8),
                transform: `translateX(${isReady ? '-20px' : '0px'})`
              }}
            />
          </motion.div>
        ))}

        {/* The Core Button Entity */}
        <motion.button
          style={{ x: leanX, y: leanY }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-20 w-40 h-40 flex items-center justify-center rounded-[2.5rem] bg-neutral-900 border-2 border-white/5 group/btn overflow-hidden"
        >
          {/* Internal Glow Sync */}
          <motion.div 
            animate={{ opacity: proximity * 0.3 }}
            className="absolute inset-0 bg-cyan-500 blur-2xl"
          />

          <div className="relative z-10 flex flex-col items-center gap-2">
            <motion.div 
              animate={{ 
                y: isReady ? -5 : 0,
                color: isReady ? '#fff' : '#555'
              }}
              className="mono text-[8px] font-black tracking-[0.4em] uppercase"
            >
              {isReady ? 'READY_TO_LOCK' : 'SENSING...'}
            </motion.div>
            
            <span className={`text-2xl font-black italic tracking-tighter transition-all duration-500 ${isReady ? 'text-white scale-110' : 'text-neutral-500'}`}>
              ENGAGE
            </span>
          </div>

          {/* Border Highlights */}
          <motion.div 
            animate={{ opacity: isReady ? 1 : 0 }}
            className="absolute inset-0 border-2 border-cyan-500 rounded-[2.5rem] shadow-[inset_0_0_20px_rgba(6,182,212,0.4)]"
          />
        </motion.button>
      </div>

      {/* Atmospheric UI Readouts */}
      <div className="absolute top-12 left-12 flex flex-col gap-1 mono text-[9px] text-neutral-800">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${proximity > 0.1 ? 'bg-cyan-500 animate-pulse' : 'bg-neutral-800'}`} />
          <span>PROXIMITY_FIELD: {(proximity * 100).toFixed(0)}%</span>
        </div>
        <span>VECTOR_ANGLE: {angle.toFixed(1)}°</span>
      </div>

      <div className="absolute bottom-12 text-center">
        <p className="mono text-[10px] text-neutral-700 tracking-[0.6em] uppercase">
          {isReady ? 'Interaction_Threshold_Met' : 'Approach_Target_Node'}
        </p>
      </div>
    </div>
  );
};

export default IntentPulseDemo;
