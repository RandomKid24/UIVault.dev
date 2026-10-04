
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DepthSqueezeDemo = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

  const layers = [
    { title: 'INTERFACE_SKIN', color: '#1a1a1a', accent: '#ffffff', depth: 0, code: 'OS_L1', info: 'Primary presentation layer and input mapping handles.' },
    { title: 'LOGIC_STRATA', color: '#0e1c1f', accent: '#06b6d4', depth: -120, code: 'PX_L2', info: 'Conditional branching and signal processing core.' },
    { title: 'BIO_TELEMETRY', color: '#0d131f', accent: '#3b82f6', depth: -240, code: 'BIO_L3', info: 'Sensory feedback calibration and user tracking logs.' },
    { title: 'QUANTUM_CORE', color: '#140e1f', accent: '#8b5cf6', depth: -360, code: 'CORE_L4', info: 'Low-level system integrity and hardware synchronization.' }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#050505] overflow-hidden gap-12 relative select-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      
      <div className="text-center z-[100] space-y-2 pointer-events-none transition-all duration-700" style={{ opacity: isExpanded ? 0.3 : 1 }}>
        <div className="flex items-center justify-center gap-3">
           <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${isExpanded ? 'bg-cyan-500 shadow-[0_0_15px_cyan]' : 'bg-neutral-800'}`} />
           <h4 className="text-4xl font-black italic tracking-tighter uppercase text-white">Depth_Squeeze</h4>
        </div>
        <p className="mono text-[9px] text-neutral-500 uppercase tracking-[0.4em]">
          EXPLODED_STRATA_VIEW
        </p>
      </div>

      {/* Main Interaction Stage */}
      <div className="relative w-full max-w-sm h-[480px] perspective-[2000px]">
        {/* Invisible Click Surface (Only when collapsed to ensure easy expansion) */}
        {!isExpanded && (
          <div 
            onClick={() => setIsExpanded(true)}
            className="absolute inset-0 z-[100] cursor-pointer"
          />
        )}

        <div 
          className="relative w-full h-full transform-gpu transition-transform duration-1000" 
          style={{ transformStyle: 'preserve-3d' }}
        >
           {layers.map((layer, i) => {
             const isHovered = hoveredLayer === i;
             const isDimmed = hoveredLayer !== null && !isHovered;
             
             return (
               <motion.div
                 key={i}
                 onMouseEnter={() => isExpanded && setHoveredLayer(i)}
                 onMouseLeave={() => isExpanded && setHoveredLayer(null)}
                 onClick={(e) => {
                    if (isExpanded) {
                        e.stopPropagation();
                        // Optional: trigger specific layer action
                    }
                 }}
                 animate={{ 
                   translateZ: isExpanded ? (isHovered ? 150 : layer.depth) : -i * 10,
                   rotateX: isExpanded ? (isHovered ? 0 : 35) : 0,
                   rotateY: isExpanded ? (isHovered ? 0 : -10) : 0,
                   y: isExpanded ? (isHovered ? -40 : i * 65 - 100) : i * 2,
                   opacity: isExpanded ? (isDimmed ? 0.2 : 1) : (i === 0 ? 1 : 0.8 - i * 0.2),
                   scale: isExpanded ? (isHovered ? 1.05 : 0.85) : 1 - i * 0.02
                 }}
                 transition={{ 
                   type: 'spring', 
                   stiffness: isHovered ? 400 : 120, 
                   damping: isHovered ? 40 : 25,
                   delay: isExpanded ? i * 0.03 : (layers.length - i) * 0.02
                 }}
                 className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between overflow-hidden shadow-2xl transition-colors duration-500 ${isExpanded ? 'cursor-pointer' : 'pointer-events-none'}`}
                 style={{ 
                   backgroundColor: layer.color, 
                   transformStyle: 'preserve-3d',
                   zIndex: isHovered ? 100 : layers.length - i,
                   boxShadow: isHovered ? `0 0 50px ${layer.accent}33` : '0 10px 40px rgba(0,0,0,0.8)'
                 }}
               >
                 {/* Internal Tech Grid */}
                 <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:20px:20px]" />
                 
                 <div className="flex justify-between items-start relative z-10 pointer-events-none">
                   <div className="space-y-1">
                      <span className="mono text-[9px] tracking-[0.4em] uppercase font-black" style={{ color: layer.accent, opacity: 0.6 }}>{layer.code}</span>
                      <div className="h-[2px] w-12 bg-white/10 rounded-full" />
                   </div>
                   <div 
                    className="w-3 h-3 rounded-full transition-all duration-500" 
                    style={{ 
                        backgroundColor: isHovered || !isExpanded ? layer.accent : 'rgba(255,255,255,0.1)', 
                        boxShadow: isHovered ? `0 0 20px ${layer.accent}` : 'none' 
                    }} 
                   />
                 </div>

                 <div className="relative z-10 pointer-events-none">
                   <h3 className={`text-3xl font-black italic tracking-tighter uppercase transition-all duration-700 ${isHovered || !isExpanded ? 'text-white' : 'text-white/20'}`}>
                     {layer.title}
                   </h3>
                   <AnimatePresence>
                     {isHovered && (
                       <motion.div
                         initial={{ opacity: 0, height: 0, marginTop: 0 }}
                         animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                         exit={{ opacity: 0, height: 0, marginTop: 0 }}
                         className="overflow-hidden"
                       >
                         <p className="text-neutral-400 text-[11px] font-light leading-relaxed mono">
                           {layer.info}
                         </p>
                         <div className="flex gap-1.5 mt-4">
                            {[...Array(6)].map((_, j) => (
                                <motion.div 
                                    key={j}
                                    animate={{ opacity: [0.1, 1, 0.1] }}
                                    transition={{ repeat: Infinity, duration: 1.5, delay: j * 0.1 }}
                                    className="w-1 h-1 rounded-full" 
                                    style={{ backgroundColor: layer.accent }}
                                />
                            ))}
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>

                 <div className="flex justify-between items-end relative z-10 pointer-events-none">
                   <div className="h-1 w-1/2 bg-black/50 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        animate={{ x: isExpanded ? ['-100%', '100%'] : '-100%' }}
                        transition={{ repeat: Infinity, duration: 2.5 + i, ease: 'linear' }}
                        className="h-full w-1/2"
                        style={{ backgroundColor: layer.accent, opacity: 0.4 }}
                      />
                   </div>
                   <span className="mono text-[8px] text-white/10 font-bold tracking-widest">STRATA_0{i}</span>
                 </div>

                 {/* Focus Highlight Frame */}
                 <motion.div 
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 border-2 pointer-events-none rounded-[2.5rem]"
                    style={{ borderColor: layer.accent, opacity: 0.5 }}
                 />
               </motion.div>
             );
           })}

           {/* Perspective Connections (Tethers) */}
           <AnimatePresence>
             {isExpanded && !hoveredLayer && (
               <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none"
                style={{ transformStyle: 'preserve-3d' }}
              >
                 {[...Array(4)].map((_, j) => (
                   <motion.div
                    key={j}
                    className="absolute w-[1px] h-[500px] bg-gradient-to-b from-white/10 via-cyan-500/20 to-transparent"
                    style={{
                      left: j % 2 === 0 ? '10%' : '90%',
                      top: j < 2 ? '10%' : '90%',
                      translateZ: -450,
                      rotateX: -90,
                      transformOrigin: 'top'
                    }}
                   />
                 ))}
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>

      {/* Control Surface */}
      <div className="h-24 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div 
              key="expanded-controls"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex flex-col items-center gap-6 z-[110]"
            >
              <div className="mono text-[10px] text-cyan-400 uppercase tracking-[0.6em] font-black">
                {hoveredLayer !== null ? `ACCESSING: ${layers[hoveredLayer].code}` : 'HOVER_STRATA_FOR_LINK'}
              </div>
              <button 
                onClick={(e) => { 
                    e.stopPropagation(); 
                    setIsExpanded(false); 
                    setHoveredLayer(null);
                }}
                className="px-10 py-3 bg-white/5 border border-white/10 rounded-full mono text-[10px] text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all uppercase tracking-[0.3em] font-bold shadow-xl"
              >
                Collapse_Buffer
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="collapsed-controls"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-xs text-center mono text-[10px] text-neutral-700 uppercase tracking-[0.4em] leading-relaxed animate-pulse"
            >
              TAP_TO_DECOMPRESS_FIELD
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 right-8 flex items-center gap-3 mono text-[9px] text-neutral-800">
        <span className="text-neutral-600 uppercase tracking-tighter">Render_Matrix:</span>
        <span className="text-white font-black">{isExpanded ? 'Z-DEEP_ACTIVE' : 'LINEAR_STASIS'}</span>
      </div>
    </div>
  );
};

export default DepthSqueezeDemo;
