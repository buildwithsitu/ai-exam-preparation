import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  Loader2,
  Lock,
  Mail,
  RotateCcw,
  ShieldCheck,
  User,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiRegisterRequestOtp } from '../services/api';

export const RegisterPage: React.FC = () => {
  // Step 1 Registration Form State (Component Memory ONLY — NEVER stored in localStorage)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const [track, setTrack] = useState('Software Developer');

  // Step 2 OTP State (Component Memory ONLY)
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [otp, setOtp] = useState('');
  const [cooldown, setCooldown] = useState<number>(0);

  // Status & Feedback States
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const { verifyOtpAndRegister } = useAuth();
  const navigate = useNavigate();

  // 60-Second Resend Cooldown Countdown Timer
  useEffect(() => {
    if (step !== 'otp' || cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [step, cooldown]);

  // Step 1: Submit Details & Request Email OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setInfoMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    setIsSubmitting(true);
    const result = await apiRegisterRequestOtp({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      institution: institution.trim() || undefined,
      track: track || undefined,
    });
    setIsSubmitting(false);

    if (result.success) {
      setStep('otp');
      setCooldown(result.cooldownSeconds || 60);
      setInfoMessage(`We've sent a 6-digit verification code to ${email.trim().toLowerCase()}.`);
    } else {
      setErrorMessage(
        result.error?.message || 'Could not send verification code. Please check your details and try again.'
      );
    }
  };

  // Step 2: Submit OTP & Complete Registration
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setInfoMessage('');

    const cleanOtp = otp.trim();
    if (!cleanOtp || cleanOtp.length !== 6) {
      setErrorMessage('Please enter the complete 6-digit verification code.');
      return;
    }

    setIsSubmitting(true);
    const result = await verifyOtpAndRegister(email.trim().toLowerCase(), cleanOtp);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrorMessage(result.error || 'Verification failed. Please check the code and try again.');
    }
  };

  // Resend OTP Handler
  const handleResendOtp = async () => {
    if (cooldown > 0 || isResending) return;
    setErrorMessage('');
    setInfoMessage('');
    setIsResending(true);

    const result = await apiRegisterRequestOtp({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      institution: institution.trim() || undefined,
      track: track || undefined,
    });
    setIsResending(false);

    if (result.success) {
      setCooldown(result.cooldownSeconds || 60);
      setInfoMessage(`A fresh verification code has been sent to ${email.trim().toLowerCase()}.`);
      setOtp('');
    } else {
      setErrorMessage(
        result.error?.message || 'Failed to resend code. Please try again after cooldown.'
      );
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
          <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-6 max-w-xs">
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

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Info Banner */}
          {infoMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 animate-fadeIn">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{infoMessage}</span>
            </div>
          )}

          {step === 'form' ? (
            /* STEP 1: Registration Form */
            <form onSubmit={handleRequestOtp} className="space-y-4">
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
                    <span>Sending Verification Code...</span>
                  </>
                ) : (
                  <span>Send Verification Code &rarr;</span>
                )}
              </button>

              <p className="text-center text-xs text-content-secondary pt-2">
                Already have an account?{' '}
                <Link to="/login" className="text-brand-primary font-bold hover:underline">
                  Login
                </Link>
              </p>
            </form>
          ) : (
            /* STEP 2: OTP Verification Step */
            <form onSubmit={handleVerifyOtp} className="space-y-5 animate-fadeIn">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <KeyRound className="w-5 h-5 text-brand-primary" />
                    <span>Verify Your Email</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('form');
                      setErrorMessage('');
                      setInfoMessage('');
                    }}
                    className="text-xs text-content-secondary hover:text-brand-primary flex items-center gap-1 font-medium transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Edit details</span>
                  </button>
                </div>
                <p className="text-xs text-content-secondary leading-relaxed">
                  We've sent a 6-digit confirmation code to{' '}
                  <strong className="text-gray-900 font-semibold">{email}</strong>. Please enter it below to complete your registration.
                </p>
              </div>

              <div>
                <label htmlFor="otp-code" className="block text-xs font-bold uppercase tracking-wider text-content-primary mb-2">
                  6-Digit Verification Code
                </label>
                <input
                  id="otp-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  autoFocus
                  maxLength={6}
                  placeholder="• • • • • •"
                  value={otp}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setOtp(val);
                  }}
                  className="w-full py-3 px-4 text-center text-2xl font-mono font-black tracking-[0.5em] rounded-xl border border-surface-border bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all shadow-inner"
                />
                <p className="text-[11px] text-content-secondary mt-1.5 flex items-center justify-between">
                  <span>⏱️ Code expires in 10 minutes</span>
                  <span>Single-use security code</span>
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || otp.trim().length !== 6}
                className="w-full btn-pill-purple py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <span>Verify &amp; Create Account &rarr;</span>
                )}
              </button>

              {/* Resend Cooldown Section */}
              <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs gap-2">
                <span className="text-content-secondary">Didn't receive the email?</span>
                {cooldown > 0 ? (
                  <span className="font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                    Resend code in {cooldown}s
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isResending}
                    className="font-bold text-brand-primary hover:text-brand-dark flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  >
                    {isResending ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Resend Code</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <p className="text-center text-xs text-content-secondary pt-1">
                Already have an account?{' '}
                <Link to="/login" className="text-brand-primary font-bold hover:underline">
                  Login
                </Link>
              </p>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
