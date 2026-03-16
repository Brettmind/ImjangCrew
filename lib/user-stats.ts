import { supabase } from './supabase';
import { QUESTS, getLevelFromXp } from '@/types/user-stats';
import type { UserStats } from '@/types/user-stats';

export async function getUserStats(userId: string): Promise<UserStats | null> {
  const { data } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single();
  return data as UserStats | null;
}

/** 실제 데이터에서 통계를 재계산하고 저장 */
export async function recalcAndSaveStats(userId: string): Promise<UserStats | null> {
  const [logsRes, mediaRes, commentsRes] = await Promise.all([
    supabase.from('imjang_logs').select('suburb, decision').eq('user_id', userId),
    supabase.from('imjang_media').select('id').eq('user_id', userId),
    supabase.from('comments').select('id').eq('user_id', userId),
  ]);

  const logs = logsRes.data ?? [];
  const suburbs = new Set(logs.map((l: { suburb: string }) => l.suburb?.toLowerCase().trim()).filter(Boolean));

  const base = {
    user_id: userId,
    total_logs: logs.length,
    total_suburbs: suburbs.size,
    total_media: (mediaRes.data ?? []).length,
    total_comments: (commentsRes.data ?? []).length,
    buy_decisions: logs.filter((l: { decision: string }) => l.decision === 'buy').length,
    watch_decisions: logs.filter((l: { decision: string }) => l.decision === 'watch').length,
    pass_decisions: logs.filter((l: { decision: string }) => l.decision === 'pass').length,
  };

  // 기존 stats 불러오기 (XP, completed_quests 유지)
  const existing = await getUserStats(userId);
  const prevCompleted = existing?.completed_quests ?? [];
  const prevXp = existing?.xp ?? 0;

  // 새로 완료된 퀘스트 계산
  const tempStats = { ...base, xp: prevXp, level: 1, completed_quests: prevCompleted, updated_at: '' } as UserStats;
  const newCompleted = QUESTS.filter(
    (q) => !prevCompleted.includes(q.id) && q.check(tempStats)
  );
  const gainedXp = newCompleted.reduce((sum, q) => sum + q.xp, 0);

  const totalXp = prevXp + gainedXp;
  const allCompleted = [...prevCompleted, ...newCompleted.map((q) => q.id)];
  const level = getLevelFromXp(totalXp).level;

  const stats: Omit<UserStats, 'updated_at'> = {
    ...base,
    xp: totalXp,
    level,
    completed_quests: allCompleted,
  };

  const { data } = await supabase
    .from('user_stats')
    .upsert({ ...stats, updated_at: new Date().toISOString() })
    .select()
    .single();

  return data as UserStats | null;
}

/** 퀘스트 완료 알림용 - 새로 완료된 퀘스트 반환 */
export async function checkNewQuests(userId: string, stats: UserStats) {
  const prev = stats.completed_quests ?? [];
  return QUESTS.filter((q) => !prev.includes(q.id) && q.check(stats));
}
