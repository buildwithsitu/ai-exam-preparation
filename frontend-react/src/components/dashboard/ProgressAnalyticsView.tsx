import React from 'react';
import { TrendingUp, BarChart2, Award, Flame, Target } from 'lucide-react';

export const ProgressAnalyticsView: React.FC = () => {
  return (
    <div className="space-y-8">
      
      {/* Header with 30-Day Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-content-primary">My Progress</h2>
          <p className="text-sm text-content-secondary mt-1">Track your learning, practice and placement readiness.</p>
        </div>
        <select className="bg-surface-card border border-surface-border text-xs font-bold rounded-full px-4 py-2 self-start sm:self-auto focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary">
          <option>Last 30 Days ▾</option>
          <option>Last 60 Days</option>
          <option>All Time</option>
        </select>
      </div>

      {/* 5 KPI Stat Cards (Screen 9 in Mockup 2) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-surface-card p-4 rounded-2xl border border-surface-border shadow-sm text-center">
          <p className="text-2xl font-black text-content-primary">56%</p>
          <p className="text-[11px] text-content-secondary font-medium">Overall Progress</p>
        </div>

        <div className="bg-surface-card p-4 rounded-2xl border border-surface-border shadow-sm text-center">
          <p className="text-2xl font-black text-content-primary">24</p>
          <p className="text-[11px] text-content-secondary font-medium">Practice Done</p>
        </div>

        <div className="bg-surface-card p-4 rounded-2xl border border-surface-border shadow-sm text-center">
          <p className="text-2xl font-black text-content-primary">3</p>
          <p className="text-[11px] text-content-secondary font-medium">Projects</p>
        </div>

        <div className="bg-surface-card p-4 rounded-2xl border border-surface-border shadow-sm text-center">
          <p className="text-2xl font-black text-content-primary">2</p>
          <p className="text-[11px] text-content-secondary font-medium">Mock Interviews</p>
        </div>

        <div className="bg-surface-card p-4 rounded-2xl border border-surface-border shadow-sm text-center">
          <p className="text-2xl font-black text-content-primary">15</p>
          <p className="text-[11px] text-content-secondary font-medium">Days Streak 🔥</p>
        </div>
      </div>

      {/* 2-Column Split: Topic Performance & Progress Over Time SVG Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Topic-wise Performance */}
        <div className="lg:col-span-6 bg-surface-card p-6 sm:p-7 rounded-3xl border border-surface-border shadow-sm space-y-5">
          <h3 className="font-bold text-sm uppercase tracking-wider text-content-secondary">Topic-wise Performance</h3>
          
          <div className="space-y-4 text-xs font-bold">
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-content-primary">DSA</span>
                <span className="text-brand-primary">62%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-brand-primary h-full rounded-full" style={{ width: '62%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-content-primary">Web Development</span>
                <span className="text-brand-primary">78%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-brand-primary h-full rounded-full" style={{ width: '78%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-content-primary">SQL</span>
                <span className="text-brand-primary">55%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-brand-primary h-full rounded-full" style={{ width: '55%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-content-primary">Python</span>
                <span className="text-brand-primary">70%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-brand-primary h-full rounded-full" style={{ width: '70%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Progress Over Time (SVG Line Curve) */}
        <div className="lg:col-span-6 bg-surface-card p-6 sm:p-7 rounded-3xl border border-surface-border shadow-sm flex flex-col justify-between">
          <h3 className="font-bold text-sm uppercase tracking-wider text-content-secondary mb-4">Progress Over Time</h3>
          
          <div className="w-full h-48 flex items-center justify-center">
            <svg viewBox="0 0 400 160" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="progressGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-brand-primary)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="var(--color-brand-primary)" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="30" y1="20" x2="380" y2="20" stroke="var(--color-surface-border)" strokeWidth="1" />
              <line x1="30" y1="60" x2="380" y2="60" stroke="var(--color-surface-border)" strokeWidth="1" />
              <line x1="30" y1="100" x2="380" y2="100" stroke="var(--color-surface-border)" strokeWidth="1" />
              <line x1="30" y1="140" x2="380" y2="140" stroke="var(--color-surface-border)" strokeWidth="1" />

              {/* Y Axis percentage markers */}
              <text x="5" y="24" fontSize="9" fill="var(--color-content-secondary)" fontWeight="600">100%</text>
              <text x="5" y="64" fontSize="9" fill="var(--color-content-secondary)" fontWeight="600">75%</text>
              <text x="5" y="104" fontSize="9" fill="var(--color-content-secondary)" fontWeight="600">50%</text>
              <text x="5" y="144" fontSize="9" fill="var(--color-content-secondary)" fontWeight="600">25%</text>

              {/* Shaded Area */}
              <path
                d="M 50 130 C 130 110, 210 70, 290 45 L 370 25 L 370 140 L 50 140 Z"
                fill="url(#progressGrad)"
              />

              {/* Upward Progress Line */}
              <path
                d="M 50 130 C 130 110, 210 70, 290 45 L 370 25"
                fill="none"
                stroke="var(--color-brand-primary)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Data Points */}
              <circle cx="50" cy="130" r="4" fill="var(--color-brand-primary)" />
              <circle cx="160" cy="98" r="4" fill="var(--color-brand-primary)" />
              <circle cx="270" cy="52" r="4" fill="var(--color-brand-primary)" />
              <circle cx="370" cy="25" r="5" fill="var(--color-brand-primary)" stroke="var(--color-surface-card)" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex justify-between text-[11px] font-bold text-gray-400 pt-2 border-t border-gray-50 px-4">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
          </div>
        </div>

      </div>

    </div>
  );
};
