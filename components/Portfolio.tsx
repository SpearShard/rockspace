import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Project } from '../types';

const projects: Project[] = [
  { id: 1, title: 'Neon Flux', category: 'E-Commerce', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000', description: 'Web3 Fashion Retailer', year: '2023' },
  { id: 2, title: 'Apex Logic', category: 'Fintech', image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000', description: 'Crypto Trading Dashboard', year: '2024' },
  { id: 3, title: 'Zenith', category: 'Wellness', image: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=2000', description: 'AI Health Tracker', year: '2023' },
  { id: 4, title: 'Orbit', category: 'Social', image: 'https://images.unsplash.com/photo-1614850523060-8da1d56e37ad?q=80&w=2000', description: 'Next Gen Connection', year: '2024' },
];

const Card: React.FC<{ project: Project; index: number; range: [number, number]; targetScale: number }> = ({ project, index, range, targetScale }) => {
    const container = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
    const scale = useTransform(scrollYProgress, range, [1, targetScale]);

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0 px-4">
            <motion.div 
                style={{ scale, top: `calc(-10% + ${index * 25}px)` }}
                className="relative w-full max-w-[1000px] h-[60vh] md:h-[70vh] rounded-3xl bg-rock-800 border border-white/10 overflow-hidden shadow-2xl origin-top"
            >
                <div className="absolute top-0 left-0 w-full h-full p-8 md:p-12 flex flex-col justify-between z-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
                    <div className="flex justify-between items-start">
                        <span className="bg-acid text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{project.category}</span>
                        <span className="text-white font-mono">{project.year}</span>
                    </div>
                    <h3 className="text-5xl md:text-7xl font-display font-bold text-white uppercase">{project.title}</h3>
                </div>
                <div className="w-full h-full overflow-hidden">
                    <motion.div style={{ scale: imageScale }} className="w-full h-full">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-hover" />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

export const Portfolio: React.FC = () => {
  const container = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section id="work" ref={container} className="bg-rock-950 pb-20 pt-20">
      <div className="container mx-auto px-6 mb-20">
         <h2 className="text-[12vw] leading-none font-display font-black uppercase text-white mb-4">Selected<br/><span className="text-acid">Works</span></h2>
      </div>
      
      <div>
        {projects.map((project, i) => {
            const targetScale = 1 - ( (projects.length - i) * 0.05);
            return <Card key={project.id} index={i} project={project} range={[i * 0.25, 1]} targetScale={targetScale} />;
        })}
      </div>
    </section>
  );
};