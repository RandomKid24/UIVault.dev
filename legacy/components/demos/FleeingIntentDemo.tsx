
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useVelocity, AnimatePresence } from 'framer-motion';

const FleeingIntentDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const vx = useVelocity(mouseX);
  const vy = useVelocity(mouseY);

  const [nodes, setNodes] = useState(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      label: `INTENT_0${i + 1}`,
      initialX: Math.random() * 600 - 300,
      initialY: Math.random() * 400 - 200,
    }))
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full min-h-[600px] bg-[#020202] border border-white/5 rounded-[3rem] overflow-hidden flex flex-col items-center justify-center group select-none cursor-crosshair"
    >
      {/* Background Field */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />
      
      {/* Detection HUD */}
      <div className="absolute top-12 left-12 space-y-2 pointer-events-none z-50">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_cyan]" />
          <h4 className="text-3xl font-black italic tracking-tighter uppercase text-white/40 leading-none">Evasive_Intent</h4>
        </div>
        <p className="mono text-[9px] text-neutral-700 uppercase tracking-[0.6em]">Vector_Avoidance: MAXIMUM</p>
      </div>

      {/* Threat Zone Cursor Indicator */}
      <motion.div 
        style={{ x: mouseX, y: mouseY }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
      >
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-64 h-64 border border-rose-500/30 rounded-full flex items-center justify-center"
        >
          <div className="w-32 h-32 border border-rose-500/10 rounded-full" />
        </motion.div>
      </motion.div>

      {/* Interactive Nodes */}
      <div className="relative w-full h-full">
        {nodes.map((node) => (
          <EvasiveNode 
            key={node.id} 
            node={node}
            mouseX={mouseX} 
            mouseY={mouseY} 
            vx={vx} 
            vy={vy} 
            containerRef={containerRef}
          />
        ))}
      </div>

      {/* Operational Footer */}
      <div className="absolute bottom-12 flex flex-col items-center gap-3 pointer-events-none">
        <div className="px-6 py-2 bg-neutral-900/80 border border-white/5 backdrop-blur-xl rounded-full flex gap-8 mono text-[8px] text-neutral-500 uppercase tracking-widest">
           <div className="flex items-center gap-2">
             <span className="text-cyan-500">●</span> SIGNAL_STABLE
           </div>
           <div className="flex items-center gap-2">
             <span className="text-rose-500">●</span> THREAT_DETECTED
           </div>
        </div>
        <p className="text-center max-w-sm mono text-[8px] text-neutral-800 leading-relaxed uppercase tracking-widest px-8">
          Action nodes perform high-velocity spatial re-routing upon detecting aggressive kinetic intent vectors.
        </p>
      </div>
    </div>
  );
};

const EvasiveNode = ({ node, mouseX, mouseY, vx, vy, containerRef }: any) => {
  const x = useMotionValue(node.initialX + 300);
  const y = useMotionValue(node.initialY + 200);
  
  const springX = useSpring(x, { stiffness: 400, damping: 40 });
  const springY = useSpring(y, { stiffness: 400, damping: 40 });

  const [isWary, setIsWary] = useState(false);
  const [isDashing, setIsDashing] = useState(false);
  const [threatVector, setThreatVector] = useState({ dx: 0, dy: 0 });

  useEffect(() => {
    // Ambient Drifting Logic
    const driftInterval = setInterval(() => {
      if (!isDashing && !isWary) {
        x.set(x.get() + (Math.random() - 0.5) * 40);
        y.set(y.get() + (Math.random() - 0.5) * 40);
      }
    }, 2000);

    return () => {
      clearInterval(driftInterval);
      stopTracking();
    };
  }, [isDashing, isWary]);

  const stopTracking = mouseX.on('change', (mx: number) => {
    if (!containerRef.current) return;
    
    const my = mouseY.get();
    const cx = x.get();
    const cy = y.get();

    const dx = cx - mx;
    const dy = cy - my;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Proximity Velocity Analysis
    const vel = Math.sqrt(vx.get() ** 2 + vy.get() ** 2);
    
    // 1. WARY STATE (Proximity Check)
    if (dist < 200) {
      setIsWary(true);
      setThreatVector({ dx: -dx * 0.2, dy: -dy * 0.2 });
    } else {
      setIsWary(false);
    }

    // 2. EVASION STATE (Velocity + Proximity Check)
    if (dist < 180 && vel > 1200) {
      triggerDash(dx, dy, dist, vel);
    }
  });

  const triggerDash = (dx: number, dy: number, dist: number, vel: number) => {
    if (isDashing) return;
    setIsDashing(true);
    
    // Calculate escape jump
    const jumpStrength = (vel / 1000) * 200;
    const nx = x.get() + (dx / dist) * jumpStrength;
    const ny = y.get() + (dy / dist) * jumpStrength;

    // Bounds clamping
    const finalX = Math.max(100, Math.min(window.innerWidth - 100, nx));
    const finalY = Math.max(100, Math.min(window.innerHeight - 100, ny));

    x.set(finalX);
    y.set(finalY);

    setTimeout(() => setIsDashing(false), 600);
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
    >
      {/* Threat Vector Lines */}
      <AnimatePresence>
        {isWary && (
          <motion.svg 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 overflow-visible pointer-events-none"
          >
            <line 
              x1="0" y1="0" 
              x2={threatVector.dx} y2={threatVector.dy} 
              stroke="rgba(244,63,94,0.3)" 
              strokeWidth="1" 
              strokeDasharray="4 2"
            />
            <circle cx={threatVector.dx} cy={threatVector.dy} r="2" fill="rgba(244,63,94,0.5)" />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Ghosting / Trail during Dash */}
      <AnimatePresence>
        {isDashing && (
          <motion.div 
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 1.5 }}
            className="absolute inset-0 border-2 border-cyan-500 rounded-2xl pointer-events-none"
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          scale: isDashing ? 0.9 : isWary ? 1.05 : 1,
          rotate: isWary ? [0, -1, 1, 0] : 0,
          borderColor: isWary ? 'rgba(244,63,94,0.4)' : 'rgba(255,255,255,0.05)',
          backgroundColor: isWary ? 'rgba(244,63,94,0.05)' : 'rgba(23,23,23,0.8)'
        }}
        transition={isWary ? { rotate: { repeat: Infinity, duration: 0.1 } } : {}}
        className="w-44 p-6 border-2 rounded-2xl backdrop-blur-md cursor-pointer flex flex-col gap-3 group shadow-2xl relative overflow-hidden"
      >
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className={`mono text-[7px] font-black uppercase tracking-[0.2em] transition-colors ${isWary ? 'text-rose-500' : 'text-cyan-500'}`}>
              {isWary ? 'THREAT_NEAR' : 'MODULE_IDLE'}
            </span>
            <h5 className="text-lg font-black italic tracking-tighter text-white group-hover:text-cyan-400 transition-colors uppercase leading-none">{node.label}</h5>
          </div>
          <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_cyan] ${isWary ? 'bg-rose-500' : 'bg-cyan-500'}`} />
        </div>

        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
           <motion.div 
            animate={{ x: ['-100%', '100%'] }} 
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            className={`h-full w-1/2 ${isWary ? 'bg-rose-500/20' : 'bg-cyan-500/20'}`} 
           />
        </div>

        <div className="flex justify-between items-center opacity-30">
          <span className="mono text-[6px] text-white">V_LOCK: ACTIVE</span>
          <span className="mono text-[6px] text-white">X_{node.id}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FleeingIntentDemo;
