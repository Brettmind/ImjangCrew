import Navbar from '@/components/Navbar';
import { ImageCarouselHero } from '@/components/Hero';
import Stats from '@/components/Stats';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Areas from '@/components/Areas';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const heroImages = [
  { id: '1', src: 'https://picsum.photos/seed/apt1/320/400', alt: '아파트 임장', rotation: -8 },
  { id: '2', src: 'https://picsum.photos/seed/house2/320/400', alt: '주택 임장', rotation: 5 },
  { id: '3', src: 'https://picsum.photos/seed/street3/320/400', alt: '거리 임장', rotation: -3 },
  { id: '4', src: 'https://picsum.photos/seed/map4/320/400', alt: '지역 지도', rotation: 10 },
  { id: '5', src: 'https://picsum.photos/seed/build5/320/400', alt: '건물 외관', rotation: -6 },
  { id: '6', src: 'https://picsum.photos/seed/nbhd6/320/400', alt: '동네 풍경', rotation: 7 },
];

const heroFeatures = [
  {
    title: '현장 임장 리포트',
    description: '멤버들이 직접 발로 뛴 생생한 현장 리포트를 확인하세요.',
  },
  {
    title: '임장 동영상',
    description: '텍스트로 담지 못한 현장감을 동영상으로 생생하게 전달합니다.',
  },
  {
    title: '임장 로그',
    description: '체크리스트 기반으로 빠짐없이 기록된 임장 데이터를 활용하세요.',
  },
];

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <ImageCarouselHero
        title="발품이 곧 데이터다"
        subtitle="ImjangLab"
        description="임장랩은 현장 리포트, 동영상, 임장 로그를 한 곳에 모아 스마트한 부동산 결정을 돕습니다."
        ctaText="무료로 랩 합류하기"
        images={heroImages}
        features={heroFeatures}
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
