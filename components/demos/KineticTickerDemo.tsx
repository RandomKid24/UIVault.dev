
import React, { useState } from 'react';
import { motion, useTime, useTransform } from 'framer-motion';

const KineticTickerDemo = () => {
  const [velocity, setVelocity] = useState(0.5); // 0 to 1
  const time = useTime();
  
  // Frequency increases with velocity
  const frequency = velocity * 15;
  const amplitude = 5 + velocity * 10;
  
  // Transform time into oscillation
  const oscillate = useTransform(time, (t: number) => Math.sin(t * frequency / 1000) * amplitude);
  
  // FIXED: Standard number calculation instead of useTransform on a non-MotionValue
  const opacityVal = 0.3 + (velocity * 0.7);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black p-12 gap-16 overflow-hidden">
      <div className="text-center space-y-2">
        <h4 className="text-3xl font-black italic tracking-tighter text-white">VELOCITY_PULSE</h4>
        <p className="mono text-[10px] text-cyan-500 uppercase tracking-widest">Frequency: {frequency.toFixed(1)}Hz</p>
      </div>

      <div className="flex gap-4 items-center">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            style={{ 
              y: oscillate, 
              opacity: opacityVal,
              height: 100 + i * 20
            }}
            transition={{ delay: i * 0.05 }}
            className="w-1 bg-white rounded-full relative"
          >
             <motion.div 
               animate={{ height: ['0%', '100%'] }}
               transition={{ duration: 1 / (velocity + 0.1), repeat: Infinity, ease: "linear" }}
               className="absolute top-0 inset-x-0 bg-cyan-500"
             />
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-sm flex flex-col gap-6">
        <input 
          type="range" min="0.05" max="1" step="0.01" 
          value={velocity} 
          onChange={(e) => setVelocity(parseFloat(e.target.value))}
          className="w-full accent-cyan-500 h-1 bg-white/5 rounded-full appearance-none cursor-pointer"
        />
        <div className="flex justify-between mono text-[8px] text-neutral-600 uppercase tracking-[0.4em]">
          <span>Static_Idle</span>
          <span>Hyper_Volatile</span>
        </div>
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-700 leading-relaxed uppercase">
        TREND MOMENTUM IS FELT AS A PHYSICAL VIBRATION. STABILITY IS STILLNESS; VOLATILITY IS HIGH-FREQUENCY TURBULENCE.
      </div>
    </div>
  );
};

export default KineticTickerDemo;
