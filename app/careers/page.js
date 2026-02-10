import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import CareersHero from '@/components/careers/CareersHero';
import WhyJoinUs from '@/components/careers/WhyJoinUs';
import JobListings from '@/components/careers/JobListings';
import LifeAtCompany from '@/components/careers/LifeAtCompany';
import HiringProcess from '@/components/careers/HiringProcess';
import GeneralApplication from '@/components/careers/GeneralApplication';

export const metadata = {
  title: 'Careers | Join PROBOX - Build the Future With Us',
  description: 'Explore career opportunities at PROBOX Infotech. Join our team of innovators and work on cutting-edge technology projects with global impact.',
  keywords: 'careers, jobs, PROBOX, technology jobs, IT careers, software engineer, developer jobs, India jobs',
};

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <CareersHero />
      <WhyJoinUs />
      <JobListings />
      <LifeAtCompany />
      <HiringProcess />
      <GeneralApplication />
      <Footer />
    </main>
  );
}
