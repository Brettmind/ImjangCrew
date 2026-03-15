'use client';

import { motion } from 'framer-motion';

const steps = [
  { number: '01', icon: '🎯', title: '관심 지역 설정', desc: '투자 예산과 목표를 입력하고 관심 지역을 선택하세요. AI가 유망 지역을 추천해드립니다.' },
  { number: '02', icon: '🤝', title: '멤버 합류 또는 모집', desc: '먼저 임장한 멤버의 노트를 확인하거나, 함께 임장할 멤버를 직접 모집해보세요.' },
  { number: '03', icon: '🚶', title: '현장 임장 진행', desc: '앱을 켜고 현장을 걸으면서 체크리스트를 채우고 사진·동영상을 기록하세요.' },
  { number: '04', icon: '📝', title: '리포트 공유', desc: '완성된 임장 리포트를 공유하면 포인트가 적립되고 다른 멤버의 노트도 무제한 열람할 수 있습니다.' },
];

export default function HowItWorks() {
  return (
    <section id="how" className="w-full py-20 sm:py-32 bg-background">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-sm font-medium text-primary bg-accent px-4 py-1.5 rounded-full mb-4">
            이용 방법
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            4단계로 완성하는 <span className="text-primary">스마트 임장</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            처음 임장이어도 괜찮습니다. 단계별로 안내해드립니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* connector */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-border" />

          {steps.map((s, i) => (
            <motion.div
              key={s.number}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="relative z-10 w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="text-2xl">{s.icon}</span>
                <span className="text-[10px] font-mono text-primary/50 mt-0.5">{s.number}</span>
              </div>
              <h3 className="text-foreground font-semibold mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
