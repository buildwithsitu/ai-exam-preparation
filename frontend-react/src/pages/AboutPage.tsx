import React from 'react';
import { Target, Compass, Sparkles, MapPin, Mail, Linkedin, Instagram } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Intro */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand-primary text-xs font-bold">
            Honest Academic Standards
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-content-primary tracking-tight">
            About ExamMate AI
          </h1>
          <p className="text-lg text-content-secondary leading-relaxed">
            A placement-focused learning platform built to help students master in-demand tech skills, construct real production projects, prepare for rigorous interviews, and become job-ready.
          </p>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-sm aspect-[4/3] bg-gradient-to-br from-brand-light to-white rounded-3xl p-6 border border-surface-border shadow-lg flex items-center justify-center">
            <img
              src="/about-hero-illustration.svg"
              alt="About ExamMate AI Illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* 3 Bento Cards (Screen 2 Mockup) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Mission */}
        <div className="bg-surface-card p-8 rounded-2xl border border-surface-border shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-brand-primary flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-content-primary">Our Mission</h2>
          <p className="text-sm text-content-secondary leading-relaxed">
            To provide a practical, authentic, and structured learning path to help every student clear competitive tech interviews and secure career placements.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-surface-card p-8 rounded-2xl border border-surface-border shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-content-primary">Our Vision</h2>
          <p className="text-sm text-content-secondary leading-relaxed">
            To become a trusted, transparent platform where students build tangible skills and gain verifiable job readiness without vanity metrics.
          </p>
        </div>

        {/* Approach */}
        <div className="bg-surface-card p-8 rounded-2xl border border-surface-border shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-content-primary">Our Approach</h2>
          <p className="text-sm text-content-secondary leading-relaxed">
            Learn &rarr; Practice &rarr; Build &rarr; Prepare &rarr; Apply. Hands-on coding problems, industry portfolio projects, and realistic interview simulations.
          </p>
        </div>

      </section>

      {/* Founder & Campus Coordinates */}
      <section className="bg-surface-card p-8 rounded-3xl border border-surface-border shadow-sm">
        <h2 className="text-2xl font-bold text-content-primary mb-6">Team &amp; Coordinates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-content-primary">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
            <div>
              <strong className="block text-gray-900">Direct Contact:</strong>
              <a href="mailto:situsavvy1111@gmail.com" className="text-brand-primary hover:underline">
                situsavvy1111@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
            <div>
              <strong className="block text-gray-900">Location:</strong>
              <span>Jawaharlal Nehru University (JNU), New Delhi, India</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-surface-border flex flex-wrap gap-4">
          <a
            href="https://www.linkedin.com/in/buildwithsitu/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:underline"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn Profile</span>
          </a>
          <a
            href="https://www.instagram.com/is_situ/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-pink-600 hover:underline"
          >
            <Instagram className="w-4 h-4" />
            <span>Instagram Profile</span>
          </a>
        </div>
      </section>

    </div>
  );
};
