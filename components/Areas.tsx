const areas = [
  {
    region: '서울',
    districts: ['마포구', '성동구', '동작구', '노원구'],
    count: 1284,
    hot: true,
    priceRange: '5억 ~ 20억',
    trend: '+2.3%',
    tags: ['갭투자', '재개발', '학군'],
  },
  {
    region: '경기',
    districts: ['수원', '성남', '용인', '화성'],
    count: 2041,
    hot: true,
    priceRange: '3억 ~ 12억',
    trend: '+1.8%',
    tags: ['신축', 'GTX', '대단지'],
  },
  {
    region: '인천',
    districts: ['미추홀구', '연수구', '부평구', '서구'],
    count: 873,
    hot: false,
    priceRange: '2억 ~ 8억',
    trend: '+0.9%',
    tags: ['저평가', '개발호재', '역세권'],
  },
  {
    region: '부산',
    districts: ['해운대구', '수영구', '동래구', '남구'],
    count: 654,
    hot: false,
    priceRange: '2억 ~ 15억',
    trend: '+1.2%',
    tags: ['바다뷰', '관광수요', '재건축'],
  },
  {
    region: '대전',
    districts: ['유성구', '서구', '대덕구'],
    count: 412,
    hot: false,
    priceRange: '2억 ~ 7억',
    trend: '+0.5%',
    tags: ['연구단지', '신도시', '공공기관'],
  },
  {
    region: '대구',
    districts: ['수성구', '달서구', '북구'],
    count: 389,
    hot: false,
    priceRange: '1.5억 ~ 8억',
    trend: '-0.3%',
    tags: ['학군', '구도심', '상업지'],
  },
];

const Areas = () => (
  <section id="areas" className="bg-black py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 bg-orange-500/10 border border-orange-400/20 rounded-full text-orange-400 text-sm font-medium mb-4">
          임장 지역
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          전국 <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">임장 현황</span>
        </h2>
        <p className="text-orange-100/60 text-lg max-w-2xl mx-auto">
          지금 이 순간도 멤버들이 전국 곳곳을 발로 뛰고 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {areas.map((a) => (
          <div
            key={a.region}
            className="group relative p-6 rounded-2xl border border-orange-500/10 bg-orange-500/5 hover:border-orange-500/30 hover:bg-orange-500/10 transition-all duration-300 cursor-pointer"
          >
            {a.hot && (
              <span className="absolute top-4 right-4 px-2.5 py-0.5 bg-orange-500 text-black text-xs font-bold rounded-full">
                🔥 HOT
              </span>
            )}

            <div className="flex items-baseline gap-3 mb-4">
              <h3 className="text-2xl font-bold text-white">{a.region}</h3>
              <span className={`text-sm font-semibold ${a.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {a.trend}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {a.districts.map((d) => (
                <span key={d} className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded-md text-orange-100/60">
                  {d}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-orange-100/40 text-xs mb-0.5">가격대</p>
                <p className="text-orange-200 text-sm font-medium">{a.priceRange}</p>
              </div>
              <div className="text-right">
                <p className="text-orange-100/40 text-xs mb-0.5">임장 노트</p>
                <p className="text-orange-200 text-sm font-medium">{a.count.toLocaleString()}개</p>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {a.tags.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 bg-orange-500/10 border border-orange-400/20 text-orange-400 rounded-full">
                  #{t}
                </span>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/5">
              <span className="text-orange-400 text-sm group-hover:text-orange-300 transition-colors">
                임장 노트 보기 →
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button className="px-8 py-3 border border-orange-500/30 text-orange-400 rounded-full text-sm hover:bg-orange-500/10 transition-all">
          전체 지역 보기
        </button>
      </div>
    </div>
  </section>
);

export default Areas;
