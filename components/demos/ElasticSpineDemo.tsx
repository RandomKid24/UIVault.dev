
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

const ElasticSpineDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const velocity = useVelocity(scrollYProgress);
  
  // Map velocity to path curvature
  const curvePower = useTransform(velocity, [-2, 0, 2], [100, 0, -100]);
  const springCurve = useSpring(curvePower, { stiffness: 200, damping: 20 });
  const [d, setD] = useState("M 50 0 Q 50 250 50 500");

  useEffect(() => {
    return springCurve.on('change', (val) => {
      setD(`M 50 0 Q ${50 + val} 250 50 500`);
    });
  }, [springCurve]);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl bg-neutral-950 border border-white/5 flex">
      <div 
        ref={containerRef}
        className="flex-1 h-full overflow-y-auto scrollbar-hide p-12 space-y-[400px]"
      >
        <div className="h-[200px]" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="max-w-sm space-y-4">
            <h3 className="text-5xl font-black italic tracking-tighter">CHAPTER_0{i}</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Observation of kinetic momentum in vertical layouts. Notice the spine to the right reacting to scroll acceleration.
            </p>
          </div>
        ))}
        <div className="h-[400px]" />
      </div>

      {/* Elastic Spine HUD */}
      <div className="w-32 h-full border-l border-white/5 bg-black/40 flex items-center justify-center relative">
        <svg width="100" height="500" viewBox="0 0 100 500" className="overflow-visible">
          <motion.path
            d={d}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Progress Node */}
          <motion.circle
            cx={useTransform(springCurve, (v) => 50 + v * 0.8)}
            cy={useTransform(scrollYProgress, [0, 1], [0, 500])}
            r="4"
            fill="white"
            className="shadow-[0_0_10px_white]"
          />
        </svg>

        <div className="absolute top-8 right-4 vertical-text mono text-[8px] text-neutral-700 tracking-[0.4em] uppercase">
          Elastic_Momentum
        </div>
      </div>
      
      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
};

export default ElasticSpineDemo;
