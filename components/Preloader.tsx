import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500); 
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[1000] bg-acid flex flex-col items-center justify-between py-12 px-6 text-black"
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
        <div className="w-full flex justify-between font-bold uppercase tracking-widest text-xs">
            <span>Rockspace</span>
            <span>Est. 2024</span>
        </div>
        
        <div className="text-[20vw] font-display font-black leading-none tracking-tighter">
            {progress}%
        </div>

        <div className="w-full flex justify-between font-bold uppercase tracking-widest text-xs">
            <span>Loading Assets</span>
            <span>Please Wait</span>
        </div>
    </motion.div>
  );
};