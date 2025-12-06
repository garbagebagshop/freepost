import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-4">FreePostIndia.com</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              India's fastest free classified posting site. Post your ads instantly and reach millions of buyers across India.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link></li>
              <li><Link to="/post" className="text-gray-600 hover:text-blue-600">Post Free Ad</Link></li>
              <li><Link to="/search" className="text-gray-600 hover:text-blue-600">Search Ads</Link></li>
              <li><Link to="/safety-tips" className="text-gray-600 hover:text-blue-600">Safety Tips</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="text-gray-600 hover:text-blue-600">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="text-gray-600 hover:text-blue-600">Disclaimer</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Popular Cities</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/search?city=mumbai" className="text-gray-600 hover:text-blue-600">Mumbai</Link></li>
              <li><Link to="/search?city=delhi" className="text-gray-600 hover:text-blue-600">Delhi</Link></li>
              <li><Link to="/search?city=bangalore" className="text-gray-600 hover:text-blue-600">Bangalore</Link></li>
              <li><Link to="/search?city=chennai" className="text-gray-600 hover:text-blue-600">Chennai</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-300 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            &copy; 2025 FreePostIndia.com. All rights reserved. | 
            <span className="font-semibold text-red-600 ml-1">
              We are not responsible for transactions. We don't collect payments.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};