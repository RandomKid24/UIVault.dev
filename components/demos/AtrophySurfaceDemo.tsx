import React from 'react';
import { motion } from 'framer-motion';

const AtrophySurfaceDemo = ({ temporal }: any) => {
  const { entropy = 0, lastActivity = Date.now() } = temporal || {};
  
  const [atrophyLevel, setAtrophyLevel] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const idleTime = (Date.now() - lastActivity) / 1000;
      setAtrophyLevel(Math.min(1, (idleTime * (1 + entropy * 5)) / 15));
    }, 100);
    return () => clearInterval(interval);
  }, [lastActivity, entropy]);

  // Clean data-URI without unescaped characters
  const noiseUrl = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-950 overflow-hidden gap-12 group">
      <div className="text-center z-10">
        <h4 className="text-3xl font-black italic tracking-tighter uppercase text-white">Atmospheric_Decay</h4>
        <p className={`mono text-[9px] mt-2 uppercase tracking-widest transition-colors duration-1000 ${atrophyLevel > 0.5 ? 'text-rose-500' : 'text-cyan-500'}`}>
          COHERENCE_LEVEL: {((1 - atrophyLevel) * 100).toFixed(0)}%
        </p>
      </div>

      <motion.div
        animate={{ 
          filter: `blur(${atrophyLevel * 16}px) contrast(${1 - atrophyLevel * 0.4}) grayscale(${atrophyLevel})`,
          opacity: 1 - atrophyLevel * 0.7,
          scale: 1 - atrophyLevel * 0.05
        }}
        className="relative w-80 h-96 bg-neutral-900 border-2 border-white/5 flex flex-col items-center justify-center p-12 gap-8 shadow-2xl overflow-hidden"
      >
        <div className="w-24 h-24 border-8 border-cyan-500/20 rounded-full flex items-center justify-center relative">
           <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 border-t-4 border-cyan-500 rounded-full" 
           />
           <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_20px_white]" />
        </div>

        <div className="space-y-4 w-full">
          <div className="h-4 w-3/4 bg-white/10 mx-auto rounded" />
          <div className="h-2 w-full bg-white/5 rounded" />
          <div className="h-2 w-1/2 bg-white/5 mx-auto rounded" />
        </div>

        {/* Improved Noise Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-700 mix-blend-overlay"
          style={{ 
            opacity: atrophyLevel * 0.6,
            backgroundImage: noiseUrl,
            backgroundSize: '200px'
          }}
        />
      </motion.div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-600 leading-relaxed uppercase">
        {atrophyLevel > 0.8 ? "WARNING: INTERFACE_DISSOLVING_INTO_STATIC" : "MOVE_CURSOR_TO_REESTABLISH_COHERENCE"}
      </div>
    </div>
  );
};

export default AtrophySurfaceDemo;