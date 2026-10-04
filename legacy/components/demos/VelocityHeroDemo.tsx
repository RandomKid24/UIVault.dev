
import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useVelocity, useTransform, useSpring } from 'framer-motion';

const VelocityHeroDemo = () => {
  const mouseX = useMotionValue(0);
  const velocity = useVelocity(mouseX);
  
  // Transform velocity into blur and skew
  const blur = useTransform(velocity, [-3000, 0, 3000], [20, 0, 20]);
  const skew = useTransform(velocity, [-3000, 3000], [-30, 30]);
  const color = useTransform(velocity, [-3000, 0, 3000], ["#f43f5e", "#06b6d4", "#f43f5e"]);

  const springBlur = useSpring(blur, { stiffness: 500, damping: 50 });
  const springSkew = useSpring(skew, { stiffness: 500, damping: 50 });
  const springColor = useSpring(color, { stiffness: 500, damping: 50 });

  // Fixed derived motion value
  const filterVal = useTransform(springBlur, (v) => `blur(${v}px)`);
  const progressWidth = useTransform(velocity, [-3000, 3000], ["0%", "100%"]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-black/40">
      <motion.div
        style={{ 
          filter: filterVal,
          skewX: springSkew,
          color: springColor
        }}
        className="relative z-10 text-center select-none"
      >
        <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter italic leading-none">
          KINETIC
        </h1>
        <p className="mono text-[10px] tracking-[0.8em] text-neutral-500 mt-4">
          VELOCITY_DRIVEN_TYPEFACE
        </p>
      </motion.div>

      {/* Background HUD */}
      <div className="absolute top-8 left-8 mono text-[9px] text-neutral-600 flex flex-col gap-1">
        <span>VX: {velocity.get().toFixed(0)} px/s</span>
        <div className="w-32 h-1 bg-white/5">
          <motion.div 
            style={{ width: progressWidth, backgroundColor: springColor }}
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default VelocityHeroDemo;
