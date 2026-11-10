import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Lock, Mail, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, loginOfflineDemo } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrorMessage(result.error || 'Failed to sign in. Please verify your credentials.');
    }
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

          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

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
              disabled={isSubmitting}
              className="w-full btn-pill-purple py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Log In to Workspace &rarr;</span>
              )}
            </button>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-surface-border"></div>
              <span className="flex-shrink mx-3 text-[11px] text-content-secondary uppercase font-bold tracking-wider">or</span>
              <div className="flex-grow border-t border-surface-border"></div>
            </div>

            <button
              type="button"
              onClick={() => {
                loginOfflineDemo();
                navigate('/dashboard');
              }}
              className="w-full py-2.5 rounded-full border border-surface-border text-xs font-bold text-content-primary hover:bg-surface-subtle transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore as Demo Student (Situ Chandra) &rarr;</span>
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
