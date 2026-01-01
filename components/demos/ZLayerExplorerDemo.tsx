
import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ZLayerExplorerDemo = () => {
  const [slice, setSlice] = useState(0); // 0 to 100
  
  const springSlice = useSpring(slice, { stiffness: 100, damping: 30 });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#050505] p-12 gap-16">
      <div className="text-center z-50">
        <h4 className="text-4xl font-black italic tracking-tighter uppercase text-white">Cross_Section_Scan</h4>
        <p className="mono text-[9px] text-cyan-500 mt-2 uppercase tracking-widest">Depth_Slice: {(slice).toFixed(1)}mm</p>
      </div>

      <div className="relative w-80 h-96 border border-white/5 rounded-3xl overflow-hidden bg-neutral-900/40">
        {/* Layer Stack */}
        {[...Array(20)].map((_, i) => {
          const depth = (i / 20) * 100;
          return (
            <DepthSlice key={i} targetDepth={depth} currentSlice={springSlice} />
          );
        })}

        {/* Scan Line Visualization */}
        <motion.div 
          style={{ top: `${slice}%` }}
          className="absolute inset-x-0 h-1 bg-cyan-500 shadow-[0_0_20px_cyan] z-50 pointer-events-none opacity-40"
        />
      </div>

      <div className="w-full max-w-sm flex flex-col gap-4">
        <input 
          type="range" min="0" max="100" step="0.1" 
          value={slice} 
          onChange={(e) => setSlice(parseFloat(e.target.value))}
          className="w-full accent-cyan-500 h-2 bg-white/5 rounded-full appearance-none cursor-pointer"
        />
        <div className="flex justify-between mono text-[8px] text-neutral-600 uppercase">
          <span>Front_Surface</span>
          <span>Core_Logic</span>
          <span>Back_Plane</span>
        </div>
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-800 leading-relaxed uppercase">
        SCRUB TO NAVIGATE THROUGH THE COMPONENT'S SPATIAL INTERNALITY. ONLY THE SLICE AT THE CURRENT DEPTH VECTOR REMAINS SHARP.
      </div>
    </div>
  );
};

const DepthSlice = ({ targetDepth, currentSlice }: any) => {
  // Fix: Move useTransform hooks out of JSX and into component body
  const opacity = useTransform(currentSlice, (s: any) => {
    const dist = Math.abs((s as number) - targetDepth);
    return Math.max(0, 1 - dist / 15);
  });

  const blur = useTransform(currentSlice, (s: any) => {
    const dist = Math.abs((s as number) - targetDepth);
    return `${dist / 2}px`;
  });

  const scale = useTransform(currentSlice, (s: any) => {
    const dist = Math.abs((s as number) - targetDepth);
    return 1 - dist / 500;
  });

  const filterVal = useTransform(blur, (v) => `blur(${v})`);

  return (
    <motion.div
      style={{ opacity, filter: filterVal, scale }}
      className="absolute inset-4 border border-cyan-500/20 rounded-2xl flex items-center justify-center p-8 bg-black/40"
    >
       <div className="text-center">
          <div className="w-2 h-2 bg-cyan-500 rounded-full mx-auto mb-4" />
          <div className="h-2 w-24 bg-white/10 rounded mb-2" />
          <div className="h-1 w-12 bg-white/5 rounded mx-auto" />
       </div>
    </motion.div>
  );
};

export default ZLayerExplorerDemo;
