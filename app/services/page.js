import Navbar from '@/components/sections/Navbar';
import Services from '@/components/sections/Services';
import CTABanner from '@/components/sections/CTABanner';
import Footer from '@/components/sections/Footer';

export const metadata = {
  title: 'Our Services | Probox Infotech',
  description: 'Explore our comprehensive IT services including web development, mobile apps, cloud solutions, data analytics, cybersecurity, and IT consulting.',
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              End-to-End Technology Solutions
            </h1>
            <p className="text-xl text-white/70">
              From strategy to execution, we provide comprehensive IT services 
              tailored to drive your business forward.
            </p>
          </div>
        </div>
      </section>
      
      <Services showAll={true} />
      <CTABanner />
      <Footer />
    </main>
  );
}
