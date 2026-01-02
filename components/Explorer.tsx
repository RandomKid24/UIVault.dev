
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComponentMeta } from '../types';
import { ArrowUpRight, Gauge, Eye, Play, Search, Hash, Filter } from 'lucide-react';

// === DEMO IMPORTS FOR PREVIEWS ===
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
// Restoration of deeper legacy/supplemental demos
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

interface ExplorerProps {
  components: ComponentMeta[];
  onSelect: (c: ComponentMeta) => void;
}

const SimulationRouter: React.FC<{ id: string }> = ({ id }) => {
  switch (id) {
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
    // Restoration cases
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

  const filteredComponents = useMemo(() => {
    return components.filter(comp => {
      const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          comp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          comp.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || comp.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    // Fix: Correct typo in filteredComponents useMemo dependency array where setMaxedCategory was used instead of selectedCategory.
  }, [components, searchQuery, selectedCategory]);

  const categories = useMemo(() => {
    return ['all', ...Array.from(new Set(components.map(c => c.category)))];
  }, [components]);

  return (
    <div className="flex flex-col lg:flex-row gap-12 pb-32">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full lg:w-72 lg:sticky lg:top-24 lg:h-[calc(100vh-160px)] space-y-10 overflow-y-auto pr-4 scrollbar-hide">
        {/* Search Header */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="mono text-[10px] text-neutral-600 font-black uppercase tracking-[0.4em]">Navigator</span>
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_10px_cyan]" />
          </div>
          
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-neutral-600 group-focus-within:text-cyan-500 transition-colors">
              <Search size={14} />
            </div>
            <input 
              type="text"
              placeholder="SEARCH_PRIMITIVES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-white/5 rounded-2xl py-4 pl-12 pr-4 mono text-[10px] text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-neutral-700 uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Categories Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mono text-[9px] text-neutral-700 uppercase font-black tracking-widest">
            <Filter size={10} /> Categories
          </div>
          <div className="flex flex-wrap lg:flex-col gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-left mono text-[9px] font-bold tracking-widest uppercase transition-all border ${
                  selectedCategory === cat 
                    ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400' 
                    : 'bg-transparent border-white/5 text-neutral-600 hover:border-white/10 hover:text-neutral-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Quick List Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mono text-[9px] text-neutral-700 uppercase font-black tracking-widest">
            <Hash size={10} /> Primitive_Index
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
            {filteredComponents.length === 0 && (
              <div className="p-4 text-center mono text-[8px] text-neutral-800 uppercase italic">
                NO_RESULTS_FOUND
              </div>
            )}
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

        {/* High-density Grid Optimization */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {filteredComponents.map((comp, idx) => (
            <motion.div
              key={comp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.01 }}
              onMouseEnter={() => setHoveredId(comp.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelect(comp)}
              className="group relative flex flex-col bg-neutral-900/20 border border-white/5 rounded-[2.5rem] overflow-hidden cursor-pointer hover:bg-neutral-900/60 transition-all duration-500 hover:border-white/20"
            >
              {/* SIMULATION CHAMBER */}
              <div className="h-56 bg-black/40 relative flex items-center justify-center border-b border-white/5 overflow-hidden">
                <AnimatePresence mode="wait">
                    {hoveredId === comp.id ? (
                      <motion.div
                        key="active"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 0.5 }} 
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="w-full h-full flex items-center justify-center origin-center"
                      >
                        <SimulationRouter id={comp.id} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        className="flex flex-col items-center gap-4 text-neutral-600"
                      >
                        <Play size={24} strokeWidth={1} />
                        <span className="mono text-[7px] uppercase tracking-[0.4em] font-black">Simulation_Ready</span>
                      </motion.div>
                    )}
                </AnimatePresence>

                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
              </div>

              <div className="p-8 flex flex-col gap-6">
                <div>
                  <span className="mono text-[8px] tracking-[0.4em] text-cyan-500 font-black uppercase mb-2 block opacity-50">{comp.category}</span>
                  <h3 className="text-xl font-black italic tracking-tighter uppercase leading-none mb-3">{comp.name}</h3>
                  <p className="text-neutral-500 text-[12px] font-light leading-relaxed line-clamp-2">{comp.description}</p>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 mono text-[8px] text-neutral-600 font-black uppercase">
                    <Gauge size={12} className="text-neutral-700" /> Diff: {comp.difficulty}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full mono text-[7px] text-neutral-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors font-black uppercase tracking-widest">
                    Deploy <ArrowUpRight size={10} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explorer;
