
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const DeconstructionHeroDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const dispersion = useTransform(scrollYProgress, [0, 0.5], [0, 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 1, 0]);
  const wireframeOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <div className="relative w-full h-full bg-neutral-900 overflow-hidden rounded-2xl">
      <div ref={containerRef} className="h-full overflow-y-auto scrollbar-hide py-[200px]">
        <div className="h-[200%] w-full flex flex-col items-center">
          
          <div className="sticky top-1/2 -translate-y-1/2 w-full max-w-2xl flex flex-col items-center">
            {/* Solid Elements */}
            <motion.div style={{ opacity }} className="relative z-10 text-center">
              <h1 className="text-7xl font-black italic tracking-tighter mb-4">STRUCTURE</h1>
              <div className="h-1 w-32 bg-cyan-500 mx-auto" />
            </motion.div>

            {/* Deconstructed Wireframe (Shattered parts) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  style={{ 
                    x: useTransform(scrollYProgress, [0, 0.5], [0, (i % 2 === 0 ? 1 : -1) * (i + 1) * 100]),
                    y: useTransform(scrollYProgress, [0, 0.5], [0, (i < 4 ? 1 : -1) * 150]),
                    rotate: useTransform(scrollYProgress, [0, 0.5], [0, i * 45]),
                    opacity: wireframeOpacity
                  }}
                  className="absolute w-32 h-32 border border-cyan-500/40 p-2 mono text-[8px] text-cyan-800"
                >
                  fragment_0{i}
                  <div className="mt-2 h-0.5 bg-cyan-500/20" />
                  <div className="mt-1 h-0.5 bg-cyan-500/10 w-2/3" />
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center text-neutral-600 mono text-[9px] uppercase tracking-[0.4em]">
              Scroll_To_Deconstruct
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default DeconstructionHeroDemo;
