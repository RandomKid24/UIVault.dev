
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LabAmbientDemo = () => {
  return (
    <div className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center">
      {/* Background Breadboard Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:40px_40px] opacity-40" />
      
      {/* Animated Logic Traces */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        {[...Array(10)].map((_, i) => (
          <motion.path
            key={i}
            d={`M ${Math.random() * 1000} ${Math.random() * 600} L ${Math.random() * 1000} ${Math.random() * 600}`}
            stroke="white"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0], 
              opacity: [0, 1, 0],
              transition: { duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }
            }}
          />
        ))}
      </svg>

      {/* Pulse Nodes */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-32 h-32 border border-cyan-500/50 rounded-full flex items-center justify-center bg-cyan-500/5"
        >
          <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_20px_cyan]" />
        </motion.div>
        <div className="text-center">
          <span className="mono text-[10px] text-neutral-600 tracking-widest uppercase">Laboratory_Heartbeat</span>
          <div className="h-0.5 w-full bg-neutral-900 mt-2 relative overflow-hidden">
            <motion.div 
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-cyan-500 w-1/3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabAmbientDemo;
