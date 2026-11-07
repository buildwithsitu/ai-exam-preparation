import React from 'react';
import { Link } from 'react-router-dom';

export const CareerPathsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-content-primary">Choose Your Career Path</h1>
        <p className="text-content-secondary text-base">Select a role, follow a structured roadmap, and get job-ready.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            id: 'software-dev',
            title: 'Software Developer',
            desc: 'Build full-stack applications, solve real problems, and prepare for developer roles.',
            tags: ['DSA', 'Web Dev', 'Projects'],
            active: true,
          },
          {
            id: 'data-analyst',
            title: 'Data Analyst',
            desc: 'Work with data, find insights, and build a career in data analytics.',
            tags: ['Python', 'SQL', 'Power BI'],
            active: false,
          },
          {
            id: 'data-scientist',
            title: 'Data Scientist',
            desc: 'Learn data, machine learning, and build real-world AI projects.',
            tags: ['Python', 'ML', 'Projects'],
            active: false,
          },
        ].map((role) => (
          <div key={role.id} id={role.id} className="bg-surface-card p-8 rounded-3xl border border-surface-border shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-brand-primary flex items-center justify-center font-bold text-xl">
                &lt;/&gt;
              </div>
              <h2 className="text-2xl font-bold text-content-primary">{role.title}</h2>
              <p className="text-sm text-content-secondary leading-relaxed">{role.desc}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {role.tags.map((t) => (
                  <span key={t} className="text-xs font-semibold px-3 py-1 bg-gray-100 text-content-primary rounded-lg">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <Link
                to="/learn"
                className={`w-full text-center py-2.5 rounded-full text-sm font-bold block transition-all ${
                  role.active ? 'bg-brand-primary text-white shadow-sm' : 'border border-brand-primary text-brand-primary hover:bg-purple-50'
                }`}
              >
                Choose Path &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
