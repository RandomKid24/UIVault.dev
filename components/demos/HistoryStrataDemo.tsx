
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Compass, Map as MapIcon, Anchor, Wind } from 'lucide-react';

const eras = [
  {
    year: 'EP_001',
    title: 'ROMANCE_DAWN',
    description: 'The journey begins in East Blue. Monkey D. Luffy sets out to gather a crew and claim the title of Pirate King, inheriting the legendary Straw Hat.',
    image: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d286?q=80&w=1000&auto=format&fit=crop',
    color: '#facc15',
    alignment: 'left',
    stats: { crew: '1', bounty: '0', saga: 'EAST_BLUE' },
    island: 'Dawn Island'
  },
  {
    year: 'EP_092',
    title: 'ALABASTA_KINGDOM',
    description: 'A desert civil war orchestrated by the Seven Warlords. The Straw Hats face their first true test against a criminal syndicate to save a princess.',
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=1000&auto=format&fit=crop',
    color: '#fb923c',
    alignment: 'right',
    stats: { crew: '6', bounty: '100M', saga: 'BAROQUE_WORKS' },
    island: 'Alabasta'
  },
  {
    year: 'EP_457',
    title: 'MARINEFORD_WAR',
    description: 'The Summit War of the Great Pirate Era. A massive collision between the Whitebeard Pirates and the Navy Headquarters to decide the world\'s future.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop',
    color: '#ef4444',
    alignment: 'left',
    stats: { crew: '9', bounty: '400M', saga: 'SUMMIT_WAR' },
    island: 'Marineford'
  },
  {
    year: 'EP_892',
    title: 'WANO_COUNTRY',
    description: 'A land of Samurai closed to the world. Luffy joins forces with the Worst Generation to take down Kaido, the Strongest Creature Alive.',
    image: 'https://images.unsplash.com/photo-1528164344705-47542687990d?q=80&w=1000&auto=format&fit=crop',
    color: '#8b5cf6',
    alignment: 'right',
    stats: { crew: '10', bounty: '3B', saga: 'FOUR_EMPERORS' },
    island: 'Wano'
  },
  {
    year: 'EP_1116',
    title: 'EGGHEAD_ISLAND',
    description: 'The Island of the Future. The Straw Hats uncover the dark history of the world and the origins of Devil Fruits alongside the genius Dr. Vegapunk.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    color: '#06b6d4',
    alignment: 'left',
    stats: { crew: '10', bounty: '8.8B', saga: 'FINAL_SAGA' },
    island: 'Egghead'
  }
];

const HistoryStrataDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  
  // Parallax for background map elements
  const mapY = useTransform(smoothScroll, [0, 1], ["0%", "-20%"]);

  return (
    <div className="relative w-full h-full bg-[#050505] overflow-hidden rounded-[3rem] border border-white/5 shadow-2xl">
      {/* Nautical Map Background Layer */}
      <motion.div 
        style={{ y: mapY }}
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] bg-repeat" />
        <div className="absolute top-[10%] left-[10%]"><Compass size={400} className="text-white" /></div>
        <div className="absolute bottom-[20%] right-[10%] rotate-45"><Anchor size={300} className="text-white" /></div>
      </motion.div>
      
      {/* 3D "Islands" Fog Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bg-white/5 blur-[80px] rounded-full"
            style={{ 
              width: 300 + i * 100, 
              height: 200 + i * 50,
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`
            }}
          />
        ))}
      </div>

      {/* Scrollable Dimension */}
      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-auto scrollbar-hide snap-y snap-mandatory perspective-[2000px] z-10"
      >
        <div className="relative pt-[30%] pb-[60%] space-y-[70vh]">
           {/* THE GRAND LINE - Glowing path */}
           <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-1 bg-white/5 z-0" />
           <motion.div 
             style={{ scaleY: smoothScroll }}
             className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[4px] bg-gradient-to-b from-yellow-400 via-red-500 to-cyan-500 origin-top z-0 shadow-[0_0_30px_rgba(239,68,68,0.3)]"
           />

           {/* TRAVELER: The Thousand Sunny (Ship) */}
           <motion.div
             style={{ 
               top: useTransform(smoothScroll, [0, 1], ["0%", "100%"]),
               rotate: useTransform(smoothScroll, (s) => Math.sin(s * 20) * 5)
             }}
             className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
           >
             <div className="relative flex flex-col items-center">
                <div className="w-12 h-12 bg-white rounded-full shadow-[0_0_40px_white] flex items-center justify-center border-4 border-black group">
                   <Anchor size={20} className="text-black" />
                </div>
                {/* Ship Label */}
                <div className="absolute -right-24 top-1/2 -translate-y-1/2 mono text-[8px] text-white font-black bg-black/80 px-2 py-1 border border-white/20 whitespace-nowrap">
                  SUNNY_LOCATION: EP_{(smoothScroll.get() * 1116).toFixed(0)}
                </div>
             </div>
           </motion.div>

           {eras.map((era, i) => (
             <EraStrata 
               key={era.year} 
               era={era} 
               index={i} 
               containerProgress={smoothScroll} 
             />
           ))}
        </div>
      </div>

      {/* LOG POSE HUD Overlay */}
      <div className="absolute top-10 left-10 flex flex-col gap-2 z-[100] pointer-events-none">
        <div className="flex items-center gap-3">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="text-yellow-500"
          >
            <Compass size={24} strokeWidth={3} />
          </motion.div>
          <span className="mono text-[11px] text-yellow-500 font-black tracking-[0.4em] uppercase italic">Log_Pose_v4.2</span>
        </div>
        <h4 className="text-5xl font-black italic tracking-tighter text-white uppercase leading-none">The_Grand_Line_<br /><span className="text-white/20">Chronicle</span></h4>
      </div>

      {/* Island Mini-map indicator */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-[100] pointer-events-none">
        {eras.map((era, i) => {
          const isActive = useTransform(smoothScroll, [i/eras.length, (i+1)/eras.length], [1, 0]);
          return (
            <div key={i} className="flex items-center justify-end gap-4 group">
               <motion.span 
                style={{ opacity: useTransform(smoothScroll, [i/eras.length - 0.1, i/eras.length, (i+1)/eras.length], [0.2, 1, 0.2]) }}
                className="mono text-[10px] text-white font-black uppercase tracking-widest hidden md:block"
               >
                 {era.island}
               </motion.span>
               <motion.div 
                style={{ 
                  scale: useTransform(smoothScroll, [i/eras.length - 0.1, i/eras.length, (i+1)/eras.length], [1, 1.8, 1]),
                  backgroundColor: useTransform(smoothScroll, [i/eras.length - 0.1, i/eras.length, (i+1)/eras.length], ["rgba(255,255,255,0.1)", era.color, "rgba(255,255,255,0.1)"])
                }}
                className="w-2 h-2 rounded-full border border-white/20"
               />
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-10 left-10 flex items-center gap-6 mono text-[9px] text-neutral-500 uppercase tracking-[0.4em] pointer-events-none">
        <div className="flex items-center gap-2 text-cyan-500">
           <MapIcon size={14} /> <span>Sector: New_World</span>
        </div>
        <span>//</span>
        <div className="flex items-center gap-2">
           <Wind size={14} /> <span>Current: Log_Pose_Locked</span>
        </div>
      </div>
    </div>
  );
};

const EraStrata = ({ era, index, containerProgress }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Calculate focal weight
  const focal = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const smoothFocal = useSpring(focal, { stiffness: 100, damping: 20 });
  
  // Spatial transformations for the "Poster"
  const zDepth = useTransform(smoothFocal, [0, 1], [-600, 0]);
  const opacity = useTransform(smoothFocal, [0, 0.4, 1], [0, 1, 0]);
  const blur = useTransform(smoothFocal, [0, 1], [20, 0]);
  const scale = useTransform(smoothFocal, [0, 1], [0.7, 1.1]);
  const slideX = useTransform(smoothFocal, [0, 1], [era.alignment === 'left' ? -200 : 200, 0]);

  return (
    <div 
      ref={ref}
      className="relative w-full h-[80vh] flex items-center justify-center snap-center transform-gpu"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Background Arc Title (Massive) */}
      <motion.div
        style={{ 
          opacity: useTransform(smoothFocal, [0, 0.5, 1], [0, 0.05, 0]),
          scale: useTransform(smoothFocal, [0, 1], [1, 2]),
          translateZ: -800,
          rotateX: useTransform(scrollYProgress, [0, 1], [45, -45]),
          x: era.alignment === 'left' ? -150 : 150
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="text-[35vw] font-black italic tracking-tighter text-white uppercase whitespace-nowrap">
          {era.island.toUpperCase()}
        </span>
      </motion.div>

      {/* The Bounty Poster / Arc Log Card */}
      <motion.div
        style={{
          translateZ: zDepth,
          opacity,
          scale,
          filter: useTransform(blur, (v) => `blur(${v}px)`),
          x: useTransform(slideX, (v) => era.alignment === 'left' ? -180 + v : 180 + v),
          rotateY: era.alignment === 'left' ? 8 : -8
        }}
        className="relative z-10 w-[550px] h-[400px] bg-[#1a1a1a] border-4 border-[#3a3028] rounded-xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex flex-col"
      >
        {/* Poster Header */}
        <div className="h-10 bg-[#3a3028] flex items-center justify-center">
           <span className="mono text-[10px] font-black text-[#d4c3b5] tracking-[1em] uppercase">WANTED_DEAD_OR_ALIVE</span>
        </div>

        {/* Feature Image Area */}
        <div className="h-1/2 w-full relative overflow-hidden bg-neutral-900">
           <img 
             src={era.image} 
             alt={era.title}
             className="w-full h-full object-cover grayscale brightness-75 sepia-[.3] transition-transform duration-2000"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
           
           {/* Marker Label */}
           <div className="absolute top-4 left-6 px-3 py-1 bg-black/80 border border-white/20">
              <span className="mono text-[10px] font-black text-white tracking-widest">{era.year}</span>
           </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-10 flex flex-col justify-between bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] bg-[#d4c3b5]">
           <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-0.5 flex-1 bg-black/10" />
                <h3 className="text-4xl font-black italic tracking-tighter text-black uppercase leading-none">
                  {era.title.split('_')[0]}<span className="text-red-700">_{era.title.split('_')[1]}</span>
                </h3>
                <div className="h-0.5 flex-1 bg-black/10" />
              </div>
              <p className="text-neutral-800 text-xs font-bold leading-relaxed mono uppercase text-center">
                {era.description}
              </p>
           </div>

           {/* Arc Stats Footer */}
           <div className="pt-6 border-t border-black/10 flex justify-between items-center">
              <div className="grid grid-cols-3 gap-10">
                 {Object.entries(era.stats).map(([key, val]) => (
                   <div key={key} className="flex flex-col">
                      <span className="mono text-[8px] text-neutral-600 font-black uppercase tracking-tighter">{key}</span>
                      <span className="mono text-[10px] text-red-900 font-black italic">{val as React.ReactNode}</span>
                   </div>
                 ))}
              </div>
              
              <div className="flex flex-col items-end">
                 <div className="mono text-[8px] text-neutral-600 font-black">LOG_LEVEL</div>
                 <div className="w-16 h-1 bg-black/5 rounded-full mt-1 overflow-hidden">
                    <motion.div 
                      animate={{ width: ['0%', '100%'] }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-red-700" 
                    />
                 </div>
              </div>
           </div>
        </div>

        {/* Weathering Overlays */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
      </motion.div>

      {/* Central Connector Link */}
      <motion.div
        style={{ 
          scale: useTransform(smoothFocal, [0, 1], [0, 1.2]),
          opacity: smoothFocal,
        }}
        className="absolute left-1/2 -translate-x-1/2 w-20 h-20 pointer-events-none z-20 flex items-center justify-center"
      >
        <div className="absolute inset-0 border-2 border-dashed border-white/20 rounded-full animate-spin-slow" />
        <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_20px_white]" />
      </motion.div>

      {/* Narrative Label */}
      <motion.div
        style={{ 
          opacity: useTransform(smoothFocal, [0, 0.5, 1], [0, 0.6, 0]),
          x: era.alignment === 'left' ? 60 : -60
        }}
        className={`absolute left-1/2 -translate-x-1/2 top-1/2 flex items-center gap-6 ${era.alignment === 'left' ? 'flex-row' : 'flex-row-reverse'}`}
      >
         <div className="h-px w-32 bg-white/10" />
         <div className="flex flex-col">
            <span className="mono text-[10px] text-yellow-500 font-black uppercase tracking-[0.3em]">{era.island}</span>
            <span className="mono text-[7px] text-neutral-600 font-bold uppercase">{era.year}</span>
         </div>
      </motion.div>
    </div>
  );
};

export default HistoryStrataDemo;
