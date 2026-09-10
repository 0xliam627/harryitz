import React from 'react';
import {
  ExternalLink,
  GraduationCap,
  Users,
  Code2,
  Coffee,
  ArrowRight,
  Phone,
  Mail
} from 'lucide-react';
import { PERSONAL_INFO, SKILLS_LIST } from '../data/portfolioData';
import { FacebookIcon, GithubIcon, LeetCodeIcon } from './Icons';
import { LeetCodeCard } from './LeetCodeCard';

interface AboutSectionProps {
  onNavigateToProjects: () => void;
  onNavigateToWriting: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onNavigateToProjects,
  onNavigateToWriting
}) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-20 space-y-16">
      {/* Intro Header */}
      <section className="space-y-6">
        <div className="flex flex-col-reverse sm:flex-row items-start justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 font-medium">
              Full-Stack Developer & Freelancer
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
              Một lập trình viên trẻ đến từ Đắk Lắk, hiện đang học ngành Công nghệ thông tin tại Trường Đại học Công Thương TP. Hồ Chí Minh (HUIT). 
              Tôi tham gia phát triển sản phẩm tại{' '}
              <a
                href={PERSONAL_INFO.team.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-sky-300 underline underline-offset-4 decoration-zinc-600 inline-flex items-center gap-1 transition-colors"
              >
                {PERSONAL_INFO.team.name}
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              </a>.
            </p>
          </div>

          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shrink-0">
            <img
              src="./assets/nguyen-viet-hieu.jpg"
              alt={PERSONAL_INFO.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = './avatar.jpg';
              }}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onNavigateToProjects}
            className="px-4 py-2 rounded-lg bg-white text-black font-medium text-xs sm:text-sm inline-flex items-center gap-2 hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <span>Xem các dự án</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onNavigateToWriting}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 font-medium text-xs sm:text-sm hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            Đọc bài viết chia sẻ
          </button>
        </div>
      </section>

      {/* Overview Details */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500">
          Thông tin cơ bản
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Education */}
          <div className="p-4 rounded-xl tech-card space-y-1">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <GraduationCap className="w-4 h-4 text-zinc-400" />
              <span>Học vấn</span>
            </div>
            <p className="text-sm font-semibold text-white">
              {PERSONAL_INFO.education.school}
            </p>
            <p className="text-xs text-zinc-400">
              {PERSONAL_INFO.education.major}
            </p>
          </div>

          {/* Team */}
          <div className="p-4 rounded-xl tech-card space-y-1">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Users className="w-4 h-4 text-zinc-400" />
              <span>Đội ngũ</span>
            </div>
            <p className="text-sm font-semibold text-white">
              {PERSONAL_INFO.team.name}
            </p>
            <p className="text-xs text-zinc-400">
              <a
                href={PERSONAL_INFO.team.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-zinc-300 inline-flex items-center gap-1"
              >
                {PERSONAL_INFO.team.label}
                <ExternalLink className="w-3 h-3 text-zinc-500" />
              </a>
            </p>
          </div>

          {/* Focus */}
          <div className="p-4 rounded-xl tech-card space-y-1">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Code2 className="w-4 h-4 text-zinc-400" />
              <span>Trọng tâm</span>
            </div>
            <p className="text-sm font-semibold text-white">
              Clean APIs · Practical UI · Fast Debugging
            </p>
            <p className="text-xs text-zinc-400">
              API tinh gọn, giao diện thực dụng và khoanh vùng lỗi nhanh.
            </p>
          </div>

          {/* Offline Mode */}
          <div className="p-4 rounded-xl tech-card space-y-1">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Coffee className="w-4 h-4 text-zinc-400" />
              <span>Ngoài giờ làm việc</span>
            </div>
            <p className="text-sm font-semibold text-white">
              Reading · Gaming · Sleeping · Cats 🐱
            </p>
            <p className="text-xs text-zinc-400">
              Đọc sách, chơi game sandbox, ngủ và nuôi mèo.
            </p>
          </div>
        </div>
      </section>

      {/* LeetCode Problem Solving (Live Auto-Update) */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500">
          Kỹ năng giải thuật & Thuật toán
        </h2>
        <LeetCodeCard />
      </section>

      {/* Personal Story */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500">
          Câu chuyện khởi đầu
        </h2>

        <div className="p-6 rounded-xl tech-card space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
          <p>
            Tôi sinh năm 2008 và lớn lên tại Đắk Lắk trong một gia đình làm nông. Khởi đầu của tôi gắn liền với chiếc điện thoại Samsung Galaxy J2 Prime của mẹ.
          </p>
          <p>
            Hồi tiểu học, sự tò mò muốn tự tạo một máy chủ Minecraft cho bạn bè đã đưa tôi đến với PocketMine-MP. Từ chỗ copy-paste những đoạn code chẳng hiểu gì và nhờ các anh chị trên mạng trợ giúp, tôi dần nhận ra ý nghĩa của từng dòng lệnh và đam mê lập trình từ đó.
          </p>
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <blockquote className="italic text-xs sm:text-sm text-zinc-400">
              “{PERSONAL_INFO.quote}”
            </blockquote>
            <button
              onClick={onNavigateToWriting}
              className="text-xs text-zinc-300 hover:text-white inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Đọc bài viết</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500">
          Công nghệ thường dùng
        </h2>

        <div className="flex flex-wrap gap-2">
          {SKILLS_LIST.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1.5 rounded-lg tech-card text-xs text-zinc-300 font-mono"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      {/* Social & Contact */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500">
          Liên hệ & Mạng xã hội
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <a
            href={PERSONAL_INFO.socials.facebook.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl tech-card flex items-center justify-between group"
          >
            <div>
              <span className="text-xs text-zinc-500 block">Facebook</span>
              <span className="text-sm font-medium text-white group-hover:underline">harryitz.fb</span>
            </div>
            <FacebookIcon className="w-4 h-4 text-zinc-400 shrink-0" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.socials.email.address}`}
            className="p-4 rounded-xl tech-card flex items-center justify-between group"
          >
            <div className="overflow-hidden">
              <span className="text-xs text-zinc-500 block">Email</span>
              <span className="text-sm font-medium text-white truncate block group-hover:underline">
                harryitz@duck.com
              </span>
            </div>
            <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
          </a>

          <a
            href={`tel:${PERSONAL_INFO.socials.phone.number}`}
            className="p-4 rounded-xl tech-card flex items-center justify-between group"
          >
            <div>
              <span className="text-xs text-zinc-500 block">Điện thoại</span>
              <span className="text-sm font-medium text-white font-mono group-hover:underline">
                {PERSONAL_INFO.socials.phone.display}
              </span>
            </div>
            <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
          </a>

          <a
            href={PERSONAL_INFO.socials.leetcode.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl tech-card flex items-center justify-between group"
          >
            <div>
              <span className="text-xs text-zinc-500 block">LeetCode</span>
              <span className="text-sm font-medium text-[#FFA116] group-hover:underline font-mono">
                harryitz
              </span>
            </div>
            <LeetCodeIcon className="w-4 h-4 text-[#FFA116] shrink-0" />
          </a>
        </div>
      </section>
    </div>
  );
};
