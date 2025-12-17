import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Discovery',
    subtitle: 'Uncover the Truth',
    desc: 'We strip away assumptions. Through deep-dive workshops, user research, and competitive analysis, we find the core problem and the golden opportunity.',
  },
  {
    id: 2,
    title: 'Design',
    subtitle: 'Systematic Chaos',
    desc: 'We do not decorate. We engineer visual systems. Radical typography, fluid micro-interactions, and brutalist layouts that sear into memory.',
  },
  {
    id: 3,
    title: 'Development',
    subtitle: 'Code as Poetry',
    desc: 'Performance is our religion. We build headless, scalable, and secure infrastructures using Next.js, WebGL, and edge computing.',
  },
  {
    id: 4,
    title: 'Launch',
    subtitle: 'Ignition Sequence',
    desc: 'Deployment is just the start. We handle SEO, analytics integration, and performance tuning to ensure day-one dominance.',
  }
];

const DesktopProcess: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate the horizontal translation
  // We want to move left enough to show all cards.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-rock-950 hidden md:block">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-16 px-20 items-center">
          
          {/* Title Section */}
          <div className="min-w-[40vw] shrink-0">
             <h2 className="text-[10vw] font-display font-black uppercase leading-[0.85] text-white">
                The<br/>
                <span className="text-acid">Process</span>
             </h2>
             <div className="mt-8 flex items-center gap-4 text-white/50 uppercase tracking-widest text-sm">
                <span>Scroll to explore</span>
                <ArrowRight className="w-4 h-4" />
             </div>
          </div>

          {/* Steps */}
          {steps.map((step) => (
            <div 
                key={step.id} 
                className="group relative h-[70vh] w-[60vw] shrink-0 bg-rock-900 border border-white/10 p-12 flex flex-col justify-between overflow-hidden hover:border-acid/50 transition-colors duration-500"
            >
                {/* Background Number */}
                <div className="absolute -right-10 -top-20 text-[20rem] font-display font-black text-white/5 select-none pointer-events-none group-hover:text-acid/5 transition-colors duration-500">
                    {step.id}
                </div>

                <div className="relative z-10">
                    <span className="inline-block px-4 py-1 border border-acid text-acid rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                        Phase 0{step.id}
                    </span>
                    <h3 className="text-7xl font-display font-bold uppercase text-white mb-2">
                        {step.title}
                    </h3>
                    <p className="text-xl text-gray-400 font-mono">
                        // {step.subtitle}
                    </p>
                </div>

                <div className="relative z-10 border-t border-white/10 pt-8">
                    <p className="text-2xl text-gray-300 leading-relaxed max-w-2xl">
                        {step.desc}
                    </p>
                </div>
                
                {/* Interactive corner graphic */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-acid/10 rounded-tl-full translate-y-full translate-x-full group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </div>
          ))}
          
           {/* End Buffer */}
           <div className="min-w-[10vw] shrink-0"></div>

        </motion.div>
      </div>
    </section>
  );
};

const MobileProcess: React.FC = () => {
    return (
        <section className="bg-rock-950 py-20 px-6 md:hidden border-t border-white/10">
             <h2 className="text-6xl font-display font-black uppercase text-white mb-12">
                The<br/>
                <span className="text-acid">Process</span>
             </h2>
             <div className="flex flex-col gap-8">
                {steps.map((step) => (
                    <div key={step.id} className="border border-white/10 p-8 bg-rock-900">
                        <span className="text-acid font-mono text-sm mb-4 block">PHASE 0{step.id}</span>
                        <h3 className="text-4xl font-display font-bold uppercase text-white mb-2">{step.title}</h3>
                        <p className="text-gray-500 font-mono text-sm mb-6">// {step.subtitle}</p>
                        <p className="text-gray-300 leading-relaxed">{step.desc}</p>
                    </div>
                ))}
             </div>
        </section>
    )
}

export const Process: React.FC = () => {
    return (
        <>
            <DesktopProcess />
            <MobileProcess />
        </>
    )
}
