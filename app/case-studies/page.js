import Navbar from '@/components/sections/Navbar';
import CaseStudies from '@/components/sections/CaseStudies';
import CTABanner from '@/components/sections/CTABanner';
import Footer from '@/components/sections/Footer';

export const metadata = {
  title: 'Case Studies | Probox Infotech',
  description: 'Explore our success stories and see how we have helped businesses across industries achieve their digital transformation goals.',
}

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Case Studies</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              Our Success Stories
            </h1>
            <p className="text-xl text-white/70">
              Discover how we've helped businesses across industries transform 
              their operations and achieve remarkable results.
            </p>
          </div>
        </div>
      </section>
      
      <CaseStudies showAll={true} />
      <CTABanner />
      <Footer />
    </main>
  );
}
