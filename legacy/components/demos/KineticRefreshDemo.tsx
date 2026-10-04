
import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';

const KineticRefreshDemo = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [logs, setLogs] = useState(['INIT_SEQ', 'SYS_CHECK']);
  
  const y = useMotionValue(0);
  const tension = useTransform(y, [0, 150], [0, 1]);
  const rotate = useTransform(y, [0, 150], [0, 45]);
  const blur = useTransform(y, [0, 150], [0, 10]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.y > 140 && !isRefreshing) {
      triggerRefresh();
    }
  };

  const triggerRefresh = () => {
    setIsRefreshing(true);
    setLogs(prev => [`LOG_${Math.floor(Math.random()*1000)}`, ...prev.slice(0, 4)]);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="relative w-full h-full bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden flex flex-col">
      {/* Background Pulse */}
      <AnimatePresence>
        {isRefreshing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-cyan-500/5 flex items-center justify-center z-0"
          >
            <motion.div 
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-64 h-64 border-2 border-cyan-500/20 rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pull Indicator Layer */}
      <div className="absolute top-0 inset-x-0 h-40 flex flex-col items-center justify-center pointer-events-none overflow-hidden">
        <motion.div 
          style={{ 
            opacity: tension,
            scale: tension,
            rotate
          }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <span className="mono text-[9px] text-cyan-500 font-bold tracking-[0.4em]">COMPRESSING_GRID</span>
        </motion.div>
      </div>

      {/* The Scrollable Surface */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 200 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        style={{ y, filter: useTransform(blur, (v) => `blur(${v}px)`) }}
        className="relative z-10 w-full h-full bg-neutral-900 border-t border-white/5 p-8 flex flex-col"
      >
        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
          <h3 className="text-2xl font-black italic tracking-tighter">DATA_FEED</h3>
          <div className="flex gap-1">
             {[...Array(3)].map((_, i) => (
               <div key={i} className={`w-1.5 h-1.5 rounded-full ${isRefreshing ? 'bg-cyan-500 animate-pulse' : 'bg-white/10'}`} />
             ))}
          </div>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {logs.map((log) => (
              <motion.div
                key={log}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center"
              >
                <span className="mono text-xs text-neutral-400">{log}</span>
                <span className="mono text-[8px] text-cyan-800">STATUS_OK</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-auto text-center opacity-20">
           <p className="mono text-[9px] uppercase tracking-widest">Pull_to_Charge</p>
        </div>
      </motion.div>
    </div>
  );
};

export default KineticRefreshDemo;
