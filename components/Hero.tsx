import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';

const heroImages = [
  'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
];

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Mouse position for the floating image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Optimized Physics Configuration
  // Increased mass to 0.5 to add 'weight' and reduce micro-jitter
  // Adjusted damping/stiffness ratio for a smooth, confident follow
  const physics = { damping: 20, stiffness: 300, mass: 0.5 };
  
  const smoothX = useSpring(mouseX, physics);
  const smoothY = useSpring(mouseY, physics);

  // Rotation Logic
  // We track velocity of the *smoothed* X value, not raw mouse X, for cleaner rotation
  const velocityX = useVelocity(smoothX);
  const rotateVelocity = useTransform(velocityX, [-1000, 1000], [-15, 15]);
  // Add a secondary spring to the rotation to eliminate snapping
  const rotate = useSpring(rotateVelocity, { damping: 20, stiffness: 200 });

  const [activeImage, setActiveImage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Parallax for text
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  // Global mouse event listener for smoother tracking than React's onMouseMove
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
        if (isHovering) {
            setActiveImage((prev) => (prev + 1) % heroImages.length);
        }
    }, 400); 
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <section 
        ref={containerRef} 
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="relative h-screen w-full bg-rock-950 overflow-hidden flex flex-col justify-center items-center cursor-none"
    >
        {/* Background Grid */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
             style={{ 
                 backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', 
                 backgroundSize: '100px 100px' 
             }} 
        />

        {/* Floating Hover Image */}
        <motion.div
            style={{ 
                left: smoothX, 
                top: smoothY,
                rotate: rotate,
                opacity: isHovering ? 1 : 0,
                scale: isHovering ? 1 : 0.5,
            }}
            className="fixed z-10 pointer-events-none -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] hidden md:block"
        >
            <div className="w-full h-full overflow-hidden rounded-lg border border-acid/50 shadow-2xl bg-rock-900">
                <img 
                    src={heroImages[activeImage]} 
                    alt="Agency Work" 
                    className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 hover:scale-110"
                />
                {/* Overlay Texture */}
                <div className="absolute inset-0 bg-acid/10 mix-blend-overlay"></div>
            </div>
        </motion.div>

        {/* Main Typography */}
        <div className="relative z-20 flex flex-col items-center leading-none select-none mix-blend-difference text-white">
            <div className="overflow-hidden">
                <motion.h1 
                    style={{ y: y1 }}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                    className="text-[18vw] md:text-[20vw] font-display font-black tracking-tighter hover:text-stroke transition-all duration-300"
                >
                    ROCK
                </motion.h1>
            </div>
            <div className="overflow-hidden -mt-[4vw] md:-mt-[6vw]">
                <motion.h1 
                    style={{ y: y2 }}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.5, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                    className="text-[18vw] md:text-[20vw] font-display font-black tracking-tighter text-acid hover:text-white transition-colors duration-300"
                >
                    SPACE
                </motion.h1>
            </div>
        </div>

        {/* Floating Elements */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute top-32 right-10 md:right-20 max-w-[200px] text-right z-20 mix-blend-difference text-white hidden md:block"
        >
            <p className="font-mono text-xs uppercase mb-2 text-acid">// Manifesto</p>
            <p className="text-sm font-medium leading-relaxed">
                We engineer digital chaos into systematic beauty. A full-service agency for the bold.
            </p>
        </motion.div>

        {/* Bottom Bar */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex justify-between items-end z-20 mix-blend-difference text-white">
            <div className="flex flex-col gap-1">
                <span className="font-mono text-xs uppercase tracking-widest text-acid">Est. 2024</span>
                <span className="font-display font-bold text-xl uppercase">San Francisco, CA</span>
            </div>

            <motion.div 
                className="hidden md:flex items-center gap-4"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
                <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center">
                    <ArrowDownRight className="w-5 h-5 text-acid" />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest">Scroll to Explore</span>
            </motion.div>
        </div>
    </section>
  );
};