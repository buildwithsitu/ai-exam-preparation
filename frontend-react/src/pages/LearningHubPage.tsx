import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

export const LearningHubPage: React.FC = () => {
  const courses = [
    { title: 'DSA with Python', desc: 'Problem solving for placements', progress: 35, icon: '🐍' },
    { title: 'Full Stack Web Development', desc: 'Frontend + Backend + Projects', progress: 20, icon: '⚛️' },
    { title: 'SQL for Beginners', desc: 'Database, queries, and practice', progress: 60, icon: '🗄️' },
    { title: 'Data Analysis with Python', desc: 'Pandas, NumPy, visualization', progress: 30, icon: '📊' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#120E2C]">Learning Hub</h1>
          <p className="text-gray-500 text-sm mt-1">Learn concepts, follow structured courses, and build strong fundamentals.</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search courses, topics..."
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B3CE8]/20 focus:border-[#5B3CE8]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-14 h-14 rounded-2xl bg-[#F8F9FA] flex items-center justify-center text-3xl shadow-inner shrink-0">
                {course.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-base text-[#120E2C]">{course.title}</h3>
                <p className="text-xs text-gray-500 mb-2">{course.desc}</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#5B3CE8] h-full rounded-full" style={{ width: `${course.progress}%` }} />
                  </div>
                  <span className="text-[11px] font-bold text-gray-400">{course.progress}% Complete</span>
                </div>
              </div>
            </div>

            <Link to="/practice" className="btn-pill-outline text-xs px-4 py-2 shrink-0">
              Continue &rarr;
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
};
