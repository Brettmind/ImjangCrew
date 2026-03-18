'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { createLog, updateLog } from '@/lib/inspection-logs';
import { StarRating } from '@/components/ui/star-rating';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ImjangLog, DecisionType, PropertyType } from '@/types/inspection-log';
import { PROPERTY_TYPES } from '@/types/inspection-log';

interface LogFormProps {
  mode: 'create' | 'edit';
  initialData?: ImjangLog;
  onSuccess: (log: ImjangLog) => void;
}

const decisionOptions: { value: DecisionType; label: string; color: string; active: string }[] = [
  { value: 'buy', label: '매수', color: 'border-emerald-200 text-emerald-700 hover:bg-emerald-50', active: 'bg-emerald-500 border-emerald-500 text-white' },
  { value: 'watch', label: '관망', color: 'border-amber-200 text-amber-700 hover:bg-amber-50', active: 'bg-amber-500 border-amber-500 text-white' },
  { value: 'pass', label: '패스', color: 'border-red-200 text-red-600 hover:bg-red-50', active: 'bg-red-400 border-red-400 text-white' },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.3 } }),
};

type FormState = {
  address: string;
  suburb: string;
  property_type: PropertyType;
  bedrooms: string;
  bathrooms: string;
  car_spaces: string;
  land_size_sqm: string;
  price_guide: string;
  auction_date: string;
  agent_name: string;
  agency_name: string;
  listing_url: string;
  overall_score: number | null;
  location_score: number | null;
  condition_score: number | null;
  investment_score: number | null;
  pros: string;
  cons: string;
  estimated_rent_pw: string;
  max_budget: string;
  memo: string;
  decision: DecisionType | null;
};

function toForm(log?: ImjangLog): FormState {
  return {
    address: log?.address ?? '',
    suburb: log?.suburb ?? '',
    property_type: (log?.property_type as PropertyType) ?? 'House',
    bedrooms: log?.bedrooms?.toString() ?? '',
    bathrooms: log?.bathrooms?.toString() ?? '',
    car_spaces: log?.car_spaces?.toString() ?? '',
    land_size_sqm: log?.land_size_sqm?.toString() ?? '',
    price_guide: log?.price_guide ?? '',
    auction_date: log?.auction_date ?? '',
    agent_name: log?.agent_name ?? '',
    agency_name: log?.agency_name ?? '',
    listing_url: log?.listing_url ?? '',
    overall_score: log?.overall_score ?? null,
    location_score: log?.location_score ?? null,
    condition_score: log?.condition_score ?? null,
    investment_score: log?.investment_score ?? null,
    pros: log?.pros ?? '',
    cons: log?.cons ?? '',
    estimated_rent_pw: log?.estimated_rent_pw?.toString() ?? '',
    max_budget: log?.max_budget?.toString() ?? '',
    memo: log?.memo ?? '',
    decision: log?.decision ?? null,
  };
}

const inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition';
const labelCls = 'block text-sm font-medium text-foreground mb-1.5';

export function LogForm({ mode, initialData, onSuccess }: LogFormProps) {
  const { user } = useAuth();
  const [form, setForm] = useState<FormState>(() => toForm(initialData));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (key: keyof FormState, value: string | number | null) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.address || !form.suburb || !form.property_type) {
      setError('주소, 지역, 매물 유형은 필수 입력 항목입니다.');
      return;
    }
    if (!form.decision) {
      setError('최종 결정을 선택해주세요.');
      return;
    }
    if (!user) return;

    setError('');
    setLoading(true);

    const payload = {
      user_id: user.id,
      address: form.address,
      suburb: form.suburb,
      property_type: form.property_type,
      bedrooms: form.bedrooms ? parseInt(form.bedrooms) : null,
      bathrooms: form.bathrooms ? parseInt(form.bathrooms) : null,
      car_spaces: form.car_spaces ? parseInt(form.car_spaces) : null,
      land_size_sqm: form.land_size_sqm ? parseInt(form.land_size_sqm) : null,
      price_guide: form.price_guide || null,
      auction_date: form.auction_date || null,
      agent_name: form.agent_name || null,
      agency_name: form.agency_name || null,
      listing_url: form.listing_url || null,
      overall_score: form.overall_score,
      location_score: form.location_score,
      condition_score: form.condition_score,
      investment_score: form.investment_score,
      pros: form.pros || null,
      cons: form.cons || null,
      estimated_rent_pw: form.estimated_rent_pw ? parseInt(form.estimated_rent_pw) : null,
      max_budget: form.max_budget ? parseInt(form.max_budget) : null,
      memo: form.memo || null,
      decision: form.decision,
    };

    const result = mode === 'create'
      ? await createLog(payload)
      : await updateLog(initialData!.id, payload);

    if (result.error) {
      setError('저장 중 오류가 발생했습니다. 다시 시도해주세요.');
    } else {
      onSuccess(result.data!);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 섹션 1: 매물 기본정보 */}
      <motion.section custom={0} initial="hidden" animate="visible" variants={sectionVariants}>
        <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">1</span>
          매물 기본정보
        </h2>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>주소 <span className="text-red-500">*</span></label>
            <input className={inputCls} placeholder="123 Example St, Brisbane QLD 4000" value={form.address} onChange={(e) => set('address', e.target.value)} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>지역 (Suburb) <span className="text-red-500">*</span></label>
              <input className={inputCls} placeholder="Chermside" value={form.suburb} onChange={(e) => set('suburb', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>매물 유형 <span className="text-red-500">*</span></label>
              <select className={inputCls} value={form.property_type} onChange={(e) => set('property_type', e.target.value)}>
                {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>침실 수</label>
              <input type="number" min="0" max="20" className={inputCls} placeholder="4" value={form.bedrooms} onChange={(e) => set('bedrooms', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>욕실 수</label>
              <input type="number" min="0" max="20" className={inputCls} placeholder="2" value={form.bathrooms} onChange={(e) => set('bathrooms', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>주차</label>
              <input type="number" min="0" max="10" className={inputCls} placeholder="1" value={form.car_spaces} onChange={(e) => set('car_spaces', e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>토지면적 (㎡)</label>
              <input type="number" className={inputCls} placeholder="405" value={form.land_size_sqm} onChange={(e) => set('land_size_sqm', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>가격 가이드</label>
              <input className={inputCls} placeholder="$850k – $900k" value={form.price_guide} onChange={(e) => set('price_guide', e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>경매일</label>
              <input type="date" className={inputCls} value={form.auction_date} onChange={(e) => set('auction_date', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>에이전트</label>
              <input className={inputCls} placeholder="John Smith" value={form.agent_name} onChange={(e) => set('agent_name', e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelCls}>부동산사</label>
            <input className={inputCls} placeholder="Ray White Brisbane" value={form.agency_name} onChange={(e) => set('agency_name', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>매물 링크</label>
            <input className={inputCls} placeholder="https://www.realestate.com.au/property/..." value={form.listing_url} onChange={(e) => set('listing_url', e.target.value)} />
          </div>
        </div>
      </motion.section>

      <div className="border-t border-border" />

      {/* 섹션 2: 임장 평가 */}
      <motion.section custom={1} initial="hidden" animate="visible" variants={sectionVariants}>
        <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">2</span>
          임장 평가
        </h2>
        <div className="space-y-5">
          {/* 전체 평점 */}
          <div className="bg-muted/50 rounded-2xl p-4">
            <label className="block text-sm font-semibold text-foreground mb-2">종합 평점</label>
            <StarRating value={form.overall_score} onChange={(v) => set('overall_score', v)} />
          </div>

          {/* 세부 점수 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { key: 'location_score' as const, label: '위치', desc: '교통·학교·편의시설' },
              { key: 'condition_score' as const, label: '매물 상태', desc: '건물 컨디션·수리 필요' },
              { key: 'investment_score' as const, label: '투자 가치', desc: '성장성·수익률' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="border border-border rounded-xl p-3.5">
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mb-2">{desc}</p>
                <StarRating value={form[key]} onChange={(v) => set(key, v)} size="sm" />
              </div>
            ))}
          </div>

          {/* 장단점 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>장점</label>
              <textarea
                rows={4}
                className={cn(inputCls, 'resize-none')}
                placeholder={"넓은 토지\n좋은 학군\n역세권"}
                value={form.pros}
                onChange={(e) => set('pros', e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>단점</label>
              <textarea
                rows={4}
                className={cn(inputCls, 'resize-none')}
                placeholder={"주방 리노베이션 필요\n도로 소음\n주차 협소"}
                value={form.cons}
                onChange={(e) => set('cons', e.target.value)}
              />
            </div>
          </div>

          {/* 투자 분석 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>예상 임대료 (주/AUD)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <input type="number" className={cn(inputCls, 'pl-7')} placeholder="650" value={form.estimated_rent_pw} onChange={(e) => set('estimated_rent_pw', e.target.value)} />
              </div>
            </div>
            <div>
              <label className={labelCls}>최대 구매 예산 (AUD)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <input type="number" className={cn(inputCls, 'pl-7')} placeholder="900000" value={form.max_budget} onChange={(e) => set('max_budget', e.target.value)} />
              </div>
            </div>
          </div>

          {/* 메모 */}
          <div>
            <label className={labelCls}>메모</label>
            <textarea
              rows={3}
              className={cn(inputCls, 'resize-none')}
              placeholder="임장 중 느낀 점, 추가 조사가 필요한 항목 등..."
              value={form.memo}
              onChange={(e) => set('memo', e.target.value)}
            />
          </div>
        </div>
      </motion.section>

      <div className="border-t border-border" />

      {/* 섹션 3: 최종 결정 */}
      <motion.section custom={2} initial="hidden" animate="visible" variants={sectionVariants}>
        <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">3</span>
          최종 결정 <span className="text-red-500 text-sm">*</span>
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {decisionOptions.map(({ value, label, color, active }) => (
            <button
              key={value}
              type="button"
              onClick={() => set('decision', value)}
              className={cn(
                'py-4 rounded-2xl border-2 text-base font-bold transition-all',
                form.decision === value ? active : color
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </motion.section>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl border border-red-100">{error}</p>
      )}

      <Button type="submit" className="w-full rounded-xl py-3 h-auto text-base" disabled={loading}>
        {loading ? '저장 중...' : mode === 'create' ? '임장로그 저장' : '수정 완료'}
      </Button>
    </form>
  );
}
