import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Service } from '../types';
import { ArrowUpRight } from 'lucide-react';

const services: Service[] = [
  { 
    id: 1, 
    title: 'Strategy', 
    description: 'We decode market chaos to build roadmaps that actually work. No fluff, just executable tactics for dominance.', 
    icon: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop',
    tags: ['Brand Identity', 'Market Analysis', 'User Research', 'Product Discovery']
  },
  { 
    id: 2, 
    title: 'Design', 
    description: 'Visual systems that offend the boring. We craft interfaces that are intuitive yet radically distinct.', 
    icon: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
    tags: ['UI/UX', 'Art Direction', 'Motion Design', '3D Visuals']
  },
  { 
    id: 3, 
    title: 'Development', 
    description: 'Performance-obsessed engineering. We build headless, scalable infrastructures that load before you blink.', 
    icon: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop',
    tags: ['React / Next.js', 'WebGL / Three.js', 'Node.js', 'AWS / Cloud']
  },
  { 
    id: 4, 
    title: 'Content', 
    description: 'Verbal identity that cuts through the noise. We speak human in a world of corporate robots.', 
    icon: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=2000&auto=format&fit=crop',
    tags: ['Copywriting', 'SEO Strategy', 'Social Media', 'Video Production']
  }
];

export const Services: React.FC = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Smooth Mouse Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Update motion values with client coordinates for fixed positioning
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };
  
  return (
    <section 
        id="services" 
        className="py-32 relative bg-rock-900 cursor-none" 
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setActiveService(null)}
    >
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex justify-between items-end mb-20 border-b border-white/10 pb-8">
            <h2 className="text-[10vw] leading-[0.85] font-display font-black uppercase text-white">
                Our<br/><span className="text-acid">Expertise</span>
            </h2>
            <div className="hidden md:block">
                <span className="font-mono text-xs text-acid uppercase tracking-widest block mb-1">Services // 0{services.length}</span>
                <p className="text-gray-400 text-sm max-w-xs text-right">
                    Comprehensive digital solutions engineered for growth and impact.
                </p>
            </div>
        </div>

        {/* Services List */}
        <div className="flex flex-col">
          {services.map((service, index) => (
            <motion.div
              layout
              key={service.id}
              onMouseEnter={() => setActiveService(service.id)}
              className="group border-b border-white/10 py-12 flex flex-col transition-colors hover:bg-white/[0.02] relative overflow-hidden"
            >
              {/* Main Row */}
              <div className="flex items-center justify-between px-4 z-20">
                  <div className="flex items-baseline gap-8 md:gap-16">
                      <span className="font-mono text-sm md:text-base text-gray-500 group-hover:text-acid transition-colors">
                        0{index + 1}
                      </span>
                      <h3 className="text-5xl md:text-8xl font-display font-black uppercase text-white transition-all duration-300 group-hover:text-transparent group-hover:[-webkit-text-stroke:1px_#D4FF00]">
                        {service.title}
                      </h3>
                  </div>
                  <div className="relative">
                      <motion.div
                        animate={{ rotate: activeService === service.id ? 45 : 0 }}
                      >
                         <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 text-white group-hover:text-acid transition-colors" />
                      </motion.div>
                  </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                  {activeService === service.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                          <div className="pt-8 px-4 md:pl-[calc(4rem+32px)] grid grid-cols-1 md:grid-cols-2 gap-8">
                                <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed max-w-md">
                                    {service.description}
                                </p>
                                <div className="flex flex-wrap gap-2 content-start">
                                    {service.tags.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 border border-white/20 rounded-full text-xs font-mono uppercase tracking-wide text-acid bg-acid/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                          </div>
                          <div className="h-8"></div> {/* Spacer */}
                      </motion.div>
                  )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Image Preview */}
      <AnimatePresence>
        {activeService !== null && (
            <motion.div
                style={{ 
                    left: x, 
                    top: y,
                }}
                className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 w-[350px] h-[250px] hidden lg:block"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                <div className="relative w-full h-full overflow-hidden rounded-lg border border-acid/50 shadow-2xl bg-black">
                    <motion.img 
                        key={activeService} // Key change triggers animation
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        src={services.find(s => s.id === activeService)?.icon} 
                        alt="Service Preview" 
                        className="w-full h-full object-cover grayscale contrast-125"
                    />
                    {/* Scanline Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-30"></div>
                    
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-acid"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-acid"></div>
                </div>
                
                {/* Floating Label */}
                <motion.div 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-acid text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1"
                >
                    View Case Studies
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};