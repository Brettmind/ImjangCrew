'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { q: '임장 경험이 없어도 괜찮을까요?', a: '물론입니다. 단계별 가이드와 50항목 체크리스트가 있어 처음이어도 빠짐없이 임장할 수 있습니다. 선배 멤버의 노트를 먼저 읽고 감각을 익히세요.' },
  { q: '임장 동영상은 어떻게 업로드하나요?', a: '앱에서 임장 중 직접 촬영하거나, 기존 영상을 업로드할 수 있습니다. 최대 30분, 2GB까지 지원하며 자동으로 해당 위치에 핀이 생성됩니다.' },
  { q: '임장 리포트는 어떻게 생성되나요?', a: '체크리스트, 사진, 동영상, 메모를 모두 기록하면 AI가 자동으로 정리해 PDF 리포트를 생성합니다. 직접 편집 후 공유도 가능합니다.' },
  { q: '전문가 Q&A에서 어떤 질문을 할 수 있나요?', a: '임장 중 발견한 특이사항, 계약 조건, 세금, 대출, 권리분석, 시세 판단 등 부동산 투자 전반에 관한 질문 모두 가능합니다.' },
  { q: '무료 플랜은 얼마나 사용할 수 있나요?', a: '기간 제한 없이 영구 무료입니다. 노트 열람 횟수, Q&A 등 일부 기능에 제한이 있으며 필요시 업그레이드하시면 됩니다.' },
  { q: '환불 정책이 어떻게 되나요?', a: '결제일로부터 7일 이내 이용 내역이 없으면 전액 환불됩니다. 이후에는 잔여 기간에 비례한 부분 환불이 적용됩니다.' },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="w-full py-20 sm:py-32 bg-muted/40">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-sm font-medium text-primary bg-accent px-4 py-1.5 rounded-full mb-4">
            자주 묻는 질문
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            궁금한 점이 <span className="text-primary">있으신가요?</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors text-left"
              >
                <span className="text-foreground font-medium text-sm">{f.q}</span>
                <span className={`text-muted-foreground flex-shrink-0 text-lg transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center p-8 rounded-2xl border border-border bg-card"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-foreground font-medium mb-1">더 궁금한 점이 있으신가요?</p>
          <p className="text-muted-foreground text-sm mb-4">평균 2시간 내 답변드립니다.</p>
          <a href="mailto:help@imjanglab.com" className="text-primary text-sm font-medium hover:underline">
            1:1 문의하기 →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
