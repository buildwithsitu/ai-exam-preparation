import React from 'react';

interface CareerPathsViewProps {
  onNavigate: (tabId: string) => void;
}

export const CareerPathsView: React.FC<CareerPathsViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-content-primary">Career Paths</h2>
        <p className="text-sm text-content-secondary mt-1">Choose your goal and follow a structured roadmap.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Role 1: Software Developer (Active) */}
        <div className="bg-surface-card p-7 rounded-3xl border border-surface-border shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-brand-primary flex items-center justify-center font-bold text-xl">
              &lt;/&gt;
            </div>
            <h3 className="text-xl font-bold text-content-primary">Software Developer</h3>
            <p className="text-xs text-content-secondary leading-relaxed">
              Build web, full-stack and real-world applications.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-content-primary rounded-md">DSA</span>
              <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-content-primary rounded-md">Web</span>
              <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-content-primary rounded-md">DevOps</span>
            </div>
          </div>

          <div className="pt-6">
            <button 
              onClick={() => onNavigate('learn')}
              className="w-full btn-pill-purple text-xs py-2.5"
            >
              Continue &rarr;
            </button>
          </div>
        </div>

        {/* Role 2: Data Analyst */}
        <div className="bg-surface-card p-7 rounded-3xl border border-surface-border shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
              📊
            </div>
            <h3 className="text-xl font-bold text-content-primary">Data Analyst</h3>
            <p className="text-xs text-content-secondary leading-relaxed">
              Work with data, analyze insights and make decisions.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-content-primary rounded-md">Python</span>
              <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-content-primary rounded-md">SQL</span>
              <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-content-primary rounded-md">Power BI</span>
            </div>
          </div>

          <div className="pt-6">
            <button 
              onClick={() => alert('Switched active track to Data Analyst!')}
              className="w-full btn-pill-outline text-xs py-2.5"
            >
              Choose Path
            </button>
          </div>
        </div>

        {/* Role 3: Data Scientist */}
        <div className="bg-surface-card p-7 rounded-3xl border border-surface-border shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
              🧠
            </div>
            <h3 className="text-xl font-bold text-content-primary">Data Scientist</h3>
            <p className="text-xs text-content-secondary leading-relaxed">
              Learn ML, build models and solve real problems.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-content-primary rounded-md">Python</span>
              <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-content-primary rounded-md">ML</span>
              <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-content-primary rounded-md">AI</span>
            </div>
          </div>

          <div className="pt-6">
            <button 
              onClick={() => alert('Switched active track to Data Scientist!')}
              className="w-full btn-pill-outline text-xs py-2.5"
            >
              Choose Path
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
