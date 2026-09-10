import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThreeCanvas } from './components/ThreeCanvas';
import { Navbar } from './components/Navbar';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { WritingSection } from './components/WritingSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'about' | 'projects' | 'writing'>('about');

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'projects') setActiveTab('projects');
      else if (hash === 'writing' || hash.startsWith('writing-')) setActiveTab('writing');
      else if (hash === 'about') setActiveTab('about');
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleTabChange = (tab: 'about' | 'projects' | 'writing') => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 relative selection:bg-sky-500 selection:text-white">
      {/* 3D Interactive Topology via Three.js */}
      <ThreeCanvas />

      {/* Floating Precision Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Main View Area */}
      <main id="main" className="relative z-10 min-h-[calc(100vh-220px)]">
        <AnimatePresence mode="wait">
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <AboutSection
                onNavigateToProjects={() => handleTabChange('projects')}
                onNavigateToWriting={() => handleTabChange('writing')}
              />
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <ProjectsSection />
            </motion.div>
          )}

          {activeTab === 'writing' && (
            <motion.div
              key="writing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <WritingSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
