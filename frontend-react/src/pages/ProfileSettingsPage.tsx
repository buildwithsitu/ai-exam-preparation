import React from 'react';

export const ProfileSettingsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-content-primary">Profile &amp; Settings</h1>
        <p className="text-content-secondary text-sm mt-1">Manage your account information and learning preferences.</p>
      </div>

      <div className="bg-surface-card p-8 rounded-3xl border border-surface-border shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-content-primary border-b border-surface-border pb-3">Personal Information</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="profile-name" className="block text-xs font-bold uppercase text-content-secondary mb-1">Full Name</label>
            <input
              id="profile-name"
              name="name"
              type="text"
              defaultValue="Situ Chandra"
              className="w-full p-2.5 rounded-xl border border-surface-border text-sm"
            />
          </div>
          <div>
            <label htmlFor="profile-email" className="block text-xs font-bold uppercase text-content-secondary mb-1">Email</label>
            <input
              id="profile-email"
              name="email"
              type="email"
              defaultValue="situsavvy1111@gmail.com"
              className="w-full p-2.5 rounded-xl border border-surface-border text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="profile-institution" className="block text-xs font-bold uppercase text-content-secondary mb-1">Institution</label>
            <input
              id="profile-institution"
              name="institution"
              type="text"
              defaultValue="Jawaharlal Nehru University (JNU), New Delhi"
              className="w-full p-2.5 rounded-xl border border-surface-border text-sm"
            />
          </div>
        </div>

        <button 
          onClick={() => alert('Profile updated successfully!')}
          className="btn-pill-purple text-xs px-5 py-2 mt-2"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};
