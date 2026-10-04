
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Target, Zap, Activity, Shield } from 'lucide-react';

const IntentPulseDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [proximity, setProximity] = useState(0); 
  const [isLocked, setIsLocked] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothProximity = useSpring(0, { stiffness: 40, damping: 12 });
  const leanX = useSpring(0, { stiffness: 100, damping: 20 });
  const leanY = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Field influence radius: 350px
      const p = Math.max(0, 1 - dist / 350);
      setProximity(p);
      smoothProximity.set(p);

      // Leaning physics mapping
      if (dist < 350) {
        leanX.set(dx * 0.12 * p);
        leanY.set(dy * 0.12 * p);
      } else {
        leanX.set(0);
        leanY.set(0);
      }

      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [leanX, leanY, smoothProximity, mouseX, mouseY]);

  const isReady = proximity > 0.85;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex flex-col items-center justify-center bg-[#020202] overflow-hidden group cursor-none"
    >
      {/* Background Lattice - Reactive opacity */}
      <motion.div 
        style={{ opacity: useTransform(smoothProximity, [0, 1], [0.02, 0.1]) }}
        className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none"
      />

      {/* Volumetric Field Aura */}
      <motion.div 
        style={{ 
          opacity: useTransform(smoothProximity, [0.2, 1], [0, 0.25]),
          scale: useTransform(smoothProximity, [0, 1], [0.8, 1.5])
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.4)_0%,transparent_70%)] pointer-events-none"
      />

      <div className="relative flex items-center justify-center">
        {/* Photonic Radiating Rings */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            style={{ 
              scale: useTransform(smoothProximity, [0, 1], [1, 1.1 + i * 0.2]),
              opacity: useTransform(smoothProximity, [0, 1], [0.02, 0.2 - i * 0.04]),
              borderWidth: useTransform(smoothProximity, [0, 1], [1, 3]),
              width: 220 + i * 80,
              height: 220 + i * 80
            }}
            className="absolute rounded-full border-cyan-500 pointer-events-none"
            animate={{ 
              rotate: i % 2 === 0 ? [0, 360] : [360, 0],
              borderColor: isReady ? ['#06b6d4', '#fff', '#06b6d4'] : '#06b6d4'
            }}
            transition={{ rotate: { duration: 15 + i * 5, repeat: Infinity, ease: "linear" } }}
          />
        ))}

        {/* Dynamic Intent Focal Core */}
        <motion.button
          onMouseDown={() => setIsLocked(true)}
          onMouseUp={() => setIsLocked(false)}
          style={{ x: leanX, y: leanY }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          className="relative z-20 w-52 h-52 flex items-center justify-center rounded-full bg-neutral-900 border border-white/5 overflow-hidden transition-all duration-500 shadow-2xl"
        >
          {/* Surface Photonic Bleed */}
          <motion.div 
            style={{ 
              opacity: useTransform(smoothProximity, [0.4, 1], [0, 0.6]),
              scale: useTransform(smoothProximity, [0.4, 1], [0.6, 2.8])
            }}
            className="absolute inset-0 bg-cyan-500 blur-3xl"
          />

          <div className="relative z-10 flex flex-col items-center gap-4">
            <motion.div 
              animate={{ 
                scale: isReady ? [1, 1.1, 1] : 1,
                rotate: isReady ? [0, -4, 4, 0] : 0,
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="p-5 bg-white/5 rounded-2xl border border-white/10"
            >
              <Zap size={28} className={isReady ? 'text-white' : 'text-neutral-600'} />
            </motion.div>
            
            <div className="flex flex-col items-center">
                <span className={`mono text-[10px] font-black tracking-[0.6em] uppercase transition-all duration-300 ${isReady ? 'text-white' : 'text-neutral-700'}`}>
                {isReady ? 'SYNC_LOCKED' : 'SENSING'}
                </span>
                <motion.div 
                    style={{ 
                        width: useTransform(smoothProximity, [0, 1], [0, 64]),
                        opacity: useTransform(smoothProximity, [0.5, 1], [0, 1])
                    }}
                    className="h-[1px] bg-cyan-500 mt-2 origin-center"
                />
            </div>
          </div>

          {/* Interior Vertical Scanline */}
          <motion.div 
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-0 h-px bg-white/10 z-0 pointer-events-none"
          />
        </motion.button>
      </div>

      {/* Adaptive Tactical HUD Overlay */}
      <motion.div 
        style={{ x: mouseX, y: mouseY }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
      >
        <div className="relative flex items-center justify-center">
           <div className="w-8 h-8 border border-white/10 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_12px_cyan]" />
           </div>
           
           <motion.div 
             animate={{ opacity: proximity > 0.05 ? 1 : 0, x: 30 }}
             className="absolute left-full whitespace-nowrap mono text-[8px] text-neutral-600 space-y-2"
           >
              <div className="flex items-center gap-3">
                 <Activity size={12} className="text-cyan-500" />
                 <span className="tracking-widest">MAG_INTENT: <span className="text-white font-bold">{(proximity * 100).toFixed(1)}%</span></span>
              </div>
              <div className={`px-2.5 py-1 border rounded uppercase font-black italic tracking-widest transition-all duration-300 ${isReady ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400' : 'border-white/5 bg-white/5 text-neutral-700'}`}>
                 {isReady ? 'READY_FOR_CONFIRM' : 'APPROACH_TARGET'}
              </div>
           </motion.div>
        </div>
      </motion.div>

      {/* Decorative Metadata */}
      <div className="absolute bottom-12 text-center pointer-events-none opacity-30 select-none">
        <h4 className="text-2xl font-black italic tracking-tighter text-white uppercase mb-1 leading-none">Pre-Click_Luminance</h4>
        <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-white/20" />
            <p className="mono text-[8px] text-neutral-500 uppercase tracking-[0.6em]">Proximity_Vector_Analysis_v12.4</p>
            <div className="h-px w-12 bg-white/20" />
        </div>
      </div>
    </div>
  );
};

export default IntentPulseDemo;
