
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Activity, Cpu, Layers, MousePointer2, Zap, Wind, ShieldCheck, Terminal, Compass, BarChart3, Database } from 'lucide-react';

const TechnicalOverlay = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
    {/* Coordinate Readout */}
    <div className="absolute top-10 left-10 mono text-[8px] text-cyan-500 uppercase tracking-[0.5em] flex flex-col gap-2">
      <span>GRID_LATTICE_ACTIVE</span>
      <span>LAT: 37.7749° N</span>
      <span>LNG: 122.4194° W</span>
    </div>
    
    {/* Scanning Line */}
    <motion.div 
      animate={{ y: ['-100%', '200%'] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent z-0"
    />

    {/* Corner Brackets */}
    <div className="absolute top-10 right-10 w-20 h-20 border-t border-r border-white/10" />
    <div className="absolute bottom-10 left-10 w-20 h-20 border-b border-l border-white/10" />
    
    {/* Binary Stream */}
    <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-1 mono text-[6px] text-neutral-800">
      {[...Array(20)].map((_, i) => (
        <span key={i}>{Math.random().toString(2).slice(2, 12)}</span>
      ))}
    </div>
  </div>
);

const KineticGrid = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div onMouseMove={handleMouseMove} className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <div className="grid grid-cols-12 md:grid-cols-24 gap-4 w-full h-full p-8">
        {[...Array(576)].map((_, i) => (
          <Node key={i} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>
    </div>
  );
};

const Node = ({ mouseX, mouseY }: any) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const springX = useSpring(0, { stiffness: 50, damping: 15 });
  const springY = useSpring(0, { stiffness: 50, damping: 15 });
  const scale = useSpring(1, { stiffness: 100, damping: 20 });

  React.useEffect(() => {
    const unsubX = mouseX.on('change', (latestX: number) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const dx = latestX - (rect.left + rect.width / 2);
      const dy = mouseY.get() - (rect.top + rect.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const power = Math.max(0, 1 - dist / 400);
      
      springX.set(dx * power * 0.2);
      springY.set(dy * power * 0.2);
      scale.set(1 + power * 1.5);
    });
    return () => unsubX();
  }, [mouseX, mouseY, springX, springY, scale]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, scale }}
      className="w-[1px] h-[1px] bg-cyan-500/40 rounded-full"
    />
  );
};

const Hero: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const mainScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);
  const mainOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* SECTION 1: HYPER-SCALED COMMAND CENTER */}
      <section className="min-h-screen flex flex-col items-center justify-center relative border-b border-white/5 px-6 pt-20">
        <TechnicalOverlay />
        <KineticGrid />
        
        <motion.div 
          style={{ scale: mainScale, opacity: mainOpacity }} 
          className="z-10 text-center w-full max-w-[90vw]"
        >
          <div className="flex items-center justify-center gap-6 mb-12">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-cyan-500"
            >
              <Compass size={20} />
            </motion.div>
            <span className="mono text-[11px] tracking-[1.2em] text-cyan-500 font-black uppercase italic">
              Lab_Environment_Initialized_v10.4
            </span>
          </div>

          <h1 className="text-[18vw] lg:text-[18rem] font-black tracking-tighter leading-[0.7] mb-16 italic uppercase select-none relative">
            <motion.span 
              initial={{ x: -100, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="block relative z-10"
            >
              Kinetic
            </motion.span>
            <motion.span 
              initial={{ x: 100, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-transparent block" 
              style={{ WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}
            >
              Structures
            </motion.span>
            
            {/* Background geometric blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[20vh] bg-cyan-500/10 blur-[150px] -z-10 rounded-full" />
          </h1>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24 px-4">
             <p className="lg:col-span-7 text-2xl md:text-5xl text-neutral-400 font-light leading-[1.1] text-left">
               Deconstructing the binary web into <span className="text-white font-bold italic underline decoration-cyan-500/50 underline-offset-8">living interfaces</span> where physics and entropy define the field.
             </p>
             <div className="lg:col-span-5 flex flex-col gap-6 text-left border-l border-white/10 pl-12 py-4">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400"><Database size={20} /></div>
                   <div className="mono text-[10px] text-neutral-500 uppercase tracking-widest">Temporal_Buffer_Syncing... 98%</div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-white/5 rounded-xl text-neutral-400"><BarChart3 size={20} /></div>
                   <div className="mono text-[10px] text-neutral-500 uppercase tracking-widest">Environmental_Noise_Floor: -40dB</div>
                </div>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-16">
            <motion.button
              onClick={onStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-28 py-12 bg-white text-black font-black italic mono text-sm tracking-[0.6em] hover:bg-cyan-400 transition-all uppercase relative group overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            >
              <motion.div 
                animate={{ x: ['-100%', '100%'] }} 
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent pointer-events-none" 
              />
              Access_Laboratory
            </motion.button>
            
            <div className="flex flex-col items-center gap-4">
               <div className="flex items-center gap-12 px-12 py-10 border border-white/5 bg-neutral-900/40 backdrop-blur-xl rounded-full mono text-[10px] text-neutral-500 tracking-widest uppercase relative overflow-hidden group">
                 <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="flex gap-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div 
                        key={i} 
                        animate={{ height: [2, 12, 2] }} 
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.15 }} 
                        className="w-1.5 bg-cyan-500 rounded-full" 
                      />
                    ))}
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-white font-black">CORE_LINK: STABLE</span>
                    <span className="opacity-40">SIGNAL_INTEGRITY: 99.9%</span>
                 </div>
               </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute bottom-16 mono text-[10px] text-neutral-700 tracking-[1.5em] uppercase hidden md:block"
        >
          SCROLL_TO_DESCEND
        </motion.div>
      </section>

      {/* SECTION 2: THE KINETIC PILLARS - Expanded layout */}
      <section className="py-72 px-8 lg:px-24 bg-[#030303] relative overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 p-40 opacity-[0.03] select-none pointer-events-none">
           <span className="text-[40rem] font-black italic text-white uppercase">DIRECTIVES</span>
        </div>

        <div className="relative z-10 w-full">
          <div className="flex items-center gap-10 mb-32">
            <h2 className="text-7xl lg:text-9xl font-black italic tracking-tighter uppercase leading-none text-white">Core_<br /><span className="text-cyan-500">Directives</span></h2>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            <DirectiveCard 
              icon={<Wind size={40} />}
              title="Elastic_Inertia"
              desc="Motion follows non-linear damping logic. Every transition observes the mass and friction of the digital medium, creating tangible feedback loops for expert users."
            />
            <DirectiveCard 
              icon={<MousePointer2 size={40} />}
              title="Intent_Vector"
              desc="Pre-emptive state calculation based on cursor acceleration and approach vectors. The UI expands its interactive radius to meet user attention halfway."
            />
            <DirectiveCard 
              icon={<Activity size={40} />}
              title="Entropy_Cycle"
              desc="Visual states observe the second law of thermodynamics. Interfaces age, blur, and dissolve over time, requiring active engagement to maintain focal focus."
            />
          </div>
        </div>
      </section>

      {/* SECTION 3: SYSTEM INTEGRITY - Full width lab environment */}
      <section className="py-72 px-8 lg:px-24 bg-black relative overflow-hidden">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-32 items-center">
          <motion.div 
            style={{ y: yParallax }}
            className="xl:col-span-6 space-y-16"
          >
            <div className="space-y-4">
               <div className="flex items-center gap-4 mono text-cyan-500 text-xs font-black tracking-[0.5em] uppercase">
                  <Terminal size={14} /> Systems_Architecture
               </div>
               <h2 className="text-[12vw] xl:text-[11rem] font-black italic tracking-tighter uppercase leading-[0.75] text-white">
                GPU_<br />
                <span className="text-cyan-500">Driven_</span><br />
                Reality
              </h2>
            </div>
            
            <p className="text-3xl md:text-5xl text-neutral-400 font-light leading-[1.1] max-w-4xl">
              We offload environmental physics to the silicon, maintaining frame-perfect synchronicity across spatial strata.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12">
              {[
                { icon: <Cpu size={24} />, text: 'Accelerated Pipelines', detail: '60FPS_LOCKED' },
                { icon: <ShieldCheck size={24} />, text: 'Inclusive Motion Specs', detail: 'WCAG_2.1' },
                { icon: <Layers size={24} />, text: 'Z-Stratified Rendering', detail: 'DEPTH_BUFFER' },
                { icon: <Zap size={24} />, text: 'Adaptive Flux Gates', detail: 'REALTIME_SYNC' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-4 group">
                  <div className="flex items-center gap-6">
                    <div className="p-6 bg-neutral-900 border-2 border-white/5 rounded-3xl text-cyan-500 group-hover:border-cyan-500/40 transition-all duration-500 group-hover:scale-110">
                      {item.icon}
                    </div> 
                    <div className="flex flex-col">
                       <span className="mono text-[13px] tracking-[0.4em] text-white uppercase font-black">{item.text}</span>
                       <span className="mono text-[9px] text-neutral-600 font-bold uppercase tracking-widest mt-1">{item.detail}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="xl:col-span-6">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="h-[800px] bg-[#050505] border-2 border-white/10 rounded-[5rem] p-20 relative overflow-hidden flex flex-col justify-center gap-20 group shadow-2xl"
            >
               <div className="absolute inset-0 bg-cyan-500/5 blur-3xl opacity-40 group-hover:opacity-100 transition-opacity" />
               
               <div className="space-y-8 relative z-10">
                  <div className="flex justify-between items-end mb-4">
                     <span className="mono text-[10px] text-neutral-600 uppercase font-black tracking-widest">Process_Load_01</span>
                     <span className="mono text-[10px] text-cyan-500 font-black">94.3%</span>
                  </div>
                  <div className="h-6 w-full bg-white/5 rounded-full relative overflow-hidden p-1 border border-white/5">
                    <motion.div 
                      animate={{ x: ['-100%', '100%'] }} 
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} 
                      className="absolute inset-y-1 bg-cyan-500/40 w-1/3 rounded-full shadow-[0_0_20px_cyan]" 
                    />
                  </div>
                  <div className="h-4 w-2/3 bg-white/5 rounded-full" />
               </div>

               <motion.div 
                animate={{ rotate: 360, scale: [1, 1.05, 1] }} 
                transition={{ rotate: { duration: 30, repeat: Infinity, ease: 'linear' }, scale: { duration: 4, repeat: Infinity } }}
                className="w-72 h-72 border-4 border-dashed border-cyan-500/20 rounded-full mx-auto flex items-center justify-center relative shadow-[0_0_100px_rgba(6,182,212,0.05)]"
               >
                  <div className="absolute inset-0 border border-white/10 rounded-full" />
                  <div className="w-12 h-12 bg-white rounded-full shadow-[0_0_60px_white] relative z-20 flex items-center justify-center">
                     <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
                  </div>
                  {[...Array(4)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border border-cyan-500/10 rounded-full" 
                      style={{ rotate: `${i * 90}deg`, scale: 1.3 + i * 0.15 }} 
                    />
                  ))}
                  
                  {/* Orbiting data points */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-40px] pointer-events-none"
                  >
                     <div className="w-2 h-2 bg-cyan-400 rounded-full absolute top-0 left-1/2 shadow-[0_0_15px_cyan]" />
                  </motion.div>
               </motion.div>

               <div className="space-y-8 relative z-10">
                  <div className="h-4 w-full bg-white/5 rounded-full" />
                  <div className="h-4 w-1/2 bg-white/5 rounded-full relative overflow-hidden">
                     <motion.div 
                        animate={{ x: ['100%', '-100%'] }} 
                        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }} 
                        className="absolute inset-0 bg-white/10 w-1/4" 
                     />
                  </div>
               </div>

               <div className="text-center relative z-10">
                  <div className="mono text-[12px] text-neutral-600 uppercase tracking-[1em] font-black italic">Laboratory_Heartbeat</div>
                  <div className="flex justify-center gap-2 mt-6">
                     {[...Array(12)].map((_, i) => (
                       <motion.div 
                        key={i}
                        animate={{ scaleY: [1, 2.5, 1], opacity: [0.2, 0.6, 0.2] }}
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                        className="w-1 h-4 bg-cyan-500/40 rounded-full" 
                       />
                     ))}
                  </div>
               </div>
               
               {/* Internal Grid Overlay */}
               <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL SECTION: CTA TO LABORATORY */}
      <section className="py-60 px-8 flex flex-col items-center justify-center bg-black border-t border-white/5">
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="text-center space-y-12"
         >
            <h2 className="text-9xl md:text-[14rem] font-black italic tracking-tighter uppercase text-white leading-none">Ready_to_<br /><span className="text-cyan-500">Deconstruct?</span></h2>
            <p className="max-w-4xl mx-auto text-3xl text-neutral-500 font-light leading-tight">
               Enter the experimentation field. 50+ unique motion primitives calibrated for high-precision temporal interfaces.
            </p>
            <div className="pt-12">
               <motion.button
                 onClick={onStart}
                 whileHover={{ scale: 1.1, backgroundColor: '#06b6d4' }}
                 whileTap={{ scale: 0.9 }}
                 className="px-24 py-10 border-4 border-cyan-500 text-cyan-500 hover:text-black font-black italic mono text-sm tracking-[0.8em] transition-all uppercase"
               >
                 Initialize_Session
               </motion.button>
            </div>
         </motion.div>
      </section>
    </div>
  );
};

const DirectiveCard = ({ icon, title, desc }: any) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 20 });

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="p-20 bg-neutral-900/20 border border-white/5 rounded-[5rem] group hover:border-cyan-500/30 transition-all duration-700 shadow-2xl relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[5rem]" />
      
      <motion.div 
        style={{ translateZ: 50 }}
        className="w-24 h-24 flex items-center justify-center bg-cyan-500/10 rounded-3xl mb-16 group-hover:scale-110 transition-transform relative z-10"
      >
        <div className="text-cyan-500">{icon}</div>
        <div className="absolute inset-0 bg-cyan-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
      </motion.div>

      <motion.h3 
        style={{ translateZ: 30 }}
        className="text-6xl font-black italic tracking-tighter uppercase mb-10 text-white relative z-10"
      >
        {title}
      </motion.h3>

      <motion.p 
        style={{ translateZ: 20 }}
        className="text-neutral-500 text-2xl leading-tight font-light relative z-10 group-hover:text-neutral-300 transition-colors"
      >
        {desc}
      </motion.p>
      
      <div className="absolute bottom-16 right-16 opacity-0 group-hover:opacity-10 transition-opacity">
         <Activity size={120} />
      </div>
    </motion.div>
  );
};

export default Hero;
