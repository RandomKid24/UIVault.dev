
import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useVelocity } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

const TemporalTrailDemo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Particle[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const [velocityVal, setVelocityVal] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = containerRef.current.clientHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate velocity
      const dx = mousePos.current.x - lastMousePos.current.x;
      const dy = mousePos.current.y - lastMousePos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      setVelocityVal(speed);

      // Emit particles based on velocity
      if (speed > 1) {
        const amount = Math.min(Math.floor(speed / 2), 10);
        for (let i = 0; i < amount; i++) {
          particles.current.push({
            x: mousePos.current.x,
            y: mousePos.current.y,
            vx: (Math.random() - 0.5) * (speed * 0.1),
            vy: (Math.random() - 0.5) * (speed * 0.1),
            life: 1.0,
            maxLife: 1.0,
            size: Math.random() * 3 + 1,
            color: speed > 20 ? 'rgba(34, 211, 238, 1)' : 'rgba(255, 255, 255, 0.8)'
          });
        }
      }

      // Update and draw particles
      particles.current = particles.current.filter(p => p.life > 0);
      particles.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;

        const opacity = p.life;
        ctx.fillStyle = p.color.replace('1)', `${opacity})`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();

        // Connect particles for "Trail" feel if close
        // This creates a kinetic energy web
        if (p.life > 0.8) {
           ctx.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.2})`;
           ctx.lineWidth = 0.5;
           ctx.beginPath();
           ctx.moveTo(p.x, p.y);
           ctx.lineTo(mousePos.current.x, mousePos.current.y);
           ctx.stroke();
        }
      });

      lastMousePos.current = { ...mousePos.current };
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full bg-neutral-950 flex items-center justify-center overflow-hidden cursor-none"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />
      
      {/* Background HUD */}
      <div className="z-0 pointer-events-none text-center select-none">
        <h3 className="text-9xl font-black italic tracking-tighter opacity-5 text-white uppercase">Temporal</h3>
        <p className="mono text-[10px] text-neutral-800 tracking-[1em] uppercase mt-4">Kinetic_Friction_Sync</p>
      </div>

      {/* Real-time Diagnostics */}
      <div className="absolute top-8 right-8 mono text-[9px] text-cyan-500 text-right space-y-1">
        <div>VECTOR_MAGNITUDE: {velocityVal.toFixed(2)}</div>
        <div className="w-32 h-1 bg-white/5 ml-auto">
          <motion.div 
            animate={{ width: `${Math.min(velocityVal * 2, 100)}%` }}
            className="h-full bg-cyan-500 shadow-[0_0_10px_cyan]" 
          />
        </div>
        <div className="text-neutral-600">BUFFER_NODES: {particles.current.length}</div>
      </div>

      <div className="absolute bottom-8 left-8 mono text-[9px] text-neutral-700 max-w-[200px] leading-relaxed">
        MOVE CURSOR RAPIDLY TO EXHAUST KINETIC ENERGY INTO THE TEMPORAL FIELD. 
      </div>

      {/* Cursor Tip */}
      <motion.div 
        animate={{ 
          x: mousePos.current.x, 
          y: mousePos.current.y,
          scale: velocityVal > 10 ? 1.5 : 1,
          borderColor: velocityVal > 10 ? '#06b6d4' : '#fff'
        }}
        className="absolute left-0 top-0 w-3 h-3 border rounded-full pointer-events-none z-20 -translate-x-1/2 -translate-y-1/2 transition-colors"
      >
        <div className="absolute inset-0 bg-white/10 rounded-full blur-sm" />
      </motion.div>
    </div>
  );
};

export default TemporalTrailDemo;
