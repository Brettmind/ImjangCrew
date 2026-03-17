import Link from 'next/link';

export const metadata = {
  title: '이용약관 | 임장랩',
};

export default function TermsPage() {
  return (
    <main className="bg-background min-h-screen">
      <div className="container mx-auto max-w-3xl px-6 py-16">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">← 홈으로</Link>
        <h1 className="text-3xl font-bold text-foreground mb-2">이용약관</h1>
        <p className="text-sm text-muted-foreground mb-10">최종 수정일: 2026년 3월 17일</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-sm leading-relaxed text-foreground">

          <section>
            <h2 className="text-lg font-semibold mb-3">제1조 (목적)</h2>
            <p>본 약관은 임장연구소(이하 &ldquo;회사&rdquo;)가 제공하는 임장랩 서비스(이하 &ldquo;서비스&rdquo;)의 이용 조건 및 절차, 회사와 이용자 간의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">제2조 (정의)</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>&ldquo;서비스&rdquo;란 회사가 제공하는 임장 로그, 커뮤니티, 구독 등 일체의 서비스를 의미합니다.</li>
              <li>&ldquo;이용자&rdquo;란 본 약관에 동의하고 서비스를 이용하는 회원 및 비회원을 의미합니다.</li>
              <li>&ldquo;회원&rdquo;이란 회사에 개인정보를 제공하여 회원 등록을 한 자를 의미합니다.</li>
              <li>&ldquo;콘텐츠&rdquo;란 이용자가 서비스 내에 게시한 텍스트, 사진, 동영상 등 일체의 정보를 의미합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">제3조 (약관의 효력 및 변경)</h2>
            <p>본 약관은 서비스 화면에 게시하거나 이메일로 회원에게 통지함으로써 효력이 발생합니다. 회사는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 공지 후 7일이 경과하면 효력이 발생합니다. 변경에 동의하지 않는 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">제4조 (회원가입)</h2>
            <p>이용자는 회사가 정한 양식에 따라 정보를 기입하고 본 약관에 동의함으로써 회원가입을 신청합니다. 회사는 다음에 해당하는 경우 가입 신청을 거부할 수 있습니다.</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>실명이 아니거나 타인의 정보를 도용한 경우</li>
              <li>허위 정보를 기재한 경우</li>
              <li>이전에 서비스 이용 자격을 박탈당한 경우</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">제5조 (서비스 이용)</h2>
            <p>서비스는 연중무휴 24시간 제공을 원칙으로 합니다. 단, 시스템 점검·장애·천재지변 등의 사유로 일시 중단될 수 있습니다. 회사는 유료 구독 플랜(Pro, Expert)을 제공하며, 구독 요금 및 결제 조건은 서비스 내 안내를 따릅니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">제6조 (구독 및 환불)</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>구독은 월간 자동 결제 방식이며, 다음 결제일 전까지 언제든지 해지할 수 있습니다.</li>
              <li>해지 시 현재 구독 기간이 종료될 때까지 서비스를 계속 이용할 수 있습니다.</li>
              <li>결제 후 7일 이내에 서비스를 이용하지 않은 경우 환불을 요청할 수 있습니다.</li>
              <li>환불 문의: support@imjanlab.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">제7조 (이용자의 의무)</h2>
            <p>이용자는 다음 행위를 해서는 안 됩니다.</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>타인의 정보 도용 또는 허위 정보 등록</li>
              <li>서비스 운영을 방해하는 행위</li>
              <li>저작권 등 지식재산권을 침해하는 콘텐츠 게시</li>
              <li>음란, 폭력, 혐오 등 불법·유해 콘텐츠 게시</li>
              <li>상업적 광고·홍보 목적의 스팸 게시</li>
              <li>관련 법령을 위반하는 일체의 행위</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">제8조 (콘텐츠의 권리)</h2>
            <p>이용자가 서비스에 게시한 콘텐츠의 저작권은 해당 이용자에게 있습니다. 단, 이용자는 회사가 서비스 운영·홍보 목적으로 해당 콘텐츠를 사용할 수 있도록 비독점적 라이선스를 회사에 부여합니다. 회원 탈퇴 시 콘텐츠는 삭제되며, 다른 이용자와 공유된 콘텐츠는 별도 처리 기준을 따릅니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">제9조 (면책조항)</h2>
            <p>회사는 천재지변, 전쟁, 또는 이에 준하는 불가항력으로 서비스를 제공할 수 없는 경우 책임이 면제됩니다. 이용자 간 또는 이용자와 제3자 간의 분쟁에 대해 회사는 책임지지 않습니다. 이용자가 게시한 콘텐츠의 정확성, 신뢰성에 대해 회사는 보증하지 않습니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">제10조 (준거법 및 관할)</h2>
            <p>본 약관은 대한민국 법률에 따라 해석되며, 서비스 이용과 관련한 분쟁은 서울중앙지방법원을 전속 관할 법원으로 합니다.</p>
          </section>

        </div>
      </div>
    </main>
  );
}
