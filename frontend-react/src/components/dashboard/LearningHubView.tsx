import React, { useState } from 'react';

export const LearningHubView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Web Development', 'Programming', 'DB & SQL', 'AI & ML', 'Tools'];

  const courses = [
    {
      id: 1,
      title: 'Web Development (HTML, CSS, JS)',
      desc: 'Build a strong foundation for web development.',
      progress: 72,
      category: 'Web Development',
      icon: '🌐',
    },
    {
      id: 2,
      title: 'React Development',
      desc: 'Learn React and build modern web apps.',
      progress: 40,
      category: 'Web Development',
      icon: '⚛️',
    },
    {
      id: 3,
      title: 'Python for Developers',
      desc: 'Python fundamentals to real-world projects.',
      progress: 65,
      category: 'Programming',
      icon: '🐍',
    },
  ];

  const filteredCourses = activeFilter === 'All'
    ? courses
    : courses.filter(c => c.category === activeFilter);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-content-primary">Learning Hub</h2>
        <p className="text-sm text-content-secondary mt-1">Structured courses to build industry-ready skills.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeFilter === cat
                ? 'bg-brand-primary text-white shadow-sm'
                : 'bg-surface-card text-content-secondary hover:bg-gray-100 border border-surface-border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course List */}
      <div className="space-y-4">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-surface-card p-5 rounded-2xl border border-surface-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl shrink-0">
                {course.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm text-content-primary">{course.title}</h3>
                <p className="text-xs text-content-secondary mb-2">{course.desc}</p>
                <div className="flex items-center gap-3 max-w-md">
                  <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-brand-primary h-full rounded-full" style={{ width: `${course.progress}%` }} />
                  </div>
                  <span className="text-[11px] font-bold text-content-secondary">{course.progress}%</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => alert(`Resuming ${course.title}...`)}
              className="btn-pill-purple text-xs px-5 py-2 shrink-0 self-end sm:self-center"
            >
              Continue
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
