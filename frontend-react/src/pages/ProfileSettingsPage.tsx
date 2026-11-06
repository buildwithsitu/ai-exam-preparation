import React from 'react';

export const ProfileSettingsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-[#120E2C]">Profile &amp; Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account information and learning preferences.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-[#120E2C] border-b border-gray-100 pb-3">Personal Information</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Full Name</label>
            <input
              type="text"
              defaultValue="Situ Chandra"
              className="w-full p-2.5 rounded-xl border border-gray-200 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email</label>
            <input
              type="email"
              defaultValue="situsavvy1111@gmail.com"
              className="w-full p-2.5 rounded-xl border border-gray-200 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Institution</label>
            <input
              type="text"
              defaultValue="Jawaharlal Nehru University (JNU), New Delhi"
              className="w-full p-2.5 rounded-xl border border-gray-200 text-sm"
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
