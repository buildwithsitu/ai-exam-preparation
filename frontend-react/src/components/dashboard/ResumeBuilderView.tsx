import React from 'react';
import { CheckCircle2, Circle, Download, Edit3 } from 'lucide-react';

export const ResumeBuilderView: React.FC = () => {
  const steps = [
    { title: 'Add Personal Details', completed: true },
    { title: 'Add Education', completed: true },
    { title: 'Add Skills', completed: true },
    { title: 'Add Projects', completed: true },
    { title: 'Review & Download', completed: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-content-primary">Resume Builder</h2>
        <p className="text-sm text-content-secondary mt-1">Create a professional, ATS-friendly resume.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Steps Checklist */}
        <div className="lg:col-span-5 bg-surface-card p-6 sm:p-8 rounded-3xl border border-surface-border shadow-sm space-y-6">
          <h3 className="font-bold text-sm uppercase tracking-wider text-content-secondary">Resume Checklist</h3>
          
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-3">
                {step.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300 shrink-0" />
                )}
                <span className={`text-sm font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-surface-border flex gap-3">
            <button 
              onClick={() => alert('Opening Resume Editor Mode...')}
              className="btn-pill-outline text-xs px-4 py-2 flex items-center gap-1.5 flex-1 justify-center"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Resume</span>
            </button>
            <button 
              onClick={() => alert('Downloading ATS Resume PDF for Situ Chandra...')}
              className="btn-pill-purple text-xs px-5 py-2 flex items-center gap-1.5 flex-1 justify-center shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Right Live Resume Sheet Preview */}
        <div className="lg:col-span-7 bg-surface-card p-8 rounded-3xl border border-surface-border shadow-md space-y-5 text-content-primary">
          
          {/* Header */}
          <div className="border-b border-surface-border pb-4">
            <h3 className="text-2xl font-black text-content-primary">Situ Chandra</h3>
            <p className="text-xs font-semibold text-brand-primary tracking-wide">Software Developer &bull; Full-Stack &amp; DSA</p>
            <p className="text-[11px] text-content-secondary mt-1">
              New Delhi, India &bull; situsavvy1111@gmail.com &bull; linkedin.com/in/buildwithsitu
            </p>
          </div>

          {/* Education */}
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-xs uppercase tracking-wider text-content-primary border-b border-surface-border pb-1">Education</h4>
            <div className="flex justify-between font-semibold text-content-primary pt-1">
              <span>Jawaharlal Nehru University (JNU), New Delhi</span>
              <span>2024 &ndash; 2026</span>
            </div>
            <p className="text-content-secondary">Master of Computer Applications (MCA)</p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-xs uppercase tracking-wider text-content-primary border-b border-surface-border pb-1">Technical Skills</h4>
            <p className="text-content-primary pt-1"><strong>Languages:</strong> Python, JavaScript (ES6+), TypeScript, SQL</p>
            <p className="text-content-primary"><strong>Frameworks &amp; Tools:</strong> React, Node.js, Express, Tailwind CSS, Git, Vite</p>
            <p className="text-content-primary"><strong>Core:</strong> Data Structures, Algorithms, DBMS, Operating Systems</p>
          </div>

          {/* Projects */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-xs uppercase tracking-wider text-content-primary border-b border-surface-border pb-1">Featured Projects</h4>
            
            <div>
              <div className="flex justify-between font-bold text-gray-900">
                <span>Task Manager Application</span>
                <span className="text-content-secondary">React, Node.js, MongoDB</span>
              </div>
              <ul className="list-disc list-inside text-content-secondary text-[11px] space-y-0.5 mt-0.5">
                <li>Architected full-stack task manager supporting JWT auth and real-time state synchronization.</li>
                <li>Engineered responsive drag-and-drop task workflow improving user efficiency by 30%.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between font-bold text-gray-900">
                <span>Data Analytics Dashboard</span>
                <span className="text-content-secondary">Python, Streamlit, Pandas</span>
              </div>
              <ul className="list-disc list-inside text-content-secondary text-[11px] space-y-0.5 mt-0.5">
                <li>Processed 50,000+ transaction records to visualize cohort retention patterns.</li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
