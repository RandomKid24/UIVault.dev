
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const OrientationFluxDemo = () => {
  const [hasSensor, setHasSensor] = useState(false);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const springX = useSpring(tiltX, { stiffness: 50, damping: 20 });
  const springY = useSpring(tiltY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    // Check for device orientation support
    const handleOrientation = (e: DeviceOrientationEvent) => {
      setHasSensor(true);
      // Normalize beta/gamma to small rotation values
      tiltX.set((e.beta || 0) / 10);
      tiltY.set((e.gamma || 0) / 10);
    };

    // Mouse fallback for desktop
    const handleMouse = (e: MouseEvent) => {
      if (hasSensor) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      tiltX.set(-y); // Up/Down tilt maps to X rotation
      tiltY.set(x);  // Left/Right tilt maps to Y rotation
    };

    window.addEventListener('deviceorientation', handleOrientation);
    window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [hasSensor, tiltX, tiltY]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black/40 overflow-hidden perspective-[1000px]">
      <motion.div
        style={{ 
          rotateX: springX, 
          rotateY: springY,
          transformStyle: "preserve-3d"
        }}
        className="relative w-80 h-96"
      >
        {/* Base Plate */}
        <div className="absolute inset-0 bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px]" />
          <h2 className="text-8xl font-black italic tracking-tighter opacity-10 select-none">FLUX</h2>
        </div>

        {/* Floating Title Layer */}
        <motion.div
          style={{ translateZ: 80 }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="p-8 bg-cyan-500/5 backdrop-blur-md border border-cyan-500/20 rounded-2xl">
            <h3 className="text-4xl font-black italic tracking-tighter text-white drop-shadow-2xl leading-none">SPATIAL_SYNC</h3>
            <p className="mono text-[10px] text-cyan-400 mt-4 tracking-[0.4em] text-center">GYRO_VECTOR_ACTIVE</p>
          </div>
        </motion.div>

        {/* Distant Particle Layer */}
        <motion.div
          style={{ translateZ: -100 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20"
        >
          <div className="grid grid-cols-4 gap-4">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-8 mono text-[9px] text-neutral-600 uppercase tracking-widest">
        {hasSensor ? "Sensor: ACCELEROMETER_LOCKED" : "Sensor: MOUSE_EMULATION_ACTIVE"}
      </div>
    </div>
  );
};

export default OrientationFluxDemo;
