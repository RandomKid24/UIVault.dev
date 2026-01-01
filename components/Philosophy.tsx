
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Eye, Wind, Zap, Box, MousePointer, Activity, ShieldCheck, Cpu, BrainCircuit } from 'lucide-react';

const Philosophy: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-24 px-8 space-y-40 pb-64">
      {/* MANIFESTO HEADER */}
      <section className="space-y-12">
        <div className="flex items-center gap-6">
           <div className="w-16 h-[1px] bg-cyan-500" />
           <span className="mono text-[11px] text-cyan-500 font-black tracking-[0.8em] uppercase">Laboratory_Manifesto_v1.5</span>
        </div>
        <h2 className="text-9xl font-black tracking-tighter italic leading-none uppercase">Technical_<span className="text-cyan-500">Manifesto</span></h2>
        <p className="text-3xl font-light text-neutral-400 leading-tight max-w-4xl">
          We are documenting a new standard for <span className="text-white font-bold underline decoration-cyan-500 underline-offset-8">sensory interaction</span>. 
          The web should not be a series of flat planes, but a physical field of energy and consequence.
        </p>
      </section>

      {/* PILLARS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { icon: <Wind size={32} />, title: 'Elastic_Inertia', desc: 'Resistance to movement creates a sense of reality. Components settle with "damping" constants calibrated to biological rhythms.' },
          { icon: <Eye size={32} />, title: 'Approximation_Reveal', desc: 'Fidelity is earned. Data starts blurred or scrambled and solidifies as the user cursor stabilizes and increases focus.' },
          { icon: <Zap size={32} />, title: 'Photonic_Volume', desc: 'We represent data magnitude via light spill and volumetric glow. High-priority items emit more luminance than low-impact logs.' },
          { icon: <Terminal size={32} />, title: 'Rigid_Entropy', desc: 'Layouts are not static. They compact under high volume and expand during discovery, mimicking tectonic movement.' }
        ].map((item, idx) => (
          <motion.div 
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-16 bg-neutral-900/40 border border-white/5 rounded-[3.5rem] space-y-8 group hover:border-cyan-500/20 transition-all duration-700"
          >
            <div className="text-cyan-500 bg-cyan-500/5 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">{item.icon}</div>
            <h3 className="text-4xl font-black italic tracking-tighter uppercase">{item.title}</h3>
            <p className="text-neutral-500 leading-relaxed text-lg font-light">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* THE PHYSICS OF INTENT */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
         <div className="space-y-12">
            <h3 className="text-6xl font-black italic tracking-tighter uppercase leading-none">The Physics<br />of <span className="text-cyan-500 italic">Intent</span></h3>
            <div className="space-y-8 text-neutral-400 font-light text-xl leading-relaxed">
               <p>Traditional UX is binary: <span className="mono text-xs text-white bg-white/5 px-2 py-1">{"if (hover) { showState }"}</span>. This is an obsolete model for immersive experiences.</p>
               <p>Our engine uses <span className="text-white font-bold italic">Proximity Vector Analysis</span>. As a cursor approaches a target, we calculate both the velocity and the angle. A high-velocity direct approach triggers "Critical Engagement" states, where hit-boxes grow and luminance increases prematurely to meet user intent.</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
               {[
                 { icon: <MousePointer size={20} />, label: 'Velocity' },
                 { icon: <Activity size={20} />, label: 'Damping' },
                 { icon: <ShieldCheck size={20} />, label: 'Integrity' }
               ].map((item, i) => (
                 <div key={i} className="p-8 border border-white/5 rounded-3xl bg-neutral-900/20 flex flex-col items-center gap-3">
                    <div className="text-cyan-500">{item.icon}</div>
                    <span className="mono text-[9px] font-black uppercase tracking-widest">{item.label}</span>
                 </div>
               ))}
            </div>
         </div>
         <div className="p-16 bg-black border-4 border-white/5 rounded-[5rem] relative overflow-hidden">
            <div className="absolute top-10 left-10 mono text-[10px] text-cyan-900 font-black uppercase tracking-[1em]">Engine_Kernel_Source</div>
            <pre className="text-neutral-700 text-xs leading-relaxed font-mono mt-12">
{`// uivault.dev_CORE_PROCESSOR_v4
const processIntent = (vector, mass) => {
  const dist = vector.getMagnitude();
  const v = vector.getVelocity();
  
  // Calculate potential energy field
  const potential = (1 / dist) * (v ** 2);
  
  // If energy > threshold, trigger state shift
  if (potential > system.engageLimit) {
    return {
      scale: 1 + (v * 0.1),
      glow: Math.min(1, potential),
      blur: 0
    };
  }
};`}
            </pre>
            <div className="mt-12 h-1 w-full bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 animate={{ x: ['-100%', '100%'] }} 
                 transition={{ repeat: Infinity, duration: 3, ease: 'linear' }} 
                 className="h-full bg-cyan-500 w-1/4 shadow-[0_0_20px_cyan]" 
               />
            </div>
         </div>
      </section>

      {/* COGNITIVE LOAD BALANCING (NEW) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="order-2 lg:order-1 p-16 bg-neutral-900/80 border border-white/10 rounded-[5rem] flex flex-col gap-8">
           <div className="flex gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex-1 h-20 bg-neutral-800 rounded-2xl relative overflow-hidden">
                   <motion.div 
                    animate={{ height: ['10%', '60%', '10%'] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                    className="absolute bottom-0 inset-x-0 bg-cyan-500/20" 
                   />
                </div>
              ))}
           </div>
           <div className="space-y-4">
              <div className="h-2 w-full bg-white/5 rounded-full" />
              <div className="h-2 w-3/4 bg-white/5 rounded-full" />
              <div className="h-2 w-1/2 bg-white/5 rounded-full" />
           </div>
           <div className="text-center">
              <span className="mono text-[10px] text-neutral-600 uppercase font-black">Syncing_Neural_Load...</span>
           </div>
        </div>
        <div className="order-1 lg:order-2 space-y-12">
           <h3 className="text-6xl font-black italic tracking-tighter uppercase leading-none">Cognitive<br /><span className="text-cyan-500 italic">Load_Sync</span></h3>
           <p className="text-2xl text-neutral-400 font-light leading-relaxed">
             uivault.dev dynamically adjusts animation complexity based on session duration and interaction frequency. 
             If the system detects high-frequency "panic" movements, it simplifies the visual language to prioritize semantic clarity over atmospheric depth.
           </p>
           <ul className="space-y-6">
              <li className="flex items-center gap-4">
                <div className="p-3 bg-cyan-500 rounded-xl text-black"><BrainCircuit size={20} /></div>
                <span className="mono text-xs tracking-widest text-white uppercase font-bold">Neural Thresholding</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl text-cyan-500"><Zap size={20} /></div>
                <span className="mono text-xs tracking-widest text-neutral-500 uppercase font-bold">Interaction Frequency decay</span>
              </li>
           </ul>
        </div>
      </section>

      {/* TECH SPECS */}
      <section className="bg-neutral-900/60 p-20 rounded-[5rem] border border-white/5 space-y-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-[0.02]">
           <Cpu size={300} className="text-white" />
        </div>
        <h3 className="text-5xl font-black italic tracking-tighter uppercase leading-none">System_Architecture</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
           <div className="space-y-4">
              <h5 className="mono text-[10px] font-black uppercase text-cyan-500 tracking-widest flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full" /> Stability_Metrics
              </h5>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                All components use hardware acceleration. By offloading physics calculations to the GPU via transform-3D and composite layers, we maintain 60FPS even under heavy entropy loads.
              </p>
           </div>
           <div className="space-y-4">
              <h5 className="mono text-[10px] font-black uppercase text-cyan-500 tracking-widest flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full" /> Inclusive_Design
              </h5>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                Motion is not just flavor. We follow WCAG guidelines for reduced motion. System-wide "Reduced Motion" flags automatically convert elastic transitions into high-fidelity opacity clips.
              </p>
           </div>
           <div className="space-y-4">
              <h5 className="mono text-[10px] font-black uppercase text-cyan-500 tracking-widest flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full" /> Garbage_Collection
              </h5>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                The laboratory uses an "Activity Decay" collector. Previews and modules that are off-screen for more than 3 seconds are unmounted to preserve device memory.
              </p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Philosophy;
