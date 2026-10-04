
import React, { useRef, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const UniversalKineticDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(250);
  const mouseY = useMotionValue(250);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const nodes = useMemo(() => [
    { id: 0, x: 100, y: 100, label: 'AUTH_CORE' },
    { id: 1, x: 400, y: 100, label: 'DATA_STRATA' },
    { id: 2, x: 250, y: 250, label: 'SYSTEM_HUB' },
    { id: 3, x: 100, y: 400, label: 'VECT_PATH' },
    { id: 4, x: 400, y: 400, label: 'LOG_BUFFER' },
  ], []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full flex items-center justify-center bg-neutral-950 overflow-hidden"
    >
      {/* Conductive Grid Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg width="100%" height="100%" className="overflow-visible">
          {/* Warp Grid - Reacts to standard cursor */}
          {[...Array(12)].map((_, i) => (
            <motion.path
              key={`h-${i}`}
              d={`M 0 ${i * 45} L 500 ${i * 45}`}
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="0.5"
              animate={{
                d: `M 0 ${i * 45} Q ${springX.get()} ${springY.get()} 500 ${i * 45}`
              }}
            />
          ))}
          {[...Array(12)].map((_, i) => (
            <motion.path
              key={`v-${i}`}
              d={`M ${i * 45} 0 L ${i * 45} 500`}
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="0.5"
              animate={{
                d: `M ${i * 45} 0 Q ${springX.get()} ${springY.get()} ${i * 45} 500`
              }}
            />
          ))}

          {/* Logic Conduction Paths - Lights up when cursor is between nodes */}
          <ConductionPaths nodes={nodes} mouseX={springX} mouseY={springY} />
        </svg>
      </div>

      {/* Reactive Nodes */}
      <div className="absolute inset-0 pointer-events-none">
        {nodes.map((node) => (
          <ConductiveNode 
            key={node.id} 
            node={node} 
            mouseX={springX} 
            mouseY={springY} 
          />
        ))}
      </div>

      {/* Intent HUD */}
      <div className="absolute top-12 left-12 flex flex-col gap-1 mono text-[9px] text-neutral-800">
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
           <span>FIELD_TOPOLOGY: ACTIVE</span>
        </div>
        <span>COORD_LOCK: [{mouseX.get().toFixed(0)}, {mouseY.get().toFixed(0)}]</span>
      </div>

      <div className="absolute bottom-12 right-12 text-right">
        <h4 className="text-xl font-black italic tracking-tighter text-white/10 uppercase">Conductive_Interaction</h4>
        <p className="mono text-[8px] text-neutral-800 mt-1 uppercase tracking-[0.4em]">Field_State_v5.2</p>
      </div>
    </div>
  );
};

const ConductionPaths = ({ nodes, mouseX, mouseY }: any) => {
  // Only connect specific logical neighbors
  const connections = [[0, 2], [1, 2], [3, 2], [4, 2], [0, 1], [3, 4]];

  return (
    <>
      {connections.map(([a, b], i) => {
        const start = nodes[a];
        const end = nodes[b];
        
        return (
          <motion.line
            key={i}
            x1={start.x} y1={start.y}
            x2={end.x} y2={end.y}
            stroke="#06b6d4"
            animate={{
              // Opacity based on cursor distance to the midpoint of the connection
              opacity: (() => {
                const midX = (start.x + end.x) / 2;
                const midY = (start.y + end.y) / 2;
                const dist = Math.sqrt((mouseX.get() - midX) ** 2 + (mouseY.get() - midY) ** 2);
                return Math.max(0, 0.4 - dist / 300);
              })(),
              strokeWidth: (() => {
                const midX = (start.x + end.x) / 2;
                const dist = Math.abs(mouseX.get() - midX);
                return Math.max(0.5, 2 - dist / 100);
              })()
            }}
            strokeDasharray="4 4"
          />
        );
      })}
    </>
  );
};

const ConductiveNode = ({ node, mouseX, mouseY }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Node "leaning" calculation
  const dx = useTransform(mouseX, (mx: number) => (mx - node.x) * 0.05);
  const dy = useTransform(mouseY, (my: number) => (my - node.y) * 0.05);

  return (
    <motion.div
      style={{ 
        left: node.x, 
        top: node.y, 
        x: dx, 
        y: dy,
        transform: 'translate(-50%, -50%)'
      }}
      className="absolute pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.2 : 1,
          borderColor: isHovered ? '#06b6d4' : 'rgba(255,255,255,0.05)',
          backgroundColor: isHovered ? 'rgba(6, 182, 212, 0.1)' : 'rgba(23,23,23,0.8)'
        }}
        className="w-24 h-24 border-2 rounded-2xl flex flex-col items-center justify-center gap-2 backdrop-blur-xl transition-colors shadow-2xl"
      >
        <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isHovered ? 'bg-cyan-400 shadow-[0_0_10px_cyan]' : 'bg-white/10'}`} />
        <span className={`mono text-[7px] font-black tracking-widest text-center px-2 uppercase ${isHovered ? 'text-white' : 'text-neutral-700'}`}>
          {node.label}
        </span>
        
        {/* Proximity Ambient Glow */}
        <motion.div 
          animate={{ 
            opacity: (() => {
              const dist = Math.sqrt((mouseX.get() - node.x) ** 2 + (mouseY.get() - node.y) ** 2);
              return Math.max(0, 0.3 - dist / 200);
            })()
          }}
          className="absolute inset-0 bg-cyan-500 blur-2xl -z-10 rounded-full"
        />
      </motion.div>
    </motion.div>
  );
};

export default UniversalKineticDemo;
