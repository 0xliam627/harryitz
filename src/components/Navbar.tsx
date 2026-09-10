import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon } from './Icons';

interface NavbarProps {
  activeTab: 'about' | 'projects' | 'writing';
  setActiveTab: (tab: 'about' | 'projects' | 'writing') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(PERSONAL_INFO.socials.email.address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const navItems = [
    { id: 'about', label: 'Giới thiệu', mobileLabel: 'Hồ sơ' },
    { id: 'projects', label: 'Dự án', mobileLabel: 'Dự án' },
    { id: 'writing', label: 'Góc chia sẻ', mobileLabel: 'Bài viết' },
  ] as const;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 pt-3 sm:pt-6 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between gap-1 sm:gap-4 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#12141c]/95 backdrop-blur-md border border-white/10 shadow-lg max-w-2xl w-full">
        {/* Brand */}
        <button
          onClick={() => setActiveTab('about')}
          className="text-xs sm:text-sm font-semibold tracking-tight text-white hover:text-sky-400 transition-colors cursor-pointer px-1.5 py-1"
        >
          harryitz<span className="text-zinc-500 font-normal hidden xs:inline">.me</span>
        </button>

        {/* Tab Items */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors cursor-pointer ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbarIndicator"
                    className="absolute inset-0 rounded-full bg-white/10 border border-white/10"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10 hidden sm:inline">{item.label}</span>
                <span className="relative z-10 sm:hidden">{item.mobileLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Contact & GitHub */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            onClick={handleCopyEmail}
            title="Sao chép Email"
            className="flex items-center justify-center w-7 h-7 sm:w-auto sm:px-3 sm:py-1.5 rounded-full text-xs font-medium text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 hidden sm:inline ml-1">Đã chép</span>
              </>
            ) : (
              <>
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                <span className="hidden sm:inline ml-1">Email</span>
              </>
            )}
          </button>

          <a
            href={PERSONAL_INFO.socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="flex items-center justify-center w-7 h-7 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>
    </header>
  );
};
