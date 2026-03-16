'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { LEVELS, QUESTS, QUEST_CATEGORIES } from '@/types/user-stats';

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.06, duration: 0.4 },
});

function LevelCard({ level, index }: { level: typeof LEVELS[0]; index: number }) {
  const isTop = level.level === 6;
  return (
    <motion.div
      {...fadeUp(index)}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`relative rounded-2xl border-2 p-6 ${level.bgColor} ${level.borderColor} overflow-hidden`}
    >
      {isTop && (
        <div className="absolute top-3 right-3">
          <span className="text-xs font-bold bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full">최고 등급</span>
        </div>
      )}
      <div className="text-4xl mb-3">{level.emoji}</div>
      <div className="flex items-baseline gap-2 mb-1">
        <span className={`text-xs font-bold ${level.color} opacity-60`}>LV.{level.level}</span>
        <h3 className={`text-base font-bold ${level.color}`}>{level.name}</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{level.description}</p>
      <div className="text-xs font-semibold text-muted-foreground mb-2">
        {level.maxXp ? `${level.minXp.toLocaleString()} – ${level.maxXp.toLocaleString()} XP` : `${level.minXp.toLocaleString()} XP 이상`}
      </div>
      <div className="space-y-1">
        {level.perks.map((perk) => (
          <div key={perk} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={`w-1.5 h-1.5 rounded-full ${level.color.replace('text', 'bg')}`} />
            {perk}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function RanksPage() {
  const byCategory = Object.entries(QUEST_CATEGORIES).map(([key, cat]) => ({
    key,
    ...cat,
    quests: QUESTS.filter((q) => q.category === key),
  }));

  return (
    <div className="max-w-4xl">
      {/* 히어로 */}
      <motion.div {...fadeUp(0)} className="mb-10">
        <div className="bg-gradient-to-br from-primary/10 via-orange-50 to-amber-50 border border-primary/20 rounded-3xl p-8 text-center relative overflow-hidden">
          <div className="absolute top-4 left-4 text-6xl opacity-10">🏆</div>
          <div className="absolute bottom-4 right-4 text-6xl opacity-10">🌱</div>
          <div className="relative">
            <span className="inline-block text-xs font-bold bg-primary text-white px-3 py-1 rounded-full mb-4">
              임장연구소 등급 시스템
            </span>
            <h1 className="text-3xl font-bold text-foreground mb-3">
              임장하고 성장하세요 🚀
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
              매물을 기록하고 퀘스트를 완료할수록 XP가 쌓이고 등급이 올라갑니다.
              <strong className="text-foreground"> 임장 마스터</strong>가 되는 그날까지!
            </p>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm">
              {[
                { label: '총 등급', value: '6단계' },
                { label: '퀘스트', value: `${QUESTS.length}개` },
                { label: '최대 XP', value: '13,250+' },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-xl font-bold text-primary">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* XP 획득 방법 */}
      <motion.section {...fadeUp(1)} className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-4">💡 XP 획득 방법</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: '📝', label: '임장로그 작성', xp: '+50 XP' },
            { icon: '📸', label: '사진 업로드', xp: '+10 XP' },
            { icon: '🎥', label: '동영상 업로드', xp: '+20 XP' },
            { icon: '💬', label: '댓글 작성', xp: '+5 XP' },
            { icon: '⚖️', label: '매수 결정', xp: '+30 XP 보너스' },
            { icon: '🗺️', label: '새 지역 임장', xp: '퀘스트 보너스' },
            { icon: '✅', label: '퀘스트 완료', xp: '30~1,000 XP' },
            { icon: '🏅', label: '연속 임장', xp: '보너스 XP' },
          ].map(({ icon, label, xp }) => (
            <div key={label} className="bg-card border border-border rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">{icon}</div>
              <p className="text-xs font-medium text-foreground mb-1">{label}</p>
              <p className="text-xs font-bold text-primary">{xp}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 등급 카드 */}
      <motion.section {...fadeUp(2)} className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-4">🎖️ 등급 목록</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LEVELS.map((level, i) => (
            <LevelCard key={level.level} level={level} index={i} />
          ))}
        </div>
      </motion.section>

      {/* 퀘스트 목록 */}
      <motion.section {...fadeUp(3)} className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-4">📋 전체 퀘스트 목록</h2>
        <div className="space-y-4">
          {byCategory.map(({ key, label, bg, color, quests }) => (
            <div key={key} className={`rounded-2xl border border-border overflow-hidden`}>
              <div className={`${bg} px-5 py-3 border-b border-border`}>
                <h3 className={`text-sm font-bold ${color}`}>{label}</h3>
              </div>
              <div className="divide-y divide-border">
                {quests.map((q) => (
                  <div key={q.id} className="flex items-center gap-4 px-5 py-4 bg-card hover:bg-muted/30 transition-colors">
                    <span className="text-2xl flex-shrink-0">{q.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{q.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{q.description}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <span className="text-sm font-bold text-primary">+{q.xp} XP</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.div {...fadeUp(4)} className="text-center bg-card border border-border rounded-3xl p-8">
        <p className="text-lg font-bold text-foreground mb-2">지금 바로 시작하세요!</p>
        <p className="text-sm text-muted-foreground mb-5">첫 임장로그를 작성하면 즉시 XP가 적립됩니다.</p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/dashboard/logs/new"
            className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
          >
            첫 임장로그 작성
          </Link>
          <Link
            href="/dashboard/quests"
            className="px-6 py-3 border border-border rounded-xl font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            내 퀘스트 보기
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
