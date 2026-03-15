'use client';

import { useState } from 'react';

const faqs = [
  {
    q: '임장 경험이 전혀 없어도 괜찮을까요?',
    a: '물론입니다. 임장랩은 초보자를 위한 단계별 가이드와 체크리스트를 제공합니다. 선배 멤버의 임장 노트를 먼저 읽으며 감각을 익히고, 함께 임장에 참여하면서 자연스럽게 배울 수 있습니다.',
  },
  {
    q: '임장 노트는 어떻게 공유되나요?',
    a: '현장에서 앱으로 사진, 동영상, 메모를 기록하면 자동으로 지도에 핀이 꽂힙니다. 완성된 노트는 크루 내 공유 또는 전체 공개로 설정할 수 있으며, 공유 시 포인트가 적립됩니다.',
  },
  {
    q: '전문가 Q&A에서 어떤 질문을 할 수 있나요?',
    a: '임장 중 발견한 특이사항, 계약 조건, 세금, 대출, 권리분석, 시세 판단 등 부동산 투자 전반에 관한 질문 모두 가능합니다. 공인중개사, 세무사, 경험 많은 실전 투자자가 답변합니다.',
  },
  {
    q: '크루 임장은 어떻게 진행되나요?',
    a: '앱 내 "크루 임장 모집" 게시판에서 원하는 지역과 날짜를 확인하고 신청하거나 직접 모집할 수 있습니다. 당일 현장에서 앱을 켜고 함께 이동하며 각자 기록을 남기고, 종료 후 합산 노트를 공유합니다.',
  },
  {
    q: '무료 플랜은 얼마나 오래 사용할 수 있나요?',
    a: '무료 플랜은 기간 제한 없이 영구적으로 사용할 수 있습니다. 다만 임장 노트 열람, 전문가 Q&A 등 일부 기능은 횟수 제한이 있으며, 더 많은 기능이 필요할 때 업그레이드하시면 됩니다.',
  },
  {
    q: '결제 후 환불은 가능한가요?',
    a: '결제일로부터 7일 이내, 서비스 이용 내역이 없는 경우 전액 환불이 가능합니다. 이후에는 잔여 기간에 비례한 부분 환불이 적용됩니다. 연간 플랜도 동일하게 적용됩니다.',
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-neutral-950 py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-orange-500/10 border border-orange-400/20 rounded-full text-orange-400 text-sm font-medium mb-4">
            자주 묻는 질문
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            궁금한 점이 <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">있으신가요?</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="border border-orange-500/10 rounded-xl overflow-hidden bg-orange-500/5"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-orange-500/5 transition-colors"
              >
                <span className="text-white font-medium text-sm">{f.q}</span>
                <span className={`text-orange-400 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-orange-100/60 text-sm leading-relaxed">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12 p-8 rounded-2xl border border-orange-500/10 bg-orange-500/5">
          <p className="text-white font-medium mb-2">더 궁금한 점이 있으신가요?</p>
          <p className="text-orange-100/50 text-sm mb-4">평균 2시간 내 답변드립니다.</p>
          <a
            href="mailto:help@imjanglab.com"
            className="inline-block px-6 py-2.5 border border-orange-500/30 text-orange-400 rounded-full text-sm hover:bg-orange-500/10 transition-all"
          >
            1:1 문의하기 →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
