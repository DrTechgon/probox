'use client';

import Link from 'next/link';
import { companyInfo, navigation, services } from '@/data/site-data';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-xl font-bold">{companyInfo.name}</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              {companyInfo.description}
            </p>
            <div className="flex space-x-4">
              <a href={companyInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                <Linkedin size={18} />
              </a>
              <a href={companyInfo.social.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-blue-400 flex items-center justify-center transition-colors">
                <Twitter size={18} />
              </a>
              <a href={companyInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-blue-700 flex items-center justify-center transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-slate-400 hover:text-white transition-colors flex items-center group">
                    <ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link href={`/services#${service.id}`} className="text-slate-400 hover:text-white transition-colors flex items-center group">
                    <ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-blue-400 mt-0.5" />
                <span className="text-slate-400 text-sm">{companyInfo.email}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-blue-400 mt-0.5" />
                <span className="text-slate-400 text-sm">{companyInfo.phone}</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400 text-sm">{companyInfo.address}</span>
              </li>
            </ul>
            <div className="pt-4 border-t border-slate-800">
              <h5 className="text-sm font-medium mb-3">Subscribe to Newsletter</h5>
              <div className="flex space-x-2">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 px-4">
                  <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-slate-500">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
