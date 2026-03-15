'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const features = [
  { icon: '🗺️', title: '실시간 임장 지도', desc: '멤버들이 현장에서 직접 기록한 임장 노트를 지도 위에서 확인하세요. 사진, 동영상, 메모가 한눈에 보입니다.' },
  { icon: '📹', title: '임장 동영상', desc: '텍스트로 담지 못한 현장감을 동영상으로 확인하세요. 단지 내부, 주변 환경, 교통까지 생생하게 볼 수 있습니다.' },
  { icon: '📋', title: '임장 체크리스트', desc: '교통·학군·편의시설·환경 등 50가지 항목의 전문 체크리스트로 빠짐없는 현장 분석을 완성하세요.' },
  { icon: '📊', title: '임장 리포트', desc: '현장 데이터를 자동으로 정리해 투자 판단에 필요한 리포트를 즉시 생성합니다. PDF로 저장 및 공유도 가능합니다.' },
  { icon: '📈', title: '시세 & 실거래가', desc: '국토부 실거래가, 전세가율, 갭 계산까지 한 화면에서 바로 분석합니다.' },
  { icon: '🔔', title: '맞춤 매물 알림', desc: '설정한 조건에 맞는 신규 매물이 등록되면 가장 먼저 알려드립니다.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section id="features" className="w-full py-20 sm:py-32 bg-muted/40">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-sm font-medium text-primary bg-accent px-4 py-1.5 rounded-full mb-4">
            서비스 소개
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            임장의 모든 것을 <span className="text-primary">하나로</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            임장랩은 현장 리포트, 동영상, 임장 로그를 한 곳에 모아 스마트한 부동산 결정을 돕습니다.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={itemVariants}
              className={cn(
                'group p-6 rounded-2xl bg-card border border-border',
                'hover:border-primary/30 hover:shadow-md transition-all duration-300'
              )}
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-foreground font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
