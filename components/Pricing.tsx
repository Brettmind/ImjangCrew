'use client';

import { useState } from 'react';

const plans = [
  {
    name: '무료',
    price: { monthly: 0, yearly: 0 },
    desc: '임장이 처음인 분들을 위한 시작 플랜',
    features: [
      '임장 체크리스트 기본 20항목',
      '월 임장 노트 5개 열람',
      '지역별 시세 정보 (월 3회)',
      '커뮤니티 게시판 읽기',
    ],
    notIncluded: ['크루 임장 참여', '전문가 Q&A', '실거래가 무제한 조회', '매물 알림'],
    cta: '무료로 시작',
    highlight: false,
  },
  {
    name: '크루',
    price: { monthly: 19900, yearly: 14900 },
    desc: '본격적인 임장 투자를 원하는 분들',
    features: [
      '임장 체크리스트 50항목 풀셋',
      '임장 노트 무제한 열람',
      '크루 임장 월 4회 참여',
      '전문가 Q&A 월 5회',
      '실거래가 무제한 조회',
      '매물 알림 최대 5개 지역',
      '임장 노트 작성 & 공유',
    ],
    notIncluded: ['1:1 전문가 컨설팅', '투자 분석 리포트'],
    cta: '크루 시작하기',
    highlight: true,
    badge: '가장 인기',
  },
  {
    name: '프로',
    price: { monthly: 49900, yearly: 39900 },
    desc: '전문 투자자를 위한 올인원 플랜',
    features: [
      '크루 플랜 모든 기능 포함',
      '크루 임장 무제한 참여',
      '전문가 Q&A 무제한',
      '1:1 전문가 컨설팅 월 1회',
      '매물 알림 무제한',
      '월간 투자 분석 리포트',
      '투자 포트폴리오 관리',
      '우선 고객 지원',
    ],
    notIncluded: [],
    cta: '프로 시작하기',
    highlight: false,
  },
];

const Pricing = () => {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-orange-500/10 border border-orange-400/20 rounded-full text-orange-400 text-sm font-medium mb-4">
            가격 안내
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            합리적인 <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">멤버십</span>
          </h2>
          <p className="text-orange-100/60 text-lg max-w-2xl mx-auto mb-8">
            지금 시작하면 30일 무료 체험 가능합니다.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-white/5 border border-white/10">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!yearly ? 'bg-orange-500 text-black' : 'text-orange-100/60 hover:text-white'}`}
            >
              월간
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${yearly ? 'bg-orange-500 text-black' : 'text-orange-100/60 hover:text-white'}`}
            >
              연간
              <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full whitespace-nowrap">25% 할인</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p) => {
            const price = yearly ? p.price.yearly : p.price.monthly;
            return (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-2xl p-8 border transition-all duration-300 ${
                  p.highlight
                    ? 'border-orange-500/50 bg-gradient-to-b from-orange-500/10 to-orange-500/5 shadow-xl shadow-orange-500/10'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                {p.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-black text-xs font-bold rounded-full">
                    {p.badge}
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-white font-bold text-xl mb-1">{p.name}</h3>
                  <p className="text-orange-100/50 text-sm">{p.desc}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">
                      {price === 0 ? '무료' : `₩${price.toLocaleString()}`}
                    </span>
                    {price > 0 && <span className="text-orange-100/40 text-sm">/월</span>}
                  </div>
                  {yearly && price > 0 && (
                    <p className="text-orange-400 text-xs mt-1">연간 결제 시 ₩{(price * 12).toLocaleString()}</p>
                  )}
                </div>

                <button
                  className={`w-full py-3 rounded-full font-semibold text-sm transition-all mb-8 ${
                    p.highlight
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-black hover:from-orange-600 hover:to-yellow-600 hover:shadow-lg hover:shadow-orange-500/25'
                      : 'border border-orange-500/30 text-orange-400 hover:bg-orange-500/10'
                  }`}
                >
                  {p.cta}
                </button>

                <div className="flex-1 space-y-3">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-start gap-3 text-sm">
                      <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-orange-100/70">{f}</span>
                    </div>
                  ))}
                  {p.notIncluded.map((f) => (
                    <div key={f} className="flex items-start gap-3 text-sm">
                      <span className="text-white/20 mt-0.5 flex-shrink-0">✗</span>
                      <span className="text-white/20">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-orange-100/30 text-sm mt-8">
          모든 플랜 30일 무료 체험 · 언제든지 해지 가능 · 카드 정보 불필요
        </p>
      </div>
    </section>
  );
};

export default Pricing;
