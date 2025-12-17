import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Magnetic } from './Magnetic';

const TimeDisplay = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const sfTime = new Date().toLocaleTimeString('en-US', {
                timeZone: 'America/Los_Angeles',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            setTime(sfTime);
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col">
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Local Time (SF)</span>
            <span className="text-xl font-mono font-bold text-acid">{time}</span>
        </div>
    );
};

export const Footer: React.FC = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  
  // Custom Cursor for the CTA area
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      cursorX.set(e.clientX - rect.left);
      cursorY.set(e.clientY - rect.top);
  };

  return (
    <footer ref={container} className="relative bg-rock-950 text-white overflow-hidden pt-20 border-t border-white/10">
      
      {/* Infinite Marquee */}
      <div className="w-full bg-acid py-2 overflow-hidden rotate-1 scale-105 origin-left border-y border-black">
        <div className="animate-marquee whitespace-nowrap flex gap-8">
            {[...Array(10)].map((_, i) => (
                <span key={i} className="text-black font-display font-black uppercase text-4xl tracking-tighter">
                    Strategy • Design • Engineering • Growth •
                </span>
            ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 py-24">
        
        {/* Massive Interactive CTA */}
        <div 
            className="relative border-b border-white/10 pb-24 mb-24 cursor-none"
            onMouseEnter={() => setIsHoveringCTA(true)}
            onMouseLeave={() => setIsHoveringCTA(false)}
            onMouseMove={handleMouseMove}
        >
            <div className="flex flex-col items-start leading-[0.8]">
                <h2 className="text-[12vw] font-display font-black uppercase tracking-tighter text-transparent text-stroke hover:text-white transition-colors duration-500">
                    Have An
                </h2>
                <h2 className="text-[12vw] font-display font-black uppercase tracking-tighter text-white ml-[10vw]">
                    Idea?
                </h2>
            </div>

            {/* Floating Button inside CTA area */}
            <motion.div
                style={{ 
                    top: cursorYSpring, 
                    left: cursorXSpring,
                    pointerEvents: 'none'
                }}
                className={`absolute w-32 h-32 bg-acid rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 z-20 mix-blend-difference transition-opacity duration-300 ${isHoveringCTA ? 'opacity-100' : 'opacity-0'}`}
            >
                <span className="text-black font-bold uppercase text-center text-xs leading-tight">Start<br/>Project</span>
            </motion.div>
            
            {/* Clickable Area Overlay */}
            <Link to="/contact" className="absolute inset-0 z-10" />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            
            {/* Column 1: Brand */}
            <div className="flex flex-col justify-between h-full">
                <div className="mb-8">
                    <h3 className="text-2xl font-display font-bold uppercase mb-4">Rockspace®</h3>
                    <p className="text-gray-400 text-sm max-w-[200px]">
                        Engineering digital chaos into systematic beauty.
                    </p>
                </div>
                <TimeDisplay />
            </div>

            {/* Column 2: Sitemap */}
            <div>
                <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6">// Explore</h4>
                <ul className="space-y-2">
                    {['Work', 'Services', 'Agency', 'Contact'].map((item) => (
                        <li key={item}>
                            <Link to="/" className="text-lg font-bold uppercase hover:text-acid hover:translate-x-2 transition-all inline-block cursor-hover">
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Column 3: Socials */}
            <div>
                <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6">// Socials</h4>
                <ul className="space-y-4">
                    {['Instagram', 'Twitter / X', 'LinkedIn', 'Awwwards'].map((social) => (
                        <li key={social}>
                            <a href="#" className="group flex items-center gap-2 cursor-hover">
                                <span className="w-2 h-2 bg-white rounded-full group-hover:bg-acid transition-colors"></span>
                                <span className="uppercase font-bold text-sm group-hover:text-acid transition-colors">{social}</span>
                                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-acid" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
                <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6">// Drop a Line</h4>
                <Magnetic>
                    <a href="mailto:hello@rockspace.agency" className="text-xl md:text-2xl font-display font-bold underline decoration-1 underline-offset-4 hover:text-acid hover:decoration-acid transition-colors cursor-hover">
                        hello@rockspace.agency
                    </a>
                </Magnetic>
                <div className="mt-8">
                     <p className="text-sm text-gray-400">123 Market St. Suite 400</p>
                     <p className="text-sm text-gray-400">San Francisco, CA 94103</p>
                </div>
            </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-end mt-24 pt-8 border-t border-white/10">
            <p className="text-xs text-gray-600 font-mono uppercase">© 2024 Rockspace Inc. All Rights Reserved.</p>
            <p className="text-xs text-gray-600 font-mono uppercase mt-2 md:mt-0">Privacy Policy / Terms of Service</p>
        </div>
      </div>

      {/* Massive Background Watermark */}
      <motion.div style={{ y }} className="absolute bottom-0 left-0 w-full pointer-events-none select-none overflow-hidden leading-none z-0 opacity-10">
         <h1 className="text-[25vw] font-display font-black text-white text-center translate-y-[20%]">ROCKSPACE</h1>
      </motion.div>
    </footer>
  );
};
