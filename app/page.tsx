import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Areas from '@/components/Areas';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero
        trustBadge={{
          text: '임장 전문가들이 직접 발로 뛴 정보',
          icons: ['🏠', '📍', '✅'],
        }}
        headline={{
          line1: '임장의 모든 것,',
          line2: 'Imjang Crew',
        }}
        subtitle="발품 팔아야 진짜 정보가 보입니다. 임장 크루와 함께 현장을 직접 확인하고 스마트한 부동산 결정을 내리세요."
        buttons={{
          primary: { text: '무료로 크루 합류하기' },
          secondary: { text: '크루 둘러보기' },
        }}
      />
      <Stats />
      <Features />
      <HowItWorks />
      <Areas />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
