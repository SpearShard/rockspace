import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Magnetic } from './Magnetic';

const menuLinks = [
  { 
    name: 'Works', 
    path: '/#work', 
    label: '01', 
    image: 'https://images.unsplash.com/photo-1614850523060-8da1d56e37ad?q=80&w=800&auto=format&fit=crop' 
  },
  { 
    name: 'Expertise', 
    path: '/#services', 
    label: '02', 
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop' 
  },
  { 
    name: 'Agency', 
    path: '/#agency', 
    label: '03', 
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop' 
  },
  { 
    name: 'Contact', 
    path: '/contact', 
    label: '04', 
    image: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=800&auto=format&fit=crop' 
  },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Mouse tracking for image preview
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    if (path.startsWith('/#')) {
      const hash = path.substring(2);
      if (location.pathname === '/') {
        const element = document.getElementById(hash);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else {
      navigate(path);
    }
  };

  // SVG Path variants for the liquid reveal
  const initialPath = `M0 0 L${window.innerWidth} 0 L${window.innerWidth} 0 Q${window.innerWidth / 2} 0 0 0 Z`;
  const targetPath = `M0 0 L${window.innerWidth} 0 L${window.innerWidth} ${window.innerHeight} Q${window.innerWidth / 2} ${window.innerHeight} 0 ${window.innerHeight} Z`;
  const exitPath = `M0 0 L${window.innerWidth} 0 L${window.innerWidth} 0 Q${window.innerWidth / 2} 0 0 0 Z`;

  return (
    <>
      <nav className="fixed w-full z-[60] top-0 left-0 px-6 py-6 md:px-10 md:py-10 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        <div className="pointer-events-auto">
          <Magnetic>
            <Link to="/" onClick={() => setIsOpen(false)} className="group flex flex-col relative overflow-hidden h-[1.5em] text-xl md:text-2xl font-display font-black tracking-tighter">
              <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">ROCKSPACE®</span>
              <span className="block absolute top-0 left-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 text-acid">ROCKSPACE®</span>
            </Link>
          </Magnetic>
        </div>

        <div className="pointer-events-auto flex items-center gap-6">
          <div className="hidden md:flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-white/50">
            <span className="w-1.5 h-1.5 bg-acid rounded-full animate-pulse"></span>
            System Active
          </div>
          
          <Magnetic>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="group relative flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full overflow-hidden transition-all hover:border-acid"
            >
              <div className="absolute inset-0 bg-acid translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"></div>
              <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-black transition-colors">
                {isOpen ? 'Close' : 'Protocol'}
              </span>
              <div className="relative z-10 w-4 h-4 flex flex-col justify-center gap-1">
                <motion.span 
                  animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 2.5 : 0 }}
                  className={`w-full h-0.5 ${isOpen ? 'bg-black' : 'bg-white'} group-hover:bg-black transition-colors`}
                />
                <motion.span 
                  animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -2.5 : 0 }}
                  className={`w-full h-0.5 ${isOpen ? 'bg-black' : 'bg-white'} group-hover:bg-black transition-colors`}
                />
              </div>
            </button>
          </Magnetic>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 pointer-events-none" onMouseMove={handleMouseMove}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none fill-rock-950">
              <motion.path
                initial={{ d: initialPath }}
                animate={{ d: targetPath }}
                exit={{ d: exitPath }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              />
            </svg>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              className="relative w-full h-full flex flex-col justify-center items-center pointer-events-auto"
            >
              <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center">
                {/* Image Preview System */}
                <div className="hidden lg:block relative h-[60vh] overflow-hidden rounded-2xl border border-white/5 bg-rock-900 shadow-2xl">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={hoveredIndex ?? 'default'}
                            src={hoveredIndex !== null ? menuLinks[hoveredIndex].image : 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200'}
                            initial={{ scale: 1.1, opacity: 0, filter: 'blur(10px)' }}
                            animate={{ scale: 1, opacity: 0.4, filter: 'blur(0px)' }}
                            exit={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
                            className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-rock-950 via-transparent to-transparent"></div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-10 left-10 font-mono text-[10px] text-acid uppercase tracking-[0.3em] space-y-2">
                        <div className="flex items-center gap-2"><span className="w-1 h-1 bg-acid"></span> Visualizer_Active</div>
                        <div className="flex items-center gap-2"><span className="w-1 h-1 bg-acid"></span> Node_Cluster_04</div>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col lg:pl-20">
                  {menuLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1, ease: [0.76, 0, 0.24, 1], duration: 0.8 }}
                      className="group relative"
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <button 
                        onClick={() => handleNavClick(link.path)}
                        className="relative py-4 md:py-6 flex items-baseline gap-6 w-full text-left"
                      >
                        <span className="font-mono text-xs md:text-sm text-acid opacity-0 group-hover:opacity-100 transition-opacity">
                            [{link.label}]
                        </span>
                        <h2 className="text-6xl md:text-[8vw] font-display font-black uppercase tracking-tighter leading-none transition-all duration-500 group-hover:translate-x-4 group-hover:skew-x-[-10deg] group-hover:text-acid">
                            {link.name}
                        </h2>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer Information Layer */}
              <div className="absolute bottom-10 left-0 w-full px-10 flex flex-wrap justify-between items-end gap-10">
                <div className="grid grid-cols-2 gap-10 md:gap-20">
                    <div className="space-y-1">
                        <span className="block font-mono text-[10px] uppercase text-gray-500 tracking-widest">Active_Node</span>
                        <span className="block font-display font-bold text-white uppercase">San Francisco</span>
                    </div>
                    <div className="space-y-1">
                        <span className="block font-mono text-[10px] uppercase text-gray-500 tracking-widest">Coordinates</span>
                        <span className="block font-display font-bold text-white uppercase">37.7749° N, 122.4194° W</span>
                    </div>
                </div>
                
                <div className="hidden lg:flex gap-10">
                   <div className="flex flex-col items-end">
                        <span className="font-mono text-[10px] uppercase text-gray-500 tracking-widest mb-2">Socials</span>
                        <div className="flex gap-4">
                            {['IG', 'TW', 'LI'].map(s => (
                                <a key={s} href="#" className="font-bold text-xs hover:text-acid transition-colors">{s}</a>
                            ))}
                        </div>
                   </div>
                </div>
              </div>
            </motion.div>

            {/* Mouse Image Follow (Internal Only) */}
            <motion.div
                style={{ left: springX, top: springY }}
                className="fixed z-20 pointer-events-none w-40 h-40 border border-acid/30 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            >
                 <div className="w-1 h-1 bg-acid rounded-full"></div>
                 <div className="absolute inset-0 border border-acid/10 animate-ping"></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};