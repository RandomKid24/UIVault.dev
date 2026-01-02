
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useVelocity } from 'framer-motion';
import { Activity, Cpu, Layers, MousePointer2, Zap, Wind, ShieldCheck, Terminal, Compass, BarChart3, Database, Box, Target, Binary, RefreshCcw } from 'lucide-react';

const TechnicalOverlay = () => {
  const [logicString, setLogicString] = useState('0x1A4F');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLogicString(`0x${Math.random().toString(16).slice(2, 6).toUpperCase()}`);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      {/* Coordinate Readout */}
      <div className="absolute top-10 left-10 mono text-[8px] text-cyan-500 uppercase tracking-[0.5em] flex flex-col gap-2 z-50">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-cyan-500 rounded-full animate-ping" />
          <span>LAB_FIELD_ACTIVE</span>
        </div>
        <span className="text-neutral-500">KERNEL_HASH: {logicString}</span>
        <span className="text-neutral-500">TPS: 59.98</span>
      </div>

      {/* Data Falling Stream - Right Side */}
      <div className="absolute top-0 right-10 bottom-0 w-32 flex flex-col gap-4 opacity-10 py-20 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.span 
            key={i} 
            animate={{ opacity: [0.1, 0.5, 0.1], y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
            className="mono text-[8px] text-white text-right"
          >
            {Math.random().toString(16).substring(2, 10).toUpperCase()}
          </motion.span>
        ))}
      </div>
      
      {/* Scanning Line */}
      <motion.div 
        animate={{ y: ['-10%', '110%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent z-0"
      >
        <div className="absolute top-0 right-20 mono text-[6px] text-cyan-500 -translate-y-full opacity-40">SCAN_BEAM_09_V</div>
      </motion.div>

      {/* Background Circuitry SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-5">
        <pattern id="circuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          <path d="M 0 100 H 50 V 50 H 100 V 150 H 150 V 100 H 200" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="2" fill="white" />
          <circle cx="150" cy="150" r="2" fill="white" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>

      <div className="absolute top-8 right-8 w-48 h-48 border-t border-r border-white/5" />
      <div className="absolute bottom-8 left-8 w-48 h-48 border-b border-l border-white/5" />
    </div>
  );
};

const CalibrationLab = () => {
  const [stiffness, setStiffness] = useState(100);
  const [damping, setDamping] = useState(10);
  const [mass, setMass] = useState(1);
  
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness, damping, mass });

  useEffect(() => {
    const interval = setInterval(() => {
      x.set(x.get() === 0 ? 100 : 0);
    }, 2000);
    return () => clearInterval(interval);
  }, [x]);

  return (
    <div className="p-12 bg-neutral-900/50 border border-white/5 rounded-[3rem] backdrop-blur-xl flex flex-col lg:flex-row gap-16 items-center">
      <div className="flex-1 space-y-8 min-w-[300px]">
        <div className="space-y-1">
          <span className="mono text-[8px] text-cyan-500 font-black tracking-widest uppercase">Instrument_01</span>
          <h3 className="text-3xl font-black italic tracking-tighter uppercase">Calibration_Engine</h3>
        </div>
        
        <div className="space-y-6">
          <CalibrationSlider label="STIFFNESS" val={stiffness} setVal={setStiffness} min={10} max={1000} />
          <CalibrationSlider label="DAMPING" val={damping} setVal={setDamping} min={1} max={100} />
          <CalibrationSlider label="MASS" val={mass} setVal={setMass} min={0.1} max={10} step={0.1} />
        </div>
      </div>

      <div className="relative w-64 h-64 bg-black/40 rounded-[2.5rem] border border-white/5 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        <motion.div 
          style={{ x: springX }}
          className="w-20 h-20 bg-white rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center justify-center"
        >
          <Box size={32} className="text-black" />
        </motion.div>
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <span className="mono text-[7px] text-neutral-600 uppercase tracking-widest">Physics_Simulation_Active</span>
        </div>
      </div>
    </div>
  );
};

const CalibrationSlider = ({ label, val, setVal, min, max, step = 1 }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between mono text-[9px] text-neutral-500 font-black uppercase">
      <span>{label}</span>
      <span className="text-white">{val}</span>
    </div>
    <input 
      type="range" min={min} max={max} step={step} value={val} 
      onChange={(e) => setVal(parseFloat(e.target.value))}
      className="w-full h-1 bg-white/5 rounded-full appearance-none accent-cyan-500 cursor-pointer hover:bg-white/10 transition-colors"
    />
  </div>
);

const Hero: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const mainScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);
  const mainOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -400]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const scrollVelocity = useVelocity(scrollYProgress);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden bg-[#020202] pb-64"
    >
      {/* GLOBAL TELEMETRY HUD */}
      <div className="fixed bottom-10 left-10 z-[100] mono text-[8px] text-neutral-600 space-y-2 pointer-events-none hidden lg:block">
        <div className="flex items-center gap-4">
          <span className="tracking-widest">M_POS: [{mouseX.get().toFixed(0)}, {mouseY.get().toFixed(0)}]</span>
          <span className="tracking-widest">S_VEL: {scrollVelocity.get().toFixed(4)}</span>
        </div>
        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            style={{ width: useTransform(scrollVelocity, [-1, 1], ["100%", "100%"]), scaleX: useTransform(scrollVelocity, [-0.5, 0.5], [0, 1]) }}
            className="h-full bg-cyan-500 origin-left"
          />
        </div>
      </div>

      {/* SECTION 1: THE LAB ENTRANCE */}
      <section className="min-h-[120vh] flex flex-col items-center justify-center relative border-b border-white/5 px-6 pt-20">
        <TechnicalOverlay />
        
        <motion.div 
          style={{ scale: mainScale, opacity: mainOpacity }} 
          className="z-10 text-center w-full max-w-[95vw]"
        >
          <div className="flex flex-col items-center mb-24">
            <motion.div 
              animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }} 
              transition={{ rotate: { duration: 40, repeat: Infinity, ease: "linear" }, scale: { duration: 6, repeat: Infinity } }}
              className="text-cyan-500 mb-8"
            >
              <Cpu size={40} strokeWidth={1} />
            </motion.div>
            <div className="flex items-center gap-6">
              <div className="h-px w-32 bg-gradient-to-r from-transparent to-cyan-500/50" />
              <span className="mono text-[11px] tracking-[1.8em] text-cyan-500 font-black uppercase italic pl-[1.8em]">
                SENSORY_CALIBRATION_PENDING
              </span>
              <div className="h-px w-32 bg-gradient-to-l from-transparent to-cyan-500/50" />
            </div>
          </div>

          <h1 className="text-[18vw] lg:text-[20rem] font-black tracking-tighter leading-[0.55] mb-24 italic uppercase select-none relative">
            <motion.span 
              initial={{ x: -200, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="block text-white drop-shadow-[0_0_120px_rgba(6,182,212,0.15)]"
            >
              Kinetic
            </motion.span>
            <motion.span 
              initial={{ x: 200, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-transparent block mt-4" 
              style={{ WebkitTextStroke: '2px rgba(255,255,255,0.6)' }}
            >
              Laboratory
            </motion.span>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[40vh] bg-cyan-600/5 blur-[200px] -z-10 rounded-full" />
          </h1>

          <div className="max-w-7xl mx-auto flex flex-col items-center gap-16">
            <p className="text-4xl md:text-7xl text-neutral-400 font-extralight leading-none max-w-6xl tracking-tighter">
              Where <span className="text-white font-black italic underline decoration-cyan-500 underline-offset-[16px]">temporal physics</span> defines the interaction model.
            </p>

            <motion.button
              onClick={onStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-64 py-20 bg-white text-black font-black italic mono text-xl tracking-[1.2em] hover:bg-cyan-400 transition-all uppercase relative group overflow-hidden shadow-[0_60px_120px_rgba(255,255,255,0.05)]"
            >
              <motion.div 
                animate={{ x: ['-200%', '200%'] }} 
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none skew-x-12" 
              />
              INIT_LAB_ENV
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: CALIBRATION STAGE */}
      <section className="py-96 px-6 lg:px-24 bg-[#030303] relative border-b border-white/5">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 opacity-5 pointer-events-none">
           <span className="text-[40rem] font-black italic text-white uppercase leading-none select-none">SCAN</span>
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto space-y-48">
          <div className="flex flex-col md:flex-row md:items-end gap-12">
            <h2 className="text-9xl lg:text-[12rem] font-black italic tracking-tighter uppercase leading-[0.75] text-white">
              System_<br />
              <span className="text-cyan-500">Flux</span>
            </h2>
            <div className="flex-1 space-y-6">
              <div className="h-[2px] w-full bg-gradient-to-r from-cyan-500/50 via-cyan-500/10 to-transparent" />
              <p className="mono text-xs text-neutral-600 uppercase tracking-[0.6em] pl-2">Observing_Realtime_Variable_State</p>
            </div>
          </div>

          <CalibrationLab />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 pt-24">
            <DirectiveCard 
              icon={<Wind size={48} />}
              title="Viscous_Drag"
              desc="Simulating digital mass. Elements gain inertia based on their data weight, requiring variable physical intent to displace."
              color="#06b6d4"
            />
            <DirectiveCard 
              icon={<Terminal size={48} />}
              title="Logic_Decay"
              desc="Information integrity decays over time. Maintain engagement to prevent visual atrophy and maintain data coherence."
              color="#ffffff"
            />
            <DirectiveCard 
              icon={<Binary size={48} />}
              title="Bit_Shatter"
              desc="Destructive actions observe rigid-body fragmentation. Components shatter into primitive shards before nullification."
              color="#f43f5e"
            />
          </div>
        </div>
      </section>

      {/* SECTION 3: EXPERIMENTAL BENCH */}
      <section className="py-96 px-6 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
        
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-12 gap-32 items-center">
          <motion.div 
            style={{ y: yParallax }}
            className="xl:col-span-5 space-y-20"
          >
            <div className="space-y-8">
               <div className="flex items-center gap-6 mono text-cyan-500 text-sm font-black tracking-[0.6em] uppercase">
                  <Activity size={24} className="animate-pulse" /> Live_Telemetry_v12.4
               </div>
               <h2 className="text-[10vw] xl:text-[10rem] font-black italic tracking-tighter uppercase leading-[0.7] text-white">
                Intent_<br />
                <span className="text-cyan-500">Mapping_</span><br />
                Field
              </h2>
            </div>
            
            <p className="text-3xl md:text-6xl text-neutral-500 font-extralight leading-none max-w-4xl tracking-tighter">
              Test <span className="text-white font-black italic">repulsion vectors</span> in a zero-G coordinate field.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12">
              <WorkbenchMetric label="MOMENTUM_LOCK" value="ACTIVE" />
              <WorkbenchMetric label="COORDINATE_SYNC" value="99.8%" />
              <WorkbenchMetric label="STRATA_LEVEL" value="L4_CORE" />
              <WorkbenchMetric label="ENTROPY_BIAS" value="0.0004" />
            </div>
          </motion.div>

          <div className="xl:col-span-7">
             <div className="h-[900px] bg-neutral-900/10 border-4 border-white/5 rounded-[6rem] relative overflow-hidden group shadow-[0_0_150px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]" />
                
                <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 text-center space-y-4 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
                   <Target size={24} className="text-cyan-500 mx-auto animate-ping" />
                   <span className="mono text-[10px] text-white font-black uppercase tracking-[1.2em] pl-[1.2em]">Kinetic_Workbench_Active</span>
                </div>

                <WorkbenchArea />
                
                <div className="absolute bottom-16 left-16 flex gap-2 opacity-20 mono text-[8px] text-white pointer-events-none">
                  {[...Array(5)].map((_, i) => <div key={i} className="px-2 py-1 border border-white/20">SEQ_0{i}</div>)}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* FINAL SECTION: THE ARCHIVE */}
      <section className="py-80 px-8 flex flex-col items-center justify-center border-t border-white/5 relative overflow-hidden bg-black">
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
         
         <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1 }}
           className="text-center space-y-24 z-10"
         >
            <h2 className="text-[12vw] md:text-[18rem] font-black italic tracking-tighter uppercase text-white leading-[0.65]">Explore_<br /><span className="text-cyan-500">Primitives</span></h2>
            <p className="max-w-5xl mx-auto text-4xl md:text-6xl text-neutral-600 font-extralight leading-none tracking-tighter">
               Benchmark 60+ unique motion modules calibrated for the next generation of high-precision spatial interfaces.
            </p>
            <div className="pt-24">
               <motion.button
                 onClick={onStart}
                 whileHover={{ scale: 1.05, backgroundColor: '#06b6d4', color: '#000', borderColor: '#06b6d4' }}
                 whileTap={{ scale: 0.95 }}
                 className="px-48 py-20 border-8 border-cyan-500 text-cyan-500 font-black italic mono text-2xl tracking-[1.4em] transition-all uppercase pl-[1.4em] shadow-[0_0_120px_rgba(6,182,212,0.1)]"
               >
                 ENTER_THE_VOID
               </motion.button>
            </div>
         </motion.div>

         <div className="absolute bottom-16 flex gap-12 opacity-10 mono text-[10px] text-neutral-500 tracking-[1em] uppercase">
            <span>Kernel_v12.0</span>
            <span>Stable_Flux</span>
            <span>Coord_Lock_0x99</span>
         </div>
      </section>
    </div>
  );
};

const WorkbenchMetric = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-3 p-8 bg-neutral-900 border-2 border-white/5 rounded-4xl group hover:border-cyan-500/30 transition-all">
     <span className="mono text-[10px] text-neutral-600 font-black uppercase tracking-widest group-hover:text-cyan-500 transition-colors">{label}</span>
     <span className="mono text-3xl text-white font-black italic tracking-tighter">{value}</span>
  </div>
);

const WorkbenchArea = () => {
  const [entities, setEntities] = useState([
    { id: 1, type: 'CORE', x: 150, y: 150, mass: 2, stiffness: 200, damping: 20 },
    { id: 2, type: 'DATA', x: 500, y: 350, mass: 0.8, stiffness: 500, damping: 10 },
    { id: 3, type: 'VECT', x: 250, y: 600, mass: 3, stiffness: 100, damping: 30 }
  ]);

  return (
    <div className="absolute inset-0">
      {entities.map((ent) => (
        <DraggableEntity key={ent.id} config={ent} />
      ))}
    </div>
  );
};

const DraggableEntity = ({ config }: any) => {
  const x = useMotionValue(config.x);
  const y = useMotionValue(config.y);
  const springX = useSpring(x, { stiffness: config.stiffness, damping: config.damping, mass: config.mass });
  const springY = useSpring(y, { stiffness: config.stiffness, damping: config.damping, mass: config.mass });
  
  const vx = useVelocity(x);
  const vy = useVelocity(y);
  
  const skewX = useTransform(vx, [-3000, 3000], [-25, 25]);
  const scale = useTransform([vx, vy], ([valX, valY]: any) => {
    const vel = Math.sqrt(valX**2 + valY**2);
    return Math.max(0.8, 1 - vel / 12000);
  });

  return (
    <motion.div
      drag
      dragConstraints={{ top: 50, left: 50, right: 600, bottom: 700 }}
      dragElastic={0.1}
      style={{ x: springX, y: springY, skewX, scale }}
      onDrag={(_, info) => {
        x.set(info.point.x);
        y.set(info.point.y);
      }}
      className="absolute w-48 h-48 flex items-center justify-center cursor-grab active:cursor-grabbing z-20 group"
    >
      <div className="relative w-full h-full p-6">
        <div className="absolute inset-0 bg-neutral-900 border border-white/10 rounded-[2.5rem] shadow-2xl group-hover:border-cyan-500/40 transition-colors" />
        
        <div className="relative z-10 w-full h-full border border-white/5 rounded-[2rem] flex flex-col items-center justify-center gap-4 overflow-hidden bg-black/20">
           <div className={`w-16 h-16 rounded-full flex items-center justify-center ${config.type === 'CORE' ? 'bg-cyan-500' : config.type === 'DATA' ? 'bg-white' : 'bg-rose-500'}`}>
              <Box size={32} className="text-black" />
           </div>
           <span className="mono text-[10px] font-black text-white/50 tracking-[0.4em] uppercase">{config.type}_NODE</span>
           
           <div className="flex gap-1.5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-white/10 rounded-full" />
              ))}
           </div>
        </div>

        <motion.div 
          style={{ opacity: useTransform(vx, [-1000, 0, 1000], [0.4, 0, 0.4]) }}
          className="absolute inset-0 border-2 border-cyan-500/20 rounded-[2.5rem] pointer-events-none scale-110 blur-sm" 
        />
      </div>
    </motion.div>
  );
};

const DirectiveCard = ({ icon, title, desc, color }: any) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 25 });

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="p-20 bg-neutral-900/40 border border-white/5 rounded-[4rem] group hover:border-white/10 transition-all duration-1000 shadow-2xl relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[4rem]" />
      
      <motion.div 
        style={{ translateZ: 100 }}
        className="w-28 h-28 flex items-center justify-center bg-white/5 rounded-3xl mb-16 group-hover:scale-110 transition-transform relative z-10 border border-white/5"
      >
        <div style={{ color }}>{icon}</div>
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0 blur-4xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" 
          style={{ backgroundColor: color }}
        />
      </motion.div>

      <motion.h3 
        style={{ translateZ: 80 }}
        className="text-7xl font-black italic tracking-tighter uppercase mb-10 text-white relative z-10 leading-none"
      >
        {title.split('_')[0]}<br />
        <span style={{ color }}>{title.split('_')[1]}</span>
      </motion.h3>

      <motion.p 
        style={{ translateZ: 60 }}
        className="text-neutral-500 text-3xl leading-none font-extralight relative z-10 group-hover:text-neutral-300 transition-colors tracking-tighter"
      >
        {desc}
      </motion.p>
      
      <div className="absolute bottom-20 right-20 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none scale-150">
         <Activity size={200} />
      </div>
    </motion.div>
  );
};

export default Hero;
