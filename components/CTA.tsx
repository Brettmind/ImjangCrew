'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function CTA() {
  return (
    <section className="w-full py-20 sm:py-32 bg-background">
      <div className="container mx-auto">
        <motion.div
          className="relative rounded-3xl bg-primary px-8 py-16 sm:px-16 sm:py-20 text-center overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background decoration */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              발품이 답입니다.<br />지금 임장 떠나세요.
            </h2>
            <p className="text-orange-100 text-lg mb-10 max-w-xl mx-auto">
              38,000명의 멤버가 오늘도 현장을 직접 발로 뛰고 있습니다. 지금 합류하면 30일 무료입니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-orange-50 rounded-full shadow-lg font-semibold"
              >
                무료로 랩 합류하기
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 rounded-full"
              >
                서비스 둘러보기
              </Button>
            </div>
            <p className="text-orange-200/70 text-sm mt-6">
              카드 정보 불필요 · 30일 무료 · 언제든 해지 가능
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
