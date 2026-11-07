import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Lock, Mail } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-4xl bg-surface-card rounded-3xl shadow-xl border border-surface-border overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Deep Purple Value Banner */}
        <div className="md:col-span-5 bg-brand-ink text-white p-8 sm:p-10 flex flex-col justify-between">
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
                <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" />
                <span>Learn industry-relevant skills</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" />
                <span>Practice coding &amp; aptitude</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" />
                <span>Build real-world projects</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" />
                <span>Prepare for technical &amp; HR interviews</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" />
                <span>Track your placement progress</span>
              </li>
            </ul>
          </div>

          <p className="text-xs text-content-secondary pt-6">
            &copy; 2026 ExamMate AI. All rights reserved.
          </p>
        </div>

        {/* Right Form Card */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          
          {/* Tab Switcher */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-8 max-w-xs">
            <Link
              to="/register"
              className="flex-1 text-center py-2 text-sm font-semibold text-content-secondary rounded-lg hover:text-gray-900 transition-colors"
            >
              Register
            </Link>
            <div className="flex-1 text-center py-2 text-sm font-bold bg-brand-primary text-white rounded-lg shadow-sm">
              Login
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="block text-xs font-bold uppercase tracking-wider text-content-primary mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="block text-xs font-bold uppercase tracking-wider text-content-primary mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-pill-purple py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              Log In to Workspace &rarr;
            </button>

            <p className="text-center text-xs text-content-secondary pt-2">
              Don't have an account?{' '}
              <Link to="/register" className="text-brand-primary font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </form>

        </div>

      </div>
    </div>
  );
};
