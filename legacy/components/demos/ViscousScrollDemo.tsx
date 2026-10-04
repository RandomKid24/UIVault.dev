
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ViscousScrollDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  // Create a laggy, heavy scroll representation
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 20, damping: 10 });
  const viscousOffset = useTransform(smoothProgress, [0, 1], [0, -400]);
  const normalOffset = useTransform(scrollYProgress, [0, 1], [0, -400]);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl bg-black border border-white/5">
      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-auto scrollbar-hide"
      >
        <div className="h-[300%] w-full relative">
          
          <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center gap-20 p-12">
            
            <div className="grid grid-cols-2 gap-24 w-full">
              {/* Normal Content */}
              <div className="space-y-4">
                <span className="mono text-[9px] text-neutral-600 tracking-widest uppercase">Linear_Reference</span>
                <motion.div style={{ y: normalOffset }} className="space-y-8">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="p-6 bg-neutral-900 border border-white/5 opacity-30">
                      <div className="h-4 w-24 bg-white/10 mb-2" />
                      <div className="h-2 w-full bg-white/5" />
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Viscous Content */}
              <div className="space-y-4">
                <span className="mono text-[9px] text-cyan-500 tracking-widest uppercase">Viscous_Mass</span>
                <motion.div style={{ y: viscousOffset }} className="space-y-8">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="p-6 bg-cyan-950/20 border border-cyan-500/20">
                      <div className="h-4 w-24 bg-cyan-500/20 mb-2" />
                      <div className="h-2 w-full bg-cyan-500/10" />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            <div className="max-w-md text-center">
               <h4 className="text-2xl font-black italic mb-2">FRICTION_OVERRIDE</h4>
               <p className="text-neutral-500 text-sm font-light">
                 The right column has 4x more damping than the left. Scroll fast to observe the "mass" differential.
               </p>
            </div>
          </div>
          
        </div>
      </div>
      
      <div className="absolute top-8 right-8 mono text-[9px] text-neutral-600">
        MASS_SIM: ACTIVE
      </div>
    </div>
  );
};

export default ViscousScrollDemo;
