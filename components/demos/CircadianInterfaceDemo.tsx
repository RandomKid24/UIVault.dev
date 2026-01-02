
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CircadianInterfaceDemo = ({ temporal }: any) => {
  const { time: propTime = 12 } = temporal || {};
  const [localTime, setLocalTime] = useState(propTime);

  // Sync with prop time unless manually overridden (or just use local state for pure manual demo control)
  useEffect(() => {
    setLocalTime(propTime);
  }, [propTime]);

  const isNight = localTime < 6 || localTime > 18;
  const normalizedTime = (localTime - 6) / 12; // -0.5 to 1.5
  const sunAngle = normalizedTime * Math.PI; // -PI/2 to 3PI/2
  
  const sunX = Math.cos(sunAngle) * 240;
  const sunY = -Math.sin(sunAngle) * 180;
  
  const bg = isNight ? '#030303' : '#fafafa';
  const color = isNight ? '#f0f0f0' : '#111';
  const accent = isNight ? '#06b6d4' : '#2563eb';
  const shadowOpacity = isNight ? 0.8 : 0.2;

  const format12h = (t: number) => {
    const hours24 = Math.floor(t);
    const minutes = Math.floor((t % 1) * 60);
    const period = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center p-12 transition-colors duration-1000 overflow-hidden relative"
      style={{ backgroundColor: bg, color }}
    >
      {/* Celestial Path */}
      <div className="absolute top-20 w-[480px] h-[360px] border border-dashed border-neutral-500/10 rounded-[100%] flex items-center justify-center">
         <motion.div
           animate={{ x: sunX, y: sunY }}
           transition={{ type: 'spring', damping: 20, stiffness: 60 }}
           className={`w-12 h-12 rounded-full shadow-2xl ${isNight ? 'bg-neutral-200' : 'bg-amber-400'}`}
           style={{ 
             boxShadow: isNight ? '0 0 40px rgba(255,255,255,0.2)' : '0 0 60px rgba(251,191,36,0.6)' 
           }}
         />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10 text-center">
        <div className="space-y-4">
           <h4 className="text-6xl font-black italic tracking-tighter uppercase leading-none">Temporal_Shift</h4>
           <div className="mono text-2xl font-bold tracking-widest opacity-60">
             {format12h(localTime)}
           </div>
           <p className="mono text-[10px] tracking-[0.5em] opacity-40 uppercase">
             {isNight ? 'Low_Energy_Mode_Active' : 'Peak_Performance_Mode_Active'}
           </p>
        </div>

        <motion.div
          animate={{ 
            boxShadow: `${-sunX/10}px ${-sunY/10}px 50px rgba(0,0,0,${shadowOpacity})`,
            backgroundColor: isNight ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
            borderColor: isNight ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          }}
          className="p-12 border-2 rounded-[3.5rem] w-80 space-y-6 backdrop-blur-sm"
        >
           <div className="h-8 w-2/3 bg-current opacity-10 rounded-full mx-auto" />
           <div className="space-y-3">
             <div className="h-1.5 w-full bg-current opacity-5 rounded" />
             <div className="h-1.5 w-full bg-current opacity-5 rounded" />
           </div>
           
           {/* Manual Control Slider */}
           <div className="pt-4 space-y-4">
              <div className="flex justify-between mono text-[8px] uppercase opacity-40 font-bold">
                 <span>Midnight</span>
                 <span>Noon</span>
                 <span>Midnight</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="23.99" 
                step="0.01"
                value={localTime}
                onChange={(e) => setLocalTime(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-current opacity-10 rounded-full appearance-none accent-current cursor-pointer hover:opacity-20 transition-opacity"
              />
           </div>

           <div 
             className="h-12 w-full border-2 rounded-full flex items-center justify-center font-black mono text-[9px] uppercase tracking-[0.3em] transition-colors mt-4"
             style={{ borderColor: accent, color: accent }}
           >
              Override_System
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
      
      <div className="absolute bottom-8 left-8">
        <p className="mono text-[9px] text-neutral-400 uppercase tracking-widest opacity-30">
          Manual_Temporal_Scrub_Active
        </p>
      </div>
    </div>
  );
};

export default CircadianInterfaceDemo;
