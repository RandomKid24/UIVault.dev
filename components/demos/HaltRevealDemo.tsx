
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HaltRevealDemo = () => {
  const [isHalted, setIsHalted] = useState(false);
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<any>(null);
  const progressInterval = useRef<any>(null);

  const handleMouseMove = () => {
    setIsHalted(false);
    setProgress(0);
    clearTimeout(timeoutRef.current);
    clearInterval(progressInterval.current);

    timeoutRef.current = setTimeout(() => {
      setIsHalted(true);
      startProgress();
    }, 600);
  };

  const startProgress = () => {
    let p = 0;
    progressInterval.current = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) clearInterval(progressInterval.current);
    }, 20);
  };

  return (
    <div 
      className="w-full h-full flex items-center justify-center bg-neutral-950/20"
      onMouseMove={handleMouseMove}
    >
      <div className="relative">
        {/* The Trigger Point */}
        <motion.div
          animate={{
            scale: isHalted ? 0.8 : 1,
            opacity: isHalted ? 0.2 : 1
          }}
          className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center"
        >
          <div className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse" />
        </motion.div>

        {/* The Bloom */}
        <AnimatePresence>
          {isHalted && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative w-64 h-64 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    fill="none"
                    stroke="rgba(6, 182, 212, 0.2)"
                    strokeWidth="2"
                  />
                  <motion.circle
                    cx="128"
                    cy="128"
                    r="120"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    strokeDasharray="754"
                    animate={{ strokeDashoffset: 754 - (754 * progress) / 100 }}
                  />
                </svg>
                
                <motion.div 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center space-y-2"
                >
                  <p className="mono text-[10px] text-cyan-500 tracking-[0.2em]">INTENT_DETECTED</p>
                  <h4 className="text-xl font-black">DEEP_DATA</h4>
                  <p className="text-[9px] text-neutral-500 max-w-[120px] mx-auto leading-relaxed">
                    YOU HAVE BEEN STILL FOR {(progress * 0.01).toFixed(2)}s. REVEALING CORE_METRICS.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {!isHalted && (
        <div className="absolute bottom-12 mono text-[10px] text-neutral-700 animate-pulse">
          STOP_MOVING_TO_REVEAL
        </div>
      )}
    </div>
  );
};

export default HaltRevealDemo;
