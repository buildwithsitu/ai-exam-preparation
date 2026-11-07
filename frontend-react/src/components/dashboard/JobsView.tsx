import React, { useState } from 'react';
import { Briefcase, Building2, MapPin, ExternalLink } from 'lucide-react';

export const JobsView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All Jobs');

  const filters = ['All Jobs', 'Internships', 'Fresher', 'Remote'];

  const jobs = [
    {
      id: 1,
      title: 'Software Developer – Fresher',
      company: 'Tata Consultancy Services (TCS)',
      tags: ['Fresher', 'Full-time', 'Remote'],
      type: 'Fresher',
      icon: 'tcs',
    },
    {
      id: 2,
      title: 'Data Analyst – Intern',
      company: 'Infosys',
      tags: ['Internship', '0-1 Year', 'Hybrid'],
      type: 'Internships',
      icon: 'infosys',
    },
    {
      id: 3,
      title: 'Frontend Developer – Fresher',
      company: 'Wipro',
      tags: ['Fresher', 'Full-time', 'Bangalore'],
      type: 'Fresher',
      icon: 'wipro',
    },
  ];

  const filteredJobs = activeFilter === 'All Jobs'
    ? jobs
    : activeFilter === 'Remote'
      ? jobs.filter(j => j.tags.includes('Remote'))
      : jobs.filter(j => j.type === activeFilter || j.tags.includes(activeFilter));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-content-primary">Job Opportunities</h2>
        <p className="text-sm text-content-secondary mt-1">Explore job and internship opportunities for freshers.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeFilter === filter
                ? 'bg-brand-primary text-white shadow-sm'
                : 'bg-surface-card text-content-primary hover:bg-gray-100 border border-surface-border'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Jobs List (Screen 8 in Mockup 2) */}
      <div className="space-y-4">
        {filteredJobs.map(job => (
          <div key={job.id} className="bg-surface-card p-6 rounded-2xl border border-surface-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-brand-primary font-bold text-sm flex items-center justify-center shrink-0 uppercase tracking-wider">
                {job.icon}
              </div>
              <div>
                <h3 className="font-bold text-base text-content-primary">{job.title}</h3>
                <p className="text-xs text-content-secondary mb-2.5">{job.company}</p>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map(t => (
                    <span key={t} className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-content-secondary">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => alert(`Redirecting to official job application for ${job.title} at ${job.company}...`)}
              className="btn-pill-purple text-xs px-5 py-2 flex items-center gap-1.5 shrink-0 self-end sm:self-center"
            >
              <span>Apply</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};
