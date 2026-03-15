const Footer = () => (
  <footer className="bg-card/20 border-t border-border/50 px-6 py-16">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 mb-12">
        {/* Brand */}
        <div className="sm:col-span-2">
          <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-3">
            임장랩
          </div>
          <p className="text-muted-foreground/60 text-sm leading-relaxed max-w-xs">
            발품을 팔면 기회가 보입니다. 전국의 멤버들과 함께 현장 중심 부동산 투자를 경험하세요.
          </p>
          <div className="flex gap-3 mt-5">
            {['📱', '💻', '🔔'].map((icon, i) => (
              <div key={i} className="w-9 h-9 rounded-full bg-card/50 border border-border/50 flex items-center justify-center text-sm hover:bg-card/80 hover:border-border cursor-pointer transition-all">
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-foreground font-semibold text-sm mb-4">서비스</h4>
          <ul className="space-y-2.5">
            {['임장 지도', '크루 임장', '전문가 Q&A', '시세 분석', '매물 알림'].map((l) => (
              <li key={l}>
                <a href="#" className="text-muted-foreground/60 text-sm hover:text-primary transition-colors">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-foreground font-semibold text-sm mb-4">회사</h4>
          <ul className="space-y-2.5">
            {['임장랩 소개', '채용 공고', '파트너십', '보도 자료', '블로그'].map((l) => (
              <li key={l}>
                <a href="#" className="text-muted-foreground/60 text-sm hover:text-primary transition-colors">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-foreground font-semibold text-sm mb-4">지원</h4>
          <ul className="space-y-2.5">
            {['고객센터', '이용 가이드', '자주 묻는 질문', '공지사항', '1:1 문의'].map((l) => (
              <li key={l}>
                <a href="#" className="text-muted-foreground/60 text-sm hover:text-primary transition-colors">{l}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground/60 text-xs">
          © 2025 임장랩. All rights reserved.
        </p>
        <div className="flex gap-6">
          {['이용약관', '개인정보처리방침', '쿠키 정책'].map((l) => (
            <a key={l} href="#" className="text-muted-foreground/60 text-xs hover:text-primary transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
