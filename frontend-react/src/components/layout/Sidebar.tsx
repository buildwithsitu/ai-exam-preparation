import React from 'react';
import { 
  LayoutDashboard, 
  Compass, 
  BookOpen, 
  Code2, 
  FolderGit2, 
  MessageSquareCode, 
  FileText, 
  Briefcase, 
  BarChart3, 
  Settings 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { user } = useAuth();
  const studentName = user?.name || 'Situ Chandra';
  const studentTrack = user?.track || 'Software Dev Track';
  const studentInitial = studentName.charAt(0).toUpperCase();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'career', label: 'Career Path', icon: Compass },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'interviews', label: 'Interviews', icon: MessageSquareCode },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="sticky top-16 z-30 w-full bg-brand-ink text-white lg:static lg:w-64 lg:min-h-[calc(100vh-4rem)] flex flex-col p-3 lg:p-4 shrink-0">
      
      {/* Brand in Sidebar */}
      <div className="hidden lg:flex items-center gap-2.5 px-3 py-3 mb-6">
        <span className="text-xl">🎓</span>
        <span className="font-extrabold text-lg tracking-tight">ExamMate AI</span>
      </div>

      {/* Nav List */}
      <nav className="flex min-w-0 flex-1 gap-2 overflow-x-auto lg:block lg:space-y-1.5 lg:overflow-visible" aria-label="Dashboard Sidebar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              aria-pressed={isActive}
              className={`w-auto shrink-0 flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all lg:w-full lg:gap-3 lg:px-3.5 ${
                isActive
                  ? 'bg-brand-primary text-white shadow-md'
                  : 'text-gray-300 hover:bg-surface-card/10 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Profile Pill */}
      <div className="hidden lg:flex mt-auto pt-4 border-t border-white/10 items-center gap-3 px-2">
        <div className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
          {studentInitial}
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-semibold truncate">{studentName}</p>
          <p className="text-xs text-gray-400 truncate">{studentTrack}</p>
        </div>
      </div>

    </aside>
  );
};
