
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useVelocity, AnimatePresence } from 'framer-motion';

const KineticTimelineDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Playhead position (0 to 100% of container)
  const playheadX = useMotionValue(100);
  const velocity = useVelocity(playheadX);
  
  // High fidelity physics for the playhead "mass"
  const springX = useSpring(playheadX, { stiffness: 120, damping: 20 });
  
  // Visual effects based on scrubbing speed
  const blurValue = useTransform(velocity, [-3000, 0, 3000], [20, 0, 20]);
  const chromaticShift = useTransform(velocity, [-3000, 3000], [-10, 10]);
  
  const [currentFrame, setCurrentFrame] = useState(0);

  // Sample events along the timeline
  const events = [
    { time: 10, label: 'INIT_BOOT', id: 'ev1', desc: 'System kernel sequence initialized.' },
    { time: 30, label: 'DATA_STRATA', id: 'ev2', desc: 'Layer 02 synchronization complete.' },
    { time: 55, label: 'VECT_LOCK', id: 'ev3', desc: 'Interactive field vector stabilized.' },
    { time: 75, label: 'CORE_SYNC', id: 'ev4', desc: 'Global epoch alignment reached.' },
    { time: 90, label: 'FINAL_EXIT', id: 'ev5', desc: 'Process cycle terminated.' }
  ];

  const handleDrag = (_: any, info: any) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newX = Math.max(0, Math.min(rect.width, info.point.x - rect.left));
    playheadX.set(newX);
    setCurrentFrame(Math.floor((newX / rect.width) * 100));
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-[#020202] overflow-hidden gap-12 relative select-none">
      
      {/* 3D Scene Container */}
      <div className="relative w-full max-w-4xl h-80 perspective-[1000px] flex items-center justify-center">
        
        {/* Background Depth Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none [background-size:40px_40px] bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)]" />

        {/* Dynamic State Preview (Z-Stratified) */}
        <motion.div 
          style={{ 
            filter: useTransform(blurValue, (v) => `blur(${v}px)`),
            x: chromaticShift
          }}
          className="relative z-10 text-center"
        >
          <motion.div
             animate={{ 
               scale: [1, 1.02, 1],
               rotateX: [0, 5, 0],
             }}
             transition={{ duration: 4, repeat: Infinity }}
             className="w-96 h-48 bg-neutral-900 border border-white/10 rounded-[2.5rem] flex items-center justify-center shadow-2xl overflow-hidden relative"
          >
             <div className="absolute inset-0 bg-cyan-500/5 blur-3xl" />
             <div className="relative flex flex-col items-center gap-4">
                <span className="mono text-[10px] text-cyan-500 font-black tracking-[0.4em]">FRAME_0{currentFrame.toString().padStart(2, '0')}</span>
                <div className="flex gap-1.5">
                   {[...Array(12)].map((_, i) => (
                     <motion.div 
                        key={i}
                        animate={{ height: Math.abs(Math.sin(currentFrame / 10 + i) * 30) + 10 }}
                        className="w-1 bg-white/20 rounded-full" 
                     />
                   ))}
                </div>
                <div className="mono text-[8px] text-neutral-600 uppercase tracking-widest italic">Temporal_Buffer_Active</div>
             </div>
          </motion.div>
        </motion.div>

        {/* Event Shards drifting in Depth */}
        {events.map((ev, i) => (
          <EventMarker 
            key={ev.id} 
            event={ev} 
            playheadX={springX} 
            totalWidth={containerRef.current?.clientWidth || 800} 
          />
        ))}
      </div>

      {/* Kinetic Timeline Control Bar */}
      <div 
        ref={containerRef}
        className="w-full max-w-4xl h-32 bg-neutral-900/40 border-2 border-white/5 rounded-[2rem] relative flex items-center px-12 group overflow-visible"
      >
        {/* The Track Line */}
        <div ref={trackRef} className="w-full h-0.5 bg-white/10 relative rounded-full">
           {/* Static Event Ticks */}
           {events.map(ev => (
             <div 
               key={ev.id} 
               className="absolute top-1/2 -translate-y-1/2 w-1 h-3 bg-white/20 rounded-full"
               style={{ left: `${ev.time}%` }}
             />
           ))}
        </div>

        {/* Photonic Playhead - Draggable */}
        <motion.div
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0.01}
          dragMomentum={false}
          onDrag={handleDrag}
          style={{ x: springX, left: -40 }}
          className="absolute z-[100] top-0 bottom-0 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing group/head"
        >
          {/* Visual Light-Seed */}
          <div className="w-1 h-full bg-white relative">
             <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-8 h-8 bg-cyan-500 rounded-full blur-xl opacity-40 group-active/head:scale-150 transition-transform" />
             <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-1 h-8 bg-cyan-500 shadow-[0_0_15px_cyan]" />
          </div>

          {/* Value Callout */}
          <div className="absolute -top-10 px-3 py-1 bg-white text-black mono text-[9px] font-black italic rounded-sm shadow-xl">
             T:{(currentFrame / 10).toFixed(1)}s
          </div>
        </motion.div>

        {/* Labeling Overlay */}
        <div className="absolute top-4 left-10 right-10 flex justify-between pointer-events-none opacity-20">
           <span className="mono text-[8px] font-bold">0.00s</span>
           <span className="mono text-[8px] font-bold">10.0s</span>
        </div>
      </div>

      {/* Experimental Status Footer */}
      <div className="absolute bottom-8 right-12 text-right pointer-events-none opacity-40">
        <h4 className="text-xl font-black italic tracking-tighter text-white uppercase leading-none">Scrub_Matrix</h4>
        <p className="mono text-[8px] text-neutral-500 mt-2 uppercase tracking-[0.4em]">Inertia_Physics: 1.0_MASS</p>
      </div>

      <div className="absolute bottom-8 left-12 max-w-xs mono text-[9px] text-neutral-700 leading-relaxed uppercase pointer-events-none">
        DRAG THE PHOTONIC CORE TO NAVIGATE THE TEMPORAL AXIS. OBSERVE THE VISCOUS LAG AS EVENT NODES STRATIFY IN Z-DEPTH.
      </div>
    </div>
  );
};

const EventMarker = ({ event, playheadX, totalWidth }: any) => {
  const [dist, setDist] = useState(0);
  
  useEffect(() => {
    return playheadX.on('change', (val: number) => {
      if (!totalWidth) return;
      const targetPos = (event.time / 100) * totalWidth;
      setDist(val - targetPos);
    });
  }, [playheadX, totalWidth, event.time]);

  // Map distance to 3D properties
  // Closer to playhead = further "forward" in Z and sharper
  const proximity = Math.max(0, 1 - Math.abs(dist) / 300);
  const zDepth = -300 + (proximity * 400); // Drifts from -300 to +100
  const blur = (1 - proximity) * 12;
  const opacity = 0.1 + (proximity * 0.9);

  return (
    <motion.div
      animate={{ 
        translateZ: zDepth,
        x: dist * 0.2, // Parallax effect
        opacity,
        filter: `blur(${blur}px)`
      }}
      transition={{ type: 'spring', stiffness: 60, damping: 20 }}
      className="absolute top-0 w-64 h-24 bg-neutral-900 border-l-4 border-cyan-500 p-6 flex flex-col justify-center gap-1 backdrop-blur-xl pointer-events-none shadow-2xl"
    >
       <span className="mono text-[8px] text-cyan-400 font-black tracking-widest">EVENT_SIG_{event.id}</span>
       <h5 className="text-xl font-black italic tracking-tighter text-white uppercase">{event.label}</h5>
       <p className="text-[10px] text-neutral-500 font-light truncate uppercase">{event.desc}</p>
    </motion.div>
  );
};

export default KineticTimelineDemo;
