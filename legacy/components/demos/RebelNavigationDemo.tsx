
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const RebelNavigationDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // These represent the "Remapped" coordinates
  const remappedX = useMotionValue(200);
  const remappedY = useMotionValue(200);

  const springX = useSpring(remappedX, { stiffness: 200, damping: 30 });
  const springY = useSpring(remappedY, { stiffness: 200, damping: 30 });

  const [activeQuadrant, setActiveQuadrant] = useState<number | null>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Raw relative mouse position
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    
    // HIJACK LOGIC: Swap X and Y coordinates. 
    // Moving mouse left-right moves the focus up-down.
    // Moving mouse up-down moves the focus left-right.
    const transformedX = (rawY / rect.height) * rect.width;
    const transformedY = (rawX / rect.width) * rect.height;
    
    remappedX.set(transformedX);
    remappedY.set(transformedY);

    // Determine Quadrant
    const col = transformedX > rect.width / 2 ? 1 : 0;
    const row = transformedY > rect.height / 2 ? 1 : 0;
    setActiveQuadrant(row * 2 + col);
  };

  const sectors = [
    { id: 0, label: 'CORE_DATA', code: '0x11' },
    { id: 1, label: 'VECT_FIELD', code: '0x12' },
    { id: 2, label: 'BIOS_LINK', code: '0x21' },
    { id: 3, label: 'VOID_STRAT', code: '0x22' }
  ];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setActiveQuadrant(null)}
      className="relative w-full h-[500px] bg-[#020202] flex items-center justify-center overflow-hidden border border-white/5 rounded-[3rem]"
    >
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      
      {/* Remapped Searchlight Effect */}
      <motion.div 
        style={{ 
          x: springX, 
          y: springY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        className="absolute w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none z-0"
      />

      {/* Main Interaction Grid */}
      <div className="relative z-10 w-full h-full grid grid-cols-2 grid-rows-2 p-12 gap-6">
        {sectors.map((sector) => (
          <motion.div
            key={sector.id}
            animate={{
              borderColor: activeQuadrant === sector.id ? 'rgba(6,182,212,0.4)' : 'rgba(255,255,255,0.03)',
              backgroundColor: activeQuadrant === sector.id ? 'rgba(6,182,212,0.03)' : 'rgba(255,255,255,0.01)',
              scale: activeQuadrant === sector.id ? 1.02 : 1,
            }}
            className="border-2 rounded-[2rem] p-8 flex flex-col justify-between backdrop-blur-sm transition-colors duration-300"
          >
            <div className="flex justify-between items-start">
               <span className={`mono text-[8px] font-black tracking-[0.4em] transition-colors ${activeQuadrant === sector.id ? 'text-cyan-500' : 'text-neutral-700'}`}>
                 SECTOR_{sector.code}
               </span>
               <div className={`w-1.5 h-1.5 rounded-full transition-colors ${activeQuadrant === sector.id ? 'bg-cyan-500 animate-pulse shadow-[0_0_10px_cyan]' : 'bg-white/5'}`} />
            </div>
            
            <h3 className={`text-4xl font-black italic tracking-tighter uppercase transition-colors ${activeQuadrant === sector.id ? 'text-white' : 'text-neutral-800'}`}>
              {sector.label}
            </h3>

            <div className="h-0.5 w-full bg-white/5 relative overflow-hidden">
               {activeQuadrant === sector.id && (
                 <motion.div 
                  layoutId="indicator" 
                  className="absolute inset-0 bg-cyan-500/40"
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                 />
               )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hijack Status HUD */}
      <div className="absolute top-8 right-8 text-right space-y-1 pointer-events-none">
        <div className="flex items-center justify-end gap-2">
           <span className="mono text-[8px] text-neutral-600 uppercase font-black tracking-widest">Input_Status:</span>
           <span className="mono text-[8px] text-rose-500 font-black animate-pulse uppercase tracking-widest">Hijacked</span>
        </div>
        <div className="mono text-[7px] text-neutral-800 font-bold uppercase tracking-tighter">
          Transformation: [X,Y] → [Y,X]
        </div>
      </div>

      <div className="absolute bottom-8 left-8 max-w-xs mono text-[9px] text-neutral-700 leading-relaxed uppercase pointer-events-none">
        <span className="text-neutral-500">AXES_SWAP_ACTIVE:</span> THE INTERFACE USES NON-STANDARD SPATIAL MAPPING TO TEST COGNITIVE ADAPTATION VECTORS.
      </div>

      {/* Central Visual Origin */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
         <div className="w-[1px] h-32 bg-white" />
         <div className="h-[1px] w-32 bg-white absolute" />
      </div>
    </div>
  );
};

export default RebelNavigationDemo;
