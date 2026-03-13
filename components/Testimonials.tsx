const reviews = [
  {
    name: '김민준',
    title: '직장인 투자자 · 경기도 수원',
    avatar: '👨‍💼',
    rating: 5,
    text: '혼자 임장 다닐 때는 뭘 봐야 할지 몰라서 항상 불안했어요. 임장크루 덕분에 체크리스트 하나로 놓치는 게 없어졌고, 크루원들과 함께 가니까 2배는 더 꼼꼼하게 볼 수 있었습니다. 첫 투자에 성공했어요!',
    property: '수원 영통구 아파트 낙찰',
    gain: '+8,000만원',
  },
  {
    name: '이서연',
    title: '주부 투자자 · 서울 마포',
    avatar: '👩',
    rating: 5,
    text: '육아 때문에 혼자 발품 팔기가 너무 힘들었는데, 다른 크루원들이 올려준 임장 노트가 정말 금이었어요. 사진이랑 동영상까지 있어서 직접 안 가도 현장 느낌이 왔거든요. 전문가 Q&A도 빠르고 친절해서 만족합니다.',
    property: '마포구 오피스텔 매입',
    gain: '+4,200만원',
  },
  {
    name: '박지훈',
    title: '자영업자 · 인천 연수구',
    avatar: '👨',
    rating: 5,
    text: '시세 분석 기능이 진짜 대박이에요. 실거래가, 전세가율, 갭 계산까지 한 화면에서 바로 나오니까 매물 비교가 엄청 쉬워졌습니다. 임장 가기 전에 미리 필터링해서 효율이 3배는 된 것 같아요.',
    property: '연수구 아파트 갭투자',
    gain: '+6,500만원',
  },
  {
    name: '최유진',
    title: '30대 직장인 · 대전 유성구',
    avatar: '👩‍💻',
    rating: 5,
    text: '부동산 공부를 막 시작했을 때 가입했는데, 선배 크루원들이 올린 임장 노트 하나하나가 다 교과서예요. 전문가 Q&A로 초보 질문도 부끄럽지 않게 물어볼 수 있고 답변도 빨라서 빠르게 성장할 수 있었습니다.',
    property: '유성구 신축 아파트 청약',
    gain: '프리미엄 +3,000만원',
  },
];

const Testimonials = () => (
  <section id="testimonials" className="bg-neutral-950 py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 bg-orange-500/10 border border-orange-400/20 rounded-full text-orange-400 text-sm font-medium mb-4">
          크루 후기
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          실제 크루원들의 <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">성공 스토리</span>
        </h2>
        <p className="text-orange-100/60 text-lg max-w-2xl mx-auto">
          발품을 팔면 반드시 기회가 보입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((r) => (
          <div key={r.name} className="p-8 rounded-2xl border border-orange-500/10 bg-orange-500/5 flex flex-col gap-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: r.rating }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-sm">★</span>
              ))}
            </div>

            <p className="text-orange-100/70 leading-relaxed text-sm flex-1">
              &ldquo;{r.text}&rdquo;
            </p>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-xl">
                  {r.avatar}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{r.name}</p>
                  <p className="text-orange-100/40 text-xs">{r.title}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-orange-100/40 text-xs mb-0.5">{r.property}</p>
                <p className="text-green-400 text-sm font-bold">{r.gain}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
