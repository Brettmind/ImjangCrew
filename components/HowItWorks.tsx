const steps = [
  {
    number: '01',
    title: '관심 지역 설정',
    desc: '투자 예산과 목표 수익률을 입력하고 관심 있는 지역을 선택하세요. AI가 현재 시장 상황에 맞는 유망 지역을 추천해드립니다.',
    icon: '🎯',
  },
  {
    number: '02',
    title: '크루 합류 또는 모집',
    desc: '해당 지역에 먼저 임장을 다녀온 크루원의 노트를 확인하거나, 함께 임장할 크루를 직접 모집해보세요.',
    icon: '🤝',
  },
  {
    number: '03',
    title: '현장 임장 진행',
    desc: '앱을 켜고 현장을 걸으면서 체크리스트를 채우고 사진을 찍으세요. 위치 기반으로 자동으로 기록이 저장됩니다.',
    icon: '🚶',
  },
  {
    number: '04',
    title: '임장 노트 공유',
    desc: '완성된 임장 노트를 크루에 공유하면 포인트를 적립하고 다른 크루원의 노트도 무제한으로 열람할 수 있습니다.',
    icon: '📝',
  },
];

const HowItWorks = () => (
  <section id="how" className="bg-neutral-950 py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 bg-orange-500/10 border border-orange-400/20 rounded-full text-orange-400 text-sm font-medium mb-4">
          이용 방법
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          4단계로 <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">완성하는 임장</span>
        </h2>
        <p className="text-orange-100/60 text-lg max-w-2xl mx-auto">
          처음 임장이어도 괜찮습니다. 단계별로 안내해드립니다.
        </p>
      </div>

      <div className="relative">
        {/* connector line */}
        <div className="hidden lg:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={s.number} className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-2xl mb-5 shadow-lg shadow-orange-500/20">
                {s.icon}
              </div>
              <span className="text-orange-500/40 text-xs font-mono font-bold mb-2 tracking-widest">{s.number}</span>
              <h3 className="text-white font-semibold text-lg mb-3">{s.title}</h3>
              <p className="text-orange-100/50 text-sm leading-relaxed">{s.desc}</p>

              {i < steps.length - 1 && (
                <div className="lg:hidden w-px h-8 bg-orange-500/20 my-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
