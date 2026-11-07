import React, { useState } from 'react';
import { User, Mail, Building, Bell, Lock } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [name, setName] = useState('Situ Chandra');
  const [email, setEmail] = useState('situsavvy1111@gmail.com');
  const [inst, setInst] = useState('Jawaharlal Nehru University (JNU), New Delhi');
  const [goal, setGoal] = useState('software-dev');

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

        <div className="pt-4">
          <button 
            onClick={() => alert('Settings saved successfully!')}
            className="btn-pill-purple text-xs px-6 py-2.5"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};
