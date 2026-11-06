import React from 'react';

export const ProjectsPage: React.FC = () => {
  const projects = [
    {
      title: 'Personal Portfolio Website',
      desc: 'Build and deploy your modern responsive developer portfolio.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      time: '3-4 Days',
      icon: '🖼️',
    },
    {
      title: 'E-commerce Web App',
      desc: 'A full stack e-commerce application with auth and cart.',
      tags: ['React', 'Node.js', 'MongoDB'],
      time: '5-7 Days',
      icon: '🛒',
    },
    {
      title: 'Data Analytics Dashboard',
      desc: 'Analyze and visualize business data interactively.',
      tags: ['Python', 'Pandas', 'Streamlit'],
      time: '4-6 Days',
      icon: '📊',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#120E2C]">Projects Hub</h1>
        <p className="text-gray-500 text-sm mt-1">Build real-world projects, strengthen your skills, and create a strong portfolio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((proj, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-2xl mb-4">
                {proj.icon}
              </div>
              <h2 className="font-bold text-lg text-[#120E2C] mb-2">{proj.title}</h2>
              <p className="text-xs text-gray-600 mb-4">{proj.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {proj.tags.map(t => (
                  <span key={t} className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-500">
              <span>⏱ {proj.time}</span>
              <button className="btn-pill-outline text-xs px-3.5 py-1.5">View Project</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
