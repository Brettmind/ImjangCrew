const features = [
  {
    icon: '🗺️',
    title: '실시간 임장 지도',
    desc: '현장을 직접 방문한 크루원들이 기록한 생생한 임장 노트를 지도 위에서 한눈에 확인하세요. 사진, 동영상, 메모까지 모두 담겨 있습니다.',
  },
  {
    icon: '👥',
    title: '크루 함께 임장',
    desc: '혼자 임장은 이제 그만. 같은 지역을 관심 있는 크루원들과 함께 날짜를 잡고 함께 발로 뛰어보세요. 2배로 빠른 정보 수집이 가능합니다.',
  },
  {
    icon: '📊',
    title: '임장 체크리스트',
    desc: '교통, 학군, 편의시설, 환경, 단지 상태 등 베테랑 투자자들이 검증한 50개 항목의 체크리스트로 빠짐없는 임장을 완성하세요.',
  },
  {
    icon: '💬',
    title: '전문가 Q&A',
    desc: '임장 중 궁금한 점이 생기면 바로 물어보세요. 공인중개사, 세무사, 실전 투자자들이 24시간 이내 답변해드립니다.',
  },
  {
    icon: '📈',
    title: '시세 & 실거래가 분석',
    desc: '국토부 실거래가부터 주변 경쟁 매물, 전세가율, 갭투자 가능 여부까지 한 화면에서 바로 분석할 수 있습니다.',
  },
  {
    icon: '🔔',
    title: '맞춤 매물 알림',
    desc: '내가 설정한 조건(지역, 가격, 면적, 층수)에 맞는 신규 매물이 나오면 가장 먼저 알림을 받아보세요.',
  },
];

const Features = () => (
  <section id="features" className="bg-black py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 bg-orange-500/10 border border-orange-400/20 rounded-full text-orange-400 text-sm font-medium mb-4">
          서비스 소개
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          임장을 <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">스마트하게</span>
        </h2>
        <p className="text-orange-100/60 text-lg max-w-2xl mx-auto">
          임장크루는 현장 중심 부동산 투자를 위한 모든 도구를 하나로 모았습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="group p-8 rounded-2xl border border-orange-500/10 bg-orange-500/5 hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-300"
          >
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-orange-300 transition-colors">
              {f.title}
            </h3>
            <p className="text-orange-100/50 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
