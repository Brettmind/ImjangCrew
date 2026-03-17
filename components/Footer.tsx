import Link from 'next/link';

const Footer = () => (
  <footer className="bg-muted/40 border-t border-border px-6 py-16">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 mb-12">
        <div className="sm:col-span-2">
          <div className="text-xl font-bold text-foreground mb-3">
            임장<span className="text-primary">랩</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
            발품을 팔면 기회가 보입니다. 전국의 멤버들과 함께 현장 중심 부동산 투자를 경험하세요.
          </p>
        </div>

        {[
          { title: '서비스', links: ['임장 지도', '임장 동영상', '임장 리포트', '시세 분석', '매물 알림'] },
          { title: '회사', links: ['임장연구소 소개', '채용 공고', '파트너십', '보도 자료', '블로그'] },
          { title: '지원', links: ['고객센터', '이용 가이드', 'FAQ', '공지사항', '1:1 문의'] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-foreground font-semibold text-sm mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-muted-foreground text-sm hover:text-foreground transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground text-xs">© 2025 임장연구소. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/terms" className="text-muted-foreground text-xs hover:text-foreground transition-colors">이용약관</Link>
          <Link href="/privacy" className="text-muted-foreground text-xs hover:text-foreground transition-colors">개인정보처리방침</Link>
          <a href="#" className="text-muted-foreground text-xs hover:text-foreground transition-colors">쿠키 정책</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
