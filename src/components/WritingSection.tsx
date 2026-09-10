import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Share2,
  Check
} from 'lucide-react';
import { ARTICLES, PERSONAL_INFO } from '../data/portfolioData';
import { ArticleItem } from '../types';

export const WritingSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Sync article selection with URL hash for deep-linking
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('writing-')) {
        const id = hash.replace('writing-', '');
        const found = ARTICLES.find((a) => a.id === id);
        if (found) {
          setSelectedArticle(found);
          return;
        }
      } else if (hash === 'writing') {
        setSelectedArticle(null);
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  // Scroll progress for reading mode
  useEffect(() => {
    if (!selectedArticle) return;

    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setReadingProgress((window.scrollY / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, [selectedArticle]);

  const handleSelectArticle = (article: ArticleItem) => {
    setSelectedArticle(article);
    window.location.hash = `writing-${article.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
    window.location.hash = 'writing';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = (e: React.MouseEvent, article: ArticleItem) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}${window.location.pathname}#writing-${article.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => {
      setCopiedLink(false);
    }, 2000);
  };

  // Article Reading Mode
  if (selectedArticle) {
    return (
      <div className="pt-24 sm:pt-32 pb-24 max-w-2xl mx-auto px-4 sm:px-6">
        {/* Reading Progress Indicator */}
        <div
          className="fixed top-0 left-0 h-[2px] bg-sky-400 z-50 transition-all duration-75"
          style={{ width: `${readingProgress}%` }}
        />

        {/* Navigation & Actions */}
        <div className="flex items-center justify-between py-4 border-b border-white/10 mb-8">
          <button
            onClick={handleBackToList}
            className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Trở về danh sách bài viết</span>
          </button>

          <button
            onClick={(e) => handleShare(e, selectedArticle)}
            className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Đã chép link</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Chia sẻ</span>
              </>
            )}
          </button>
        </div>

        {/* Article Meta Header */}
        <header className="space-y-4 mb-10">
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300">
              {selectedArticle.tag}
            </span>
            <span>{selectedArticle.date}</span>
            <span>•</span>
            <span>{selectedArticle.readTime}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
            {selectedArticle.title}
          </h1>

          <p className="text-base text-zinc-300 italic leading-relaxed border-l-2 border-zinc-600 pl-4 py-1 font-light">
            {selectedArticle.dek}
          </p>

          <div className="flex items-center gap-3 pt-4 border-t border-white/10 text-xs text-zinc-400">
            <span>Viết bởi: {PERSONAL_INFO.name}</span>
            <span>·</span>
            <span>Đắk Lắk</span>
          </div>
        </header>

        {/* Article Content */}
        <div className="space-y-6 text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
          {selectedArticle.content.map((paragraph, index) => {
            if (index === 0) {
              return (
                <p
                  key={index}
                  className="first-letter:text-4xl first-letter:font-bold first-letter:text-white first-letter:mr-2 first-letter:float-left first-letter:leading-none"
                >
                  {paragraph}
                </p>
              );
            }
            return <p key={index}>{paragraph}</p>;
          })}

          {selectedArticle.quote && (
            <div className="my-8 p-5 rounded-xl tech-card border-l-2 border-white/40">
              <blockquote className="text-base font-medium text-white italic">
                “{selectedArticle.quote}”
              </blockquote>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-14 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 font-mono">
          <button
            onClick={handleBackToList}
            className="hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại</span>
          </button>
          <span>harryitz.me</span>
        </div>
      </div>
    );
  }

  // Articles List Mode
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-20 space-y-8">
      {/* Header */}
      <div className="space-y-2 border-b border-white/10 pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Góc chia sẻ & Trải nghiệm
        </h1>
        <p className="text-sm text-zinc-400 font-light max-w-xl">
          Nơi tôi ghi lại những câu chuyện tự học, những điều học được trong cuộc sống và hành trình theo đuổi công nghệ.
        </p>
      </div>

      {/* Article List Items */}
      <div className="divide-y divide-white/10">
        {ARTICLES.map((article) => (
          <article
            key={article.id}
            onClick={() => handleSelectArticle(article)}
            className="py-6 first:pt-0 last:pb-0 cursor-pointer group space-y-2 transition-colors"
          >
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <span className="text-zinc-400">{article.tag}</span>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

            <h2 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors flex items-center justify-between">
              <span>{article.title}</span>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-sky-300 group-hover:translate-x-1 transition-all shrink-0" />
            </h2>

            <p className="text-sm text-zinc-400 leading-relaxed font-light line-clamp-2">
              {article.dek}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};
