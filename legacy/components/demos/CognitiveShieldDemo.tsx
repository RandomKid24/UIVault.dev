
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CognitiveShieldDemo = () => {
  const [focusedTask, setFocusedTask] = useState<number | null>(null);

  const tasks = [
    { id: 0, title: 'DATA_INPUT', content: 'Scan and process incoming binary telemetry packets from remote nodes.' },
    { id: 1, title: 'LOGIC_FORK', content: 'Branch operational flow based on conditional environmental triggers.' },
    { id: 2, title: 'CACHE_SYNC', content: 'Synchronize local ephemeral storage with global immutable ledger.' }
  ];

  return (
    <div className="w-full h-full relative flex items-center justify-center p-12 bg-neutral-950 overflow-hidden">
      {/* Background Noise Layer */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${focusedTask !== null ? 'opacity-5 blur-xl' : 'opacity-20'}`}>
        <div className="grid grid-cols-12 grid-rows-12 w-full h-full p-4 gap-4">
           {[...Array(144)].map((_, i) => (
             <div key={i} className="border border-white/10 mono text-[8px] p-1 overflow-hidden opacity-20">
               GEN_{Math.random().toString(36).substring(7)}
             </div>
           ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-2xl space-y-6">
        <div className="text-center mb-12">
          <h4 className="text-3xl font-black italic tracking-tighter">COGNITIVE_SHIELD</h4>
          <p className="mono text-[9px] text-neutral-500 uppercase tracking-widest mt-2">Task_Isolation_Protocol</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              animate={{ 
                scale: focusedTask === task.id ? 1.05 : focusedTask === null ? 1 : 0.9,
                opacity: focusedTask === task.id ? 1 : focusedTask === null ? 1 : 0.2,
                filter: focusedTask !== null && focusedTask !== task.id ? 'blur(4px)' : 'blur(0px)'
              }}
              onClick={() => setFocusedTask(focusedTask === task.id ? null : task.id)}
              className={`p-8 border-2 cursor-pointer transition-colors ${
                focusedTask === task.id ? 'border-cyan-500 bg-black shadow-[0_0_50px_rgba(6,182,212,0.2)]' : 'border-white/10 bg-neutral-900/40 hover:border-white/20'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-black italic tracking-tighter uppercase">{task.title}</h3>
                <div className={`mono text-[9px] px-2 py-1 border ${focusedTask === task.id ? 'border-cyan-500 text-cyan-500' : 'border-neutral-700 text-neutral-600'}`}>
                  {focusedTask === task.id ? 'FOCUSED' : 'PENDING'}
                </div>
              </div>
              <AnimatePresence>
                {(focusedTask === task.id || focusedTask === null) && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="text-neutral-400 font-light text-sm leading-relaxed"
                  >
                    {task.content}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {focusedTask !== null && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => setFocusedTask(null)}
            className="absolute bottom-12 px-6 py-2 border border-cyan-500 text-cyan-500 mono text-[10px] tracking-widest font-black italic hover:bg-cyan-500 hover:text-black transition-all"
          >
            DISMISS_FOCUS
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CognitiveShieldDemo;
