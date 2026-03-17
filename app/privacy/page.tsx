import Link from 'next/link';

export const metadata = {
  title: '개인정보처리방침 | 임장랩',
};

export default function PrivacyPage() {
  return (
    <main className="bg-background min-h-screen">
      <div className="container mx-auto max-w-3xl px-6 py-16">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">← 홈으로</Link>
        <h1 className="text-3xl font-bold text-foreground mb-2">개인정보처리방침</h1>
        <p className="text-sm text-muted-foreground mb-10">최종 수정일: 2026년 3월 17일</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-sm leading-relaxed text-foreground">

          <section>
            <h2 className="text-lg font-semibold mb-3">1. 개요</h2>
            <p>임장연구소(이하 &ldquo;회사&rdquo;)는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」 및 관련 법령을 준수합니다. 본 방침은 회사가 제공하는 임장랩 서비스(이하 &ldquo;서비스&rdquo;)를 이용하는 과정에서 수집되는 개인정보의 처리 방법을 안내합니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">2. 수집하는 개인정보 항목</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>회원가입 시:</strong> 이메일 주소, 닉네임, 비밀번호(암호화 저장)</li>
              <li><strong>서비스 이용 시:</strong> 임장 로그, 업로드 사진·동영상, 댓글, 퀘스트 활동 기록</li>
              <li><strong>결제 시:</strong> 결제 수단 정보(Stripe를 통해 처리, 회사는 카드 번호를 직접 저장하지 않음), 구독 이력</li>
              <li><strong>자동 수집:</strong> IP 주소, 브라우저 종류, 방문 일시, 서비스 이용 기록, 쿠키</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">3. 개인정보 수집 및 이용 목적</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>회원 인증 및 계정 관리</li>
              <li>서비스 제공 및 운영</li>
              <li>구독 결제 처리 및 이력 관리</li>
              <li>공지사항 전달 및 고객 지원</li>
              <li>서비스 품질 개선 및 통계 분석</li>
              <li>법적 의무 이행</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">4. 개인정보 보유 및 이용 기간</h2>
            <p>회원 탈퇴 시 즉시 파기합니다. 단, 관계 법령에 따라 아래 정보는 일정 기간 보관됩니다.</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래법)</li>
              <li>대금결제 및 재화 공급에 관한 기록: 5년 (전자상거래법)</li>
              <li>소비자 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래법)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">5. 개인정보 제3자 제공</h2>
            <p>회사는 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다. 단, 결제 처리를 위해 Stripe Inc.에 필요한 정보를 제공하며, Stripe의 개인정보처리방침이 적용됩니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">6. 이용자의 권리</h2>
            <p>이용자는 언제든지 자신의 개인정보에 대해 다음 권리를 행사할 수 있습니다.</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>개인정보 열람 요청</li>
              <li>개인정보 정정·삭제 요청</li>
              <li>개인정보 처리 정지 요청</li>
              <li>회원 탈퇴 (서비스 내 계정 설정에서 가능)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">7. 쿠키 사용</h2>
            <p>서비스는 로그인 상태 유지 및 이용 편의를 위해 쿠키를 사용합니다. 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나, 일부 서비스 이용이 제한될 수 있습니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">8. 개인정보 보호책임자</h2>
            <p>개인정보 관련 문의는 아래로 연락주세요.</p>
            <ul className="list-none pl-0 mt-2 space-y-1">
              <li>담당 부서: 임장연구소 운영팀</li>
              <li>이메일: privacy@imjanlab.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">9. 방침 변경</h2>
            <p>본 방침은 법령·서비스 변경에 따라 수정될 수 있으며, 변경 시 서비스 내 공지를 통해 안내합니다.</p>
          </section>

        </div>
      </div>
    </main>
  );
}
