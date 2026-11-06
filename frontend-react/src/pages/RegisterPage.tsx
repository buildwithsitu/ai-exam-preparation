import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Lock, Mail, User } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Deep Purple Value Banner */}
        <div className="md:col-span-5 bg-[#120E2C] text-white p-8 sm:p-10 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎓</span>
              <span className="font-extrabold text-xl">ExamMate AI</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black leading-tight">
              Start Your Placement Journey
            </h2>

            <ul className="space-y-3.5 text-sm text-gray-300">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#5B3CE8] shrink-0" />
                <span>Learn industry-relevant skills</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#5B3CE8] shrink-0" />
                <span>Practice coding &amp; aptitude</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#5B3CE8] shrink-0" />
                <span>Build real-world projects</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#5B3CE8] shrink-0" />
                <span>Prepare for technical &amp; HR interviews</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#5B3CE8] shrink-0" />
                <span>Track your placement progress</span>
              </li>
            </ul>
          </div>

          <p className="text-xs text-gray-500 pt-6">
            &copy; 2026 ExamMate AI. All rights reserved.
          </p>
        </div>

        {/* Right Form Card */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          
          {/* Tab Switcher */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-8 max-w-xs">
            <div className="flex-1 text-center py-2 text-sm font-bold bg-[#5B3CE8] text-white rounded-lg shadow-sm">
              Register
            </div>
            <Link
              to="/login"
              className="flex-1 text-center py-2 text-sm font-semibold text-gray-600 rounded-lg hover:text-gray-900 transition-colors"
            >
              Login
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Situ Chandra"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B3CE8]/20 focus:border-[#5B3CE8] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B3CE8]/20 focus:border-[#5B3CE8] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Create Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B3CE8]/20 focus:border-[#5B3CE8] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-pill-purple py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all mt-2"
            >
              Create Account &rarr;
            </button>

            <p className="text-center text-xs text-gray-500 pt-2">
              Already have an account?{' '}
              <Link to="/login" className="text-[#5B3CE8] font-bold hover:underline">
                Login
              </Link>
            </p>
          </form>

        </div>

      </div>
    </div>
  );
};
