
import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ChronoScrollDemo = () => {
  const scrollRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    container: scrollRef
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div 
        ref={scrollRef} 
        className="w-full h-[400px] overflow-y-scroll px-10 py-40 space-y-[400px] scrollbar-hide"
      >
        {['PAST', 'PRESENT', 'FUTURE'].map((item, i) => (
          <motion.div
            key={item}
            style={{ scale, opacity, rotate }}
            className="text-8xl font-black text-center tracking-tighter"
          >
            {item}
          </motion.div>
        ))}
        <div className="h-[200px]" />
      </div>
      <div className="absolute top-6 right-6 h-32 w-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          className="w-full bg-cyan-500 origin-top"
          style={{ scaleY: scrollYProgress }}
        />
      </div>
    </div>
  );
};

export default ChronoScrollDemo;
