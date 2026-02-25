
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/books', label: 'Books' },
    { path: '/shloka', label: 'Shloka' },
    { path: '/notes/general', label: 'Notes' },
  ];

  const isActive = (path: string) => {
    if (path === '/notes/general' && location.pathname.startsWith('/notes')) return true;
    return location.pathname === path;
  };

  return (
    <nav className="bg-[#FF9933] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight scripture uppercase">Prabhupada Tracker</span>
          </Link>
          <div className="flex space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#8B0000] text-white'
                    : 'hover:bg-[#e68a2e]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
