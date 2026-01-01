import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ComponentMeta } from '../types';
import { Activity, Code, Layers, MousePointer2, Target } from 'lucide-react';

// New Labs Components
import TectonicAccordionDemo from './demos/TectonicAccordionDemo';
import TrailCursorDemo from './demos/TrailCursorDemo';
import KineticStatusDemo from './demos/KineticStatusDemo';
import VelocityScrollbarDemo from './demos/VelocityScrollbarDemo';
import RefractiveImageDemo from './demos/RefractiveImageDemo';
import NeuralBadgeDemo from './demos/NeuralBadgeDemo';
import DecayTimerDemo from './demos/DecayTimerDemo';
import BioProfileDemo from './demos/BioProfileDemo';

// Existing Experimental Primitives
import ActionImpulseDemo from './demos/ActionImpulseDemo';
import SequenceStrataDemo from './demos/SequenceStrataDemo';
import PortalBranchDemo from './demos/PortalBranchDemo';
import FrictionToggleDemo from './demos/FrictionToggleDemo';
import LiquidTabDemo from './demos/LiquidTabDemo';
import VortexDialDemo from './demos/VortexDialDemo';
import ImpulseSignalDemo from './demos/ImpulseSignalDemo';
import VolumetricGaugeDemo from './demos/VolumetricGaugeDemo';
import CrystallizedTextDemo from './demos/CrystallizedTextDemo';

// Existing Demos
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

// (Rest of the imports are preserved as per existing file)
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
import GestureIntentDemo from './demos/GestureIntentDemo';
import SwipeHesitationDemo from './demos/SwipeHesitationDemo';
import OrientationFluxDemo from './demos/OrientationFluxDemo';
import ThumbReachGridDemo from './demos/ThumbReachGridDemo';
import KineticRefreshDemo from './demos/KineticRefreshDemo';
import MemorySurfaceDemo from './demos/MemorySurfaceDemo';
import GeometricWarpDemo from './demos/GeometricWarpDemo';
import ReactiveClusterDemo from './demos/ReactiveClusterDemo';
import SurfaceTensionDemo from './demos/SurfaceTensionDemo';
import EvasiveGridDemo from './demos/EvasiveGridDemo';
import DepthProbeDemo from './demos/DepthProbeDemo';
import KineticShutterDemo from './demos/KineticShutterDemo';

interface DetailViewProps {
  component: ComponentMeta;
  temporalContext?: {
    time: number;
    entropy: number;
    lastActivity: number;
  };
}

const DetailView: React.FC<DetailViewProps> = ({ component, temporalContext }) => {
  const [tab, setTab] = useState<'demo' | 'code' | 'docs'>('demo');

  const renderDemo = () => {
    const props = { temporal: temporalContext };
    
    switch (component.id) {
      // New Specific Labs Modules
      case 'tectonic-accordion': return <TectonicAccordionDemo />;
      case 'trail-cursor': return <TrailCursorDemo />;
      case 'kinetic-status': return <KineticStatusDemo />;
      case 'velocity-scrollbar': return <VelocityScrollbarDemo />;
      case 'refractive-image': return <RefractiveImageDemo />;
      case 'neural-badge': return <NeuralBadgeDemo />;
      case 'decay-timer': return <DecayTimerDemo />;
      case 'bio-profile': return <BioProfileDemo />;

      // Experimental Primitives
      case 'action-impulse': return <ActionImpulseDemo />;
      case 'sequence-strata': return <SequenceStrataDemo />;
      case 'portal-branch': return <PortalBranchDemo />;
      case 'friction-toggle': return <FrictionToggleDemo />;
      case 'liquid-tab': return <LiquidTabDemo />;
      case 'vortex-dial': return <VortexDialDemo />;
      case 'impulse-signal': return <ImpulseSignalDemo />;
      case 'volumetric-gauge': return <VolumetricGaugeDemo />;
      case 'crystallized-text': return <CrystallizedTextDemo />;

      // Existing Cases
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
      case 'temporal-evolution': return <TemporalEvolutionDemo {...props} />;
      case 'state-memory': return <StateMemoryDemo {...props} />;
      case 'atrophy-surface': return <AtrophySurfaceDemo {...props} />;
      case 'visual-aging': return <VisualAgingDemo {...props} />;
      case 'inactivity-reset': return <InactivityResetDemo {...props} />;
      case 'circadian-interface': return <CircadianInterfaceDemo {...props} />;
      case 'history-echo': return <HistoryEchoDemo {...props} />;
      case 'chrono-dimension': return <ChronoDimensionDemo {...props} />;

      // Restoration of other legacy cases...
      case 'indecision-sync': return <IndecisionSyncDemo />;
      case 'commitment-shard': return <CommitmentShardDemo />;
      case 'confidence-meter': return <ConfidenceMeterDemo />;
      case 'resonance-field': return <ResonanceFieldDemo />;
      case 'evolutionary-shell': return <EvolutionaryShellDemo />;
      case 'trust-pulse': return <TrustPulseDemo />;
      case 'impatience-engine': return <ImpatienceEngineDemo />;
      case 'choice-convergence': return <ChoiceConvergenceDemo />;
      case 'reduced-motion-elegance': return <ReducedMotionEleganceDemo />;
      case 'monochrome-logic': return <MonochromeLogicDemo />;
      case 'premium-keyboard': return <PremiumKeyboardDemo />;
      case 'echo-focus': return <EchoFocusDemo />;
      case 'universal-kinetic': return <UniversalKineticDemo />;
      case 'cognitive-shield': return <CognitiveShieldDemo />;
      case 'glyph-kinetic': return <GlyphKineticDemo />;
      case 'gesture-intent': return <GestureIntentDemo />;
      case 'swipe-hesitation': return <SwipeHesitationDemo />;
      case 'orientation-flux': return <OrientationFluxDemo />;
      case 'thumb-reach-grid': return <ThumbReachGridDemo />;
      case 'kinetic-refresh': return <KineticRefreshDemo />;
      case 'memory-surface': return <MemorySurfaceDemo />;
      case 'geometric-warp': return <GeometricWarpDemo />;
      case 'reactive-cluster': return <ReactiveClusterDemo />;
      case 'surface-tension': return <SurfaceTensionDemo />;
      case 'evasive-grid': return <EvasiveGridDemo />;
      case 'depth-probe': return <DepthProbeDemo />;
      case 'kinetic-shutter': return <KineticShutterDemo />;
      case 'velocity-hero': return <VelocityHeroDemo />;
      case 'asymmetric-hero': return <AsymmetricHeroDemo />;
      case 'lab-ambient': return <LabAmbientDemo />;
      case 'adaptive-hero': return <AdaptiveHeroDemo />;
      case 'deconstruction-hero': return <DeconstructionHeroDemo />;
      case 'intent-cta-hero': return <IntentCTAHeroDemo />;
      case 'omni-hero': return <OmniHeroDemo />;
      case 'rhythm-pulse': return <RhythmPulseDemo />;
      case 'temporal-rewind': return <TemporalRewindDemo />;
      case 'viscous-scroll': return <ViscousScrollDemo />;
      case 'elastic-spine': return <ElasticSpineDemo />;
      case 'kinetic-tutor': return <KineticTutorDemo />;
      case 'personality-matrix': return <PersonalityMatrixDemo />;
      case 'intent-morph': return <IntentMorphDemo />;
      case 'edge-manifest': return <EdgeManifestDemo />;
      case 'spatial-tunnel': return <SpatialTunnelDemo />;
      case 'trace-memory': return <TraceMemoryDemo />;
      case 'intent-pulse': return <IntentPulseDemo />;
      case 'stochastic-mass': return <StochasticMassDemo />;
      case 'radial-flow': return <RadialFlowDemo />;
      case 'velocity-reader': return <VelocityReaderDemo />;
      case 'orbit-nexus': return <OrbitNexusDemo />;
      case 'halt-reveal': return <HaltRevealDemo />;
      case 'magneto-nav': return <MagnetoNavDemo />;
      case 'tension-grid': return <TensionGridDemo />;
      case 'chrono-scroll': return <ChronoScrollDemo />;
      
      default: return <div className="p-20 text-center opacity-20 mono">EXPERIMENTAL_ASSET_LOADING...</div>;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      <div className="lg:col-span-4 space-y-8">
        <div>
          <h1 className="text-6xl font-black tracking-tighter mb-4 uppercase">{component.name}</h1>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-cyan-500/10 text-cyan-500 mono text-[10px] font-bold border border-cyan-500/20">
              {component.category.toUpperCase()}
            </span>
            <span className="px-3 py-1 bg-white/5 text-neutral-400 mono text-[10px] border border-white/5">
              DIFF: {component.difficulty.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <h4 className="flex items-center gap-2 mono text-[11px] font-bold text-neutral-500 mb-2 uppercase">
              <Activity size={14} /> Interaction_Model
            </h4>
            <p className="text-neutral-300 text-sm leading-relaxed font-light">{component.interactionModel}</p>
          </section>

          <section>
            <h4 className="flex items-center gap-2 mono text-[11px] font-bold text-neutral-500 mb-2 uppercase">
              <Layers size={14} /> Motion_Logic
            </h4>
            <p className="text-neutral-300 text-sm leading-relaxed font-light">{component.motionLogic}</p>
          </section>

          <section>
            <h4 className="flex items-center gap-2 mono text-[11px] font-bold text-neutral-500 mb-2 uppercase">
              <Target size={14} /> Use_Cases
            </h4>
            <ul className="space-y-1">
              {component.useCases.map((use, i) => (
                <li key={i} className="text-neutral-400 text-xs flex items-center gap-2">
                  <div className="w-1 h-1 bg-cyan-500 rounded-full" /> {use}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="lg:col-span-8 flex flex-col gap-6">
        <div className="bg-neutral-900/60 border border-white/5 rounded-2xl overflow-hidden min-h-[500px] flex flex-col shadow-2xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-neutral-900/40">
             <div className="flex items-center gap-4" role="tablist" aria-label="Demo Tabs">
               {['demo', 'code', 'docs'].map((t) => (
                 <button 
                  key={t}
                  role="tab"
                  type="button"
                  aria-selected={tab === t}
                  aria-controls={`${t}-panel`}
                  id={`${t}-tab`}
                  onClick={() => setTab(t as any)}
                  className={`mono text-[10px] tracking-widest font-bold transition-colors py-2 focus:outline-none ${
                    tab === t ? 'text-white border-b-2 border-cyan-500' : 'text-neutral-600 hover:text-neutral-400'
                  }`}
                 >
                   {t.toUpperCase()}
                 </button>
               ))}
             </div>
          </div>
          
          <div className="flex-1 relative bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:32px_32px]">
            <div 
              role="tabpanel" 
              id={`${tab}-panel`} 
              aria-labelledby={`${tab}-tab`}
              className="absolute inset-0 flex items-center justify-center overflow-hidden"
            >
              {tab === 'demo' ? (
                <>
                  {renderDemo()}
                  <div className="absolute bottom-6 left-6 flex items-center gap-2 text-neutral-600 mono text-[9px]">
                    <MousePointer2 size={12} />
                    <span>EXPERIMENTAL_SENSORY_DATA: ON</span>
                  </div>
                </>
              ) : tab === 'code' ? (
                <div className="p-8 mono text-xs text-neutral-400 leading-relaxed overflow-auto w-full h-full max-h-[500px]">
                  <pre><code>{`// EXPORTED_LAB_MODULE: ${component.name}\n// EPOCH_STAMP: ${Date.now()}\n\nimport { motion } from 'framer-motion';\n\nconst ${component.name} = ({ data }) => {\n  return (\n    <motion.div\n      animate={{ \n        scale: data.magnitude, \n        filter: \`blur(\${data.uncertainty}px)\` \n      }}\n    >\n      {/* Non-Chart Sensory Logic [${component.id}] */}\n    </motion.div>\n  );\n};`}</code></pre>
                </div>
              ) : (
                <div className="p-12 space-y-8 max-w-2xl w-full h-full">
                   <h3 className="text-2xl font-bold italic uppercase tracking-tighter text-cyan-500">Sensory_Data_Log</h3>
                   <div className="grid grid-cols-2 gap-8">
                     <div>
                       <p className="mono text-[10px] text-neutral-500 mb-2">SIGNAL_PROCESSING</p>
                       <ul className="space-y-2 text-sm text-neutral-400 font-light">
                          <li>Visual Magnitude: Luminance-mapped</li>
                          <li>Confidence Vector: Jitter-stabilized</li>
                          <li>Trend Velocity: Frequency-sine</li>
                       </ul>
                     </div>
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;