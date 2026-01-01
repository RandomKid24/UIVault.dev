
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CircadianInterfaceDemo = ({ temporal }: any) => {
  const { time = 12 } = temporal || {};

  const isNight = time < 6 || time > 18;
  const normalizedTime = (time - 6) / 12; // -0.5 to 1.5
  const sunAngle = normalizedTime * Math.PI; // -PI/2 to 3PI/2
  
  const sunX = Math.cos(sunAngle) * 240;
  const sunY = -Math.sin(sunAngle) * 180;
  
  const bg = isNight ? '#030303' : '#fafafa';
  const color = isNight ? '#f0f0f0' : '#111';
  const accent = isNight ? '#06b6d4' : '#2563eb';
  const shadowOpacity = isNight ? 0.8 : 0.2;

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center p-12 transition-colors duration-1000 overflow-hidden relative"
      style={{ backgroundColor: bg, color }}
    >
      {/* Celestial Path */}
      <div className="absolute top-20 w-[480px] h-[360px] border border-dashed border-neutral-500/10 rounded-[100%] flex items-center justify-center">
         <motion.div
           animate={{ x: sunX, y: sunY }}
           transition={{ type: 'spring', damping: 20 }}
           className={`w-12 h-12 rounded-full shadow-2xl ${isNight ? 'bg-neutral-200' : 'bg-amber-400'}`}
           style={{ 
             boxShadow: isNight ? '0 0 40px rgba(255,255,255,0.2)' : '0 0 60px rgba(251,191,36,0.6)' 
           }}
         />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-16 text-center">
        <div className="space-y-4">
           <h4 className="text-6xl font-black italic tracking-tighter uppercase leading-none">Temporal_Shift</h4>
           <p className="mono text-xs tracking-[0.5em] opacity-40 uppercase">
             {isNight ? 'Low_Energy_Mode_Active' : 'Peak_Performance_Mode_Active'}
           </p>
        </div>

        <motion.div
          animate={{ 
            boxShadow: `${-sunX/10}px ${-sunY/10}px 50px rgba(0,0,0,${shadowOpacity})`,
            backgroundColor: isNight ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
            borderColor: isNight ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          }}
          className="p-16 border-2 rounded-[4rem] w-96 space-y-8 backdrop-blur-sm"
        >
           <div className="h-10 w-2/3 bg-current opacity-10 rounded-full" />
           <div className="space-y-3">
             <div className="h-2 w-full bg-current opacity-5 rounded" />
             <div className="h-2 w-full bg-current opacity-5 rounded" />
             <div className="h-2 w-3/4 bg-current opacity-5 rounded" />
           </div>
           <div 
             className="h-14 w-full border-2 rounded-full flex items-center justify-center font-black mono text-xs uppercase tracking-[0.3em] transition-colors"
             style={{ borderColor: accent, color: accent }}
           >
              Execute_Sequence
           </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 right-8 max-w-[240px] text-right">
         <p className="mono text-[8px] text-neutral-500 leading-relaxed uppercase">
            Global Light Vector: [ {sunX.toFixed(0)}, {sunY.toFixed(0)} ]<br />
            Surface Temp: {isNight ? '2400K' : '6500K'}<br />
            Observer State: {isNight ? 'Atmospheric' : 'Geometric'}
         </p>
      </div>
    </div>
  );
};

export default CircadianInterfaceDemo;
