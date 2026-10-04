
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Circle, Triangle, Activity, Code, Layers } from 'lucide-react';

const EvolutionaryShellDemo = () => {
  const [usageCount, setUsageCount] = useState(0);

  const increment = () => setUsageCount(prev => prev + 1);

  const isProficient = usageCount > 5;
  const isExpert = usageCount > 10;

  const tools = [
    { id: 'BOX', icon: <Box size={20} />, label: 'ELEMENT_BLOCK' },
    { id: 'CIR', icon: <Circle size={20} />, label: 'RADIAL_NODE' },
    { id: 'TRI', icon: <Triangle size={20} />, label: 'VECT_TRIS' },
    { id: 'ACT', icon: <Activity size={20} />, label: 'SIGNAL_FLOW' },
    { id: 'COD', icon: <Code size={20} />, label: 'LOGIC_CORE' },
    { id: 'LAY', icon: <Layers size={20} />, label: 'STRATA_LVL' }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-900/40 gap-12">
      <div className="text-center">
        <h4 className="text-3xl font-black italic tracking-tighter uppercase">Evolutionary_Shell</h4>
        <div className="flex justify-center gap-1 mt-2">
           {[...Array(15)].map((_, i) => (
             <div key={i} className={`h-1 w-2 rounded-sm ${i < usageCount ? 'bg-cyan-500' : 'bg-white/5'}`} />
           ))}
        </div>
        <p className="mono text-[9px] text-neutral-500 mt-4 uppercase">User_Maturity: {isExpert ? 'EXPERT' : isProficient ? 'PROFICIENT' : 'NOVICE'}</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={increment}
            className="flex flex-col items-center gap-3 p-6 bg-neutral-900 border border-white/5 hover:border-cyan-500/50 transition-all rounded-2xl group"
          >
            <div className={`transition-transform duration-500 ${isExpert ? 'scale-150' : 'scale-100'}`}>
              {tool.icon}
            </div>
            
            <AnimatePresence>
              {!isProficient && (
                <motion.span
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mono text-[9px] text-neutral-500 font-bold tracking-widest"
                >
                  {tool.label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>

      <div className="max-w-sm text-center mono text-[10px] text-neutral-600 leading-relaxed uppercase">
        Click the icons to simulate repeated use. As the system tracks your "mastery," the UI sheds descriptive text and scales the primary icons, assuming cognitive recognition.
      </div>
      
      <button 
        onClick={() => setUsageCount(0)}
        className="mono text-[9px] text-neutral-800 hover:text-white transition-colors"
      >
        RESET_EXPERIENCE_LEVEL
      </button>
    </div>
  );
};

export default EvolutionaryShellDemo;
