'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { PLANS, type PlanId } from '@/lib/stripe';
import { cn } from '@/lib/utils';

interface Subscription {
  plan: PlanId;
  status: string;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
}

function PricingCard({
  plan,
  currentPlan,
  onSubscribe,
  onManage,
  loading,
}: {
  plan: typeof PLANS[PlanId];
  currentPlan: PlanId;
  onSubscribe: (planId: PlanId) => void;
  onManage: () => void;
  loading: boolean;
}) {
  const isCurrent = currentPlan === plan.id;
  const isUpgrade = plan.price > (PLANS[currentPlan]?.price ?? 0);
  const isFree = plan.id === 'free';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        'relative bg-card border-2 rounded-2xl p-6 flex flex-col',
        plan.id === 'pro' ? 'border-primary shadow-lg shadow-primary/10' : plan.color,
        isCurrent && 'ring-2 ring-primary ring-offset-2'
      )}
    >
      {plan.badge && (
        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold ${
          plan.id === 'pro' ? 'bg-primary text-white' : 'bg-yellow-400 text-yellow-900'
        }`}>
          {plan.badge}
        </div>
      )}

      <div className="mb-5">
        <h3 className="text-lg font-bold text-foreground">{plan.nameKo}</h3>
        <p className="text-sm text-muted-foreground mt-0.5">{plan.description}</p>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-foreground">
            {plan.price === 0 ? '무료' : `$${plan.price}`}
          </span>
          {plan.price > 0 && <span className="text-sm text-muted-foreground">AUD/월</span>}
        </div>
      </div>

      <ul className="flex-1 space-y-2.5 mb-6">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
            <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      {isCurrent ? (
        isFree ? (
          <div className="py-2.5 text-center text-sm font-medium text-muted-foreground border border-border rounded-xl">
            현재 플랜
          </div>
        ) : (
          <button
            onClick={onManage}
            disabled={loading}
            className="py-2.5 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary/5 transition-colors text-sm disabled:opacity-50"
          >
            {loading ? '처리 중...' : '구독 관리'}
          </button>
        )
      ) : isFree ? (
        <div className="py-2.5 text-center text-sm font-medium text-muted-foreground border border-border rounded-xl">
          기본 제공
        </div>
      ) : (
        <button
          onClick={() => onSubscribe(plan.id as PlanId)}
          disabled={loading}
          className={cn(
            'py-2.5 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50',
            plan.id === 'pro'
              ? 'bg-primary text-white hover:bg-primary/90'
              : 'bg-yellow-400 text-yellow-900 hover:bg-yellow-300'
          )}
        >
          {loading ? '처리 중...' : isUpgrade ? '업그레이드' : '다운그레이드'}
        </button>
      )}
    </motion.div>
  );
}

export default function BillingPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const success = searchParams.get('success');
  const canceled = searchParams.get('canceled');

  useEffect(() => {
    if (!user) return;
    supabase
      .from('subscriptions')
      .select('plan, status, current_period_end, cancel_at_period_end')
      .eq('user_id', user.id)
      .single()
      .then(({ data }) => {
        setSubscription(data as Subscription | null);
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    if (success) {
      setToast({ type: 'success', message: '구독이 완료되었습니다! 🎉' });
      setTimeout(() => setToast(null), 4000);
    }
    if (canceled) {
      setToast({ type: 'error', message: '결제가 취소되었습니다.' });
      setTimeout(() => setToast(null), 3000);
    }
  }, [success, canceled]);

  const currentPlan: PlanId = subscription?.plan ?? 'free';

  const handleSubscribe = async (planId: PlanId) => {
    if (!user) return;
    setActionLoading(true);
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId, userId: user.id, userEmail: user.email }),
    });
    const { url, error } = await res.json();
    if (error) {
      setToast({ type: 'error', message: '오류가 발생했습니다. 다시 시도해주세요.' });
      setActionLoading(false);
      return;
    }
    window.location.href = url;
  };

  const handleManage = async () => {
    if (!user) return;
    setActionLoading(true);
    const res = await fetch('/api/stripe/portal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id }),
    });
    const { url, error } = await res.json();
    if (error) {
      setToast({ type: 'error', message: '구독 관리 페이지를 열 수 없습니다.' });
      setActionLoading(false);
      return;
    }
    window.location.href = url;
  };

  return (
    <div>
      {/* 토스트 */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold ${
            toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          {toast.message}
        </motion.div>
      )}

      {/* 헤더 */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">구독 관리</h1>
        <p className="text-sm text-muted-foreground mt-0.5">플랜을 선택하고 임장연구소를 최대한 활용하세요</p>
      </motion.div>

      {/* 현재 구독 상태 */}
      {!loading && subscription && subscription.plan !== 'free' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-2xl border flex items-center gap-4 ${
            subscription.status === 'active'
              ? 'bg-emerald-50 border-emerald-200'
              : 'bg-amber-50 border-amber-200'
          }`}
        >
          <div className="text-2xl">
            {subscription.status === 'active' ? '✅' : '⚠️'}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">
              {PLANS[subscription.plan]?.nameKo} 플랜 구독 중
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {subscription.cancel_at_period_end
                ? `${new Date(subscription.current_period_end!).toLocaleDateString('ko-KR')} 에 만료 예정`
                : subscription.current_period_end
                  ? `다음 결제일: ${new Date(subscription.current_period_end).toLocaleDateString('ko-KR')}`
                  : ''}
            </p>
          </div>
          <button
            onClick={handleManage}
            disabled={actionLoading}
            className="text-xs font-semibold text-primary hover:underline disabled:opacity-50"
          >
            구독 관리 →
          </button>
        </motion.div>
      )}

      {/* 요금제 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {(Object.values(PLANS) as typeof PLANS[PlanId][]).map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <PricingCard
              plan={plan}
              currentPlan={currentPlan}
              onSubscribe={handleSubscribe}
              onManage={handleManage}
              loading={actionLoading}
            />
          </motion.div>
        ))}
      </div>

      {/* FAQ */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <h2 className="text-base font-semibold text-foreground mb-4">자주 묻는 질문</h2>
        <div className="space-y-3">
          {[
            { q: '언제든지 취소할 수 있나요?', a: '네, 언제든지 구독을 취소할 수 있습니다. 취소 시 현재 결제 기간이 끝날 때까지 서비스를 이용할 수 있습니다.' },
            { q: '결제 수단은 무엇을 지원하나요?', a: 'Visa, Mastercard, American Express 등 주요 신용/체크카드를 모두 지원합니다.' },
            { q: '플랜을 변경하면 요금은 어떻게 되나요?', a: '업그레이드 시 남은 기간에 비례해 추가 요금이 청구됩니다. 다운그레이드는 다음 결제 주기부터 적용됩니다.' },
            { q: 'GST는 포함된 금액인가요?', a: '표시 금액에 GST(10%)가 포함되어 있습니다. 영수증은 Stripe 고객 포털에서 다운로드할 수 있습니다.' },
          ].map(({ q, a }) => (
            <div key={q} className="bg-card border border-border rounded-2xl p-5">
              <p className="text-sm font-semibold text-foreground mb-1.5">{q}</p>
              <p className="text-sm text-muted-foreground">{a}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
