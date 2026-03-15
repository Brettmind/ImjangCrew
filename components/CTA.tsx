const CTA = () => (
  <section className="bg-background py-24 px-6">
    <div className="max-w-4xl mx-auto text-center">
      <div className="relative rounded-3xl overflow-hidden border border-border bg-card/50 backdrop-blur-sm px-6 sm:px-8 py-16 sm:py-20">
        {/* glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <span className="inline-block px-4 py-1.5 bg-card border border-border text-primary text-sm font-medium rounded-full mb-6">
            지금 바로 시작하세요
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            발품이 답입니다.<br />
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              지금 임장 떠나세요.
            </span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            38,000명의 멤버가 오늘도 현장을 직접 발로 뛰고 있습니다. 지금 합류하면 30일 무료입니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 sm:px-10 py-4 bg-primary text-primary-foreground font-bold text-base sm:text-lg rounded-full transition-all hover:opacity-90 hover:scale-105 hover:shadow-xl hover:shadow-primary/25">
              무료로 크루 합류하기
            </button>
            <button className="px-8 sm:px-10 py-4 border border-border text-primary hover:bg-card/80 rounded-full font-semibold text-base sm:text-lg transition-all">
              서비스 데모 보기
            </button>
          </div>

          <p className="text-muted-foreground/60 text-sm mt-6">
            카드 정보 불필요 · 30일 무료 · 언제든 해지 가능
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default CTA;
