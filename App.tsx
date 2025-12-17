import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Portfolio } from './components/Portfolio';
import { Team } from './components/Team';
import { Footer } from './components/Footer';
import { Contact } from './components/Contact';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { AnimatePresence } from 'framer-motion';

const HomePage = () => (
  <>
    <Hero />
    <Services />
    <Portfolio />
    <Process />
    <Team />
  </>
);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
        <AnimatePresence mode="wait">
            {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
        </AnimatePresence>
        
        {!isLoading && (
            <Router>
            <div className="bg-rock-950 min-h-screen text-white font-sans selection:bg-accent selection:text-white cursor-none">
                <CustomCursor />
                <Navbar />
                <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<Contact />} />
                </Routes>
                <Footer />
            </div>
            </Router>
        )}
    </>
  );
};

export default App;