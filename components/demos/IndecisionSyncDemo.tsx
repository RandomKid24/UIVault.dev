
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from 'framer-motion';

const IndecisionSyncDemo = () => {
  const [waverScore, setWaverScore] = useState(0);
  const [isIntervening, setIsIntervening] = useState(false);
  const lastTarget = useRef<number | null>(null);
  const switchCount = useRef(0);
  const lastSwitchTime = useRef(Date.now());

  // Comparison data points
  const compareData = [
    { label: 'THROUGHPUT', a: '1.2GB/s', b: '4.8GB/s' },
    { label: 'LATENCY', a: '45ms', b: '12ms' },
    { label: 'SECURITY', a: 'BASE_L1', b: 'QUANTUM_L3' },
  ];

  const handleHover = (target: number) => {
    const now = Date.now();
    if (lastTarget.current !== null && lastTarget.current !== target) {
      const timeDiff = now - lastSwitchTime.current;
      // High-speed switching (hesitation) within 700ms
      if (timeDiff < 700) {
        switchCount.current = Math.min(10, switchCount.current + 2.5);
      }
      lastSwitchTime.current = now;
    }
    lastTarget.current = target;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Gradual decay of hesitation score
      switchCount.current = Math.max(0, switchCount.current - 0.08);
      const score = switchCount.current / 10;
      setWaverScore(score);
      setIsIntervening(score > 0.6);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-[#020202] overflow-hidden gap-16 relative">
      {/* Background Conflict Vignette */}
      <motion.div 
        animate={{ opacity: waverScore * 0.4 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.1)_0%,transparent_70%)] pointer-events-none"
      />

      {/* Main HUD Header */}
      <div className="text-center z-20 space-y-2 pointer-events-none">
        <div className="flex items-center justify-center gap-3">
           <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isIntervening ? 'bg-rose-500 shadow-[0_0_15px_rose]' : 'bg-cyan-500'}`} />
           <h4 className="text-4xl font-black italic tracking-tighter uppercase text-white">Conflict_Intervention</h4>
        </div>
        <p className="mono text-[10px] text-neutral-600 uppercase tracking-[0.4em]">
          {isIntervening ? 'PROTOCOL_ALPHA: RESOLVING_HESITATION' : 'MONITORING_INTENT_STABILITY'}
        </p>
      </div>

      <div className="flex gap-24 relative items-center justify-center w-full max-w-4xl">
        {/* Choice A */}
        <ChoiceNode 
          label="PRIME_L1" 
          color="#06b6d4" 
          score={waverScore} 
          onHover={() => handleHover(0)} 
          direction={1} 
          isActive={lastTarget.current === 0}
        />

        {/* The Decision Bridge (Useful Utility) */}
        <div className="relative w-48 h-64 flex items-center justify-center">
          {/* Energy Arcs */}
          <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
            <motion.path
              d="M -40,128 Q 96,128 232,128"
              fill="none"
              stroke={isIntervening ? '#f43f5e' : '#06b6d4'}
              strokeWidth="2"
              strokeDasharray="4 4"
              animate={{ 
                strokeDashoffset: [0, -20],
                opacity: waverScore,
                y: [0, -2, 2, 0]
              }}
              transition={{ 
                strokeDashoffset: { repeat: Infinity, duration: 0.5, ease: 'linear' },
                y: { repeat: Infinity, duration: 0.1 }
              }}
            />
          </svg>

          {/* Comparative Data Manifest */}
          <AnimatePresence>
            {waverScore > 0.3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="w-full space-y-4 bg-neutral-900/80 backdrop-blur-xl border border-white/5 p-6 rounded-2xl z-30"
              >
                <div className="mono text-[8px] text-neutral-500 text-center mb-2 tracking-widest uppercase">System_Comparison</div>
                {compareData.map((d, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex justify-between mono text-[7px] font-black">
                      <span className="text-cyan-500">{d.a}</span>
                      <span className="text-rose-500">{d.b}</span>
                    </div>
                    <div className="relative h-[2px] bg-white/5 w-full">
                       <div className="absolute inset-y-0 left-0 w-1/2 bg-cyan-500/20" />
                       <div className="absolute inset-y-0 right-0 w-1/2 bg-rose-500/20" />
                    </div>
                    <div className="mono text-[6px] text-neutral-600 text-center uppercase tracking-tighter">{d.label}</div>
                  </div>
                ))}
                {isIntervening && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="pt-2 border-t border-white/5 text-center"
                  >
                    <span className="mono text-[7px] text-rose-400 animate-pulse uppercase">Rec_Engine: OPT_B_SUPERIOR</span>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Choice B */}
        <ChoiceNode 
          label="ULTRA_X9" 
          color="#f43f5e" 
          score={waverScore} 
          onHover={() => handleHover(1)} 
          direction={-1} 
          isActive={lastTarget.current === 1}
        />
      </div>

      {/* Persistence Meter */}
      <div className="absolute bottom-12 w-full max-w-sm px-8">
        <div className="flex justify-between mono text-[8px] text-neutral-600 mb-2 uppercase tracking-widest">
           <span>Conflict_Intensity</span>
           <span>{(waverScore * 100).toFixed(0)}%</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            animate={{ width: `${waverScore * 100}%` }} 
            className={`h-full transition-colors duration-500 ${isIntervening ? 'bg-rose-500' : 'bg-cyan-500'}`}
          />
        </div>
        <p className="mono text-[9px] text-neutral-700 mt-4 text-center leading-relaxed uppercase tracking-widest">
          {isIntervening 
            ? 'CRITICAL_HESITATION: ASSISTANCE_OVERLAY_MANIFESTED' 
            : 'Move_Cursor_Between_Choices_to_Compare_Metrics'}
        </p>
      </div>
    </div>
  );
};

const ChoiceNode = ({ label, color, score, onHover, direction, isActive }: any) => {
  return (
    <motion.div
      onMouseEnter={onHover}
      animate={{
        // Nodes physically pull toward the center based on conflict score
        x: direction * (score * 60),
        scale: isActive ? 1.15 : 1 + (score * 0.05),
        borderColor: isActive ? color : 'rgba(255,255,255,0.05)',
        backgroundColor: isActive ? `${color}11` : 'rgba(23,23,23,0.8)'
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="w-48 h-48 bg-neutral-900 border-2 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer group relative overflow-hidden shadow-2xl backdrop-blur-md"
    >
      <motion.div 
        animate={{ 
          y: score > 0.5 ? [0, -1, 1, 0] : 0,
          opacity: 0.4 + (score * 0.6)
        }}
        transition={{ repeat: Infinity, duration: 0.1 }}
        className="text-3xl font-black italic tracking-tighter z-10"
        style={{ color: isActive ? '#fff' : '#444' }}
      >
        {label}
      </motion.div>
      
      <div className="absolute bottom-6 inset-x-8 h-0.5 bg-white/5 overflow-hidden">
        <motion.div 
          animate={{ width: isActive ? '100%' : '0%' }}
          className="h-full"
          style={{ backgroundColor: color }}
        />
      </div>

      {/* Internal Jitter Overlay */}
      {score > 0.6 && (
        <motion.div 
          animate={{ 
            opacity: [0, 0.15, 0],
            backgroundColor: color 
          }}
          transition={{ repeat: Infinity, duration: 0.05 }}
          className="absolute inset-0 pointer-events-none"
        />
      )}

      {/* Proximity Ambient Glow */}
      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 blur-3xl pointer-events-none"
            style={{ backgroundColor: color }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default IndecisionSyncDemo;
