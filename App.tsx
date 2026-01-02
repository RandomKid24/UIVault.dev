
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, Clock, History, Wind, ChevronDown, ChevronUp, Settings2, Zap } from 'lucide-react';
import { View, ComponentMeta } from './types';
import { COMPONENTS } from './constants';

// Internal Components
import Hero from './components/Hero';
import Explorer from './components/Explorer';
import DetailView from './components/DetailView';
import Philosophy from './components/Philosophy';
import HUD from './components/HUD';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const percentage = useTransform(scrollYProgress, (latest) => Math.round(latest * 100));
  
  // Fix: MotionValue cannot be rendered directly as a ReactNode. We sync it to a state for display.
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    // Initialize value
    setDisplayPercentage(percentage.get());
    // Subscribe to changes to update state
    return percentage.on("change", (latest) => {
      setDisplayPercentage(latest);
    });
  }, [percentage]);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 h-64 w-8 flex flex-col items-center justify-between z-[100] pointer-events-none hidden md:flex">
      <div className="flex flex-col items-center gap-1 mb-2">
        <span className="mono text-[8px] text-neutral-600 font-black tracking-widest vertical-text rotate-180">START</span>
        <div className="w-px h-4 bg-white/10" />
      </div>
      
      <div className="relative flex-1 w-px bg-white/5">
        <motion.div 
          className="absolute top-0 left-0 w-full bg-cyan-500 origin-top shadow-[0_0_10px_cyan]"
          style={{ scaleY }}
        />
        
        {/* Moving Indicator Dot */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white] z-10"
          style={{ top: useTransform(scaleY, (s) => `${s * 100}%`) }}
        />
      </div>

      <div className="flex flex-col items-center gap-1 mt-2">
        <div className="w-px h-4 bg-white/10" />
        <motion.span className="mono text-[9px] text-cyan-500 font-black tracking-tighter">
          {displayPercentage}%
        </motion.span>
        <span className="mono text-[8px] text-neutral-600 font-black tracking-widest vertical-text rotate-180">END</span>
      </div>

      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
        }
      `}</style>
    </div>
  );
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('home');
  const [selectedComponent, setSelectedComponent] = useState<ComponentMeta | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const scrollPosRef = useRef(0);
  
  // Temporal State (Defaults preserved for component logic, controls removed)
  const [globalTime, setGlobalTime] = useState(12); // 0-24h
  const [entropy, setEntropy] = useState(0); // 0-1
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Disable automatic browser scroll restoration to prevent jumps during SPA view changes
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setLastActivity(Date.now());
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Restore scroll position when returning to the explorer view
  useEffect(() => {
    if (activeView === 'explorer' && scrollPosRef.current > 0) {
      // Use a slight delay to ensure the Explorer grid has recalculated its height
      // and the AnimatePresence transition has progressed enough.
      const timer = setTimeout(() => {
        window.scrollTo({
          top: scrollPosRef.current,
          behavior: 'instant'
        });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [activeView]);

  const navigateToComponent = (comp: ComponentMeta) => {
    // Capture current scroll position precisely before navigating away
    scrollPosRef.current = window.scrollY;
    setSelectedComponent(comp);
    setActiveView('detail');
    // Ensure detail view starts at the absolute top
    window.scrollTo(0, 0);
  };

  const handleBackToLab = () => {
    setActiveView('explorer');
  };

  return (
    <div className={`relative min-h-screen selection:bg-cyan-500/30 transition-colors duration-1000 ${globalTime < 6 || globalTime > 18 ? 'bg-[#030303]' : 'bg-[#080808]'}`}>
      {/* Temporal Glow Aura */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${entropy > 0.5 ? 'rgba(244, 63, 94, 0.15)' : 'rgba(34, 211, 238, 0.15)'} 0%, transparent 40%)`
        }}
      />

      <HUD activeView={activeView} setView={(v) => {
        if (v !== 'detail') scrollPosRef.current = 0; // Reset scroll ref if using main nav
        setActiveView(v);
      }} />

      {/* Global Scroll Progress */}
      <ScrollProgress />

      <main className="relative z-10 pt-24 pb-12 px-6 lg:px-12 max-w-[1800px] mx-auto">
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Hero onStart={() => setActiveView('explorer')} />
            </motion.div>
          )}

          {activeView === 'explorer' && (
            <motion.div
              key="explorer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Explorer 
                components={COMPONENTS} 
                onSelect={navigateToComponent} 
              />
            </motion.div>
          )}

          {activeView === 'detail' && selectedComponent && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <button 
                onClick={handleBackToLab}
                className="flex items-center gap-2 mb-8 text-neutral-400 hover:text-white transition-colors group"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="mono text-xs tracking-widest">BACK_TO_LAB</span>
              </button>
              <DetailView 
                component={selectedComponent} 
                temporalContext={{ time: globalTime, entropy, lastActivity }} 
              />
            </motion.div>
          )}

          {activeView === 'philosophy' && (
            <motion.div
              key="philosophy"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Philosophy />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-6 right-6 z-50">
        <div className="flex items-center gap-4 text-neutral-500 mono text-[10px] tracking-tighter">
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${entropy > 0.8 ? 'bg-rose-500' : 'bg-cyan-500'} animate-pulse`} />
            <span>{entropy > 0.8 ? 'STATE_DEGRADING' : 'SYSTEM_READY'}</span>
          </div>
          <span>EPOCH: {Date.now()}</span>
          <span>STABILITY: {((1 - entropy) * 100).toFixed(0)}%</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
