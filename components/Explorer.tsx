
import React from 'react';
import { motion } from 'framer-motion';
import { ComponentMeta } from '../types';
import MomentumTriggerDemo from './demos/MomentumTriggerDemo';
import KineticLoadersDemo from './demos/KineticLoadersDemo';
import LuminanceMassDemo from './demos/LuminanceMassDemo';
// Fix: Added missing TemporalTrailDemo import
import TemporalTrailDemo from './demos/TemporalTrailDemo';

interface ExplorerProps {
  components: ComponentMeta[];
  onSelect: (comp: ComponentMeta) => void;
}

// Fix: Added React namespace and fulfilled switch cases
const SimulationRouter: React.FC<{ id: string }> = ({ id }) => {
  switch (id) {
    case 'kinetic-loaders': return <KineticLoadersDemo />;
    case 'temporal-trail': return <TemporalTrailDemo />;
    case 'momentum-trigger': return <MomentumTriggerDemo />;
    case 'luminance-mass': return <LuminanceMassDemo />;
    default: return <div className="text-neutral-700 mono text-[10px]">SIM_OFFLINE</div>;
  }
};

const Explorer: React.FC<ExplorerProps> = ({ components, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {components.map((comp) => (
        <motion.div 
          key={comp.id}
          whileHover={{ y: -10 }}
          onClick={() => onSelect(comp)}
          className="bg-neutral-900/40 border border-white/5 rounded-[2.5rem] p-8 hover:border-cyan-500/30 transition-all group cursor-pointer flex flex-col"
        >
          <div className="h-48 mb-8 rounded-[2rem] bg-black/40 overflow-hidden flex items-center justify-center relative">
             <div className="absolute top-4 left-4 mono text-[8px] text-neutral-800 uppercase tracking-widest">
                Node_Simulation::{comp.id}
             </div>
             <SimulationRouter id={comp.id} />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-black italic tracking-tighter uppercase">{comp.name}</h3>
              <span className="mono text-[9px] text-cyan-500 border border-cyan-500/20 px-3 py-1 rounded-full">{comp.category}</span>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed font-light line-clamp-2">{comp.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Fix: Added missing default export
export default Explorer;
