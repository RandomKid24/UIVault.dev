
import React, { useState, useEffect } from 'react';
import { motion, useTime, useTransform } from 'framer-motion';

const VortexAccretionLoaderDemo = () => {
  const [progress, setProgress] = useState(0);
  const time = useTime();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + 0.2));
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Map progress to orbital radius collapse (150px to 20px)
  const radius = 150 - (progress * 1.3);
  const speedScale = 1 + (progress / 20);
  
  // Rotating coordinate calculation
  const angle = useTransform(time, (t) => (t / 1000) * speedScale * Math.PI * 2);
  const x = useTransform(angle, (a) => Math.cos(a) * radius);
  const y = useTransform(angle, (a) => Math.sin(a) * radius);

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center p-12 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_60%)] opacity-30" />
      
      <div className="relative w-96 h-96 flex items-center justify-center">
        {/* Core Singularity */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2 + (progress/50), 1],
            opacity: 0.3 + (progress/100)
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="w-8 h-8 bg-white rounded-full blur-xl z-10 shadow-[0_0_40px_white]" 
        />

        {/* Accretion Disk (Particles) */}
        {[...Array(24)].map((_, i) => (
          <Particle key={i} index={i} progress={progress} time={time} speedScale={speedScale} />
        ))}

        {/* Orbiting Lead Mass */}
        <motion.div
          style={{ x, y }}
          className="absolute w-4 h-4 bg-cyan-500 rounded-full shadow-[0_0_20px_cyan] z-20"
        >
          <div className="absolute inset-0 bg-white blur-sm rounded-full opacity-50" />
        </motion.div>

        {/* HUD Data */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="text-center translate-y-16">
              <span className="mono text-2xl font-black italic text-cyan-400 drop-shadow-[0_0_10px_cyan]">{progress.toFixed(1)}%</span>
              <div className="h-0.5 w-12 bg-white/10 mx-auto mt-2" />
           </div>
        </div>
      </div>

      <div className="mt-12 text-center space-y-4">
        <h4 className="text-2xl font-black italic tracking-tighter text-white uppercase">Accretion_Matrix_v9</h4>
        <p className="mono text-[8px] text-neutral-600 uppercase tracking-[0.6em]">Angular_Velocity: {(speedScale).toFixed(2)}x_EPOCH</p>
      </div>
    </div>
  );
};

// Fix: Explicitly typing props to handle React component requirements and fix arithmetic errors in useTransform
const Particle = ({ index, progress, time, speedScale }: { index: number; progress: number; time: any; speedScale: number }) => {
  const offset = index * (Math.PI * 2 / 24);
  const baseRadius = 160 - (index * 4);
  const spiralRadius = baseRadius - (progress * 1.5);
  
  // Fix: Providing input arguments to useTransform callbacks to ensure correct type inference for arithmetic operations
  const angle = useTransform(time, (t: number) => (t / 2000) * speedScale * Math.PI * 2 + offset);
  const x = useTransform(angle, (a: number) => Math.cos(a) * spiralRadius);
  const y = useTransform(angle, (a: number) => Math.sin(a) * spiralRadius);
  const opacity = useTransform(angle, (_a: number) => Math.max(0, 1 - (progress / 110)) * 0.4);

  return (
    <motion.div
      style={{ x, y, opacity }}
      className="absolute w-1 h-1 bg-white rounded-full"
    />
  );
};

export default VortexAccretionLoaderDemo;
