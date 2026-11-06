import React, { useState } from 'react';
import { ExternalLink, Plus } from 'lucide-react';

export const ProjectsView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Web Apps', 'Data', 'AI/ML', 'Others'];

  const projects = [
    {
      id: 1,
      title: 'Task Manager App',
      desc: 'A full-stack task management application with user authentication.',
      status: 'Completed',
      category: 'Web Apps',
      tags: ['React', 'Node.js', 'MongoDB'],
      icon: '📋',
    },
    {
      id: 2,
      title: 'Data Analytics Dashboard',
      desc: 'Interactive dashboard to analyze and visualize data.',
      status: 'In Progress',
      category: 'Data',
      tags: ['Python', 'Streamlit', 'Pandas'],
      icon: '📊',
    },
  ];

  const filtered = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="space-y-6">
      
      {/* Header & New Project CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#120E2C]">My Projects</h2>
          <p className="text-sm text-gray-500 mt-1">Build real-world projects to showcase your skills.</p>
        </div>
        <button 
          onClick={() => alert('New project blueprint template opened!')}
          className="btn-pill-purple text-xs px-4 py-2.5 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeFilter === cat
                ? 'bg-[#5B3CE8] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="space-y-4">
        {filtered.map(proj => (
          <div key={proj.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-3xl shrink-0">
                {proj.icon}
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-base text-[#120E2C]">{proj.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    proj.status === 'Completed' 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : 'bg-amber-50 text-amber-700'
                  }`}>
                    {proj.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{proj.desc}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.tags.map(t => (
                    <span key={t} className="text-[10px] font-semibold px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
              <button 
                onClick={() => alert(`Opening ${proj.title} architecture specs...`)}
                className="text-xs font-bold text-[#5B3CE8] hover:underline"
              >
                View
              </button>
              <button 
                onClick={() => alert(`Opening live repository link...`)}
                className="p-2 rounded-lg bg-gray-50 text-gray-500 hover:text-gray-800"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
