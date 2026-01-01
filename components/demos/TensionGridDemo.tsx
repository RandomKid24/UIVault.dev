
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TensionGridDemo = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-4 gap-2 w-[400px]">
      {Array.from({ length: 16 }).map((_, i) => (
        <motion.div
          key={i}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          animate={{
            scale: hoveredIndex === i ? 1.4 : 1,
            backgroundColor: hoveredIndex === i ? '#06b6d4' : '#171717',
            borderRadius: hoveredIndex === i ? '20%' : '0%',
            rotate: hoveredIndex === i ? 45 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="aspect-square border border-white/5 cursor-crosshair"
        />
      ))}
    </div>
  );
};

export default TensionGridDemo;
