import React, { useState, useEffect } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';
import { LeetCodeIcon } from './Icons';
import { LEETCODE_STATS } from '../data/portfolioData';

interface LeetCodeData {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  loading: boolean;
  lastUpdated?: string;
}

export const LeetCodeCard: React.FC = () => {
  const [stats, setStats] = useState<LeetCodeData>({
    totalSolved: LEETCODE_STATS.totalSolved,
    easy: LEETCODE_STATS.easy,
    medium: LEETCODE_STATS.medium,
    hard: LEETCODE_STATS.hard,
    loading: false
  });

  useEffect(() => {
    let isMounted = true;

    const fetchLiveStats = async () => {
      // Check cache in localStorage (10 minutes TTL)
      const cached = localStorage.getItem('leetcode_stats_cache');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < 10 * 60 * 1000) {
            setStats({
              totalSolved: parsed.totalSolved,
              easy: parsed.easy,
              medium: parsed.medium,
              hard: parsed.hard,
              loading: false,
              lastUpdated: parsed.lastUpdated
            });
            return;
          }
        } catch {
          // Ignore cache parse error
        }
      }

      setStats((prev) => ({ ...prev, loading: true }));

      try {
        const res = await fetch('https://alfa-leetcode-api.onrender.com/harryitz/solved');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();

        if (isMounted && typeof data.solvedProblem === 'number') {
          const newStats = {
            totalSolved: data.solvedProblem,
            easy: data.easySolved ?? 0,
            medium: data.mediumSolved ?? 0,
            hard: data.hardSolved ?? 0,
            loading: false,
            lastUpdated: 'Vừa cập nhật'
          };
          setStats(newStats);

          localStorage.setItem(
            'leetcode_stats_cache',
            JSON.stringify({
              ...newStats,
              timestamp: Date.now()
            })
          );
        }
      } catch (err) {
        // Silently fallback to static stats on network failure
        if (isMounted) {
          setStats((prev) => ({ ...prev, loading: false }));
        }
      }
    };

    fetchLiveStats();

    return () => {
      isMounted = false;
    };
  }, []);

  const total = Math.max(stats.totalSolved, 1);
  const easyPct = (stats.easy / total) * 100;
  const mediumPct = (stats.medium / total) * 100;
  const hardPct = (stats.hard / total) * 100;

  return (
    <div className="p-5 rounded-2xl tech-card space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#FFA116]/10 text-[#FFA116] border border-[#FFA116]/20">
            <LeetCodeIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-white">LeetCode</span>
              <span className="text-xs font-mono text-zinc-500">@{LEETCODE_STATS.username}</span>
            </div>
            <p className="text-[11px] text-zinc-500 font-mono">
              {stats.loading ? 'Đang đồng bộ live...' : (stats.lastUpdated ? 'Tự động cập nhật trực tiếp' : 'Tự động đồng bộ live')}
            </p>
          </div>
        </div>

        <a
          href={LEETCODE_STATS.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Mở hồ sơ LeetCode"
          className="text-xs font-mono text-zinc-400 hover:text-white inline-flex items-center gap-1 transition-colors px-2 py-1 rounded bg-white/5 hover:bg-white/10"
        >
          <span>Hồ sơ</span>
          <ExternalLink className="w-3 h-3 text-zinc-500" />
        </a>
      </div>

      {/* Main Metric Numbers */}
      <div className="grid grid-cols-4 gap-2 pt-1 border-t border-white/5 text-center">
        {/* Total */}
        <div className="p-2 rounded-xl bg-white/[0.02]">
          <span className="text-[10px] font-mono text-zinc-500 block uppercase">ĐÃ GIẢI</span>
          <span className="text-lg font-mono font-bold text-white">
            {stats.totalSolved}
          </span>
        </div>

        {/* Easy */}
        <div className="p-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
          <span className="text-[10px] font-mono text-emerald-400/80 block uppercase">EASY</span>
          <span className="text-lg font-mono font-bold text-emerald-400">
            {stats.easy}
          </span>
        </div>

        {/* Medium */}
        <div className="p-2 rounded-xl bg-amber-500/5 border border-amber-500/10">
          <span className="text-[10px] font-mono text-amber-400/80 block uppercase">MED</span>
          <span className="text-lg font-mono font-bold text-amber-400">
            {stats.medium}
          </span>
        </div>

        {/* Hard */}
        <div className="p-2 rounded-xl bg-rose-500/5 border border-rose-500/10">
          <span className="text-[10px] font-mono text-rose-400/80 block uppercase">HARD</span>
          <span className="text-lg font-mono font-bold text-rose-400">
            {stats.hard}
          </span>
        </div>
      </div>

      {/* Segmented Progress Bar */}
      <div className="space-y-1.5">
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex gap-0.5">
          <div
            style={{ width: `${easyPct}%` }}
            className="h-full bg-emerald-400 rounded-full transition-all duration-500"
            title={`Easy: ${stats.easy}`}
          />
          <div
            style={{ width: `${mediumPct}%` }}
            className="h-full bg-amber-400 rounded-full transition-all duration-500"
            title={`Medium: ${stats.medium}`}
          />
          <div
            style={{ width: `${hardPct}%` }}
            className="h-full bg-rose-400 rounded-full transition-all duration-500"
            title={`Hard: ${stats.hard}`}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <span>Tiến độ phân bổ</span>
          <span>{stats.easy} Easy · {stats.medium} Medium</span>
        </div>
      </div>
    </div>
  );
};
