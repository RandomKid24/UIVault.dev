import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

const SeismicSurfaceDemo = () => {
  const [seismicActivity, setSeismicActivity] = useState(0); // 0 to 1
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 1000, damping: 10 });
  const springY = useSpring(y, { stiffness: 1000, damping: 10 });

  useEffect(() => {
    const interval = setInterval(() => {
      if (seismicActivity > 0.01) {
        const amplitude = seismicActivity * 20;
        x.set((Math.random() - 0.5) * amplitude);
        y.set((Math.random() - 0.5) * amplitude);
        setSeismicActivity(prev => Math.max(0, prev - 0.02));
      } else {
        x.set(0);
        y.set(0);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [seismicActivity]);

  return (
    <div 
      onClick={() => setSeismicActivity(prev => Math.min(1, prev + 0.3))}
      className="w-full h-full flex flex-col items-center justify-center bg-neutral-900/40 p-12 gap-16 cursor-pointer overflow-hidden relative"
    >
      <div className="text-center z-10 pointer-events-none">
        <h4 className="text-4xl font-black italic tracking-tighter uppercase text-white">Seismic_Pulse</h4>
        <p className="mono text-[10px] text-neutral-600 mt-2 uppercase tracking-[0.5em]">Tectonic_Stress: {(seismicActivity * 10).toFixed(2)} Richter</p>
      </div>

      <motion.div
        style={{ x: springX, y: springY }}
        className="w-full max-w-md bg-neutral-950 border-2 border-white/5 p-12 rounded-[3rem] shadow-2xl flex flex-col gap-8 relative overflow-hidden"
      >
        <div className="h-12 w-3/4 bg-white/5 rounded-xl border border-white/10" />
        <div className="space-y-4">
           <div className="h-2 w-full bg-white/5 rounded" />
           <div className="h-2 w-full bg-white/5 rounded" />
           <div className="h-2 w-2/3 bg-white/5 rounded" />
        </div>
        <div className="h-14 w-full bg-cyan-500/10 border border-cyan-500/20 rounded-full flex items-center justify-center">
           <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
        </div>

        {/* Crack Overlay */}
        <motion.div 
           animate={{ opacity: seismicActivity * 0.5 }}
           className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M10,10 L20,30 L5,60 L15,90 M80,10 L70,40 L85,70 L75,95\" stroke=\"rgba(255,255,255,0.1)\" fill=\"none\"/%3E%3C/svg%3E')] bg-cover"
        />
      </motion.div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-600 leading-relaxed uppercase pointer-events-none">
        CLICK REPEATEDLY TO GENERATE SEISMIC SHOCKS. THE INTERFACE SIMULATES PHYSICAL INSTABILITY UNDER HIGH FREQUENCY IMPACT.
      </div>
      
      {/* Background HUD */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex flex-col items-center justify-center">
         <div className="w-[120%] h-[1px] bg-white rotate-12" />
         <div className="w-[120%] h-[1px] bg-white -rotate-12" />
      </div>
    </div>
  );
};

export default SeismicSurfaceDemo;
