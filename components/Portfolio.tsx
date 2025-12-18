// import React from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { Project } from '../types';

// const projects: Project[] = [
//   { id: 1, title: 'Neon Flux', category: 'E-Commerce', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000', description: 'Web3 Fashion Retailer', year: '2023' },
//   { id: 2, title: 'Apex Logic', category: 'Fintech', image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000', description: 'Crypto Trading Dashboard', year: '2024' },
//   { id: 3, title: 'Zenith', category: 'Wellness', image: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=2000', description: 'AI Health Tracker', year: '2023' },
//   { id: 4, title: 'Orbit', category: 'Social', image: 'https://images.unsplash.com/photo-1614850523060-8da1d56e37ad?q=80&w=2000', description: 'Next Gen Connection', year: '2024' },
// ];

// const Card: React.FC<{ project: Project; index: number; range: [number, number]; targetScale: number }> = ({ project, index, range, targetScale }) => {
//     const container = React.useRef(null);
//     const { scrollYProgress } = useScroll({
//         target: container,
//         offset: ['start end', 'start start']
//     });

//     const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
//     const scale = useTransform(scrollYProgress, range, [1, targetScale]);

//     return (
//         <div ref={container} className="h-screen flex items-center justify-center sticky top-0 px-4">
//             <motion.div 
//                 style={{ scale, top: `calc(-10% + ${index * 25}px)` }}
//                 className="relative w-full max-w-[1000px] h-[60vh] md:h-[70vh] rounded-3xl bg-rock-800 border border-white/10 overflow-hidden shadow-2xl origin-top"
//             >
//                 <div className="absolute top-0 left-0 w-full h-full p-8 md:p-12 flex flex-col justify-between z-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
//                     <div className="flex justify-between items-start">
//                         <span className="bg-acid text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{project.category}</span>
//                         <span className="text-white font-mono">{project.year}</span>
//                     </div>
//                     <h3 className="text-5xl md:text-7xl font-display font-bold text-white uppercase">{project.title}</h3>
//                 </div>
//                 <div className="w-full h-full overflow-hidden">
//                     <motion.div style={{ scale: imageScale }} className="w-full h-full">
//                         <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-hover" />
//                     </motion.div>
//                 </div>
//             </motion.div>
//         </div>
//     )
// }

// export const Portfolio: React.FC = () => {
//   const container = React.useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: container,
//     offset: ['start start', 'end end']
//   });

//   return (
//     <section id="work" ref={container} className="bg-rock-950 pb-20 pt-20">
//       <div className="container mx-auto px-6 mb-20">
//          <h2 className="text-[12vw] leading-none font-display font-black uppercase text-white mb-4">Selected<br/><span className="text-acid">Works</span></h2>
//       </div>
      
//       <div>
//         {projects.map((project, i) => {
//             const targetScale = 1 - ( (projects.length - i) * 0.05);
//             return <Card key={project.id} index={i} project={project} range={[i * 0.25, 1]} targetScale={targetScale} />;
//         })}
//       </div>
//     </section>
//   );
// };













import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { Project } from '../types';
import { ArrowUpRight, Activity, Zap, Maximize2, Layers } from 'lucide-react';
import { Magnetic } from './Magnetic';

const projects: Project[] = [
  { id: 1, title: 'Neon Flux', category: 'E-Commerce', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000', description: 'Next-gen Web3 fashion interface for the digital avant-garde.', year: '2023' },
  { id: 2, title: 'Apex Logic', category: 'Fintech', image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000', description: 'High-frequency crypto trading dashboard with zero-latency visual feedback.', year: '2024' },
  { id: 3, title: 'Zenith', category: 'Wellness', image: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=2000', description: 'AI-driven health ecosystem utilizing neural biometric tracking.', year: '2023' },
  { id: 4, title: 'Orbit', category: 'Social', image: 'https://images.unsplash.com/photo-1614850523060-8da1d56e37ad?q=80&w=2000', description: 'Decentralized connection protocol for the hyper-connected era.', year: '2024' },
  { id: 5, title: 'Cyberia', category: 'Security', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2000', description: 'Automated threat detection and visualization for enterprise networks.', year: '2024' },
];

const CascadeCard: React.FC<{ 
  project: Project; 
  index: number; 
  total: number;
  progress: any;
}> = ({ project, index, total, progress }) => {
  const step = 1 / total;
  const offset = index * step;
  
  const relativeProgress = useTransform(progress, (p: number) => {
    let val = (p - offset);
    if (val < -0.5) val += 1;
    if (val > 0.5) val -= 1;
    return val;
  });

  const x = useTransform(relativeProgress, [-0.5, 0, 0.5], ["120%", "0%", "-120%"]);
  const y = useTransform(relativeProgress, [-0.5, 0, 0.5], ["50%", "0%", "-50%"]);
  const z = useTransform(relativeProgress, [-0.3, 0, 0.3], [-200, 50, -200]);
  
  const rotateZ = useTransform(relativeProgress, [-0.5, 0, 0.5], [15, 0, -15]);
  const rotateY = useTransform(relativeProgress, [-0.5, 0, 0.5], [30, 0, -30]);
  
  const opacity = useTransform(relativeProgress, [-0.4, -0.2, 0, 0.2, 0.4], [0, 1, 1, 1, 0]);
  const scale = useTransform(relativeProgress, [-0.3, 0, 0.3], [0.7, 1.1, 0.7]);
  
  const zIndex = useTransform(relativeProgress, (v: number) => Math.round((1 - Math.abs(v)) * 100));

  return (
    <motion.div 
      style={{ 
        x, y, z, 
        rotateZ, rotateY,
        scale, 
        opacity,
        zIndex
      }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none transform-gpu will-change-transform"
    >
      <div className="relative w-[90vw] md:w-[55vw] aspect-[16/10] pointer-events-auto group transform-gpu will-change-transform">
        <div className="absolute inset-0 bg-rock-900 border border-white/10 overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.8)] transition-transform duration-700 group-hover:scale-[1.02]">
          <motion.img 
            src={project.image} 
            className="w-full h-full object-cover grayscale contrast-125 brightness-[0.25] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-out transform-gpu will-change-transform"
          />
          
          <div className="absolute inset-0 p-8 md:p-14 z-20 flex flex-col justify-between">
             <div className="flex justify-between items-start">
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-px bg-acid"></div>
                      <span className="font-mono text-[10px] text-acid uppercase tracking-[0.4em]">0{project.id} // {project.category}</span>
                   </div>
                   <h3 className="text-5xl md:text-[6vw] font-display font-black text-white uppercase leading-[0.75] tracking-tighter italic">
                     {project.title}
                   </h3>
                </div>
                <div className="text-right">
                   <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-1 italic">Release_Archive</div>
                   <div className="text-2xl font-display font-bold text-white/10 group-hover:text-acid transition-colors">{project.year}</div>
                </div>
             </div>

             <div className="flex justify-between items-end">
                <p className="max-w-xs text-xs font-mono text-gray-500 uppercase tracking-widest leading-relaxed opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  {project.description}
                </p>
                
                <Magnetic>
                   <button className="relative w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/20 flex items-center justify-center group/btn overflow-hidden hover:border-acid transition-colors">
                      <div className="absolute inset-0 bg-acid scale-0 group-hover/btn:scale-100 transition-transform duration-500 rounded-full" />
                      <ArrowUpRight className="relative z-10 w-6 h-6 md:w-10 md:h-10 text-white group-hover/btn:text-black transition-colors" />
                   </button>
                </Magnetic>
             </div>
          </div>

          <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-10 transition-opacity">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
          </div>
        </div>

        <div className="absolute -inset-8 border border-white/5 pointer-events-none -z-10 group-hover:border-acid/10 transition-colors duration-700"></div>
        <div className="absolute -top-12 -left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
           <Maximize2 className="w-4 h-4 text-acid" />
        </div>
      </div>
    </motion.div>
  );
};

export const Portfolio: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 40, stiffness: 100 });
  const velocity = useVelocity(smoothProgress);

  // Update index based on scroll progress
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    // Map 0-1 range to 1-5 project indices
    const current = Math.min(projects.length, Math.max(1, Math.floor(latest * projects.length + 0.5) + 1));
    if (current !== activeIndex) {
      setActiveIndex(current);
    }
  });

  const bgTitleY = useTransform(smoothProgress, [0, 1], ["10%", "-10%"]);
  const bgTitleRotate = useTransform(smoothProgress, [0, 1], [-5, 5]);

  return (
    <section 
      id="work" 
      ref={containerRef} 
      className="relative h-[800vh] bg-rock-950 cursor-none"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* BACKGROUND KINETIC LAYER */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
           <motion.div 
              style={{ y: bgTitleY, rotate: bgTitleRotate }}
              className="flex flex-col items-center transform-gpu will-change-transform"
           >
              <h2 className="text-[25vw] font-display font-black text-white/5 leading-[0.7] tracking-tighter uppercase italic select-none">
                ROCK<br/><span className="text-acid/5 translate-x-[10%]">WORKS</span>
              </h2>
           </motion.div>
           
           <div className="absolute inset-0 opacity-[0.03]">
              <div className="w-full h-full border-x border-white/20 grid grid-cols-12 divide-x divide-white/10">
                 {[...Array(12)].map((_, i) => <div key={i} />)}
              </div>
           </div>
        </div>

        {/* HUD INTERFACE LAYER */}
        <div className="absolute inset-0 z-[100] pointer-events-none p-8 md:p-12 flex flex-col justify-between">
           <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-3 text-acid font-mono text-[10px] uppercase tracking-[0.6em]">
                    <Activity className="w-4 h-4 animate-pulse" /> archive_traversal_mode
                 </div>
                 <div className="h-px w-48 bg-white/10 relative overflow-hidden">
                    <motion.div 
                       style={{ scaleX: smoothProgress, transformOrigin: 'left' }}
                       className="absolute inset-0 bg-acid transform-gpu will-change-transform"
                    />
                 </div>
              </div>
              
              <div className="flex items-end gap-12 font-mono text-[9px] text-gray-700 uppercase tracking-widest">
                 <div className="flex flex-col items-end">
                    <span>Active_Node</span>
                    <span className="text-white">PROJECT_ARCHIVE_V3.0</span>
                 </div>
                 <div className="w-px h-8 bg-white/10"></div>
                 <div className="flex flex-col items-end">
                    <span>System_Load</span>
                    <span className="text-acid">0.0{Math.abs(Math.round(velocity.get() * 100))}MS</span>
                 </div>
              </div>
           </div>

           <div className="flex justify-between items-end">
              <div className="flex gap-24 items-end">
                 <div className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] text-gray-700 uppercase tracking-widest italic">Scanning_Velocity</span>
                    <div className="text-5xl font-display font-black text-white tracking-tighter">
                       {Math.abs(Math.round(velocity.get() * 1000))} <span className="text-xs font-mono text-acid uppercase">m/s</span>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col items-end gap-4">
                 <div className="text-right">
                    <span className="font-mono text-[8px] text-gray-600 uppercase tracking-widest">Traverse_Index</span>
                    <div className="flex items-baseline gap-2">
                       <div className="relative h-24 w-40 overflow-hidden">
                          <AnimatePresence mode="wait">
                            <motion.span 
                                key={activeIndex}
                                initial={{ y: "100%" }}
                                animate={{ y: "0%" }}
                                exit={{ y: "-100%" }}
                                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                                className="absolute inset-0 text-8xl font-display font-black text-white italic leading-none transform-gpu will-change-transform"
                            >
                                0{activeIndex}
                            </motion.span>
                          </AnimatePresence>
                       </div>
                       <span className="text-xl font-display font-bold text-acid">/0{projects.length}</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* THE CASCADE TRACK */}
        <div className="relative w-full h-full perspective-3000 preserve-3d">
          {projects.map((project, i) => (
            <CascadeCard 
               key={project.id}
               project={project}
               index={i}
               total={projects.length}
               progress={smoothProgress}
            />
          ))}
        </div>

        {/* GLOBAL VIGNETTE & TECH DECORS */}
        <div className="absolute inset-0 z-[110] pointer-events-none">
           <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]"></div>
           <div className="absolute bottom-12 left-12">
              <Zap className="w-5 h-5 text-acid animate-pulse" />
           </div>
           <div className="absolute top-12 right-12">
              <Layers className="w-5 h-5 text-white/10" />
           </div>
        </div>
      </div>
    </section>
  );
};