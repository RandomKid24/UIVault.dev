import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TectonicAccordionDemo = () => {
  const [active, setActive] = useState<number | null>(0);

  const sections = [
    { title: 'CORE_STRATA', desc: 'The base layer of environmental coherence.' },
    { title: 'VECT_FORCE', desc: 'Active momentum mapping for intent detection.' },
    { title: 'SIGNAL_VOICE', desc: 'Procedural auditory feedback loops.' },
    { title: 'ETHOS_LOGIC', desc: 'System governance under high entropy.' }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-950 overflow-hidden gap-12">
      <div className="text-center">
        <h4 className="text-3xl font-black italic tracking-tighter text-white">Tectonic_Rift</h4>
        <p className="mono text-[9px] text-neutral-600 mt-2 uppercase tracking-[0.6em]">Collision-Based_Reveals</p>
      </div>

      <div className="flex flex-col w-full max-w-md gap-2">
        {sections.map((sec, i) => (
          <motion.div
            key={i}
            onClick={() => setActive(active === i ? null : i)}
            animate={{ 
              height: active === i ? 200 : 60,
              y: active !== null && i > active ? 10 : 0,
              scale: active === i ? 1.02 : 1,
              backgroundColor: active === i ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.02)'
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className={`cursor-pointer border border-white/5 rounded-2xl overflow-hidden flex flex-col p-6 group transition-colors ${active === i ? 'text-black' : 'text-white'}`}
          >
            <div className="flex justify-between items-center h-8">
              <h5 className="text-xl font-black italic tracking-tighter uppercase">{sec.title}</h5>
              <div className={`w-2 h-2 rounded-full ${active === i ? 'bg-black animate-pulse' : 'bg-white/10 group-hover:bg-cyan-500'}`} />
            </div>
            
            <motion.div 
              animate={{ opacity: active === i ? 1 : 0, y: active === i ? 0 : 20 }}
              className="mt-6"
            >
              <p className="text-sm font-light leading-relaxed">{sec.desc}</p>
              <div className="mt-8 flex gap-2">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="w-8 h-1 bg-black/10 rounded-full" />
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-800 leading-relaxed uppercase">
        LAYERS DO NOT JUST SLIDE. THEY ACT AS PHYSICAL MASSES THAT DISPLACE OTHERS, RECALCULATING THE LAYOUT TOPOLOGY ON EVERY INTERACTION.
      </div>
    </div>
  );
};

export default TectonicAccordionDemo;