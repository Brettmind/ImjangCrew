const stats = [
  { value: '38,400+', label: '누적 크루원', icon: '👥' },
  { value: '124,000+', label: '임장 노트', icon: '📝' },
  { value: '97개', label: '커버 지역', icon: '📍' },
  { value: '4.9점', label: '평균 만족도', icon: '⭐' },
];

const Stats = () => (
  <section className="bg-gradient-to-r from-orange-600 to-yellow-500 py-16 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {stats.map((s) => (
        <div key={s.label}>
          <div className="text-3xl mb-2">{s.icon}</div>
          <div className="text-2xl sm:text-4xl font-bold text-black mb-1">{s.value}</div>
          <div className="text-black/60 text-sm font-medium">{s.label}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Stats;
