'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { getUserStats, recalcAndSaveStats } from '@/lib/user-stats';
import {
  LEVELS, QUESTS, QUEST_CATEGORIES, getLevelFromXp, getXpForNextLevel,
} from '@/types/user-stats';
import type { UserStats } from '@/types/user-stats';

function XpBar({ percent }: { percent: number }) {
  return (
    <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full"
      />
    </div>
  );
}

function QuestItem({ quest, stats }: { quest: typeof QUESTS[0]; stats: UserStats }) {
  const completed = stats.completed_quests.includes(quest.id);
  const { current, target } = quest.progress(stats);
  const percent = Math.min(Math.round((current / target) * 100), 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
        completed
          ? 'bg-emerald-50 border-emerald-200'
          : 'bg-card border-border'
      }`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
        completed ? 'bg-emerald-100' : 'bg-muted'
      }`}>
        {completed ? '✅' : quest.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className={`text-sm font-semibold ${completed ? 'text-emerald-700 line-through opacity-70' : 'text-foreground'}`}>
            {quest.title}
          </p>
          {completed && <span className="text-xs text-emerald-600 font-medium">완료!</span>}
        </div>
        <p className="text-xs text-muted-foreground mb-2">{quest.description}</p>
        {!completed && (
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground flex-shrink-0">{current}/{target}</span>
          </div>
        )}
      </div>
      <div className="flex-shrink-0 text-right">
        <span className={`text-sm font-bold ${completed ? 'text-emerald-600' : 'text-primary'}`}>
          +{quest.xp} XP
        </span>
      </div>
    </motion.div>
  );
}

export default function QuestsPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [newQuests, setNewQuests] = useState<typeof QUESTS>([]);

  useEffect(() => {
    if (!user) return;
    recalcAndSaveStats(user.id).then((updated) => {
      if (!updated) { getUserStats(user.id).then(setStats); return; }
      const prev = stats;
      const prevCompleted = prev?.completed_quests ?? [];
      const justCompleted = QUESTS.filter(
        (q) => !prevCompleted.includes(q.id) && updated.completed_quests.includes(q.id)
      );
      if (justCompleted.length > 0) setNewQuests(justCompleted);
      setStats(updated);
      setLoading(false);
    });
  }, [user]);

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const level = getLevelFromXp(stats.xp);
  const nextLevel = LEVELS.find((l) => l.level === level.level + 1);
  const xpProgress = getXpForNextLevel(stats.xp);
  const completedCount = stats.completed_quests.length;
  const totalCount = QUESTS.length;

  const byCategory = Object.entries(QUEST_CATEGORIES).map(([key, cat]) => ({
    key,
    ...cat,
    quests: QUESTS.filter((q) => q.category === key),
  }));

  return (
    <div className="max-w-2xl">
      {/* 퀘스트 완료 토스트 */}
      <AnimatePresence>
        {newQuests.map((q) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3"
          >
            <span className="text-xl">{q.icon}</span>
            <div>
              <p className="text-xs font-bold">퀘스트 완료!</p>
              <p className="text-sm font-semibold">{q.title} +{q.xp} XP</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 내 등급 카드 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${level.bgColor} border-2 ${level.borderColor} rounded-3xl p-6 mb-6`}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className={`w-16 h-16 rounded-2xl ${level.bgColor} border-2 ${level.borderColor} flex items-center justify-center text-4xl`}>
            {level.emoji}
          </div>
          <div className="flex-1">
            <p className={`text-xs font-bold ${level.color} opacity-70`}>LV.{level.level}</p>
            <h1 className={`text-xl font-bold ${level.color}`}>{level.name}</h1>
            <p className="text-sm text-muted-foreground">{stats.xp.toLocaleString()} XP 보유</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">{completedCount}</p>
            <p className="text-xs text-muted-foreground">/{totalCount} 완료</p>
          </div>
        </div>

        {/* XP 게이지 */}
        {nextLevel ? (
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>다음 등급: {nextLevel.emoji} {nextLevel.name}</span>
              <span>{xpProgress.current.toLocaleString()} / {xpProgress.needed.toLocaleString()} XP</span>
            </div>
            <XpBar percent={xpProgress.percent} />
          </div>
        ) : (
          <div className="text-center py-2">
            <span className="text-sm font-bold text-yellow-600">🏆 최고 등급 달성!</span>
          </div>
        )}
      </motion.div>

      {/* 활동 통계 */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6"
      >
        {[
          { label: '임장로그', value: stats.total_logs, icon: '📝' },
          { label: '지역 수', value: stats.total_suburbs, icon: '🗺️' },
          { label: '미디어', value: stats.total_media, icon: '📸' },
          { label: '댓글', value: stats.total_comments, icon: '💬' },
          { label: '매수', value: stats.buy_decisions, icon: '💰' },
          { label: '총 XP', value: stats.xp, icon: '⚡' },
        ].map(({ label, value, icon }) => (
          <div key={label} className="bg-card border border-border rounded-2xl p-3 text-center">
            <div className="text-lg mb-1">{icon}</div>
            <p className="text-base font-bold text-foreground">{value.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </motion.div>

      {/* 퀘스트 목록 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-foreground">나의 퀘스트</h2>
        <Link href="/dashboard/ranks" className="text-xs text-primary hover:underline">
          등급 시스템 안내 →
        </Link>
      </div>

      <div className="space-y-4">
        {byCategory.map(({ key, label, bg, color, quests }) => {
          const done = quests.filter((q) => stats.completed_quests.includes(q.id)).length;
          return (
            <div key={key}>
              <div className={`flex items-center justify-between px-4 py-2.5 ${bg} rounded-t-2xl border border-border border-b-0`}>
                <h3 className={`text-sm font-bold ${color}`}>{label}</h3>
                <span className="text-xs text-muted-foreground">{done}/{quests.length}</span>
              </div>
              <div className="border border-border rounded-b-2xl overflow-hidden divide-y divide-border">
                {quests.map((q) => (
                  <QuestItem key={q.id} quest={q} stats={stats} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
