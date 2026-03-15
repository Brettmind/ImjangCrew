'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: '무료',
    price: { monthly: 0, yearly: 0 },
    desc: '임장이 처음인 분들을 위한 시작 플랜',
    features: ['임장 체크리스트 기본 20항목', '월 임장 노트 5개 열람', '지역별 시세 정보 월 3회', '커뮤니티 읽기'],
    notIncluded: ['임장 동영상 열람', '전문가 Q&A', '임장 리포트 생성', '매물 알림'],
    cta: '무료로 시작',
    highlight: false,
  },
  {
    name: '스탠다드',
    price: { monthly: 19900, yearly: 14900 },
    desc: '본격적인 임장 투자를 원하는 분들',
    features: ['체크리스트 50항목 풀셋', '임장 노트 & 동영상 무제한', '임장 리포트 월 10개', '전문가 Q&A 월 5회', '실거래가 무제한 조회', '매물 알림 5개 지역'],
    notIncluded: ['1:1 전문가 컨설팅', '투자 분석 리포트'],
    cta: '시작하기',
    highlight: true,
    badge: '가장 인기',
  },
  {
    name: '프로',
    price: { monthly: 49900, yearly: 39900 },
    desc: '전문 투자자를 위한 올인원 플랜',
    features: ['스탠다드 전체 포함', '임장 리포트 무제한', '전문가 Q&A 무제한', '1:1 컨설팅 월 1회', '매물 알림 무제한', '월간 투자 분석 리포트', '포트폴리오 관리'],
    notIncluded: [],
    cta: '프로 시작하기',
    highlight: false,
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="w-full py-20 sm:py-32 bg-background">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-sm font-medium text-primary bg-accent px-4 py-1.5 rounded-full mb-4">
            가격 안내
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            합리적인 <span className="text-primary">멤버십</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">30일 무료 체험 · 언제든 해지 가능</p>

          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-muted border border-border">
            <button
              onClick={() => setYearly(false)}
              className={cn('px-5 py-2 rounded-full text-sm font-medium transition-all', !yearly ? 'bg-white shadow text-foreground' : 'text-muted-foreground')}
            >
              월간
            </button>
            <button
              onClick={() => setYearly(true)}
              className={cn('px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2', yearly ? 'bg-white shadow text-foreground' : 'text-muted-foreground')}
            >
              연간
              <span className="text-xs bg-primary text-white px-1.5 py-0.5 rounded-full">25%↓</span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p, i) => {
            const price = yearly ? p.price.yearly : p.price.monthly;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn(
                  'relative flex flex-col rounded-2xl p-8 border transition-all duration-300',
                  p.highlight
                    ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10 scale-[1.02]'
                    : 'border-border bg-card hover:border-primary/30 hover:shadow-md'
                )}
              >
                {p.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full">
                    {p.badge}
                  </span>
                )}
                <div className="mb-6">
                  <h3 className="text-foreground font-bold text-xl mb-1">{p.name}</h3>
                  <p className="text-muted-foreground text-sm">{p.desc}</p>
                </div>
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      {price === 0 ? '무료' : `₩${price.toLocaleString()}`}
                    </span>
                    {price > 0 && <span className="text-muted-foreground text-sm">/월</span>}
                  </div>
                  {yearly && price > 0 && (
                    <p className="text-primary text-xs mt-1">연간 ₩{(price * 12).toLocaleString()} 결제</p>
                  )}
                </div>
                <Button variant={p.highlight ? 'default' : 'outline'} className="w-full mb-8">
                  {p.cta}
                </Button>
                <div className="flex-1 space-y-2.5">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5 text-sm">
                      <span className="text-emerald-500 flex-shrink-0 mt-0.5">✓</span>
                      <span className="text-muted-foreground">{f}</span>
                    </div>
                  ))}
                  {p.notIncluded.map((f) => (
                    <div key={f} className="flex items-start gap-2.5 text-sm">
                      <span className="text-border flex-shrink-0 mt-0.5">–</span>
                      <span className="text-border">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
        <p className="text-center text-muted-foreground text-sm mt-8">
          모든 플랜 30일 무료 · 언제든 해지 가능 · 카드 정보 불필요
        </p>
      </div>
    </section>
  );
}
