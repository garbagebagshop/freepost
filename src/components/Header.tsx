import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, Search } from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="bg-white border-b border-gray-300 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-xl text-gray-900 hover:text-blue-600">
            FreePostIndia.com
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 px-3 py-2 rounded transition-colors ${
                location.pathname === '/' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <Home size={18} />
              <span className="hidden sm:inline">Home</span>
            </Link>
            
            <Link 
              to="/search" 
              className={`flex items-center space-x-1 px-3 py-2 rounded transition-colors ${
                location.pathname === '/search' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <Search size={18} />
              <span className="hidden sm:inline">Search</span>
            </Link>
            
            <Link 
              to="/post" 
              className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition-colors flex items-center space-x-1"
            >
              <PlusCircle size={18} />
              <span>Post Free Ad</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};