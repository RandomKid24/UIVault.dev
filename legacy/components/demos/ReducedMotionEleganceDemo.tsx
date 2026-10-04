
import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ReducedMotionEleganceDemo = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: 'CORE_SYSTEM', content: 'Inertia-driven data architecture with high-fidelity signal processing.' },
    { title: 'BIO_STREAM', content: 'Synthetic biological telemetry mapping for human-computer interfaces.' },
    { title: 'LOG_ARCHIVE', content: 'Immutable temporal records stored across a decentralized logic grid.' }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-neutral-950/40 space-y-12">
      <div className="text-center space-y-2">
        <h4 className="text-3xl font-black italic tracking-tighter">INCLUSIVE_MOTION</h4>
        <p className="mono text-[9px] text-neutral-500 uppercase tracking-widest">
          {shouldReduceMotion ? 'REDUCED_MOTION_MODE_ACTIVE' : 'FULL_KINETIC_MODE_ACTIVE'}
        </p>
      </div>

      <div className="w-full max-w-xl">
        <div className="flex gap-1 mb-8">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`flex-1 py-4 mono text-[10px] font-bold tracking-widest transition-all ${
                activeTab === i ? 'bg-cyan-500 text-black' : 'bg-white/5 text-neutral-500 hover:bg-white/10'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="relative h-48 border border-white/10 rounded-2xl overflow-hidden p-8">
          {tabs.map((tab, i) => (
            <motion.div
              key={i}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
              animate={{ 
                opacity: activeTab === i ? 1 : 0, 
                x: activeTab === i ? 0 : (shouldReduceMotion ? 0 : 20),
                clipPath: activeTab === i 
                  ? 'inset(0% 0% 0% 0%)' 
                  : 'inset(0% 0% 0% 100%)' 
              }}
              transition={{ 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1],
                opacity: { duration: 0.5 }
              }}
              className="absolute inset-0 p-8 flex flex-col justify-center"
            >
              <h3 className="text-2xl font-black italic mb-4 text-cyan-500">{tab.title}</h3>
              <p className="text-neutral-400 font-light leading-relaxed">{tab.content}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mono text-[9px] text-neutral-600 max-w-xs text-center leading-relaxed">
        Toggle "Reduce Motion" in your OS settings to observe the adaptive behavior change from translations to pure clip-reveals.
      </div>
    </div>
  );
};

export default ReducedMotionEleganceDemo;
