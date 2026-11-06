import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Learn', path: '/learn' },
    { label: 'Placement', path: '/placement' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#5B3CE8] text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
            🎓
          </div>
          <span className="font-extrabold text-xl tracking-tight text-[#120E2C]">
            ExamMate <span className="text-[#5B3CE8]">AI</span>
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors duration-200 relative py-1 ${
                  isActive
                    ? 'text-[#5B3CE8]'
                    : 'text-gray-600 hover:text-[#5B3CE8]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5B3CE8] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Auth CTA / User Controls */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-semibold text-[#120E2C] hover:text-[#5B3CE8] px-3.5 py-1.5 transition-colors"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="btn-pill-purple text-sm px-5 py-2"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </header>
  );
};
