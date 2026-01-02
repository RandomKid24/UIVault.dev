
import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion';

const QuantumSwarmCursorDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const totalParticles = 24;
  
  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full bg-[#020202] overflow-hidden flex items-center justify-center cursor-none"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="text-center pointer-events-none select-none opacity-20">
        <h4 className="text-8xl font-black italic tracking-tighter text-white">SWARM</h4>
        <p className="mono text-[10px] text-neutral-500 mt-4 uppercase tracking-[1em]">High_Entropy_Comet</p>
      </div>

      {/* Swarm Particles */}
      {[...Array(totalParticles)].map((_, i) => (
        <SwarmParticle 
          key={i} 
          index={i} 
          total={totalParticles}
          mouseX={mouseX} 
          mouseY={mouseY} 
          vX={velocityX}
          vY={velocityY}
        />
      ))}

      {/* Core Node */}
      <motion.div
        style={{ x: mouseX, y: mouseY, left: -4, top: -4 }}
        className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_20px_white] z-50 pointer-events-none"
      />

      <div className="absolute bottom-8 right-8 mono text-[8px] text-neutral-700 tracking-widest uppercase">
        Active_Agents: {totalParticles} // Entropy: Realtime
      </div>
    </div>
  );
};

const SwarmParticle = ({ index, total, mouseX, mouseY, vX, vY }: any) => {
  // Stochastic variation for each agent
  const stiffness = 80 + Math.random() * 120;
  const damping = 10 + Math.random() * 15;
  const mass = 0.5 + Math.random() * 2;

  const springX = useSpring(mouseX, { stiffness, damping, mass });
  const springY = useSpring(mouseY, { stiffness, damping, mass });

  const velocity = useTransform([vX, vY], ([vx, vy]: any) => Math.sqrt(vx**2 + vy**2));
  
  // Particles disperse more as velocity increases
  const dispersion = useTransform(velocity, [0, 2000], [0, 40]);
  const opacity = useTransform(velocity, [0, 2000], [0.8, 0.2]);
  const scale = useTransform(velocity, [0, 2000], [1, 0.4]);

  return (
    <motion.div
      style={{ 
        x: springX, 
        y: springY, 
        opacity,
        scale,
        left: -2,
        top: -2,
      }}
      className="absolute w-1 h-1 bg-cyan-500 rounded-full pointer-events-none"
    />
  );
};

export default QuantumSwarmCursorDemo;
