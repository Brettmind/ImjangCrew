'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { getDashboardStats, getRecentLogs } from '@/lib/inspection-logs';
import { recalcAndSaveStats } from '@/lib/user-stats';
import { getLevelFromXp, getXpForNextLevel } from '@/types/user-stats';
import { LogCard } from '@/components/dashboard/log-card';
import type { ImjangLog, DashboardStats } from '@/types/inspection-log';
import type { UserStats } from '@/types/user-stats';

const statItems = [
  { key: 'total' as const, label: '전체 임장', color: 'text-foreground', bg: 'bg-primary/10' },
  { key: 'buy' as const, label: '매수 결정', color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { key: 'watch' as const, label: '관망 중', color: 'text-amber-600', bg: 'bg-amber-100' },
  { key: 'pass' as const, label: '패스', color: 'text-red-500', bg: 'bg-red-100' },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [recentLogs, setRecentLogs] = useState<ImjangLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      getDashboardStats(),
      getRecentLogs(6),
      recalcAndSaveStats(user.id),
    ]).then(([statsRes, logsRes, us]) => {
      if (statsRes.data) setStats(statsRes.data);
      if (logsRes.data) setRecentLogs(logsRes.data);
      if (us) setUserStats(us);
      setLoading(false);
    });
  }, [user]);

  const displayName = user?.user_metadata?.full_name ?? user?.email?.split('@')[0] ?? '사용자';

  return (
    <div>
      {/* 인사말 */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          안녕하세요, <span className="text-primary">{displayName}</span>님 👋
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">오늘도 좋은 매물을 찾아보세요.</p>
      </motion.div>

      {/* 나의 등급 카드 */}
      {userStats && (() => {
        const level = getLevelFromXp(userStats.xp);
        const xpProgress = getXpForNextLevel(userStats.xp);
        const nextLevel = level.level < 6 ? level.level + 1 : null;
        const completedCount = userStats.completed_quests.length;
        return (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className={`${level.bgColor} border-2 ${level.borderColor} rounded-2xl p-5 mb-6 flex items-center gap-4`}
          >
            <div className="text-4xl">{level.emoji}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`text-xs font-bold ${level.color} opacity-70`}>LV.{level.level}</span>
                <span className={`text-sm font-bold ${level.color}`}>{level.name}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 bg-white/60 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${xpProgress.percent}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">{userStats.xp.toLocaleString()} XP</span>
              </div>
              <p className="text-xs text-muted-foreground">
                퀘스트 {completedCount}/15 완료
                {nextLevel && ` · 다음 레벨까지 ${(xpProgress.needed - xpProgress.current).toLocaleString()} XP`}
              </p>
            </div>
            <Link href="/dashboard/quests" className={`flex-shrink-0 text-xs font-semibold ${level.color} hover:underline`}>
              퀘스트 →
            </Link>
          </motion.div>
        );
      })()}

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statItems.map(({ key, label, color, bg }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -2 }}
            className="bg-card border border-border rounded-2xl p-5"
          >
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <span className={`text-lg font-bold ${color}`}>
                {loading ? '-' : stats?.[key] ?? 0}
              </span>
            </div>
            <p className="text-sm font-medium text-foreground">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* 최근 임장로그 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-foreground">최근 임장로그</h2>
        <Link href="/dashboard/logs" className="text-sm text-primary hover:underline font-medium">
          전체 보기 →
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-5 h-44 animate-pulse">
              <div className="h-3 bg-muted rounded w-16 mb-3" />
              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : recentLogs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center bg-card border border-border rounded-2xl py-16 text-center"
        >
          <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-foreground font-semibold mb-1">아직 임장로그가 없습니다</p>
          <p className="text-sm text-muted-foreground mb-5">첫 번째 임장 매물을 기록해보세요.</p>
          <Link
            href="/dashboard/logs/new"
            className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors"
          >
            첫 임장로그 작성
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentLogs.map((log, i) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <LogCard log={log} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
