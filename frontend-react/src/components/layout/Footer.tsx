import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-[#120E2C]">ExamMate <span className="text-[#5B3CE8]">AI</span></span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Modern Career &amp; Placement Preparation Platform for ambitious tech students. Build skills, build real projects, and get placed.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-[#120E2C] uppercase tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/career-paths" className="hover:text-[#5B3CE8] transition-colors">Career Paths</Link></li>
              <li><Link to="/learn" className="hover:text-[#5B3CE8] transition-colors">Learning Hub</Link></li>
              <li><Link to="/practice" className="hover:text-[#5B3CE8] transition-colors">Coding Practice</Link></li>
              <li><Link to="/projects" className="hover:text-[#5B3CE8] transition-colors">Projects Hub</Link></li>
              <li><Link to="/placement" className="hover:text-[#5B3CE8] transition-colors">Placement Preparation</Link></li>
            </ul>
          </div>

          {/* Student Hub */}
          <div>
            <h4 className="font-bold text-sm text-[#120E2C] uppercase tracking-wider mb-3">Student Hub</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/dashboard" className="hover:text-[#5B3CE8] transition-colors">Student Dashboard</Link></li>
              <li><Link to="/assessment" className="hover:text-[#5B3CE8] transition-colors">Assessments &amp; Mocks</Link></li>
              <li><Link to="/performance" className="hover:text-[#5B3CE8] transition-colors">Performance Insights</Link></li>
              <li><Link to="/profile" className="hover:text-[#5B3CE8] transition-colors">Profile &amp; Settings</Link></li>
              <li><Link to="/about" className="hover:text-[#5B3CE8] transition-colors">About ExamMate AI</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="font-bold text-sm text-[#120E2C] uppercase tracking-wider mb-3">Need Assistance?</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p>Email: <a href="mailto:situsavvy1111@gmail.com" className="text-[#5B3CE8] hover:underline font-medium">situsavvy1111@gmail.com</a></p>
              <p>Location: <span className="font-medium text-gray-800">JNU, New Delhi, India</span></p>
              <div className="flex gap-4 pt-2">
                <a
                  href="https://www.linkedin.com/in/buildwithsitu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5B3CE8] hover:underline text-xs font-semibold"
                >
                  LinkedIn Profile &rarr;
                </a>
                <a
                  href="https://www.instagram.com/is_situ/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:underline text-xs font-semibold"
                >
                  Instagram &rarr;
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>&copy; {new Date().getFullYear()} ExamMate AI. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/contact" className="hover:text-gray-600">Support Desk</Link>
            <Link to="/about" className="hover:text-gray-600">About Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
