
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EdgeManifestDemo = () => {
  const [activeEdge, setActiveEdge] = useState<string | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const threshold = 40;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      if (clientX < threshold) setActiveEdge('left');
      else if (clientX > innerWidth - threshold) setActiveEdge('right');
      else if (clientY < threshold) setActiveEdge('top');
      else if (clientY > innerHeight - threshold) setActiveEdge('bottom');
      else setActiveEdge(null);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const menuItems = ['CORE', 'DATA', 'BIO', 'LOG'];

  return (
    <div className="relative w-full h-[500px] bg-black/40 overflow-hidden flex items-center justify-center border border-white/5 rounded-2xl">
      <div className="text-neutral-700 mono text-[10px] tracking-widest uppercase">
        Move_Cursor_to_Any_Edge
      </div>

      <AnimatePresence>
        {activeEdge && (
          <motion.div
            initial={{ 
              x: activeEdge === 'left' ? -200 : activeEdge === 'right' ? 200 : 0,
              y: activeEdge === 'top' ? -200 : activeEdge === 'bottom' ? 200 : 0,
              opacity: 0,
              scale: 0.8,
              borderRadius: activeEdge === 'left' ? '0 100% 100% 0' : '100% 100% 100% 100%'
            }}
            animate={{ 
              x: 0, 
              y: 0, 
              opacity: 1, 
              scale: 1,
              borderRadius: '0%'
            }}
            exit={{ 
              opacity: 0,
              scale: 0.8,
              x: activeEdge === 'left' ? -200 : activeEdge === 'right' ? 200 : 0,
            }}
            className={`absolute flex flex-col gap-6 p-12 bg-neutral-900 border-white/10 z-[100] ${
              activeEdge === 'left' ? 'inset-y-0 left-0 w-64 border-r' :
              activeEdge === 'right' ? 'inset-y-0 right-0 w-64 border-l' :
              activeEdge === 'top' ? 'inset-x-0 top-0 h-48 border-b' :
              'inset-x-0 bottom-0 h-48 border-t'
            }`}
          >
            <div className="mono text-[10px] text-cyan-500 mb-2">MANIFESTED_PORTAL // {activeEdge.toUpperCase()}</div>
            <div className={`flex ${activeEdge === 'top' || activeEdge === 'bottom' ? 'flex-row justify-around' : 'flex-col'} gap-4`}>
              {menuItems.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer"
                >
                  <span className="text-3xl font-black hover:text-cyan-400 transition-colors tracking-tighter">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edge Hints */}
      <div className="absolute inset-0 pointer-events-none border-4 border-cyan-500/5" />
    </div>
  );
};

export default EdgeManifestDemo;
