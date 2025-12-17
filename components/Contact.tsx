import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, ArrowRight, CornerRightDown, Terminal, Cpu, Clock, Send, ShieldCheck, Activity } from 'lucide-react';
import { analyzeProjectIdea } from '../services/geminiService';
import { AIAnalysis } from '../types';

const InputField = ({ label, name, type = "text", value, onChange, placeholder, required = false }: any) => {
    const [isFocused, setIsFocused] = useState(false);
    
    return (
        <motion.div 
            variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
            }}
            className="group relative overflow-hidden"
        >
            <label className={`block text-xs font-mono font-bold uppercase tracking-widest mb-4 transition-colors duration-300 ${isFocused ? 'text-acid' : 'text-gray-500'}`}>
                {label} {required && <span className="text-acid">*</span>}
            </label>
            <input 
                type={type} 
                name={name} 
                value={value} 
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                required={required}
                className="w-full bg-transparent border-b border-white/10 py-4 text-xl md:text-3xl font-display font-medium focus:outline-none placeholder:text-white/5 transition-colors z-10 relative text-white"
                placeholder={placeholder}
            />
            
            {/* Animated Border */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10"></div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-acid scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left shadow-[0_0_10px_#D4FF00]"></div>
            
            {/* Corner Decor */}
            <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r transition-colors duration-300 ${isFocused ? 'border-acid' : 'border-white/10'}`}></div>
        </motion.div>
    );
};

const TypewriterText = ({ text, speed = 20 }: { text: string, speed?: number }) => {
    const [displayedText, setDisplayedText] = useState('');
    
    useEffect(() => {
        setDisplayedText('');
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
        return () => clearInterval(timer);
    }, [text, speed]);

    return <span>{displayedText}</span>;
};

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  });
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAIHelp = async () => {
    if (formData.message.length < 10) return;
    setIsAnalyzing(true);
    setAiAnalysis(null); // Reset previous
    
    // Artificial delay for "scanning" effect
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
        const analysis = await analyzeProjectIdea(formData.message);
        setAiAnalysis(analysis);
    } catch (e) {
        console.error(e);
    } finally {
        setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 2000);
  };

  if (formState === 'success') {
    return (
      <div className="h-screen w-full bg-rock-950 flex flex-col items-center justify-center text-white relative overflow-hidden">
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center z-20 relative"
        >
            <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 rounded-full border border-acid/30 flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border border-acid animate-ping opacity-20"></div>
                    <motion.div 
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="w-full h-full rounded-full bg-acid/10 flex items-center justify-center text-acid"
                    >
                        <ShieldCheck className="w-10 h-10" />
                    </motion.div>
                </div>
            </div>
            <h2 className="text-[8vw] leading-[0.8] font-display font-black uppercase text-white mb-6 tracking-tighter">
                Transmission<br/><span className="text-acid">Secured</span>
            </h2>
            <div className="flex flex-col items-center gap-2">
                <p className="font-mono text-gray-400 uppercase tracking-widest text-sm bg-white/5 px-4 py-1 rounded">
                    Ticket ID: #{Math.floor(Math.random() * 999999)}
                </p>
                <p className="font-mono text-gray-500 text-xs mt-4">
                    Our agents will establish contact within 24 hours.
                </p>
            </div>
            <motion.a 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                href="/" 
                className="mt-12 inline-flex items-center gap-2 px-8 py-3 border border-white/20 hover:border-acid hover:text-acid transition-colors uppercase font-bold tracking-widest text-xs group"
            >
                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                Return to Base
            </motion.a>
        </motion.div>
        
        {/* Success Background */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,255,0,0.15),transparent_70%)]"></div>
            <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rock-950 text-white selection:bg-acid selection:text-black pt-32 pb-20 relative overflow-hidden">
      
      {/* Background Grid */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-10"
        style={{ 
            backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-24 border-b border-white/10 pb-12">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="flex flex-col md:flex-row justify-between items-end"
            >
                <h1 className="text-[12vw] leading-[0.8] font-display font-black uppercase tracking-tighter">
                    <span className="block overflow-hidden">
                        <motion.span 
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="block"
                        >
                            Initiate
                        </motion.span>
                    </span>
                    <span className="block overflow-hidden text-transparent text-stroke">
                        <motion.span 
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="block"
                        >
                            Protocol
                        </motion.span>
                    </span>
                </h1>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mb-4 md:mb-8 text-right hidden md:block"
                >
                    <div className="flex items-center justify-end gap-2 text-acid font-mono text-xs uppercase mb-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-acid opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-acid"></span>
                        </span>
                        Status: Online
                    </div>
                    <p className="text-gray-400 max-w-xs text-sm leading-relaxed">
                        Tell us about your vision. We will deconstruct it, analyze it, and rebuild it better.
                    </p>
                </motion.div>
            </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
            
            {/* Form Column */}
            <div className="lg:col-span-7">
                <form onSubmit={handleSubmit} className="flex flex-col gap-12">
                    <motion.div 
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                        }}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col gap-12"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <InputField 
                                label="Identity // Name" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleInputChange} 
                                placeholder="John Doe" 
                                required 
                            />
                            <InputField 
                                label="Coordinates // Email" 
                                name="email" 
                                type="email"
                                value={formData.email} 
                                onChange={handleInputChange} 
                                placeholder="john@example.com" 
                                required 
                            />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <InputField 
                                label="Organization // Company" 
                                name="company" 
                                value={formData.company} 
                                onChange={handleInputChange} 
                                placeholder="Acme Corp." 
                            />
                            
                            <motion.div 
                                variants={{
                                    hidden: { y: 20, opacity: 0 },
                                    visible: { y: 0, opacity: 1 }
                                }}
                                className="group relative overflow-hidden"
                            >
                                <label className="block text-xs font-mono font-bold uppercase tracking-widest text-gray-500 mb-4 transition-colors group-focus-within:text-acid">
                                    Fuel // Budget
                                </label>
                                <div className="relative">
                                    <select 
                                        name="budget" 
                                        value={formData.budget} 
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent border-b border-white/10 py-4 text-xl md:text-3xl font-display font-medium focus:outline-none text-white appearance-none rounded-none cursor-pointer relative z-10"
                                    >
                                        <option value="" className="bg-rock-900 text-gray-500">Select Range</option>
                                        <option value="10-25k" className="bg-rock-900">$10k - $25k</option>
                                        <option value="25-50k" className="bg-rock-900">$25k - $50k</option>
                                        <option value="50k-100k" className="bg-rock-900">$50k - $100k</option>
                                        <option value="100k+" className="bg-rock-900">$100k+</option>
                                    </select>
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <CornerRightDown className="w-5 h-5 text-acid" />
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-acid scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left shadow-[0_0_10px_#D4FF00]"></div>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div 
                            variants={{
                                hidden: { y: 20, opacity: 0 },
                                visible: { y: 0, opacity: 1 }
                            }}
                            className="group relative mt-8"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-acid transition-colors">
                                    Brief // The Vision
                                </label>
                            </div>
                            <div className="relative">
                                <textarea 
                                    name="message" 
                                    required 
                                    rows={4} 
                                    value={formData.message} 
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 p-6 text-xl focus:outline-none focus:border-acid transition-colors resize-none text-white placeholder:text-white/20 rounded-lg"
                                    placeholder="Describe what you want to build in chaos..."
                                ></textarea>
                                
                                <div className="absolute -inset-[1px] rounded-lg border border-acid opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-300 shadow-[0_0_15px_rgba(212,255,0,0.1)]"></div>
                            </div>
                            
                            <div className="mt-4 flex flex-wrap justify-between items-center gap-4">
                                <p className="text-xs text-gray-600 font-mono flex items-center gap-2">
                                    <Activity className="w-3 h-3" />
                                    Minimum 10 characters for AI analysis
                                </p>
                                <button 
                                    type="button" 
                                    onClick={handleAIHelp}
                                    disabled={isAnalyzing || formData.message.length < 10}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs font-bold uppercase tracking-widest text-acid group/btn"
                                >
                                    {isAnalyzing ? (
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                    ) : (
                                        <Sparkles className="w-3 h-3 group-hover/btn:animate-pulse" />
                                    )}
                                    {isAnalyzing ? 'Analyzing Data...' : 'AI Architect Refine'}
                                </button>
                            </div>
                        </motion.div>

                        <div className="pt-8">
                            {formState === 'submitting' ? (
                                <div className="w-full h-16 bg-white/5 rounded overflow-hidden relative">
                                    <motion.div 
                                        className="h-full bg-acid"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 2, ease: "easeInOut" }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center text-black font-bold uppercase tracking-widest text-sm">
                                        Encrypting & Transmitting...
                                    </div>
                                </div>
                            ) : (
                                <button 
                                    type="submit" 
                                    className="group relative w-full md:w-auto px-12 py-6 bg-acid overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]"></div>
                                    <span className="relative z-10 flex items-center justify-center gap-4 text-black font-display font-black text-xl uppercase tracking-widest">
                                        Launch Request <Send className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                            )}
                        </div>
                    </motion.div>
                </form>
            </div>

            {/* AI Results Column */}
            <div className="lg:col-span-5 relative">
                 <AnimatePresence mode="wait">
                    {isAnalyzing ? (
                        <motion.div 
                            key="analyzing"
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            className="h-full min-h-[400px] border border-acid/20 bg-black/50 backdrop-blur-sm p-8 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden"
                        >
                            <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] opacity-10">
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className="border-r border-acid/50 h-full"></div>
                                ))}
                            </div>
                            
                            {/* Scanning Line */}
                            <motion.div 
                                className="absolute left-0 w-full h-1 bg-acid/50 shadow-[0_0_20px_#D4FF00] z-20"
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                            />

                            <div className="z-30 flex flex-col items-center">
                                <Cpu className="w-12 h-12 text-acid animate-pulse mb-6" />
                                <h3 className="text-acid font-mono font-bold uppercase text-lg mb-2">Neural Engine Active</h3>
                                <div className="font-mono text-xs text-gray-400 space-y-1 text-left w-64">
                                    <TypewriterText text="> Accessing node clusters..." speed={50} /> <br/>
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                                        
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ) : !aiAnalysis ? (
                        <motion.div 
                            key="empty"
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            className="h-full min-h-[400px] border border-white/5 bg-white/[0.02] p-8 rounded-2xl flex flex-col items-center justify-center text-center group transition-colors hover:border-white/10"
                        >
                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                <Terminal className="w-8 h-8 text-gray-500 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-gray-300 font-display font-bold uppercase text-2xl mb-2">Awaiting Data</h3>
                            <p className="text-gray-500 font-mono text-xs max-w-xs">
                                // Enter your project vision to activate the Neural Architect.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="results"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="border border-acid bg-black relative overflow-hidden shadow-[0_0_30px_rgba(212,255,0,0.1)] group"
                        >
                            {/* Decorative Header */}
                            <div className="bg-acid text-black p-3 flex justify-between items-center">
                                <div className="flex gap-2 items-center">
                                    <Terminal className="w-4 h-4" />
                                    <span className="font-mono text-xs font-bold uppercase tracking-widest">Analysis_Result_v2.json</span>
                                </div>
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-black animate-pulse"></div>
                                </div>
                            </div>

                            <div className="p-8 space-y-8 relative">
                                {/* Scanline effect */}
                                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(212,255,0,0.05)_50%)] bg-[length:100%_4px] opacity-50"></div>

                                <div>
                                    <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-3 flex items-center gap-2 tracking-widest">
                                        <span className="w-1 h-1 bg-acid"></span> 
                                        Refined Objective
                                    </h4>
                                    <p className="font-mono text-sm leading-relaxed text-acid border-l-2 border-acid/50 pl-4 py-1">
                                        <TypewriterText text={aiAnalysis.refinedBrief} speed={10} />
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-3 flex items-center gap-2 tracking-widest">
                                        <span className="w-1 h-1 bg-acid"></span> 
                                        Recommended Stack
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {aiAnalysis.suggestedStack.map((tech, i) => (
                                            <motion.span 
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                key={i} 
                                                className="font-mono text-xs border border-white/20 px-3 py-1 uppercase text-white hover:bg-white hover:text-black transition-colors cursor-default"
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-3 flex items-center gap-2 tracking-widest">
                                        <Clock className="w-3 h-3 text-acid" />
                                        Estimated Velocity
                                    </h4>
                                    <motion.p 
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="font-display font-bold text-3xl text-white"
                                    >
                                        {aiAnalysis.estimatedTimeline}
                                    </motion.p>
                                </div>
                            </div>
                            
                            <div className="bg-white/5 p-4 border-t border-white/10 flex justify-between items-center">
                                <p className="font-mono text-[10px] text-gray-500 uppercase">
                                    // Generated by Rockspace Neural Engine
                                </p>
                                <Cpu className="w-4 h-4 text-gray-600" />
                            </div>
                        </motion.div>
                    )}
                 </AnimatePresence>
            </div>
        </div>
      </div>
    </div>
  );
};