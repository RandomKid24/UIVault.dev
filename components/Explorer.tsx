
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComponentMeta } from '../types';
import { ArrowUpRight, Gauge, Eye, Play, Search, X, Hash, Filter, Zap, Activity, Cpu, Target, Terminal, Fingerprint, Database, Box } from 'lucide-react';

// === DEMO IMPORTS FOR PREVIEWS ===
import HistoryStrataDemo from './demos/HistoryStrataDemo';
import KineticTimelineDemo from './demos/KineticTimelineDemo';
import StrataLoaderDemo from './demos/StrataLoaderDemo';
import TectonicLoaderDemo from './demos/TectonicLoaderDemo';
import PhotonicLoaderDemo from './demos/PhotonicLoaderDemo';
import EntropyLoaderDemo from './demos/EntropyLoaderDemo';
import VelocityCursorDemo from './demos/VelocityCursorDemo';
import TetherCursorDemo from './demos/TetherCursorDemo';
import FieldCursorDemo from './demos/FieldCursorDemo';
import TectonicAccordionDemo from './demos/TectonicAccordionDemo';
import TrailCursorDemo from './demos/TrailCursorDemo';
import KineticStatusDemo from './demos/KineticStatusDemo';
import VelocityScrollbarDemo from './demos/VelocityScrollbarDemo';
import RefractiveImageDemo from './demos/RefractiveImageDemo';
import NeuralBadgeDemo from './demos/NeuralBadgeDemo';
import DecayTimerDemo from './demos/DecayTimerDemo';
import BioProfileDemo from './demos/BioProfileDemo';
import ActionImpulseDemo from './demos/ActionImpulseDemo';
import SequenceStrataDemo from './demos/SequenceStrataDemo';
import PortalBranchDemo from './demos/PortalBranchDemo';
import FrictionToggleDemo from './demos/FrictionToggleDemo';
import LiquidTabDemo from './demos/LiquidTabDemo';
import VortexDialDemo from './demos/VortexDialDemo';
import ImpulseSignalDemo from './demos/ImpulseSignalDemo';
import VolumetricGaugeDemo from './demos/VolumetricGaugeDemo';
import CrystallizedTextDemo from './demos/CrystallizedTextDemo';
import MomentumTriggerDemo from './demos/MomentumTriggerDemo';
import LuminanceMassDemo from './demos/LuminanceMassDemo';
import KineticTickerDemo from './demos/KineticTickerDemo';
import AuraSentimentDemo from './demos/AuraSentimentDemo';
import ViscousDataFeelDemo from './demos/ViscousDataFeelDemo';
import TectonicDataDemo from './demos/TectonicDataDemo';
import GridCompressionDemo from './demos/GridCompressionDemo';
import FragileGlassDemo from './demos/FragileGlassDemo';
import CadenceLockDemo from './demos/CadenceLockDemo';
import EarnedLegibilityDemo from './demos/EarnedLegibilityDemo';
import StructuralGlitchDemo from './demos/StructuralGlitchDemo';
import ThermalOverloadDemo from './demos/ThermalOverloadDemo';
import RebelNavigationDemo from './demos/RebelNavigationDemo';
import SpatialStrataDemo from './demos/SpatialStrataDemo';
import PerspectiveFocalDemo from './demos/PerspectiveFocalDemo';
import ProximityFieldDemo from './demos/ProximityFieldDemo';
import IsometricGridFluxDemo from './demos/IsometricGridFluxDemo';
import DepthSqueezeDemo from './demos/DepthSqueezeDemo';
import OrbitalZAxisDemo from './demos/OrbitalZAxisDemo';
import StateMemoryDemo from './demos/StateMemoryDemo';
import AtrophySurfaceDemo from './demos/AtrophySurfaceDemo';
import CircadianInterfaceDemo from './demos/CircadianInterfaceDemo';
import HistoryEchoDemo from './demos/HistoryEchoDemo';
import MagnetoNavDemo from './demos/MagnetoNavDemo';
import TensionGridDemo from './demos/TensionGridDemo';
import ChronoScrollDemo from './demos/ChronoScrollDemo';
import VelocityReaderDemo from './demos/VelocityReaderDemo';
import OrbitNexusDemo from './demos/OrbitNexusDemo';
import HaltRevealDemo from './demos/HaltRevealDemo';
import IntentPulseDemo from './demos/IntentPulseDemo';
import StochasticMassDemo from './demos/StochasticMassDemo';
import RadialFlowDemo from './demos/RadialFlowDemo';
import EdgeManifestDemo from './demos/EdgeManifestDemo';
import SpatialTunnelDemo from './demos/SpatialTunnelDemo';
import TraceMemoryDemo from './demos/TraceMemoryDemo';
import KineticTutorDemo from './demos/KineticTutorDemo';
import PersonalityMatrixDemo from './demos/PersonalityMatrixDemo';
import IntentMorphDemo from './demos/IntentMorphDemo';
import RhythmPulseDemo from './demos/RhythmPulseDemo';
import TemporalRewindDemo from './demos/TemporalRewindDemo';
import ViscousScrollDemo from './demos/ViscousScrollDemo';
import ElasticSpineDemo from './demos/ElasticSpineDemo';
import VelocityHeroDemo from './demos/VelocityHeroDemo';
import AsymmetricHeroDemo from './demos/AsymmetricHeroDemo';
import LabAmbientDemo from './demos/LabAmbientDemo';
import AdaptiveHeroDemo from './demos/AdaptiveHeroDemo';
import DeconstructionHeroDemo from './demos/DeconstructionHeroDemo';
import IntentCTAHeroDemo from './demos/IntentCTAHeroDemo';
import OmniHeroDemo from './demos/OmniHeroDemo';
import GeometricWarpDemo from './demos/GeometricWarpDemo';
import ReactiveClusterDemo from './demos/ReactiveClusterDemo';
import SurfaceTensionDemo from './demos/SurfaceTensionDemo';
import EvasiveGridDemo from './demos/EvasiveGridDemo';
import DepthProbeDemo from './demos/DepthProbeDemo';
import KineticShutterDemo from './demos/KineticShutterDemo';
import GestureIntentDemo from './demos/GestureIntentDemo';
import SwipeHesitationDemo from './demos/SwipeHesitationDemo';
import OrientationFluxDemo from './demos/OrientationFluxDemo';
import ThumbReachGridDemo from './demos/ThumbReachGridDemo';
import KineticRefreshDemo from './demos/KineticRefreshDemo';
import MemorySurfaceDemo from './demos/MemorySurfaceDemo';
import ReducedMotionEleganceDemo from './demos/ReducedMotionEleganceDemo';
import MonochromeLogicDemo from './demos/MonochromeLogicDemo';
import PremiumKeyboardDemo from './demos/PremiumKeyboardDemo';
import EchoFocusDemo from './demos/EchoFocusDemo';
import CognitiveShieldDemo from './demos/CognitiveShieldDemo';
import GlyphKineticDemo from './demos/GlyphKineticDemo';
import CommitmentShardDemo from './demos/CommitmentShardDemo';
import ConfidenceMeterDemo from './demos/ConfidenceMeterDemo';
import ResonanceFieldDemo from './demos/ResonanceFieldDemo';
import EvolutionaryShellDemo from './demos/EvolutionaryShellDemo';
import ChoiceConvergenceDemo from './demos/ChoiceConvergenceDemo';

// NEW UNIQUE BUTTON DEMOS
import HolographicTriggerDemo from './demos/HolographicTriggerDemo';
import PressureExecutionDemo from './demos/PressureExecutionDemo';
import VectorSkewDemo from './demos/VectorSkewDemo';

// NEW UNIQUE LOADER DEMOS
import VortexAccretionLoaderDemo from './demos/VortexAccretionLoaderDemo';
import BismuthGrowthLoaderDemo from './demos/BismuthGrowthLoaderDemo';
import PlasmaConduitLoaderDemo from './demos/PlasmaConduitLoaderDemo';

// NEW UNIQUE CURSOR DEMOS
import QuantumSwarmCursorDemo from './demos/QuantumSwarmCursorDemo';
import TacticalScanCursorDemo from './demos/TacticalScanCursorDemo';
import ElasticTendrilCursorDemo from './demos/ElasticTendrilCursorDemo';

interface ExplorerProps {
  components: ComponentMeta[];
  onSelect: (c: ComponentMeta) => void;
}

const SimulationRouter: React.FC<{ id: string }> = ({ id }) => {
  switch (id) {
    case 'holographic-impulse': return <HolographicTriggerDemo />;
    case 'pressure-execution': return <PressureExecutionDemo />;
    case 'vector-skew-trigger': return <VectorSkewDemo />;
    case 'vortex-accretion-loader': return <VortexAccretionLoaderDemo />;
    case 'bismuth-growth-loader': return <BismuthGrowthLoaderDemo />;
    case 'plasma-conduit-loader': return <PlasmaConduitLoaderDemo />;
    case 'quantum-swarm-cursor': return <QuantumSwarmCursorDemo />;
    case 'tactical-scan-cursor': return <TacticalScanCursorDemo />;
    case 'elastic-tendril-cursor': return <ElasticTendrilCursorDemo />;
    case 'history-strata': return <HistoryStrataDemo />;
    case 'kinetic-timeline': return <KineticTimelineDemo />;
    case 'strata-loader': return <StrataLoaderDemo />;
    case 'tectonic-loader': return <TectonicLoaderDemo />;
    case 'photonic-loader': return <PhotonicLoaderDemo />;
    case 'entropy-loader': return <EntropyLoaderDemo />;
    case 'velocity-cursor': return <VelocityCursorDemo />;
    case 'tether-cursor': return <TetherCursorDemo />;
    case 'field-cursor': return <FieldCursorDemo />;
    case 'tectonic-accordion': return <TectonicAccordionDemo />;
    case 'trail-cursor': return <TrailCursorDemo />;
    case 'kinetic-status': return <KineticStatusDemo />;
    case 'velocity-scrollbar': return <VelocityScrollbarDemo />;
    case 'refractive-image': return <RefractiveImageDemo />;
    case 'neural-badge': return <NeuralBadgeDemo />;
    case 'decay-timer': return <DecayTimerDemo />;
    case 'bio-profile': return <BioProfileDemo />;
    case 'action-impulse': return <ActionImpulseDemo />;
    case 'sequence-strata': return <SequenceStrataDemo />;
    case 'portal-branch': return <PortalBranchDemo />;
    case 'friction-toggle': return <FrictionToggleDemo />;
    case 'liquid-tab': return <LiquidTabDemo />;
    case 'vortex-dial': return <VortexDialDemo />;
    case 'impulse-signal': return <ImpulseSignalDemo />;
    case 'volumetric-gauge': return <VolumetricGaugeDemo />;
    case 'crystallized-text': return <CrystallizedTextDemo />;
    case 'momentum-trigger': return <MomentumTriggerDemo />;
    case 'luminance-mass': return <LuminanceMassDemo />;
    case 'kinetic-ticker': return <KineticTickerDemo />;
    case 'aura-sentiment': return <AuraSentimentDemo />;
    case 'viscous-data-feel': return <ViscousDataFeelDemo />;
    case 'tectonic-data': return <TectonicDataDemo />;
    case 'grid-compression': return <GridCompressionDemo />;
    case 'fragile-glass': return <FragileGlassDemo />;
    case 'cadence-lock': return <CadenceLockDemo />;
    case 'earned-legibility': return <EarnedLegibilityDemo />;
    case 'structural-glitch': return <StructuralGlitchDemo />;
    case 'thermal-overload': return <ThermalOverloadDemo />;
    case 'rebel-navigation': return <RebelNavigationDemo />;
    case 'spatial-strata': return <SpatialStrataDemo />;
    case 'perspective-focal': return <PerspectiveFocalDemo />;
    case 'proximity-field': return <ProximityFieldDemo />;
    case 'isometric-grid-flux': return <IsometricGridFluxDemo />;
    case 'depth-squeeze': return <DepthSqueezeDemo />;
    case 'orbital-z-axis': return <OrbitalZAxisDemo />;
    case 'state-memory': return <StateMemoryDemo />;
    case 'atrophy-surface': return <AtrophySurfaceDemo />;
    case 'circadian-interface': return <CircadianInterfaceDemo />;
    case 'history-echo': return <HistoryEchoDemo />;
    case 'magneto-nav': return <MagnetoNavDemo />;
    case 'tension-grid': return <TensionGridDemo />;
    case 'chrono-scroll': return <ChronoScrollDemo />;
    case 'velocity-reader': return <VelocityReaderDemo />;
    case 'orbit-nexus': return <OrbitNexusDemo />;
    case 'halt-reveal': return <HaltRevealDemo />;
    case 'intent-pulse': return <IntentPulseDemo />;
    case 'stochastic-mass': return <StochasticMassDemo />;
    case 'radial-flow': return <RadialFlowDemo />;
    case 'edge-manifest': return <EdgeManifestDemo />;
    case 'spatial-tunnel': return <SpatialTunnelDemo />;
    case 'trace-memory': return <TraceMemoryDemo />;
    case 'kinetic-tutor': return <KineticTutorDemo />;
    case 'personality-matrix': return <PersonalityMatrixDemo />;
    case 'intent-morph': return <IntentMorphDemo />;
    case 'rhythm-pulse': return <RhythmPulseDemo />;
    case 'temporal-rewind': return <TemporalRewindDemo />;
    case 'viscous-scroll': return <ViscousScrollDemo />;
    case 'elastic-spine': return <ElasticSpineDemo />;
    case 'velocity-hero': return <VelocityHeroDemo />;
    case 'asymmetric-hero': return <AsymmetricHeroDemo />;
    case 'lab-ambient': return <LabAmbientDemo />;
    case 'adaptive-hero': return <AdaptiveHeroDemo />;
    case 'deconstruction-hero': return <DeconstructionHeroDemo />;
    case 'intent-cta-hero': return <IntentCTAHeroDemo />;
    case 'omni-hero': return <OmniHeroDemo />;
    case 'geometric-warp': return <GeometricWarpDemo />;
    case 'reactive-cluster': return <ReactiveClusterDemo />;
    case 'surface-tension': return <SurfaceTensionDemo />;
    case 'evasive-grid': return <EvasiveGridDemo />;
    case 'depth-probe': return <DepthProbeDemo />;
    case 'kinetic-shutter': return <KineticShutterDemo />;
    case 'gesture-intent': return <GestureIntentDemo />;
    case 'swipe-hesitation': return <SwipeHesitationDemo />;
    case 'orientation-flux': return <OrientationFluxDemo />;
    case 'thumb-reach-grid': return <ThumbReachGridDemo />;
    case 'kinetic-refresh': return <KineticRefreshDemo />;
    case 'memory-surface': return <MemorySurfaceDemo />;
    case 'reduced-motion-elegance': return <ReducedMotionEleganceDemo />;
    case 'monochrome-logic': return <MonochromeLogicDemo />;
    case 'premium-keyboard': return <PremiumKeyboardDemo />;
    case 'echo-focus': return <EchoFocusDemo />;
    case 'cognitive-shield': return <CognitiveShieldDemo />;
    case 'glyph-kinetic': return <GlyphKineticDemo />;
    case 'commitment-shard': return <CommitmentShardDemo />;
    case 'confidence-meter': return <ConfidenceMeterDemo />;
    case 'resonance-field': return <ResonanceFieldDemo />;
    case 'evolutionary-shell': return <EvolutionaryShellDemo />;
    case 'choice-convergence': return <ChoiceConvergenceDemo />;
    default: return (
      <div className="flex flex-col items-center gap-4 opacity-10">
        <Play size={48} />
        <span className="mono text-[8px] uppercase tracking-widest font-black">Simulation_Null</span>
      </div>
    );
  }
};

const Explorer: React.FC<ExplorerProps> = ({ components, onSelect }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [logicSeed, setLogicSeed] = useState('0x00');

  useEffect(() => {
    if (searchQuery) {
      setLogicSeed(`0x${searchQuery.length.toString(16).padStart(2, '0').toUpperCase()}`);
    }
  }, [searchQuery]);

  const filteredComponents = useMemo(() => {
    return components.filter(comp => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) {
        return selectedCategory === 'all' || comp.category === selectedCategory;
      }

      const matchesName = comp.name.toLowerCase().includes(query);
      const matchesDesc = comp.description.toLowerCase().includes(query);
      const matchesCat = comp.category.toLowerCase().includes(query);
      const matchesKeywords = comp.keywords?.some(kw => kw.toLowerCase().includes(query));

      const matchesSearch = matchesName || matchesDesc || matchesCat || matchesKeywords;
      const matchesCategory = selectedCategory === 'all' || comp.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [components, searchQuery, selectedCategory]);

  const categories = useMemo(() => {
    return ['all', ...Array.from(new Set(components.map(c => c.category)))];
  }, [components]);

  const isNoResults = searchQuery.length > 0 && filteredComponents.length === 0;

  return (
    <div className="flex flex-col lg:flex-row gap-12 pb-32">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full lg:w-80 lg:sticky lg:top-24 lg:h-[calc(100vh-160px)] space-y-10 overflow-y-auto pr-4 scrollbar-hide">
        
        {/* ENHANCED LAB SEARCH COMPONENT */}
        <div className="p-6 bg-neutral-900/40 border border-white/5 rounded-[2rem] space-y-6 relative overflow-hidden group/searchbox">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
          
          <div className="flex items-center justify-between px-1 relative z-10">
            <div className="flex items-center gap-2">
               <Fingerprint size={12} className={isSearchFocused ? 'text-cyan-500 animate-pulse' : 'text-neutral-700'} />
               <span className="mono text-[9px] text-neutral-500 font-black uppercase tracking-[0.3em]">Query_Engine_01</span>
            </div>
            <div className={`mono text-[8px] font-black transition-colors ${isNoResults ? 'text-rose-500' : 'text-cyan-800'}`}>
              {logicSeed}
            </div>
          </div>

          <div className="relative">
            {/* Focal Reticles */}
            <AnimatePresence>
               {isSearchFocused && (
                 <>
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2 }}
                     className="absolute -left-3 -top-3 w-4 h-4 border-t-2 border-l-2 border-cyan-500/40 pointer-events-none z-20" 
                   />
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2 }}
                     className="absolute -right-3 -top-3 w-4 h-4 border-t-2 border-r-2 border-cyan-500/40 pointer-events-none z-20" 
                   />
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2 }}
                     className="absolute -left-3 -bottom-3 w-4 h-4 border-b-2 border-l-2 border-cyan-500/40 pointer-events-none z-20" 
                   />
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2 }}
                     className="absolute -right-3 -bottom-3 w-4 h-4 border-b-2 border-r-2 border-cyan-500/40 pointer-events-none z-20" 
                   />
                 </>
               )}
            </AnimatePresence>

            <div className={`relative transition-all duration-700 rounded-2xl overflow-hidden border-2 ${
              isNoResults ? 'border-rose-500/30 bg-rose-500/5' :
              isSearchFocused ? 'border-cyan-500/50 bg-black' : 
              'border-white/5 bg-neutral-950/80'
            }`}>
              
              {/* Kinetic Scan Line */}
              <AnimatePresence>
                {searchQuery && (
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '400%' }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-y-0 w-48 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent skew-x-12 pointer-events-none z-0"
                  />
                )}
              </AnimatePresence>

              <div className="flex items-center px-4 relative z-10">
                <span className={`mono text-xs font-black transition-colors ${isSearchFocused ? 'text-cyan-500' : 'text-neutral-800'}`}>&gt;</span>
                <input 
                  type="text"
                  placeholder="BITSTREAM_INPUT..."
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent py-5 px-3 mono text-[11px] text-white focus:outline-none placeholder:text-neutral-800 uppercase tracking-[0.2em]"
                />
                {searchQuery && (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setSearchQuery('')}
                    className="text-neutral-700 hover:text-white transition-colors"
                  >
                    <X size={16} />
                  </motion.button>
                )}
              </div>

              {/* Bit-Status Buffer Bar */}
              <div className="h-1 w-full bg-white/5 relative z-10 overflow-hidden">
                 <motion.div 
                   animate={{ 
                     width: `${Math.min(100, (searchQuery.length / 12) * 100)}%`,
                     backgroundColor: isNoResults ? '#f43f5e' : '#06b6d4'
                   }}
                   className="h-full shadow-[0_0_15px_cyan]"
                 />
              </div>
            </div>
          </div>

          {/* Telemetry Output Line */}
          <div className="flex items-center justify-between px-1">
             <div className="flex items-center gap-2 mono text-[7px] text-neutral-600 font-bold uppercase">
                <Database size={8} className={searchQuery ? 'text-cyan-500' : ''} />
                <span>Buffer_Len: [{searchQuery.length.toString().padStart(2, '0')}]</span>
             </div>
             <div className={`mono text-[7px] font-black uppercase tracking-tighter ${isNoResults ? 'text-rose-500' : 'text-neutral-700'}`}>
                {searchQuery ? (isNoResults ? 'STATE_VOID' : `SYNCED_MATCH: ${filteredComponents.length}`) : 'ENGINE_IDLE'}
             </div>
          </div>
          
          {/* Decorative Logic Trace */}
          <div className="pt-2 opacity-10 flex justify-center gap-4">
             {[...Array(6)].map((_, i) => (
               <motion.div 
                key={i} 
                animate={{ scaleY: [1, 2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1 + Math.random(), delay: i * 0.1 }}
                className="w-px h-4 bg-white" 
               />
             ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mono text-[9px] text-neutral-700 uppercase font-black tracking-widest">
            <Filter size={10} /> Sector_Filter
          </div>
          <div className="flex flex-wrap lg:flex-col gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                whileHover={{ x: 5, skewX: -5 }}
                className={`px-4 py-3 rounded-xl text-left mono text-[9px] font-black tracking-[0.3em] uppercase transition-all border-2 group relative overflow-hidden ${
                  selectedCategory === cat 
                    ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400' 
                    : 'bg-transparent border-white/5 text-neutral-600 hover:border-white/20 hover:text-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between relative z-10">
                  {cat}
                  {selectedCategory === cat && <Zap size={10} className="text-cyan-500 animate-pulse" />}
                </div>
                {selectedCategory === cat && (
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }} 
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-y-0 w-1/4 bg-white/5 skew-x-12 pointer-events-none" 
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Quick List Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mono text-[9px] text-neutral-700 uppercase font-black tracking-widest">
            <Hash size={10} /> Local_Index
          </div>
          <div className="flex flex-col gap-1 max-h-[300px] lg:max-h-none overflow-y-auto pr-2 scrollbar-hide">
            {filteredComponents.map((comp) => (
              <button
                key={comp.id}
                onClick={() => onSelect(comp)}
                className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all text-left"
              >
                <span className="mono text-[10px] text-neutral-500 group-hover:text-white transition-colors truncate pr-4">
                  {comp.name}
                </span>
                <ArrowUpRight size={10} className="text-neutral-800 group-hover:text-cyan-500 transition-colors shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* MAIN EXPLORER CONTENT */}
      <div className="flex-1 space-y-16">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
          <div className="space-y-4">
            <h2 className="text-6xl lg:text-8xl font-black tracking-tighter italic uppercase leading-none">Laboratory</h2>
            <p className="text-neutral-500 mono text-[10px] tracking-[0.5em] uppercase">
              Browse_Functional_Primitives // {filteredComponents.length}_Modules_Match
            </p>
          </div>
          <div className="flex items-center gap-4 px-6 py-3 bg-neutral-900 border border-white/5 rounded-full mono text-[9px] text-neutral-500 uppercase">
            <Eye size={14} className="text-cyan-500" /> Dynamic_Stream_Ready
          </div>
        </header>

        {/* Specimen Results Area */}
        <AnimatePresence mode="wait">
          {filteredComponents.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 perspective-[2000px]"
            >
              {filteredComponents.map((comp, idx) => (
                <motion.div
                  key={comp.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ 
                    rotateY: 2, 
                    rotateX: -2, 
                    scale: 1.02,
                    y: -10 
                  }}
                  transition={{ 
                    delay: idx * 0.02,
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
                  onMouseEnter={() => setHoveredId(comp.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => onSelect(comp)}
                  className="group relative flex flex-col bg-[#080808] border border-white/10 rounded-[2.5rem] overflow-visible cursor-pointer shadow-2xl transform-gpu"
                >
                  {/* Technical Bezel Overlay */}
                  <div className="absolute -inset-1 border border-cyan-500/0 group-hover:border-cyan-500/20 rounded-[2.6rem] transition-colors pointer-events-none z-0" />
                  
                  {/* Corner Brackets */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/5 group-hover:border-cyan-500/40 transition-colors z-20" />
                  <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/5 group-hover:border-cyan-500/40 transition-colors z-20" />
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/5 group-hover:border-cyan-500/40 transition-colors z-20" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/5 group-hover:border-cyan-500/40 transition-colors z-20" />

                  {/* ID Serial Number Vertical */}
                  <div className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none rotate-180" style={{ writingMode: 'vertical-rl' }}>
                    <span className="mono text-[7px] text-white font-black tracking-[0.5em] uppercase">SN_{comp.id.slice(0, 6).toUpperCase()}</span>
                  </div>

                  {/* SIMULATION CHAMBER */}
                  <div className="h-60 bg-[#020202] relative flex items-center justify-center border-b border-white/10 rounded-t-[2.5rem] overflow-hidden group-hover:bg-black transition-colors">
                    
                    {/* CRT Scanline Overlay */}
                    <div className="absolute inset-0 pointer-events-none z-10 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] [background-size:100%_2px,3px_100%]" />
                    
                    {/* Interior Perspective Lines */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none [background-size:30px_30px] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)]" />

                    <AnimatePresence mode="wait">
                        {hoveredId === comp.id ? (
                          <motion.div
                            key="active"
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 0.55 }} 
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="w-full h-full flex items-center justify-center origin-center z-20"
                          >
                            <SimulationRouter id={comp.id} />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            className="flex flex-col items-center gap-5 text-neutral-600 z-20"
                          >
                            <div className="relative">
                               <Play size={28} strokeWidth={1.5} className="group-hover:text-cyan-500 transition-colors" />
                               <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 border border-white/20 rounded-full" />
                            </div>
                            <span className="mono text-[8px] uppercase tracking-[0.6em] font-black">Specimen_Ready</span>
                          </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Simulation Scanning Line */}
                    <motion.div 
                      animate={{ y: ['-100%', '300%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none z-10"
                    />
                  </div>

                  {/* MODULE CONTENT */}
                  <div className="p-8 flex flex-col gap-6 relative z-10 bg-[#080808] rounded-b-[2.5rem]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="mono text-[8px] tracking-[0.3em] text-cyan-500 font-black uppercase px-2 py-0.5 border border-cyan-500/30 rounded-sm bg-cyan-500/5 transition-all group-hover:bg-cyan-500 group-hover:text-black">{comp.category}</span>
                        <div className="h-[1px] flex-1 bg-white/5" />
                        <div className="flex gap-1">
                           <div className={`w-1 h-1 rounded-full ${hoveredId === comp.id ? 'bg-cyan-500 animate-pulse shadow-[0_0_10px_cyan]' : 'bg-white/10'}`} />
                           <div className="w-1 h-1 rounded-full bg-white/10" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-tight group-hover:text-white transition-colors">{comp.name}</h3>
                      <p className="text-neutral-500 text-[12px] font-light leading-relaxed line-clamp-2 pt-2 group-hover:text-neutral-400 transition-colors">{comp.description}</p>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex flex-col gap-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 mono text-[8px] text-neutral-600 font-black uppercase">
                          <Gauge size={12} className="text-neutral-700" /> Mass: {comp.difficulty}
                        </div>
                        <div className="flex items-center gap-1.5 mono text-[8px] text-neutral-800 font-bold">
                           <Activity size={10} /> 60_FPS
                        </div>
                      </div>
                      
                      {/* Interaction Bar */}
                      <div className="relative w-full h-10 group/btn overflow-hidden rounded-xl border border-white/5 bg-neutral-900/50 flex items-center justify-center">
                        <motion.div 
                          initial={false}
                          animate={{ x: hoveredId === comp.id ? 0 : -200 }}
                          className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-cyan-500/20 to-transparent transition-all"
                        />
                        <span className="relative z-10 mono text-[8px] font-black text-neutral-500 group-hover:text-cyan-400 uppercase tracking-[0.4em] flex items-center gap-3">
                          INIT_DEEP_LINK <ArrowUpRight size={10} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Reactive Glow Aura */}
                  <motion.div 
                    animate={{ 
                        opacity: hoveredId === comp.id ? 0.3 : 0,
                        scale: hoveredId === comp.id ? 1.1 : 0.8
                    }}
                    className="absolute -inset-10 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10"
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-40 flex flex-col items-center justify-center text-center space-y-8"
            >
              <div className="w-24 h-24 rounded-full bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-700 relative overflow-hidden">
                <Search size={48} strokeWidth={1} />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 border border-cyan-500/10 border-dashed rounded-full"
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-4xl font-black italic tracking-tighter uppercase text-white/40 leading-none">No_Matches_Detected</h3>
                <p className="mono text-[10px] text-neutral-600 uppercase tracking-[0.5em] max-w-sm mx-auto leading-relaxed">
                  The current search parameters do not correlate with any functional primitives in the lab buffer.
                </p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="px-10 py-4 bg-white/5 border border-white/10 rounded-full mono text-[9px] font-black text-cyan-500 hover:bg-cyan-500 hover:text-black transition-all uppercase tracking-widest shadow-xl"
              >
                Reset_All_Filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Explorer;
