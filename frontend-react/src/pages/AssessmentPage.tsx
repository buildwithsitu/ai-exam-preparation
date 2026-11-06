import React, { useState } from 'react';

export const AssessmentPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-[#120E2C]">DSA Technical Assessment</h1>
          <p className="text-xs text-gray-500">Test Console &bull; Section A: Data Structures</p>
        </div>
        <div className="px-3.5 py-1.5 bg-[#EDE9FE] text-[#5B3CE8] font-mono text-sm font-bold rounded-full">
          ⏱ 01h : 44m : 30s
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between text-xs font-bold text-gray-400">
          <span>Question 1 of 20</span>
          <span>Marking: +4 / -1</span>
        </div>

        <p className="text-base text-gray-800 font-medium leading-relaxed">
          Consider a <strong>Max-Heap</strong> containing <em>n</em> distinct elements. What is the worst-case time complexity required to locate the maximum element and minimum element, respectively?
        </p>

        <div className="space-y-3">
          {[
            { id: 'opt-a', label: 'O(1) and O(log n)' },
            { id: 'opt-b', label: 'O(1) and O(n)', correct: true },
            { id: 'opt-c', label: 'O(log n) and O(n)' },
            { id: 'opt-d', label: 'O(1) and O(1)' },
          ].map((opt) => (
            <label
              key={opt.id}
              onClick={() => setSelectedOption(opt.id)}
              className={`block p-4 rounded-xl border text-sm font-medium cursor-pointer transition-all ${
                selectedOption === opt.id
                  ? 'border-[#5B3CE8] bg-[#EDE9FE]/50 text-[#5B3CE8]'
                  : 'border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <input
                type="radio"
                name="option"
                checked={selectedOption === opt.id}
                onChange={() => setSelectedOption(opt.id)}
                className="hidden"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <button className="text-xs font-bold text-gray-500 hover:text-gray-800">Clear Response</button>
          <button 
            onClick={() => alert('Answer recorded successfully!')}
            className="btn-pill-purple text-xs px-6 py-2.5"
          >
            Save &amp; Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
