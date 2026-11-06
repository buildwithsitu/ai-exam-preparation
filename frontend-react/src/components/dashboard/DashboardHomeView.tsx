import React, { useState } from 'react';
import { Play, CheckSquare, Sparkles, TrendingUp, Award, Flame } from 'lucide-react';

interface DashboardHomeViewProps {
  onNavigate: (tabId: string) => void;
}

export const DashboardHomeView: React.FC<DashboardHomeViewProps> = ({ onNavigate }) => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Solve 5 DSA problems', done: false },
    { id: 2, text: 'Complete React module', done: false },
    { id: 3, text: 'Update your resume', done: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div className="space-y-8">
      
      {/* 4 Top KPI Stat Cards (Screen 1 in Mockup 2) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#5B3CE8] flex items-center justify-center font-bold text-xl shrink-0">
            📊
          </div>
          <div>
            <p className="text-2xl font-black text-[#120E2C]">56%</p>
            <p className="text-xs text-gray-500 font-medium">Overall Progress</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0">
            &lt;/&gt;
          </div>
          <div>
            <p className="text-2xl font-black text-[#120E2C]">24</p>
            <p className="text-xs text-gray-500 font-medium">Practice Done</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl shrink-0">
            🛠️
          </div>
          <div>
            <p className="text-2xl font-black text-[#120E2C]">3</p>
            <p className="text-xs text-gray-500 font-medium">Projects Built</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl shrink-0">
            🔥
          </div>
          <div>
            <p className="text-2xl font-black text-[#120E2C]">15</p>
            <p className="text-xs text-gray-500 font-medium">Days Streak</p>
          </div>
        </div>

      </div>

      {/* 2-Column Split: Learning Progress & Next Task */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Your Learning Progress */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-base text-[#120E2C]">Your Learning Progress</h2>
            <button onClick={() => onNavigate('learn')} className="text-xs font-bold text-[#5B3CE8] hover:underline">
              View All Courses &rarr;
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-gray-700">Web Development</span>
                <span className="text-[#5B3CE8]">72%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#5B3CE8] h-full rounded-full transition-all duration-500" style={{ width: '72%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-gray-700">DSA</span>
                <span className="text-[#5B3CE8]">40%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#5B3CE8] h-full rounded-full transition-all duration-500" style={{ width: '40%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-gray-700">JavaScript</span>
                <span className="text-[#5B3CE8]">60%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#5B3CE8] h-full rounded-full transition-all duration-500" style={{ width: '60%' }} />
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
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-base text-[#120E2C] mb-4">Next Task</h2>
            <div className="space-y-3">
              {tasks.map(task => (
                <label 
                  key={task.id} 
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50/80 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    className="w-4 h-4 rounded text-[#5B3CE8] focus:ring-[#5B3CE8]"
                  />
                  <span className={`text-sm ${task.done ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}>
                    {task.text}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-4 text-xs text-gray-400">
            Complete daily tasks to maintain your streak.
          </div>
        </div>

      </div>

    </div>
  );
};
