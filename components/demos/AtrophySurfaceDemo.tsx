
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AtrophySurfaceDemo = ({ temporal }: any) => {
  const { entropy = 0, lastActivity = Date.now() } = temporal || {};
  const [atrophyLevel, setAtrophyLevel] = useState(0);

  // Calculate atrophy based on idle time
  useEffect(() => {
    const interval = setInterval(() => {
      const idleTime = (Date.now() - lastActivity) / 1000;
      // Decay threshold: 10s base, modified by global entropy
      const decayFactor = 10 - (entropy * 5);
      const level = Math.min(1, idleTime / decayFactor);
      setAtrophyLevel(level);
    }, 50);
    return () => clearInterval(interval);
  }, [lastActivity, entropy]);

  // Procedural fragmentation shards
  const shards = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 0.1,
    points: [
      `${Math.random() * 100}% ${Math.random() * 100}%`,
      `${Math.random() * 100}% ${Math.random() * 100}%`,
      `${Math.random() * 100}% ${Math.random() * 100}%`
    ].join(', ')
  })), []);

  const noiseUrl = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-[#020202] overflow-hidden gap-12 relative group select-none">
      {/* HUD Header */}
      <div className="text-center z-50 space-y-2 pointer-events-none">
        <h4 className="text-4xl font-black italic tracking-tighter uppercase text-white">Interface_Atrophy</h4>
        <div className="flex items-center justify-center gap-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ 
                  backgroundColor: atrophyLevel > (i / 5) ? '#f43f5e' : '#06b6d4',
                  opacity: atrophyLevel > (i / 5) ? [0.2, 1, 0.2] : 1
                }}
                className="w-3 h-1 rounded-full" 
              />
            ))}
          </div>
          <p className="mono text-[10px] text-neutral-500 uppercase tracking-[0.4em]">
            COHERENCE: <span className={atrophyLevel > 0.6 ? 'text-rose-500' : 'text-cyan-500'}>{((1 - atrophyLevel) * 100).toFixed(0)}%</span>
          </p>
        </div>
      </div>

      <div className="relative w-80 h-96">
        {/* Chromatic Aberration Shadows (Decay layers) */}
        <motion.div
          animate={{ 
            x: atrophyLevel * 10,
            opacity: atrophyLevel * 0.4,
            filter: `blur(${atrophyLevel * 20}px)`
          }}
          className="absolute inset-0 bg-rose-500/20 rounded-[2rem]"
        />
        <motion.div
          animate={{ 
            x: atrophyLevel * -10,
            opacity: atrophyLevel * 0.4,
            filter: `blur(${atrophyLevel * 20}px)`
          }}
          className="absolute inset-0 bg-cyan-500/20 rounded-[2rem]"
        />

        {/* Main Entity */}
        <motion.div
          animate={{ 
            filter: `blur(${atrophyLevel * 12}px) contrast(${1 + atrophyLevel}) brightness(${1 - atrophyLevel * 0.4})`,
            scale: 1 - atrophyLevel * 0.05,
            rotateX: atrophyLevel * 15,
            rotateY: atrophyLevel * -10,
            y: atrophyLevel * 20
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="relative w-full h-full bg-neutral-900 border-2 border-white/5 rounded-[2rem] flex flex-col p-10 gap-8 shadow-2xl overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Internal Structure */}
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <motion.div 
                animate={{ 
                  rotate: atrophyLevel * 180,
                  scale: 1 - atrophyLevel,
                  opacity: 0.8 - atrophyLevel
                }}
                className="w-4 h-4 border-2 border-cyan-500 rounded-sm" 
              />
            </div>
            <div className="text-right">
              <div className="mono text-[8px] text-neutral-600 mb-1 font-black">MEM_BLOCK_04</div>
              <div className="h-0.5 w-12 bg-white/10 ml-auto" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-8 w-full bg-white/5 rounded-lg overflow-hidden relative">
              <motion.div 
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                className="absolute inset-y-0 w-1/2 bg-cyan-500/10 blur-xl"
              />
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full bg-white/5 rounded" />
              <div className="h-2 w-3/4 bg-white/5 rounded" />
              <div className="h-2 w-1/2 bg-white/5 rounded" />
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
            <span className="mono text-[7px] text-neutral-700">COORD: [44.1, 2.9]</span>
            <div className="flex gap-1">
               {[...Array(3)].map((_, i) => (
                 <div key={i} className="w-1 h-1 bg-white/10 rounded-full" />
               ))}
            </div>
          </div>

          {/* Procedural Fragmentation (Clip-Path "Holes") */}
          {shards.map((shard) => (
            <motion.div
              key={shard.id}
              animate={{ 
                opacity: atrophyLevel > 0.4 ? (atrophyLevel - 0.4) * 2 : 0,
                backgroundColor: '#020202',
              }}
              style={{
                position: 'absolute',
                inset: 0,
                clipPath: `polygon(${shard.points})`,
                pointerEvents: 'none'
              }}
            />
          ))}

          {/* The Static Grid Overload */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000 mix-blend-screen"
            style={{ 
              opacity: atrophyLevel * 0.4,
              backgroundImage: noiseUrl,
              backgroundSize: '150px'
            }}
          />

          {/* Glitch Scanlines */}
          <motion.div 
            animate={{ 
              y: ['0%', '100%'],
              opacity: atrophyLevel * 0.2 
            }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            className="absolute inset-x-0 h-px bg-white/40 pointer-events-none"
          />
        </motion.div>
      </div>

      <div className="max-w-xs text-center z-50">
        <AnimatePresence mode="wait">
          {atrophyLevel > 0.8 ? (
            <motion.div
              key="alert"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="px-6 py-2 bg-rose-500 text-black mono text-[9px] font-black uppercase tracking-[0.3em] rounded-sm"
            >
              System_Dissolving
            </motion.div>
          ) : (
            <motion.p 
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              className="mono text-[9px] text-neutral-600 leading-relaxed uppercase tracking-widest"
            >
              Maintain_Activity_to_Preserve_UI_Integrity
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Background Ambience Labels */}
      <div className="absolute bottom-8 left-8 mono text-[8px] text-neutral-800 space-y-1">
        <div>ENTROPY_STATE: {entropy > 0.5 ? 'VOLATILE' : 'STABLE'}</div>
        <div>IDLE_TICK: {((Date.now() - lastActivity)/1000).toFixed(1)}s</div>
      </div>
    </div>
  );
};

export default AtrophySurfaceDemo;
