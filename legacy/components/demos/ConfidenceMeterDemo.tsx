
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ConfidenceMeterDemo = () => {
  const [input, setInput] = useState('');
  const [lastTypeTime, setLastTypeTime] = useState(Date.now());
  const [speed, setSpeed] = useState(0);

  const springBlur = useSpring(20, { stiffness: 100, damping: 20 });
  const springWeight = useSpring(100, { stiffness: 100, damping: 20 });

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const now = Date.now();
    const diff = now - lastTypeTime;
    const currentSpeed = Math.max(0, 1000 - diff) / 1000;
    
    setSpeed(currentSpeed);
    setLastTypeTime(now);
    setInput(e.target.value);
  };

  useEffect(() => {
    // If not typing, speed decays
    const interval = setInterval(() => {
      if (Date.now() - lastTypeTime > 500) {
        setSpeed(prev => Math.max(0, prev - 0.1));
      }
    }, 100);
    return () => clearInterval(interval);
  }, [lastTypeTime]);

  useEffect(() => {
    springBlur.set(Math.max(0, (1 - speed) * 10));
    springWeight.set(100 + speed * 800);
  }, [speed, springBlur, springWeight]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-900/40 gap-12">
      <div className="text-center">
        <h4 className="text-3xl font-black italic tracking-tighter">CONFIDENCE_TYPE</h4>
        <p className="mono text-[9px] text-neutral-500 uppercase tracking-widest mt-2">Flow_Rate: {(speed * 100).toFixed(0)}%</p>
      </div>

      <div className="w-full max-w-2xl relative">
        <textarea
          value={input}
          onChange={handleInput}
          placeholder="TYPE_WITH_CONFIDENCE_TO_SOLIDIFY_LOG..."
          className="w-full h-40 bg-transparent border-none focus:ring-0 resize-none mono text-transparent caret-cyan-500 absolute inset-0 z-10"
        />
        
        <motion.div
          style={{ 
            filter: useTransform(springBlur, v => `blur(${v}px)`),
            fontWeight: springWeight
          }}
          className="w-full h-40 pointer-events-none break-all text-4xl tracking-tighter leading-none"
        >
          {input || <span className="opacity-10">TYPE_TO_REVEAL_STRUCTURE</span>}
        </motion.div>
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-600">
        Typing fast and steadily increases the "weight" and "clarity" of the input, representing cognitive flow and certainty.
      </div>
    </div>
  );
};

export default ConfidenceMeterDemo;
