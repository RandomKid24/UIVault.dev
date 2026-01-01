
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, History, Wind, ChevronDown, ChevronUp, Settings2, Zap } from 'lucide-react';
import { View, ComponentMeta } from './types';
import { COMPONENTS } from './constants';

// Internal Components
import Hero from './components/Hero';
import Explorer from './components/Explorer';
import DetailView from './components/DetailView';
import Philosophy from './components/Philosophy';
import HUD from './components/HUD';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('home');
  const [selectedComponent, setSelectedComponent] = useState<ComponentMeta | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Temporal State (Defaults preserved for component logic, controls removed)
  const [globalTime, setGlobalTime] = useState(12); // 0-24h
  const [entropy, setEntropy] = useState(0); // 0-1
  const [lastActivity, setLastActivity] = useState(Date.now());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setLastActivity(Date.now());
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const navigateToComponent = (comp: ComponentMeta) => {
    setSelectedComponent(comp);
    setActiveView('detail');
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

      <HUD activeView={activeView} setView={setActiveView} />

      <main className="relative z-10 pt-24 pb-12 px-6 max-w-7xl mx-auto">
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
                onClick={() => setActiveView('explorer')}
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
