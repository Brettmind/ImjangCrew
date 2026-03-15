'use client';

import { motion } from 'framer-motion';

const reviews = [
  {
    name: '김민준',
    role: '직장인 투자자 · 경기 수원',
    avatar: '👨‍💼',
    rating: 5,
    text: '혼자 임장 다닐 때는 뭘 봐야 할지 막막했어요. 임장랩 체크리스트 하나로 놓치는 게 없어졌고, 멤버들과 함께 가니 2배 꼼꼼하게 볼 수 있었습니다. 첫 투자에 성공했어요!',
    gain: '+8,000만원',
  },
  {
    name: '이서연',
    role: '주부 투자자 · 서울 마포',
    avatar: '👩',
    rating: 5,
    text: '육아 때문에 발품 팔기 힘들었는데, 멤버들이 올린 동영상 임장 노트가 정말 금이었어요. 직접 안 가도 현장 느낌이 생생하게 왔습니다.',
    gain: '+4,200만원',
  },
  {
    name: '박지훈',
    role: '자영업자 · 인천 연수구',
    avatar: '👨',
    rating: 5,
    text: '임장 리포트 기능이 대박이에요. 실거래가, 전세가율, 갭 계산까지 한 화면에서 바로 나오니 매물 비교 효율이 3배는 된 것 같아요.',
    gain: '+6,500만원',
  },
  {
    name: '최유진',
    role: '30대 직장인 · 대전 유성구',
    avatar: '👩‍💻',
    rating: 5,
    text: '부동산 공부 막 시작했을 때 가입했는데, 선배 멤버들의 임장 노트가 다 교과서예요. Q&A 답변도 빨라서 빠르게 성장할 수 있었습니다.',
    gain: '프리미엄 +3,000만원',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-20 sm:py-32 bg-muted/40">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-sm font-medium text-primary bg-accent px-4 py-1.5 rounded-full mb-4">
            멤버 후기
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            실제 멤버들의 <span className="text-primary">성공 스토리</span>
          </h2>
          <p className="text-muted-foreground text-lg">발품을 팔면 반드시 기회가 보입니다.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{r.text}"</p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">{r.avatar}</div>
                  <div>
                    <p className="text-foreground font-medium text-sm">{r.name}</p>
                    <p className="text-muted-foreground text-xs">{r.role}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{r.gain}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
