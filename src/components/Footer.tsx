// src/components/Footer.tsx
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';  // make sure this path is correct

const Footer: React.FC = () => {
  return (
    <footer className="bg-lk-primary text-white py-9">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo + About */}
          <div className="col-span-2">
            <Logo
              className="h-14 w-auto mb-4 text-white"
              aria-label="LKRM Logo"
            />
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering high school coaches with the tools they need to build winning teams 
              and develop student-athletes both on and off the field.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-gray-300">
                <Mail size={20} className="mr-2" />
                <span>andrew@lkrmsports.com</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pilot-program" className="hover:text-white transition-colors">
                  Pilot Program
                </a>
              </li>
              <li>
                <a href="#outcomes" className="hover:text-white transition-colors">
                  Outcomes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 LKRM, LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
