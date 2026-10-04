
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EchoFocusDemo = () => {
  const [activeInstruction, setActiveInstruction] = useState<string | null>(null);

  const controls = [
    { id: 'INIT', label: 'INITIALIZE', hint: 'Start system boot sequence and calibrate kinetic sensors.' },
    { id: 'SCN', label: 'SCAN_ENV', hint: 'Detect surrounding logic nodes and map spatial topology.' },
    { id: 'EXP', label: 'EXPORT_LOG', hint: 'Compile current session state into a persistent data block.' }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-900 gap-16">
      <div className="text-center">
        <h4 className="text-3xl font-black italic tracking-tighter">ECHO_LEARNING</h4>
        <p className="mono text-[9px] text-neutral-500 uppercase tracking-widest mt-2">Focus_To_Reveal_Purpose</p>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-sm">
        {controls.map((ctrl) => (
          <div key={ctrl.id} className="relative">
            <button
              onFocus={() => setActiveInstruction(ctrl.id)}
              onBlur={() => setActiveInstruction(null)}
              onMouseEnter={() => setActiveInstruction(ctrl.id)}
              onMouseLeave={() => setActiveInstruction(null)}
              className="w-full py-6 px-8 border border-white/10 hover:border-white/30 transition-all flex justify-between items-center group bg-black/20"
            >
              <div className="flex flex-col items-start">
                 <span className="mono text-[8px] text-cyan-500 tracking-[0.4em]">PROC_CODE: {ctrl.id}</span>
                 <span className="text-2xl font-black italic tracking-tighter group-hover:translate-x-2 transition-transform">{ctrl.label}</span>
              </div>
              <div className="w-2 h-2 rounded-full border border-white/20 group-hover:bg-white transition-colors" />
            </button>

            {/* The Echo (Instruction) */}
            <AnimatePresence>
              {activeInstruction === ctrl.id && (
                <motion.div
                  initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 40, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: 60, filter: 'blur(10px)' }}
                  className="absolute left-full top-0 h-full w-48 flex items-center pl-8 z-50 pointer-events-none"
                >
                  <div className="border-l-2 border-cyan-500 pl-4 py-2 bg-neutral-950/80 backdrop-blur-xl rounded-r-xl">
                    <p className="text-[10px] text-neutral-400 leading-relaxed font-light italic">
                      {ctrl.hint}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="mono text-[9px] text-neutral-600 uppercase tracking-widest animate-pulse">
        TAB_THROUGH_CONTROLS_TO_ACTIVATE_ECHOES
      </div>
    </div>
  );
};

export default EchoFocusDemo;
