import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('STRIPE_SECRET_KEY is not set');
    _stripe = new Stripe(key, { apiVersion: '2026-02-25.clover' });
  }
  return _stripe;
}

// Convenience alias for server routes
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export const PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    nameKo: '무료',
    price: 0,
    priceId: null,
    description: '임장 시작하기',
    features: [
      '임장로그 5개',
      '사진 업로드 (로그당 3장)',
      '커뮤니티 댓글',
      '기본 퀘스트',
    ],
    limits: { logs: 5, mediaPerLog: 3 },
    color: 'border-border',
    badge: null,
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    nameKo: '프로',
    price: 19,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID ?? '',
    description: '진지한 임장러를 위해',
    features: [
      '임장로그 무제한',
      '사진·동영상 무제한',
      '전체 퀘스트 참여',
      '이주의 매물 알림',
      '임장 통계 대시보드',
      '프로 뱃지',
    ],
    limits: { logs: Infinity, mediaPerLog: Infinity },
    color: 'border-primary',
    badge: '인기',
  },
  expert: {
    id: 'expert',
    name: 'Expert',
    nameKo: '전문가',
    price: 49,
    priceId: process.env.NEXT_PUBLIC_STRIPE_EXPERT_PRICE_ID ?? '',
    description: '부동산 전문가를 위해',
    features: [
      'Pro 플랜 모든 기능',
      '전문가 뱃지',
      '커뮤니티 추천 권한',
      '임장 리포트 PDF 출력',
      '1:1 임장 컨설팅 월 1회',
      '명예의 전당 등재 우선권',
    ],
    limits: { logs: Infinity, mediaPerLog: Infinity },
    color: 'border-yellow-400',
    badge: '최고',
  },
} as const;

export type PlanId = keyof typeof PLANS;
