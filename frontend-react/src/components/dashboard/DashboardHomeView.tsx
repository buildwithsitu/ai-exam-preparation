import React from 'react';
import { Database, RefreshCw, RotateCcw, Sparkles } from 'lucide-react';
import { useStudentProgress } from '../../context/StudentProgressContext';

interface DashboardHomeViewProps {
  onNavigate: (tabId: string) => void;
}

export const DashboardHomeView: React.FC<DashboardHomeViewProps> = ({ onNavigate }) => {
  const { stats, backendConnected, isSyncing, toggleTask, resetAllProgress, loadDemoProgress } = useStudentProgress();

  return (
    <div className="space-y-8">
      
      {/* Reset Progress Banner / Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-surface-card border border-surface-border">
        <div className="flex flex-wrap items-center gap-3 text-xs text-content-secondary">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Student Progress Status: <strong>{stats.overallProgress}% Complete</strong></span>
          </div>

          <span className="text-gray-300">|</span>

          {/* Backend PostgreSQL Live Sync Status */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-surface-subtle border border-surface-border">
            <Database className={`w-3 h-3 ${backendConnected ? 'text-emerald-500' : 'text-amber-500'}`} />
            <span className={backendConnected ? 'text-emerald-700' : 'text-amber-700'}>
              {backendConnected ? 'PostgreSQL Synced' : 'Local Storage Mode'}
            </span>
            {isSyncing && (
              <RefreshCw className="w-2.5 h-2.5 animate-spin text-brand-primary ml-1" />
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to reset all progress, streak, and completed tasks to 0?')) {
                resetAllProgress();
              }
            }}
            className="px-3 py-1.5 rounded-full border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors flex items-center gap-1.5"
            title="Reset all student metrics to 0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Progress (0%)</span>
          </button>
          <button
            onClick={loadDemoProgress}
            className="px-3 py-1.5 rounded-full border border-surface-border text-content-secondary hover:bg-surface-subtle text-xs font-semibold transition-colors flex items-center gap-1.5"
            title="Load sample mockup numbers for preview"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
            <span>Load Demo Data</span>
          </button>
        </div>
      </div>

      {/* 4 Top KPI Stat Cards (Screen 1 in Mockup 2) */}
      <div className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-surface-card p-5 rounded-2xl border border-surface-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-brand-primary flex items-center justify-center font-bold text-xl shrink-0">
            📊
          </div>
          <div>
            <p className="text-2xl font-black text-content-primary">{stats.overallProgress}%</p>
            <p className="text-xs text-content-secondary font-medium">Overall Progress</p>
          </div>
        </div>

        <div className="bg-surface-card p-5 rounded-2xl border border-surface-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0">
            &lt;/&gt;
          </div>
          <div>
            <p className="text-2xl font-black text-content-primary">{stats.practiceDone}</p>
            <p className="text-xs text-content-secondary font-medium">Practice Done</p>
          </div>
        </div>

        <div className="bg-surface-card p-5 rounded-2xl border border-surface-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl shrink-0">
            🛠️
          </div>
          <div>
            <p className="text-2xl font-black text-content-primary">{stats.projectsBuilt}</p>
            <p className="text-xs text-content-secondary font-medium">Projects Built</p>
          </div>
        </div>

        <div className="bg-surface-card p-5 rounded-2xl border border-surface-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl shrink-0">
            🔥
          </div>
          <div>
            <p className="text-2xl font-black text-content-primary">{stats.streakDays}</p>
            <p className="text-xs text-content-secondary font-medium">Days Streak</p>
          </div>
        </div>

      </div>

      {/* 2-Column Split: Learning Progress & Next Task */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Your Learning Progress */}
        <div className="lg:col-span-7 bg-surface-card p-6 sm:p-7 rounded-2xl border border-surface-border shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-base text-content-primary">Your Learning Progress</h2>
            <button onClick={() => onNavigate('learn')} className="text-xs font-bold text-brand-primary hover:underline">
              View All Courses &rarr;
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-content-primary">Web Development</span>
                <span className="text-brand-primary">{stats.webDevProgress}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-brand-primary h-full rounded-full transition-all duration-500" style={{ width: `${stats.webDevProgress}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-content-primary">DSA</span>
                <span className="text-brand-primary">{stats.dsaProgress}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-brand-primary h-full rounded-full transition-all duration-500" style={{ width: `${stats.dsaProgress}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-content-primary">JavaScript</span>
                <span className="text-brand-primary">{stats.jsProgress}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-brand-primary h-full rounded-full transition-all duration-500" style={{ width: `${stats.jsProgress}%` }} />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button onClick={() => onNavigate('learn')} className="btn-pill-purple text-xs px-5 py-2">
              Continue Learning &rarr;
            </button>
          </div>
        </div>

        {/* Right: Next Task */}
        <div className="lg:col-span-5 bg-surface-card p-6 sm:p-7 rounded-2xl border border-surface-border shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-base text-content-primary mb-4">Next Task</h2>
            <div className="space-y-3">
              {stats.tasks.map(task => (
                <label 
                  key={task.id} 
                  className="flex items-center gap-3 p-3 rounded-xl border border-surface-border hover:bg-surface-subtle/80 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary"
                  />
                  <span className={`text-sm ${task.done ? 'line-through text-gray-400' : 'text-content-primary font-medium'}`}>
                    {task.text}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-surface-border mt-4 text-xs text-gray-400">
            Complete daily tasks to build your streak.
          </div>
        </div>

      </div>

    </div>
  );
};
