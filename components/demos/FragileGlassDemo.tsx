import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FragileGlassDemo = () => {
  const [isBroken, setIsBroken] = useState(false);
  const [shards, setShards] = useState<any[]>([]);

  const shatter = (e: React.MouseEvent) => {
    if (isBroken) return;
    setIsBroken(true);
    
    // Generate random shards
    const newShards = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      rotate: Math.random() * 360,
      size: 20 + Math.random() * 40
    }));
    setShards(newShards);

    // Auto-repair after 3 seconds
    setTimeout(() => {
      setIsBroken(false);
      setShards([]);
    }, 3000);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-950 overflow-hidden relative">
      <AnimatePresence>
        {!isBroken ? (
          <motion.div
            key="solid"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            onClick={shatter}
            className="w-64 h-80 bg-white/5 border border-white/20 rounded-3xl backdrop-blur-xl flex flex-col items-center justify-center p-12 cursor-pointer group hover:bg-white/10 transition-colors"
          >
             <div className="w-16 h-1 bg-cyan-500 mb-8" />
             <h3 className="text-4xl font-black italic tracking-tighter text-white uppercase text-center leading-none">PRISTINE_DATA</h3>
             <p className="mono text-[8px] text-neutral-600 mt-6 tracking-[0.5em] uppercase">Click_to_Impact</p>
             <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
          </motion.div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            {shards.map((shard) => (
              <motion.div
                key={shard.id}
                initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                animate={{ 
                  x: shard.x, 
                  y: shard.y + 200, 
                  rotate: shard.rotate,
                  opacity: 0
                }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute bg-white/10 border border-white/20 backdrop-blur-md"
                style={{ 
                  width: shard.size, 
                  height: shard.size,
                  clipPath: `polygon(${Math.random()*100}% ${Math.random()*100}%, ${Math.random()*100}% ${Math.random()*100}%, ${Math.random()*100}% ${Math.random()*100}%)`
                }}
              />
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mono text-[10px] text-cyan-500 animate-pulse tracking-widest"
            >
              REPAIRING_STRUCTURAL_INTEGRITY...
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-8 text-center max-w-xs mono text-[8px] text-neutral-800 uppercase tracking-widest">
        ANTI-UI_PATTERN: FRAGILITY. ACTIONS HAVE CONSEQUENCES.
      </div>
    </div>
  );
};

export default FragileGlassDemo;
