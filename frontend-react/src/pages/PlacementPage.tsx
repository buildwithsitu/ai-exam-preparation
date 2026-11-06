import React from 'react';
import { Briefcase, FileText, MessageSquareCode, Award } from 'lucide-react';

export const PlacementPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#120E2C]">Placement Preparation</h1>
        <p className="text-gray-500 text-sm mt-1">Everything you need to crack technical interviews and get placed.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Interview Prep */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-5">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#5B3CE8] flex items-center justify-center shrink-0">
            <MessageSquareCode className="w-6 h-6" />
          </div>
          <div className="space-y-2 flex-1">
            <h2 className="font-bold text-xl text-[#120E2C]">Interview Prep</h2>
            <p className="text-sm text-gray-600">Technical, HR and behavioral interview question drills with model answers.</p>
            <button className="text-[#5B3CE8] font-bold text-sm hover:underline pt-2 block">
              Start Practice &rarr;
            </button>
          </div>
        </div>

        {/* Card 2: Resume Builder */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div className="space-y-2 flex-1">
            <h2 className="font-bold text-xl text-[#120E2C]">Resume Builder</h2>
            <p className="text-sm text-gray-600">Create a clean, professional, ATS-friendly tech resume.</p>
            <button className="text-indigo-600 font-bold text-sm hover:underline pt-2 block">
              Build Resume &rarr;
            </button>
          </div>
        </div>

        {/* Card 3: Job Opportunities */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div className="space-y-2 flex-1">
            <h2 className="font-bold text-xl text-[#120E2C]">Job Opportunities</h2>
            <p className="text-sm text-gray-600">Explore fresher and internship openings at top tech organizations.</p>
            <button className="text-emerald-600 font-bold text-sm hover:underline pt-2 block">
              Explore Jobs &rarr;
            </button>
          </div>
        </div>

        {/* Card 4: Placement Tracker */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div className="space-y-2 flex-1">
            <h2 className="font-bold text-xl text-[#120E2C]">Placement Tracker</h2>
            <p className="text-sm text-gray-600">Track your job applications, interview schedules, and offers.</p>
            <button className="text-amber-600 font-bold text-sm hover:underline pt-2 block">
              View Tracker &rarr;
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
