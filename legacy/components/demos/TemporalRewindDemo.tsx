
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

const TemporalRewindDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const velocity = useVelocity(scrollYProgress);
  
  const [direction, setDirection] = useState<'forward' | 'rewind'>('forward');

  useEffect(() => {
    return velocity.on('change', (v) => {
      if (v > 0.001) setDirection('forward');
      else if (v < -0.001) setDirection('rewind');
    });
  }, [velocity]);

  const items = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl bg-neutral-900 border border-white/5">
      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-auto scrollbar-hide py-80 flex flex-col items-center"
      >
        <div className="h-[1000px] w-full relative">
           {items.map((i) => (
             <Particle key={i} index={i} progress={scrollYProgress} direction={direction} />
           ))}
           
           <div className="sticky top-1/2 left-0 right-0 -translate-y-1/2 flex flex-col items-center">
              <motion.div
                animate={{ 
                  color: direction === 'forward' ? '#fff' : '#06b6d4',
                  scale: direction === 'forward' ? 1 : 1.2
                }}
                className="text-7xl font-black italic tracking-tighter"
              >
                {direction === 'forward' ? 'CONSTRUCT' : 'REWIND'}
              </motion.div>
              <div className="mono text-[10px] text-neutral-500 mt-4 tracking-[0.4em]">
                DIRECTION_ALIGNED_STATES
              </div>
           </div>
        </div>
      </div>

      {/* Temporal Status HUD */}
      <div className="absolute bottom-8 left-8 flex items-center gap-4 mono text-[10px]">
        <div className="px-3 py-1 bg-black/50 border border-white/10 rounded">
          TIME_VECTOR: <span className={direction === 'forward' ? 'text-white' : 'text-cyan-500'}>{direction.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

// Fix: Explicitly typing as React.FC to handle React-reserved 'key' prop correctly in the type system
const Particle: React.FC<{ index: number; progress: any; direction: string }> = ({ index, progress, direction }) => {
  const rotate = useTransform(progress, [0, 1], [0, 360 + index * 45]);
  const x = useTransform(progress, [0, 1], [-150, 150]);
  const y = useTransform(progress, [0, 1], [index * 40 - 240, index * 40 - 240]);
  const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{ x, y, rotate, opacity }}
      className={`absolute left-1/2 top-0 w-8 h-1 bg-white/20 rounded-full`}
    />
  );
};

export default TemporalRewindDemo;
