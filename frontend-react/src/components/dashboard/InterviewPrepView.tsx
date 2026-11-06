import React from 'react';
import { Code2, Users, Trophy, FileText } from 'lucide-react';

export const InterviewPrepView: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-[#120E2C]">Interview Prep</h2>
        <p className="text-sm text-gray-500 mt-1">Practice technical, HR and behavioral interviews.</p>
      </div>

      {/* 3 Core Interview Cards (Screen 6 in Mockup 2) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Technical Interviews */}
        <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#5B3CE8] flex items-center justify-center font-bold text-xl">
              &lt;/&gt;
            </div>
            <h3 className="text-lg font-bold text-[#120E2C]">Technical Interviews</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              DSA, system design and core concepts.
            </p>
          </div>
          <div className="pt-6">
            <button 
              onClick={() => alert('Starting Technical Interview Simulation...')}
              className="w-full btn-pill-purple text-xs py-2.5"
            >
              Start Practice &rarr;
            </button>
          </div>
        </div>

        {/* HR Interviews */}
        <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold text-xl">
              👥
            </div>
            <h3 className="text-lg font-bold text-[#120E2C]">HR Interviews</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Common HR questions, behavior and communication.
            </p>
          </div>
          <div className="pt-6">
            <button 
              onClick={() => alert('Starting HR Behavioral Interview Drills...')}
              className="w-full btn-pill-purple text-xs py-2.5"
            >
              Start Practice &rarr;
            </button>
          </div>
        </div>

        {/* Mock Interviews */}
        <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
              🎯
            </div>
            <h3 className="text-lg font-bold text-[#120E2C]">Mock Interviews</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Realistic interview experience with feedback.
            </p>
          </div>
          <div className="pt-6">
            <button 
              onClick={() => alert('Booking a Full Timed Mock Interview...')}
              className="w-full btn-pill-outline text-xs py-2.5"
            >
              Take a Mock &rarr;
            </button>
          </div>
        </div>

      </div>

      {/* Recent Practice Card */}
      <div>
        <h3 className="font-bold text-sm text-gray-800 uppercase tracking-wider mb-3">Recent Practice</h3>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5B3CE8] flex items-center justify-center font-bold text-sm shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#120E2C]">DSA Mock Interview</h4>
              <p className="text-xs text-gray-500">Oct 30, 2026 &bull; <strong className="text-emerald-600">Score: 78%</strong></p>
            </div>
          </div>

          <button 
            onClick={() => alert('DSA Mock Interview Scorecard:\n- DSA Traversal: 85%\n- System Architecture: 72%\n- Communication: 80%')}
            className="btn-pill-outline text-xs px-4 py-1.5 self-end sm:self-auto"
          >
            View Report &rarr;
          </button>
        </div>
      </div>

    </div>
  );
};
