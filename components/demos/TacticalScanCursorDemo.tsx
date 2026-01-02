
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion';

const TacticalScanCursorDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const vX = useVelocity(mouseX);
  const vY = useVelocity(mouseY);
  
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    setCoords({ x: Math.floor(x), y: Math.floor(y) });
  };

  const springX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full bg-[#020202] overflow-hidden flex items-center justify-center cursor-none"
    >
      {/* Background Coordinate Lattice */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="text-center pointer-events-none opacity-10 space-y-2">
        <h4 className="text-6xl font-black italic tracking-tighter text-white uppercase leading-none">Tactical_Grid</h4>
        <p className="mono text-[10px] text-cyan-500 uppercase tracking-[0.8em]">Precision_Vector_Scan</p>
      </div>

      {/* Axis Projection Lines */}
      <motion.div style={{ y: springY }} className="absolute inset-x-0 h-px bg-white/10 pointer-events-none" />
      <motion.div style={{ x: springX }} className="absolute inset-y-0 w-px bg-white/10 pointer-events-none" />

      {/* HUD Scanner Cursor */}
      <motion.div
        style={{ x: springX, y: springY, left: -40, top: -40 }}
        className="absolute w-20 h-20 pointer-events-none z-50 flex items-center justify-center"
      >
        {/* Radar Sweep */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-cyan-500/40 rounded-full border-dashed"
        />
        
        {/* Core Crosshair */}
        <div className="relative w-full h-full flex items-center justify-center">
           <div className="w-4 h-4 border border-cyan-500 rounded-sm" />
           <div className="absolute w-px h-full bg-cyan-500/20" />
           <div className="absolute h-px w-full bg-cyan-500/20" />
        </div>

        {/* Realtime Metadata Callout */}
        <div className="absolute top-full left-full mt-4 ml-4 mono text-[7px] text-cyan-500 space-y-1 whitespace-nowrap bg-black/40 p-2 border-l border-cyan-500">
           <div>LOCK_X: <span className="text-white">{coords.x}</span></div>
           <div>LOCK_Y: <span className="text-white">{coords.y}</span></div>
           <div>VEL_V: <span className="text-white">{Math.sqrt(vX.get()**2 + vY.get()**2).toFixed(0)}</span></div>
           <div className="h-0.5 w-8 bg-cyan-500/40 mt-2" />
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-8 mono text-[9px] text-neutral-800 uppercase tracking-widest">
        SYSTEM: HUD_OVERLAY // STATUS: TRACKING
      </div>
    </div>
  );
};

export default TacticalScanCursorDemo;
