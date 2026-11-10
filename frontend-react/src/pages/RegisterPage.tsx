import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Lock, Mail, User, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const [track, setTrack] = useState('Software Developer');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const result = await register({
      name,
      email,
      password,
      institution: institution || undefined,
      track: track || undefined,
    });
    setIsSubmitting(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrorMessage(result.error || 'Registration failed. Please check the details entered.');
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
            <div className="flex-1 text-center py-2 text-sm font-bold bg-brand-primary text-white rounded-lg shadow-sm">
              Register
            </div>
            <Link
              to="/login"
              className="flex-1 text-center py-2 text-sm font-semibold text-content-secondary rounded-lg hover:text-gray-900 transition-colors"
            >
              Login
            </Link>
          </div>

          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="register-name" className="block text-xs font-bold uppercase tracking-wider text-content-primary mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  id="register-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Situ Chandra"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="register-email" className="block text-xs font-bold uppercase tracking-wider text-content-primary mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  id="register-email"
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
              <label htmlFor="register-password" className="block text-xs font-bold uppercase tracking-wider text-content-primary mb-1.5">
                Create Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label htmlFor="register-track" className="block text-xs font-bold uppercase tracking-wider text-content-primary mb-1">
                  Target Track
                </label>
                <select
                  id="register-track"
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-surface-border text-xs bg-surface-card focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                >
                  <option value="Software Developer">Software Developer</option>
                  <option value="Data Analyst">Data Analyst</option>
                  <option value="Data Scientist">Data Scientist</option>
                </select>
              </div>

              <div>
                <label htmlFor="register-institution" className="block text-xs font-bold uppercase tracking-wider text-content-primary mb-1">
                  College / University
                </label>
                <input
                  id="register-institution"
                  type="text"
                  placeholder="e.g. JNU, New Delhi"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-surface-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-pill-purple py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all mt-2 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create Account &rarr;</span>
              )}
            </button>

            <p className="text-center text-xs text-content-secondary pt-2">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-primary font-bold hover:underline">
                Login
              </Link>
            </p>
          </form>

        </div>

      </div>
    </div>
  );
};
