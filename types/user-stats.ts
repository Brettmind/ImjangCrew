export interface UserStats {
  user_id: string;
  level: number;
  xp: number;
  total_logs: number;
  total_suburbs: number;
  total_media: number;
  total_comments: number;
  buy_decisions: number;
  watch_decisions: number;
  pass_decisions: number;
  completed_quests: string[];
  updated_at: string;
}

export interface Level {
  level: number;
  name: string;
  emoji: string;
  minXp: number;
  maxXp: number | null;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  perks: string[];
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: 'beginner' | 'explorer' | 'analyst' | 'expert' | 'master';
  xp: number;
  icon: string;
  check: (stats: UserStats) => boolean;
  progress: (stats: UserStats) => { current: number; target: number };
}

export const LEVELS: Level[] = [
  {
    level: 1,
    name: '새내기 임장러',
    emoji: '🌱',
    minXp: 0,
    maxXp: 150,
    color: 'text-slate-600',
    bgColor: 'bg-slate-100',
    borderColor: 'border-slate-300',
    description: '임장의 세계에 첫 발을 내딛은 초보자',
    perks: ['임장로그 작성', '매물 목록 조회'],
  },
  {
    level: 2,
    name: '임장 입문자',
    emoji: '🏃',
    minXp: 150,
    maxXp: 500,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    description: '기초를 다지며 임장 습관을 기르는 단계',
    perks: ['댓글 기능 해금', '임장 통계 조회'],
  },
  {
    level: 3,
    name: '임장 탐험가',
    emoji: '🔍',
    minXp: 500,
    maxXp: 1500,
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-300',
    description: '다양한 지역을 탐험하며 시야를 넓히는 단계',
    perks: ['지역 히트맵 조회', '임장 일정 관리'],
  },
  {
    level: 4,
    name: '임장 분석가',
    emoji: '📊',
    minXp: 1500,
    maxXp: 4000,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-300',
    description: '데이터를 기반으로 매물을 분석하는 전문가',
    perks: ['프로필 분석가 뱃지', '고급 필터 사용'],
  },
  {
    level: 5,
    name: '임장 전문가',
    emoji: '🎯',
    minXp: 4000,
    maxXp: 10000,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-300',
    description: '임장의 모든 영역을 섭렵한 고수',
    perks: ['전문가 뱃지 표시', '커뮤니티 추천 권한'],
  },
  {
    level: 6,
    name: '임장 마스터',
    emoji: '🏆',
    minXp: 10000,
    maxXp: null,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-400',
    description: '임장연구소의 최고 등급. 진정한 부동산 전문가',
    perks: ['마스터 크라운 뱃지', '명예의 전당 등재', '모든 기능 해금'],
  },
];

export const QUEST_CATEGORIES = {
  beginner: { label: '🌱 입문 퀘스트', color: 'text-slate-600', bg: 'bg-slate-50' },
  explorer: { label: '🔍 탐험 퀘스트', color: 'text-sky-600', bg: 'bg-sky-50' },
  analyst: { label: '📊 분석 퀘스트', color: 'text-violet-600', bg: 'bg-violet-50' },
  expert: { label: '🎯 전문가 퀘스트', color: 'text-orange-500', bg: 'bg-orange-50' },
  master: { label: '🏆 마스터 퀘스트', color: 'text-yellow-600', bg: 'bg-yellow-50' },
};

export const QUESTS: Quest[] = [
  // 입문
  {
    id: 'first_log',
    title: '첫 발걸음',
    description: '첫 번째 임장로그를 작성하세요',
    category: 'beginner',
    xp: 50,
    icon: '📝',
    check: (s) => s.total_logs >= 1,
    progress: (s) => ({ current: Math.min(s.total_logs, 1), target: 1 }),
  },
  {
    id: 'first_photo',
    title: '눈으로 보는 임장',
    description: '임장 사진을 처음으로 업로드하세요',
    category: 'beginner',
    xp: 30,
    icon: '📸',
    check: (s) => s.total_media >= 1,
    progress: (s) => ({ current: Math.min(s.total_media, 1), target: 1 }),
  },
  {
    id: 'first_comment',
    title: '커뮤니티 참여',
    description: '임장로그에 첫 댓글을 작성하세요',
    category: 'beginner',
    xp: 20,
    icon: '💬',
    check: (s) => s.total_comments >= 1,
    progress: (s) => ({ current: Math.min(s.total_comments, 1), target: 1 }),
  },
  {
    id: 'first_decision',
    title: '결정의 시작',
    description: '임장 후 첫 최종 결정(매수/관망/패스)을 내리세요',
    category: 'beginner',
    xp: 40,
    icon: '⚖️',
    check: (s) => s.buy_decisions + s.watch_decisions + s.pass_decisions >= 1,
    progress: (s) => ({ current: Math.min(s.buy_decisions + s.watch_decisions + s.pass_decisions, 1), target: 1 }),
  },
  // 탐험
  {
    id: 'logs_5',
    title: '5회 임장 달성',
    description: '임장로그를 5개 작성하세요',
    category: 'explorer',
    xp: 100,
    icon: '🗓️',
    check: (s) => s.total_logs >= 5,
    progress: (s) => ({ current: s.total_logs, target: 5 }),
  },
  {
    id: 'suburbs_3',
    title: '동네 탐험가',
    description: '3개 이상의 다른 Suburb를 임장하세요',
    category: 'explorer',
    xp: 80,
    icon: '🗺️',
    check: (s) => s.total_suburbs >= 3,
    progress: (s) => ({ current: s.total_suburbs, target: 3 }),
  },
  {
    id: 'media_5',
    title: '포토 저널리스트',
    description: '사진/동영상을 5개 이상 업로드하세요',
    category: 'explorer',
    xp: 60,
    icon: '🎥',
    check: (s) => s.total_media >= 5,
    progress: (s) => ({ current: s.total_media, target: 5 }),
  },
  // 분석
  {
    id: 'logs_10',
    title: '10회 임장 달성',
    description: '임장로그를 10개 작성하세요',
    category: 'analyst',
    xp: 200,
    icon: '🏅',
    check: (s) => s.total_logs >= 10,
    progress: (s) => ({ current: s.total_logs, target: 10 }),
  },
  {
    id: 'suburbs_5',
    title: 'Brisbane 탐험가',
    description: '5개 이상의 다른 Suburb를 임장하세요',
    category: 'analyst',
    xp: 150,
    icon: '🏙️',
    check: (s) => s.total_suburbs >= 5,
    progress: (s) => ({ current: s.total_suburbs, target: 5 }),
  },
  {
    id: 'comments_10',
    title: '활발한 참여자',
    description: '댓글을 10개 이상 작성하세요',
    category: 'analyst',
    xp: 80,
    icon: '🗣️',
    check: (s) => s.total_comments >= 10,
    progress: (s) => ({ current: s.total_comments, target: 10 }),
  },
  {
    id: 'all_decisions',
    title: '다양한 시각',
    description: '매수, 관망, 패스 결정을 각 1회 이상 내리세요',
    category: 'analyst',
    xp: 150,
    icon: '🎯',
    check: (s) => s.buy_decisions >= 1 && s.watch_decisions >= 1 && s.pass_decisions >= 1,
    progress: (s) => ({
      current: (s.buy_decisions >= 1 ? 1 : 0) + (s.watch_decisions >= 1 ? 1 : 0) + (s.pass_decisions >= 1 ? 1 : 0),
      target: 3,
    }),
  },
  // 전문가
  {
    id: 'logs_25',
    title: '25회 임장 달성',
    description: '임장로그를 25개 작성하세요',
    category: 'expert',
    xp: 500,
    icon: '🌟',
    check: (s) => s.total_logs >= 25,
    progress: (s) => ({ current: s.total_logs, target: 25 }),
  },
  {
    id: 'suburbs_10',
    title: '지역 전문가',
    description: '10개 이상의 다른 Suburb를 임장하세요',
    category: 'expert',
    xp: 300,
    icon: '📍',
    check: (s) => s.total_suburbs >= 10,
    progress: (s) => ({ current: s.total_suburbs, target: 10 }),
  },
  {
    id: 'buy_3',
    title: '과감한 결단',
    description: '매수 결정을 3회 이상 내리세요',
    category: 'expert',
    xp: 200,
    icon: '💰',
    check: (s) => s.buy_decisions >= 3,
    progress: (s) => ({ current: s.buy_decisions, target: 3 }),
  },
  // 마스터
  {
    id: 'logs_50',
    title: '임장 마스터',
    description: '임장로그를 50개 작성하세요',
    category: 'master',
    xp: 1000,
    icon: '🏆',
    check: (s) => s.total_logs >= 50,
    progress: (s) => ({ current: s.total_logs, target: 50 }),
  },
];

export function getLevelFromXp(xp: number): Level {
  return [...LEVELS].reverse().find((l) => xp >= l.minXp) ?? LEVELS[0];
}

export function getXpForNextLevel(xp: number): { current: number; needed: number; percent: number } {
  const level = getLevelFromXp(xp);
  if (!level.maxXp) return { current: xp - level.minXp, needed: 0, percent: 100 };
  const current = xp - level.minXp;
  const needed = level.maxXp - level.minXp;
  return { current, needed, percent: Math.round((current / needed) * 100) };
}
