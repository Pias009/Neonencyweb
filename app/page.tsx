
import { HeroSection } from '@/components/hero-section';
import { FeaturesSection } from '@/components/features-section';
import { CTASection } from '@/components/cta-section';
import { FeaturedNewsSection } from '@/components/featured-news-section';

export const dynamic = 'force-dynamic'; // Add this line to force dynamic rendering

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
         <FeaturedNewsSection />
      <CTASection />
    </>
  );
}
