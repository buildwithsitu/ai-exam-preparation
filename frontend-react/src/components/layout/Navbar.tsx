import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Learn', path: '/learn' },
    { label: 'Placement', path: '/placement' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-surface-border bg-surface-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-brand-primary text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
            🎓
          </div>
          <span className="font-extrabold text-xl tracking-tight text-content-primary">
            ExamMate <span className="text-brand-primary">AI</span>
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
                aria-current={isActive ? 'page' : undefined}
                className={`text-sm font-semibold transition-colors duration-200 relative py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary ${
                  isActive
                    ? 'text-brand-primary'
                    : 'text-content-secondary hover:text-brand-primary'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Auth CTA / User Controls */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hidden sm:inline-flex text-sm font-semibold text-content-primary hover:text-brand-primary px-3.5 py-1.5 transition-colors"
          >
            Log In
          </Link>
          <Link
            to="/register"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn-pill-purple text-sm px-5 py-2"
          >
            Sign Up
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-content-primary hover:bg-surface-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary md:hidden"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          >
            {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

      </div>
      <nav
        id="mobile-navigation"
        aria-label="Mobile Navigation"
        className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:hidden flex-col border-t border-surface-border px-4 py-2`}
      >
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`rounded-lg px-3 py-2.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary ${
                isActive
                  ? 'bg-brand-light text-brand-primary'
                  : 'text-content-secondary hover:bg-surface-subtle hover:text-brand-primary'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};
