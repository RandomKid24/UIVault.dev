
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ZPortalListDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const items = [
    { title: 'VOID_ENTRY', sub: 'Initializing spatial coordinates' },
    { title: 'CORE_SYNAPSE', sub: 'Logic mapping in progress' },
    { title: 'STRATA_DELTA', sub: 'Depth buffer optimized' },
    { title: 'NEURAL_LINK', sub: 'Establishing kinetic bond' },
    { title: 'VOID_EXIT', sub: 'Temporal state solidified' }
  ];

  return (
    <div className="relative w-full h-[500px] bg-black overflow-hidden rounded-2xl flex items-center justify-center">
      <div 
        ref={containerRef}
        className="absolute inset-0 overflow-y-auto scrollbar-hide snap-y snap-mandatory z-20"
      >
        <div className="h-[500%] w-full" />
      </div>

      <div className="relative w-full h-full perspective-[1200px] flex items-center justify-center pointer-events-none">
        {items.map((item, i) => (
          <ZItem 
            key={i} 
            item={item} 
            index={i} 
            progress={scrollYProgress} 
          />
        ))}
      </div>

      <div className="absolute bottom-8 text-center mono text-[10px] text-neutral-700 animate-pulse z-30 uppercase tracking-[0.5em]">
        Scroll_to_Dive
      </div>
    </div>
  );
};

const ZItem = ({ item, index, progress }: any) => {
  const start = index * 0.2;
  const end = (index + 1) * 0.2;

  const z = useTransform(progress, [start - 0.2, start, end, end + 0.2], [-1500, 0, 800, 1500]);
  const opacity = useTransform(progress, [start - 0.1, start, end, end + 0.1], [0, 1, 0.2, 0]);
  const scale = useTransform(progress, [start - 0.2, start, end], [0.2, 1, 4]);
  const blur = useTransform(progress, [start - 0.1, start, end, end + 0.1], ["10px", "0px", "5px", "20px"]);

  // Fix: Correctly deriving the filter string
  const filterVal = useTransform(blur, (v) => `blur(${v})`);

  return (
    <motion.div
      style={{ 
        translateZ: z, 
        opacity, 
        scale,
        filter: filterVal
      }}
      className="absolute w-96 h-64 border border-cyan-500/20 bg-neutral-900/40 rounded-3xl p-12 backdrop-blur-xl flex flex-col justify-center text-center shadow-[0_0_50px_rgba(0,0,0,0.5)]"
    >
      <span className="mono text-[8px] text-cyan-500 tracking-[0.6em] mb-4 uppercase">Node_0{index}</span>
      <h3 className="text-4xl font-black italic tracking-tighter text-white mb-2 uppercase">{item.title}</h3>
      <p className="text-neutral-500 text-[10px] mono uppercase tracking-widest">{item.sub}</p>
    </motion.div>
  );
};

export default ZPortalListDemo;
