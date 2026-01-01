import React from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Activity, Cpu, Layers, MousePointer2, Zap, Wind, ShieldCheck, Terminal } from 'lucide-react';

const KineticGrid = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div onMouseMove={handleMouseMove} className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div className="grid grid-cols-12 gap-1 w-full h-full p-4">
        {[...Array(144)].map((_, i) => (
          <Node key={i} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>
    </div>
  );
};

const Node = ({ mouseX, mouseY }: any) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const springX = useSpring(0);
  const springY = useSpring(0);

  React.useEffect(() => {
    return mouseX.on('change', (latestX: number) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const dx = latestX - (rect.left + rect.width / 2);
      const dy = mouseY.get() - (rect.top + rect.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const power = Math.max(0, 1 - dist / 400);
      springX.set(dx * power * 0.1);
      springY.set(dy * power * 0.1);
    });
  }, [mouseX, mouseY, springX, springY]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className="w-1 h-1 bg-cyan-500/40 rounded-full"
    />
  );
};

const Hero: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="relative">
      {/* SECTION 1: HERO COMMAND CENTER */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden border-b border-white/5">
        <KineticGrid />
        
        <motion.div style={{ opacity, scale }} className="z-10 text-center px-6">
          <div className="flex items-center justify-center gap-4 mb-10">
            <Terminal size={14} className="text-cyan-500" />
            <span className="mono text-[10px] tracking-[1.2em] text-cyan-500 font-black uppercase">Kernel_Access_v9.0</span>
          </div>

          <h1 className="text-[14vw] lg:text-[10rem] font-black tracking-tighter leading-[0.8] mb-12 italic uppercase select-none">
            Kinetic<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>Structures</span>
          </h1>

          <p className="max-w-3xl mx-auto text-2xl text-neutral-400 font-light leading-relaxed mb-20">
            A design laboratory for <span className="text-white font-bold italic underline decoration-cyan-500 underline-offset-8">living interfaces</span>. 
            We replace binary transitions with physical momentum and temporal entropy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
            <button
              onClick={onStart}
              className="px-20 py-8 bg-white text-black font-black italic mono text-xs tracking-[0.5em] hover:bg-cyan-400 transition-colors uppercase relative group"
            >
              <div className="absolute inset-0 border-4 border-black/10 scale-95 group-hover:scale-100 transition-transform" />
              Access_Laboratory
            </button>
            <div className="flex items-center gap-6 px-10 py-8 border border-white/5 bg-neutral-900/40 rounded-sm mono text-[10px] text-neutral-500 tracking-widest uppercase">
              <div className="flex gap-1">
                 {[...Array(4)].map((_, i) => (
                   <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }} className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                 ))}
              </div>
              Telemetry_Sync: ACTIVE
            </div>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 mono text-[10px] text-neutral-700 tracking-[1em] uppercase"
        >
          Scroll_to_explore
        </motion.div>
      </section>

      {/* SECTION 2: THE THREE PILLARS */}
      <section className="py-60 px-6 border-b border-white/5 bg-[#030303] relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <motion.div 
              whileHover={{ y: -20 }}
              className="p-16 bg-neutral-900/40 border border-white/5 rounded-[3rem] group hover:border-cyan-500/20 transition-all"
            >
              <Wind className="text-cyan-500 mb-10" size={48} />
              <h3 className="text-4xl font-black italic tracking-tighter uppercase mb-6">Elastic_Inertia</h3>
              <p className="text-neutral-500 text-lg leading-relaxed font-light">
                Components settle with biological damping constants. Every movement feels grounded in a physical medium, not a flat pixel-grid.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -20 }}
              className="p-16 bg-neutral-900/40 border border-white/5 rounded-[3rem] group hover:border-cyan-500/20 transition-all"
            >
              <MousePointer2 className="text-cyan-500 mb-10" size={48} />
              <h3 className="text-4xl font-black italic tracking-tighter uppercase mb-6">Intent_Vect</h3>
              <p className="text-neutral-500 text-lg leading-relaxed font-light">
                The engine monitors cursor velocity and proximity to preemptively reveal interactive depth before the user even clicks.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -20 }}
              className="p-16 bg-neutral-900/40 border border-white/5 rounded-[3rem] group hover:border-cyan-500/20 transition-all"
            >
              <Activity className="text-cyan-500 mb-10" size={48} />
              <h3 className="text-4xl font-black italic tracking-tighter uppercase mb-6">Entropy_Cycle</h3>
              <p className="text-neutral-500 text-lg leading-relaxed font-light">
                UI states age and degrade over time. Inactivity causes dissolution into visual noise, requiring user energy to rematerialize.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SYSTEM INTEGRITY */}
      <section className="py-60 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-32">
          <div className="flex-1 space-y-12">
            <h2 className="text-8xl font-black italic tracking-tighter uppercase leading-none">Built for<br /><span className="text-cyan-500">Stability</span></h2>
            <p className="text-2xl text-neutral-400 font-light leading-relaxed">
              Experimental doesn't mean fragile. Every primitive is rigorously tested across hardware buffers to ensure 60FPS precision.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10">
              {[
                { icon: <Cpu size={24} />, text: 'GPU-Accelerated pipelines' },
                { icon: <ShieldCheck size={24} />, text: 'Inclusive motion specs' },
                { icon: <Layers size={24} />, text: 'Z-Stratified rendering' },
                { icon: <Zap size={24} />, text: 'Adaptive entropy gates' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 mono text-[12px] tracking-[0.3em] text-neutral-300 uppercase">
                  <div className="p-4 bg-white/5 rounded-2xl text-cyan-500">{item.icon}</div> {item.text}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-[500px] aspect-[4/5] bg-neutral-950 border-2 border-white/10 rounded-[5rem] p-20 relative overflow-hidden flex flex-col justify-center gap-12 group">
             <div className="absolute inset-0 bg-cyan-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="h-3 w-full bg-white/5 rounded-full" />
             <div className="h-3 w-2/3 bg-white/5 rounded-full" />
             <motion.div 
              animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
              transition={{ rotate: { duration: 15, repeat: Infinity, ease: 'linear' }, scale: { duration: 4, repeat: Infinity } }}
              className="w-32 h-32 border-4 border-dashed border-cyan-500/40 rounded-full mx-auto flex items-center justify-center relative"
             >
                <div className="w-4 h-4 bg-cyan-500 rounded-full shadow-[0_0_30px_cyan]" />
             </motion.div>
             <div className="h-3 w-full bg-white/5 rounded-full" />
             <div className="h-3 w-1/2 bg-white/5 rounded-full" />
             <div className="mono text-[10px] text-neutral-700 text-center uppercase tracking-widest">Diagnostic_Node_Active</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;