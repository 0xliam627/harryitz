import React from 'react';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon, FacebookIcon, LeetCodeIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0a0c12]/80 backdrop-blur-md py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        {/* Signoff */}
        <div className="space-y-1">
          <p className="text-white font-mono text-sm font-semibold">
            {PERSONAL_INFO.name} <span className="text-zinc-500 font-normal">/ {PERSONAL_INFO.handle}</span>
          </p>
          <p className="text-xs text-zinc-500 font-mono">
            {PERSONAL_INFO.location}
          </p>
        </div>

        {/* Social Badges */}
        <div className="flex items-center gap-2">
          <a
            href={PERSONAL_INFO.socials.facebook.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook"
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <FacebookIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.socials.email.address}`}
            title="Email"
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href={`tel:${PERSONAL_INFO.socials.phone.number}`}
            title="Phone"
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Phone className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.socials.leetcode.url}
            target="_blank"
            rel="noopener noreferrer"
            title="LeetCode"
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#FFA116] hover:bg-white/10 transition-colors"
          >
            <LeetCodeIcon className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.team.url}
            target="_blank"
            rel="noopener noreferrer"
            title="2Tech Studio"
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors text-xs font-mono inline-flex items-center gap-1.5"
          >
            <span>@TwoTech</span>
            <ExternalLink className="w-3 h-3 text-zinc-500" />
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 gap-2">
        <p>© 2026 harryitz. All rights reserved.</p>
        <p className="text-zinc-600">Precision UI · Fast Execution · Zero Bloat</p>
      </div>
    </footer>
  );
};
