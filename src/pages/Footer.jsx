import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSectionNavigation = (sectionId) => {
    // If we're not on the home page, navigate to home first
    if (window.location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        scrollToTop();
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      }, 100);
    } else {
      // If we're already on the home page, just scroll to the section
      scrollToTop();
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <footer className="bg-[#0f051d] border-t border-indigo-900/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* TrustChain Description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">Trust<span className="text-indigo-400">Chain</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              A blockchain-powered platform revolutionizing academic credential verification. 
              TrustChain ensures tamper-proof certificates with instant verification 
              capabilities for institutions, students, and employers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" onClick={scrollToTop} className="text-gray-400 hover:text-white transition text-sm">Home</Link>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionNavigation('services-section')}
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionNavigation('about-section')}
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  About
                </button>
              </li>
              <li>
                <Link to="/login" onClick={scrollToTop} className="text-gray-400 hover:text-white transition text-sm">Verify Certificate</Link>
              </li>
              <li>
                <Link to="/contact" onClick={scrollToTop} className="text-gray-400 hover:text-white transition text-sm">Contact Us</Link>
              </li>
              <li>
                <Link to="/forum" onClick={scrollToTop} className="text-gray-400 hover:text-white transition text-sm">Discussion Forum</Link>
              </li>
            </ul>
          </div>

          {/* Technology Stack */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">Our Technology</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400 text-sm">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                Ethereum Blockchain
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                IPFS Storage
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                Smart Contracts
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                React Frontend
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                Node.js Backend
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">Stay Updated</h3>
            <p className="text-gray-400 text-sm">
              Subscribe to our newsletter for the latest updates on TrustChain features and blockchain in education.
            </p>
            <form className="mt-4 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="appearance-none min-w-0 w-full bg-[#1c0a35] border border-indigo-500/20 rounded-md px-4 py-2 text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full bg-indigo-500 hover:bg-indigo-600 flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-indigo-900/20 my-8"></div>

        {/* Bottom Footer */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">Cookie Policy</a>
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; {new Date().getFullYear()} TrustChain. All rights reserved.
          </p>
        </div>

        {/* Blockchain Verification Badge */}
        <div className="mt-8 flex justify-center">
          <div className="bg-[#1c0a35] px-4 py-2 rounded-full border border-indigo-500/20 flex items-center">
            <svg className="w-5 h-5 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-xs text-gray-400">All credentials secured on the Ethereum blockchain</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;