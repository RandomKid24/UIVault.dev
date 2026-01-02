
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
        {[...Array(288)].map((_, i) => (
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
      const power = Math.max(0, 1 - dist / 500);
      springX.set(dx * power * 0.15);
      springY.set(dy * power * 0.15);
    });
  }, [mouseX, mouseY, springX, springY]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className="w-1 h-1 bg-cyan-500/30 rounded-full"
    />
  );
};

const Hero: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  return (
    <div className="relative w-full max-w-[1800px] mx-auto">
      {/* SECTION 1: HERO COMMAND CENTER */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden border-b border-white/5 px-4 md:px-0">
        <KineticGrid />
        
        <motion.div style={{ opacity, scale }} className="z-10 text-center w-full">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Terminal size={14} className="text-cyan-500" />
            <span className="mono text-[10px] tracking-[1em] text-cyan-500 font-black uppercase">Kernel_Access_v9.0</span>
          </div>

          <h1 className="text-[18vw] lg:text-[14rem] font-black tracking-tighter leading-[0.75] mb-12 italic uppercase select-none flex flex-col items-center">
            <motion.span initial={{ x: -50 }} animate={{ x: 0 }} className="block">Kinetic</motion.span>
            <motion.span initial={{ x: 50 }} animate={{ x: 0 }} className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>Structures</motion.span>
          </h1>

          <p className="max-w-4xl mx-auto text-xl md:text-3xl text-neutral-400 font-light leading-relaxed mb-16 px-6">
            Deconstructing the binary web into <span className="text-white font-bold italic">living interfaces</span> where physics, 
            momentum, and temporal entropy define the interaction field.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
            <button
              onClick={onStart}
              className="w-full sm:w-auto px-24 py-10 bg-white text-black font-black italic mono text-sm tracking-[0.5em] hover:bg-cyan-400 transition-all uppercase relative group"
            >
              <div className="absolute inset-0 border-4 border-black/10 scale-95 group-hover:scale-100 transition-transform" />
              Access_Laboratory
            </button>
            <div className="flex items-center gap-8 px-12 py-10 border border-white/10 bg-neutral-900/20 backdrop-blur-sm rounded-sm mono text-[10px] text-neutral-500 tracking-widest uppercase">
              <div className="flex gap-1.5">
                 {[...Array(4)].map((_, i) => (
                   <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }} className="w-2 h-2 bg-cyan-500 rounded-full" />
                 ))}
              </div>
              Telemetry: ACTIVE_STABLE
            </div>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 mono text-[10px] text-neutral-700 tracking-[1em] uppercase hidden md:block"
        >
          SCROLL_TO_INITIALIZE
        </motion.div>
      </section>

      {/* SECTION 2: THE THREE PILLARS - Expanded space utilization */}
      <section className="py-48 px-6 lg:px-0 border-b border-white/5 bg-[#030303] relative overflow-hidden">
        <div className="w-full">
          <div className="flex items-center gap-6 mb-24 opacity-30">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white" />
            <span className="mono text-[10px] tracking-[1em] uppercase font-black">Core_Directives</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-12">
            <motion.div 
              whileHover={{ y: -15, backgroundColor: 'rgba(6, 182, 212, 0.03)' }}
              className="p-16 bg-neutral-900/20 border border-white/5 rounded-[4rem] group hover:border-cyan-500/20 transition-all duration-500"
            >
              <div className="w-20 h-20 flex items-center justify-center bg-cyan-500/10 rounded-3xl mb-12 group-hover:scale-110 transition-transform">
                <Wind className="text-cyan-500" size={36} />
              </div>
              <h3 className="text-5xl font-black italic tracking-tighter uppercase mb-8">Elastic_Inertia</h3>
              <p className="text-neutral-500 text-xl leading-relaxed font-light">
                Motion follows non-linear damping. Every transition observes the mass and friction of the digital medium, creating tangible feedback loops.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -15, backgroundColor: 'rgba(6, 182, 212, 0.03)' }}
              className="p-16 bg-neutral-900/20 border border-white/5 rounded-[4rem] group hover:border-cyan-500/20 transition-all duration-500"
            >
              <div className="w-20 h-20 flex items-center justify-center bg-cyan-500/10 rounded-3xl mb-12 group-hover:scale-110 transition-transform">
                <MousePointer2 className="text-cyan-500" size={36} />
              </div>
              <h3 className="text-5xl font-black italic tracking-tighter uppercase mb-8">Intent_Vector</h3>
              <p className="text-neutral-500 text-xl leading-relaxed font-light">
                Pre-emptive state calculation based on cursor velocity. The UI expands its interactive radius to meet user attention halfway.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -15, backgroundColor: 'rgba(6, 182, 212, 0.03)' }}
              className="p-16 bg-neutral-900/20 border border-white/5 rounded-[4rem] group hover:border-cyan-500/20 transition-all duration-500"
            >
              <div className="w-20 h-20 flex items-center justify-center bg-cyan-500/10 rounded-3xl mb-12 group-hover:scale-110 transition-transform">
                <Activity className="text-cyan-500" size={36} />
              </div>
              <h3 className="text-5xl font-black italic tracking-tighter uppercase mb-8">Entropy_Cycle</h3>
              <p className="text-neutral-500 text-xl leading-relaxed font-light">
                Visual states observe the second law of thermodynamics. Interfaces age, blur, and dissolve over time, requiring active engagement to maintain focus.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SYSTEM INTEGRITY - Utilizing full width layout */}
      <section className="py-60 px-6 lg:px-0">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-24 items-center">
          <div className="xl:col-span-7 space-y-12">
            <h2 className="text-[12vw] xl:text-[9rem] font-black italic tracking-tighter uppercase leading-[0.8]">
              High_<br />
              <span className="text-cyan-500">Precision_</span><br />
              Integrity
            </h2>
            <p className="text-3xl text-neutral-400 font-light leading-tight max-w-2xl">
              We offload environmental physics to the GPU, maintaining 60FPS across complex spatial strata.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-8">
              {[
                { icon: <Cpu size={24} />, text: 'Accelerated Pipelines' },
                { icon: <ShieldCheck size={24} />, text: 'Inclusive Motion Specs' },
                { icon: <Layers size={24} />, text: 'Z-Stratified Rendering' },
                { icon: <Zap size={24} />, text: 'Adaptive Flux Gates' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 mono text-[12px] tracking-[0.4em] text-neutral-300 uppercase font-black group">
                  <div className="p-5 bg-neutral-900 border border-white/5 rounded-2xl text-cyan-500 group-hover:border-cyan-500/50 transition-colors">{item.icon}</div> 
                  {item.text}
                </div>
              ))}
            </div>
          </div>
          <div className="xl:col-span-5 h-[700px] bg-neutral-950 border-2 border-white/10 rounded-[6rem] p-16 relative overflow-hidden flex flex-col justify-center gap-16 group shadow-2xl">
             <div className="absolute inset-0 bg-cyan-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
             
             <div className="space-y-6">
                <div className="h-4 w-full bg-white/5 rounded-full relative overflow-hidden">
                  <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 bg-cyan-500/20 w-1/2" />
                </div>
                <div className="h-4 w-2/3 bg-white/5 rounded-full" />
             </div>

             <motion.div 
              animate={{ rotate: 360, scale: [1, 1.05, 1] }} 
              transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, scale: { duration: 4, repeat: Infinity } }}
              className="w-48 h-48 border-2 border-dashed border-cyan-500/20 rounded-full mx-auto flex items-center justify-center relative shadow-[0_0_100px_rgba(6,182,212,0.05)]"
             >
                <div className="w-6 h-6 bg-cyan-500 rounded-full shadow-[0_0_40px_cyan]" />
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="absolute inset-0 border border-cyan-500/10 rounded-full" style={{ rotate: `${i * 45}deg`, scale: 1.2 + i * 0.1 }} />
                ))}
             </motion.div>

             <div className="space-y-6">
                <div className="h-4 w-full bg-white/5 rounded-full" />
                <div className="h-4 w-1/2 bg-white/5 rounded-full relative overflow-hidden">
                   <motion.div animate={{ x: ['100%', '-100%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 bg-white/10 w-1/3" />
                </div>
             </div>

             <div className="mono text-[11px] text-neutral-700 text-center uppercase tracking-[0.8em] font-black">Diagnostic_Node_Active</div>
             
             {/* Tech Grid Overlay */}
             <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px]" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
