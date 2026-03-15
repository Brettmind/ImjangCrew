'use client';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const heroStats = [
  { value: '38,400+', label: '누적 멤버', icon: '👥' },
  { value: '124,000+', label: '임장 노트', icon: '📝' },
  { value: '97개', label: '커버 지역', icon: '📍' },
];

const heroImages = [
  'https://picsum.photos/seed/imjang1/600/800',
  'https://picsum.photos/seed/imjang2/600/800',
  'https://picsum.photos/seed/imjang3/600/800',
];

export default function Home() {
  return (
    <main className="bg-background">
      <Navbar />
      <div className="pt-16">
        <HeroSection
          title={
            <>
              발품이 곧<br />
              <span className="text-primary">데이터</span>다
            </>
          }
          subtitle="임장랩은 현장 리포트, 동영상, 임장 로그를 한 곳에 모아 스마트한 부동산 결정을 돕습니다."
          actions={[
            { text: '무료로 시작하기', onClick: () => {} },
            { text: '서비스 둘러보기', onClick: () => {}, variant: 'outline' },
          ]}
          stats={heroStats}
          images={heroImages}
        />
      </div>
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
