import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnetic } from './Magnetic';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Projects', path: '/#work' },
    { name: 'Expertise', path: '/#services' },
    { name: 'Agency', path: '/#agency' },
  ];

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    
    if (path.startsWith('/#')) {
        const hash = path.substring(2); // Remove '/#' to get id
        
        if (location.pathname === '/') {
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate('/');
            // Wait for navigation to complete and Home components to mount
            setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    } else {
        navigate(path);
    }
  };

  const menuVars = {
    initial: { scaleY: 0 },
    animate: { scaleY: 1, transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] } },
    exit: { scaleY: 0, transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  const linkVars = {
    initial: { y: "30vh", transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] } },
    open: { y: 0, transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] } }
  };

  const containerVars = {
    initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
    open: { transition: { delayChildren: 0.3, staggerChildren: 0.09, staggerDirection: 1 } }
  };

  return (
    <>
      <nav className="fixed w-full z-50 top-0 left-0 px-8 py-8 flex justify-between items-start mix-blend-difference text-white pointer-events-none">
        {/* Logo */}
        <div className="pointer-events-auto">
             <Magnetic>
                 <Link to="/" className="group flex flex-col relative overflow-hidden h-[1.5em] text-2xl font-display font-extrabold tracking-tighter">
                    <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">ROCKSPACE®</span>
                    <span className="block absolute top-0 left-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 text-acid">ROCKSPACE®</span>
                 </Link>
             </Magnetic>
        </div>

        {/* Desktop Menu - Minimal */}
        <div className="hidden md:flex items-center gap-12 pointer-events-auto">
            {navLinks.map((link) => (
                <Magnetic key={link.name}>
                    <button 
                        onClick={() => handleNavClick(link.path)}
                        className="group relative overflow-hidden h-[1.5em] text-sm font-bold uppercase tracking-widest cursor-hover flex flex-col"
                    >
                        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">{link.name}</span>
                        <span className="block absolute top-0 left-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 text-acid">{link.name}</span>
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-hover:bg-acid origin-left"></span>
                    </button>
                </Magnetic>
            ))}
            <Magnetic>
                <Link 
                    to="/contact" 
                    className="relative px-6 py-2 border border-white rounded-full text-sm font-bold uppercase tracking-widest overflow-hidden group hover:border-acid transition-colors cursor-hover block"
                >
                    <div className="absolute inset-0 bg-white translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 group-hover:bg-acid"></div>
                    <span className="relative z-10 group-hover:text-black transition-colors duration-500 mix-blend-exclusion">Let's Talk</span>
                </Link>
            </Magnetic>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden pointer-events-auto">
            <Magnetic>
                <button className="cursor-hover group p-2" onClick={() => setIsOpen(!isOpen)}>
                  <div className={`relative w-8 h-6 flex flex-col justify-between items-center overflow-hidden`}>
                     <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[11px]' : ''}`}></span>
                     <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isOpen ? 'translate-x-full opacity-0' : ''}`}></span>
                     <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[11px]' : ''}`}></span>
                  </div>
                </button>
            </Magnetic>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-acid z-40 origin-top flex flex-col justify-center items-center text-rock-950"
          >
            <motion.div 
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col gap-4 text-center"
            >
              {navLinks.map((link) => (
                  <div key={link.name} className="overflow-hidden">
                    <motion.button 
                        variants={linkVars}
                        onClick={() => handleNavClick(link.path)}
                        className="text-7xl md:text-8xl font-display font-black tracking-tighter hover:text-white transition-colors uppercase cursor-hover relative group"
                    >
                        {link.name}
                    </motion.button>
                  </div>
              ))}
              <div className="overflow-hidden">
                <motion.div variants={linkVars}>
                    <Link 
                        to="/contact"
                        onClick={() => setIsOpen(false)} 
                        className="text-7xl md:text-8xl font-display font-black tracking-tighter mt-8 inline-block cursor-hover hover:text-white transition-colors underline decoration-4 underline-offset-8"
                    >
                        Contact
                    </Link>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1, transition: { delay: 0.5 } }}
                className="absolute bottom-12 text-sm font-bold uppercase tracking-widest flex gap-8"
            >
                <span>San Francisco</span>
                <span>Tokyo</span>
                <span>London</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};