import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

import { DashboardHomeView } from '../components/dashboard/DashboardHomeView';
import { CareerPathsView } from '../components/dashboard/CareerPathsView';
import { LearningHubView } from '../components/dashboard/LearningHubView';
import { CodingPracticeView } from '../components/dashboard/CodingPracticeView';
import { ProjectsView } from '../components/dashboard/ProjectsView';
import { InterviewPrepView } from '../components/dashboard/InterviewPrepView';
import { ResumeBuilderView } from '../components/dashboard/ResumeBuilderView';
import { JobsView } from '../components/dashboard/JobsView';
import { ProgressAnalyticsView } from '../components/dashboard/ProgressAnalyticsView';
import { SettingsView } from '../components/dashboard/SettingsView';

export const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useAuth();
  const displayName = user ? user.name.split(' ')[0] : 'Situ';
  const displayTrack = user?.track || 'Software Developer';
  const displayInitial = (user?.name || 'Situ').charAt(0).toUpperCase();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
      
      {/* Dark Navy Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Workspace Content Area */}
      <main className="min-w-0 flex-1 overflow-y-auto bg-background-base p-4 sm:p-6 lg:p-8">
        
        {/* Top Header inside Dashboard */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black text-content-primary">
                Welcome back, {displayName}! 👋
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-brand-light text-brand-primary text-xs font-bold rounded-full">
                <span>&lt;/&gt;</span>
                <span>{displayTrack}</span>
              </span>
            </div>
            <p className="text-sm text-content-secondary mt-1">
              Keep learning, building, and get placed.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                placeholder="Search anything..."
                className="pl-9 pr-4 py-2 bg-surface-card rounded-full border border-surface-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary w-48 sm:w-60"
              />
            </div>
            <div className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-sm shadow-sm">
              {displayInitial}
            </div>
          </div>
        </div>

        {/* Dynamic View Panel (All 9 Workspaces from Mockup 2) */}
        {activeTab === 'dashboard' && <DashboardHomeView onNavigate={setActiveTab} />}
        {activeTab === 'career' && <CareerPathsView onNavigate={setActiveTab} />}
        {activeTab === 'learn' && <LearningHubView />}
        {activeTab === 'practice' && <CodingPracticeView />}
        {activeTab === 'projects' && <ProjectsView />}
        {activeTab === 'interviews' && <InterviewPrepView />}
        {activeTab === 'resume' && <ResumeBuilderView />}
        {activeTab === 'jobs' && <JobsView />}
        {activeTab === 'progress' && <ProgressAnalyticsView />}
        {activeTab === 'settings' && <SettingsView />}

      </main>

    </div>
  );
};
