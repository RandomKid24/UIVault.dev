
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ComponentMeta } from '../types';
import MomentumTriggerDemo from './demos/MomentumTriggerDemo';
import KineticLoadersDemo from './demos/KineticLoadersDemo';
import LuminanceMassDemo from './demos/LuminanceMassDemo';
// Fix: Added missing TemporalTrailDemo import
import TemporalTrailDemo from './demos/TemporalTrailDemo';

// Fix: Defined missing DetailViewProps interface
export interface DetailViewProps {
  component: ComponentMeta;
  temporalContext: {
    time: number;
    entropy: number;
    lastActivity: number;
  };
}

// Fix: Added React namespace and props type
const DetailView: React.FC<DetailViewProps> = ({ component, temporalContext }) => {
  const [tab, setTab] = useState<'demo' | 'code' | 'docs'>('demo');

  // Fix: Fulfilled switch cases for component demos
  const renderDemo = () => {
    switch (component.id) {
      case 'kinetic-loaders': return <KineticLoadersDemo />;
      case 'temporal-trail': return <TemporalTrailDemo />;
      case 'momentum-trigger': return <MomentumTriggerDemo />;
      case 'luminance-mass': return <LuminanceMassDemo />;
      default: return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-8">
        <div className="aspect-video bg-neutral-950 border border-white/10 rounded-[4rem] overflow-hidden flex items-center justify-center relative">
          <div className="absolute top-8 left-8 flex items-center gap-2 mono text-[10px] text-neutral-600">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span>LAB_SIMULATION_ACTIVE</span>
          </div>
          {renderDemo()}
        </div>

        <div className="bg-neutral-900/20 border border-white/5 rounded-[3rem] p-12 space-y-6">
          <h3 className="text-4xl font-black italic tracking-tighter uppercase">Description</h3>
          <p className="text-neutral-400 leading-relaxed font-light text-xl">
            {component.description}
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-neutral-900/40 border border-white/5 rounded-[3rem] p-10 space-y-10">
          <div>
            <span className="mono text-[10px] text-cyan-500 uppercase tracking-widest block mb-3">Category</span>
            <div className="text-3xl font-black uppercase italic">{component.category}</div>
          </div>
          <div>
            <span className="mono text-[10px] text-cyan-500 uppercase tracking-widest block mb-3">Interaction Model</span>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">{component.interactionModel}</p>
          </div>
          <div>
            <span className="mono text-[10px] text-cyan-500 uppercase tracking-widest block mb-3">Motion Logic</span>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">{component.motionLogic}</p>
          </div>
          <div>
            <span className="mono text-[10px] text-cyan-500 uppercase tracking-widest block mb-3">Difficulty</span>
            <div className="flex gap-2 mt-2">
              {['low', 'medium', 'high'].map((d) => (
                <div 
                  key={d} 
                  className={`h-2 flex-1 rounded-full ${component.difficulty === d ? 'bg-cyan-500 shadow-[0_0_10px_cyan]' : 'bg-white/5'}`} 
                />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-neutral-900/20 border border-white/5 rounded-[3rem] p-10">
          <h4 className="mono text-[10px] text-neutral-500 uppercase tracking-widest mb-8">Use_Cases</h4>
          <ul className="space-y-6">
            {component.useCases.map((u, i) => (
              <li key={i} className="flex items-start gap-4 text-sm text-neutral-400 font-light">
                <div className="w-2 h-2 bg-cyan-500/40 rounded-full mt-1" />
                {u}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Fix: Added missing default export
export default DetailView;
