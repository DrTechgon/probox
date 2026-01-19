import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import CaseStudies from '@/components/sections/CaseStudies';
import Stats from '@/components/sections/Stats';
import Testimonials from '@/components/sections/Testimonials';
import CTABanner from '@/components/sections/CTABanner';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <CaseStudies limit={3} />
      <Stats />
      <Testimonials />
      <CTABanner />
      <Footer />
    </main>
  );
}
