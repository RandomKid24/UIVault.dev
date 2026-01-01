import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComponentMeta } from '../types';
import { ArrowUpRight, Gauge, Eye, Play, Terminal } from 'lucide-react';

// === DEMO IMPORTS FOR PREVIEWS ===
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
import HazyCertaintyDemo from './demos/HazyCertaintyDemo';
import DataVacuumDemo from './demos/DataVacuumDemo';
import GridCompressionDemo from './demos/GridCompressionDemo';
import FragileGlassDemo from './demos/FragileGlassDemo';
import CadenceLockDemo from './demos/CadenceLockDemo';
import FleeingIntentDemo from './demos/FleeingIntentDemo';
import EarnedLegibilityDemo from './demos/EarnedLegibilityDemo';
import StructuralGlitchDemo from './demos/StructuralGlitchDemo';
import ThermalOverloadDemo from './demos/ThermalOverloadDemo';
import RebelNavigationDemo from './demos/RebelNavigationDemo';
import SeismicSurfaceDemo from './demos/SeismicSurfaceDemo';
import SpatialStrataDemo from './demos/SpatialStrataDemo';
import PerspectiveFocalDemo from './demos/PerspectiveFocalDemo';
import ZPortalListDemo from './demos/ZPortalListDemo';
import ProximityFieldDemo from './demos/ProximityFieldDemo';
import IsometricGridFluxDemo from './demos/IsometricGridFluxDemo';
import DepthSqueezeDemo from './demos/DepthSqueezeDemo';
import ZLayerExplorerDemo from './demos/ZLayerExplorerDemo';
import OrbitalZAxisDemo from './demos/OrbitalZAxisDemo';
import TemporalEvolutionDemo from './demos/TemporalEvolutionDemo';
import StateMemoryDemo from './demos/StateMemoryDemo';
import AtrophySurfaceDemo from './demos/AtrophySurfaceDemo';
import VisualAgingDemo from './demos/VisualAgingDemo';
import InactivityResetDemo from './demos/InactivityResetDemo';
import CircadianInterfaceDemo from './demos/CircadianInterfaceDemo';
import HistoryEchoDemo from './demos/HistoryEchoDemo';
import ChronoDimensionDemo from './demos/ChronoDimensionDemo';
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
import UniversalKineticDemo from './demos/UniversalKineticDemo';
import CognitiveShieldDemo from './demos/CognitiveShieldDemo';
import GlyphKineticDemo from './demos/GlyphKineticDemo';
import IndecisionSyncDemo from './demos/IndecisionSyncDemo';
import CommitmentShardDemo from './demos/CommitmentShardDemo';
import ConfidenceMeterDemo from './demos/ConfidenceMeterDemo';
import ResonanceFieldDemo from './demos/ResonanceFieldDemo';
import EvolutionaryShellDemo from './demos/EvolutionaryShellDemo';
import TrustPulseDemo from './demos/TrustPulseDemo';
import ImpatienceEngineDemo from './demos/ImpatienceEngineDemo';
import ChoiceConvergenceDemo from './demos/ChoiceConvergenceDemo';

interface ExplorerProps {
  components: ComponentMeta[];
  onSelect: (c: ComponentMeta) => void;
}

const SimulationRouter: React.FC<{ id: string }> = ({ id }) => {
  switch (id) {
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
    case 'hazy-certainty': return <HazyCertaintyDemo />;
    case 'data-vacuum': return <DataVacuumDemo />;
    case 'grid-compression': return <GridCompressionDemo />;
    case 'fragile-glass': return <FragileGlassDemo />;
    case 'cadence-lock': return <CadenceLockDemo />;
    case 'fleeing-intent': return <FleeingIntentDemo />;
    case 'earned-legibility': return <EarnedLegibilityDemo />;
    case 'structural-glitch': return <StructuralGlitchDemo />;
    case 'thermal-overload': return <ThermalOverloadDemo />;
    case 'rebel-navigation': return <RebelNavigationDemo />;
    case 'seismic-surface': return <SeismicSurfaceDemo />;
    case 'spatial-strata': return <SpatialStrataDemo />;
    case 'perspective-focal': return <PerspectiveFocalDemo />;
    case 'z-portal-list': return <ZPortalListDemo />;
    case 'proximity-field': return <ProximityFieldDemo />;
    case 'isometric-grid-flux': return <IsometricGridFluxDemo />;
    case 'depth-squeeze': return <DepthSqueezeDemo />;
    case 'z-layer-explorer': return <ZLayerExplorerDemo />;
    case 'orbital-z-axis': return <OrbitalZAxisDemo />;
    case 'temporal-evolution': return <TemporalEvolutionDemo />;
    case 'state-memory': return <StateMemoryDemo />;
    case 'atrophy-surface': return <AtrophySurfaceDemo />;
    case 'visual-aging': return <VisualAgingDemo />;
    case 'inactivity-reset': return <InactivityResetDemo />;
    case 'circadian-interface': return <CircadianInterfaceDemo />;
    case 'history-echo': return <HistoryEchoDemo />;
    case 'chrono-dimension': return <ChronoDimensionDemo />;
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
    case 'universal-kinetic': return <UniversalKineticDemo />;
    case 'cognitive-shield': return <CognitiveShieldDemo />;
    case 'glyph-kinetic': return <GlyphKineticDemo />;
    case 'indecision-sync': return <IndecisionSyncDemo />;
    case 'commitment-shard': return <CommitmentShardDemo />;
    case 'confidence-meter': return <ConfidenceMeterDemo />;
    case 'resonance-field': return <ResonanceFieldDemo />;
    case 'evolutionary-shell': return <EvolutionaryShellDemo />;
    case 'trust-pulse': return <TrustPulseDemo />;
    case 'impatience-engine': return <ImpatienceEngineDemo />;
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

  return (
    <div className="space-y-16 pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
        <div className="space-y-4">
          <h2 className="text-8xl font-black tracking-tighter italic uppercase leading-none">Laboratory</h2>
          <p className="text-neutral-500 mono text-[10px] tracking-[0.5em] uppercase">Browse_Functional_Primitives // {components.length}_Modules_Loaded</p>
        </div>
        <div className="flex items-center gap-4 px-6 py-3 bg-neutral-900 border border-white/5 rounded-full mono text-[9px] text-neutral-500 uppercase">
          <Eye size={14} className="text-cyan-500" /> All_Previews_Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {components.map((comp, idx) => (
          <motion.div
            key={comp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.02 }}
            onMouseEnter={() => setHoveredId(comp.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => onSelect(comp)}
            className="group relative flex flex-col bg-neutral-900/20 border border-white/5 rounded-[2.5rem] overflow-hidden cursor-pointer hover:bg-neutral-900/60 transition-all duration-500 hover:border-white/20"
          >
            {/* SIMULATION CHAMBER */}
            <div className="h-64 bg-black/40 relative flex items-center justify-center border-b border-white/5 overflow-hidden">
               <AnimatePresence mode="wait">
                  {hoveredId === comp.id ? (
                    <motion.div
                      key="active"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 0.55 }} // Consistent scaling for grid view
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
                      <Play size={32} strokeWidth={1} />
                      <span className="mono text-[8px] uppercase tracking-[0.4em] font-black">Simulation_Ready</span>
                    </motion.div>
                  )}
               </AnimatePresence>

               <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
            </div>

            <div className="p-10 flex flex-col gap-6">
              <div>
                <span className="mono text-[9px] tracking-[0.4em] text-cyan-500 font-black uppercase mb-3 block opacity-50">{comp.category}</span>
                <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none mb-4">{comp.name}</h3>
                <p className="text-neutral-500 text-sm font-light leading-relaxed line-clamp-2">{comp.description}</p>
              </div>

              <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 mono text-[9px] text-neutral-600 font-black uppercase">
                  <Gauge size={14} className="text-neutral-700" /> Diff: {comp.difficulty}
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mono text-[8px] text-neutral-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors font-black uppercase tracking-widest">
                  Deploy <ArrowUpRight size={12} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Explorer;