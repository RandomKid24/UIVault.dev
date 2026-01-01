import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Fix: Moved to module scope for shared access
const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

// Fix: Explicitly typing as React.FC to handle React-reserved 'key' prop correctly in the type system
const CrystallizedChar: React.FC<{ char: string; index: number }> = ({ char, index }) => {
  const [display, setDisplay] = useState(char);
  
  useEffect(() => {
    let count = 0;
    const iterations = 10;
    const interval = setInterval(() => {
      if (count < iterations) {
        setDisplay(glyphs[Math.floor(Math.random() * glyphs.length)]);
        count++;
      } else {
        setDisplay(char);
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [char]);

  return (
    <motion.span
      initial={{ opacity: 0, filter: 'blur(10px)', scale: 1.5 }}
      animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
      className="text-cyan-500 inline-block"
    >
      {display}
    </motion.span>
  );
};

const CrystallizedTextDemo = () => {
  const [val, setVal] = useState("");
  // isTyping is unused in the core logic but preserved from original spec
  const [isTyping, setIsTyping] = useState(false);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-neutral-950 overflow-hidden gap-12 relative">
      <div className="text-center z-10">
        <h4 className="text-3xl font-black italic tracking-tighter text-white">Entropy_Input</h4>
        <p className="mono text-[9px] text-neutral-600 mt-2 uppercase tracking-[0.5em]">Crystallization_Active</p>
      </div>

      <div className="relative w-full max-w-md h-32 flex items-center justify-center border-b-2 border-white/10 group focus-within:border-cyan-500 transition-colors">
        <input 
          autoFocus
          className="absolute inset-0 bg-transparent opacity-0 cursor-text z-20"
          value={val}
          onChange={(e) => setVal(e.target.value.toUpperCase())}
          placeholder="TYPE_TO_REVEAL"
        />
        
        <div className="text-4xl md:text-6xl font-black italic tracking-tighter mono flex flex-wrap justify-center gap-1">
          {val.length === 0 ? (
            <span className="opacity-10 animate-pulse text-white select-none">SEARCH_BITSTREAM</span>
          ) : (
            val.split("").map((c, i) => (
              <CrystallizedChar key={`${i}-${c}`} char={c} index={i} />
            ))
          )}
          <motion.div 
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-1 h-12 md:h-16 bg-cyan-500 mt-1"
          />
        </div>
      </div>

      <div className="max-w-xs text-center mono text-[9px] text-neutral-800 leading-relaxed uppercase">
        TYPED INPUT IS INITIALLY OBSCURED BY PROCEDURAL ENTROPY. THE SYSTEM MANIFESTS CHARACTERS AS THEY REACH SIGNAL STABILITY.
      </div>

      {/* Decorative Jitter Layer */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
         <div className="grid grid-cols-10 grid-rows-10 w-full h-full gap-2 p-4">
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: Math.random() * 2 + 1, repeat: Infinity }}
                className="bg-white/10 text-[6px] mono flex items-center justify-center"
              >
                {glyphs[Math.floor(Math.random() * glyphs.length)]}
              </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default CrystallizedTextDemo;