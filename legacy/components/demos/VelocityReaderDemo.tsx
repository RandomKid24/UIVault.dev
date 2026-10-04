
import React, { useRef } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

const VelocityReaderDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scrollVelocity = useVelocity(scrollYProgress);
  
  // Transform velocity into visual deformation
  const skewX = useTransform(scrollVelocity, [-1, 1], [-20, 20]);
  const tracking = useTransform(scrollVelocity, [-1, 1], [-10, 10]);
  const opacity = useTransform(scrollVelocity, [-1, -0.1, 0, 0.1, 1], [0.3, 0.8, 1, 0.8, 0.3]);
  
  const springSkew = useSpring(skewX, { stiffness: 1000, damping: 50 });
  const springTracking = useSpring(tracking, { stiffness: 1000, damping: 50 });

  const paragraphs = [
    "INTERACTION IS NOT A RESULT, BUT A CONVERSATION.",
    "THE WEB IS A KINETIC MEDIUM CAPABLE OF DEPTH.",
    "BEYOND THE STATIC GRID LIES A FLUID REALITY.",
    "MOTION EXPLAINS FUNCTION BETTER THAN TEXT EVER CAN.",
    "INERTIA CREATES A SENSE OF REALITY IN THE DIGITAL VOID.",
    "EVERY PIXEL SHOULD HAVE WEIGHT AND MOMENTUM.",
    "DESIGN FOR INTENT, NOT JUST FOR THE CLICK."
  ];

  return (
    <div className="w-full h-full p-8 flex flex-col items-center justify-center">
      <div 
        ref={containerRef}
        className="h-[400px] w-full overflow-y-auto scrollbar-hide space-y-12 py-40"
      >
        {paragraphs.map((p, i) => (
          <motion.div
            key={i}
            style={{ 
              skewX: springSkew,
              letterSpacing: springTracking,
              opacity
            }}
            className="text-4xl md:text-5xl font-black text-center tracking-tighter text-white/90"
          >
            {p}
          </motion.div>
        ))}
        <div className="h-[200px]" />
      </div>
      <div className="mt-8 mono text-[10px] text-cyan-500 uppercase tracking-widest">
        Scroll_Intensity: Dynamic
      </div>
    </div>
  );
};

export default VelocityReaderDemo;
