import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BioProfileDemo = () => {
  const users = [
    { name: 'KINETIC_OBSERVER_01', role: 'CORE_ENGINEER', energy: 0.8 },
    { name: 'NULL_REACHER_A', role: 'STRATA_ARCHITECT', energy: 0.2 },
    { name: 'SIGNAL_VOX', role: 'AUDIT_LOGIC', energy: 0.5 }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-950 overflow-hidden gap-16 relative">
      <div className="text-center z-10">
        <h4 className="text-3xl font-black italic tracking-tighter text-white uppercase leading-none">Identity_Fields</h4>
        <p className="mono text-[9px] text-neutral-700 mt-2 uppercase tracking-[0.5em]">Activity-Energy_Heatmapping</p>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-sm">
        {users.map((user, i) => (
          <UserProfile key={i} user={user} />
        ))}
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-800 leading-relaxed uppercase">
        USER IDENTITY IS NOT A STATIC ROW. IT IS AN ENERGY FIELD THAT REACTS TO PRESENCE, TELEMETRY, AND COGNITIVE LOAD.
      </div>
    </div>
  );
};

// Fix: Explicitly typing as React.FC to handle React-reserved 'key' prop correctly in the type system
const UserProfile: React.FC<{ user: any }> = ({ user }) => {
  const [isEngaged, setIsEngaged] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsEngaged(true)}
      onMouseLeave={() => setIsEngaged(false)}
      animate={{ 
        x: isEngaged ? 10 : 0,
        backgroundColor: isEngaged ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)'
      }}
      className="p-6 border border-white/5 rounded-[2rem] flex items-center gap-6 cursor-default transition-colors group"
    >
      {/* Bio-Avatar */}
      <div className="relative w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
        <motion.div 
          animate={{ 
            scale: isEngaged ? 2 : 1,
            opacity: isEngaged ? 0.4 : 0.1,
            backgroundColor: user.energy > 0.5 ? '#06b6d4' : '#fbbf24'
          }}
          className="absolute inset-0 blur-xl"
        />
        <div className="relative z-10 w-8 h-8 border-2 border-white/20 rounded-full flex items-center justify-center bg-black/40">
           <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-cyan-500 transition-colors shadow-[0_0_10px_white]" />
        </div>
      </div>

      <div className="flex-1">
        <h5 className="text-xl font-black italic tracking-tighter text-white uppercase group-hover:text-cyan-500 transition-colors leading-none">
          {user.name}
        </h5>
        <div className="flex items-center gap-4 mt-2">
           <span className="mono text-[8px] text-neutral-600 font-bold tracking-widest uppercase">{user.role}</span>
           <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: `${user.energy * 100}%` }}
                className="h-full bg-neutral-700 group-hover:bg-cyan-900 transition-colors"
              />
           </div>
        </div>
      </div>

      <div className="w-2 h-2 rounded-full bg-white/5 group-hover:bg-cyan-500 animate-pulse transition-colors" />
    </motion.div>
  );
};

export default BioProfileDemo;