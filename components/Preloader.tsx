// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';

// export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress(prev => {
//         if (prev >= 100) {
//           clearInterval(timer);
//           setTimeout(onComplete, 500); 
//           return 100;
//         }
//         return prev + 5;
//       });
//     }, 50);

//     return () => clearInterval(timer);
//   }, [onComplete]);

//   return (
//     <motion.div
//       className="fixed inset-0 z-[1000] bg-acid flex flex-col items-center justify-between py-12 px-6 text-black"
//       initial={{ y: 0 }}
//       exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
//     >
//         <div className="w-full flex justify-between font-bold uppercase tracking-widest text-xs">
//             <span>Rockspace</span>
//             <span>Est. 2024</span>
//         </div>
        
//         <div className="text-[20vw] font-display font-black leading-none tracking-tighter">
//             {progress}%
//         </div>

//         <div className="w-full flex justify-between font-bold uppercase tracking-widest text-xs">
//             <span>Loading Assets</span>
//             <span>Please Wait</span>
//         </div>
//     </motion.div>
//   );
// };






import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOG_MESSAGES = [
    "INITIALIZING_CORE_BOOT...",
    "ACCESSING_NEURAL_ARCHIVE...",
    "SYNCING_NODES_01_TO_04...",
    "FETCHING_ASSETS_FROM_VOID...",
    "DECRYPTING_MANIFESTO...",
    "ENCRYPTING_USER_SESSION...",
    "OPTIMIZING_RENDER_PIPELINE...",
    "ESTABLISHING_UPLINK...",
    "CALIBRATING_VISUAL_SENSORS...",
    "SYSTEM_READY_FOR_INTERFACING..."
];

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const logIndexRef = useRef(0);

  useEffect(() => {
    // Progress calculation
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800); 
          return 100;
        }
        // Random incremental jumps for a more "organic" loading feel
        const jump = Math.floor(Math.random() * 8) + 2;
        return Math.min(prev + jump, 100);
      });
    }, 80);

    // Log messages timing
    const logTimer = setInterval(() => {
        if (logIndexRef.current < LOG_MESSAGES.length) {
            setLogs(prev => [...prev, LOG_MESSAGES[logIndexRef.current]].slice(-6));
            logIndexRef.current++;
        }
    }, 250);

    return () => {
        clearInterval(timer);
        clearInterval(logTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[1000] bg-rock-950 flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.2 } }}
    >
        {/* Background Grid - Lights up with progress */}
        <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ 
                backgroundImage: `linear-gradient(to right, #D4FF00 1px, transparent 1px), linear-gradient(to bottom, #D4FF00 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
            }}
        />

        {/* Scanline Laser */}
        <motion.div 
            className="absolute left-0 w-full h-px bg-acid shadow-[0_0_15px_#D4FF00] z-50 opacity-40"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* HUD Elements - Corners */}
        <div className="absolute top-12 left-12 flex flex-col gap-1 font-mono text-[8px] text-gray-600 uppercase tracking-[0.3em]">
            <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-acid animate-pulse"></span>
                CORE_TEMP: 34.2°C
            </div>
            <div>NODE_LINK: ENCRYPTED</div>
        </div>

        <div className="absolute top-12 right-12 flex flex-col items-end gap-1 font-mono text-[8px] text-gray-600 uppercase tracking-[0.3em]">
            <div>ROCKSPACE // ARCHIVE_01</div>
            <div className="text-acid">VER_3.0.2_STABLE</div>
        </div>

        {/* Center Percentage Display - "The Shifter" */}
        <div className="relative z-10">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
            >
                <div className="text-[15vw] font-display font-black leading-none tracking-tighter text-white flex">
                    <span className="relative">
                        {progress < 10 && "0"}
                        {progress}
                        <span className="text-acid ml-[-2vw]">%</span>
                    </span>
                </div>
                
                {/* Visual Progress Bar - Technical style */}
                <div className="w-[300px] h-1 bg-white/5 mt-4 relative overflow-hidden">
                    <motion.div 
                        className="absolute inset-0 bg-acid"
                        initial={{ x: "-100%" }}
                        animate={{ x: `${progress - 100}%` }}
                        transition={{ ease: "easeOut" }}
                    />
                </div>
                
                <div className="mt-4 font-mono text-[10px] text-acid uppercase tracking-[0.5em] animate-pulse">
                    SYSTEM_INITIALIZING
                </div>
            </motion.div>
        </div>

        {/* Log Stream Output */}
        <div className="absolute bottom-12 left-12 max-w-xs">
            <div className="font-mono text-[9px] text-gray-600 uppercase space-y-2">
                {logs.map((log, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex gap-3 ${i === logs.length - 1 ? 'text-acid' : ''}`}
                    >
                        <span>[{new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                        <span>{log}</span>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Exit Shutters */}
        <AnimatePresence>
            {progress === 100 && (
                <>
                    <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: "50%" }}
                        className="absolute top-0 left-0 w-full bg-acid z-[60]"
                        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                    />
                    <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: "50%" }}
                        className="absolute bottom-0 left-0 w-full bg-acid z-[60]"
                        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                    />
                </>
            )}
        </AnimatePresence>

        {/* Bottom Corner Info */}
        <div className="absolute bottom-12 right-12 flex flex-col items-end gap-1 font-mono text-[8px] text-gray-600 uppercase tracking-[0.3em]">
            <div className="flex gap-4">
                <span>COORD: 37.77 / -122.41</span>
                <span className="text-white/20">|</span>
                <span>PACKETS: 24.1KB/S</span>
            </div>
            <div className="mt-1">ROCKSPACE_PROTOCOL_V3</div>
        </div>
    </motion.div>
  );
};