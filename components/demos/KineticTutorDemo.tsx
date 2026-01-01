import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const KineticTutorDemo = () => {
  const [activePrinciple, setActivePrinciple] = useState<string | null>(null);

  const principles = [
    { id: 'inertia', label: 'INERTIA', desc: 'Resistance to sudden changes in velocity.', config: { stiffness: 10, damping: 40 } },
    { id: 'tension', label: 'TENSION', desc: 'The structural force that pulls back.', config: { stiffness: 400, damping: 10 } },
    { id: 'friction', label: 'FRICTION', desc: 'The energy loss through environment.', config: { stiffness: 100, damping: 2 } }
  ];

  return (
    <div className="w-full h-full flex items-center justify-center p-12">
      <div className="max-w-xl w-full space-y-12">
        <div className="flex justify-between items-center border-b border-white/10 pb-6">
          <h3 className="text-4xl font-black italic tracking-tighter">THE_MANIFESTO</h3>
          <span className="mono text-[9px] text-neutral-500">v1.1 // MOTION_SPEC</span>
        </div>

        <div className="space-y-8">
          {principles.map((p) => (
            <motion.div
              key={p.id}
              onMouseEnter={() => setActivePrinciple(p.id)}
              onMouseLeave={() => setActivePrinciple(null)}
              className="group cursor-default relative"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{
                    width: activePrinciple === p.id ? 100 : 20,
                    backgroundColor: activePrinciple === p.id ? '#06b6d4' : '#222'
                  }}
                  className="h-1 rounded-full transition-colors"
                />
                <h4 className={`text-4xl font-bold tracking-tight transition-all ${
                  activePrinciple === p.id ? 'text-white' : 'text-neutral-700'
                }`}>
                  {p.label}
                </h4>
              </div>

              <AnimatePresence>
                {activePrinciple === p.id && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="absolute left-[120px] top-1/2 -translate-y-1/2"
                  >
                    <p className="text-sm text-neutral-400 font-light w-64">{p.desc}</p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="mt-4 flex gap-4 overflow-hidden h-32 relative">
                <PhysicsBall 
                  isActive={activePrinciple === p.id} 
                  config={p.config} 
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PhysicsBall = ({ isActive, config }: { isActive: boolean; config: any }) => {
  const x = useMotionValue(0);
  const springX = useSpring(x, config);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        x.set(x.get() === 0 ? 300 : 0);
      }, 2000);
      return () => clearInterval(interval);
    } else {
      x.set(0);
    }
  }, [isActive, x]);

  return (
    <motion.div
      style={{ x: springX }}
      className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-opacity ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
    </motion.div>
  );
};

export default KineticTutorDemo;