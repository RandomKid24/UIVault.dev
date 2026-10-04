import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LiquidTabDemo = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['STRATA', 'VECT', 'LOGIC', 'BIO'];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-950 gap-16 overflow-hidden">
      <div className="text-center">
        <h4 className="text-3xl font-black italic tracking-tighter text-white">Fluid_Context</h4>
        <p className="mono text-[9px] text-neutral-600 mt-2 uppercase tracking-[0.6em]">Gooey_State_Displacement</p>
      </div>

      <div className="relative">
        {/* The Liquid Container (Apply Gooey Filter here) */}
        <div className="flex gap-4 p-2 bg-neutral-900 border border-white/5 rounded-full relative z-10" style={{ filter: 'url(#goo)' }}>
          
          {/* Active Liquid Indicator */}
          <motion.div
            animate={{ x: activeTab * 88 }}
            transition={{ type: 'spring', stiffness: 100, damping: 12 }}
            className="absolute top-2 left-2 w-20 h-10 bg-cyan-500 rounded-full"
          />

          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className="relative z-20 w-20 h-10 mono text-[9px] font-black tracking-widest transition-colors duration-500 focus:outline-none"
              style={{ color: activeTab === i ? 'black' : 'white' }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* SVG Filter for Gooey Effect */}
        <svg className="hidden">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
      </div>

      <div className="grid grid-cols-4 gap-2 w-full max-w-sm px-8">
        {tabs.map((_, i) => (
          <div key={i} className={`h-1 rounded-full transition-all duration-700 ${activeTab === i ? 'bg-cyan-500 w-full' : 'bg-white/5 w-2'}`} />
        ))}
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-700 uppercase">
        TAB TRANSITIONS ARE NOT CLIPS. THEY ARE VOLUMETRIC DISPLACEMENTS OF A UNIFIED SYSTEM MEDIUM.
      </div>
    </div>
  );
};

export default LiquidTabDemo;