import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  ExternalLink,
  Table as TableIcon,
  LayoutGrid,
  X,
  ArrowUpRight
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { GithubIcon } from './Icons';

export const ProjectsSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const handleDownload = (e: React.MouseEvent, project: ProjectItem) => {
    e.stopPropagation();
    const url = project.downloadUrl || project.githubUrl || project.liveUrl;
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 sm:pt-32 pb-20 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between border-b border-white/10 pb-5">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Dự án của tôi
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-xl">
            Các sản phẩm chính tôi đã phát triển và tham gia đóng góp.
          </p>
        </div>

        {/* View Switch - Hidden on very small screens, visible on tablet+ */}
        <div className="hidden sm:flex items-center p-1 rounded-lg bg-white/5 border border-white/10 shrink-0">
          <button
            onClick={() => setViewMode('table')}
            title="Dạng bảng"
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              viewMode === 'table' ? 'bg-white/20 text-white' : 'text-zinc-500 hover:text-white'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            title="Dạng thẻ"
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-zinc-500 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile Card List (Always responsive & finger-friendly on mobile) */}
      <div className="block sm:hidden space-y-4">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="p-4 rounded-xl tech-card space-y-3 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-mono">{project.category}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5">
                {project.status}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors flex items-center justify-between">
                <span>{project.title}</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-sky-300 transition-colors" />
              </h3>
              <p className="text-xs text-zinc-300 font-medium mt-0.5">{project.tagline}</p>
              <p className="text-xs text-zinc-400 leading-relaxed font-light mt-1.5 line-clamp-2">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1 pt-1">
              {project.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Mobile Actions: Touch targets */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
              <button
                onClick={(e) => handleDownload(e, project)}
                className="flex-1 py-2 px-3 rounded-lg bg-white text-black font-medium text-xs font-mono flex items-center justify-center gap-1.5 hover:bg-zinc-200 transition-colors cursor-pointer active:scale-95"
              >
                <Download className="w-3.5 h-3.5 shrink-0" />
                <span>Tải về</span>
              </button>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white transition-colors shrink-0 flex items-center justify-center min-w-[36px] min-h-[36px]"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white transition-colors shrink-0 flex items-center justify-center min-w-[36px] min-h-[36px]"
                  title="Trực tiếp"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop / Tablet View (Table or Grid) */}
      <div className="hidden sm:block">
        {viewMode === 'table' ? (
          <div className="tech-card rounded-2xl overflow-hidden border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="text-xs uppercase tracking-wider text-zinc-500 bg-white/[0.02] border-b border-white/10">
                  <tr>
                    <th className="py-3 px-5 font-normal">Dự án</th>
                    <th className="py-3 px-5 font-normal">Phân loại</th>
                    <th className="py-3 px-5 font-normal">Công nghệ</th>
                    <th className="py-3 px-5 font-normal text-right whitespace-nowrap min-w-[140px]">Tác vụ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-light">
                  {PROJECTS.map((project) => (
                    <tr
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-5">
                        <div className="font-semibold text-white group-hover:text-sky-300 transition-colors">
                          {project.title}
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">{project.tagline}</p>
                      </td>
                      <td className="py-4 px-5 whitespace-nowrap">
                        <span className="text-xs text-zinc-400">
                          {project.category}
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5 whitespace-nowrap">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={(e) => handleDownload(e, project)}
                            title="Tải về bản phát hành"
                            className="whitespace-nowrap shrink-0 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-200 hover:text-white text-xs font-medium border border-white/10 transition-colors cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5 shrink-0" />
                            <span>Tải về</span>
                          </button>

                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              title="Mã nguồn GitHub"
                              className="shrink-0 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors"
                            >
                              <GithubIcon className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              title="Website trực tiếp"
                              className="shrink-0 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="p-5 rounded-xl tech-card flex flex-col justify-between space-y-5 cursor-pointer group"
              >
                <div>
                  <span className="text-xs text-zinc-500 block mb-2">{project.category}</span>
                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-sky-300 transition-colors" />
                  </h3>
                  <p className="text-xs text-zinc-300 font-medium mt-1 mb-2">{project.tagline}</p>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1 mb-4 pt-3 border-t border-white/5">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleDownload(e, project)}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-white text-black font-medium text-xs flex items-center justify-center gap-1.5 hover:bg-zinc-200 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <Download className="w-3.5 h-3.5 shrink-0" />
                      <span>Tải về</span>
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                        title="GitHub"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                        title="Trực tiếp"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal (Optimized for Mobile viewports) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 20 }}
              className="bg-[#12141c] rounded-t-2xl sm:rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 border border-white/15 relative shadow-2xl space-y-4 sm:space-y-5"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="pr-8">
                <span className="text-xs text-zinc-500 block mb-1">{selectedProject.category}</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">{selectedProject.title}</h2>
                <p className="text-xs text-zinc-300 font-medium mt-1">{selectedProject.tagline}</p>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-zinc-400 block">Mô tả</span>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                  {selectedProject.fullStory || selectedProject.description}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-zinc-400 block">Tính năng chính</span>
                <div className="space-y-1">
                  {selectedProject.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300 font-light">
                      <span className="text-zinc-500 mt-0.5">•</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-zinc-400 block">Công nghệ</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal footer */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-end gap-2">
                <button
                  onClick={(e) => handleDownload(e, selectedProject)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg bg-white text-black font-medium text-xs flex items-center justify-center gap-1.5 hover:bg-zinc-200 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5 shrink-0" />
                  <span>Tải bản phát hành</span>
                </button>

                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-xs inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap border border-white/10"
                  >
                    <GithubIcon className="w-3.5 h-3.5 shrink-0" />
                    <span>Mã nguồn</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
