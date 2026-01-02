
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useTime, useTransform } from 'framer-motion';

const HaltRevealDemo = () => {
  const [isHalted, setIsHalted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<any>(null);
  const progressInterval = useRef<any>(null);
  const time = useTime();

  // Ambient rotation for the holographic elements
  const rotateAmbient = useTransform(time, [0, 10000], [0, 360], { clamp: false });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    
    setIsHalted(false);
    setProgress(0);
    clearTimeout(timeoutRef.current);
    clearInterval(progressInterval.current);

    timeoutRef.current = setTimeout(() => {
      setIsHalted(true);
      startProgress();
    }, 500); // Trigger faster
  };

  const startProgress = () => {
    let p = 0;
    progressInterval.current = setInterval(() => {
      p += 2; // Slower, more deliberate build-up
      setProgress(p);
      if (p >= 100) clearInterval(progressInterval.current);
    }, 16);
  };

  return (
    <div 
      className="w-full h-full flex items-center justify-center bg-neutral-950 overflow-hidden relative cursor-none"
      onMouseMove={handleMouseMove}
    >
      {/* Background Reference Grid - Fades out when focused */}
      <motion.div 
        animate={{ opacity: isHalted ? 0.05 : 0.2 }}
        className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:32px_32px]" 
      />

      {/* The Focused State Entity */}
      <AnimatePresence>
        {isHalted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
             {/* Peripheral Dimming */}
             <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" 
                  style={{ clipPath: `radial-gradient(circle at ${mouseCoords.x}px ${mouseCoords.y}px, transparent 150px, black 400px)` }} 
             />
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Interactive Ghost */}
      <motion.div 
        style={{ x: mouseCoords.x, y: mouseCoords.y }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
      >
        {/* Core Cursor Point */}
        <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_white]" />
        
        <AnimatePresence>
          {isHalted && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative flex items-center justify-center"
            >
              {/* Holographic Lens Rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  /* Fixed: Merged duplicate style attributes into a single object */
                  style={{ 
                    rotate: rotateAmbient,
                    width: 100 + i * 60, 
                    height: 100 + i * 60,
                    opacity: 0.2 + (progress/200)
                  }}
                  animate={{ 
                    scale: [1, 1.05, 1],
                    borderColor: progress === 100 ? '#06b6d4' : 'rgba(255,255,255,0.1)'
                  }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute border border-dashed rounded-full"
                />
              ))}

              {/* Progress Sweep */}
              <svg className="absolute w-80 h-80 rotate-[-90deg]">
                <motion.circle
                  cx="160" cy="160" r="140"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="1"
                  strokeDasharray="880"
                  animate={{ strokeDashoffset: 880 - (880 * progress) / 100 }}
                  className="opacity-40"
                />
              </svg>

              {/* Data Reveal Payload */}
              <motion.div 
                className="absolute w-64 text-center space-y-4"
                animate={{ y: progress === 100 ? -20 : 0 }}
              >
                <div className="mono text-[8px] text-cyan-500 tracking-[0.5em] font-black uppercase">
                  {progress < 100 ? `Synchronizing_Focus... ${progress}%` : 'COHERENCE_LOCKED'}
                </div>
                
                {progress > 80 && (
                  <motion.div 
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    className="space-y-2"
                  >
                    <h4 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none">Deep_Layer_01</h4>
                    <div className="flex justify-center gap-2">
                       <div className="h-0.5 w-12 bg-cyan-500 shadow-[0_0_10px_cyan]" />
                       <div className="h-0.5 w-4 bg-white/20" />
                    </div>
                    <p className="mono text-[7px] text-neutral-500 uppercase tracking-widest leading-relaxed max-w-[140px] mx-auto">
                      COORD_X: {mouseCoords.x.toFixed(0)}<br />
                      COORD_Y: {mouseCoords.y.toFixed(0)}<br />
                      SIGNAL: STABLE_FLUX
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Assembly Shards */}
              {progress > 50 && progress < 100 && (
                <div className="absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        x: [Math.cos(i) * 200, 0],
                        y: [Math.sin(i) * 200, 0],
                        opacity: [0, 1]
                      }}
                      className="absolute w-4 h-0.5 bg-cyan-500/40"
                      style={{ rotate: i * 60 }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {!isHalted && (
        <div className="absolute bottom-12 mono text-[9px] text-neutral-700 tracking-[0.6em] uppercase animate-pulse">
          Establish_Stillness_To_Focus
        </div>
      )}

      {/* Coordinate HUD Labels */}
      <div className="absolute top-12 left-12 flex flex-col gap-1 mono text-[8px] text-neutral-800">
        <span>SENSORY_INPUT: {isHalted ? 'STATIONARY' : 'KINETIC'}</span>
        <span>FIELD_DENSITY: {isHalted ? 'CONVERGING' : 'DIVERGENT'}</span>
      </div>
    </div>
  );
};

export default HaltRevealDemo;
