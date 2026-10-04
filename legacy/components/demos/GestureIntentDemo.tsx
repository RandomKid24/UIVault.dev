
import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

const GestureIntentDemo = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'SCAN_INTENT_A', color: 'from-cyan-500 to-blue-600' },
    { id: 2, text: 'SCAN_INTENT_B', color: 'from-purple-500 to-rose-600' },
    { id: 3, text: 'SCAN_INTENT_C', color: 'from-emerald-500 to-cyan-600' },
  ]);

  const remove = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
    if (items.length <= 1) {
      setTimeout(() => {
        setItems([
          { id: Date.now(), text: 'REGENERATED_A', color: 'from-cyan-500 to-blue-600' },
          { id: Date.now() + 1, text: 'REGENERATED_B', color: 'from-purple-500 to-rose-600' },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 overflow-hidden">
      <div className="mb-8 text-center">
        <h4 className="text-2xl font-black italic tracking-tighter">FLICK_TRIAGE</h4>
        <p className="mono text-[9px] text-neutral-500 mt-2">SWIPE_LEFT_REJECT // SWIPE_RIGHT_ACCEPT</p>
      </div>

      <div className="relative w-72 h-96">
        <AnimatePresence>
          {items.map((item, i) => (
            <FlickCard 
              key={item.id} 
              item={item} 
              index={i} 
              onRemove={() => remove(item.id)} 
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const FlickCard = ({ item, index, onRemove }: any) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const background = useTransform(x, [-100, 0, 100], ["#f43f5e", "#171717", "#06b6d4"]);

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.velocity.x) > 500 || Math.abs(info.offset.x) > 150) {
          onRemove();
        }
      }}
      style={{ x, rotate, opacity, zIndex: 100 - index }}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
    >
      <motion.div 
        style={{ backgroundColor: background }}
        className={`w-full h-full rounded-3xl border border-white/10 flex flex-col p-8 overflow-hidden bg-neutral-900 shadow-2xl`}
      >
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} mb-6 blur-[1px]`} />
          <h3 className="text-2xl font-black italic tracking-tighter text-white">{item.text}</h3>
          <p className="mono text-[8px] text-neutral-500 mt-4 tracking-widest uppercase font-bold">Vector_Detect: Active</p>
        </div>
        <div className="flex justify-between items-end opacity-20 mono text-[8px]">
          <div>ID: {item.id}</div>
          <div>v5.0_gesture</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GestureIntentDemo;
