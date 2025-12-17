import React from 'react';
import { motion } from 'framer-motion';
import { TeamMember } from '../types';

const team: TeamMember[] = [
  { 
    id: 1, 
    name: 'Alex Rivera', 
    role: 'Founder & Design Director', 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&h=1500&fit=crop', 
    skills: ['Art Direction', 'Brand Strategy', 'UI/UX', 'Motion'] 
  },
  { 
    id: 2, 
    name: 'Sarah Chen', 
    role: 'Head of Engineering', 
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&h=1500&fit=crop', 
    skills: ['System Architecture', 'WebGL', 'React', 'Node.js'] 
  },
  { 
    id: 3, 
    name: 'Marcus Thorne', 
    role: 'Technical Lead', 
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&h=1500&fit=crop', 
    skills: ['Cloud Infra', 'DevOps', 'Security', 'Python'] 
  },
  { 
    id: 4, 
    name: 'Elena Volkov', 
    role: 'Creative Developer', 
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&h=1500&fit=crop', 
    skills: ['Creative Coding', 'Three.js', 'GLSL', 'Animation'] 
  }
];

const MemberCard: React.FC<{ member: TeamMember; index: number }> = ({ member, index }) => {
    return (
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.1,
                        delayChildren: index * 0.15 // Global stagger based on index
                    }
                }
            }}
            className={`group relative w-full ${index % 2 === 1 ? 'md:mt-32' : ''}`}
        >
            {/* Image Container with Reveal Mask */}
            <div className="relative aspect-[3/4] mb-8">
                <motion.div
                    variants={{
                        hidden: { clipPath: 'inset(100% 0 0 0)' },
                        visible: { 
                            clipPath: 'inset(0% 0 0 0)',
                            transition: { duration: 1.5, ease: [0.77, 0, 0.175, 1] } 
                        }
                    }}
                    className="absolute inset-0 z-10 overflow-hidden border border-white/5 bg-rock-900"
                >
                     {/* Entrance Scale Wrapper */}
                     <motion.div
                        variants={{
                            hidden: { scale: 1.3 },
                            visible: { 
                                scale: 1,
                                transition: { duration: 1.5, ease: [0.77, 0, 0.175, 1] } 
                            }
                        }}
                        className="w-full h-full"
                     >
                        {/* Hover Zoom & Grayscale Logic */}
                        <div className="w-full h-full transition-transform duration-700 group-hover:scale-105">
                            <img 
                                src={member.image} 
                                alt={member.name}
                                className="w-full h-full object-cover opacity-60 grayscale transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0"
                            />
                        </div>
                     </motion.div>
                     
                     {/* Hover Skills Overlay (Inside Mask) */}
                    <div className="absolute inset-0 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-[2px] pointer-events-none">
                        <div className="w-full bg-acid py-3 -rotate-3 scale-110 transform origin-center shadow-lg">
                            <div className="flex animate-marquee whitespace-nowrap">
                                {[...Array(6)].map((_, i) => (
                                    <span key={i} className="text-black font-display font-black uppercase text-xl md:text-2xl px-4">
                                        {member.skills.join('  •  ')}  •  
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Info Reveal */}
            <div className="flex flex-col border-t border-white/20 pt-6 group-hover:border-acid transition-colors duration-300">
                <div className="flex justify-between items-end mb-2 overflow-hidden">
                     <motion.span 
                        variants={{ hidden: { y: "100%" }, visible: { y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } } }}
                        className="text-acid font-mono text-xs uppercase tracking-widest block"
                     >
                        {member.role}
                     </motion.span>
                     <motion.span 
                        variants={{ hidden: { y: "100%" }, visible: { y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } } }}
                        className="text-white/20 font-mono text-xs block"
                     >
                        0{index + 1}
                     </motion.span>
                </div>
                <div className="overflow-hidden">
                    <motion.h3 
                        variants={{ hidden: { y: "100%", rotate: 2 }, visible: { y: 0, rotate: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } } }}
                        className="text-4xl md:text-5xl font-display font-bold uppercase text-white group-hover:text-acid transition-colors duration-300 block origin-top-left"
                    >
                        {member.name}
                    </motion.h3>
                </div>
            </div>
        </motion.div>
    )
}

export const Team: React.FC = () => {
  return (
    <section id="agency" className="py-32 bg-rock-950">
        <div className="container mx-auto px-6">
            <div className="mb-24 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-end gap-8">
                <h2 className="text-[10vw] leading-[0.85] font-display font-black uppercase text-white">
                    The<br/><span className="text-acid">Minds</span>
                </h2>
                <p className="max-w-md text-gray-400 text-lg mb-2">
                    A collective of digital artisans, engineers, and strategists obsessed with perfection.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                {team.map((member, i) => (
                    <MemberCard key={member.id} member={member} index={i} />
                ))}
            </div>
        </div>
    </section>
  );
};