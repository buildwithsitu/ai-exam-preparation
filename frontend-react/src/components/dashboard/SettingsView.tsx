import React, { useState, useEffect } from 'react';
import { User, Mail, Building, Bell, Lock, RotateCcw, Sparkles, Check, Loader2 } from 'lucide-react';
import { useStudentProgress } from '../../context/StudentProgressContext';
import { useAuth } from '../../context/AuthContext';

export const SettingsView: React.FC = () => {
  const { stats, resetAllProgress, loadDemoProgress } = useStudentProgress();
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || 'Situ Chandra');
  const [email, setEmail] = useState(user?.email || 'situsavvy1111@gmail.com');
  const [inst, setInst] = useState(user?.institution || 'Jawaharlal Nehru University (JNU), New Delhi');
  const [goal, setGoal] = useState(user?.track || 'Software Developer');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setInst(user.institution);
      setGoal(user.track);
    }
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage(null);

    const payload: any = {
      name,
      institution: inst,
      track: goal,
    };

    if (newPassword) {
      payload.current_password = currentPassword;
      payload.new_password = newPassword;
    }

    const res = await updateProfile(payload);
    setIsSaving(false);

    if (res.success) {
      setSaveMessage('Profile settings saved successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setTimeout(() => setSaveMessage(null), 4000);
    } else {
      alert(res.error || 'Failed to save settings.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-black text-content-primary">Profile &amp; Settings</h2>
        <p className="text-sm text-content-secondary mt-1">Manage your account credentials and placement preferences.</p>
      </div>

      <div className="bg-surface-card p-6 sm:p-8 rounded-3xl border border-surface-border shadow-sm space-y-6">
        <h3 className="font-bold text-base text-content-primary border-b border-surface-border pb-3 flex items-center gap-2">
          <User className="w-4 h-4 text-brand-primary" />
          <span>Personal Information</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-content-secondary mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-content-secondary mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase text-content-secondary mb-1">Institution</label>
            <input
              type="text"
              value={inst}
              onChange={(e) => setInst(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
            />
          </div>
        </div>

        <h3 className="font-bold text-base text-content-primary border-b border-surface-border pb-3 pt-4 flex items-center gap-2">
          <Lock className="w-4 h-4 text-brand-primary" />
          <span>Active Placement Goal</span>
        </h3>

        <div>
          <select 
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full sm:w-80 p-2.5 rounded-xl border border-surface-border text-sm font-semibold text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
          >
            <option value="software-dev">Software Developer Track (DSA + Web + Projects)</option>
            <option value="data-analyst">Data Analyst Track (Python + SQL + BI)</option>
            <option value="data-scientist">Data Scientist Track (ML + Data Pipelines)</option>
          </select>
        </div>

        {/* Data & Progress Management Section */}
        <h3 className="font-bold text-base text-content-primary border-b border-surface-border pb-3 pt-4 flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-brand-primary" />
          <span>Learning Progress Management</span>
        </h3>

        <div className="bg-surface-subtle p-4 rounded-2xl border border-surface-border space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-content-primary">Current Overall Progress:</span>
            <span className="font-black text-brand-primary text-sm">{stats.overallProgress}%</span>
          </div>
          <p className="text-xs text-content-secondary leading-relaxed">
            Resetting your progress clears your streak, sets all topic progress bars to 0%, unchecks daily tasks, and clears completed problem drills.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <button
              onClick={() => {
                if (window.confirm('Confirm: Reset all student progress, streaks, and checklists back to 0%?')) {
                  resetAllProgress();
                  alert('All student progress has been reset to 0%!');
                }
              }}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Progress (0%)</span>
            </button>
            <button
              onClick={() => {
                loadDemoProgress();
                alert('Sample demo progress (56%) loaded!');
              }}
              className="px-4 py-2 rounded-xl border border-surface-border hover:bg-surface-card text-content-secondary font-semibold text-xs flex items-center gap-2 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
              <span>Load Sample Demo Data</span>
            </button>
          </div>
        </div>

        {/* Password & Security Section */}
        <h3 className="font-bold text-base text-content-primary border-b border-surface-border pb-3 pt-4 flex items-center gap-2">
          <Lock className="w-4 h-4 text-brand-primary" />
          <span>Security &amp; Password</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-content-secondary mb-1">Current Password</label>
            <input
              type="password"
              placeholder="Leave blank to keep unchanged"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-content-secondary mb-1">New Password</label>
            <input
              type="password"
              placeholder="At least 8 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
            />
          </div>
        </div>

        {saveMessage && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{saveMessage}</span>
          </div>
        )}

        <div className="pt-2 flex items-center gap-3">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="btn-pill-purple text-xs px-6 py-2.5 flex items-center gap-2"
          >
            {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
