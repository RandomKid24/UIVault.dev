import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PortalBranchDemo = () => {
  const [active, setActive] = useState<string | null>(null);

  const branches = [
    { id: 'ALPHA', label: 'STRATA', color: '#06b6d4' },
    { id: 'BETA', label: 'VECT', color: '#3b82f6' },
    { id: 'GAMMA', label: 'VOID', color: '#8b5cf6' }
  ];

  return (
    <div className="w-full h-full flex items-center justify-center p-12 bg-neutral-950 overflow-hidden relative">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Origin Node */}
        <motion.div 
          onClick={() => setActive(active ? null : 'origin')}
          className="relative z-50 w-24 h-24 rounded-full bg-white flex items-center justify-center cursor-pointer group border-4 border-cyan-500 shadow-[0_0_40px_rgba(6,182,212,0.3)]"
        >
          <div className="mono text-[10px] font-black text-black group-hover:scale-125 transition-transform tracking-tighter italic">CORE</div>
        </motion.div>

        {/* Branches */}
        <AnimatePresence>
          {active && branches.map((b, i) => {
            const angle = (i / branches.length) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(angle) * 160;
            const y = Math.sin(angle) * 160;
            
            return (
              <React.Fragment key={b.id}>
                {/* Connector Line */}
                <motion.div
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  style={{ 
                    position: 'absolute',
                    width: 160,
                    height: 2,
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    rotate: `${(angle * 180) / Math.PI}deg`,
                    transformOrigin: 'left center'
                  }}
                  className="z-0"
                />
                
                {/* Branch Node */}
                <motion.div
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{ scale: 1, x, y }}
                  exit={{ scale: 0, x: 0, y: 0 }}
                  whileHover={{ scale: 1.2 }}
                  className="absolute z-10 w-16 h-16 rounded-xl bg-neutral-900 border-2 border-white/20 flex items-center justify-center cursor-pointer group"
                  style={{ borderColor: b.color }}
                >
                  <span className="mono text-[8px] font-black group-hover:text-white transition-colors">{b.label}</span>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-full" />
                </motion.div>
              </React.Fragment>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="absolute top-12 left-12 text-left">
        <h4 className="text-2xl font-black italic tracking-tighter uppercase leading-none">Branching_Intent</h4>
        <p className="mono text-[8px] text-neutral-600 mt-2 uppercase tracking-[0.4em]">Radial_Portal_Mapping</p>
      </div>
    </div>
  );
};

export default PortalBranchDemo;